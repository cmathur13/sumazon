import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { StyledCartBadge, StyledProfileBadge } from "./header.constants";
import { Autocomplete, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { IStore } from "../../utils/model/store.model";
import { useAppDispatch } from "../../store/useDispatch";
import { asyncGetCartSize } from "../../store/cart/cartSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { asyncGetAllTags } from "../../store/products/productsSlice";

const Header = (props: { isAdmin: boolean }) => {
  const navigate = useNavigate();
  const cartSize = useSelector((store: IStore) => store.cartSlice.cartQuantity);
  const { id: userId } = useSelector(
    (store: IStore) => store.authSlice.userDetails
  );
  const categoryTags = useSelector((store: IStore) => store.productsSlice.tags);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const dispath = useAppDispatch();

  useEffect(() => {
    dispath(asyncGetCartSize(userId));
    dispath(asyncGetAllTags());
  }, [dispath, userId]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (value: string) => {
    navigate("/products", { state: { searchValue: value } });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={styles.HeaderContainer}>
      <h2
        className={styles.LOGO}
        onClick={() =>
          navigate(props.isAdmin ? "/admin-dashboard" : "/products")
        }
      >
        Sumazon
      </h2>
      {!props.isAdmin ? (
        <div className={styles.searchBox}>
          <Autocomplete
            freeSolo
            id="search-autocomplete"
            disableClearable
            onChange={(_, newValue) => handleSearch(newValue)}
            options={
              categoryTags?.length ? categoryTags.map((option) => option) : []
            }
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input
                  type="text"
                  {...params.inputProps}
                  className={styles.searchBar}
                  placeholder="Search"
                />
                <SearchIcon className={styles.searchIcon} />
              </div>
            )}
          />
        </div>
      ) : null}
      <div
        className={styles.rightSide}
        style={{ width: props.isAdmin ? "2%" : "6%" }}
      >
        {!props.isAdmin ? (
          <IconButton aria-label="cart" onClick={() => navigate("/cart")}>
            <StyledCartBadge badgeContent={cartSize} color="secondary">
              <ShoppingCartIcon />
            </StyledCartBadge>
          </IconButton>
        ) : null}
        <StyledProfileBadge
          aria-describedby={id}
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          onClick={handleClick}
        >
          <AccountCircleIcon className={styles.profileBadge} />
        </StyledProfileBadge>
        <Menu
          id={id}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ top: "0.5em" }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              navigate("/myaccount");
              handleClose();
            }}
          >
            My account
          </MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
