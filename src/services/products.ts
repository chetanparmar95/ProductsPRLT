import request from ".";
import { API_PRODUCTS } from "../utils/constants";

function getProducts() {
  return request({
    url: API_PRODUCTS,
    method: 'GET',
  });
}


const ProductServices = {
  getProducts
};

export default ProductServices;