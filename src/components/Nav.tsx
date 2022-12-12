// mui
import Stack from "@mui/material/Stack";
import { TG } from "../mui/Utils";
import { SProps } from "../mui/interfaces";

/** Navigation bar top-level display component
 */
const Nav: React.FC<SProps> = () => {
  return (
    <Stack
      flexDirection="row"
      flex="0 1"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="nowrap"
      sx={{ height: "50px", backgroundColor: "grey" }}
    >
      <TG color="aliceblue" textAlign="center" wrap="nowrap">
        BDA
      </TG>
    </Stack>
  );
};

export default Nav;
