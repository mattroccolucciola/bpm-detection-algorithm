// state
import { HomeContext, HomeStore } from "./mobx";
// mui
import { Stack } from "@mui/material";
import { SProps } from "../../mui/interfaces";
import { TG } from "../../mui/Utils";
// components
import SongDetailDisplay from "./SongDetailDisplay";
import SongInput from "./SongInput";

/** Home: View component for home page
 */
const Home: React.FC<SProps> = () => {
  return (
    <HomeContext.Provider value={new HomeStore()}>
      <Stack flexDirection="column" position="relative" color="whitesmoke" flex="1" justifyContent="center">
        <TG fontSize="50px" position="relative" p="20px" width={"100%"} textAlign="center">
          Input a valid SoundCloud track URL
        </TG>
        <TG fontSize="20px" position="relative" p="20px" color="white" sx={{fontWeight: 100}} textAlign="center">
          i.e. "https://soundcloud.com/acct/song-name"
        </TG>
        <SongInput />
        <SongDetailDisplay />
      </Stack>
    </HomeContext.Provider>
  );
};

export default Home;
