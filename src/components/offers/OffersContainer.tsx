import { useSelector } from "react-redux";
import OffersCard from "./OffersCard";
import { carouselScroll } from "@/assets/utils/helpers";
import { motion } from "framer-motion";
import { useState } from "react";
import type { RootState } from "@/store/store";

const OfferContainer = () => {
  const serviceType = useSelector(
    (state: RootState) => state.service.serviceType,
  );
  return serviceType === "dine-out" ? <DiningContainer />: <DeliveryContainer/>;
};

const DiningContainer = () => {
  const [offerType, setOfferType] = useState<"prebook" | "walkin">("prebook");
  return (
    <div className="mx-auto w-[60vw] space-y-5">
      <h2 className="text-xl font-bold">Offers for you</h2>

      <div className="rounded-2xl border-4 border-gray-100 p-3">
        <div className="relative flex h-12 rounded-full bg-gray-100 p-1">
          <motion.div
            className="absolute top-1 bottom-1 w-1/2 rounded-full bg-black"
            animate={{
              x: offerType === "prebook" ? 0 : "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          />

          <button
            onClick={() => setOfferType("prebook")}
            className={`relative z-10 flex-1 rounded-full font-semibold transition-colors ${
              offerType === "prebook" ? "text-white" : "text-gray-800"
            }`}
          >
            Pre-booking offers
          </button>

          <button
            onClick={() => setOfferType("walkin")}
            className={`relative z-10 flex-1 rounded-full font-semibold transition-colors ${
              offerType === "walkin" ? "text-white" : "text-gray-800"
            }`}
          >
            Walk-in offers
          </button>
        </div>

        {/* Featured offers carousel */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => carouselScroll("left", "featured-Offer-carousel")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg transition hover:bg-green-700 hover:text-white"
          >
            ←
          </button>

          <div
            id="featured-Offer-carousel"
            className="hide-scrollbar flex flex-1 gap-4 overflow-x-auto scroll-smooth"
          >
            <OffersCard
              title="Flat 25% Off"
              subtitle="Available Monday–Sunday"
            />

            <OffersCard title="Extra ₹200 Off" subtitle="No code required" />

            <OffersCard title="10% Cashback" subtitle="On every bill payment" />

            <OffersCard title="₹100 Cashback" subtitle="Use MBKDINEUPI" />
          </div>

          <button
            onClick={() => carouselScroll("right", "featured-Offer-carousel")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg transition hover:bg-green-700 hover:text-white"
          >
            →
          </button>
        </div>
      </div>

      {/* Smaller offers */}
      <div className="flex items-center gap-3">
        <div
          id="Offer-carousel"
          className="hide-scrollbar flex flex-1 gap-4 overflow-x-auto scroll-smooth"
        >
          <OffersCard title="10% Cashback" subtitle="On every bill payment" />

          <OffersCard title="₹100 Cashback" subtitle="Use MBKDINEUPI" />

          <OffersCard title="Extra ₹200 Off" subtitle="No code required" />

          <OffersCard title="Flat 25% Off" subtitle="Available Monday–Sunday" />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => carouselScroll("left", "Offer-carousel")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-green-700 hover:text-white"
          >
            ←
          </button>

          <button
            onClick={() => carouselScroll("right", "Offer-carousel")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-green-700 hover:text-white"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

const DeliveryContainer = () => {
  return (
    <div className="mx-auto w-[60vw]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Offers for You</h2>

        <div className="flex gap-2">
          <button
             onClick={() => carouselScroll("left", "Offer-carousel")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-green-700 hover:text-white"
          >
            ←
          </button>

          <button
            onClick={() => carouselScroll("right", "Offer-carousel")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-green-700 hover:text-white"
          >
            →
          </button>
        </div>
      </div>

      <div
        id="Offer-carousel"
        className="hide-scrollbar flex gap-5 overflow-x-auto scroll-smooth"
      >
        <OffersCard title="Extra ₹200 Off" subtitle="No code required" />

        <OffersCard title="10% Cashback" subtitle="On every bill payment" />

        <OffersCard title="₹100 Cashback" subtitle="Use MBKDINEUPI" />

        <OffersCard title="Flat 25% Off" subtitle="Available Monday–Sunday" />

        <OffersCard title="Items At ₹89" subtitle="On select items" />
      </div>
    </div>
  );
};

export default OfferContainer;
