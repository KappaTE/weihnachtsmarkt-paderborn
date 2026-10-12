import { useEffect, useState } from 'react';

// Aktuelle Uhrzeit, minütlich aufgefrischt — alle Anzeigen sind auf Minuten genau.
export default function useJetzt() {
  const [jetzt, setJetzt] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setJetzt(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  return jetzt;
}
