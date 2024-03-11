import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addOneToCart,
  addToCart,
  getCartByUserId,
  getCartSize,
  removeFromCart,
} from "../../utils/services/api.service";
import ICart from "../../utils/model/cart.model";
import { IProduct } from "../../utils/model/product.model";

const initialState: {
  cartQuantity: number;
  cart: ICart;
} = {
  cartQuantity: 0,
  cart: { cartId: 0, cartProducts: [], totalCartPrice: 0 },
};

export const asyncGetCartSize = createAsyncThunk(
  "cart/asyncGetCartSize",
  async (id: number) => {
    const res = await getCartSize(id);
    return res;
  }
);

export const asyncAddToCart = createAsyncThunk(
  "cart/asyncAddToCart",
  async (data: { userId: number; productId: number; quantity: number }) => {
    const res = await addToCart(data);
    return res;
  }
);

export const asyncAddOneToCart = createAsyncThunk(
  "cart/asyncAddOneToCart",
  async (data: { userId: number; productId: number }) => {
    const res = await addOneToCart(data);
    return res;
  }
);

export const asyncremoveFromCart = createAsyncThunk(
  "cart/asyncremoveFromCart",
  async (data: { userId: number; productId: number; isDelete: boolean }) => {
    const res = await removeFromCart(data);
    return res;
  }
);

export const asyncGetCartByUserId = createAsyncThunk(
  "cart/asyncGetCartByUserId",
  async (userId: number) => {
    const res: {
      cartId: number;
      totalCartPrice: number;
      cartProducts: IProduct[];
    } = await getCartByUserId(userId);
    return res;
  }
);

function createCartObject(cart: {
  cartId: number;
  totalCartPrice: number;
  cartProducts: IProduct[];
}) {
  const map: {
    [productId: number]: { product: IProduct; quantity: number };
  } = {};
  cart?.cartProducts?.forEach((product: IProduct) => {
    if (!map[product.productId]) {
      map[product.productId] = {
        product: product,
        quantity: 0,
      };
    }
    map[product.productId].quantity++;
  });
  return {
    cartId: cart?.cartId,
    totalCartPrice: cart?.totalCartPrice,
    cartProducts: Object.entries(map).map((item) => {
      item[1].product.productImages.sort((a, b) => a?.imageId - b?.imageId);
      return { product: item[1].product, quantity: item[1].quantity };
    }),
  };
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetCartSize.fulfilled, (state, action) => {
      state.cartQuantity = action.payload;
    });
    builder.addCase(asyncGetCartByUserId.fulfilled, (state, action) => {
      state.cart = createCartObject(action.payload);
    });
    builder.addCase(asyncAddOneToCart.fulfilled, (state, action) => {
      state.cart = createCartObject(action.payload);
    });
    builder.addCase(asyncremoveFromCart.fulfilled, (state, action) => {
      state.cart = createCartObject(action.payload);
    });
  },
});

export default cartSlice.reducer;
