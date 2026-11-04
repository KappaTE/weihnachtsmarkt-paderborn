// Kleiner Leuchtpunkt in Kategoriefarbe — wie eine Birne in der Liste.
export default function Punkt({ farbe }) {
  return (
    <span
      className="w-2 h-2 shrink-0 rounded-full"
      style={{ backgroundColor: farbe, boxShadow: `0 0 8px ${farbe}` }}
    />
  );
}
