import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import {
  UserRound,
} from "lucide-react";

import ProfileSideBar from "@/components/customer/profileComponents/ProfileSideBar";
import ProfileDetails from "@/components/customer/profileComponents/ProfileDetails";
import ProfileEditAlert from "@/components/genericUIcomponents/Alerts/ProfileEditAlert";


const Profile = () => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const [active, setActive] = useState("Orders");

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

          <ProfileEditAlert/>
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
          <ProfileSideBar active = {active}  setActive={setActive}/>
          <ProfileDetails active={active}/>

        </div>
      </main>
    </div>
  );
};

export default Profile;