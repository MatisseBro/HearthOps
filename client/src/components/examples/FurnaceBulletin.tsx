import FurnaceBulletin from '../FurnaceBulletin';

export default function FurnaceBulletinExample() {
  const mockData = {
    drumTemp: 875,
    pressure: 142,
    coalStock: 230,
    mode: "Auto",
    timestamp: new Date().toISOString()
  };

  return <FurnaceBulletin data={mockData} />;
}
