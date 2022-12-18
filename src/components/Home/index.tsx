// mui
import { Stack } from "@mui/material";
import { SProps } from "../../mui/interfaces";
import { TG } from "../../mui/Utils";
import SongDetailDisplay from "./SongDetailDisplay";
// components
import SongInput from "./SongInput";

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
      <SongDetailDisplay />
    </Stack>
  );
};

export default Home;
