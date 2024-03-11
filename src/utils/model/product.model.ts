export interface IProduct {
  productId: number;
  productName: string;
  description: string;
  rating: number;
  quantity: number;
  price: number;
  discountedPrice: number;
  brand: string;
  productImages: any[];
  categoryTags: string[];
  userIds: number[];
}

export interface IProductImage {
  imageId: number;
  name: string;
  type: string;
  picByte: any;
}
