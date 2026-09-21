import { BadgeIndianRupee } from "lucide-react";

interface OffersCardProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const OffersCard = ({
  title = "Offer Title",
  subtitle = "Ends in xh: ymin: zsec",
  className = "",
}: OffersCardProps) => {
  return (
    <div
      className={`flex w-[300px] shrink-0 items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm ${className}`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-50">
        <BadgeIndianRupee
          size={28}
          className="text-green-700"
        />
      </div>

      <section>
        <p className="text-base font-bold tracking-tight text-gray-900">
          {title}
        </p>

        <p className="text-sm font-medium text-gray-500">
          {subtitle}
        </p>
      </section>
    </div>
  );
};

export default OffersCard;