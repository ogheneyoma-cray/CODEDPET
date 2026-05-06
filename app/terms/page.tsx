export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Terms and Conditions</h1>
        
        <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">General Agreement</h2>
            <p>By accessing the Devcraft Labs website and purchasing our services, you agree to comply with and be bound by the following Terms and Conditions. If you disagree with any part of these terms, please refrain from using our website or services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property Rights</h2>
            <p>Upon receipt of full and final payment, Devcraft Labs transfers all copyright and intellectual property rights of the custom-written code, final designs, and compiled software to the client. Devcraft Labs retains the right to use non-confidential project deliverables for portfolio and marketing purposes unless a Non-Disclosure Agreement (NDA) is executed prior to the project.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Client Obligations</h2>
            <p>The success of development projects relies on timely communication. Clients agree to provide necessary access credentials, brand assets, and feedback in a timely manner. Devcraft Labs is not liable for project delays caused by a lack of client responsiveness.</p>
          </section>
        </div>
      </div>
    </div>
  );
}