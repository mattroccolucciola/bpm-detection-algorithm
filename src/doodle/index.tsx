import "css-doodle";
// mui
import { Stack } from "@mui/material";
import { SProps } from "../mui/interfaces";

const Doodle: React.FC<SProps & { children: string | never[] }> = ({
  children: rule = "",
  ...p
}) => {
  console.assert(
    (rule && typeof rule === typeof "") || !rule,
    "Must use string"
  );

  return (
    <Stack
      zIndex={0}
      sx={{
        position: "absolute",
        width: "100%",
        maxWidth: "100%",
        minWidth: "100%",
        height: "inherit",
        maxHeight: "inherit",
        minHeight: "inherit",
        zIndex: 0,
        "& > css-doodle": {
          width: "100%",
          maxWidth: "100%",
          minWidth: "100%",
          height: "inherit",
          maxHeight: "inherit",
          minHeight: "inherit",
        },
      }}
      {...p}
    >
      <css-doodle>{rule}</css-doodle>
    </Stack>
  );
};

export default Doodle;
