import styles from "./manage-products.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/useDispatch";
import {
  asyncAddProductImages,
  asyncCreateProduct,
  asyncDeleteProductById,
  asyncGetAllProducts,
  asyncGetProductById,
  asyncUpdateProduct,
} from "../../../store/products/productsSlice";
import { useSelector } from "react-redux";
import { IStore } from "../../../utils/model/store.model";
import CustomProductTable from "./table/table";
import ProductFormDialog from "./addProduct/addProduct";
import { IProduct } from "../../../utils/model/product.model";
import { setAlert } from "../../../store/auth/authSlice";

const ManageProducts = () => {
  const [newProduct, setNewProduct] = useState(false);
  const { products } = useSelector((store: IStore) => store.productsSlice);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncGetAllProducts());
  }, [dispatch]);

  const prepareFormdata = (images: File[]) => {
    const formData: FormData = new FormData();
    for (const element of images) {
      formData.append("imageFile", element, element.name);
    }
    return formData;
  };

  const addProduct = (product: IProduct, images: File[]) => {
    dispatch(asyncCreateProduct({ productData: product })).then((res: any) => {
      if (images.length) {
        const productFormData = prepareFormdata(images);
        dispatch(
          asyncAddProductImages({
            productFormData: productFormData,
            id: res.payload,
          })
        )
          .then(() => {
            dispatch(
              setAlert({
                isTrue: true,
                text: "Your product added successfuly..",
                type: "success",
              })
            );
          })
          .catch((error) => {
            console.log(error);
            dispatch(
              setAlert({
                isTrue: true,
                text: "Error in adding product, please try again..",
                type: "error",
              })
            );
          })
          .finally(() => {
            setTimeout(() => {
              dispatch(
                setAlert({
                  isTrue: false,
                  text: "",
                  type: "success",
                })
              );
            }, 4000);
          });
      }
    });
  };

  const updateProduct = (product: IProduct, images: File[]) => {
    dispatch(asyncUpdateProduct({ productData: product }))
      .then((res: any) => {
        if (images.length) {
          const productFormData = prepareFormdata(images);
          dispatch(
            asyncAddProductImages({
              productFormData: productFormData,
              id: res.payload,
            })
          ).then(() => {
            dispatch(asyncGetAllProducts());
          });
        }
      })
      .then(() => {
        dispatch(
          setAlert({
            isTrue: true,
            text: "Product updated successfuly..",
            type: "success",
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          setAlert({
            isTrue: true,
            text: "Error in updating product, please try again..",
            type: "error",
          })
        );
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(
            setAlert({
              isTrue: false,
              text: "",
              type: "success",
            })
          );
        }, 4000);
      });
  };

  const EditRow = (productId: number) => {
    dispatch(asyncGetProductById(productId));
    setIsEditing(true);
    setNewProduct(true);
  };

  const deleteUser = async (id: number) => {
    await dispatch(asyncDeleteProductById(id));
    await dispatch(asyncGetAllProducts());
  };

  return (
    <div className={styles.ManageProducts}>
      <div className={styles.topLayer}>
        <button
          className={styles.addProduct}
          onClick={() => setNewProduct(true)}
        >
          Add New +
        </button>
      </div>
      {products?.length > 0 && (
        <CustomProductTable
          rows={products}
          deleteRow={deleteUser}
          editRow={EditRow}
        />
      )}
      {newProduct && (
        <ProductFormDialog
          isEditing={isEditing}
          handleClose={() => {
            setNewProduct(false);
            setIsEditing(false);
          }}
          addProduct={addProduct}
          updateProduct={updateProduct}
        />
      )}
    </div>
  );
};

export default ManageProducts;
