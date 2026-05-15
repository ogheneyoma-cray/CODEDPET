export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Shipping & Delivery Policy</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: May 2026</p>

        <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Nature of Our Products</h2>
            <p>Codedpet is a digital services company. All of the services and products we offer — including website development, software engineering, UI/UX design, API integration, and technical consulting — are delivered entirely in digital form. No physical products are manufactured, packaged, or shipped. As such, traditional shipping carriers, transit times, and shipping fees do not apply to any purchases made through our platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Method of Delivery</h2>
            <p>All digital deliverables are transferred to clients through secure and reliable digital channels. Depending on the nature of the service purchased, delivery may be executed via one or more of the following methods: direct deployment to the client&apos;s designated web hosting or cloud environment; access credentials and files shared via secure cloud storage platforms (e.g., Google Drive or a private GitHub repository); Figma or design file links for UI/UX deliverables; or PDF reports for audit and consulting services. The specific delivery method for your project will be confirmed in writing before work commences.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Estimated Delivery Timelines</h2>
            <p>Each service listed on our shop includes an estimated delivery timeline within its product description. These timelines begin from the date payment is confirmed and all required project materials have been received from the client. For productized services, delivery timelines are as follows: Landing Pages — 5 business days; Corporate Websites — 10–15 business days; WooCommerce Store Setup — 14 business days; Custom Web Applications — agreed per project scope; Design work — 7–10 business days. All timelines are estimates and may be subject to change based on project complexity, scope revisions, or delays in client communication.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Delays and Communication</h2>
            <p>Codedpet is committed to transparent communication throughout every project. If your delivery is expected to be delayed for any reason — whether due to unforeseen technical complexity, scope changes, or other factors — you will be notified immediately via the email address you provided at the time of purchase. We will provide a revised delivery estimate and continue to keep you updated on progress. Delays caused by late submission of required assets, content, or feedback from the client&apos;s side may extend the agreed delivery timeline without penalty to Codedpet.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Post-Delivery Support</h2>
            <p>Upon final delivery of your project, our team is available to assist with any questions regarding setup, access, or usage of the delivered materials. Standard post-delivery support is included for 7 days following the date of final delivery. For ongoing technical support, maintenance, and updates, we offer dedicated Monthly Tech Support packages available in our shop. If you have any questions about delivery or require an expedited timeline, please contact us at <a href="mailto:info@codedpet.com" className="text-[#00C853] hover:underline">info@codedpet.com</a> or call <a href="tel:+2348037113204" className="text-[#00C853] hover:underline">+234 803 711 3204</a> before placing your order.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
