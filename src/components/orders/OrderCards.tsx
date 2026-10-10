
import type { OrderDetails } from "@/types/order";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import type { Restaurant } from "@/types/restaurant";
import type { PaymentDetails } from "@/types/payment";
import Draw from "@/components/orders/OrderDetailsDraw";
import { useNavigate } from "react-router-dom";
import { getRestaurant } from "@/services/restaurantApi";
import { getPayment } from "@/services/userApi";

const OrderCards = ({ data }: { data: OrderDetails }) => {
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(
    null
  );
  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!payment || payment.paymentStatus !== "PENDING") {
      setTimer(0);
      return;
    }

    const updateTimer = () => {
      const expiry = new Date(payment.expiresAt).getTime();
      const remaining = Math.max(0, expiry - Date.now());
      setTimer(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [payment]);

  useEffect(() => {
    if (!data.restaurantId) return;

    let cancelled = false;

    const fetchData = async () => {
      try {
        const [restaurantResponse, paymentResponse] = await Promise.all([
          getRestaurant(data.restaurantId),
          getPayment(data._id),
        ]);

        if (cancelled) return;

        setRestaurantData(restaurantResponse.data.restaurant);
        setPayment(paymentResponse.data.data);
      } catch (error) {
        if (!cancelled) {
          console.error("Error fetching order details:", error);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [data.restaurantId, data._id]);

  const minutes = Math.floor(timer / 60000);
  const seconds = Math.floor((timer / 1000) % 60);
  const formattedTimer = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const liveOrder = !["DELIVERED", "CANCELLED"].includes(data.orderStatus);

  if (!liveOrder) return null;

  return (
    <Accordion className="mx-auto mt-5 w-full max-w-4xl rounded-xl border border-gray-200 bg-white px-3 shadow-sm sm:mt-8 sm:px-5">
      <AccordionItem value="item-1" className="border-0">
        <div className="flex flex-col gap-3 py-3 sm:flex-row sm:gap-5 sm:py-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxwePk1PjLlxROFEpElmoltcHyglQ2IBo7rn8nwMG7DhvE0aVLsmtU0_g&s=10"
            alt={restaurantData?.Name || "Restaurant"}
            className="h-40 w-full rounded-xl object-cover shadow-sm sm:h-auto sm:w-36 sm:shrink-0 md:w-44"
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <section className="flex flex-col gap-4 py-2 sm:flex-row sm:justify-between sm:gap-5">
              <div className="min-w-0">
                <h3 className="break-words text-lg font-bold text-gray-900 sm:text-xl">
                  {restaurantData?.Name || "Loading restaurant..."}
                </h3>

                <p className="text-sm text-gray-500">
                  {restaurantData?.address?.city}
                </p>

                <p className="mt-1 break-all text-xs text-gray-500">
                  Order #{data._id}
                </p>

              

                <div className="mt-3">
                  <Draw data={data} resData={restaurantData} />
                </div>
              </div>

              <div className="flex min-w-0 flex-col items-start gap-2 sm:min-w-[150px] sm:items-end">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    data.orderStatus === "CANCELLED"
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  {data.orderStatus}
                </span>

                {payment && (
                  <>
                    {payment.paymentStatus !== "PENDING" ? (
                      <p className="text-sm text-gray-600 sm:text-right">
                        Payment: {payment.paymentStatus}
                      </p>
                    ) : (
                      <div className="flex w-full flex-col gap-2 sm:items-end">
                        <p className="text-sm font-medium text-red-500">
                          Payment: {payment.paymentStatus} · {formattedTimer}
                        </p>

                        <button
                          type="button"
                          disabled={timer === 0}
                          className="w-full rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
                          onClick={() =>
                            navigate("/customer/secure/payments")
                          }
                        >
                          {timer === 0 ? "Payment expired" : "Pay now"}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>

            <AccordionTrigger className="gap-3 py-3 text-left text-base font-bold text-green-700 hover:no-underline sm:text-lg">
              <span className="min-w-0 break-words">
                Items List ({data.items.length})
              </span>
              <span className="ml-auto shrink-0">
                ₹{data.totalAmount}
              </span>
            </AccordionTrigger>
          </div>
        </div>

        <AccordionContent>
          <div className="flex flex-col gap-3 pb-3">
            {data.items.map((item) => (
              <div
                key={item.menuItemId}
                className="flex flex-col gap-3 rounded-lg border border-gray-100 bg-gray-50/70 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4"
              >
                <h3 className="break-words text-sm font-medium text-gray-800 sm:text-base">
                  {item.title} <span className="text-gray-500">× {item.quantity}</span>
                </h3>

                <section className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-green-700 px-3 py-2 text-sm font-semibold text-green-700 transition-colors hover:bg-green-700 hover:text-white"
                  >
                    Reorder
                  </button>

                  <button
                    type="button"
                    className="rounded-lg border border-green-700 px-3 py-2 text-sm font-semibold text-green-700 transition-colors hover:bg-green-700 hover:text-white"
                  >
                    Feedback
                  </button>

                  <button
                    type="button"
                    className="rounded-lg border border-green-700 px-3 py-2 text-sm font-semibold text-green-700 transition-colors hover:bg-green-700 hover:text-white"
                  >
                    Help
                  </button>
                </section>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default OrderCards;
