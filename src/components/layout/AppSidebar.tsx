import { useState, type Dispatch, type SetStateAction } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Kanban,
  Users,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Pipeline", path: "/pipeline", icon: Kanban },
  { label: "Candidatos", path: "/candidates", icon: Users },
  { label: "Empleos", path: "/jobs", icon: Briefcase },
  { label: "Calendario", path: "/calendar", icon: Calendar },
];

type AppSidebarProps = Readonly<{
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
}>;

export function AppSidebar({ mobileOpen, setMobileOpen }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const showLabels = mobileOpen || !collapsed;

  return (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-label="Cerrar menú"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar shadow-xl transition-all duration-200 md:relative md:top-0 md:h-screen md:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${collapsed ? "md:w-16" : "md:w-60"} w-72`}
        style={{ background: "var(--gradient-sidebar)" }}
      >
        <div className="flex items-center justify-between gap-2.5 px-4 h-14 border-b border-sidebar-border shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-10 w-10 object-contain"
              />
            </div>
            {showLabels && (
              <span className="font-semibold text-foreground text-sm tracking-tight">
                Recruiter App
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:border-primary/60 hover:text-primary"
            aria-label="Cerrar menú"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`sidebar-item flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  active ? "sidebar-item-active" : "sidebar-item-inactive"
                }`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {showLabels && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-2">
          <ThemeToggle />
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center h-10 border-t border-sidebar-border text-muted-foreground hover:text-foreground transition-colors"
          aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
          ) : (
            <ChevronLeft className="h-4 w-4 flex-shrink-0" />
          )}
        </button>
      </aside>
    </>
  );
}
