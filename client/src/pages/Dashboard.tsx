// src/pages/Dashboard.tsx
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Flame,
  ThermometerSun,
  Gauge,
  Factory,
  Activity,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const BULLETIN_ENDPOINT =
  "https://essitam.app.n8n.cloud/webhook/public/bulletin.json";

type Bulletin = {
  drumTemp: number;
  pressure: number;
  coalStock: number;
  burnRate_tph: number;
  mode: string;
  timestamp: string;
  correlation_id: string;
};

function formatDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getFreshnessLabel(timestamp?: string) {
  if (!timestamp) return { label: "Inconnu", color: "bg-slate-500" };
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const diffMin = diffMs / 1000 / 60;

  if (diffMin < 1) return { label: "Temps réel", color: "bg-emerald-500" };
  if (diffMin < 5) return { label: "Récent", color: "bg-yellow-500" };
  return { label: "Données anciennes", color: "bg-red-500" };
}

function getModeStatus(mode: string) {
  const normalized = mode.toLowerCase();
  if (normalized.includes("normal") || normalized.includes("auto")) {
    return {
      label: "Fonctionnement nominal",
      color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
      Icon: CheckCircle2,
      desc: "Le four semble fonctionner dans sa plage normale.",
    };
  }
  if (normalized.includes("maintenance") || normalized.includes("idle")) {
    return {
      label: "Maintenance / Veille",
      color: "bg-sky-500/15 text-sky-300 border-sky-500/40",
      Icon: Activity,
      desc: "Le four est en mode réduit ou en maintenance.",
    };
  }
  return {
    label: "Surveillance requise",
    color: "bg-amber-500/15 text-amber-300 border-amber-500/40",
    Icon: AlertTriangle,
    desc: "Le mode nécessite une attention particulière de l’opérateur.",
  };
}

