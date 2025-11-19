import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Gauge, Fuel, Settings, Clock } from "lucide-react";

interface FurnaceData {
  drumTemp: number;
  pressure: number;
  coalStock: number;
  mode: string;
  timestamp: string;
}

interface FurnaceBulletinProps {
  data?: FurnaceData;
}

export default function FurnaceBulletin({ data }: FurnaceBulletinProps) {
  const metrics = [
    {
      id: "drum-temp",
      label: "Drum Temperature",
      value: data?.drumTemp ?? 0,
      unit: "°C",
      icon: Flame,
      status: (data?.drumTemp ?? 0) > 850 ? "warning" : "normal",
      testId: "text-drum-temp"
    },
    {
      id: "pressure",
      label: "Pressure",
      value: data?.pressure ?? 0,
      unit: "PSI",
      icon: Gauge,
      status: "normal",
      testId: "text-pressure"
    },
    {
      id: "coal-stock",
      label: "Coal Stock",
      value: data?.coalStock ?? 0,
      unit: "tons",
      icon: Fuel,
      status: (data?.coalStock ?? 0) < 50 ? "warning" : "normal",
      testId: "text-coal-stock"
    },
    {
      id: "mode",
      label: "Operating Mode",
      value: data?.mode ?? "—",
      unit: "",
      icon: Settings,
      status: "normal",
      testId: "text-mode"
    }
  ];

  return (
    <Card className="border-card-border" data-testid="card-furnace-bulletin">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold tracking-tight">Furnace Status</CardTitle>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chart-3 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-chart-3"></span>
          </span>
          <span className="text-xs font-medium text-muted-foreground">LIVE</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
                <div className="flex items-baseline gap-2">
                  <p 
                    id={metric.id}
                    className="font-mono text-2xl font-semibold text-foreground"
                    data-testid={metric.testId}
                  >
                    {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                  </p>
                  {metric.unit && (
                    <span className="font-mono text-sm text-muted-foreground">{metric.unit}</span>
                  )}
                </div>
                {metric.status === "warning" && (
                  <Badge variant="secondary" className="bg-chart-2/20 text-chart-2 border-chart-2/30">
                    Warning
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 border-t border-border pt-4">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <p 
            id="timestamp"
            className="font-mono text-xs text-muted-foreground"
            data-testid="text-timestamp"
          >
            {data?.timestamp ?? "—"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
