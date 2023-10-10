import Api from "../header/common";
import { CollectionName } from "@/enums/collections-enum";

const END_POINT = CollectionName.PRODUCT;

class Product {
  getList(params: any): Promise<any> {
    return Api.get(`${END_POINT}`, { params: params });
  }
  getListSearch(params: any): Promise<any> {
    return Api.get(`${END_POINT}/search`, { params: params });
  }
}

export default new Product();
