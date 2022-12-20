import "css-doodle";
// mui
import { Stack } from "@mui/material";
import { SProps } from "../mui/interfaces";
import { SxProps, Theme } from "@mui/material/styles";

const Doodle: React.FC<
  SProps & {
    children: string | never[];
    doodleSx?: SxProps<Theme>;
    doodleRef?: React.RefObject<HTMLDivElement>;
  }
> = ({ children: cssRule = "", doodleSx, doodleRef, ...p }) => {
  console.assert(
    (cssRule && typeof cssRule === typeof "") || !cssRule,
    "Must use string"
  );

  return (
    <Stack
      zIndex={0}
      position="absolute"
      width="100%"
      maxWidth="100%"
      minWidth="100%"
      height="inherit"
      maxHeight="inherit"
      minHeight="inherit"
      ref={doodleRef}
      sx={{
        "& > css-doodle": {
          width: "100%",
          maxWidth: "100%",
          minWidth: "100%",
          height: "inherit",
          maxHeight: "inherit",
          minHeight: "inherit",
        },
        ...doodleSx,
      }}
      {...p}
    >
      <css-doodle>{cssRule}</css-doodle>
    </Stack>
  );
};

export default Doodle;
