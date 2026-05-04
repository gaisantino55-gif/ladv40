export default function ReturnsPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-20 animate-fade-in">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-blue-950 mb-4">Returns and Refund Policy</h1>
        <p className="text-blue-600">Our commitment to your satisfaction.</p>
      </div>

      <div className="prose prose-blue max-w-none space-y-8 text-emerald-700-dark/80 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">1. Returns</h2>
          <p>Products can be returned within 7 days of delivery if:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>They are defective or non-functional</li>
            <li>They are incorrect (mismatch with order)</li>
            <li>They are unused and in original packaging</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">2. Non-Returnable Items</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Used products or items with broken seals</li>
            <li>Products damaged due to customer misuse or unauthorized repairs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">3. Refunds</h2>
          <p>Refunds are processed after the returned item passes our quality inspection. The process typically takes 3–5 business days.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">4. Exchanges</h2>
          <p>Where applicable, we may offer a direct replacement for the defective or incorrect item instead of a refund.</p>
        </section>
      </div>
    </article>
  );
}
