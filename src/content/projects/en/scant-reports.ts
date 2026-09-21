import backendWorkspace from "../../../assets/images/profile/backend-workspace.png";

import type { ProjectContent } from "../../types";

export default {
  title: "Scant Reports",
  theme: "dark",
  tags: ["python", "docker", "analysis"],
  source: "https://github.com/trxuanbac/scant.git",
  description:
    "Self-developed reporting web app for registration, login, CSV/XLSX upload, automated data summaries, and report export to HTML, CSV, DOCX, and PDF.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: backendWorkspace,
        alt: "Backend reporting workspace illustration",
        caption: "Data upload and reporting workflow",
      },
    },
    {
      type: "text",
      props: {
        title: "Overview",
        text: "Scant Reports is a self-developed internal reporting web application. The project focuses on authentication, role-based access, CSV/XLSX upload, automatic dataset inspection, report generation, export formats, auditability, and deployment readiness.",
      },
    },
    {
      type: "list",
      props: {
        title: "Recruiter Highlights",
        size: "lg",
        items: [
          "Role: solo backend developer for upload processing, authorization, reports, and deployment notes.",
          "Best fit: Backend Intern, API Testing Intern, or internal-tool developer role.",
          "Strongest proof: authenticated reporting tool with file upload, data summaries, multi-format export, audit log, backup, Docker, and tests.",
          "Review value: demonstrates practical backend workflow beyond CRUD screens.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Core Features",
        size: "lg",
        items: [
          "Supports user registration, login, admin/user roles, account lock and unlock, password changes, and reset links.",
          "Processes CSV/XLSX uploads and summarizes rows, columns, numeric columns, missing data, and frequent value groups.",
          "Exports HTML reports, summary CSV, Word DOCX, and PDF with customizable HTML/Word report templates.",
          "Includes audit log, health check, backup and restore, Docker packaging, Nginx/HTTPS deployment notes, and unit tests.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Backend and Operations",
        size: "lg",
        items: [
          "Built authentication and authorization flows for user and admin areas.",
          "Designed upload handling for structured files and validation before report processing.",
          "Generated report summaries from tabular data, including numeric insights, missing values, and frequent groups.",
          "Added export support for multiple business-friendly formats: HTML, CSV, DOCX, and PDF.",
          "Prepared operational features such as audit log, health endpoint, backup, restore, and deployment documentation.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Skills Demonstrated",
        size: "lg",
        items: [
          "Python web backend development and file-processing workflow design.",
          "Role-based security, admin workflows, and account management.",
          "Report template design for HTML and Word output.",
          "Docker packaging and deployment thinking for internal tools.",
          "Unit testing and maintenance-oriented documentation.",
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Role and outcome",
        text: "I built the backend, upload processing, authorization, report generation, and deployment documentation. The result is a practical internal reporting tool with authentication, data processing, multi-format export, and maintenance support.",
      },
    },
  ],
} as const satisfies ProjectContent;
