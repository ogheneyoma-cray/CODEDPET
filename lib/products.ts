export type Product = {
  id: string;
  sku: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  category: string;
};

export const products: Product[] = [
  {
    id: "DL-LP-001",
    name: "Landing Page Development",
    shortDesc: "High-converting single-page site.",
    fullDesc: "Get a blazing-fast, custom-coded landing page tailored to your campaign. Includes responsive design, CRM integration, and basic SEO optimization. Delivered in 5 business days.",
    price: 499.00,
    sku: "DL-LP-001",
    category: "Web Development"
  },
  {
    id: "DL-CW-002",
    name: "5-Page Corporate Website",
    shortDesc: "Professional business site build.",
    fullDesc: "A complete digital storefront for your business. Includes Home, About, Services, Blog, and Contact pages built on a scalable CMS. Fully responsive and optimized for speed.",
    price: 1499.00,
    sku: "DL-CW-002",
    category: "Web Development"
  },
  {
    id: "DL-EC-003",
    name: "WooCommerce Store Setup",
    shortDesc: "Turnkey e-commerce platform.",
    fullDesc: "Launch your online store with confidence. We handle the full WooCommerce setup, payment gateway integration, shipping configuration, and upload your first 25 products.",
    price: 2499.00,
    sku: "DL-EC-003",
    category: "Web Development"
  },
  {
    id: "DL-MVP-004",
    name: "Custom Web Application MVP",
    shortDesc: "Minimum Viable Product build.",
    fullDesc: "Turn your startup idea into reality. We build a functional, scalable MVP web application using React and Node.js to help you secure funding or test your market.",
    price: 8500.00,
    sku: "DL-MVP-004",
    category: "Software Dev"
  },
  {
    id: "DL-API-005",
    name: "API Integration Service",
    shortDesc: "Seamless third-party connections.",
    fullDesc: "Automate your workflow by connecting your existing software. We will integrate up to two third-party APIs (e.g., Stripe, Twilio, Salesforce) securely into your current application.",
    price: 850.00,
    sku: "DL-API-005",
    category: "Software Dev"
  },
  {
    id: "DL-UX-006",
    name: "Mobile App UI/UX Design",
    shortDesc: "Complete app interface design.",
    fullDesc: "Give your users an unforgettable experience. Includes wireframing, interactive prototyping, and high-fidelity UI design for up to 15 app screens (Figma delivery).",
    price: 2200.00,
    sku: "DL-UX-006",
    category: "UI/UX Design"
  },
  {
    id: "DL-PA-007",
    name: "Website Performance Audit",
    shortDesc: "Deep dive into site speed & code.",
    fullDesc: "Is your website running slow? We provide a comprehensive PDF report analyzing your codebase, server response times, and front-end assets, along with an actionable optimization plan.",
    price: 299.00,
    sku: "DL-PA-007",
    category: "Support & Audits"
  },
  {
    id: "DL-MT-008",
    name: "Monthly Tech Support (Basic)",
    shortDesc: "Essential website maintenance.",
    fullDesc: "Peace of mind for your digital assets. Includes weekly plugin updates, daily cloud backups, 24/7 uptime monitoring, and up to 2 hours of development support per month.",
    price: 250.00,
    sku: "DL-MT-008",
    category: "Maintenance"
  },
  {
    id: "DL-MT-009",
    name: "Monthly Tech Support (Pro)",
    shortDesc: "Advanced maintenance & scaling.",
    fullDesc: "Ideal for growing e-commerce sites and web apps. Includes daily updates, real-time security scanning, database optimization, and up to 10 hours of dedicated development time.",
    price: 850.00,
    sku: "DL-MT-009",
    category: "Maintenance"
  },
  {
    id: "DL-DB-010",
    name: "Database Migration Service",
    shortDesc: "Secure data transfer & setup.",
    fullDesc: "Moving to a new server or cloud provider? We ensure a zero-data-loss migration of your SQL or NoSQL databases with minimal downtime and complete security verification.",
    price: 1200.00,
    sku: "DL-DB-010",
    category: "Software Dev"
  },
  {
    id: "DL-SC-011",
    name: "SaaS Architecture Consulting",
    shortDesc: "3-Hour technical strategy session.",
    fullDesc: "Plan your software architecture the right way. Consult with our senior engineers to define your tech stack, database schema, and cloud infrastructure before you start coding.",
    price: 450.00,
    sku: "DL-SC-011",
    category: "Consulting"
  },
  {
    id: "DL-WP-012",
    name: "Custom WordPress Plugin",
    shortDesc: "Tailored WP functionality.",
    fullDesc: "Need WordPress to do something out of the box? We will develop a secure, lightweight, custom WordPress plugin strictly tailored to your specific business requirements.",
    price: 1100.00,
    sku: "DL-WP-012",
    category: "Web Development"
  },
];