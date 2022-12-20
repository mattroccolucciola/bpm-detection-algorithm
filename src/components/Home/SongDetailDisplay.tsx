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

/** # Contains song info returned from the call by `<SongInput />`
 *
 * @todo:
 * 1. Display a default `<Paper />` element with text to indicate no content
 * 1. Display an error occured while fetching - toast noti
 * 1. Show a list of previous queries (prob on the right side, vertical)
 * 1. Add embed element
 */
const SongDetailDisplay: React.FC<SProps> = () => {
  // state
  const title: string = useHomeContext((s) => s.songMetrics.title);
  const setIsAnimate = useAppContext((s) => s.setIsAnimate);
  const setAnimateState: AppStore["setAnimateState"] = useAppContext(
    (s) => s.setAnimateState
  );
  // effects
  useLayoutEffect(() => {
    // setIsAnimate(!!title);
    title && setAnimateState("success, pending");
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
