"use client";

import { useEffect, useMemo, useState } from "react";
import Hero from "../../components/Hero";
import FilterSidebar from "../../components/FilterSidebar";
import SortDropdown from "../../components/SortDropdown";
import ProductCard from "../../components/ProductCard";
import PaginationNav from "../../components/PaginationNav";
import { useCart } from "../../context/CartContext";

interface PerenualPlant {
  id: number;
  common_name?: string;
  default_image?: {
    image_url?: string;
    medium_url?: string;
    small_url?: string;
  } | null;
}

interface ProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

const DEFAULT_PRICE = 350;

const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    id: '1',
    name: 'Marble Queen',
    price: DEFAULT_PRICE,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/e2c6cc2f9e923492e6319f1695b27c286c3eba8e?width=484'
  },
  {
    id: '2',
    name: 'Neon Pothos',
    price: DEFAULT_PRICE,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/5d76537718ed94048d6a2f15b935161deaea3d74?width=484'
  },
  {
    id: '3',
    name: 'Syngonium Rayii',
    price: DEFAULT_PRICE,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/67dda7701ee05c68b4d4a32247c40e07f29b0130?width=564'
  },
  {
    id: '4',
    name: 'Pineapple',
    price: DEFAULT_PRICE,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/5ccf415ac3b6ef5ef069b562d527426efa006cad?width=484'
  },
  {
    id: '5',
    name: 'African Milk Tree',
    price: DEFAULT_PRICE,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/c87d764935b56e2e3dd167f97c2afc9e3b31b676?width=484'
  },
  {
    id: '6',
    name: 'Pothos',
    price: DEFAULT_PRICE,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/08e2bb9ea23daf6649e84f880d3e5316e65b59b4?width=484'
  },
  {
    id: '7',
    name: 'Chinese Evergreen',
    price: DEFAULT_PRICE,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/71ac1b24cfd6708d44da5937a75ff4388499d430?width=484'
  },
  {
    id: '8',
    name: 'Syngonium Rayii',
    price: DEFAULT_PRICE,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/67dda7701ee05c68b4d4a32247c40e07f29b0130?width=564'
  },
  {
    id: '9',
    name: 'Peruvian Cactus',
    price: DEFAULT_PRICE,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/a86875d900ae061d110dc60b4bb2c15d59d32c27?width=484'
  }
];

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("Popular");
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState<ProductItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [allPlants, setAllPlants] = useState<ProductItem[]>([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/plants?page=${page}`);
        if (!res.ok) throw new Error("Failed to load plants");
        const data = await res.json();
        
        // Log API response for debugging
        console.log('API Response:', { page, data: data?.meta, itemsCount: data?.data?.length });
        
        const items: ProductItem[] = (data?.data || []).map((p: PerenualPlant) => {
          const img = p.default_image?.medium_url || p.default_image?.image_url || p.default_image?.small_url || "https://api.builder.io/api/v1/image/assets/TEMP/5d76537718ed94048d6a2f15b935161deaea3d74?width=484";
          return {
            id: String(p.id),
            name: p.common_name || "Unknown Plant",
            price: DEFAULT_PRICE,
            image: img,
          };
        });
        
        // Enhanced pagination logic
        const lastPage = data?.meta?.last_page;
        const currentPage = data?.meta?.current_page;
        const total = data?.meta?.total;
        
        if (isMounted) {
          const newItems = items.length ? items : FALLBACK_PRODUCTS;
          setPlants(newItems);
          
          // Accumulate all plants for "Load More" functionality
          if (page === 1) {
            setAllPlants(newItems);
          } else {
            setAllPlants(prev => [...prev, ...newItems]);
          }
          
          // Set total products count
          if (typeof total === 'number' && total > 0) {
            setTotalProducts(total);
          }
          
          // Set total pages - use last_page if available, otherwise calculate from total
          if (typeof lastPage === 'number' && lastPage > 0) {
            setTotalPages(lastPage);
            setShowLoadMore(page < lastPage);
          } else if (typeof total === 'number' && total > 0) {
            // Calculate pages from total items (assuming 30 items per page from Perenual API)
            const calculatedPages = Math.ceil(total / 30);
            setTotalPages(calculatedPages > 0 ? calculatedPages : null);
            setShowLoadMore(page < calculatedPages);
          } else {
            // Fallback: if we have items but no pagination info, assume there might be more pages
            setTotalPages(items.length > 0 ? page + 1 : null);
            setShowLoadMore(items.length > 0);
          }
        }
      } catch (e) {
        console.error('Error loading plants:', e);
        if (isMounted) {
          setPlants(FALLBACK_PRODUCTS);
          setTotalPages(4);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [page]);

  const sortedPlants = useMemo(() => {
    const arr = [...plants];
    switch (sortBy) {
      case "Price: Low to High":
        return arr.sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return arr.sort((a, b) => b.price - a.price);
      case "Name: A to Z":
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      case "Name: Z to A":
        return arr.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return arr;
    }
  }, [plants, sortBy]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    setCurrentPageNum(prev => prev + 1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setCurrentPageNum(newPage);
  };

  const handleSortChange = (option: string) => setSortBy(option);

  return (
    <div className="min-h-screen bg-white">
      <Hero title="Shop" subtitle="Find the perfect plant for your space" />

      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-20">
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-[#50806B] text-white rounded-lg"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <FilterSidebar onFilterChange={() => {}} />
          </aside>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <div className="lg:hidden">
                <h2 className="font-poppins text-2xl font-semibold">Products</h2>
              </div>
              <div className="ml-auto">
                <SortDropdown 
                  onSortChange={handleSortChange} 
                  productCount={totalProducts || sortedPlants.length} 
                  currentPageCount={sortedPlants.length}
                  totalPages={totalPages}
                  currentPage={currentPageNum}
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#50806B] mb-4"></div>
                <div className="font-open-sans text-[#979797]">Loading plants...</div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {sortedPlants.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      onAddToCart={() => addToCart(product)}
                    />
                  ))}
                </div>
                
                {/* Load More Button */}
                {showLoadMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="bg-[#50806B] hover:bg-[#457259] disabled:opacity-50 disabled:cursor-not-allowed text-white font-open-sans text-lg font-bold px-8 py-4 rounded-lg shadow-lg transition-all hover:shadow-xl"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Loading...
                        </div>
                      ) : (
                        `Load More Plants (Page ${page + 1})`
                      )}
                    </button>
                  </div>
                )}

                {/* Enhanced pagination section */}
                <div className="mt-16 mb-8">
                  <div className="bg-[#E8EDDE] rounded-2xl p-8">
                    <div className="text-center mb-6">
                      <h3 className="font-poppins text-xl font-semibold text-[#343434] mb-2">
                        Browse All Plants
                      </h3>
                      <p className="font-open-sans text-sm text-[#979797]">
                        Discover our complete collection of plants across all pages
                      </p>
                    </div>
                    <PaginationNav 
                      currentPage={page} 
                      totalPages={totalPages} 
                      onPageChange={(p) => { 
                        window.scrollTo({ top: 0, behavior: 'smooth' }); 
                        handlePageChange(p);
                      }} 
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <section className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
        <div className="border-b border-black pb-8 mb-12">
          <h2 className="font-poppins text-3xl lg:text-4xl xl:text-[56px] font-semibold leading-[120%]">
            <span className="text-[#50806B]">You'll love</span>
            <span className="text-black"> these too...</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {sortedPlants.slice(0, 4).map((product) => (
            <ProductCard
              key={`recommended-${product.id}`}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
