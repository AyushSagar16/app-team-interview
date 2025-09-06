interface HeroProps {
  title: string;
  subtitle?: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="bg-[#E8EDDE] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-8">
          <div>
            <h1 className="font-poppins text-5xl md:text-[80px] font-normal leading-[80px] tracking-[1.6px] text-black">
              {title}
            </h1>
          </div>
          
          {subtitle && (
            <>
              <div className="h-12 w-px bg-black transform -rotate-90 hidden md:block"></div>
              <div className="font-poppins text-lg md:text-[22px] text-black max-w-md">
                {subtitle}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
