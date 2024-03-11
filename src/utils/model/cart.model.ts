import { IProduct } from "./product.model";

export default interface ICart {
  cartId: number;
  totalCartPrice: number;
  cartProducts: { product: IProduct; quantity: number }[];
}
