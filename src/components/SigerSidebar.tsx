import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Gauge,
  Zap,
  History,
  Settings,
  AlertTriangle,
  Download,
  Activity
} from "lucide-react";

const menuItems = [
  { title: "Tableau de bord", url: "/", icon: Gauge },
  { title: "Sources d'énergie", url: "/sources", icon: Zap },
  { title: "Consommation", url: "/consumption", icon: Activity },
  { title: "Historique", url: "/history", icon: History },
  { title: "Alertes", url: "/alerts", icon: AlertTriangle },
  { title: "OTA", url: "/ota", icon: Download },
  { title: "Paramètres", url: "/settings", icon: Settings },
];

export function SigerSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/20 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} border-r border-border transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-sidebar-foreground">SIGER</h2>
                <p className="text-xs text-sidebar-foreground/60">Gestion Énergétique</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        <div className="p-4 mt-auto border-t border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-energy-ok rounded-full animate-energy-pulse"></div>
              <span className="text-sidebar-foreground/60">Système connecté</span>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <div className="w-2 h-2 bg-energy-ok rounded-full animate-energy-pulse"></div>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}