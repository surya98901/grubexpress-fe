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
      const now = Date.now();
      const remaining = Math.max(0, expiry - now);
      setTimer(remaining);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [payment]);

  useEffect(() => {
    if (!data.restaurantId) return;
    const fetchData = async () => {
      try {
        const restaurantResponse = await getRestaurant(data.restaurantId);
        const paymentResponse = await getPayment(data._id);
        setRestaurantData(restaurantResponse.data.restaurant);
        setPayment(paymentResponse.data.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchData();
  }, [data.restaurantId, data._id]);

  const minutes = Math.floor(timer / 1000 / 60);
  const seconds = Math.floor((timer / 1000) % 60);
  const formattedTimer = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;


  const liveOrder = !["DELIVERED", "CANCELLED"].includes(
    data.orderStatus
  );

  return liveOrder ? (
    <Accordion className="w-[60vw] mx-auto shadow-md px-2 rounded-xl mt-10">
      <AccordionItem value="item-1">
        <div className="flex gap-2">

          {/* Restaurant image */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxwePk1PjLlxROFEpElmoltcHyglQ2IBo7rn8nwMG7DhvE0aVLsmtU0_g&s=10"
            alt={restaurantData?.Name || "Restaurant"}
            className="w-[200px] my-4 rounded-xl object-cover shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
          />

          <div className="flex flex-col w-full p-2">

            {/* Order header */}
            <section className="flex gap-3 justify-between py-2">

              {/* Restaurant / order information */}
              <ul>
                <li>{restaurantData?.Name}</li>

                <li className="text-xs text-gray-500">
                  {restaurantData?.address?.city}
                </li>

                <li className="text-xs text-gray-600">
                  Order {data._id} | {data.createdAt}
                </li>

                <Draw
                  data={data}
                  resData={restaurantData}
                />
              </ul>

              {/* Status / payment */}
              <ul>

                {/* Order status */}
                <li
                  className={
                    data.orderStatus !== "CANCELLED"
                      ? "font-semibold text-green-700"
                      : "font-semibold text-red-500"
                  }
                >
                  Status: {data.orderStatus}
                </li>

                {/* Payment status */}
                {payment?.paymentStatus !== "PENDING" ? (
                  <li className="text-sm text-muted-foreground">
                    Payment: {payment?.paymentStatus}
                  </li>
                ) : (
                  <div className="flex flex-col gap-1 text-sm">

                    <li className="text-red-500">
                      Payment: {payment.paymentStatus} · {formattedTimer}
                    </li>

                    <button
                      disabled={timer === 0}
                      className="bg-green-700 p-1 rounded-l text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                      onClick={() =>
                        navigate("/customer/payments")
                      }
                    >
                      {timer === 0
                        ? "Payment expired"
                        : "Pay now"}
                    </button>

                  </div>
                )}
              </ul>
            </section>

            {/* Accordion trigger */}
            <AccordionTrigger className="font-bold flex items-center gap-5 underline text-green-700 text-xl">
              Items List (₹{data.totalAmount})
            </AccordionTrigger>
          </div>
        </div>

        {/* Order items */}
        <AccordionContent>
          <div className="flex flex-col gap-5">

            {data.items.map((item) => (
              <div
                key={item.menuItemId}
                className="flex flex-col border-b-2 border-green-600 items-start gap-2 p-2 mx-2"
              >
                <h3>
                  {item.title} x {item.quantity}
                </h3>

                <section className="flex gap-2 items-center">

                  <div className="text-green-700 font-bold border-2 border-green-700 p-2 rounded-l">
                    Reorder
                  </div>

                  <div className="text-green-700 font-bold border-2 border-green-700 p-2 rounded-l">
                    Feedback
                  </div>

                  <div className="text-green-700 font-bold border-2 border-green-700 p-2 rounded-l">
                    Help
                  </div>

                </section>
              </div>
            ))}

          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ) : (
    <div />
  );
};

export default OrderCards;