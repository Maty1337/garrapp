import { fetchProducts } from '../sources/api';

export const ProductsRepository = {
  async list() {
    const data = await fetchProducts();
    return data; // acá podrías mapear a entidad Product si querés
  }
};
