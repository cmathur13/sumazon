import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/useDispatch";
import styles from "./product-details.module.scss";
import { asyncGetProductById } from "../../store/products/productsSlice";
import { useSelector } from "react-redux";
import { IStore } from "../../utils/model/store.model";
import ImageSlider from "./imageSlider/imageSlider";
import { Divider, Rating } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { asyncAddToCart, asyncGetCartSize } from "../../store/cart/cartSlice";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { productDetails } = useSelector(
    (store: IStore) => store.productsSlice
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const discountedPercent =
    ((productDetails.price - productDetails.discountedPrice) /
      productDetails.price) *
    100;
  const [isAlreadyAddedToCart, setIsAlreadyAddedToCart] = useState(false);

  useEffect(() => {
    const path: any = window.location.pathname.split("/");
    dispatch(asyncGetProductById(path[2]));
  }, [dispatch]);

  const handleQntChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(+event.target.value);
  };

  const handleAddToCart = async () => {
    if (!isAlreadyAddedToCart) {
      let user: any = await localStorage.getItem("user");
      dispatch(
        asyncAddToCart({
          userId: JSON.parse(user)?.id,
          productId: productDetails.productId,
          quantity: quantity,
        })
      ).then(() => {
        dispatch(asyncGetCartSize(JSON.parse(user)?.id));
        setIsAlreadyAddedToCart(true);
      });
    } else {
      navigate("/cart");
    }
  };

  useEffect(() => {
    const user: any = localStorage.getItem("user");
    const userId = JSON.parse(user)?.id;
    if (productDetails?.userIds?.includes(userId)) {
      setIsAlreadyAddedToCart(true);
    }
  }, [productDetails]);

  return (
    <div className={styles.ProductDetailsContainer}>
      <ArrowBackIcon
        className={styles.backBtn}
        onClick={() => navigate("/products")}
      />
      <div className={styles.imageContainer}>
        <ImageSlider
          images={productDetails.productImages.map(
            (image: any) => `data:${image?.type};base64,${image?.picByte}`
          )}
        />
      </div>
      <div className={styles.detailsContainer}>
        <h2 className={styles.name}>{productDetails.productName}</h2>
        <h4 className={styles.brand}>{productDetails.brand}</h4>
        <h3 className={styles.description}>{productDetails.description}</h3>
        <Rating name="read-only" value={productDetails.rating} readOnly />
        <Divider />
        <div className={styles.disCountPrice}>
          <span className={styles.perc}>
            {"-" + Math.floor(discountedPercent) + "%"}
          </span>
          <div className={styles.priceCont}>
            <span className={styles.dollarSign}>$</span>
            <span className={styles.disPrice}>
              {productDetails.discountedPrice}
            </span>
          </div>
        </div>
        <div className={styles.actualPrice}>
          <span>MRP: </span>
          <span className={styles.price}>${productDetails.price}</span>
        </div>
        {productDetails.quantity ? (
          <p className={styles.leftP}>{productDetails.quantity} piece left</p>
        ) : (
          <h4 className={styles.oos}>Out Of Stock</h4>
        )}

        <div
          className={styles.buttons}
          style={{
            pointerEvents: productDetails.quantity ? "all" : "none",
            opacity: productDetails.quantity ? 1 : 0.7,
          }}
        >
          <div>
            <label htmlFor="numberSelect">Quantity: </label>
            <select
              id="numberSelect"
              className={styles.qnt}
              value={quantity}
              onChange={handleQntChange}
            >
              {new Array(productDetails.quantity).fill(1).map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <button className={styles.addToCart} onClick={handleAddToCart}>
            {isAlreadyAddedToCart ? "Go To Cart" : "Add To Cart"}
          </button>

          <button
            className={styles.buyNow}
            onClick={() =>
              navigate("/buy-now", {
                state: {
                  quantity: quantity,
                  productId: productDetails.productId,
                },
              })
            }
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
