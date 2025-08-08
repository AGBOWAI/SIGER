import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  Download,
  Filter,
  ArrowUpDown,
  Zap,
  AlertTriangle,
  Info,
  Power
} from "lucide-react";

interface HistoryEvent {
  id: string;
  timestamp: Date;
  type: "switch" | "alert" | "maintenance" | "consumption";
  severity: "info" | "warning" | "critical";
  source?: string;
  message: string;
  details: string;
}

export default function History() {
  const events: HistoryEvent[] = [
    {
      id: "1",
      timestamp: new Date(Date.now() - 300000),
      type: "switch",
      severity: "info",
      source: "SBEE",
      message: "Basculement automatique vers le réseau SBEE",
      details: "Rétablissement de l'alimentation principale après coupure de 2h15m"
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 900000),
      type: "alert",
      severity: "warning",
      message: "Consommation élevée détectée",
      details: "Pic de consommation à 18.5 kW pendant 15 minutes"
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 8700000),
      type: "switch",
      severity: "warning",
      source: "Groupe",
      message: "Basculement vers le groupe électrogène",
      details: "Coupure SBEE détectée - Démarrage automatique du groupe"
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 86400000),
      type: "maintenance",
      severity: "info",
      source: "Solaire",
      message: "Maintenance programmée du système solaire",
      details: "Nettoyage des panneaux et vérification des connexions"
    },
    {
      id: "5",
      timestamp: new Date(Date.now() - 172800000),
      type: "alert",
      severity: "critical",
      message: "Défaillance du groupe électrogène",
      details: "Arrêt d'urgence suite à une température moteur excessive"
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case "switch": return Power;
      case "alert": return AlertTriangle;
      case "maintenance": return Info;
      case "consumption": return Zap;
      default: return Info;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-energy-critical text-energy-critical-foreground";
      case "warning": return "bg-energy-alert text-energy-alert-foreground";
      case "info": return "bg-primary/20 text-primary";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "switch": return "Basculement";
      case "alert": return "Alerte";
      case "maintenance": return "Maintenance";
      case "consumption": return "Consommation";
      default: return "Événement";
    }
  };

  return (
    <Layout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Historique des Événements</h1>
            <p className="text-muted-foreground">Journal complet des activités du système SIGER</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Période
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Événements (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12</div>
              <p className="text-xs text-muted-foreground">+3 vs hier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Basculements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">3</div>
              <p className="text-xs text-muted-foreground">Cette semaine</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Alertes Critiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-energy-critical">1</div>
              <p className="text-xs text-muted-foreground">Résolue</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Temps de fonctionnement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-energy-ok">99.2%</div>
              <p className="text-xs text-muted-foreground">Ce mois</p>
            </CardContent>
          </Card>
        </div>

        {/* Liste des événements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Journal des Événements</CardTitle>
              <Button variant="ghost" size="sm">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Trier par date
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => {
                const EventIcon = getEventIcon(event.type);
                return (
                  <div key={event.id} className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className={`p-2 rounded-lg ${getSeverityColor(event.severity)}`}>
                      <EventIcon className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-foreground">{event.message}</h3>
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(event.type)}
                        </Badge>
                        {event.source && (
                          <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
                            {event.source}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{event.details}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.timestamp.toLocaleDateString()} à {event.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <Badge variant="secondary" className={getSeverityColor(event.severity)}>
                        {event.severity === "critical" ? "Critique" :
                         event.severity === "warning" ? "Alerte" : "Info"}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Légende */}
        <Card>
          <CardHeader>
            <CardTitle>Types d'Événements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Power className="w-4 h-4 text-primary" />
                <span className="text-sm">Basculement de source</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-energy-alert" />
                <span className="text-sm">Alerte système</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-energy-ok" />
                <span className="text-sm">Maintenance</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-foreground" />
                <span className="text-sm">Consommation</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}