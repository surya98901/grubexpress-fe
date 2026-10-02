import {
  LayoutDashboard,
  LayoutGrid,
  SquareText,
  CalendarCheck,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { setServiceType } from "@/store/slices/serviceSlice";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Reservations",
    path: "/admin/services?type=reservation",
    icon: CalendarCheck,
  },
  {
    label: "Orders",
    path: "/admin/services?type=orders",
    icon: SquareText,
  },
  {
    label: "Menu",
    path: "/admin/menu",
    icon: LayoutGrid,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch()

  return (
    <aside
      className={`sticky top-0 z-40 flex h-screen shrink-0 flex-col border-r border-gray-200 bg-white transition-[width] duration-300 ease-in-out ${collapsed ? "w-20" : "w-60"}`}
    >
      <div className="flex h-16 shrink-0 items-center border-b border-gray-200 px-3">
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className={`group flex h-10 w-full items-center rounded-xl transition-all duration-200 hover:bg-gray-100 ${collapsed ? "justify-center" : "gap-3"}`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 group-hover:bg-green-700 group-hover:text-white">
            {collapsed ? (
              <Menu className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            ) : (
              <ChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            )}
          </div>

          <span
            className={`overflow-hidden whitespace-nowrap font-bold text-gray-900 transition-all duration-300 ${collapsed ? "w-0 translate-x-[-10px] opacity-0" : "w-auto translate-x-0 opacity-100"}`}
          >
            GrubExpress
          </span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const itemUrl = new URL(item.path, window.location.origin);
            const isActive =
              location.pathname === itemUrl.pathname &&
              location.search === itemUrl.search;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                title={collapsed ? item.label : undefined}
                className={`group relative flex h-11 w-full items-center rounded-xl transition-all duration-200 ${collapsed ? "justify-center" : "gap-3 px-3"} ${isActive ? "bg-green-700 text-white shadow-sm" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"}`}
              >
                <span
                  className={`absolute left-0 h-6 w-1 rounded-r-full bg-white transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0"}`}
                />

                <Icon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />

                <span
                  className={`overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 ${collapsed ? "w-0 translate-x-[-8px] opacity-0" : "w-auto translate-x-0 opacity-100"}`}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="shrink-0 border-t border-gray-200 p-3">
        <button
          type="button"
          title={collapsed ? "Logout" : undefined}
          className={`group flex h-11 w-full items-center rounded-xl text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600 ${collapsed ? "justify-center" : "gap-3 px-3"}`}
        >
          <LogOut className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />

          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${collapsed ? "w-0 translate-x-[-8px] opacity-0" : "w-auto translate-x-0 opacity-100"}`}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
