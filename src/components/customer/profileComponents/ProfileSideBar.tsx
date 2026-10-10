import { profileOptions } from "@/assets/utils/constants";
import { ChevronRight, ShieldCheck } from "lucide-react";
type ProfileSideBarType = { active: string; setActive: (active: string) => void };
const ProfileSideBar = ({ active, setActive }: ProfileSideBarType) => {
  return (
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
          <p className="text-sm font-semibold text-green-900">Your account</p>
          <p className="text-xs text-green-700">Manage your personal details</p>
        </div>
      </div>
    </aside>
  );
};
export default ProfileSideBar;
