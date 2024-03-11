import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";

export const useAppDispatch = () => {
  const dispatch = useDispatch<AppDispatch>(); // Dispatch with typed AppDispatch
  return dispatch;
};
