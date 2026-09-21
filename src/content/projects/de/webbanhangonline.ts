import webbanhangAdminDashboard from "../../../assets/images/projects/source-profile/webbanhang-admin-dashboard.jpg";
import webbanhangCart from "../../../assets/images/projects/source-profile/webbanhang-cart.jpg";
import webbanhangCatalog from "../../../assets/images/projects/source-profile/webbanhang-catalog.jpg";
import webbanhangHome from "../../../assets/images/projects/source-profile/webbanhang-home.jpg";
import webbanhangPayment from "../../../assets/images/projects/source-profile/webbanhang-payment.jpg";
import webbanhangProductDetail from "../../../assets/images/projects/source-profile/webbanhang-product-detail.jpg";
import webbanhangSwagger from "../../../assets/images/projects/source-profile/webbanhang-swagger.jpg";

import type { ProjectContent } from "../../types";

export default {
  title: "WebBanHangOnline",
  theme: "dark",
  tags: ["dotnet", "sqlserver", "docker", "javascript"],
  source: "https://github.com/trxuanbac/WebBanHangOnline.git",
  description:
    "Website bán hàng thời trang xây dựng bằng ASP.NET Core MVC, Entity Framework Core, SQL Server, Identity, SignalR, Docker Compose, Swagger và bộ tài liệu BA/SA.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: webbanhangHome,
        alt: "Giao diện website bán hàng thời trang WebBanHangOnline",
        caption: "Trang chủ cửa hàng với tìm kiếm, giỏ hàng, wishlist và khám phá sản phẩm",
      },
    },
    {
      type: "gallery",
      props: {
        eyebrow: "Minh chứng sản phẩm",
        title: "Luồng mua sắm đầy đủ từ xem hàng đến thanh toán",
        description:
          "Recruiter có thể nhìn nhanh hành trình khách hàng thay vì chỉ đọc danh sách chức năng.",
        items: [
          {
            src: webbanhangCatalog,
            alt: "Danh sách sản phẩm thời trang trong WebBanHangOnline",
            caption: "Xem catalog với card sản phẩm, giá, thao tác nhanh và trang danh mục.",
          },
          {
            src: webbanhangProductDetail,
            alt: "Trang chi tiết sản phẩm với biến thể và tồn kho",
            caption: "Chi tiết sản phẩm có ảnh, đánh giá, chọn size, trạng thái tồn kho, thêm giỏ và mua ngay.",
          },
          {
            src: webbanhangCart,
            alt: "Giỏ hàng với sản phẩm đã chọn và tóm tắt checkout",
            caption: "Quản lý giỏ hàng với số lượng, sản phẩm đã chọn, tạm tính và CTA checkout.",
          },
          {
            src: webbanhangPayment,
            alt: "Trang chọn phương thức thanh toán",
            caption: "Checkout hỗ trợ COD, VNPay, MoMo, VietQR, thẻ demo và voucher.",
          },
        ],
      },
    },
    {
      type: "gallery",
      props: {
        eyebrow: "Minh chứng backend",
        title: "Dashboard quản trị và API được tài liệu hóa",
        description:
          "Dự án được định vị là portfolio Backend .NET, nên hai ảnh này giúp chứng minh phần quản trị, báo cáo và API rõ nhất.",
        items: [
          {
            src: webbanhangAdminDashboard,
            alt: "Dashboard admin có doanh thu, đơn hàng, người dùng và sản phẩm",
            caption: "Admin dashboard có tổng đơn, doanh thu, người dùng, sản phẩm, RFM, bỏ giỏ hàng và cohort.",
          },
          {
            src: webbanhangSwagger,
            alt: "Swagger UI hiển thị API endpoints của WebBanHangOnline",
            caption: "Swagger/OpenAPI cho catalog API, admin analytics API và payment webhook demo.",
          },
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Tổng quan",
        text: "WebBanHangOnline là dự án Backend .NET chủ lực trong portfolio, mô phỏng website bán hàng thời trang với luồng e-commerce đầy đủ từ xem sản phẩm đến checkout, theo dõi đơn hàng, quản trị, báo cáo doanh thu, kiểm thử API và tài liệu BA/SA.",
      },
    },
    {
      type: "list",
      props: {
        title: "Điểm nổi bật cho tuyển dụng",
        size: "lg",
        items: [
          "Vai trò: tự xây dựng Backend .NET và phụ trách tài liệu phân tích hệ thống.",
          "Phù hợp: Backend .NET Intern, System Analyst Intern hoặc API Testing Intern.",
          "Minh chứng chính: luồng e-commerce hoàn chỉnh với đăng nhập, admin, API, báo cáo, Docker demo và tài liệu BA/SA.",
          "Giá trị review: có source code, OpenAPI/Postman, thiết kế dữ liệu và hướng dẫn chạy demo local.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Công nghệ sử dụng",
        size: "lg",
        items: [
          "Backend: C#, ASP.NET Core MVC, Razor Pages, ASP.NET Core Identity.",
          "Database: SQL Server, Entity Framework Core, migration và seed data.",
          "Frontend: Razor Views, Bootstrap, jQuery, CSS và JavaScript.",
          "Realtime và AI: SignalR chat hub và Google Gemini API tư vấn sản phẩm.",
          "API và testing: ASP.NET Core Controller API, Swagger UI, OpenAPI YAML và Postman collection.",
          "DevOps và reporting: Docker, Docker Compose, dashboard doanh thu và export Excel bằng ClosedXML.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Chức năng khách hàng",
        size: "lg",
        items: [
          "Xem danh mục sản phẩm theo category và URL thân thiện SEO.",
          "Xem hình ảnh, mô tả, biến thể, giá, giá flash sale, tồn kho và đánh giá sản phẩm.",
          "Thêm sản phẩm vào giỏ hàng, cập nhật số lượng, lưu wishlist và checkout sản phẩm đã chọn.",
          "Chọn phương thức thanh toán gồm COD, VNPay, MoMo và VietQR demo.",
          "Xem lịch sử đơn hàng, theo dõi trạng thái và hủy đơn đang chờ xử lý.",
          "Sử dụng hỗ trợ/chat và chatbot Gemini tư vấn sản phẩm.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Chức năng quản trị",
        size: "lg",
        items: [
          "Quản lý sản phẩm, hình ảnh, biến thể, danh mục và tồn kho.",
          "Quản lý người dùng, vai trò, đơn hàng, trạng thái đơn, thông báo, yêu cầu hỗ trợ và FAQ.",
          "Theo dõi dashboard gồm tổng đơn hàng, doanh thu, doanh thu hôm nay, phân bổ trạng thái, đơn gần đây và sản phẩm bán chạy.",
          "Xuất báo cáo doanh thu ra Excel.",
          "Kiểm thử public catalog API, admin analytics API và demo payment webhook.",
          "Phân quyền theo vai trò Admin, Client và User bằng ASP.NET Core Identity.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Tài liệu và demo",
        size: "lg",
        items: [
          "Chuẩn bị tài liệu BA/SA gồm BRD, SRS, Use Cases, ERD, API Specification và API test cases.",
          "Có file OpenAPI và Postman collection phục vụ kiểm thử API.",
          "Đóng gói Docker Compose với web container, SQL Server container, database WebThoiTrang và volume lưu dữ liệu.",
          "Seed dữ liệu demo gồm 4 danh mục, 12 sản phẩm thời trang, biến thể, FAQ/hỗ trợ, thông báo, tài khoản admin, tài khoản customer và đơn hàng mẫu.",
          "Viết hướng dẫn chạy local bằng Docker và chạy không Docker với .NET SDK, SQL Server.",
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Kết quả",
        text: "Dự án đã được đóng gói Docker Compose với container webthoitrang, SQL Server webthoitrang-db, database WebThoiTrang, dữ liệu thời trang demo và tài khoản mẫu để chạy local tại port 8083.",
      },
    },
  ],
} as const satisfies ProjectContent;
