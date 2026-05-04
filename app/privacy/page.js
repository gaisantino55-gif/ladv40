export default function PrivacyPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-20 animate-fade-in">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-blue-950 mb-4">Privacy Policy</h1>
        <p className="text-blue-600">Your privacy is our priority.</p>
      </div>

      <div className="prose prose-blue max-w-none space-y-8 text-emerald-700-dark/80 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">1. Information We Collect</h2>
          <p>We may collect:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Delivery address</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">2. How We Use Your Information</h2>
          <p>Your data is used to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process orders</li>
            <li>Communicate with you</li>
            <li>Improve our services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">3. Data Protection</h2>
          <p>We do not sell or share your personal data with third parties, except when necessary to complete your order (e.g., delivery services).</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">4. Security</h2>
          <p>We take reasonable measures to protect your data, but no system is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">5. Your Rights</h2>
          <p>You may request access, correction, or deletion of your personal data.</p>
        </section>
      </div>
    </article>
  );
}
