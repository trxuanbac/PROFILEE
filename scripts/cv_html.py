"""Render the default PDF from the online CV, keeping one source of content."""
from html import escape
from html.parser import HTMLParser
import xml.etree.ElementTree as ET

from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, HRFlowable, KeepTogether, ListFlowable, ListItem,
    PageTemplate, Paragraph, Spacer, Table, TableStyle,
)


class MainParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.builder = ET.TreeBuilder()
        self.active = False
        self.root = None

    def handle_starttag(self, tag, attrs):
        if tag == "main":
            self.active = True
        if self.active:
            self.builder.start(tag, dict(attrs))
            if tag == "br":
                self.builder.end(tag)

    def handle_endtag(self, tag):
        if self.active and tag != "br":
            self.builder.end(tag)
        if tag == "main":
            self.root = self.builder.close()
            self.active = False

    def handle_data(self, data):
        if self.active:
            self.builder.data(data)


def inline(element):
    text = escape(element.text or "")
    for child in element:
        content = inline(child)
        if child.tag == "br":
            text += "<br/>"
        elif child.tag == "strong":
            text += f"<b>{content}</b>"
        elif child.get("class") == "italic":
            text += f"<i>{content}</i>"
        elif child.tag == "a":
            text += f'<a href="{escape(child.get("href"), quote=True)}" color="#0563c1">{content}</a>'
        else:
            text += content
        text += escape(child.tail or "")
    return text


def build_online_cv(output_path, html_path, styles):
    parser = MainParser()
    parser.feed(html_path.read_text())
    main = parser.root
    if main is None:
        raise ValueError("Online CV must have a main element")

    doc = BaseDocTemplate(
        str(output_path), pagesize=A4,
        rightMargin=12 * mm, leftMargin=12 * mm,
        topMargin=12 * mm, bottomMargin=12 * mm,
        title="CV Trần Xuân Bắc - Tiếng Việt", author="Trần Xuân Bắc",
    )
    # Use the same printable width for paragraphs, rules, and tables.
    # ReportLab's default frame adds padding that tables sized to doc.width exceed.
    frame = Frame(
        doc.leftMargin, doc.bottomMargin, doc.width, doc.height,
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
    )
    doc.addPageTemplates(PageTemplate(id="cv", frames=[frame]))
    right_style = ParagraphStyle("cv_right", parent=styles["body"], alignment=TA_RIGHT)
    bullet_style = ParagraphStyle("cv_bullet", parent=styles["body"], spaceBefore=0, spaceAfter=1)
    header = main.find("header")
    story = [
        Paragraph(inline(header.find("h1")).upper(), styles["name"]),
        Paragraph(inline(header.find("p[@class='headline']")), styles["headline"]),
        Spacer(1, 3),
        Paragraph(inline(header.find("p[@class='contact']")), styles["contact"]),
    ]

    def table(rows, widths):
        result = Table(rows, colWidths=widths, hAlign="LEFT")
        result.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 4),
            ("RIGHTPADDING", (-1, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 1),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ]))
        return result

    for section in main.findall("section"):
        divider = HRFlowable(width="100%", thickness=1, color=colors.HexColor("#333333"),
                             spaceBefore=2, spaceAfter=5)
        divider.keepWithNext = True
        story.extend([
            Spacer(1, 7),
            Paragraph(inline(section.find("h2")).upper(), styles["section"]),
            divider,
        ])
        body = section.find("div")
        if "skills" in body.get("class", "").split():
            cells = list(body)
            story.append(table([
                [Paragraph(inline(cells[i]), styles["body"]),
                 Paragraph(inline(cells[i + 1]), styles["body"])]
                for i in range(0, len(cells), 2)
            ], [38 * mm, doc.width - 38 * mm]))
            continue

        for element in body:
            if element.get("class") == "row":
                story.append(table([[
                    Paragraph(inline(cell), right_style if cell.get("class") == "right" else styles["body"])
                    for cell in element
                ]], [doc.width * 0.72, doc.width * 0.28]))
            elif element.get("class") == "item":
                title = element.find("div[@class='item-title']")
                item = []
                company = element.find("p[@class='item-company']")
                if company is not None:
                    item.append(Paragraph(inline(company), styles["project_header"]))
                item.append(table([[
                    Paragraph(inline(title[0]), styles["project_header"]),
                    Paragraph(f"<i>{inline(title[1])}</i>", right_style),
                ]], [doc.width - 14 * mm, 14 * mm]))
                links = element.find("div[@class='links']")
                if links is not None:
                    item.append(Paragraph(inline(links), styles["project_links"]))
                item.append(ListFlowable([
                    ListItem(Paragraph(inline(li), bullet_style))
                    for li in element.findall("ul/li")
                ], bulletType="bullet", leftIndent=12,
                    bulletFontName="TimesNewRoman", bulletFontSize=7))
                item.append(Spacer(1, 5))
                story.append(KeepTogether(item))
            else:
                story.append(Paragraph(inline(element), styles["body"]))

    doc.build(story)
    print(f"{output_path}: {doc.page} page(s), sourced from {html_path}")
