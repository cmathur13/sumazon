import { Fragment, useEffect, useState } from "react";
import Home from "../home/home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../../modules/login-page/login-page";
import { useSelector } from "react-redux";
import { IStore } from "../../utils/model/store.model";
import { useAppDispatch } from "../../store/useDispatch";
import { setIsLoggedInUser, setUserDetails } from "../../store/auth/authSlice";
import { Backdrop, CircularProgress } from "@mui/material";

const AuthorizeApp = () => {
  return (
    <Backdrop
      sx={{
        display: "flex",
        flexDirection: "column",
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <CircularProgress color="inherit" />
      <h2>Please Wait...</h2>
    </Backdrop>
  );
};

const Authorize = () => {
  const { isLoggedInUser } = useSelector((state: IStore) => state.authSlice);
  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const token = localStorage.getItem("token");
    setTimeout(() => {
      if (token) {
        const userDetails = localStorage.getItem("user");
        dispath(setUserDetails(JSON.parse(userDetails ? userDetails : "")));
        dispath(setIsLoggedInUser(true));
      } else {
        window.location.pathname !== "/login" && navigate("login");
      }
    }, 1000);
  };
  useEffect(() => {
    validate();
  }, []);
  return (
    <Fragment>
      {isLoggedInUser ? (
        <Home />
      ) : (
        <Routes>
          <Route path="" element={<AuthorizeApp />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<AuthorizeApp />} />
        </Routes>
      )}
    </Fragment>
  );
};

export default Authorize;
