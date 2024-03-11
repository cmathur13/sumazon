import { useEffect } from "react";
import { useAppDispatch } from "../../store/useDispatch";
import styles from "./my-cart.module.scss";
import {
  asyncAddOneToCart,
  asyncGetCartByUserId,
  asyncGetCartSize,
  asyncremoveFromCart,
} from "../../store/cart/cartSlice";
import { useSelector } from "react-redux";
import { IStore } from "../../utils/model/store.model";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../utils/model/product.model";

const MyCart = () => {
  const { cart } = useSelector((store: IStore) => store.cartSlice);
  const user: any = localStorage.getItem("user");
  const userId: number = JSON.parse(user)?.id;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(asyncGetCartByUserId(userId));
  }, [dispatch]);

  const handleRemoveItem = (productId: number, isDelete: boolean) => {
    dispatch(
      asyncremoveFromCart({
        userId: userId,
        productId: productId,
        isDelete: isDelete,
      })
    ).then(() => {
      dispatch(asyncGetCartSize(userId));
    });
  };
  const handleAddItem = (productId: number) => {
    dispatch(asyncAddOneToCart({ userId: userId, productId: productId })).then(
      () => {
        dispatch(asyncGetCartSize(userId));
      }
    );
  };
  return (
    <div className={styles.MyCartContainer}>
      <Paper className={styles.cart} elevation={3}>
        <h2 className={styles.heading}>My Cart</h2>
        {cart?.cartProducts?.map(
          (item: { product: IProduct; quantity: number }) => (
            <Card key={item.product.productId} className={styles.card}>
              <CardMedia
                component="img"
                sx={{ width: 200, height: 200 }}
                image={`data:${item.product.productImages[0]?.type};base64,${item.product.productImages[0]?.picByte}`}
                alt="Live from space album cover"
              />
              <Box className={styles.description}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {item.product.productName}
                  </Typography>
                  <div className={styles.disCountPrice}>
                    <span className={styles.perc}>
                      {"-" +
                        Math.floor(
                          ((item.product.price - item.product.discountedPrice) /
                            item.product.price) *
                            100
                        ) +
                        "%"}
                    </span>
                    <div className={styles.priceCont}>
                      <span className={styles.dollarSign}>$</span>
                      <span className={styles.disPrice}>
                        {item.product.discountedPrice}
                      </span>
                    </div>
                  </div>
                  <div className={styles.actualPrice}>
                    <span>MRP: </span>
                    <span className={styles.price}>${item.product.price}</span>
                  </div>
                </CardContent>
                <div className={styles.action}>
                  <Paper elevation={2} className={styles.quantity}>
                    <RemoveIcon
                      className={styles.addRemoveIcon}
                      onClick={() =>
                        handleRemoveItem(item.product.productId, false)
                      }
                    />
                    {item.quantity}
                    <AddIcon
                      className={styles.addRemoveIcon}
                      onClick={() => handleAddItem(item.product.productId)}
                    />
                  </Paper>
                  <button
                    className={styles.delBtn}
                    onClick={() =>
                      handleRemoveItem(item.product.productId, true)
                    }
                  >
                    Delete
                  </button>
                </div>
              </Box>
            </Card>
          )
        )}
        {!cart?.cartProducts?.length ? (
          <div className={styles.placed}>
            <Typography className={styles.orderplaced}>
              <DeleteOutlineIcon className={styles.icon} />
              <span>Your cart is empty</span>
            </Typography>
            <button className={styles.shopmore} onClick={() => navigate("/")}>
              Shop
            </button>
          </div>
        ) : (
          <>
            <div className={styles.cartPrice}>
              Total Price: {cart.totalCartPrice}$
            </div>
            <button
              className={styles.proceedbtn}
              onClick={() => navigate("/checkout")}
            >
              Proceed To Buy ({cart.cartProducts.length} Item)
            </button>
          </>
        )}
      </Paper>
    </div>
  );
};

export default MyCart;
