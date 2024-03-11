import { useEffect, useState } from "react";
import CustomTable from "./table/table";
import { useAppDispatch } from "../../../store/useDispatch";
import styles from "./manage-user.module.scss";
import {
  asyncCreateUser,
  asyncDeleteUserById,
  asyncGetAllUsers,
} from "../../../store/auth/authSlice";
import { useSelector } from "react-redux";
import { IStore } from "../../../utils/model/store.model";
import FormDialog from "./addUser/addUser";
import { IUser } from "../../../utils/model/user.model";

const ManageUsers = () => {
  const [newUser, setNewUser] = useState(false);
  const { users } = useSelector((store: IStore) => store.authSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(asyncGetAllUsers());
  }, [dispatch]);

  const addUser = async (user: IUser, role: string) => {
    await dispatch(asyncCreateUser({ user: user, role: role }));
    await dispatch(asyncGetAllUsers());
  };

  const deleteUser = async (id: number) => {
    await dispatch(asyncDeleteUserById(id));
    await dispatch(asyncGetAllUsers());
  };
  return (
    <div className={styles.ManageUsersContainer}>
      <div className={styles.topLayer}>
        <button className={styles.addUser} onClick={() => setNewUser(true)}>
          Add New +
        </button>
      </div>
      {users?.length && <CustomTable rows={users} deleteRow={deleteUser} />}
      {newUser && (
        <FormDialog handleClose={() => setNewUser(false)} addUser={addUser} />
      )}
    </div>
  );
};

export default ManageUsers;
