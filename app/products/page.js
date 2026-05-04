import ProductGrid from '../../components/ProductGrid';
import Pagination from '../../components/Pagination';
import { getProducts } from '../../data/products';

export default async function ProductsPage({ searchParams }) {
  const { search, page } = await searchParams;
  const allProducts = getProducts();
  
  const filteredProducts = search 
    ? allProducts.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      )
    : allProducts;

  // Pagination logic
  const currentPage = Number(page) || 1;
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
      <div className="mb-10 flex flex-col gap-4">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-500 font-bold">
          {search ? `Search results for "${search}"` : 'Our catalog'}
        </p>
        <h1 className="text-4xl font-extrabold text-blue-950">
          {search ? `Results (${filteredProducts.length})` : 'Browse all products'}
        </h1>
        <p className="max-w-2xl text-emerald-700/70">
          {search 
            ? `We found ${filteredProducts.length} products matching your criteria.`
            : 'Discover enterprise-grade electronics, hardware, and accessories designed for modern business workflows.'}
        </p>
      </div>

      {!search && (
        <div className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {[
              { name: 'Projectors', icon: 'videocam' },
              { name: 'Desktops', icon: 'desktop_windows' },
              { name: 'Digital Camera', icon: 'photo_camera' },
              { name: 'Consumables', icon: 'inventory_2' },
              { name: 'Accessories', icon: 'headphones' },
              { name: 'UPS & Power Backup', icon: 'power' },
              { name: 'Scanners', icon: 'scanner' },
              { name: 'Printers', icon: 'print' },
              { name: 'All-In-One Pc', icon: 'important_devices' },
              { name: 'Monitors', icon: 'monitor' },
              { name: 'Laptops', icon: 'laptop_mac' }
            ].map((cat) => (
              <a
                key={cat.name}
                href={`/products?search=${encodeURIComponent(cat.name)}`}
                className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 lg:p-3 bg-white border border-emerald-700/10 rounded-xl lg:rounded-2xl hover:shadow-md hover:border-emerald-300 hover:-translate-y-1 transition-all group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[16px] sm:text-[20px] lg:text-[28px]">{cat.icon}</span>
                </div>
                <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-slate-800 leading-tight">
                  {cat.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
      
      {filteredProducts.length > 0 ? (
        <>
          <ProductGrid products={currentProducts} />
          <Pagination currentPage={currentPage} totalPages={totalPages} search={search} />
        </>
      ) : (
        <div className="py-20 text-center">
          <div className="text-6xl mb-6">🏜️</div>
          <h3 className="text-2xl font-bold text-emerald-700-dark">No products found</h3>
          <p className="text-blue-600 mt-2">Try adjusting your search terms or category.</p>
          <a href="/products" className="mt-8 inline-block text-emerald-700 font-bold hover:underline">
            Clear search and view all →
          </a>
        </div>
      )}
    </section>
  );
}
