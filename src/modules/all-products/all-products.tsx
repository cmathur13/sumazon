import { useSelector } from "react-redux";
import ProductCard from "../../components/common/card/card";
import styles from "./all-products.module.scss";
import { IStore } from "../../utils/model/store.model";
import { useAppDispatch } from "../../store/useDispatch";
import {
  asyncGetAllFilteredProducts,
  asyncGetAllProducts,
} from "../../store/products/productsSlice";
import { useEffect } from "react";
import { IProduct } from "../../utils/model/product.model";
import { useLocation } from "react-router-dom";

const AllProductsPage = () => {
  const { products } = useSelector((state: IStore) => state.productsSlice);
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    console.log(location.state);
    if (location.state?.searchValue) {
      dispatch(asyncGetAllFilteredProducts(location.state?.searchValue));
    } else {
      dispatch(asyncGetAllProducts());
    }
  }, [dispatch, location.state]);
  return (
    <>
      {location.state?.searchValue && (
        <h2
          style={{
            color: "#575757",
            padding: "0em 2em",
            marginTop: "1em",
            marginBottom: "0",
          }}
        >
          <span style={{ opacity: 0.7 }}>Search Results:</span> "
          {location.state?.searchValue}"
        </h2>
      )}
      <div className={styles.AllProducts}>
        {products?.map((product: IProduct) => (
          <ProductCard key={product.productId} data={product} />
        ))}
        {!products?.length && (
          <h1 className={styles.noProd}>No Products found</h1>
        )}
      </div>
    </>
  );
};

export default AllProductsPage;
