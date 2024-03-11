import ICart from "./cart.model";
import { IProduct } from "./product.model";
import { IUser } from "./user.model";

export interface IStore {
  authSlice: {
    isLoggedInUser: boolean;
    userDetails: IUser;
    users: IUser[];
    alert: {
      isTrue: boolean;
      text: string;
      type: "success" | "info" | "warning" | "error";
    };
  };
  productsSlice: {
    products: Array<IProduct>;
    productDetails: IProduct;
    tags: Array<string>;
  };
  cartSlice: {
    cartQuantity: number;
    cart: ICart;
  };
}
