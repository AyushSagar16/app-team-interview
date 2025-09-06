'use client';

import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartSidebar({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}: CartSidebarProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed bg-blue-500 bg-opacity-75 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[466px] bg-white z-50 shadow-xl">
        <div className="p-4 sm:p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <h2 className="font-poppins text-xl sm:text-[26px] font-medium text-black leading-[44px] tracking-[-1.5px]">
              My Cart
            </h2>
            <button 
              onClick={onClose}
              className="w-6 h-6 relative flex items-center justify-center p-1"
            >
              <div className="absolute w-0.5 h-5 bg-[#868686] rounded transform rotate-45"></div>
              <div className="absolute w-0.5 h-5 bg-[#868686] rounded transform -rotate-45"></div>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 space-y-4 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-gray-400 mb-4">
                  <svg width="64" height="64" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                  </svg>
                </div>
                <p className="text-gray-500 font-open-sans">Your cart is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-3 sm:gap-4 pb-4">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 sm:w-[164px] sm:h-[127px] rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-poppins text-lg sm:text-xl font-medium text-black leading-tight sm:leading-[44px] tracking-[-1.5px]">
                        {item.name}
                      </h3>
                      <p className="font-open-sans text-sm sm:text-lg font-normal text-[#0D0D0D] leading-[28px] tracking-[-0.4px]">
                        {item.size}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="space-y-1 sm:space-y-2 mt-2">
                      <div className="font-open-sans text-xs sm:text-sm font-normal text-black leading-[26px] tracking-[-0.3px] opacity-50">
                        Quantity
                      </div>
                      <div className="flex items-center justify-between border border-black rounded-xl px-2 py-1 sm:py-2 w-20 sm:w-[100px]">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="opacity-50 hover:opacity-75 p-1"
                        >
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M15.0001 10.8334H5.00008C4.54175 10.8334 4.16675 10.4584 4.16675 10C4.16675 9.54169 4.54175 9.16669 5.00008 9.16669H15.0001C15.4584 9.16669 15.8334 9.54169 15.8334 10C15.8334 10.4584 15.4584 10.8334 15.0001 10.8334Z" fill="#0D0D0D"/>
                          </svg>
                        </button>
                        <span className="font-open-sans text-sm sm:text-lg font-normal text-[#0D0D0D] leading-[26px] tracking-[-0.3px]">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="opacity-50 hover:opacity-75 p-1"
                        >
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M15.0001 10.8334H10.8334V15C10.8334 15.4584 10.4584 15.8334 10.0001 15.8334C9.54175 15.8334 9.16675 15.4584 9.16675 15V10.8334H5.00008C4.54175 10.8334 4.16675 10.4584 4.16675 10C4.16675 9.54169 4.54175 9.16669 5.00008 9.16669H9.16675V5.00002C9.16675 4.54169 9.54175 4.16669 10.0001 4.16669C10.4584 4.16669 10.8334 4.54169 10.8334 5.00002V9.16669H15.0001C15.4584 9.16669 15.8334 9.54169 15.8334 10C15.8334 10.4584 15.4584 10.8334 15.0001 10.8334Z" fill="#0D0D0D"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price and Remove */}
                  <div className="flex flex-col justify-between items-end">
                    <span className="font-poppins text-lg sm:text-xl font-medium text-black leading-tight sm:leading-[44px] tracking-[-1.5px]">
                      ${item.price}
                    </span>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#868686] hover:text-red-500 transition-colors p-2 -m-2"
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 7H5L6.3 20.2C6.4 21.2 7.3 22 8.3 22H15.7C16.7 22 17.6 21.2 17.7 20.2L19 7ZM9 10V18H11V10H9ZM13 10V18H15V10H13ZM16 4V2C16 1.4 15.6 1 15 1H9C8.4 1 8 1.4 8 2V4H4C3.4 4 3 4.4 3 5S3.4 6 4 6H20C20.6 6 21 5.6 21 5S20.6 4 20 4H16ZM10 3H14V4H10V3Z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-[#888] pt-4 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="font-open-sans text-lg sm:text-xl font-normal text-[#808080] leading-[28px] tracking-[-0.4px]">
                  Subtotal
                </span>
                <span className="font-open-sans text-lg sm:text-xl font-bold text-black leading-[28px] tracking-[-0.4px]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button className="w-full h-12 sm:h-16 bg-[#50806B] hover:bg-[#457259] rounded-lg flex items-center justify-center transition-colors">
                <span className="font-open-sans text-lg sm:text-xl font-bold text-white leading-[22px] tracking-[-0.4px] uppercase">
                  CHECKOUT
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
