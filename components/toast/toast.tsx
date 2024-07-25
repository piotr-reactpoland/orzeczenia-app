"use client";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastService = {
  success: (msg: string) => {
    if (typeof window !== "undefined") {
      toast.success(msg);
    }
  },
  error: (msg: string) => {
    if (typeof window !== "undefined") {
      toast.error(msg);
    }
  },
  info: (msg: string) => {
    if (typeof window !== "undefined") {
      toast.info(msg);
    }
  },
  warning: (msg: string) => {
    if (typeof window !== "undefined") {
      toast.warning(msg);
    }
  },
};

const Toast = () => {
  return <ToastContainer />;
};

export default Toast;
