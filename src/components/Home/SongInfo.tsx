// style
import { Divider, Stack } from "@mui/material";
import { SProps } from "../../mui/interfaces";
import { TG } from "../../mui/Utils";
import { useHomeContext } from "./mobx";
// interfaces
interface InfoGroup {
  title: string;
  data: string;
}
interface CategoryMapping {
  key: string;
  title: string;
}
// constants
const categories = new Map<string, CategoryMapping>([
  ["artwork_url", { key: "artwork_url", title: "" }],
  ["duration", { key: "duration", title: "Duration" }],
  ["genre", { key: "genre", title: "Genre" }],
  ["release_date", { key: "release_date", title: "Release Date" }],
  ["playback_count", { key: "playback_count", title: "Plays" }],
  ["likes_count", { key: "likes_count", title: "Likes" }],
  ["reposts_count", { key: "reposts_count", title: "Reposts" }],
  ["comment_count", { key: "comment_count", title: "Comments" }],
]);

/** # Input field for song URL */
const SongInfoItem: React.FC<{
  category: CategoryMapping;
}> = ({ category }) => {
  const categoryData = useHomeContext((s) => s.songMetrics[category.key]);

  return (
    <Stack direction="column">
      <TG>{category.title}</TG>
      <Divider orientation="horizontal" />
      <TG>{categoryData}</TG>
    </Stack>
  );
};

const SongInfo: React.FC<SProps> = () => {
  const artworkUrl:string = useHomeContext(s=>s.songMetrics.artwork_url);
  // create the list of elements
  const categoryElems: React.ReactElement<{ categoryInfo: InfoGroup }>[] = [];
  categories.forEach((category: CategoryMapping, idx: string) => {
    categoryElems.push(<SongInfoItem category={category} key={idx} />);
  });

  return (
    <Stack direction="row">
      <img src={artworkUrl} alt="" />
      <Stack direction="row">{categoryElems}</Stack>
    </Stack>
  );
};

export default SongInfo;
