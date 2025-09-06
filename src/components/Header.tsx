'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { count, openCart } = useCart();

  return (
    <header className="w-full">
      <div className="bg-[#50806B] text-white py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="hidden md:block"></div>
          <div className="flex-1 text-center font-open-sans font-semibold text-xs md:text-sm">
            FREE SHIPPING ON ALL FULL SUN PLANTS! FEB. 25–28.
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="font-open-sans">USD</span>
            <span className="font-open-sans font-semibold">Support</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/products" className="font-poppins text-xl md:text-[26px] font-semibold leading-none">
                <span className="text-[#50806B]">Green</span>
                <span className="text-black"> Thumb</span>
              </Link>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span className={`block w-6 h-0.5 bg-black transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-black transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-black transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="font-open-sans text-[17px] text-black hover:text-[#50806B] transition-colors">Home</Link>
              <Link href="/products" className="font-open-sans text-[17px] text-black hover:text-[#50806B] transition-colors">Products</Link>
              <a href="#" className="font-open-sans text-[17px] text-black hover:text-[#50806B] transition-colors">About us</a>
              <a href="#" className="font-open-sans text-[17px] text-black hover:text-[#50806B] transition-colors">Contact us</a>
            </nav>

            <div className="flex items-center gap-3 md:gap-6">
              <div className="hidden md:flex items-center">
                <span className="font-open-sans text-[17px] text-[#979797]">Search</span>
                <div className="w-px h-6 bg-[#979797] mx-3"></div>
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
              </div>

              <button
                onClick={openCart}
                className="flex items-center gap-2 hover:opacity-75 transition-opacity"
              >
                <div className="relative">
                  <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.0178 19.1353L16.4885 6.46304C16.4428 6.23429 16.2635 6.052 16.0385 6.052H12.7531V4.77063C12.7531 2.11677 11.3135 0.333252 9.15313 0.333252C6.99277 0.333252 5.55313 2.11677 5.55313 4.77063V6.052H1.99885C1.77385 6.052 1.59455 6.23429 1.54885 6.46304L0.0195675 19.1353C-0.0700815 19.7751 0.154918 20.4613 0.559207 20.9188C0.963505 21.4228 1.59457 21.6962 2.22385 21.6962H15.7697C16.399 21.6962 17.0301 21.421 17.4344 20.9188C17.8826 20.4631 18.1076 19.7769 18.018 19.1353H18.0178ZM6.45322 4.81512C6.45322 3.16739 7.17394 1.29274 9.15322 1.29274C11.1325 1.29274 11.8532 3.16922 11.8532 4.81512V6.09649H6.45322V4.81512ZM16.8032 20.3253C16.5325 20.6005 16.1739 20.7828 15.8136 20.7828H2.22403C1.81973 20.7828 1.45939 20.6005 1.23439 20.3253C1.00939 20.0501 0.874037 19.639 0.919739 19.228L2.40334 7.0114H15.6324L17.1178 19.2729C17.1635 19.6392 17.0282 20.0502 16.8032 20.3255L16.8032 20.3253Z" fill="black"/>
                  </svg>
                </div>
                <span className="font-open-sans text-sm md:text-[17px] text-black">{count}</span>
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="font-open-sans text-[17px] text-black hover:text-[#50806B] transition-colors">Home</Link>
                <Link href="/products" className="font-open-sans text-[17px] text-black hover:text-[#50806B] transition-colors">Products</Link>
                <a href="#" className="font-open-sans text-[17px] text-black hover:text-[#50806B] transition-colors">About us</a>
                <a href="#" className="font-open-sans text-[17px] text-black hover:text-[#50806B] transition-colors">Contact us</a>
                <div className="pt-4 border-t border-gray-100">
                  <span className="font-open-sans text-[17px] text-[#979797]">Search</span>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
