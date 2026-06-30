import { ReactNode, useState } from "react";
import { AppSidebar } from "./AppSidebar";

type AppLayoutProps = Readonly<{
  children: ReactNode;
}>;

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="md:hidden flex items-center justify-between border-b border-sidebar-border px-4 py-3 bg-sidebar/95 backdrop-blur-sm sticky top-0 z-30">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition hover:border-primary/60 hover:text-primary"
          aria-label="Abrir menú"
        >
          <span className="text-lg font-semibold">☰</span>
        </button>
        <div className="text-sm font-semibold tracking-tight">
          Recruiter App
        </div>
        <div className="h-10 w-10" />
      </div>

      <div className="flex min-h-[calc(100vh-3.5rem)] w-full flex-col md:flex-row">
        <AppSidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto">
            {children}
          </div>
          <footer className="p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto">
            <p className="text-xs text-center">
              &copy; {new Date().getFullYear()} Recruiter App. Todos los
              derechos reservados. by Orli Dun
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
