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
    print(f"PDF matches all {len(content.content)} online content fragments across {len(pdf)} page(s).")
