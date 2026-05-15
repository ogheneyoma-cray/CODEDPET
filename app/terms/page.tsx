export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Terms and Conditions</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: May 2026</p>

        <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">General Agreement</h2>
            <p>By accessing the Codedpet website (codedpet.com) and purchasing our services, you agree to comply with and be bound by the following Terms and Conditions. These terms apply to all visitors, users, and clients of Codedpet. If you disagree with any part of these terms, please refrain from using our website or services. We reserve the right to update these terms at any time, and continued use of our services constitutes acceptance of any changes made.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property Rights</h2>
            <p>Upon receipt of full and final payment, Codedpet transfers all copyright and intellectual property rights of the custom-written code, final designs, and compiled software to the client. Codedpet retains the right to use non-confidential project deliverables for portfolio and marketing purposes unless a Non-Disclosure Agreement (NDA) is executed prior to the commencement of a project. All source code, design files, and project documentation created during the engagement remain the intellectual property of Codedpet until full payment is received.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Client Obligations</h2>
            <p>The success of any development project depends on timely communication and collaboration. Clients agree to provide all necessary access credentials, brand assets, content, and feedback in a timely and organized manner. Codedpet is not liable for project delays or cost overruns caused by a lack of client responsiveness, late delivery of required materials, or scope changes introduced after project commencement. Clients are responsible for reviewing and approving all deliverables before final delivery.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Payment Terms</h2>
            <p>All productized services listed on our shop must be paid for in full before work commences. For custom software or web development projects, a deposit (typically 50% of the total agreed amount) is required before any work begins, with the remaining balance due upon project completion and before final delivery. All prices are listed in USD but may be paid in NGN at the prevailing exchange rate. Codedpet accepts payment via bank transfer and major online payment gateways.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
            <p>Codedpet shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our services. Our total liability in any matter related to these terms shall not exceed the total amount paid by the client for the specific service in question. We make no warranties, express or implied, regarding the accuracy, reliability, or suitability of our services for any particular purpose beyond what is described in the specific service agreement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Governing Law</h2>
            <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these terms or from our services shall be subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria. By purchasing our services, you consent to this jurisdiction. For questions regarding these terms, please contact us at <a href="mailto:info@codedpet.com" className="text-[#00C853] hover:underline">info@codedpet.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
