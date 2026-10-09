import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import {
  Package,
  CreditCard,
  MapPin,
  Settings,
  ChevronRight,
  PencilLine,
  UserRound,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const profileOptions = [
  { label: "Orders", icon: Package, description: "Track your food and past orders" },
  { label: "Payments", icon: CreditCard, description: "Manage your payment methods" },
  { label: "Addresses", icon: MapPin, description: "Your saved delivery locations" },
  { label: "Settings", icon: Settings, description: "Preferences and account security" },
];

const Profile = () => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const [active, setActive] = useState("Orders");
  const navigate = useNavigate()
  const activeOption = profileOptions.find((item) => item.label === active);
  const ActiveIcon = activeOption?.icon ?? Package;

  return (
    <div className="min-h-screen bg-[#f6f8f5] text-gray-900">
      <header className="relative overflow-hidden bg-green-800 text-white">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-green-600/30 blur-3xl" />
        <div className="absolute -bottom-36 left-1/3 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-10 md:px-10 md:py-14">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-2xl font-bold shadow-lg backdrop-blur-sm">
              {userName?.charAt(0)?.toUpperCase() || <UserRound size={28} />}
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-200">
                My account
              </p>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {userName || "Welcome back"}
              </h1>
              <p className="mt-1 text-sm text-green-100">
                Good food, great days. Manage everything here.
              </p>
            </div>
          </div>

          <button className="hidden items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/20 sm:flex">
            <PencilLine size={16} />
            Edit profile
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-10 md:py-12">
        <div className="mb-8">
          <p className="text-sm font-medium text-green-700">YOUR SPACE</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
            Account dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Everything you need, all in one place.
          </p>
        </div>

        <div className="grid items-start gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
            <p className="px-3 pb-3 pt-2 text-xs font-bold uppercase tracking-widest text-gray-400">
              Account menu
            </p>

            <nav className="flex gap-2 overflow-x-auto md:flex-col">
              {profileOptions.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.label;

                return (
                  <button
                    key={item.label}
                    onClick={() => setActive(item.label)}
                    className={`group flex min-w-fit flex-1 items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 md:w-full md:flex-none ${
                      isActive
                        ? "bg-green-700 text-white shadow-md shadow-green-900/15"
                        : "text-gray-600 hover:bg-green-50 hover:text-green-800"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition ${
                        isActive
                          ? "bg-white/15"
                          : "bg-gray-50 group-hover:bg-green-100"
                      }`}
                    >
                      <Icon size={19} strokeWidth={1.8} />
                    </span>

                    <span className="flex-1">
                      <span className="block text-sm font-semibold">
                        {item.label}
                      </span>
                      <span
                        className={`hidden text-xs md:block ${
                          isActive ? "text-green-100" : "text-gray-400"
                        }`}
                      >
                        {item.description}
                      </span>
                    </span>

                    <ChevronRight
                      size={17}
                      className={`hidden md:block ${
                        isActive ? "text-white" : "text-gray-300"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="mx-2 my-4 border-t border-gray-100" />

            <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3">
              <ShieldCheck className="shrink-0 text-green-700" size={21} />
              <div>
                <p className="text-sm font-semibold text-green-900">
                  Your account
                </p>
                <p className="text-xs text-green-700">
                  Manage your personal details
                </p>
              </div>
            </div>
          </aside>

          <section className="min-h-[420px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-4 border-b border-gray-100 px-6 py-6 md:px-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <ActiveIcon size={23} strokeWidth={1.8} />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold tracking-tight">
                  {active}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {activeOption?.description}
                </p>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                My account
              </span>
            </div>

            <div className="p-6 md:p-8">
              {active === "Orders" && (
                <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-700">
                    <Package size={36} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-lg font-bold">Your orders live here</h4>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                    Your delicious discoveries, current deliveries, and past
                    orders will show up here.
                  </p>
                  <button className="mt-6 flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-green-800"
                  onClick={()=>navigate("/customer/restaurants")}>                   Explore restaurants
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              )}

              {active === "Payments" && (
                <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center">
                  <CreditCard className="mx-auto mb-4 text-green-700" size={32} />
                  <h4 className="font-bold">Payment methods</h4>
                  <p className="mt-2 text-sm text-gray-500">
                    Your saved payment methods will appear here.
                  </p>
                </div>
              )}

              {active === "Addresses" && (
                <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center">
                  <MapPin className="mx-auto mb-4 text-green-700" size={32} />
                  <h4 className="font-bold">Delivery addresses</h4>
                  <p className="mt-2 text-sm text-gray-500">
                    Manage your home, work, and other delivery addresses.
                  </p>
                </div>
              )}

              {active === "Settings" && (
                <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center">
                  <Settings className="mx-auto mb-4 text-green-700" size={32} />
                  <h4 className="font-bold">Account preferences</h4>
                  <p className="mt-2 text-sm text-gray-500">
                    Your account preferences and security options will appear here.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;