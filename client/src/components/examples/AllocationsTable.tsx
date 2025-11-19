import AllocationsTable, { type Allocation } from '../AllocationsTable';

export default function AllocationsTableExample() {
  const mockAllocations: Allocation[] = [
    {
      id: "1",
      sector: "North Zone A",
      tonnage: 125,
      timestamp: new Date().toISOString()
    },
    {
      id: "2",
      sector: "South Zone B",
      tonnage: 98,
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: "3",
      sector: "East Zone C",
      tonnage: 156,
      timestamp: new Date(Date.now() - 7200000).toISOString()
    },
    {
      id: "4",
      sector: "West Zone D",
      tonnage: 87,
      timestamp: new Date(Date.now() - 10800000).toISOString()
    }
  ];

  return <AllocationsTable allocations={mockAllocations} />;
}
