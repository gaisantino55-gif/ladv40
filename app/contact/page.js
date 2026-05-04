export default function ContactPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-20 animate-fade-in">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-blue-950 mb-4">Contact Us</h1>
        <p className="text-blue-600 font-medium">We're here to help with your inquiries, orders, or support.</p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700/10 flex items-center justify-center text-emerald-700 shrink-0">
              📍
            </div>
            <div>
              <h3 className="font-bold text-emerald-700-dark text-lg">Our Office</h3>
              <p className="text-emerald-700/70">Westlands Office Park, Nairobi, Kenya</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700/10 flex items-center justify-center text-emerald-700 shrink-0">
              📞
            </div>
            <div>
              <h3 className="font-bold text-emerald-700-dark text-lg">Phone & WhatsApp</h3>
              <p className="text-emerald-700/70">+254 700 000 000</p>
              <p className="text-xs text-emerald-500 mt-1 italic">Available during business hours</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700/10 flex items-center justify-center text-emerald-700 shrink-0">
              ✉️
            </div>
            <div>
              <h3 className="font-bold text-emerald-700-dark text-lg">Email Support</h3>
              <p className="text-emerald-700/70">info@gaabsolutions.co.ke</p>
            </div>
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm border border-emerald-700/10 rounded-[2rem] p-8 shadow-xl shadow-blue-900/5">
          <h3 className="text-xl font-bold text-emerald-700-dark mb-6">Send us a message</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-emerald-700-dark mb-1">Full Name</label>
              <input type="text" className="w-full rounded-xl border-emerald-700/10 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500/10" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-emerald-700-dark mb-1">Email</label>
              <input type="email" className="w-full rounded-xl border-emerald-700/10 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500/10" placeholder="john@company.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-emerald-700-dark mb-1">Message</label>
              <textarea className="w-full rounded-xl border-emerald-700/10 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500/10 h-32" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full rounded-xl bg-emerald-700 py-4 text-white font-bold hover:bg-emerald-700/90 transition-all shadow-lg shadow-blue-200">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
