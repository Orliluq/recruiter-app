import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8 max-w-[1440px] mx-auto">
          {children}
        </div>
        <footer className="p-6 lg:p-8 max-w-[1440px] mx-auto">
          <p className="text-xs text-center">&copy; {new Date().getFullYear()} Recruiter App. Todos los derechos reservados. by Orli Dun</p>
        </footer>
      </main>
    </div>
  );
}
