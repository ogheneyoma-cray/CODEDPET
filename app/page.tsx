import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1: Hero */}
      <section className="bg-slate-900 text-white py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            We Engineer Digital Excellence.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
            Welcome to Codedpet. We build robust, scalable, and beautifully designed software and web applications tailored to your business needs. From high-converting websites to complex SaaS platforms, we turn your boldest ideas into flawless digital realities.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-[#00C853] hover:bg-[#00b34a] text-white font-medium py-3 px-8 rounded-full transition-colors">
            Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Section 2: About Us */}
      <section className="py-20 px-6 bg-white text-slate-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Precision in Every Pixel. Power in Every Line of Code.</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
            Codedpet is a premier software engineering and web development agency. We are a collective of forward-thinking developers, creative designers, and strategic problem-solvers. We don&apos;t just write code; we craft digital ecosystems designed to scale, perform, and drive measurable growth for our clients.
          </p>
        </div>
      </section>

      {/* Section 3: Our Services */}
      <section className="py-20 px-6 bg-slate-50 text-slate-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Full-Stack Solutions for Modern Brands</h2>
          <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
            We offer end-to-end development services to propel your business forward. Whether you need a lightning-fast corporate website, a high-performing e-commerce platform, or a custom-built web application from scratch, our team leverages the latest technologies to deliver unparalleled results.
          </p>
        </div>
      </section>

      {/* Section 4: Why Choose Us */}
      <section className="py-20 px-6 bg-white text-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">The Codedpet Advantage</h2>
          <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-12">
            We build for the future. Unlike off-the-shelf templates, our custom solutions are secure, highly scalable, and optimized for peak performance. We prioritize clean code architecture, intuitive user experiences, and transparent communication, ensuring your digital infrastructure is an asset, not a liability.
          </p>
        </div>
      </section>

      {/* Section 5: Our Process */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How We Build</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-3 flex items-center"><span className="bg-[#00C853] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span> Discovery & Strategy</h3>
              <p className="text-slate-300">We start by deeply understanding your business goals and technical requirements.</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-3 flex items-center"><span className="bg-[#00C853] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span> Design & Prototyping</h3>
              <p className="text-slate-300">We create interactive wireframes and stunning UI designs for your approval.</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-3 flex items-center"><span className="bg-[#00C853] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span> Agile Development</h3>
              <p className="text-slate-300">Our engineers bring the designs to life using clean, modern, and secure code.</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-3 flex items-center"><span className="bg-[#00C853] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span> Testing & Deployment</h3>
              <p className="text-slate-300">Rigorous QA testing guarantees a bug-free launch and seamless deployment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="py-24 px-6 bg-[#00C853] text-slate-900 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Build Something Extraordinary?</h2>
          <p className="text-lg md:text-xl text-slate-800 mb-10">
            The digital landscape is evolving rapidly. Don&apos;t get left behind. Partner with Codedpet today and let&apos;s architect the future of your business together.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-slate-900 text-white hover:bg-slate-800 font-bold py-4 px-8 rounded-full transition-colors text-lg">
            Schedule a Free Technical Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
