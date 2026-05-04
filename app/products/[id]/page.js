import { getProducts } from '../../../data/products';
import { findProductById } from '../../../lib/utils';
import ProductDetailView from '../../../components/ProductDetailView';
import Link from 'next/link';

export default async function ProductDetail({ params }) {
  const { id } = await params;
  const products = getProducts();
  const product = findProductById(products, id);

  if (!product) {
    return (
      <section className="max-w-[1280px] mx-auto px-6 lg:px-8 py-20 text-center">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-4xl font-extrabold text-blue-950">Product not found</h1>
        <p className="mt-4 text-emerald-700/70">Please check the product link or browse our catalog.</p>
        <Link href="/products" className="mt-10 inline-flex rounded-full bg-emerald-700 px-8 py-3 text-white font-bold hover:bg-emerald-700/90 transition-all shadow-lg shadow-blue-200">
          ← Back to products
        </Link>
      </section>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-6 uppercase tracking-wider font-bold">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-orange-500">Products</Link>
          <span>›</span>
          <span className="text-slate-900 truncate max-w-[200px]">{product.name}</span>
        </div>

        <ProductDetailView product={product} relatedProducts={relatedProducts} />
      </section>
    </div>
  );
}
