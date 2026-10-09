import CartItemCard from "@/components/customer/CartItemCard";
import {  useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Link, useNavigate } from "react-router-dom";
import {
  AddressCard,
  AddAddressCard,
} from "@/components/customer/AddressCard";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { carouselScroll } from "@/assets/utils/helpers";
import useGetUserAddresses from "@/hooks/use-getUserAddresses";


const Cart = () => {
  const navigate = useNavigate();

  const {
    addressData,
    loading: addressLoading,
    error: addressError,
  } = useGetUserAddresses();

  const { items, total, restaurantId } = useSelector(
    (state: RootState) => state.cart,
  );

  const deliveryFee = total > 1000 ? 10 : 35;
  const gst = Math.ceil(total * 0.05);
  const grandTotal = total + deliveryFee + gst;

  if (!items.length) {
    return (
      <div className="min-h-[80vh] bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 flex flex-col items-center gap-3 shadow-sm">
          <ShoppingBag className="text-gray-400" size={42} />

          <h2 className="text-xl font-bold tracking-tight">
            Your cart is empty
          </h2>

          <p className="text-sm text-gray-500">
            Add something delicious to get started.
          </p>

          <Link
            to="/customer/restaurants"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-xl mt-2"
          >
            Browse restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-6 ">
          <h1 className="text-3xl font-bold tracking-tight">
            Your Cart
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Review your items and choose where you'd like them delivered.
          </p>
        </div>

        <div className="grid grid-cols-[1.4fr_1fr] gap-6 items-start">
          {/* LEFT — CART */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold tracking-tight">
                    Your items
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {items.length} item
                    {items.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <Link
                  to={`/customer/restaurant/${restaurantId}`}
                  className="text-sm text-green-700 hover:text-green-800 underline"
                >
                  Add more items
                </Link>
              </div>
            </div>

            <section className="px-6 py-4 max-h-[42vh] overflow-y-auto">
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <CartItemCard
                    key={item.menuItemId}
                    data={item}
                  />
                ))}
              </div>
            </section>

            <div className="px-6 pb-5">
              <label
                htmlFor="suggestions"
                className="text-sm font-semibold"
              >
                Cooking instructions
              </label>

              <textarea
                name="suggestions"
                id="suggestions"
                placeholder="Any special instructions for the restaurant?"
                className="mt-2 w-full min-h-[80px] resize-none border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-green-700"
              />
            </div>

            {/* BILL */}
            <div className="border-t px-6 py-5">
              <h3 className="font-bold mb-4">
                Bill details
              </h3>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Item total
                  </span>

                  <span>₹{total}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Delivery fee
                  </span>

                  <span>₹{deliveryFee}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    GST & other charges
                  </span>

                  <span>₹{gst}</span>
                </div>

                <div className="border-t pt-4 mt-1 flex justify-between text-base font-bold">
                  <span>To Pay</span>

                  <span>₹{grandTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — DELIVERY */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b">
              <h2 className="text-lg font-bold tracking-tight">
                Delivery address
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Where should we deliver your order?
              </p>
            </div>

            <div className="px-4 py-5">
              {addressLoading ? (
                <div className="flex items-center justify-center py-10">
                  <p className="text-sm text-gray-500">
                    Loading addresses...
                  </p>
                </div>
              ) : addressError ? (
                <div className="flex flex-col items-center gap-3 py-10">
                  <p className="text-sm text-red-500">
                    {addressError}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      carouselScroll(
                        "left",
                        "address-carousel",
                      )
                    }
                    className="shrink-0 h-9 w-9 rounded-full border flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <section
                    id="address-carousel"
                    className="flex gap-3 overflow-x-auto w-full p-1 hide-scrollbar"
                  >
                    {addressData && addressData.length > 0 ? (
                      <>
                        {addressData.map((item) => (
                          <AddressCard
                            key={item._id}
                            data={item}
                          />
                        ))}

                        <AddAddressCard />
                      </>
                    ) : (
                      <AddAddressCard />
                    )}
                  </section>

                  <button
                    onClick={() =>
                      carouselScroll(
                        "right",
                        "address-carousel",
                      )
                    }
                    className="shrink-0 h-9 w-9 rounded-full border flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}

              <button
                onClick={() =>
                  navigate("/customer/checkout")
                }
                className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-xl transition cursor-pointer"
              >
                Proceed to checkout
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                You'll be able to choose your payment method next.
              </p>
            </div>

            {/* MINI SUMMARY */}
            <div className="border-t bg-gray-50 px-6 py-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Items
                </span>

                <span>{items.length}</span>
              </div>

              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">
                  Total
                </span>

                <span className="font-bold">
                  ₹{grandTotal}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;