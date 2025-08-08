import { Layout } from "@/components/Layout";
import { EnergySourceCard } from "@/components/EnergySourceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Settings, RefreshCw } from "lucide-react";

export default function Sources() {
  const energySources = [
    {
      type: "sbee" as const,
      status: "active" as const,
      isActive: true,
      priority: 1,
      consumption: 12.5,
      voltage: 225,
      frequency: 50.1,
      trend: "stable" as const,
      lastUpdate: "il y a 2s"
    },
    {
      type: "solar" as const,
      status: "standby" as const,
      isActive: false,
      priority: 2,
      consumption: 3.2,
      voltage: 24.5,
      frequency: 50,
      trend: "up" as const,
      lastUpdate: "il y a 1s"
    },
    {
      type: "generator" as const,
      status: "offline" as const,
      isActive: false,
      priority: 3,
      consumption: 0,
      voltage: 0,
      frequency: 0,
      trend: "stable" as const,
      lastUpdate: "il y a 10m"
    }
  ];

  const switchingPriority = ["SBEE", "Panneau Solaire", "Groupe Électrogène"];

  return (
    <Layout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sources d'Énergie</h1>
            <p className="text-muted-foreground">Gestion et surveillance des sources d'alimentation</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configuration
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Priorité de basculement */}
        <Card>
          <CardHeader>
            <CardTitle>Priorité de Basculement Automatique</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {switchingPriority.map((source, index) => (
                <div key={source} className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {index + 1}
                  </Badge>
                  <span className="font-medium">{source}</span>
                  {index < switchingPriority.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Le système bascule automatiquement vers la source suivante en cas de défaillance.
            </p>
          </CardContent>
        </Card>

        {/* Sources d'énergie */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {energySources.map((source) => (
            <EnergySourceCard
              key={source.type}
              {...source}
            />
          ))}
        </div>

        {/* Informations techniques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de Basculement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Délai de basculement</span>
                <span className="font-medium">&lt; 50ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Seuil de tension minimum</span>
                <span className="font-medium">200V</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Seuil de fréquence</span>
                <span className="font-medium">49.5 - 50.5 Hz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Mode de fonctionnement</span>
                <Badge variant="outline" className="bg-energy-ok/20 text-energy-ok">Automatique</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>État du Système</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Source principale</span>
                <span className="font-medium">SBEE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Sources disponibles</span>
                <span className="font-medium">2/3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Dernière commutation</span>
                <span className="font-medium">Hier 14:23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Temps de fonctionnement</span>
                <span className="font-medium">15j 6h 42m</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}