// react
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// mui
import { ThemeProvider } from "@mui/material";
import { baseTheme } from "./mui/baseTheme";
// components
import App from "./App";
// utils
import "./App.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    {/* <React.StrictMode> */}
    {/* <BrowserRouter> */}
    <ThemeProvider theme={baseTheme}>
      <App />
    </ThemeProvider>
    {/* </BrowserRouter> */}
    {/* </React.StrictMode> */}
  </>
);
