// mui
import { Divider, Stack } from "@mui/material";
import { TG } from "../../mui/Utils";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

// interfaces
import { SProps } from "../../mui/interfaces";
interface InfoGroup {
  title: string;
  data: string;
}
// constants
const categoryMap = new Map<string, InfoGroup>(
  Object.entries({
    bpm: { title: "BPM", data: "" },
    length: { title: "Length", data: "" },
    origGenre: { title: "Original Genre", data: "" },
    newGenre: { title: "New Genre", data: "" },
    releaseDt: { title: "Release Date", data: "" },
  })
);

/** # Input field for song URL */
const InfoItem: React.FC<{ categoryInfo: InfoGroup }> = ({ categoryInfo }) => {
  return (
    <Stack direction="column">
      <TG>{categoryInfo.title}</TG>
      <Divider orientation="horizontal" />
      <TG>{categoryInfo.data}</TG>
    </Stack>
  );
};

const SongInfo: React.FC<SProps> = () => {
  // create the list of elements
  const categoryElems: React.ReactElement<{ categoryInfo: InfoGroup }>[] = [];
  categoryMap.forEach((category, idx) => {
    categoryElems.push(<InfoItem categoryInfo={category} key={idx} />);
  });

  return (
    <Stack direction="row">
      <img id="img" src="" alt="" />
      <Stack direction="row">{categoryElems}</Stack>
    </Stack>
  );
};

/** # Contains song info returned from the call by `<SongInput />`
 */
const SongDetailDisplay: React.FC<SProps> = () => {
  const songTitle = "";

  return (
    <Stack direction="column">
      <TG>{songTitle}</TG>
      <SongInfo />
      <Grid className="embed"></Grid>
    </Stack>
  );
};

export default SongDetailDisplay;
