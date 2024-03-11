import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  deleteUserById,
  doLogin,
  getAllUsers,
  getUserByUserName,
  updateUserById,
} from "../../utils/services/api.service";
import { IUser } from "../../utils/model/user.model";

const initialState: {
  isLoggedInUser: boolean;
  userDetails: IUser;
  users: IUser[];
  alert: {
    isTrue: boolean;
    text: string;
    type: "success" | "info" | "warning" | "error";
  };
} = {
  isLoggedInUser: false,
  userDetails: {
    id: 0,
    username: "",
    name: "",
    email: "",
    addresses: [],
    authorities: [],
  },
  users: [],
  alert: {
    isTrue: false,
    text: "",
    type: "success",
  },
};

export const asyncCreateUser = createAsyncThunk(
  "auth/asyncCreateUser",
  async (data: { user: IUser; role: string }) => {
    const res = await createUser(data.user, data.role);
    return res;
  }
);

export const asyncLoginThunk = createAsyncThunk(
  "auth/asyncLoginThunk",
  async (data: { username: string; password: string }) => {
    const res = await doLogin(data.username, data.password);
    if (!res.token) {
      return null;
    }
    localStorage.setItem("token", res.token);
    const user = await getUserByUserName(data.username);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: user?.id,
        name: user?.name,
        username: user?.username,
        email: user?.email ? user?.email : "",
        addresses: user?.addresses,
      })
    );
    localStorage.setItem(
      "isAdmin",
      (user?.authorities[0]?.authority === "ADMIN").toString()
    );
    return user;
  }
);

export const asyncUpdateUser = createAsyncThunk(
  "auth/asyncUpdateUser",
  async (data: { body: any; id: number }) => {
    const user = await updateUserById(data.body, data.id);
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: user?.email || "",
        id: user?.id,
        name: user?.name,
        username: user?.username,
        addresses: user?.addresses,
      })
    );
    return user;
  }
);

export const asyncGetAllUsers = createAsyncThunk(
  "auth/asyncGetAllUsers",
  async () => {
    const users: IUser[] = await getAllUsers();
    return users;
  }
);

export const asyncDeleteUserById = createAsyncThunk(
  "auth/asyncDeleteUserById",
  async (id: number) => {
    const res: string = await deleteUserById(id);
    return res;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoggedInUser: (state, { payload }: { payload: boolean }) => ({
      ...state,
      isLoggedInUser: payload,
    }),
    setUserDetails: (state, { payload }: { payload: any }) => ({
      ...state,
      userDetails: payload,
    }),
    setAlert: (
      state,
      {
        payload,
      }: {
        payload: {
          isTrue: boolean;
          text: string;
          type: "success" | "info" | "warning" | "error";
        };
      }
    ) => {
      state.alert = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      asyncLoginThunk.fulfilled,
      (state, action: { payload: IUser }) => {
        if (action.payload) {
          state.isLoggedInUser = true;
          state.userDetails = {
            id: action.payload?.id,
            name: action.payload?.name,
            username: action.payload?.username,
            email: action.payload?.email,
            addresses: action.payload?.addresses,
            authorities: action.payload?.authorities,
          };
          window.location.pathname = "/";
        }
      }
    );
    builder.addCase(asyncUpdateUser.fulfilled, (state, action: any) => {
      state.userDetails = {
        id: action.payload?.id,
        name: action.payload?.name,
        username: action.payload?.username,
        email: action.payload?.email,
        addresses: action.payload?.addresses,
        authorities: action.payload?.authorities,
      };
    });
    builder.addCase(asyncGetAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { setIsLoggedInUser, setUserDetails, setAlert } =
  authSlice.actions;
export default authSlice.reducer;
