export default function WarrantyPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-20 animate-fade-in">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-blue-950 mb-4">Warranty Policy</h1>
        <p className="text-blue-600">Protecting your enterprise investments.</p>
      </div>

      <div className="prose prose-blue max-w-none space-y-8 text-emerald-700-dark/80 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">1. Coverage</h2>
          <p>Most products come with a manufacturer warranty as specified on the individual product page at the time of purchase.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">2. Warranty Claims</h2>
          <p>To initiate a claim, customers must provide original proof of purchase (invoice or digital receipt) and the defective item.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">3. Exclusions</h2>
          <p>The warranty strictly does not cover:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Physical damage (cracks, drops, burns)</li>
            <li>Water or liquid damage</li>
            <li>Damage from unauthorized repairs or software modifications</li>
            <li>Normal wear and tear</li>
          </ul>
        </section>
      </div>
    </article>
  );
}
