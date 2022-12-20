// mui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { Grid2Props as GridProps } from "@mui/material";

/** Typography-Grid component
 *
 * Used for consistent spacing.
 */
export const TG: React.FC<GridProps & { component?: React.ElementType }> = ({
  ...p
}) => <Grid component={Typography} padding="6px" {...p} />;
