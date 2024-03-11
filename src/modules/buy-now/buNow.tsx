import styles from "./buNow.module.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress, Paper } from "@mui/material";
import CreditCardForm from "./payment/payment";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IStore } from "../../utils/model/store.model";
import { useAppDispatch } from "../../store/useDispatch";
import { asyncGetCartSize } from "../../store/cart/cartSlice";
import OrderRecap from "./recap/recap";
import { asyncGetProductById } from "../../store/products/productsSlice";
import { buyNow } from "../../utils/services/api.service";

const steps = [
  // "Select Address",
  "Order Recap",
  "Payment",
];

export default function BuyNow() {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [isPlaced, setIsPlaced] = React.useState(false);
  const { productDetails } = useSelector(
    (store: IStore) => store.productsSlice
  );
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [qq, setQQ] = React.useState(location.state?.quantity);
  React.useEffect(() => {
    dispatch(asyncGetProductById(location.state?.productId));
  }, [dispatch]);

  const isStepOptional = (step: number) => {
    return step === -1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const paySuccessFul = () => {
    setIsPlaced(true);
    buyNow(productDetails.productId, qq).then((res) => {
      const user: any = localStorage.getItem("user");
      dispatch(asyncGetCartSize(JSON.parse(user)?.id));
      setTimeout(() => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
        setIsPlaced(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }, 2000);
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box className={styles.CheckoutContainer}>
      <Paper className={styles.checkout} elevation={3}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <div className={styles.placed}>
            <Typography className={styles.orderplaced}>
              <TaskAltIcon className={styles.icon} />
              <span>Order Placed</span>
            </Typography>
            <button className={styles.shopmore} onClick={() => navigate("/")}>
              Shop More
            </button>
          </div>
        ) : (
          <React.Fragment>
            <div className={styles.main}>
              {activeStep === steps.length - 1 ? (
                !isPlaced ? (
                  <CreditCardForm paySuccessFul={paySuccessFul} />
                ) : (
                  <CircularProgress color="success" />
                )
              ) : activeStep === steps.length - 2 ? (
                <OrderRecap
                  product={productDetails}
                  quantity={location.state?.quantity}
                  setQuantity={(qty: number) => setQQ(qty)}
                />
              ) : (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Step {activeStep + 1}
                </Typography>
              )}
            </div>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={handleNext}
                disabled={productDetails?.discountedPrice === 0}
              >
                {activeStep === steps.length - 1
                  ? ""
                  : activeStep === steps.length - 2
                  ? "Place Your Order and Pay"
                  : "Proceed"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Box>
  );
}
