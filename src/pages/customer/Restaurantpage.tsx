import { useEffect, useState } from "react";
import type { Restaurant } from "@/types/restaurant";

import { getRestaurant } from "@/services/restaurantApi";
import { useSelector } from "react-redux";
import Menu from "@/components/menu";
import { useParams } from "react-router-dom";
import RestaurantHeroBanner from "@/components/RestaurantHeroBanner";
import OfferContainer from "@/components/OffersContainer";
import RestaurntContainerSlide from "@/components/RestaurantContainerSlide";
import type { RootState } from "@/store/store";

const RestaurantPage = () => {
console.log("page rendering" )
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);
   const serviceType = useSelector(
    (state: RootState) => state.service.serviceType,
  );
  const { id } = useParams();
   console.log("🔥 RENDER", {
    id,
    serviceType,
  });
  useEffect(() => {
    console.log("🔥 EFFECT", {
      id,
      serviceType,
    });
    if (!id) { console.log("returned with failure") ; return};

    const fetchRestaurantData = async () => {
        console.log("executing the fetch ")
      try {
        const restaurantResponse = await getRestaurant(id);
        setRestaurantData(restaurantResponse.data.restaurant);
         console.log("fetch success")
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    fetchRestaurantData();
  }, [id]);
  return serviceType === "food-delivery" ? foodDel(restaurantData) : dining(restaurantData)
};
const dining = (restaurantData : any)=>{
    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8">
      <div className="flex gap-2 text-sm">
        <span className="text-gray-500">Home</span>
        <span>/</span>
        <span className="text-gray-500">{restaurantData?.address?.city}</span>
        <span>/</span>
        <span className="font-medium text-green-700">
          {restaurantData?.Name}
        </span>
      </div>
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {restaurantData?.Name}
        </h1>
        <RestaurantHeroBanner data={restaurantData} />
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-bold">Offers & Deals</h2>
        <OfferContainer />
      </section>
      <Menu />

      <section className="border-t pt-8">
        <h2 className="mb-5 text-2xl font-bold">You may also like</h2>
        < RestaurntContainerSlide />

      </section>

      <section className="border-t pt-8">
        <h2 className="mb-4 text-2xl font-bold">
          About {restaurantData?.Name}
        </h2>
        <p className="leading-7 text-gray-600">{restaurantData?.Description}</p>
      </section>

      <section className="border-t pt-8">
        <h2 className="mb-5 text-2xl font-bold">Restaurant Information</h2>
        <div className="grid gap-4 rounded-xl bg-gray-50 p-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">
              {restaurantData?.address?.addressLine},{" "}
              {restaurantData?.address?.city}, {restaurantData?.address?.state}{" "}
              - {restaurantData?.address?.pincode}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">FSSAI License</p>
            <p className="font-medium">{restaurantData?.FSSAIID}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Cuisine</p>
            <p className="font-medium">{restaurantData?.Cusine?.join(", ")}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Rating</p>
            <p className="font-medium">⭐ {restaurantData?.rating}</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="mb-5 text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="rounded-lg border p-4">
            <summary className="cursor-pointer font-medium">
              Does this restaurant offer delivery?
            </summary>
            <p className="mt-3 text-gray-600">
              Delivery availability depends on the restaurant and your location.
            </p>
          </details>

          <details className="rounded-lg border p-4">
            <summary className="cursor-pointer font-medium">
              What cuisines are available?
            </summary>
            <p className="mt-3 text-gray-600">
              {restaurantData?.Cusine?.join(", ")}
            </p>
          </details>
        </div>
      </section>

      <section className="border-t pt-8 pb-10">
        <h2 className="mb-3 text-lg font-semibold">Disclaimer</h2>
        <p className="text-sm leading-6 text-gray-500">
          Restaurant information, menu items, prices and availability may
          change. Please verify the details before placing an order.
        </p>
      </section>
    </div>
    )
}
const foodDel = (restaurantData : any)=>{
    return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8">
      <div className="flex gap-2 text-sm">
        <span className="text-gray-500">Home</span>
        <span>/</span>
        <span className="text-gray-500">{restaurantData?.address?.city}</span>
        <span>/</span>
        <span className="font-medium text-green-700">
          {restaurantData?.Name}
        </span>
      </div>
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {restaurantData?.Name}
        </h1>
        <RestaurantHeroBanner data={restaurantData} />
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-bold">Offers & Deals</h2>
        <OfferContainer />
      </section>
      <Menu />

      <section className="border-t pt-8">
        <h2 className="mb-5 text-2xl font-bold">You may also like</h2>
        < RestaurntContainerSlide />

      </section>

      <section className="border-t pt-8">
        <h2 className="mb-4 text-2xl font-bold">
          About {restaurantData?.Name}
        </h2>
        <p className="leading-7 text-gray-600">{restaurantData?.Description}</p>
      </section>

      <section className="border-t pt-8">
        <h2 className="mb-5 text-2xl font-bold">Restaurant Information</h2>
        <div className="grid gap-4 rounded-xl bg-gray-50 p-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">
              {restaurantData?.address?.addressLine},{" "}
              {restaurantData?.address?.city}, {restaurantData?.address?.state}{" "}
              - {restaurantData?.address?.pincode}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">FSSAI License</p>
            <p className="font-medium">{restaurantData?.FSSAIID}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Cuisine</p>
            <p className="font-medium">{restaurantData?.Cusine?.join(", ")}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Rating</p>
            <p className="font-medium">⭐ {restaurantData?.rating}</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="mb-5 text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="rounded-lg border p-4">
            <summary className="cursor-pointer font-medium">
              Does this restaurant offer delivery?
            </summary>
            <p className="mt-3 text-gray-600">
              Delivery availability depends on the restaurant and your location.
            </p>
          </details>

          <details className="rounded-lg border p-4">
            <summary className="cursor-pointer font-medium">
              What cuisines are available?
            </summary>
            <p className="mt-3 text-gray-600">
              {restaurantData?.Cusine?.join(", ")}
            </p>
          </details>
        </div>
      </section>

      <section className="border-t pt-8 pb-10">
        <h2 className="mb-3 text-lg font-semibold">Disclaimer</h2>
        <p className="text-sm leading-6 text-gray-500">
          Restaurant information, menu items, prices and availability may
          change. Please verify the details before placing an order.
        </p>
      </section>
    </div>
  );
}
export default RestaurantPage;
