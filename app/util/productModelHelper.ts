import Product from "../interfaces-objects/Product";
import { store } from "../redux/store/store";

export const isPhysicalProduct = (product: Product) => product.type !== 'Audio book' && product.type !== 'E-book'

export const getFromProducts = (id: string) => store.getState().products.find(prod => prod._id === id)