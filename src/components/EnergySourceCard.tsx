import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Zap, 
  Sun, 
  Fuel, 
  Power,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";

export type EnergySourceType = "sbee" | "solar" | "generator";
export type EnergyStatus = "active" | "standby" | "offline" | "maintenance";
export type EnergyTrend = "up" | "down" | "stable";

interface EnergySourceCardProps {
  type: EnergySourceType;
  status: EnergyStatus;
  isActive: boolean;
  priority: number;
  consumption: number;
  voltage: number;
  frequency: number;
  trend: EnergyTrend;
  lastUpdate: string;
}

const sourceConfig = {
  sbee: {
    name: "SBEE",
    fullName: "Réseau Électrique",
    icon: Power,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  },
  solar: {
    name: "Solaire",
    fullName: "Panneau Solaire",
    icon: Sun,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20"
  },
  generator: {
    name: "Groupe",
    fullName: "Groupe Électrogène",
    icon: Fuel,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20"
  }
};

const statusConfig = {
  active: {
    label: "Actif",
    color: "bg-energy-ok text-energy-ok-foreground",
    dotColor: "bg-energy-ok"
  },
  standby: {
    label: "Attente",
    color: "bg-energy-alert text-energy-alert-foreground",
    dotColor: "bg-energy-alert"
  },
  offline: {
    label: "Hors ligne",
    color: "bg-energy-critical text-energy-critical-foreground",
    dotColor: "bg-energy-critical"
  },
  maintenance: {
    label: "Maintenance",
    color: "bg-muted text-muted-foreground",
    dotColor: "bg-muted-foreground"
  }
};

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus
};

export function EnergySourceCard({
  type,
  status,
  isActive,
  priority,
  consumption,
  voltage,
  frequency,
  trend,
  lastUpdate
}: EnergySourceCardProps) {
  const config = sourceConfig[type];
  const statusInfo = statusConfig[status];
  const IconComponent = config.icon;
  const TrendIcon = trendIcons[trend];

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-card",
      config.bgColor,
      config.borderColor,
      isActive && "shadow-energy ring-2 ring-primary/20 animate-energy-pulse"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              config.bgColor,
              config.borderColor,
              "border"
            )}>
              <IconComponent className={cn("w-5 h-5", config.color)} />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {config.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{config.fullName}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className={statusInfo.color}>
              <div className={cn(
                "w-2 h-2 rounded-full mr-2",
                statusInfo.dotColor,
                status === "active" && "animate-energy-pulse"
              )} />
              {statusInfo.label}
            </Badge>
            {isActive && (
              <Badge variant="outline" className="bg-primary/20 text-primary border-primary/20">
                Source active
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Priority */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Priorité</span>
          <span className="font-medium">#{priority}</span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Consommation</span>
              <TrendIcon className={cn(
                "w-3 h-3",
                trend === "up" && "text-red-400",
                trend === "down" && "text-green-400",
                trend === "stable" && "text-yellow-400"
              )} />
            </div>
            <p className="text-lg font-semibold">{consumption.toFixed(1)} kW</p>
          </div>
          
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Tension</span>
            <p className="text-lg font-semibold">{voltage.toFixed(0)} V</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Fréquence</span>
            <p className="text-lg font-semibold">{frequency.toFixed(1)} Hz</p>
          </div>
          
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Mis à jour</span>
            <p className="text-sm text-muted-foreground">{lastUpdate}</p>
          </div>
        </div>

        {/* Status bar */}
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full transition-all duration-500",
              status === "active" && "bg-energy-ok",
              status === "standby" && "bg-energy-alert",
              status === "offline" && "bg-energy-critical",
              status === "maintenance" && "bg-muted-foreground"
            )}
            style={{ 
              width: status === "active" ? "100%" : 
                     status === "standby" ? "60%" : 
                     status === "maintenance" ? "30%" : "0%" 
            }}
          />
        </div>
      </CardContent>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary" />
      )}
    </Card>
  );
}