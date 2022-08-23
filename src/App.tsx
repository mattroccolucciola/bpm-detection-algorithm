// style
import { Grid } from "@mui/material";
// components
import Body from "./components/Body";
import Nav from "./components/Nav";

/**
 * Renders the entire application
 */
const App = () => {
  return (
    <Grid>
      <Nav />
      <Body />
    </Grid>
  );
};

export default App;
