import { IProduct } from "../model/product.model";
import { IUser } from "../model/user.model";
import axios from "./axios";

export const doLogin = (username: string, password: string) => {
  return axios<any>({
    method: "POST",
    url: "/auth/login",
    data: {
      username: username,
      password: password,
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getUserByUserName = (username: string) => {
  return axios<any>({
    method: "GET",
    url: "/api/users/username",
    params: {
      username: username,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const createUser = (user: IUser, role: string) => {
  return axios<any>({
    method: "POST",
    url: "/api/users",
    data: user,
    params: {
      roleName: role,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getAllUsers = () => {
  return axios<any>({
    method: "GET",
    url: "/api/users",
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getUserById = (id: number) => {
  return axios<any>({
    method: "GET",
    url: "/api/users/" + id,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const deleteUserById = (id: number) => {
  return axios<any>({
    method: "DELETE",
    url: "/api/users/" + id,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const updateUserById = (body: any, id: number) => {
  return axios<any>({
    method: "PUT",
    url: "/api/users/update/" + id,
    data: body,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const resetPassword = (
  id: number,
  oldPassword: string,
  newPassword: string
) => {
  return axios<any>({
    method: "PUT",
    url: "/api/users/resetPassword/" + id,
    params: {
      oldPassword: oldPassword,
      newPassword: newPassword,
    },
    data: {},
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const createProduct = (data: IProduct) => {
  return axios<any>({
    method: "POST",
    url: "/api/products",
    data: data,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const updateProduct = (data: IProduct) => {
  return axios<any>({
    method: "PUT",
    url: "/api/products/" + data.productId,
    data: data,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const addProductImages = (data: any, id: number) => {
  return axios<any>({
    method: "POST",
    url: "/api/products/addImages/" + id,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getAllProducts = () => {
  return axios<any>({
    method: "GET",
    url: "/api/products",
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getAllFilteredProducts = (value: string) => {
  return axios<any>({
    method: "GET",
    url: "/api/products/search/" + value,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getProductById = (id: number) => {
  return axios<any>({
    method: "GET",
    url: "/api/products/" + id,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const deleteProductById = (id: number) => {
  return axios<any>({
    method: "DELETE",
    url: "/api/products/" + id,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const addToCart = (data: {
  userId: number;
  productId: number;
  quantity: number;
}) => {
  return axios<any>({
    method: "GET",
    url: "/api/cart/add",
    params: {
      user_id: data.userId,
      product_id: data.productId,
      quantity: data.quantity,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const addOneToCart = (data: { userId: number; productId: number }) => {
  return axios<any>({
    method: "GET",
    url: "/api/cart/addOne",
    params: {
      user_id: data.userId,
      product_id: data.productId,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const removeFromCart = (data: {
  userId: number;
  productId: number;
  isDelete: boolean;
}) => {
  return axios<any>({
    method: "DELETE",
    url: "/api/cart/remove",
    params: {
      user_id: data.userId,
      product_id: data.productId,
      isDelete: data.isDelete,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getCartByUserId = (userId: number) => {
  return axios<any>({
    method: "GET",
    url: "/api/cart/" + userId,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const checkoutCart = (cartId: number) => {
  return axios<any>({
    method: "GET",
    url: "/api/cart/checkout/" + cartId,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const buyNow = (productId: number, quantity: number) => {
  return axios<any>({
    method: "GET",
    url: "/api/cart/buyNow",
    params: {
      product_id: productId,
      quantity: quantity,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getCartSize = (id: number) => {
  return axios<any>({
    method: "GET",
    url: "/api/cart/getSize/" + id,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getTagList = () => {
  return axios<any>({
    method: "GET",
    url: "/api/products/getTags",
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
