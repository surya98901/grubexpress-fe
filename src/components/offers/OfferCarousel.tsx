import { useRef } from "react";
import OffersCard from "./OffersCard";

const OffersCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (amount: number) => {
    carouselRef.current?.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => scroll(-350)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl transition hover:bg-green-700 hover:text-white"
      >
        ←
      </button>

      <div
        ref={carouselRef}
        className="hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth"
      >
        <OffersCard
          title="Extra ₹200 Off"
          subtitle="No code required"
        />

        <OffersCard
          title="10% Cashback"
          subtitle="On every bill payment"
        />

        <OffersCard
          title="₹100 Cashback"
          subtitle="Use MBKDINEUPI"
        />

        <OffersCard
          title="Flat 25% Off"
          subtitle="Available Monday–Sunday"
        />
      </div>

      <button
        onClick={() => scroll(350)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl transition hover:bg-green-700 hover:text-white"
      >
        →
      </button>
    </div>
  );
};

export default OffersCarousel;