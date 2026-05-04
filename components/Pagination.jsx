import Link from 'next/link';

export default function Pagination({ currentPage, totalPages, search }) {
  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    params.set('page', pageNumber.toString());
    return `/products?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages = [];
    // Simple logic for a small number of pages. If you have 100s, you'd add ellipses.
    // We'll show all pages if total is 10 or less. Otherwise, we can show a window.
    // For this storefront, let's keep it simple and robust enough for ~20 pages.
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first, last, and a window around current page
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-12">
      {/* Prev Button */}
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-800 transition-colors font-medium text-sm"
        >
          Prev
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-slate-50 text-slate-300 font-medium text-sm cursor-not-allowed">
          Prev
        </span>
      )}

      {/* Page Numbers */}
      {pages.map((page, idx) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${idx}`} className="px-3 py-2 text-slate-400">
              ...
            </span>
          );
        }

        const isCurrent = page === currentPage;
        return (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${
              isCurrent
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-800'
            }`}
          >
            {page}
          </Link>
        );
      })}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-800 transition-colors font-medium text-sm"
        >
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-slate-50 text-slate-300 font-medium text-sm cursor-not-allowed">
          Next
        </span>
      )}
    </div>
  );
}
