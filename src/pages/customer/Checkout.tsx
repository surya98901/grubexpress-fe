import {AddressCard} from "@/components/customer/AddressCard";
import CartItemCard from "@/components/customer/CartItemCard";
import { carouselScroll } from "@/assets/utils/helpers";
import { paymentMethods } from "@/assets/utils/constants";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import type { PaymentMethod } from "@/types/payment";
import { useNavigate } from "react-router-dom";
import usePlaceOrder from "@/hooks/use-placeOrder";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type CheckoutView = "payment" | "review" | null;

const CheckOut = () => {
  const [view, setView] = useState<CheckoutView>(null);
  const [err, setErr] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null,
  );

  const { items, total } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  const orderCration = usePlaceOrder();
  const deliveryFee = total > 1000 ? 10 : 35;
  const gst = Math.ceil(total * 0.05);
  const grandTotal = total + deliveryFee + gst;

  const toggleView = (section: Exclude<CheckoutView, null>) => {
    setView((current) => (current === section ? null : section));
  };

  const selectPayment = (payment: PaymentMethod) => {
    setSelectedPayment(payment);
    setView(null);
  };

  const handleProceedPayments = async () => {
    if (!selectedPayment) {
      setView("payment");
      return;
    }
    setErr(null);
    const result = await orderCration();

    if (result) {
      setErr(result);
      return;
    }

    navigate("/customer/secure/payments");
  };

  return (
    <div className="bg-gray-300 min-h-screen p-5 flex justify-between gap-5">
      <div className="flex flex-col bg-white w-[70vw] rounded-xl p-3">
        <h2 className="text-xl font-bold tracking-tighter flex items-center justify-center bg-black text-white rounded-xl p-1">
          Secure Checkout
        </h2>

        {/* ADDRESS */}
        <section className="px-2 py-4 border-b">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xl font-bold tracking-tighter">
                Delivering to
              </p>

              <AddressCard data={null} />
            </div>

            <button className="text-green-700 underline cursor-pointer">
              Change
            </button>
          </div>
        </section>

        {/* PAYMENT */}
        <section className="border-b">
          <button
            onClick={() => toggleView("payment")}
            className="w-full flex justify-between items-center px-2 py-4 cursor-pointer"
          >
            <div className="text-left">
              <p className="text-xl font-bold tracking-tighter">
                Select payment method
              </p>

              {selectedPayment && (
                <p className="text-sm text-gray-500">{selectedPayment.label}</p>
              )}
            </div>

            {view === "payment" ? <ChevronUp /> : <ChevronDown />}
          </button>

          {view === "payment" && (
            <section className="flex items-center py-3">
              <button
                onClick={() => carouselScroll("left", "payments-carousel")}
                className="cursor-pointer"
              >
                <ChevronLeft />
              </button>

              <section
                id="payments-carousel"
                className="flex gap-2 overflow-x-auto w-[90%] p-2 hide-scrollbar"
              >
                {paymentMethods.map((payment) => (
                  <button
                    key={payment.id}
                    onClick={() => selectPayment(payment)}
                    className={`min-w-[180px] p-4 rounded-xl border-2 cursor-pointer ${
                      selectedPayment?.id === payment.id
                        ? "border-green-700 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <p className="font-bold">{payment.type}</p>
                    <p className="text-sm text-gray-500">{payment.label}</p>
                  </button>
                ))}
              </section>

              <button
                onClick={() => carouselScroll("right", "payments-carousel")}
                className="cursor-pointer"
              >
                <ChevronRight />
              </button>
            </section>
          )}
        </section>

        {/* REVIEW */}
        <section>
          <button
            onClick={() => toggleView("review")}
            className="w-full flex justify-between items-center px-2 py-4 cursor-pointer"
          >
            <div>
              <p className="text-xl font-bold tracking-tighter text-left">
                Review order
              </p>

              <p className="text-sm text-gray-500">
                {items.length} item{items.length !== 1 ? "s" : ""}
              </p>
            </div>

            {view === "review" ? <ChevronUp /> : <ChevronDown />}
          </button>

          {view === "review" && (
            <section className="flex flex-col gap-2 px-2 pb-4 max-h-[45vh] overflow-y-auto">
              {items.map((item) => (
                <CartItemCard key={item.menuItemId} data={item} />
              ))}
            </section>
          )}
        </section>
      </div>

      {/* ORDER SUMMARY */}
      <div className="w-[25vw] h-fit bg-white rounded-xl flex flex-col items-center py-4 gap-3">
        <button
          onClick={handleProceedPayments}
          disabled={!selectedPayment}
          className="bg-green-700 disabled:bg-gray-400 text-sm rounded-xl text-white py-2 w-[90%] cursor-pointer disabled:cursor-not-allowed"
        >
          Pay ₹{grandTotal}
        </button>
        <AlertDialog
          open={!!err}
          onOpenChange={(open) => {
            if (!open) setErr(null);
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unable to place order</AlertDialogTitle>

              <AlertDialogDescription>{err}</AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogAction>Try Again</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <p className="text-xs px-4 py-1">
          By placing your order, you agree to GrubExpress'
          <span className="text-green-700 underline">privacy notice</span>
          and
          <span className="text-green-700 underline">conditions of use</span>.
        </p>

        <section className="border-t-2 border-gray-300 w-[90%] pt-3 flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <p>Item total</p>
            <p>₹{total}</p>
          </div>

          <div className="flex justify-between">
            <p>Delivery fee</p>
            <p>₹{deliveryFee}</p>
          </div>

          <div className="flex justify-between">
            <p>GST & other charges</p>
            <p>₹{gst}</p>
          </div>

          <div className="border-t pt-2 flex justify-between font-bold text-base">
            <p>Total</p>
            <p>₹{grandTotal}</p>
          </div>

          {selectedPayment && (
            <div className="flex justify-between text-gray-500">
              <p>Payment</p>
              <p>{selectedPayment.type}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CheckOut;
