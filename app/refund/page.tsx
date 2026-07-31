export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Refund Policy</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: May 2026</p>

        <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
            <p>At Codedpet, we are committed to delivering high-quality digital services that meet and exceed your expectations. We understand that circumstances can change, and we strive to handle all refund requests fairly and transparently. Please read this policy carefully before purchasing any of our services. By completing a purchase, you acknowledge that you have read and agreed to this refund policy in full.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Digital Services & Development</h2>
            <p>Due to the custom, labor-intensive nature of software and web development, Codedpet generally does not offer refunds once development work has officially commenced. When you purchase a service from our shop or engage us for a custom project, our team immediately begins allocating resources, conducting discovery sessions, and planning the technical architecture. This preparatory work represents a significant investment of time and expertise that cannot be recovered.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Cancellation Before Work Begins</h2>
            <p>If you purchase a productized service or pay a deposit for a custom project and request a cancellation before any design, consulting, or coding work has commenced (typically within 48 hours of payment confirmation), you are eligible for a full refund minus any payment gateway processing fees charged to us. To request a pre-development cancellation, please contact us at <a href="mailto:info@codedpet.com" className="text-[#00C853] hover:underline">info@codedpet.com</a> with your order reference number within the 48-hour window. Refunds will be processed within 5–10 business days.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Milestone-Based Projects</h2>
            <p>For custom software and web development projects, we operate on a milestone-based payment and approval structure. Clients are required to review, provide feedback on, and formally approve all work at each defined stage before subsequent stages begin. Once a client has approved and paid for a milestone, no refunds will be issued for that specific phase of development. This structure protects both parties by ensuring ongoing transparency and preventing disputes at the final delivery stage.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Unsatisfactory Work</h2>
            <p>If you believe that a delivered service does not match what was agreed upon in writing (i.e., the project scope or service description), please contact us at <a href="mailto:info@codedpet.com" className="text-[#00C853] hover:underline">info@codedpet.com</a> within 7 days of delivery. We will work diligently to understand your concerns and make the necessary revisions at no additional charge. Our priority is your satisfaction, and we will always seek a resolution before a refund is considered. Refunds based on subjective preference or scope changes introduced by the client after work has begun are not eligible.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p>For any refund enquiries, please reach out to our team with your order details at <a href="mailto:info@codedpet.com" className="text-[#00C853] hover:underline">info@codedpet.com</a> or call us at <a href="tel:+2349019632428" className="text-[#00C853] hover:underline">09019632428</a>. We are committed to resolving all issues promptly and professionally.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
