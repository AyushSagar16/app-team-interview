"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Hero from "../../../components/Hero";
import { useCart } from "../../../context/CartContext";

interface PlantDetails {
  id: number;
  common_name?: string;
  scientific_name?: string[];
  default_image?: {
    image_url?: string;
    medium_url?: string;
    small_url?: string;
  } | null;
  sunlight?: string[];
  watering?: string;
  care_level?: string;
  description?: string;
}

const DEFAULT_PRICE = 350;

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { addToCart, openCart } = useCart();
  const [plant, setPlant] = useState<PlantDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/plants/${id}`);
        if (!res.ok) throw new Error("Failed to load plant");
        const data = await res.json();
        if (isMounted) setPlant(data);
      } catch (e) {
        if (isMounted) setPlant(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const imageUrl = useMemo(() => {
    return (
      plant?.default_image?.image_url ||
      plant?.default_image?.medium_url ||
      plant?.default_image?.small_url ||
      "https://api.builder.io/api/v1/image/assets/TEMP/e2c6cc2f9e923492e6319f1695b27c286c3eba8e?width=484"
    );
  }, [plant]);

  const name = plant?.common_name || "Unknown Plant";

  const handleAdd = () => {
    addToCart({ id: String(id), name, image: imageUrl, price: DEFAULT_PRICE });
    openCart();
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero title="Product" />

      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
        {loading ? (
          <div className="text-center py-20 font-open-sans text-[#979797]">Loading...</div>
        ) : !plant ? (
          <div className="text-center py-20 font-open-sans text-[#979797]">Plant not found.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-5 shadow-[0_8px_23px_rgba(80,107,82,0.13)]">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image src={imageUrl} alt={name} fill className="object-cover" />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h1 className="font-poppins text-3xl md:text-5xl text-black leading-tight">{name}</h1>
                {plant.scientific_name?.length ? (
                  <p className="font-open-sans text-[#979797] mt-2">{plant.scientific_name[0]}</p>
                ) : null}
              </div>

              <div className="font-open-sans text-3xl text-[#343434]">${DEFAULT_PRICE}</div>

              {plant.description ? (
                <p className="font-open-sans text-[#343434] opacity-80 leading-7">{plant.description}</p>
              ) : null}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg border border-[#E3E5E5] p-4">
                  <div className="font-open-sans text-sm text-[#979797]">Sunlight</div>
                  <div className="font-open-sans text-base text-[#343434]">{plant.sunlight?.join(", ") || "Unknown"}</div>
                </div>
                <div className="bg-white rounded-lg border border-[#E3E5E5] p-4">
                  <div className="font-open-sans text-sm text-[#979797]">Watering</div>
                  <div className="font-open-sans text-base text-[#343434]">{plant.watering || "Unknown"}</div>
                </div>
              </div>

              <button onClick={handleAdd} className="h-16 px-2 bg-[#50806B] hover:bg-[#457259] rounded-lg shadow-[0_8px_23px_rgba(80,107,82,0.13)] transition-colors flex items-center justify-center">
                <span className="font-open-sans text-xl font-bold text-white">Add To Cart</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
