export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Refund Policy</h1>
        
        <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Digital Services & Development</h2>
            <p>Due to the custom, labor-intensive nature of software and web development, Devcraft Labs generally does not offer refunds once development work has officially commenced.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Cancellation Pre-Development</h2>
            <p>If you purchase a productized service or pay a deposit for a custom project and request a cancellation before any design, consulting, or coding work has begun (typically within 48 hours of payment), you are eligible for a full refund, minus any payment gateway processing fees.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Milestone Approvals</h2>
            <p>For custom software projects, we operate on a milestone-based payment structure. Clients are required to review and approve work at each stage. Once a milestone is approved and paid for, no refunds will be issued for that specific phase of development.</p>
          </section>
        </div>
      </div>
    </div>
  );
}