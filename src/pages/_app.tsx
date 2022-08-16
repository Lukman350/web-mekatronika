import "@/styles/input.css";
import type { AppProps } from "next/app";
import { store } from "@/app/store";
import { Provider } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Slide } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </Provider>
  );
}

export default MyApp;
