// react
import { Outlet, Route, Routes } from "react-router-dom";
// mui
import { Stack, useTheme } from "@mui/material";
// components
import Home from "./Home";
import { SProps } from "../mui/interfaces";

/** The default layout for the page. To be applied to all routes.
 */
const PageLayout: React.FC = () => {
  // hooks
  const theme = useTheme();

  return (
    <Stack
      flexDirection="column"
      alignItems="center"
      justifyContent="end"
      sx={{
        flex: 1,
        overflow: "scroll",
        maxWidth: "100%",
        "& > div": {
          height: "100%",
          minHeight: "100%",
          width: "100%",
          maxWidth: { xs: "100%", lg: theme.breakpoints.values.lg },
        },
      }}
    >
      <Outlet />
    </Stack>
  );
};

/** Body: Display Component with React Router
 *
 * Displays the application's content and sits immediately below the navbar.\
 * Scrolling occurs internally. Set in PageLayout component
 */
const Body: React.FC<SProps> = () => {
  return (
    <Stack>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </Stack>
  );
};
export default Body;
