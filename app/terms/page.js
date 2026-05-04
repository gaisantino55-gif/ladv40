export default function TermsPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-20 animate-fade-in">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-blue-950 mb-4">Terms and Conditions</h1>
        <p className="text-blue-600">Last updated: May 2024</p>
      </div>

      <div className="prose prose-blue max-w-none space-y-8 text-emerald-700-dark/80 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">1. Products and Services</h2>
          <p>We offer electronics products and IT-related services. All product descriptions, pricing, and availability are subject to change without notice.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">2. Orders</h2>
          <p>Placing an order on our website does not guarantee acceptance. We reserve the right to cancel or refuse any order due to stock issues, pricing errors, or suspected fraud.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">3. Pricing</h2>
          <p>All prices are listed in Kenyan Shillings (KSh) and may change at any time without prior notice.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">4. Payments</h2>
          <p>We accept M-Pesa and other available payment methods. Orders are only confirmed after successful payment verification.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">5. User Responsibility</h2>
          <p>You agree to provide accurate information when placing orders and using our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">6. Limitation of Liability</h2>
          <p>We are not liable for indirect damages resulting from the use of our website or products.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-emerald-700-dark mb-4">7. Changes to Terms</h2>
          <p>We may update these terms at any time. Continued use of the website means you accept the updated terms.</p>
        </section>
      </div>
    </article>
  );
}