export default function Dashboard() {
  const {
    data: bulletin,
    isLoading,
    error,
  } = useQuery<Bulletin>({
    queryKey: ["bulletin"],
    queryFn: async () => {
      const res = await fetch(BULLETIN_ENDPOINT);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return res.json();
    },
    refetchInterval: 30_000, // rafraîchit toutes les 30s
  });

  const freshness = getFreshnessLabel(bulletin?.timestamp);
  const modeStatus = bulletin ? getModeStatus(bulletin.mode) : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-2">
              <Flame className="h-7 w-7 text-amber-400" />
              HearthOps – Furnace Monitoring
            </h1>
            <p className="text-slate-400 mt-1">
              Télémétrie du four, carburant et bulletin live depuis n8n.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            {bulletin && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 uppercase">
                    Fraîcheur des données
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium bg-slate-900 border border-slate-700">
                    <span
                      className={`h-2 w-2 rounded-full ${freshness.color}`}
                    />
                    {freshness.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Dernière mise à jour :{" "}
                  <span className="text-slate-200 font-medium">
                    {formatDate(bulletin.timestamp)}
                  </span>
                </p>
              </>
            )}
          </div>
        </header>

        {/* État du chargement / erreurs */}
        {isLoading && (
          <Alert className="bg-slate-900 border-slate-700">
            <Loader2 className="h-4 w-4 animate-spin mr-2 inline-block" />
            <AlertTitle>Chargement du bulletin…</AlertTitle>
            <AlertDescription>
              Récupération des données depuis n8n.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>
              Impossible de récupérer le bulletin. Vérifie le workflow
              <strong> bulletin_public</strong> dans n8n.
              <br />
              <span className="text-xs opacity-80">
                {error instanceof Error ? error.message : String(error)}
              </span>
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && !bulletin && (
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle>Aucune donnée disponible</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-400">
              Le webhook n’a renvoyé aucun bulletin. Vérifie que le workflow n8n
              est bien activé et qu’il produit un JSON conforme.
            </CardContent>
          </Card>
        )}

        {/* Dashboard principal */}
        {bulletin && (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Colonne de gauche : métriques principales */}
            <div className="lg:col-span-2 space-y-6">
              {/* Card principale : Bulletin du four */}
              <Card className="bg-slate-900 border-slate-800 shadow-lg shadow-emerald-500/5">
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <div>
                    <CardTitle>Bulletin du four</CardTitle>
                    <p className="text-xs text-slate-400 mt-1">
                      Vue synthétique des paramètres critiques du four rotatif.
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs"
                  >
                    ID: {bulletin.correlation_id.slice(0, 8)}…
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-4">
                    <Metric
                      icon={ThermometerSun}
                      label="Température tambour"
                      value={`${bulletin.drumTemp.toFixed(1)} °C`}
                      hint="Surveille les dérives rapides."
                    />
                    <Metric
                      icon={Gauge}
                      label="Pression"
                      value={`${bulletin.pressure.toFixed(1)} kPa`}
                      hint="Pression dans le circuit."
                    />
                    <Metric
                      icon={Factory}
                      label="Stock de charbon"
                      value={`${bulletin.coalStock.toFixed(1)} t`}
                      hint="Quantité disponible en silo."
                    />
                    <Metric
                      icon={Activity}
                      label="Taux de combustion"
                      value={`${bulletin.burnRate_tph.toFixed(1)} t/h`}
                      hint="Burn rate instantané."
                    />
                  </div>

                  {/* Jauges progressives (visuel) */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <GaugeBar
                      label="Charge thermique"
                      value={bulletin.drumTemp}
                      min={0}
                      max={1200}
                      unit="°C"
                    />
                    <GaugeBar
                      label="Pression relative"
                      value={bulletin.pressure}
                      min={0}
                      max={10}
                      unit="kPa"
                    />
                    <GaugeBar
                      label="Niveau de charbon"
                      value={bulletin.coalStock}
                      min={0}
                      max={200}
                      unit="t"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Card secondaire : activité / timeline simple */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle>Journal de session</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    <div>
                      <p className="font-medium">Bulletin reçu</p>
                      <p className="text-slate-400">
                        Correlation ID :{" "}
                        <span className="font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded border border-slate-700">
                          {bulletin.correlation_id}
                        </span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {formatDate(bulletin.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                    <div>
                      <p className="font-medium">Mode de fonctionnement</p>
                      <p className="text-slate-400">
                        Le four est actuellement en mode{" "}
                        <span className="font-semibold">{bulletin.mode}</span>.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Colonne de droite : état / sécurité */}
            <div className="space-y-6">
              {/* Card état général */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle>État général</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {modeStatus && (
                    <div
                      className={`rounded-xl border px-4 py-3 flex items-start gap-3 ${modeStatus.color}`}
                    >
                      <modeStatus.Icon className="h-5 w-5 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold">
                          {modeStatus.label}
                        </p>
                        <p className="text-xs mt-1 opacity-90">
                          {modeStatus.desc}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 text-sm text-slate-300">
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">
                        Température actuelle
                      </span>
                      <span className="font-medium">
                        {bulletin.drumTemp.toFixed(1)} °C
                      </span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">Pression</span>
                      <span className="font-medium">
                        {bulletin.pressure.toFixed(1)} kPa
                      </span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">Burn rate</span>
                      <span className="font-medium">
                        {bulletin.burnRate_tph.toFixed(1)} t/h
                      </span>
                    </p>
                  </div>

                  <div className="border-t border-slate-800 pt-3 mt-2">
                    <p className="text-xs text-slate-500">
                      Les seuils de sécurité et d’alerte peuvent être codés ici
                      côté front (couleurs, badges, etc.) ou contrôlés par n8n
                      dans le JSON.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Card debug JSON */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle>Payload JSON brut (debug)</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-slate-950 p-4 rounded-md border border-slate-800 overflow-x-auto max-h-[320px]">
                    {JSON.stringify(bulletin, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type MetricProps = {
  label: string;
  value: string | number;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  hint?: string;
};

function Metric({ label, value, icon: Icon, hint }: MetricProps) {
  return (
    <div className="flex flex-col bg-slate-950/60 rounded-lg px-4 py-3 border border-slate-800 gap-1">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs uppercase tracking-wide text-slate-400">
          {label}
        </span>
        {Icon && <Icon className="h-4 w-4 text-slate-500" />}
      </div>
      <span className="text-lg font-semibold text-slate-50 mt-1">{value}</span>
      {hint && (
        <span className="text-[11px] text-slate-500 mt-0.5">{hint}</span>
      )}
    </div>
  );
}

type GaugeBarProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
};

function GaugeBar({ label, value, min, max, unit }: GaugeBarProps) {
  const clamped = Math.min(Math.max(value, min), max);
  const ratio = ((clamped - min) / (max - min)) * 100;

  let barClass = "bg-emerald-500";
  if (ratio > 80) barClass = "bg-red-500";
  else if (ratio > 60) barClass = "bg-amber-500";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span className="text-slate-300">
          {value.toFixed(1)} {unit}
        </span>
      </div>
      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className={`h-full ${barClass} transition-all duration-500`}
          style={{ width: `${ratio}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-slate-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
