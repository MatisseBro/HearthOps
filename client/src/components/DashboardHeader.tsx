interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export default function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 md:py-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-testid="text-dashboard-title">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base" data-testid="text-dashboard-subtitle">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
