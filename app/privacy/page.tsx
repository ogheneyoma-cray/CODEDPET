export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
            <p>At Devcraft Labs, protecting your privacy is at the core of our operations. This Privacy Policy details how we collect, use, process, and protect your personal information when you use our website or engage our development services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>
            <p>We may collect personal identification information (Name, Email address, Phone number, Company details) when you fill out contact forms or purchase our services. We also collect non-personal identification information automatically, such as browser type, device information, and IP addresses via cookies, to optimize our website`s performance.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Your Data</h2>
            <p>The data we collect is used strictly to provide and improve our services, process payments, deliver technical support, and communicate project updates. We may also use your email to send relevant technical newsletters or security updates, which you can opt out of at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security</h2>
            <p>Devcraft Labs employs state-of-the-art data collection, storage, and processing practices, including SSL encryption and secure server hosting, to protect against unauthorized access, alteration, disclosure, or destruction of your personal information and project data.</p>
          </section>
        </div>
      </div>
    </div>
  );
}