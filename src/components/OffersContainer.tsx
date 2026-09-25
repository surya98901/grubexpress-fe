import { useRef } from "react";
import { useSelector } from "react-redux";
import OffersCard from "./OffersCard";

import { motion } from "framer-motion";
import { useState } from "react";
import type { RootState } from "@/store/store";

const OfferContainer = () => {
  const serviceType = useSelector(
    (state: RootState) => state.service.serviceType,
  );

  return serviceType === "dine-out" ? diningContainer() : deliveryContainer();
};


const diningContainer = () => {
  const [offerType, setOfferType] = useState<"prebook" | "walkin">("prebook");
  const featuredRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    amount: number,
  ) => {
    ref.current?.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

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
            onClick={() => scroll(featuredRef, -350)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg transition hover:bg-green-700 hover:text-white"
          >
            ←
          </button>

          <div
            ref={featuredRef}
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
            onClick={() => scroll(featuredRef, 350)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg transition hover:bg-green-700 hover:text-white"
          >
            →
          </button>
        </div>
      </div>

      {/* Smaller offers */}
      <div className="flex items-center gap-3">
        <div
          ref={secondaryRef}
          className="hide-scrollbar flex flex-1 gap-4 overflow-x-auto scroll-smooth"
        >
          <OffersCard title="10% Cashback" subtitle="On every bill payment" />

          <OffersCard title="₹100 Cashback" subtitle="Use MBKDINEUPI" />

          <OffersCard title="Extra ₹200 Off" subtitle="No code required" />

          <OffersCard title="Flat 25% Off" subtitle="Available Monday–Sunday" />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => scroll(secondaryRef, -300)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-green-700 hover:text-white"
          >
            ←
          </button>

          <button
            onClick={() => scroll(secondaryRef, 300)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-green-700 hover:text-white"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================
   DELIVERY
========================= */

const deliveryContainer = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (amount: number) => {
    carouselRef.current?.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mx-auto w-[60vw]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Offers for You</h2>

        <div className="flex gap-2">
          <button
            onClick={() => scroll(-500)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-green-700 hover:text-white"
          >
            ←
          </button>

          <button
            onClick={() => scroll(500)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-green-700 hover:text-white"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
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
