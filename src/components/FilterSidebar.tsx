'use client';

import { useState } from 'react';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: false,
    include: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-full max-w-[298px]">
      {/* Categories Filter */}
      <div className="bg-white rounded-[10px] border border-[#E3E5E5] shadow-[0_8px_23px_rgba(80,107,82,0.13)] p-4 mb-4">
        <div className="space-y-3">
          {/* All Categories Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white"></div>
            <div>
              <div className="font-open-sans text-xl font-normal text-[#343434] leading-[30px] tracking-[0.55px]">
                All Categories
              </div>
              <div className="font-open-sans text-sm font-normal text-[#343434] opacity-60 leading-[20px] tracking-[0.252px]">
                Plants on Sale
              </div>
            </div>
            <div className="ml-auto">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8.295 2.115L4.875 6.705L8.295 11.295L9.705 12.705L15.705 6.705L9.705 0.705L8.295 2.115Z" fill="#343434" transform="rotate(90 12 12)"/>
              </svg>
            </div>
          </div>

          {/* Indoor Plants */}
          <div className="ml-3">
            <div className="flex items-center gap-3 py-2">
              <div className="w-10 h-10 rounded-full bg-white"></div>
              <span className="font-open-sans text-base font-semibold text-[#343434] leading-[24px] tracking-[0.352px]">
                Indoor Plants
              </span>
              <div className="ml-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M1.41 0L6 4.59L10.59 0L12 1.42L6 7.42L0 1.42L1.41 0Z" fill="#343434"/>
                </svg>
              </div>
            </div>

            {/* Subcategories */}
            <div className="ml-8 space-y-2">
              <div className="font-open-sans text-base font-normal text-[#343434] leading-[24px] tracking-[0.352px] py-2">
                Alocasia
              </div>
              <div className="font-open-sans text-base font-normal text-[#343434] leading-[24px] tracking-[0.352px] py-2">
                Hoya
              </div>
              <div className="font-open-sans text-base font-normal text-[#343434] leading-[24px] tracking-[0.352px] py-2">
                Sansevieria
              </div>
              <div className="font-open-sans text-base font-normal text-[#343434] leading-[24px] tracking-[0.352px] py-2">
                Syngonium
              </div>
              <button className="flex items-center gap-2 bg-white rounded px-3 py-2">
                <span className="font-open-sans text-sm font-bold text-[#343434] tracking-[0.75px] uppercase">
                  Show More
                </span>
              </button>
            </div>
          </div>

          {/* Outdoor Plants */}
          <div className="ml-3">
            <div className="flex items-center gap-3 py-2">
              <div className="w-10 h-10 rounded-full bg-white"></div>
              <span className="font-open-sans text-base font-semibold text-[#343434] leading-[24px] tracking-[0.352px]">
                Outdoor plants
              </span>
              <div className="ml-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9.705 6L8.295 7.41L12.875 12L8.295 16.59L9.705 18L15.705 12L9.705 6Z" fill="#343434"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Sun Requirements */}
          <div className="ml-3">
            <div className="flex items-center gap-3 py-2">
              <div className="w-10 h-10 rounded-full bg-white"></div>
              <span className="font-open-sans text-base font-semibold text-[#343434] leading-[24px] tracking-[0.44px]">
                Sun requirements
              </span>
              <div className="ml-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8.295 2.115L4.875 6.705L8.295 11.295L9.705 12.705L15.705 6.705L9.705 0.705L8.295 2.115Z" fill="#343434" transform="rotate(90 12 12)"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Filter */}
      <div className="bg-white rounded-[10px] border border-[#E3E5E5] shadow-[0_8px_23px_rgba(80,107,82,0.13)] p-6 mb-4">
        <div className="flex items-center justify-between">
          <span className="font-open-sans text-xl font-normal text-[#343434] leading-[30px] tracking-[0.55px]">
            Price
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M1.41 0L6 4.59L10.59 0L12 1.42L6 7.42L0 1.42L1.41 0Z" fill="#343434"/>
          </svg>
        </div>
      </div>

      {/* Include Filter */}
      <div className="bg-white rounded-[10px] shadow-[0_8px_23px_rgba(80,107,82,0.13)] p-6">
        <div className="space-y-6">
          <h3 className="font-inter text-xl font-normal text-[#343434] leading-[30px] tracking-[0.55px]">
            Include
          </h3>
          
          <div className="space-y-4">
            {[
              'Planter',
              'Flowers', 
              'Care',
              'Heat pack'
            ].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full border border-[#343434] bg-white shadow-[0_1px_8px_rgba(0,0,0,0.13)]"></div>
                <span className="font-open-sans text-base font-normal text-[#343434] leading-[24px] tracking-[0.352px]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
