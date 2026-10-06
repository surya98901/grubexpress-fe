
import OffersCard from "./OffersCard";
import {carouselScroll} from "@/assets/utils/helpers"
const OffersCarousel = () => {

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => carouselScroll("left","offer-carousel" )}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl transition hover:bg-green-700 hover:text-white"
      >
        ←
      </button>

      <div
        id="offer-carousel"
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
        onClick={() => carouselScroll("right","offer-carousel" )}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl transition hover:bg-green-700 hover:text-white"
      >
        →
      </button>
    </div>
  );
};

export default OffersCarousel;