import { useEffect, useState } from "react";
import { fetchMenu } from "../data/sources/api";
import { localCatalog } from "../data/localCatalog";
import { makeKey } from "../shared/makeKey";

// Mapeo de tipo → categoría visible en el front
const TIPO_TO_CATEGORY = {
  COMBO: "Combos",
  BEBIDA: "Bebidas",
  EXTRA: "Extras",
};

// Convierte valores de precio a número seguro
function toNumber(val) {
  if (val == null) return 0;
  if (typeof val === "number" && !Number.isNaN(val)) return val;
  if (typeof val === "string") {
    const cleaned = val.replace(/\./g, "").replace(",", ".");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

// Normaliza y combina datos de la API con el catálogo local
function normalize(p) {
  const tipo = (p.tipo || "").toString().trim().toUpperCase();
  const key = makeKey(p.nombre);
  const extra = localCatalog[key] || {};

  return {
    id: p.id,
    name: p.nombre ?? "",
    description: extra.description ?? p.descripcion ?? "",
    price: toNumber(p.precio),
    image: extra.image || p.imagen || "/images/placeholder.jpg",
    category: TIPO_TO_CATEGORY[tipo] ?? "Otros",
  };
}

// Hook principal
export function useProducts() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchMenu();
        const normalized = Array.isArray(data) ? data.map(normalize) : [];
        setList(normalized);
      } catch (e) {
        setErr(e);
        console.error("Error cargando /api/menu:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { list, loading, err };
}
