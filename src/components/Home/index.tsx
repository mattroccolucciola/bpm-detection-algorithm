// mui
import { Divider, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { SProps } from "../../mui/interfaces";
import { TG } from "../../mui/Utils";
// components
import SongInput from './SongInput';

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

interface InfoGroup {
  title: string;
  data: string;
}

const categoryMap = new Map<string, InfoGroup>(
  Object.entries({
    bpm: { title: "BPM", data: "" },
    length: { title: "Length", data: "" },
    origGenre: { title: "Original Genre", data: "" },
    newGenre: { title: "New Genre", data: "" },
    releaseDt: { title: "Release Date", data: "" },
  })
);

const SongInfo: React.FC = () => {
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
const SongDetails: React.FC = () => {
  const songTitle = "";

  return (
    <Stack direction="column">
      <TG>{songTitle}</TG>
      <SongInfo />
      <Grid className="embed"></Grid>
    </Stack>
  );
};

/** Home: View component for home page
 */
const Home: React.FC<SProps> = () => {
  return (
    <Stack flexDirection="column" position="relative">
      <TG fontSize="50px" position="relative">
        Input a valid SoundCloud track URL/permalink
      </TG>
      <TG fontSize="20px" position="relative">
        i.e. "https://soundcloud.com/acct/song-name" or "acct/song-name"
      </TG>
      <SongInput />
      <SongDetails />
    </Stack>
  );
};

export default Home;
