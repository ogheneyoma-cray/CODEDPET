import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Let&apos;s Work Together.</h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Whether you have a fully scoped project ready for development, or just a raw idea, our team is ready to listen. Reach out to Codedpet today and let&apos;s elevate your digital presence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-[#00C853] mt-1 mr-4 shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Email</p>
                  <a href="mailto:info@codedpet.com" className="text-slate-600 hover:text-[#00C853] transition-colors">
                    info@codedpet.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-[#00C853] mt-1 mr-4 shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Phone</p>
                  <a href="tel:+2349019632428" className="text-slate-600 hover:text-[#00C853] transition-colors">
                    09019632428
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-[#00C853] mt-1 mr-4 shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Address</p>
                  <p className="text-slate-600">
                    108 Ogunlana Drive,<br />
                    Iganmu Ijora,<br />
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                Our team typically responds within <strong>24 hours</strong> on business days.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
            <p className="text-slate-600 mb-8">
              Fill out the form below with your name, email, and a brief description of your needs. We will get back to you within 24 hours.
            </p>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00C853] focus:border-transparent outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00C853] focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00C853] focus:border-transparent outline-none transition-all"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00C853] focus:border-transparent outline-none transition-all"
                  placeholder="Tell us about your project or enquiry..."
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full flex items-center justify-center bg-[#00C853] hover:bg-[#00b34a] text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Send Message <Send className="ml-2 w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
