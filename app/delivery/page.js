export default function DeliveryPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-20 animate-fade-in">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-blue-950 mb-4">Delivery Policy</h1>
        <p className="text-blue-600">Fast and reliable shipping across Kenya.</p>
      </div>

      <div className="prose prose-blue max-w-none space-y-8 text-emerald-700-dark/80 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">1. Delivery Areas</h2>
          <p>We deliver within Nairobi and across Kenya through our trusted logistics partners.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">2. Delivery Time</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Nairobi:</strong> Same-day or next-day delivery</li>
            <li><strong>Outside Nairobi:</strong> 1–3 business days</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">3. Delivery Charges</h2>
          <p>Delivery fees depend on location and will be calculated and communicated during the checkout process.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">4. Delays</h2>
          <p>While we strive for punctuality, we are not responsible for delays caused by unforeseen circumstances such as extreme weather, major logistics issues, or third-party service disruptions.</p>
        </section>
      </div>
    </article>
  );
}
