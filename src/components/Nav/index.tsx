import { Grid, Typography } from "@mui/material";
import { FC } from "react";

const Nav: FC = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="nowrap"
    >
      <Grid item>
        <Typography color="aliceblue" textAlign="center" noWrap>
          BDA
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Nav;
