import * as React from "react";
import styles from "./card.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../utils/model/product.model";

export default function ProductCard(props: { data: IProduct }) {
  const [cardImage, setCardImage] = React.useState<any>(null);
  const navigate = useNavigate();
  const [showEllipsis, setShowEllipsis] = React.useState(false);
  const containerRef: any = React.useRef(null);
  const discountedPercent =
    ((props.data.price - props.data.discountedPrice) / props.data.price) * 100;

  React.useEffect(() => {
    // Calculate line height dynamically
    const lineHeight = window.getComputedStyle(containerRef.current).lineHeight;
    const lineHeightNum = parseFloat(lineHeight);

    // Set max height based on 3 lines
    const maxHeight = lineHeightNum * 3;
    containerRef.current.style.maxHeight = `${maxHeight}px`;
    // Check if content exceeds maxHeight
    if (containerRef.current.scrollHeight > maxHeight) {
      setShowEllipsis(true);
    }
  }, []);

  React.useEffect(() => {
    const image = props?.data?.productImages[0];
    const imageSrc = `data:${image?.type};base64,${image?.picByte}`;
    setCardImage(imageSrc);
  }, [props.data]);
  return (
    <Card sx={{ width: "17%", minWidth: 250 }}>
      <CardActionArea
        onClick={() => navigate(`/products/${props?.data?.productId}`)}
      >
        <CardMedia
          component="img"
          height="280"
          style={{
            objectFit: "cover",
            background: "#cecece",
          }}
          image={cardImage}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              textWrap: "nowrap",
            }}
          >
            {props.data.productName}
          </Typography>
          <div className={styles.disCountPrice}>
            <span className={styles.perc}>
              {Math.floor(discountedPercent) + "% off"}
            </span>
            <div className={styles.priceCont}>
              <span className={styles.dollarSign}>$</span>
              <span className={styles.disPrice}>
                {props?.data?.discountedPrice}
              </span>
            </div>
          </div>
          <Typography
            variant="body2"
            color="text.secondary"
            ref={containerRef}
            style={{
              height: "4em",
              overflow: "hidden",
              textOverflow: showEllipsis ? "ellipsis" : "clip",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
