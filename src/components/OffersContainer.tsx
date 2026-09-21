import { motion } from "framer-motion";
import OffersCard from "./OffersCard";
const OfferContainer = () => {
  return (
    <div className="w-[60vw] mx-auto px-5 ">
      <div className="flex justify-between mx-auto ">
        <div>
          <h2 className="text-xl font-bold">Offers for You</h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() =>
              document
                .getElementById("offer-carousel")
                ?.scrollBy({ left: -500, behavior: "smooth" })
            }
            className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-muted transition bg-green-700 text-white hover:text-green-700 "
          >
            ←
          </button>

          <button
            onClick={() =>
              document
                .getElementById("offer-carousel")
                ?.scrollBy({ left: 500, behavior: "smooth" })
            }
            className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-muted transition bg-green-700 text-white hover:text-green-700"
          >
            →
          </button>
        </div>
      </div>
      <div
        id="offer-carousel"
        className="flex hide-scrollbar gap-6 overflow-x-auto  pt-2 pb-4 cursor-grab active:cursor-grabbing"
      >
        <OffersCard />
        <OffersCard />
        <OffersCard />
        <OffersCard />
        <OffersCard />
        <OffersCard />
        <OffersCard />
        <OffersCard />
      </div>
    </div>
  );
};
export default OfferContainer;
