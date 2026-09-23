from pathlib import Path
import argparse
from cv_html import build_online_cv
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

OUTPUT_DIR = Path("public/files")
FONT_DIR = Path("/System/Library/Fonts/Supplemental")


def register_fonts():
    pdfmetrics.registerFont(TTFont("TimesNewRoman", FONT_DIR / "Times New Roman.ttf"))
    pdfmetrics.registerFont(TTFont("TimesNewRoman-Bold", FONT_DIR / "Times New Roman Bold.ttf"))
    pdfmetrics.registerFont(TTFont("TimesNewRoman-Italic", FONT_DIR / "Times New Roman Italic.ttf"))
    pdfmetrics.registerFont(TTFont("TimesNewRoman-BoldItalic", FONT_DIR / "Times New Roman Bold Italic.ttf"))
    pdfmetrics.registerFontFamily(
        "TimesNewRoman", normal="TimesNewRoman", bold="TimesNewRoman-Bold",
        italic="TimesNewRoman-Italic", boldItalic="TimesNewRoman-BoldItalic",
    )


def bullet_list(items, style):
    return ListFlowable(
        [ListItem(Paragraph(item, style), leftIndent=0) for item in items],
        bulletType="bullet",
        leftIndent=12,
        bulletFontName="TimesNewRoman",
        bulletFontSize=7.5,
        bulletOffsetY=1.2,
    )


def add_section(story, title, styles):
    story.append(Spacer(1, 4.5))
    story.append(Paragraph(title, styles["section"]))
    story.append(
        HRFlowable(
            width="100%",
            thickness=1,
            color=colors.HexColor("#333333"),
            spaceBefore=1.5,
            spaceAfter=3,
        )
    )


def get_styles():
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "name",
            parent=base["Title"],
            fontName="TimesNewRoman-Bold",
            fontSize=17,
            leading=18.5,
            alignment=TA_CENTER,
            spaceAfter=1.5,
        ),
        "headline": ParagraphStyle(
            "headline",
            parent=base["Normal"],
            fontName="TimesNewRoman-Bold",
            fontSize=10,
            leading=11.5,
            alignment=TA_CENTER,
        ),
        "contact": ParagraphStyle(
            "contact",
            parent=base["Normal"],
            fontName="TimesNewRoman",
            fontSize=8.5,
            leading=10.5,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#333333"),
        ),
        "section": ParagraphStyle(
            "section",
            parent=base["Heading2"],
            fontName="TimesNewRoman-Bold",
            fontSize=10.5,
            leading=12,
            spaceBefore=0,
            spaceAfter=0,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["BodyText"],
            fontName="TimesNewRoman",
            fontSize=8.5,
            leading=10.4,
            spaceAfter=1,
        ),
        "body_bold": ParagraphStyle(
            "body_bold",
            parent=base["BodyText"],
            fontName="TimesNewRoman-Bold",
            fontSize=8.6,
            leading=10.5,
            spaceAfter=1,
        ),
        "project_header": ParagraphStyle(
            "project_header",
            parent=base["BodyText"],
            fontName="TimesNewRoman-Bold",
            fontSize=8.6,
            leading=10.5,
            spaceAfter=0.5,
        ),
        "project_links": ParagraphStyle(
            "project_links",
            parent=base["BodyText"],
            fontName="TimesNewRoman-Italic",
            fontSize=8,
            leading=9.5,
            textColor=colors.HexColor("#0563c1"),
            spaceAfter=1.5,
        ),
    }


