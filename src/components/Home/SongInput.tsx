// react
import { useState } from "react";
// state
import { useHomeContext } from "./mobx";
// mui
import { Box, Button, TextField } from "@mui/material";
// utils
import { getSongInfo } from "../../scraping/main";
import { observer } from "mobx-react-lite";

export interface SongMetrics {
  [index: string]: string | number;
  genre: string;
  waveform_url: string;
  comment_count: number;
  likes_count: number;
  playback_count: number;
  reposts_count: number;
  title: string;
  artwork_url: string;
  permalink_url: string;
  permalink: string;
  id: number;
}

/** # Event handler - update text on changing
 * @returns
 */
const onChangeUpdateText =
  (setter: React.Dispatch<React.SetStateAction<string>>) =>
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setter(newValue);
  };

/** # Validate and send the url for retrieval
 *
 * 1. Validate
 * 1. Submit
 * 1. Reset form
 * 1. Update `songMetrics` state
 */
const urlSubmit = async (
  text: string,
  textSetter: React.Dispatch<React.SetStateAction<string>>,
  errorSetter: React.Dispatch<React.SetStateAction<string>>,
  songMetricsSetter: React.Dispatch<React.SetStateAction<SongMetrics>>
) => {
  let validatedInput = text;
  // validate
  if (!text.includes("soundcloud.com/")) {
    errorSetter("Error: URL not valid.  " + `(input: "${validatedInput}")`);
    return;
  }

  // submit
  const songData = await getSongInfo(text);
  songMetricsSetter(songData as SongMetrics);

  // reset form
  textSetter("");
  errorSetter("");
};

const example =
  "https://soundcloud.com/inspected/sam-gellaitry-waiting-so-long";

/** Displays information about input to the fetch call
 */
const SongInput: React.FC = () => {
  const setSongMetrics = useHomeContext((s) => s.setSongMetrics);
  const [textInput, setTextInput] = useState<string>(example);
  const [errorInput, setErrorInput] = useState<string>("");

  return (
    <Box position="relative" flexDirection="column">
      <TextField
        variant="filled"
        placeholder="https://soundcloud.com/<artist>/<track-name>"
        value={textInput}
        onChange={onChangeUpdateText(setTextInput)}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter")
            urlSubmit(textInput, setTextInput, setErrorInput, setSongMetrics);
        }}
        fullWidth
        error={errorInput !== ""}
        helperText={errorInput}
        label="Soundcloud Song URL"
      />
      <Button
        variant="contained"
        fullWidth
        disableRipple
        onClick={() =>
          urlSubmit(textInput, setTextInput, setErrorInput, setSongMetrics)
        }
      >
        Submit
      </Button>
    </Box>
  );
};

export default observer(SongInput);
