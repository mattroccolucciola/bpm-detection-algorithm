// mui
import Stack from "@mui/material/Stack";
import { SProps } from "./mui/interfaces";
// components
import Body from "./components/Body";
import Nav from "./components/Nav";
import Squigglies from "./doodle/Squigglies";

/** Top-level application component: renders the entire app
 */
const App: React.FC<SProps> = () => {
  return (
    <Stack flexDirection="column" sx={{ backgroundColor: "rgb(18, 19, 23)" }}>
      <Squigglies zIndex={0} />
      <Nav zIndex={1} />
      <Body zIndex={1} />
    </Stack>
  );
};

export default App;
