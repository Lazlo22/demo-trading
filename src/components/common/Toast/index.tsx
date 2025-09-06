import { type FC } from "react";
import { ToastContainer } from "react-toastify";

import { TOAST_DELAY } from "@constants/toast";
import { useTheme } from "@contexts/ThemeContext";

import 'react-toastify/dist/ReactToastify.css';

const Toast: FC = () => {
  const { theme } = useTheme();

  return (
    <ToastContainer
      position="top-center"
      autoClose={TOAST_DELAY}
      closeOnClick
      draggable
      theme={theme}
      data-testid="toast-container"
    />
  )
};

Toast.displayName = "Toast";

export default Toast;
