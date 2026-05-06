import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Let`s Talk Code.</h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Whether you have a fully scoped project ready for development, or just a raw idea sketched on a napkin, our engineers are ready to listen. Reach out to Devcraft Labs today, and let`s explore how we can elevate your digital presence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                <div>
                  <p className="font-medium text-slate-900">Email</p>
                  <p className="text-slate-600">hello@devcraftlabs.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                <div>
                  <p className="font-medium text-slate-900">Phone</p>
                  <p className="text-slate-600">+1 (800) 555-CODE</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                <div>
                  <p className="font-medium text-slate-900">Headquarters</p>
                  <p className="text-slate-600">Digital Innovation Hub, Suite 404.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Project Inquiry Form</h2>
            <p className="text-slate-600 mb-8">
              Fill out the form below with your name, email, and a brief description of your technical needs. One of our lead engineers will contact you within 24 hours to schedule a discovery call and discuss your project scope.
            </p>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="you@company.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Project Description</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="Tell us about your technical needs..."></textarea>
              </div>
              <button type="button" className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Send Inquiry <Send className="ml-2 w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}