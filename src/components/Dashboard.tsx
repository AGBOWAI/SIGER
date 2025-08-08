import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnergySourceCard } from "./EnergySourceCard";
import { 
  Battery, 
  Zap, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Activity,
  Wifi,
  WifiOff
} from "lucide-react";

interface DashboardData {
  activeSource: "sbee" | "solar" | "generator";
  batteryLevel: number;
  batteryTimeRemaining: string;
  totalConsumption: number;
  isOnline: boolean;
  lastUpdate: Date;
  alerts: Array<{
    id: string;
    type: "warning" | "error" | "info";
    message: string;
    timestamp: Date;
  }>;
}

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    activeSource: "sbee",
    batteryLevel: 85,
    batteryTimeRemaining: "2h 15m",
    totalConsumption: 12.5,
    isOnline: true,
    lastUpdate: new Date(),
    alerts: [
      {
        id: "1",
        type: "info",
        message: "Basculement automatique vers le réseau SBEE",
        timestamp: new Date(Date.now() - 300000)
      },
      {
        id: "2",
        type: "warning",
        message: "Consommation élevée détectée",
        timestamp: new Date(Date.now() - 900000)
      }
    ]
  });

  // Simulation de données temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        totalConsumption: prev.totalConsumption + (Math.random() - 0.5) * 0.5,
        batteryLevel: Math.max(0, Math.min(100, prev.batteryLevel + (Math.random() - 0.5) * 2)),
        lastUpdate: new Date()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Données simulées pour les sources d'énergie
  const energySources = [
    {
      type: "sbee" as const,
      status: dashboardData.activeSource === "sbee" ? "active" as const : "standby" as const,
      isActive: dashboardData.activeSource === "sbee",
      priority: 1,
      consumption: dashboardData.activeSource === "sbee" ? dashboardData.totalConsumption : 0,
      voltage: 220 + Math.random() * 10,
      frequency: 50 + Math.random() * 0.5,
      trend: "stable" as const,
      lastUpdate: "il y a 2s"
    },
    {
      type: "solar" as const,
      status: dashboardData.activeSource === "solar" ? "active" as const : "standby" as const,
      isActive: dashboardData.activeSource === "solar",
      priority: 2,
      consumption: dashboardData.activeSource === "solar" ? dashboardData.totalConsumption : 3.2,
      voltage: 24 + Math.random() * 2,
      frequency: 50,
      trend: "up" as const,
      lastUpdate: "il y a 1s"
    },
    {
      type: "generator" as const,
      status: dashboardData.activeSource === "generator" ? "active" as const : "offline" as const,
      isActive: dashboardData.activeSource === "generator",
      priority: 3,
      consumption: dashboardData.activeSource === "generator" ? dashboardData.totalConsumption : 0,
      voltage: 220,
      frequency: 50,
      trend: "stable" as const,
      lastUpdate: "il y a 10m"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header avec status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord SIGER</h1>
          <p className="text-muted-foreground">Supervision énergétique temps réel</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={`${dashboardData.isOnline ? "bg-energy-ok/20 text-energy-ok border-energy-ok/20" : "bg-energy-critical/20 text-energy-critical border-energy-critical/20"}`}>
            {dashboardData.isOnline ? (
              <>
                <Wifi className="w-4 h-4 mr-2" />
                Connecté
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 mr-2" />
                Hors ligne
              </>
            )}
          </Badge>
          
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour: {dashboardData.lastUpdate.toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-primary text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Source Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {energySources.find(s => s.isActive)?.type.toUpperCase() || "AUCUNE"}
            </div>
            <p className="text-xs opacity-80">
              Priorité #{energySources.find(s => s.isActive)?.priority || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Consommation Totale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {dashboardData.totalConsumption.toFixed(1)} kW
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +2.1% vs hier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Battery className="w-4 h-4" />
              Batterie Onduleur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {dashboardData.batteryLevel}%
            </div>
            <p className="text-xs text-muted-foreground">
              Autonomie: {dashboardData.batteryTimeRemaining}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Alertes Actives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {dashboardData.alerts.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.alerts.filter(a => a.type === "error").length} critiques
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sources d'énergie */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Sources d'Alimentation</h2>
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Temps réel
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {energySources.map((source) => (
            <EnergySourceCard
              key={source.type}
              {...source}
            />
          ))}
        </div>
      </div>

      {/* Alertes récentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Alertes Récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dashboardData.alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === "error" ? "bg-energy-critical" :
                  alert.type === "warning" ? "bg-energy-alert" :
                  "bg-primary"
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {alert.timestamp.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}