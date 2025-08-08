import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SigerSidebar } from "./SigerSidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <SigerSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 flex items-center justify-between px-4 border-b border-border bg-card">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-8 w-8" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-energy-ok rounded-full animate-energy-pulse"></div>
                <span className="text-sm text-muted-foreground">Système opérationnel</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Dernière synchronisation: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}