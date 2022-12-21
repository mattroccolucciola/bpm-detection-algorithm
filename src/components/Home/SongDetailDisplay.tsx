// state
import { observer } from "mobx-react-lite";
import { useHomeContext } from "./mobx";
// mui
import { Stack, Box } from "@mui/material";
import { SProps } from "../../mui/interfaces";
// components
import SongInfo from "./SongInfo";
import Embed from "./Embed";
import { useLayoutEffect } from "react";
import { AppStore, useAppContext } from "../../mobxApp";
import { SongMetrics } from "../../scraping/SongMetadata";
import { fetchMp3, fetchMp3Url } from "../../scraping/fetchMp3";

/** # Contains song info returned from the call by `<SongInput />`
 *
 * @todo:
 * 1. Display a default `<Paper />` element with text to indicate no content
 * 1. Display an error occured while fetching - toast noti
 * 1. Show a list of previous queries (prob on the right side, vertical)
 * 1. Add embed element
 *
 * ## Loading BPM
 * Once song data is fetched and loaded into `songMetrics` state, we need to:
 * 1. Get the MP3 **file**
 * 1. Run BPM algo on it
 *
 * That will be done here.
 */
const SongDetailDisplay: React.FC<SProps> = () => {
  // state
  const songMetrics: SongMetrics = useHomeContext((s) => s.songMetrics);
  const title: string = useHomeContext((s) => s.songMetrics.title);
  const setAnimateState: AppStore["setAnimateState"] = useAppContext(
    (s) => s.setAnimateState
  );
  // effects
  useLayoutEffect(() => {
    title && setAnimateState("success, pending");

    if (title) {
      console.log("metrisc", songMetrics);
      fetchMp3(songMetrics);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return title ? (
    <Stack direction="column" component={Box} p={1}>
      <Embed />
      <SongInfo />
    </Stack>
  ) : (
    <div />
  );
};

export default observer(SongDetailDisplay);
