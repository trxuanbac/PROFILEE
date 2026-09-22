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
  /const cvPagePath = `\$\{import\.meta\.env\.BASE_URL\}files\/CV-Tran-Xuan-Bac\.html\?v=20260922-skills`;/,
  "Hero Download CV button should open the cache-busted CV page first",
);
assert.match(
  contactVue,
  /const cvPagePath = `\$\{import\.meta\.env\.BASE_URL\}files\/CV-Tran-Xuan-Bac\.html\?v=20260922-skills`;/,
  "Contact Download CV link should open the cache-busted CV page first",
);
assert.doesNotMatch(
  heroVue,
  /download="CV-Tran-Xuan-Bac\.pdf"/,
  "Hero Download CV button should not download the PDF directly",
);

assert.match(
  cvHtml,
  /<a\s+href="\.\/CV-Tran-Xuan-Bac-2026\.pdf\?v=20260922-skills"\s+download="CV-Tran-Xuan-Bac-2026\.pdf"\s+onclick="downloadPdf\(event\)">Tải CV PDF<\/a>/,
  "CV page should have a cache-busted PDF download link",
);
assert.match(
  cvHtml,
  /BACKEND \.NET DEVELOPER \| SYSTEM ANALYST/,
  "Default CV should target only Backend .NET and System Analysis",
);
assert.match(
  cvHtml,
  /Mong muốn vận dụng kiến thức chuyên ngành vào các nghiệp vụ và dự án thực tế của công ty, đồng thời nâng cao kỹ năng phát triển phần mềm, cơ sở dữ liệu và phân tích hệ thống\.\s+Hướng đến việc đóng góp hiệu quả cho các dự án của doanh nghiệp và phát triển thành nhân sự có chuyên môn vững vàng trong tương lai\./,
  "CV career objective should use the updated professional development summary",
);
assert.match(
  cvHtml,
  /<div><strong>Ngôn ngữ lập trình:<\/strong><\/div>\s+<div>C#, Python, JavaScript, SQL, HTML\/CSS<\/div>/,
  "CV skills should include the requested languages",
);
assert.match(
  cvHtml,
  /<div><strong>Backend:<\/strong><\/div>\s+<div>ASP\.NET Core MVC\/Web API, Entity Framework Core, RESTful API, ASP\.NET Core Identity<\/div>/,
  "CV skills should include the requested backend stack",
);
assert.match(
  cvHtml,
  /<div><strong>Cơ sở dữ liệu:<\/strong><\/div>\s+<div>SQL Server, PostgreSQL, MySQL, SQLite<\/div>/,
  "CV skills should include the requested databases",
);
assert.match(
  cvHtml,
  /<div><strong>Công cụ và khác:<\/strong><\/div>\s+<div>Git\/GitHub, Docker\/Docker Compose, Postman<\/div>/,
  "CV skills should include the requested tools",
);
assert.doesNotMatch(
  cvHtml,
  /Analysis & Testing/,
  "CV skills should not include the removed Analysis & Testing group",
);
assert.match(
  cvHtml,
  /WebBanHangOnline - Website thương mại điện tử thời trang \| Dự án cá nhân/,
  "CV WebBanHangOnline project title should use Vietnamese",
);
assert.match(
  cvHtml,
  /Xây dựng hệ thống thương mại điện tử thời trang bằng ASP\.NET Core MVC, Entity Framework Core, SQL Server, Bootstrap và jQuery\./,
  "CV WebBanHangOnline project should include the shortened stack summary",
);
assert.match(
  cvHtml,
  /Phân tích và xây dựng tài liệu hệ thống gồm BRD, SRS, Use Case, ERD, đặc tả API, tài liệu OpenAPI\/Swagger, bộ yêu cầu Postman và các ca kiểm thử API\./,
  "CV WebBanHangOnline project should include the system documentation summary",
);
assert.doesNotMatch(
  cvHtml,
  /Career Objective|Education|Technical Skills|Additional Coursework \/ Analysis|Personal Project|Course Project|Developed |Implemented |Researched /,
  "Online CV should no longer contain English headings or project descriptions",
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
  /<button type="button" onclick="window\.print\(\)">In CV<\/button>/,
  "Print action should remain available as a button",
);

console.log("All CV tests passed successfully!");
