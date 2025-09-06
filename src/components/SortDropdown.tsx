'use client';

import { useState } from 'react';

interface SortDropdownProps {
  onSortChange: (sortBy: string) => void;
  productCount: number;
  currentPageCount?: number;
  totalPages?: number | null;
  currentPage?: number;
}

export default function SortDropdown({ onSortChange, productCount, currentPageCount, totalPages, currentPage }: SortDropdownProps) {
  const [selectedSort, setSelectedSort] = useState('Popular');
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    'Popular',
    'Price: Low to High',
    'Price: High to Low',
    'Name: A to Z',
    'Name: Z to A'
  ];

  const handleSortSelect = (option: string) => {
    setSelectedSort(option);
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-end gap-2">
      {/* Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-40 h-9 border border-[#1C275A] bg-white flex items-center justify-between px-3"
        >
          <span className="font-open-sans text-[13px] font-normal text-black opacity-50 leading-[26px] tracking-[-0.3px]">
            Sort By
          </span>
          <span className="font-open-sans text-sm font-bold text-black leading-[26px] tracking-[-0.3px]">
            {selectedSort}
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-50">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.11997 9.29L12 13.17L15.88 9.29C16.27 8.9 16.9 8.9 17.29 9.29C17.68 9.68 17.68 10.31 17.29 10.7L12.7 15.29C12.31 15.68 11.68 15.68 11.29 15.29L6.69997 10.7C6.30997 10.31 6.30997 9.68 6.69997 9.29C7.08997 8.91 7.72997 8.9 8.11997 9.29Z" fill="black"/>
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border border-[#1C275A] shadow-lg z-10">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSortSelect(option)}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 font-open-sans text-sm"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Count */}
      <div className="font-open-sans text-sm font-normal text-black leading-5 tracking-[-0.4px]">
        {totalPages && totalPages > 1 ? (
          <div className="text-right">
            <div>Showing {currentPageCount || productCount} of {productCount} Products</div>
            <div className="text-xs text-[#979797] mt-1">
              Page {currentPage || 1} of {totalPages} pages
            </div>
          </div>
        ) : (
          `Showing ${productCount} Products`
        )}
      </div>
    </div>
  );
}
