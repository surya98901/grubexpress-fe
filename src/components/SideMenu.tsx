import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Restaurants",
    path: "/admin/restaurants",
    icon: Store,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    label: "Items",
    path: "/admin/menu/items",
    icon: Users,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside
      className={`
        sticky top-0 flex h-screen shrink-0 flex-col
        border-r bg-background
        transition-[width] duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Header */}
      <div className="flex h-16 items-center border-b px-3">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="
            group flex h-10 w-full items-center rounded-lg
            transition-all duration-200
            hover:bg-muted
          "
        >
          <div
            className={`
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-lg
              transition-all duration-300
              group-hover:bg-primary group-hover:text-primary-foreground ml-2
            `}
          >
            {collapsed ? (
              <Menu className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 " />
            ) : (
              <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            )}
          </div>

          <span
            className={`
              ml-3 whitespace-nowrap font-semibold
              transition-all duration-300
              ${
                collapsed
                  ? "w-0 translate-x-[-10px] opacity-0"
                  : "w-auto translate-x-0 opacity-100"
              }
            `}
          >
            GrubExpress
          </span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) => `
                group relative flex h-11 items-center rounded-lg
                transition-all duration-200
                ${
                  collapsed
                    ? "justify-center"
                    : "gap-3 px-3"
                }

                ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : `
                      text-muted-foreground
                      hover:bg-muted
                      hover:text-foreground
                    `
                }
              `}
            >
              {/* Active indicator */}
              <span
                className="
                  absolute left-0 h-6 w-1 rounded-r-full
                  bg-primary-foreground
                  opacity-0 transition-opacity duration-200
                  group-[.active]:opacity-100
                "
              />

              <Icon
                className="
                  h-5 w-5 shrink-0
                  transition-transform duration-200
                  group-hover:scale-110
                "
              />

              <span
                className={`
                  whitespace-nowrap overflow-hidden
                  transition-all duration-300
                  ${
                    collapsed
                      ? "w-0 translate-x-[-8px] opacity-0"
                      : "w-auto translate-x-0 opacity-100"
                  }
                `}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t p-3">
        <button
          title={collapsed ? "Logout" : undefined}
          className={`
            group flex h-11 w-full items-center rounded-lg
            text-sm font-medium text-muted-foreground
            transition-all duration-200
            hover:bg-muted hover:text-foreground
            ${collapsed ? "justify-center" : "gap-3 px-3"}
          `}
        >
          <LogOut
            className="
              h-5 w-5 shrink-0
              transition-transform duration-200
              group-hover:translate-x-0.5
            "
          />

          <span
            className={`
              whitespace-nowrap overflow-hidden
              transition-all duration-300
              ${
                collapsed
                  ? "w-0 translate-x-[-8px] opacity-0"
                  : "w-auto translate-x-0 opacity-100"
              }
            `}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}