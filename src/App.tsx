// mui
import Stack from "@mui/material/Stack";
import { SProps } from "./mui/interfaces";
// components
import Body from "./components/Body";
import Nav from "./components/Nav";

/** Top-level application component: renders the entire app
 */
const App: React.FC<SProps> = () => {
  return (
    <Stack flexDirection="column" color={"black"}>
      <Nav />
      <Body />
    </Stack>
  );
};

export default App;
