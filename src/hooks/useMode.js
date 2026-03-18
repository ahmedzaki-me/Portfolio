import { ModeContext } from "../context/ModeContext";
import { useContext } from "react";
export default function useMode() {
  return useContext(ModeContext);
}
