import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProductImages,
  createProduct,
  deleteProductById,
  getAllFilteredProducts,
  getAllProducts,
  getProductById,
  getTagList,
  updateProduct,
} from "../../utils/services/api.service";
import { IProduct } from "../../utils/model/product.model";

const initialState: {
  products: Array<IProduct>;
  productDetails: IProduct;
  tags: Array<string>;
} = {
  products: [],
  productDetails: {
    price: 0,
    productId: 0,
    productImages: [],
    productName: "",
    quantity: 0,
    description: "",
    discountedPrice: 0,
    brand: "",
    rating: 0,
    categoryTags: [],
    userIds: [],
  },
  tags: [],
};

export const asyncCreateProduct = createAsyncThunk(
  "productsSlice/asyncCreateProduct",
  async (payload: { productData: IProduct }) => {
    const res: IProduct = await createProduct(payload.productData);
    return res.productId;
  }
);

export const asyncUpdateProduct = createAsyncThunk(
  "productsSlice/asyncUpdateProduct",
  async (payload: { productData: IProduct }) => {
    const res: IProduct = await updateProduct(payload.productData);
    return res.productId;
  }
);

export const asyncAddProductImages = createAsyncThunk(
  "productsSlice/asyncAddProductImages",
  async (payload: { productFormData: FormData; id: number }) => {
    const res: IProduct = await addProductImages(
      payload.productFormData,
      payload.id
    );
    return res;
  }
);

export const asyncGetAllProducts = createAsyncThunk(
  "productsSlice/asyncGetAllProducts",
  async () => {
    const res: IProduct[] = await getAllProducts();
    return res;
  }
);

export const asyncGetAllFilteredProducts = createAsyncThunk(
  "productsSlice/asyncGetAllFilteredProducts",
  async (value: string) => {
    const res: IProduct[] = await getAllFilteredProducts(value);
    return res;
  }
);

export const asyncGetAllTags = createAsyncThunk(
  "productsSlice/asyncGetAllTags",
  async () => {
    const res: Array<string> = await getTagList();
    return res;
  }
);

export const asyncGetProductById = createAsyncThunk(
  "productsSlice/asyncGetProductById",
  async (id: number) => {
    const res: IProduct = await getProductById(id);
    return res;
  }
);

export const asyncDeleteProductById = createAsyncThunk(
  "auth/asyncDeleteProductById",
  async (id: number) => {
    const res: string = await deleteProductById(id);
    return res;
  }
);

const productsSlice = createSlice({
  name: "productsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncAddProductImages.fulfilled,
      (state, action: { payload: IProduct }) => {
        state.products = [...state.products, action.payload];
      }
    );
    builder.addCase(
      asyncGetAllProducts.fulfilled,
      (state, action: { payload: IProduct[] }) => {
        state.products = action.payload;
      }
    );
    builder.addCase(
      asyncGetAllFilteredProducts.fulfilled,
      (state, action: { payload: IProduct[] }) => {
        state.products = action.payload;
      }
    );
    builder.addCase(
      asyncGetProductById.fulfilled,
      (state, action: { payload: IProduct }) => {
        state.productDetails = action.payload;
      }
    );
    builder.addCase(asyncGetAllTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
  },
});

export default productsSlice.reducer;
