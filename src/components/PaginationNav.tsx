"use client";

interface PaginationNavProps {
  currentPage: number;
  totalPages: number | null;
  onPageChange: (page: number) => void;
}

export default function PaginationNav({ currentPage, totalPages, onPageChange }: PaginationNavProps) {
  // Show pagination if we have more than 1 page OR if we're on page 1 and might have more pages
  if (!totalPages || totalPages <= 1) {
    // Still show pagination if we're on page 1 and there might be more pages
    if (currentPage === 1) {
      return (
        <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
          <button
            onClick={() => onPageChange(2)}
            className="h-10 px-4 border border-[#50806B] rounded-lg font-open-sans text-sm hover:bg-gray-50 bg-[#50806B] text-white"
          >
            Load More Plants
          </button>
        </nav>
      );
    }
    return null;
  }

  const createPageList = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    let left = Math.max(1, currentPage - 2);
    let right = Math.min(totalPages, currentPage + 2);

    // Ensure first four pages are visible when near the start
    if (currentPage <= 2) {
      left = 1;
      right = Math.min(totalPages, 4);
    }

    pages.push(1);
    if (left > 2) pages.push("...");

    for (let i = left; i <= right; i++) {
      if (i !== 1 && i !== totalPages) pages.push(i);
    }

    if (right < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = createPageList();

  return (
    <div className="w-full">
      {/* Page info */}
      <div className="text-center mb-4">
        <p className="font-open-sans text-sm text-[#979797]">
          Page {currentPage} of {totalPages}
        </p>
      </div>
      
      <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`h-12 px-6 border border-black rounded-lg font-open-sans text-sm font-semibold transition-all ${
            currentPage === 1 
              ? "opacity-50 cursor-not-allowed bg-gray-100" 
              : "hover:bg-[#50806B] hover:border-[#50806B] hover:text-white hover:shadow-lg"
          }`}
        >
          ← Previous
        </button>

        <div className="flex items-center gap-1">
          {pages.map((p, idx) =>
            typeof p === "number" ? (
              <button
                key={`page-${p}-${idx}`}
                onClick={() => onPageChange(p)}
                aria-current={p === currentPage ? "page" : undefined}
                className={`min-w-12 h-12 px-3 rounded-lg border font-open-sans text-sm font-semibold transition-all ${
                  p === currentPage
                    ? "bg-[#50806B] border-[#50806B] text-white shadow-lg"
                    : "border-black text-black hover:bg-[#50806B] hover:border-[#50806B] hover:text-white hover:shadow-lg"
                }`}
              >
                {p}
              </button>
            ) : (
              <span key={`ellipsis-${idx}`} className="px-3 font-open-sans text-sm text-black opacity-50">…</span>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`h-12 px-6 border border-black rounded-lg font-open-sans text-sm font-semibold transition-all ${
            currentPage === totalPages 
              ? "opacity-50 cursor-not-allowed bg-gray-100" 
              : "hover:bg-[#50806B] hover:border-[#50806B] hover:text-white hover:shadow-lg"
          }`}
        >
          Next →
        </button>
      </nav>
      
      {/* Quick jump to first/last page */}
      <div className="flex justify-center gap-4 mt-4">
        {currentPage > 3 && (
          <button
            onClick={() => onPageChange(1)}
            className="font-open-sans text-sm text-[#50806B] hover:underline"
          >
            First Page
          </button>
        )}
        {currentPage < totalPages - 2 && (
          <button
            onClick={() => onPageChange(totalPages)}
            className="font-open-sans text-sm text-[#50806B] hover:underline"
          >
            Last Page
          </button>
        )}
      </div>
    </div>
  );
}
