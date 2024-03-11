import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IUser } from "../../../../utils/model/user.model";

export default function FormDialog(props: {
  handleClose: () => void;
  addUser: (user: IUser, role: string) => void;
}) {
  const [role, setRole] = React.useState("USER");
  return (
    <Dialog
      open={true}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          let formJson: any = Object.fromEntries((formData as any).entries());
          props.addUser({ ...formJson, addresses: [formJson.addresses] }, role);
          props.handleClose();
        },
      }}
    >
      <DialogTitle sx={{ marginBottom: "0.5em" }}>Add User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          sx={{ marginTop: "1em" }}
          required
          margin="dense"
          id="username"
          name="username"
          label="User Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          sx={{ marginTop: "1em" }}
          required
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          sx={{ marginTop: "1em" }}
          required
          margin="dense"
          id="addresses"
          name="addresses"
          label="Full Address"
          type="text"
          fullWidth
          multiline
          maxRows={3}
          variant="standard"
        />
        <FormControl variant="standard" fullWidth sx={{ m: 0, mt: "2em" }}>
          <InputLabel id="demo-simple-select-standard-label">
            Select Role
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value={"USER"}>USER</MenuItem>
            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ marginTop: "1em" }}
          required
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions sx={{ marginTop: "0.5em" }}>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
}
