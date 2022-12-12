// react
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// mui
import { ThemeProvider } from "@mui/material";
import { baseTheme } from "./mui/baseTheme";
// state
// import AppContext, { RootStore } from "./mobx/context";
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
    {/* <AppContext.Provider value={new RootStore()}> */}
    <ThemeProvider theme={baseTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
    {/* </AppContext.Provider> */}
    {/* </React.StrictMode> */}
  </>
);
