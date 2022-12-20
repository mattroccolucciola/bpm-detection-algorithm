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
const categoriesArr: CategoryMapping[] = [
  { key: "duration", title: "Duration" },
  { key: "genre", title: "Genre" },
  { key: "release_date", title: "Release Date" },
  { key: "playback_count", title: "Plays" },
  { key: "likes_count", title: "Likes" },
  { key: "reposts_count", title: "Reposts" },
  { key: "comment_count", title: "Comments" },
];

const calcDaysAgo = (dateStr: string): string => {
  const date: Date = new Date(dateStr);
  const today: Date = new Date();
  // millisecond difference
  const deltaMs = today.getTime() - date.getTime();
  const deltaMin = deltaMs / 1000 / 60;
  const deltaDays = deltaMin / (60 * 24);
  return `${Math.round(deltaDays).toString()} days ago`;
};
/** # Input field for song URL */
const SongInfoItem: React.FC<{
  category: CategoryMapping;
}> = ({ category }) => {
  let categoryData: string | number = useHomeContext(
    (s) => s.songMetrics[category.key]
  );
  if (category.key === "duration") {
    const date = new Date("0");
    date.setMilliseconds(categoryData as number);
    let categoryStr: string = new Date(categoryData as number)
      .toISOString()
      .substring(11, 19);
    categoryStr =
      categoryStr[0] === "0" ? categoryStr.substring(1) : categoryStr;
    categoryData =
      categoryStr[0] === "0" ? categoryStr.substring(2) : categoryStr;
  } else if (
    [
      "playback_count",
      "likes_count",
      "reposts_count",
      "comment_count",
    ].includes(category.key)
  ) {
    categoryData = (categoryData as number).toLocaleString("en-US");
  }

  return (
    <Stack
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-end"
      py={1}
      px={3}
    >
      {category.key === "release_date" ? (
        <Stack flexDirection="column" alignItems="center">
          <TG fontSize={2}>{calcDaysAgo(categoryData as string)}</TG>
          <TG>{new Date(categoryData).toDateString()}</TG>
        </Stack>
      ) : (
        <TG>{categoryData}</TG>
      )}
      <Divider
        flexItem
        orientation="horizontal"
        sx={{ paddingTop: "5px", marginBottom: "5px" }}
      />
      <TG fontSize="0.6em">{category.title}</TG>
    </Stack>
  );
};

const SongInfo: React.FC<SProps> = () => {
  // create the list of elements
  const categoryElems: React.ReactElement<{ categoryInfo: InfoGroup }>[] = [];
  categoriesArr.forEach((category: CategoryMapping, idx: number) => {
    categoryElems.push(<SongInfoItem category={category} key={idx} />);
    if (idx < categoriesArr.length - 1) {
      categoryElems.push(
        <Divider
          orientation="vertical"
          key={`div-${idx}`}
          flexItem
          variant="middle"
        />
      );
    }
  });

  return (
    <Stack direction="row" p={1} justifyContent="center">
      {categoryElems}
    </Stack>
  );
};

export default SongInfo;
