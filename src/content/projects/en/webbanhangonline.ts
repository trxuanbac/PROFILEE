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
    "Online fashion e-commerce website built with ASP.NET Core MVC, Entity Framework Core, SQL Server, Identity, SignalR, Docker Compose, Swagger, and BA/SA documentation.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: webbanhangHome,
        alt: "WebBanHangOnline fashion e-commerce homepage",
        caption: "Fashion storefront with search, cart, wishlist, and product discovery",
      },
    },
    {
      type: "gallery",
      props: {
        eyebrow: "Product proof",
        title: "Full shopping flow, shown end to end",
        description:
          "Recruiters can quickly see the customer journey instead of reading it only as a feature list.",
        items: [
          {
            src: webbanhangCatalog,
            alt: "Product catalog with fashion product cards",
            caption: "Catalog browsing with product cards, prices, hover actions, and category pages.",
          },
          {
            src: webbanhangProductDetail,
            alt: "Product detail page with variants and stock state",
            caption: "Product detail with images, ratings, size selection, stock state, cart, and buy-now actions.",
          },
          {
            src: webbanhangCart,
            alt: "Shopping cart with selected items and checkout summary",
            caption: "Cart management with quantity controls, selected products, subtotal, and checkout CTA.",
          },
          {
            src: webbanhangPayment,
            alt: "Checkout payment method selection",
            caption: "Checkout payment selection with COD, VNPay, MoMo, VietQR, card, and voucher support.",
          },
        ],
      },
    },
    {
      type: "gallery",
      props: {
        eyebrow: "Backend proof",
        title: "Admin analytics and documented APIs",
        description:
          "The project is positioned as a Backend .NET portfolio case, so the strongest screenshots show operations data and API documentation.",
        items: [
          {
            src: webbanhangAdminDashboard,
            alt: "Admin dashboard with revenue, orders, users, and products",
            caption: "Admin dashboard with order totals, revenue, users, products, RFM, abandoned cart, and cohort data.",
          },
          {
            src: webbanhangSwagger,
            alt: "Swagger UI showing WebBanHangOnline API endpoints",
            caption: "Swagger/OpenAPI documentation for catalog, admin analytics, and payment webhook APIs.",
          },
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Overview",
        text: "WebBanHangOnline is my main Backend .NET portfolio project for an online fashion store. It covers the full e-commerce flow from catalog browsing to checkout, order tracking, admin management, analytics, payment testing, API documentation, and BA/SA documentation.",
      },
    },
    {
      type: "list",
      props: {
        title: "Recruiter Highlights",
        size: "lg",
        items: [
          "Role: solo Backend .NET developer and system-analysis document owner.",
          "Best fit: Backend .NET Intern, System Analyst Intern, or API Testing Intern.",
          "Strongest proof: complete e-commerce workflow with authentication, admin area, APIs, reporting, Docker demo, and BA/SA documents.",
          "Review value: recruiters can inspect source code, OpenAPI/Postman material, database design, and local demo setup.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Tech Stack",
        size: "lg",
        items: [
          "Backend: C#, ASP.NET Core MVC, Razor Pages, ASP.NET Core Identity.",
          "Database: SQL Server, Entity Framework Core, migrations, and seed data.",
          "Frontend: Razor Views, Bootstrap, jQuery, CSS, and JavaScript.",
          "Realtime and AI: SignalR chat hub and Google Gemini API for product consultation.",
          "API and testing: ASP.NET Core Controller API, Swagger UI, OpenAPI YAML, and Postman collection.",
          "DevOps and reporting: Docker, Docker Compose, admin revenue dashboard, and Excel export with ClosedXML.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Customer Features",
        size: "lg",
        items: [
          "Browse products by category and SEO-friendly URL.",
          "View product images, descriptions, variants, price, flash sale price, stock, and reviews.",
          "Add products to cart, update cart quantity, save wishlist items, and checkout selected items.",
          "Choose payment methods including COD, VNPay, MoMo, and VietQR demo flows.",
          "View order history, track order status, and cancel pending orders.",
          "Use support/chat features and Gemini product consultation chatbot.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Admin Features",
        size: "lg",
        items: [
          "Manage products, images, variants, categories, and stock.",
          "Manage users, roles, orders, order statuses, notifications, support requests, and FAQs.",
          "Review dashboard data including total orders, revenue, today revenue, status distribution, recent orders, and top products.",
          "Export revenue report to Excel.",
          "Test public catalog API, admin analytics API, and demo payment webhook.",
          "Use role-based access control with Admin, Client, and User roles.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Documentation and Demo",
        size: "lg",
        items: [
          "Prepared BA/SA documents: BRD, SRS, Use Cases, ERD, API Specification, and API test cases.",
          "Included OpenAPI file and Postman collection for API testing.",
          "Packaged Docker Compose demo with web container, SQL Server container, WebThoiTrang database, and persistent SQL volume.",
          "Seeded demo data with 4 categories, 12 fashion products, variants, FAQ/support content, notifications, admin account, customer account, and sample order.",
          "Documented local run steps for Docker and non-Docker setup with .NET SDK and SQL Server.",
        ],
      },
    },
    {
      type: "text",
      props: {
        title: "Result",
        text: "The project is packaged with Docker Compose using the webthoitrang app container, SQL Server container webthoitrang-db, WebThoiTrang database, seeded fashion demo data, and demo accounts for local review on port 8083.",
      },
    },
  ],
} as const satisfies ProjectContent;