def build_cv(output_path, cv_data):
    styles = get_styles()
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        rightMargin=10 * mm,
        leftMargin=10 * mm,
        topMargin=9 * mm,
        bottomMargin=9 * mm,
        title=f"CV Tran Xuan Bac - {cv_data['title']}",
        author="Tran Xuan Bac",
    )

    story = [
        Paragraph("TRẦN XUÂN BẮC", styles["name"]),
        Paragraph(cv_data["title"], styles["headline"]),
        Spacer(1, 1),
        Paragraph(
            'Gia Bình, Bắc Ninh · <a href="mailto:Bxuan964@gmail.com">Bxuan964@gmail.com</a> · '
            '<a href="https://trxuanbac.github.io/PROFILEE/">Portfolio</a> · '
            '<a href="https://github.com/trxuanbac">GitHub</a>',
            styles["contact"],
        ),
    ]

    # Career Objective
    add_section(story, "CAREER OBJECTIVE", styles)
    story.append(Paragraph(cv_data["objective"], styles["body"]))

    # Technical Skills
    add_section(story, "TECHNICAL SKILLS", styles)
    skills_data = []
    for label, val in cv_data["skills"]:
        skills_data.append([
            Paragraph(f"<b><i>{label}:</i></b>", styles["body"]),
            Paragraph(val, styles["body"]),
        ])
    t = Table(skills_data, colWidths=[36 * mm, 154 * mm])
    t.setStyle(
        TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("TOPPADDING", (0, 0), (-1, -1), 0.5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ])
    )
    story.append(t)

    # Projects
    add_section(story, "PROJECTS", styles)
    for p in cv_data["projects"]:
        header_table = Table(
            [[Paragraph(f"<b>{p['name']}</b>", styles["project_header"]), Paragraph(f"<i>{p['year']}</i>", ParagraphStyle('r', parent=styles['body'], alignment=2))]],
            colWidths=[160 * mm, 30 * mm]
        )
        header_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(header_table)
        story.append(Paragraph(f"GitHub: <a href='{p['github']}'>{p['github']}</a>", styles["project_links"]))
        story.append(bullet_list(p["bullets"], styles["body"]))
        story.append(Spacer(1, 2))

    # Education & English
    add_section(story, "EDUCATION & CERTIFICATION", styles)
    edu_table = Table(
        [
            [
                Paragraph("<b>Dai Nam University</b> - Bachelor of Information Technology", styles["body_bold"]),
                Paragraph("Hanoi, Vietnam | <i>2023 - 2026</i>", ParagraphStyle('r', parent=styles['body'], alignment=2))
            ],
            [
                Paragraph("<b>English:</b> Technical documentation reading proficiency", styles["body"]),
                Paragraph("", styles["body"])
            ]
        ],
        colWidths=[130 * mm, 60 * mm]
    )
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu_table)

    doc.build(story)
    print(f"{output_path}: {doc.page} page(s)")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--online-only", action="store_true", help="Generate only the default PDFs from the online CV")
    args = parser.parse_args()
    register_fonts()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for name in ["CV-Tran-Xuan-Bac.pdf", "CV-Tran-Xuan-Bac-2026.pdf"]:
        build_online_cv(OUTPUT_DIR / name, OUTPUT_DIR / "CV-Tran-Xuan-Bac.html", get_styles())
    build_online_cv(
        OUTPUT_DIR / "CV-Tran-Xuan-Bac-VI.pdf",
        OUTPUT_DIR / "CV-Tran-Xuan-Bac-VI.html", get_styles(),
        title="CV Trần Xuân Bắc - Tiếng Việt",
    )
    if args.online_only:
        return

    # 1. SYSTEM ANALYST INTERN
    sa_cv = {
        "title": "SYSTEM ANALYST INTERN",
        "objective": "Information Technology student pursuing a System Analyst internship, with hands-on experience in requirement analysis, Use Case, ERD, API documentation, database design, and ASP.NET Core development. Seeking to strengthen system analysis and software documentation skills through real-world projects.",
        "skills": [
            ("System Analysis", "Requirement Analysis, Use Case, UML, ERD, Business Flow, BRD, SRS"),
            ("API & Testing", "REST API, API Specification, Postman, Swagger/OpenAPI, API Testing"),
            ("Database", "SQL Server, PostgreSQL, MySQL, SQLite, Database Design"),
            ("Backend", "C#, ASP.NET Core MVC/Web API, EF Core, Identity, SignalR"),
            ("Programming", "C#, Python, JavaScript, SQL"),
            ("Tools & DevOps", "Docker, Docker Compose, Git, GitHub"),
        ],
        "projects": [
            {
                "name": "WebBanHangOnline - Online Fashion E-commerce Website (ASP.NET Core)",
                "year": "2026",
                "github": "https://github.com/trxuanbac/WebBanHangOnline.git",
                "bullets": [
                    "Analyzed business requirements and authored complete System Analyst documentation: BRD, SRS, Use Cases, ERD, and API specifications.",
                    "Designed relational database schema in SQL Server; modeled data relationships for catalog, variants, stock, cart, orders, and reviews.",
                    "Specified RESTful API contracts with Swagger/OpenAPI and defined Postman test collections for API endpoint verification.",
                    "Modeled authentication and authorization workflows with ASP.NET Core Identity, defining distinct permissions for Admin and Customer roles.",
                    "Designed end-to-end payment flows (VNPay, MoMo, VietQR, COD), SignalR realtime notification hub, and containerized with Docker Compose.",
                ],
            },
            {
                "name": "Scant Reports - Data Ingestion and Multi-format Report Export System",
                "year": "2026",
                "github": "https://github.com/trxuanbac/scant.git",
                "bullets": [
                    "Gathered requirements and designed data processing workflows for user authentication, CSV/XLSX file ingestion, and automated report generation.",
                    "Defined role-based access control (Admin/User), audit log specifications, health check monitoring, and system backup/restore procedures.",
                    "Formulated report templating specifications supporting multi-format exports (HTML, CSV, Word DOCX, PDF) and containerized with Docker.",
                ],
            },
            {
                "name": "Student Management System - System Analysis Course Project",
                "year": "2024",
                "github": "https://github.com/trxuanbac/PROFILEE",
                "bullets": [
                    "Analyzed functional requirements, modeled Use Case diagrams, designed ERD schema, and defined data integrity constraints in SQL Server.",
                ],
            },
        ],
    }

    # 2. BACKEND .NET INTERN
    backend_cv = {
        "title": "BACKEND .NET INTERN",
        "objective": "Information Technology student pursuing a Backend .NET Developer internship, with hands-on experience in C#, ASP.NET Core MVC/Web API, Entity Framework Core, SQL Server database design, authentication/authorization, and Docker containerization. Seeking to contribute to scalable backend architectures and build reliable software solutions.",
        "skills": [
            ("Backend & Frameworks", "C#, ASP.NET Core MVC/Web API, Entity Framework Core, ASP.NET Core Identity, SignalR, RESTful APIs"),
            ("Database", "SQL Server, PostgreSQL, MySQL, SQLite, Database Design, Indexing, EF Migrations, ERD"),
            ("Languages", "C#, SQL, Python, JavaScript"),
            ("Tools & DevOps", "Docker, Docker Compose, Git, GitHub, Swagger/OpenAPI, Postman"),
            ("System Design", "MVC Architecture, Multi-tier Architecture, Requirement Analysis, BRD/SRS, Use Case"),
        ],
        "projects": [
            {
                "name": "WebBanHangOnline - Online Fashion E-commerce Website (ASP.NET Core)",
                "year": "2026",
                "github": "https://github.com/trxuanbac/WebBanHangOnline.git",
                "bullets": [
                    "Architected and built full e-commerce backend using ASP.NET Core MVC, EF Core, and SQL Server with seeded demo data.",
                    "Implemented authentication & role-based authorization using ASP.NET Core Identity, securing admin management and customer checkout workflows.",
                    "Developed RESTful APIs with Swagger/OpenAPI documentation for catalog search, admin analytics, order processing, and payment webhook integrations.",
                    "Integrated payment gateways (VNPay, MoMo, VietQR, COD), SignalR realtime notification hub, and Gemini AI chatbot for product consultation.",
                    "Containerized web application and SQL Server database with Docker Compose for consistent multi-container deployments.",
                ],
            },
            {
                "name": "Scant Reports - Data Processing and Report Generation Web Application",
                "year": "2026",
                "github": "https://github.com/trxuanbac/scant.git",
                "bullets": [
                    "Developed backend services in Python for secure file ingestion (CSV/XLSX), batch data parsing, and multi-format report generation (HTML, CSV, DOCX, PDF).",
                    "Implemented user authentication, role-based access control, password reset workflows, audit logging, and automated backup/restore scripts.",
                    "Containerized the application with Docker and wrote unit test suites to ensure reliable data processing.",
                ],
            },
            {
                "name": "Student Management System - Database & Backend Course Project",
                "year": "2024",
                "github": "https://github.com/trxuanbac/PROFILEE",
                "bullets": [
                    "Designed relational schema, implemented CRUD operations, stored procedures, and database constraints in SQL Server.",
                ],
            },
        ],
    }

    # 3. API TESTING INTERN
    testing_cv = {
        "title": "API TESTING INTERN",
        "objective": "Information Technology student pursuing an API Testing / QA internship, with hands-on experience in RESTful API testing, Postman test scripts & collections, Swagger/OpenAPI specifications, database validation (SQL Server), and backend integration. Seeking to ensure software quality, API reliability, and test automation in real-world projects.",
        "skills": [
            ("API & QA Testing", "RESTful API Testing, Postman (Collections, Tests, Variables, Scripts), Swagger/OpenAPI, Test Cases, Payload Validation"),
            ("Database & Validation", "SQL Server, PostgreSQL, MySQL, SQLite, Data Verification Queries, Schema Validation"),
            ("Backend Knowledge", "ASP.NET Core Web API, Identity (JWT/Cookie Auth), Webhook simulation, SignalR"),
            ("Languages & Scripting", "JavaScript (Postman test scripts), SQL, C#, Python"),
            ("Tools & DevOps", "Docker, Docker Compose, Git, GitHub, Swagger UI, Postman Newman"),
        ],
        "projects": [
            {
                "name": "WebBanHangOnline - Online Fashion E-commerce Website (ASP.NET Core)",
                "year": "2026",
                "github": "https://github.com/trxuanbac/WebBanHangOnline.git",
                "bullets": [
                    "Designed comprehensive Postman test collections with automated test scripts validating HTTP status codes, response times, headers, and JSON schemas.",
                    "Conducted functional and boundary testing across 20+ API endpoints: authentication, product catalog, cart, orders, and admin analytics.",
                    "Tested payment gateway webhooks (VNPay, MoMo, VietQR) simulating callback payloads, checksum validations, and edge-case failure responses.",
                    "Executed SQL Server database validation queries after API transactions to verify data consistency, inventory deductions, and order state updates.",
                    "Authored OpenAPI/Swagger specifications and prepared structured test documentation, test suites, and Dockerized test environments.",
                ],
            },
            {
                "name": "Scant Reports - Data Ingestion and Multi-format Report Export System",
                "year": "2026",
                "github": "https://github.com/trxuanbac/scant.git",
                "bullets": [
                    "Validated file upload endpoints (CSV/XLSX) testing boundary conditions, file size limits, MIME type validation, and malformed file handling.",
                    "Tested authentication, session management, role-based access control (Admin/User), password reset workflows, and audit log tracking.",
                    "Verified exported data accuracy across HTML, CSV, DOCX, and PDF formats against raw dataset inputs; executed regression tests in Docker.",
                ],
            },
            {
                "name": "Student Management System - Testing & Validation Course Project",
                "year": "2024",
                "github": "https://github.com/trxuanbac/PROFILEE",
                "bullets": [
                    "Designed test cases and executed SQL queries to validate student enrollment, grade calculations, and database integrity constraints.",
                ],
            },
        ],
    }

    build_cv(OUTPUT_DIR / "CV-Tran-Xuan-Bac-System-Analyst.pdf", sa_cv)
    build_cv(OUTPUT_DIR / "CV-Tran-Xuan-Bac-Backend-NET.pdf", backend_cv)
    build_cv(OUTPUT_DIR / "CV-Tran-Xuan-Bac-API-Testing.pdf", testing_cv)
    print("All CV PDFs generated successfully!")


if __name__ == "__main__":
    main()
