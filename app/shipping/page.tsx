export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Shipping Policy</h1>
        
        <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Delivery of Digital Assets</h2>
            <p>Devcraft Labs is a digital service provider. We deal exclusively in software, web development, and digital design. Therefore, no physical products are shipped, and no physical shipping policies apply.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Method of Delivery</h2>
            <p> Delivery is executed digitally. Final codebases, website access credentials, design files, and applications will be transferred to the client via secure cloud storage (e.g., GitHub, AWS, Google Drive) or deployed directly to the client’s designated hosting environment.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Delivery Timelines</h2>
            <p>Estimated delivery timelines are provided in the specific product descriptions or custom project proposals. Delivery dates are subject to change based on project complexity, scope revisions, and the timeliness of client feedback. You will be notified immediately of any adjustments to the delivery schedule.</p>
          </section>
        </div>
      </div>
    </div>
  );
}