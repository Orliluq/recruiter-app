import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Kanban,
  Users,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Pipeline", path: "/pipeline", icon: Kanban },
  { label: "Candidates", path: "/candidates", icon: Users },
  { label: "Jobs", path: "/jobs", icon: Briefcase },
  { label: "Calendar", path: "/calendar", icon: Calendar },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`sticky top-0 h-screen flex flex-col border-r border-sidebar-border transition-all duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
      style={{ background: "var(--gradient-sidebar)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-sidebar-border shrink-0">
        <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center shrink-0">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-foreground text-sm tracking-tight">
            Recruiter OS
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`sidebar-item ${
                active ? "sidebar-item-active" : "sidebar-item-inactive"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 border-t border-sidebar-border text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}
