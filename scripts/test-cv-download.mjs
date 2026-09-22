import { existsSync, readFileSync } from "node:fs";
import assert from "node:assert/strict";

const pdfPath = "public/files/CV-Tran-Xuan-Bac-2026.pdf";
const cvHtml = readFileSync("public/files/CV-Tran-Xuan-Bac.html", "utf8");
const heroVue = readFileSync("src/features/home/components/Hero.vue", "utf8");
const contactVue = readFileSync("src/features/home/components/Contact.vue", "utf8");
const indexHtml = readFileSync("index.html", "utf8");
const enMessages = readFileSync("src/i18n/messages/namespaces/common/en.json", "utf8");
const viMessages = readFileSync("src/i18n/messages/namespaces/common/de.json", "utf8");

assert.equal(existsSync(pdfPath), true, `CV PDF file should exist: ${pdfPath}`);

assert.match(
  heroVue,
  /const cvPagePath = `\$\{import\.meta\.env\.BASE_URL\}files\/CV-Tran-Xuan-Bac\.html\?v=20260922-english`;/,
  "Hero Download CV button should open the cache-busted CV page first",
);
assert.match(
  contactVue,
  /const cvPagePath = `\$\{import\.meta\.env\.BASE_URL\}files\/CV-Tran-Xuan-Bac\.html\?v=20260922-english`;/,
  "Contact Download CV link should open the cache-busted CV page first",
);
assert.doesNotMatch(
  heroVue,
  /download="CV-Tran-Xuan-Bac\.pdf"/,
  "Hero Download CV button should not download the PDF directly",
);

assert.match(
  cvHtml,
  /<a\s+href="\.\/CV-Tran-Xuan-Bac-2026\.pdf\?v=20260922-english"\s+download="CV-Tran-Xuan-Bac-2026\.pdf"\s+onclick="downloadPdf\(event\)">Download CV PDF<\/a>/,
  "CV page should have a cache-busted PDF download link",
);
assert.match(
  cvHtml,
  /BACKEND \.NET DEVELOPER \| SYSTEM ANALYST/,
  "Default CV should target only Backend .NET and System Analysis",
);
assert.match(
  cvHtml,
  /Seeking to apply my academic knowledge to real business processes and projects while strengthening my skills in software development, databases, and systems analysis\.\s+Aiming to contribute effectively to company projects and grow into a professional with strong technical expertise\./,
  "CV career objective should use the updated professional development summary",
);
assert.match(
  cvHtml,
  /<div><strong>Languages:<\/strong><\/div>\s+<div>C#, Python, JavaScript, SQL, HTML\/CSS<\/div>/,
  "CV skills should include the requested languages",
);
assert.match(
  cvHtml,
  /<div><strong>Backend:<\/strong><\/div>\s+<div>ASP\.NET Core MVC\/Web API, Entity Framework Core, RESTful API, ASP\.NET Core Identity<\/div>/,
  "CV skills should include the requested backend stack",
);
assert.match(
  cvHtml,
  /<div><strong>Databases:<\/strong><\/div>\s+<div>SQL Server, PostgreSQL, MySQL, SQLite<\/div>/,
  "CV skills should include the requested databases",
);
assert.match(
  cvHtml,
  /<div><strong>Tools:<\/strong><\/div>\s+<div>Git\/GitHub, Docker\/Docker Compose, Postman<\/div>/,
  "CV skills should include the requested tools",
);
assert.doesNotMatch(
  cvHtml,
  /Analysis & Testing/,
  "CV skills should not include the removed Analysis & Testing group",
);
assert.match(
  cvHtml,
  /WebBanHangOnline - Fashion E-commerce Website \| Personal Project/,
  "CV WebBanHangOnline project title should use English",
);
assert.match(
  cvHtml,
  /Built a fashion e-commerce system using ASP\.NET Core MVC, Entity Framework Core, SQL Server, Bootstrap, and jQuery\./,
  "CV WebBanHangOnline project should include the shortened stack summary",
);
assert.match(
  cvHtml,
  /Analyzed requirements and prepared system documentation, including BRD, SRS, Use Cases, ERD, API specifications, OpenAPI\/Swagger documentation, Postman collections, and API test cases\./,
  "CV WebBanHangOnline project should include the system documentation summary",
);
assert.doesNotMatch(
  cvHtml,
  /Mục tiêu nghề nghiệp|Học vấn|Kỹ năng chuyên môn|Dự án cá nhân|Đồ án|Phát triển|Triển khai/,
  "Online CV should no longer contain Vietnamese headings or project descriptions",
);
assert.doesNotMatch(
  cvHtml,
  /Developed admin features for managing products/,
  "CV WebBanHangOnline project should not include the longer old English bullet list",
);
assert.doesNotMatch(
  cvHtml,
  /API Testing Intern/,
  "Default CV should not target API Testing as a job",
);
assert.match(
  indexHtml,
  /Backend \.NET Intern\/Fresher \| System Analysis/,
  "Portfolio metadata should target only Backend .NET and System Analysis",
);
assert.match(
  enMessages + viMessages,
  /BACKEND \.NET DEVELOPER \| SYSTEM ANALYST/,
  "Portfolio hero title should target only Backend .NET and System Analysis",
);
assert.doesNotMatch(
  cvHtml,
  /<h2>Career Fit<\/h2>/,
  "CV page should not include the Career Fit section",
);
assert.doesNotMatch(
  cvHtml,
  /Can support ASP\.NET Core MVC\/Web API features/,
  "CV page should not include the removed Backend .NET career fit copy",
);
assert.doesNotMatch(
  cvHtml,
  /translating business logic into backend implementation notes/,
  "CV page should not include the removed System Analyst career fit copy",
);
assert.match(
  cvHtml,
  /function downloadPdf\(event\)/,
  "CV page should force the PDF download instead of relying on the browser PDF viewer",
);
assert.match(
  cvHtml,
  /<button type="button" onclick="window\.print\(\)">Print CV<\/button>/,
  "Print action should remain available as a button",
);

console.log("All CV tests passed successfully!");
