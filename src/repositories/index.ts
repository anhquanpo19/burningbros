import type DynamicObject from "@/model/dynamic-object";
import product from "./services/product";
type dyO = keyof DynamicObject;

const services: DynamicObject = {
  product: product,
};
export default {
  get: (name: dyO) => services[name],
};
