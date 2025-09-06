import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onAddToCart: (product: { id: string; name: string; price: number; image: string }) => void;
}

export default function ProductCard({ id, name, price, image, onAddToCart }: ProductCardProps) {
  const handleAddToCart = () => {
    onAddToCart({ id, name, price, image });
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_8px_23px_rgba(80,107,82,0.13)] flex flex-col gap-4 group hover:shadow-[0_12px_30px_rgba(80,107,82,0.2)] transition-shadow">
      <Link href={`/products/${id}`} className="block">
        <div className="relative aspect-[282/242] bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-1 px-2">
        <Link href={`/products/${id}`} className="font-open-sans text-xl font-bold text-[#343434] leading-normal hover:underline">
          {name}
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-open-sans text-xl font-normal text-[#343434]">
            ${price}
          </span>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="h-16 px-2 bg-[#50806B] hover:bg-[#457259] rounded-lg shadow-[0_8px_23px_rgba(80,107,82,0.13)] transition-colors flex items-center justify-center"
      >
        <span className="font-open-sans text-xl font-bold text-white">
          Buy
        </span>
      </button>
    </div>
  );
}
