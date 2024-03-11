import {
  Card,
  CardMedia,
  Box,
  CardContent,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { IProduct } from "../../../utils/model/product.model";
import styles from "./recap.module.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";

const OrderRecap = (props: {
  product: IProduct;
  quantity: number;
  setQuantity: (qty: number) => void;
}) => {
  const [userD, setUserD] = useState<any>(null);
  const [qty, setQty] = useState(props.quantity);
  const date = new Date().setDate(new Date().getDate() + 7);
  const handleRemoveItem = () => {
    props.setQuantity(qty - 1);
    setQty(qty - 1);
  };
  useEffect(() => {
    const user1: any = localStorage.getItem("user");
    const user2 = JSON.parse(user1);
    setUserD(user2);
  }, []);
  const handleAddItem = () => {
    props.setQuantity(qty + 1);
    setQty(qty + 1);
  };
  return (
    <div className={styles.recapCont}>
      {!props?.product && "Nothing to show"}
      <div className={styles.shipping}>
        <span style={{ opacity: 0.8 }}>Shipping To:</span>
        <span>
          {userD?.name}, {userD?.addresses[0]}
        </span>
      </div>
      <div className={styles.parent}>
        <div className={styles.lastDetails}>
          <Card key={props.product?.productId} className={styles.card}>
            <CardMedia
              component="img"
              sx={{ width: 150, height: 150 }}
              image={`data:${props.product?.productImages[0]?.type};base64,${props.product?.productImages[0]?.picByte}`}
              alt="Live from space album cover"
            />
            <Box className={styles.description}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography
                  component="div"
                  variant="h6"
                  style={{ fontSize: "1em" }}
                >
                  {props.product?.productName}
                </Typography>
                <div className={styles.disCountPrice}>
                  <span className={styles.perc}>
                    {"-" +
                      Math.floor(
                        ((props.product?.price -
                          props.product?.discountedPrice) /
                          props.product?.price) *
                          100
                      ) +
                      "%"}
                  </span>
                  <div className={styles.priceCont}>
                    <span className={styles.dollarSign}>$</span>
                    <span className={styles.disPrice}>
                      {props.product?.discountedPrice}
                    </span>
                  </div>
                </div>
                <div className={styles.actualPrice}>
                  <span>MRP: </span>
                  <span className={styles.price}>${props.product?.price}</span>
                </div>
              </CardContent>
              <div className={styles.action}>
                <Paper elevation={2} className={styles.quantity}>
                  <RemoveIcon
                    className={styles.addRemoveIcon}
                    onClick={() => handleRemoveItem()}
                    style={{
                      opacity: qty > 1 ? 1 : 0.5,
                      pointerEvents: qty > 1 ? "all" : "none",
                    }}
                  />
                  {qty}
                  <AddIcon
                    className={styles.addRemoveIcon}
                    style={{
                      opacity: qty !== props.product?.quantity ? 1 : 0.5,
                      pointerEvents:
                        qty !== props.product?.quantity ? "all" : "none",
                    }}
                    onClick={() => handleAddItem()}
                  />
                </Paper>
              </div>
            </Box>
          </Card>
        </div>
        <table className={styles.recap}>
          <h4>Order Breakout</h4>
          <tbody>
            <tr className={styles.row}>
              <td className={styles.td1}>items: </td>
              <td className={styles.td2}>
                ${props.product?.discountedPrice * props.quantity}
              </td>
            </tr>
            <tr className={styles.row}>
              <td className={styles.td1}>Delivery: </td>
              <td className={styles.td2}>$10</td>
            </tr>
            <tr className={styles.row}>
              <td className={styles.td1}>Total: </td>
              <td className={styles.td2}>
                ${props.product?.discountedPrice * props.quantity + 10}
              </td>
            </tr>
            <tr className={styles.row}>
              <td className={styles.td1}>Discount: </td>
              <td className={styles.td2}>-$10</td>
            </tr>
            <tr className={styles.row}>
              <td className={styles.td1} style={{ fontWeight: "600" }}>
                Order Total:{" "}
              </td>
              <td className={styles.td2} style={{ color: "rgb(167, 0, 0)" }}>
                ${props.product?.discountedPrice * props.quantity}
              </td>
            </tr>
          </tbody>
          <Divider />
          <div className={styles.date}>
            <h3 style={{ marginBottom: "0.5em", opacity: 0.7 }}>Get it By</h3>
            <h3>{new Date(date).toUTCString().split("2024")[0]}</h3>
          </div>
        </table>
      </div>
    </div>
  );
};

export default OrderRecap;
