"""Verify that the downloadable PDF contains the complete online CV.

Run with: python3 scripts/test-cv-pdf.py (requires PyMuPDF).
"""
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import urlsplit

import pymupdf


class CVContent(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_main = False
        self.content = []
        self.download = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "main":
            self.in_main = True
        if tag == "a" and "download" in attrs:
            self.download = attrs["href"]

    def handle_endtag(self, tag):
        if tag == "main":
            self.in_main = False

    def handle_data(self, data):
        if self.in_main and data.strip():
            self.content.append(data)


def normalize(value):
    return re.sub(r"\s+", " ", value).strip().casefold()


html_path = Path("public/files/CV-Tran-Xuan-Bac.html")
content = CVContent()
content.feed(html_path.read_text())
assert content.download, "CV must offer a PDF download"
pdf_path = html_path.parent / urlsplit(content.download).path
with pymupdf.open(pdf_path) as pdf:
    pdf_text = normalize(" ".join(page.get_text() for page in pdf))
    for fragment in content.content:
        assert normalize(fragment) in pdf_text, f"Download is missing online CV content: {fragment.strip()}"
    links = [link.get("uri", "") for page in pdf for link in page.get_links()]
    assert "mailto:Bxuan964@gmail.com" in links, "PDF email link must remain clickable"
    assert "https://github.com/xuanbackhoaibu/WebBanHangOnline.git" in links
    for label, destination in [
        ("Xem Portfolio", "https://xuanbackhoaibu.github.io/PROFILEE/"),
        ("Xem GitHub", "https://github.com/xuanbackhoaibu"),
    ]:
        boxes = pdf[0].search_for(label)
        assert boxes, f"PDF must show the clickable label: {label}"
        assert any(link.get("uri") == destination and link["from"].intersects(boxes[0])
                   for link in pdf[0].get_links()), f"{label} must open the correct profile"
    print(f"PDF matches all {len(content.content)} online content fragments across {len(pdf)} page(s).")

    # Table cells and ordinary paragraphs must share the section rules' margins.
    for page in pdf:
        rules = [drawing["rect"] for drawing in page.get_drawings()
                 if drawing["type"] == "s" and drawing["rect"].width > page.rect.width / 2]
        assert rules, "CV page must have section dividers"
        left, right = rules[0].x0, rules[0].x1
        for label in ["HỌC VẤN", "Trường Đại học Đại Nam", "Tiếng Anh:",
                      "KỸ NĂNG CHUYÊN MÔN", "Ngôn ngữ lập trình:", "DỰ ÁN",
                      "WebBanHangOnline -", "Scant Reports -", "Student Performance -"]:
            for box in page.search_for(label):
                assert abs(box.x0 - left) < 0.5, f"{label} is offset from the left margin by {box.x0 - left:.1f}pt"
        for label in ["Hà Nội, Việt Nam", "2023 – nay"]:
            for box in page.search_for(label):
                assert abs(box.x1 - right) < 0.5, f"{label} must align with the right margin"
        for block in page.get_text("dict")["blocks"]:
            for line in block.get("lines", []):
                text = "".join(span["text"] for span in line["spans"])
                if text in ["2024", "2026"]:
                    assert abs(line["bbox"][2] - right) < 0.5, "Project years must align right"
    print("PDF table content, headings, and dates share consistent margins.")
