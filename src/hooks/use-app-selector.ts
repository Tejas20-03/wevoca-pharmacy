import { StoreState } from "@/redux/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector