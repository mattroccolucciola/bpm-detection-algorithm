// mui
import Stack from "@mui/material/Stack";
import { TG } from "../mui/Utils";
import { SProps } from "../mui/interfaces";
import XyPlaneAnimated3d from "../doodle/XyPlaneAnimated3d";

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
      sx={{ height: "50px", minHeight: "50px", maxHeight: "50px" }}
    >
      <XyPlaneAnimated3d zIndex={0} />
      <TG zIndex={1} color="aliceblue" wrap="nowrap" p={2} fontSize="2em">
        BDA
      </TG>
    </Stack>
  );
};

export default Nav;
