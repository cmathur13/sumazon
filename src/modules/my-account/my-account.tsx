import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import styles from "./my-account.module.scss";
import { useSelector } from "react-redux";
import { IStore } from "../../utils/model/store.model";
import { useAppDispatch } from "../../store/useDispatch";
import { asyncUpdateUser, setAlert } from "../../store/auth/authSlice";
import { useEffect, useState } from "react";
import { resetPassword } from "../../utils/services/api.service";

const MyAccount = () => {
  const { userDetails } = useSelector((store: IStore) => store.authSlice);
  const [username, setUsername] = useState(userDetails.username);
  const [name, setName] = useState(userDetails.name);
  const [email, setEmail] = useState(userDetails.email);
  const [addresses, setAddresses] = useState(userDetails.addresses);
  const [isReset, setIsReset] = useState(false);
  const [isError, setIsError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const dispatch = useAppDispatch();

  const showAlert = (text: string) => {
    dispatch(
      setAlert({
        isTrue: true,
        text: text,
        type: "success",
      })
    );
    setTimeout(() => {
      dispatch(
        setAlert({
          isTrue: false,
          text: "",
          type: "success",
        })
      );
    }, 4000);
  };

  const updateUser = () => {
    dispatch(
      asyncUpdateUser({
        body: {
          name: name,
          username: username,
          email: email,
          addresses: addresses,
        },
        id: userDetails.id,
      })
    ).then(() => {
      showAlert("User details updated successfuly");
    });
  };

  useEffect(() => {
    if (isError !== "") {
      setIsError("");
    }
  }, [oldPassword, newPassword, reenterPassword, isError]);

  const handleClose = () => {
    setIsReset(false);
    setIsError("");
    setReenterPassword("");
    setNewPassword("");
    setOldPassword("");
  };
  return (
    <div className={styles.myAccountContainer}>
      <h3 className={styles.title}>My Account</h3>
      <div className={styles.detailsBox}>
        <TextField
          className={styles.textFields}
          id="outlined-basic"
          label="Name"
          value={name}
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className={styles.textFields}
          id="outlined-basic"
          label="Username"
          value={username}
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className={styles.textFields}
          id="outlined-basic"
          label="Email Id"
          value={email}
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={styles.textFields}
          id="outlined-basic"
          label="Address"
          value={addresses[0]}
          variant="outlined"
          onChange={(e) => {
            let adr = [...addresses];
            adr[0] = e.target.value;
            setAddresses(adr);
          }}
        />
        <div className={styles.action}>
          <button className={styles.updateBtn} onClick={updateUser}>
            Update
          </button>
          <button className={styles.resetBtn} onClick={() => setIsReset(true)}>
            Reset Password
          </button>
        </div>
        <Dialog
          open={isReset}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              if (newPassword !== reenterPassword) {
                setIsError("Passwords are not matching");
              } else {
                resetPassword(userDetails?.id, oldPassword, newPassword).then(
                  (res: string) => {
                    if (res === "Success") {
                      showAlert("Password reset successful");
                      handleClose();
                    } else {
                      setIsError("Wrong Old Password");
                    }
                  }
                );
              }
            },
          }}
        >
          <DialogTitle sx={{ marginBottom: "0.5em" }}>
            Update Password
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              label="Old Password"
              type="password"
              fullWidth
              variant="standard"
            />
            <TextField
              sx={{ marginTop: "1em" }}
              required
              margin="dense"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              label="New Password"
              type="password"
              fullWidth
              variant="standard"
            />
            <TextField
              sx={{ marginTop: "1em" }}
              required
              error={
                newPassword !== "" &&
                reenterPassword !== "" &&
                newPassword !== reenterPassword
              }
              helperText={
                newPassword !== "" &&
                reenterPassword !== "" &&
                newPassword !== reenterPassword &&
                "password doesn't matching with new password "
              }
              margin="dense"
              value={reenterPassword}
              onChange={(e) => setReenterPassword(e.target.value)}
              label="Re-Enter New Password"
              type="password"
              fullWidth
              variant="standard"
            />
            <h3 className={styles.error}>{isError}</h3>
          </DialogContent>
          <DialogActions sx={{ marginTop: "0.5em" }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Update Passowrd</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default MyAccount;
