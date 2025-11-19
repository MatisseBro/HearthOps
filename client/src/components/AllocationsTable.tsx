import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Allocation {
  id: string;
  sector: string;
  tonnage: number;
  timestamp: string;
}

interface AllocationsTableProps {
  allocations?: Allocation[];
}

export default function AllocationsTable({ allocations = [] }: AllocationsTableProps) {
  return (
    <Card className="border-card-border" data-testid="card-allocations">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Allocations par secteur</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Secteur
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tonnage
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Timestamp
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody id="allocations-body" data-testid="table-allocations-body">
              {allocations.length === 0 ? (
                <TableRow className="border-border hover:bg-muted/30">
                  <TableCell colSpan={3} className="text-center text-sm text-muted-foreground py-8">
                    No allocations available
                  </TableCell>
                </TableRow>
              ) : (
                allocations.map((allocation, index) => (
                  <TableRow 
                    key={allocation.id} 
                    className="border-border hover:bg-muted/30 transition-colors"
                    data-testid={`row-allocation-${index}`}
                  >
                    <TableCell className="font-medium" data-testid={`text-sector-${index}`}>
                      {allocation.sector}
                    </TableCell>
                    <TableCell className="font-mono" data-testid={`text-tonnage-${index}`}>
                      {allocation.tonnage.toLocaleString()} t
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground" data-testid={`text-timestamp-${index}`}>
                      {new Date(allocation.timestamp).toLocaleString('fr-FR', {
                        dateStyle: 'short',
                        timeStyle: 'short'
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
