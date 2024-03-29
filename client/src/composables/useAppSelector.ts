import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
