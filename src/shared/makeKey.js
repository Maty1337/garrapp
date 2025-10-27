export function makeKey(str = "") {
  return str
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // saca acentos
    .trim().toUpperCase()
    .replace(/\s+/g, "-"); // espacios → guiones
}
