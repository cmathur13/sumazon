import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import styles from "./login-page.module.scss";
import { useState } from "react";
import { useAppDispatch } from "./../../store/useDispatch";
import { asyncLoginThunk } from "../../store/auth/authSlice";

const Login = () => {
  const [password, setPassword] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [username, setUsername] = useState("");
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const loginUser = () => {
    if (username === "") setIsUsernameError(true);
    else if (password === "") setIsPasswordError(true);
    else {
      setError("");
      dispatch(
        asyncLoginThunk({ username: username, password: password })
      ).then((res) => {
        if (!res.payload) {
          setError("Invalid Credentials, check username or password");
          setPassword("");
          setUsername("");
        }
      });
    }
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div className={styles.LoginContainer}>
      <h2 className={styles.Title}>Sumazon</h2>
      <div className={styles.LoginBox}>
        <h3 className={styles.loginText}>Login</h3>
        <h4 className={styles.error}>{error}</h4>
        <div>
          <TextField
            error={isUsernameError && username === ""}
            label="Username"
            sx={{ width: "100%", m: "1em 0" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            helperText={
              isUsernameError && username === "" && "Field is Required"
            }
          />
          <FormControl sx={{ width: "100%", m: "1em 0" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              error={isPasswordError && password === ""}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
            />
          </FormControl>
          <Button
            onClick={loginUser}
            variant="contained"
            sx={{ backgroundColor: "#81b30ec3", m: "1em 0" }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
