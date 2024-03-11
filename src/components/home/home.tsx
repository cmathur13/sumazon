import React, { useEffect, useState } from "react";
import styles from "./home.module.scss";
import AppRoutes from "./routes/app-routes";
import Header from "../header/header";
import Footer from "../footer/footer";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { IStore } from "../../utils/model/store.model";

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    alert: { isTrue, text, type },
  } = useSelector((store: IStore) => store.authSlice);
  useEffect(() => {
    const isAdminRole = localStorage.getItem("isAdmin");
    const isAdm = isAdminRole === "true";
    setIsAdmin(isAdm);
  }, []);
  return (
    <div className={styles.HomeContainer}>
      <Header isAdmin={isAdmin} />
      {isTrue && (
        <Alert className={styles.alert} severity={type} variant="filled">
          {text}
        </Alert>
      )}
      <AppRoutes isAdmin={isAdmin} />
      <Footer />
    </div>
  );
};

export default Home;
