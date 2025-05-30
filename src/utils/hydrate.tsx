import { useEffect, useState } from "react";

export function useHydration() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHydrated(true);
    }, 400)
  }, []);
  return hydrated;
}