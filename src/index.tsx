// react
import ReactDOM from "react-dom/client";
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
    <App />
    {/* </AppContext.Provider> */}
    {/* </React.StrictMode> */}
  </>
);
