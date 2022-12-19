// state
import { observer } from "mobx-react-lite";
import { useHomeContext } from "./mobx";
// mui
import { Stack, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { TG } from "../../mui/Utils";
import { SProps } from "../../mui/interfaces";
// components
import SongInfo from "./SongInfo";

/** # Contains song info returned from the call by `<SongInput />`
 * 
 * @todo:
 * 1. Display a default `<Paper />` element with text to indicate no content
 * 1. Display an error occured while fetching - toast noti
 * 1. Show a list of previous queries (prob on the right side, vertical)
 * 1. Add embed element
 */
const SongDetailDisplay: React.FC<SProps> = () => {
  const title: string = useHomeContext((s) => s.songMetrics.title);

  return (
    <Stack direction="column" component={Paper}>
      <TG>{title}</TG>
      <SongInfo />
      <Grid className="embed"></Grid>
    </Stack>
  );
};

export default observer(SongDetailDisplay);
