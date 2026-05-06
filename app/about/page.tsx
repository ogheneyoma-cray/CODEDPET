import { Code2, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">The Devcraft Labs Story</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Born out of a passion for clean architecture and elegant design, Devcraft Labs was established to bridge the gap between complex software engineering and seamless user experiences. We saw a tech industry cluttered with bloated software and poorly executed websites, and we knew businesses deserved better. Today, we are proud to be the trusted technical partners for startups and established enterprises alike.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center mb-6">
            <Target className="w-8 h-8 text-[#00C853] mr-4" />
            <h2 className="text-3xl font-bold text-slate-900">Our Mission & Vision</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            Our mission is to democratize high-performance technology. We believe that every business, regardless of size, deserves digital products that are secure, lightning-fast, and intuitively designed. Our vision is to continue pushing the boundaries of web and software development, setting new industry standards for quality and innovation.
          </p>
        </div>

        <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-lg">
          <div className="flex items-center mb-6">
            <Code2 className="w-8 h-8 text-[#00C853] mr-4" />
            <h2 className="text-3xl font-bold">Our Core Tech Stack</h2>
          </div>
          <p className="text-lg text-slate-300 leading-relaxed">
            We are platform-agnostic but highly opinionated about quality. Our engineers specialize in modern, robust frameworks including React, Vue.js, Node.js, Python, and scalable cloud architectures on AWS and Google Cloud. We choose the right tools for your specific challenge, ensuring longevity and technical superiority.
          </p>
        </div>
      </div>
    </div>
  );
}