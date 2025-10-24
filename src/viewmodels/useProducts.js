import { useEffect, useState } from "react";
import { menuProducts } from "../data/products";

export function useProducts() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // si luego hay API, reemplazás esto por fetch(...)
    setList(menuProducts);
    setLoading(false);
  }, []);

  return { list, loading };
}
