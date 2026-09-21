import backendWorkspace from "../../../assets/images/profile/backend-workspace.png";

import type { ProjectContent } from "../../types";

export default {
  title: "Scant Reports",
  theme: "dark",
  tags: ["python", "docker", "analysis"],
  source: "https://github.com/trxuanbac/scant.git",
  description:
    "Web app tự phát triển hỗ trợ đăng ký, đăng nhập, upload CSV/XLSX, phân tích dữ liệu tự động và xuất báo cáo HTML, CSV, DOCX, PDF.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: backendWorkspace,
        alt: "Không gian làm việc backend và báo cáo",
        caption: "Luồng upload dữ liệu và xuất báo cáo",
      },
    },
    {
      type: "text",
      props: {
        title: "Tổng quan",
        text: "Scant Reports là web app báo cáo nội bộ tự phát triển, tập trung vào đăng nhập, phân quyền, upload CSV/XLSX, kiểm tra dữ liệu tự động, sinh báo cáo, export nhiều định dạng, audit log và khả năng triển khai.",
      },
    },
    {
      type: "list",
      props: {
        title: "Điểm nổi bật cho tuyển dụng",
        size: "lg",
        items: [
          "Vai trò: tự xây dựng backend, xử lý upload, phân quyền, báo cáo và tài liệu triển khai.",
          "Phù hợp: Backend Intern, API Testing Intern hoặc vị trí phát triển công cụ nội bộ.",
          "Minh chứng chính: app báo cáo có đăng nhập, upload file, tổng hợp dữ liệu, export đa định dạng, audit log, backup, Docker và test.",
          "Giá trị review: thể hiện luồng backend thực tế vượt ngoài CRUD cơ bản.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Chức năng chính",
        size: "lg",
        items: [
          "Hỗ trợ đăng ký, đăng nhập, phân quyền admin/user, khóa/mở tài khoản, đổi mật khẩu và reset link.",
          "Upload CSV/XLSX, tổng hợp số dòng, số cột, cột số, dữ liệu thiếu và nhóm giá trị phổ biến.",
          "Xuất báo cáo HTML, CSV tổng hợp, Word DOCX, PDF và hỗ trợ template HTML/Word tùy chỉnh.",
          "Có audit log, health check, backup/restore, Docker, tài liệu deploy Nginx/HTTPS và unit tests.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Backend và vận hành",
        size: "lg",
        items: [
          "Xây dựng luồng đăng nhập, phân quyền và khu vực admin/user.",
          "Thiết kế xử lý upload file có cấu trúc và kiểm tra dữ liệu trước khi sinh báo cáo.",
          "Tổng hợp dữ liệu dạng bảng gồm chỉ số số học, dữ liệu thiếu và nhóm giá trị xuất hiện nhiều.",
          "Hỗ trợ export nhiều định dạng phù hợp nghiệp vụ: HTML, CSV, DOCX và PDF.",
          "Bổ sung audit log, health endpoint, backup, restore và tài liệu triển khai.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Kỹ năng thể hiện",
        size: "lg",
        items: [
          "Phát triển backend Python và thiết kế luồng xử lý file.",
          "Bảo mật theo vai trò, quản trị tài khoản và nghiệp vụ admin.",
          "Thiết kế template báo cáo cho HTML và Word.",
          "Đóng gói Docker và tư duy triển khai công cụ nội bộ.",
          "Viết unit test và tài liệu hướng bảo trì.",
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Vai trò và kết quả",
        text: "Tự xây dựng backend, xử lý upload, phân quyền, xuất báo cáo và tài liệu vận hành. Kết quả là ứng dụng báo cáo nội bộ có đăng nhập, xử lý dữ liệu, export đa định dạng và khả năng bảo trì.",
      },
    },
  ],
} as const satisfies ProjectContent;
