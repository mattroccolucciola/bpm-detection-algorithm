import axios from "axios";

const getSongStats = (songData: ResolveJson) => {
  const songStats: { [key in string]: any } = {};
  const songDataMap = new Map<string, string>();
  ["reposts_count", "comment_count"].forEach((key) => {
    const value = songData[key as string];
    // @ts-ignore
    songDataMap.set(key, value);
    songStats[key] = value;
  });
  return songStats;
};
// build the call that makes the signed playlist resource string
const buildSignedPlaylistCall = (
  trackId: number,
  trackHls: string,
  trackAuth: string,
  clientId: string
): string => {
  // https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/b6705d26-a662-499e-8c4b-1e922b59475c/stream/hls
  const hlsBody = trackHls
    .split("/stream/hls")[0]
    .split("https://api-v2.soundcloud.com/media/soundcloud:tracks:")[1]
    .split("/")[1];

  // {1317984667}/{b6705d26-a662-499e-8c4b-1e922b59475c}/stream/hls?client_id={lnFbWHXluNwOkW7TxTYUXrrse0qj1C72}&track_authorization={eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI3NjY4Nn0.IqnQXjxT8qPyEM6L4A20JLCYDH0OwMu44yrRoJu5rWM}
  const url = `https://api-v2.soundcloud.com/media/soundcloud:tracks:${trackId}/${hlsBody}/stream/hls?client_id=${clientId}&track_authorization=${trackAuth}`;
  return url;
};
const fetchPlaylistUrl = async (
  trackId: number,
  trackHashId: string,
  trackHls: string,
  trackAuth: string,
  clientId: string
) => {
  const playlistCallUrl = buildSignedPlaylistCall(
    trackId,
    trackHls,
    trackAuth,
    clientId
  );
  // fetch
  if (playlistCallUrl) console.log("fetching:", playlistCallUrl);

  // response `https://cf-hls-media.sndcdn.com/playlist/${trackHashId}.128.mp3/playlist.m3u8?Policy=${policy}&Signature=EFdCzjwm1c2cEmERyXCAlKdufsv7L~YYbZGbQJt5O9Mp0zl~-rIg0-yUO95M-o09Y69rfFMwSnh7fBG6oyXI5PFCSncYXJBusgO2FrBjOW6b36wf-~hHPT~pc5L7LWkXvLEy4eszR7zWIfV3ygTwjdzORvwOBWi-9-FVPyatgceBF9cr9mUYQ2cPTJdvMYT9lNg9bHyc-F9FDG23A8fcQ7HQlDKcNo0tZJZFDo4nq9cGHfCi6shHBuLvuP3rFH9hxvj3uFUypY0e3FGIUEqYukICi2mBm5mgSqapZnseuvvlRTK-LmZaf06FGB~LIufMA6UIQ~poOQshvDdMinfFGA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ&track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI3NjY4Nn0.IqnQXjxT8qPyEM6L4A20JLCYDH0OwMu44yrRoJu5rWM`;
  const res = await fetch(playlistCallUrl);
  // const resBody = res.body;
  const resJson = await res.json();
  

  // const policy = "eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL3BsYXlsaXN0L3psb2JFQVFTWFZmdS4xMjgubXAzL3BsYXlsaXN0Lm0zdTgqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxMjgzMDczfX19XX0_"

  // should get this 'https://cf-hls-media.snd...'
  // return playlistCallObj.url;
};
/** Track url is validated prior to calling this.
 *
 * URL is in the form: https://soundcloud.com/${userInput}
 */
export const getSongInfo = async (trackUrl: string, CLIENT_ID: string) => {
  // show that query is in progress
  // displayLoading_();

  // get the song info
  // songInfo = await getSongInfo();
  // get the text from the input field
  // prev mungUserInput()

  // const resolveUrl = `https://api-v2.soundcloud.com/resolve?url=${trackUrl}&client_id=${CLIENT_ID}`; //&client_id=${CLIENT_ID}
  const resolveUrl = `${trackUrl}`;
  // get the track id via the main url

  // previously: `https://api.soundcloud.com/resolve?url=${trackUrl}&client_id=${CLIENT_ID}`;
  // const resolveUrl = `https://api-v2.soundcloud.com/resolve?url=${trackUrl}`; //&client_id=${CLIENT_ID}
  // const resolveUrl = `https://api.soundcloud.com/resolve?url=${trackUrl}&client_id=${CLIENT_ID}`;
  // const resolveUrl = `https://api.soundcloud.com/resolve?url=${trackUrl}`; // &client_id=${CLIENT_ID}
  // TnPIzomBfuS0m5YKxvy0Aqy9ClIC8F9j
  // const resolveUrl = `https://api-v2.soundcloud.com/connect?client_id=${CLIENT_ID}&response_type=code`;
  // const resolveUrl = `https://api.soundcloud.com/connect?client_id=${CLIENT_ID}&redirect_uri=${trackUrl}&response_type=code`;
  // const resolveUrl = `https://api.soundcloud.com/connect?client_id=${CLIENT_ID}&response_type=code`;
  // const resolveUrl = `https://api.soundcloud.com/connect?client_id=${CLIENT_ID}`;
  // NEW TYPE
  // `https://secure.soundcloud.com/connect?response_type=code&client_id=TnPIzomBfuS0m5YKxvy0Aqy9ClIC8F9j`
  // https://api-auth.soundcloud.com/connect/access-request-validation?client_id=fXuVKzsVXlc6tzniWWS31etd7VHWFUuN
  // const resolveUrl = `https://api-auth.soundcloud.com/connect/access-request-validation?client_id=${CLIENT_ID}`;
  // const resolveUrl = `https://secure.soundcloud.com/connect?client_id=${CLIENT_ID}&response_type=code`;
  // const resolveUrl = `https://api.soundcloud.com/oauth2/token/client_credentials`
  console.log("respolve", resolveUrl);

  // const { data } = await axios.get(resolveUrl);
  // console.log('data', data)
  const infoRes = await fetch(resolveUrl, {
    // mode: "no-cors",
    method: "GET",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "application/json",
      accept: "*/*",
      // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Headers":
      //   "Content-Type, Access-Control-Allow-Headers, X-Requested-With",
      // Authorization: `Auth ${CLIENT_ID}`, //OAuth ACCESS_TOKEN
    },
  });
  console.log("infoRes", infoRes);

  const text = await infoRes.text();
  console.log("text", text);
  const parser = new DOMParser();
  const htmlScripts = parser
    .parseFromString(text, "text/html")
    .body.querySelectorAll("script");

  // there are multiple script elements, we need to find the one with `window.__sc_hydration` in it
  const script = [...htmlScripts].find((scriptNode: HTMLScriptElement) => {
    // could also use: innerHTML, innerText, textContent, outerText
    return scriptNode.text.includes("window.__sc_hydration");
  });

  const scriptStr = script?.text.split("window.__sc_hydration =")[1]!;
  const scriptJson: any[] = JSON.parse(scriptStr);
  const songData: ResolveJson = scriptJson.find((elem) => {
    return elem.hydratable && elem.hydratable === "sound";
  }).data;
  console.log("valuevalue", songData);
  const trackHashId = songData.waveform_url
    .split("https://wave.sndcdn.com/")[1]
    .split("_m.json")[0];
  // parse
  const trackId: number = songData.id;
  const trackTranscodings: Transcoding[] = songData.media.transcodings;
  const trackMp3: Transcoding = trackTranscodings.filter((val) => {
    return val.preset === "mp3_1_0";
  })[0];
  const trackHls: string = trackMp3.url;

  const trackAuth: string = songData.track_authorization;

  // get the playlist url
  const playlistUrl = fetchPlaylistUrl(
    trackId,
    trackHashId,
    trackHls,
    trackAuth,
    CLIENT_ID
  );
  // const body = infoRes.body?.getReader();
  // console.log("body", body);
  // const bodyUsed = infoRes.bodyUsed;
  // console.log("bodyUsed", bodyUsed);
  // // @ts-ignore
  // const formData = await infoRes.formData();
  // // @ts-ignore
  // console.log("formData", formData);
  // // @ts-ignore
  // const infoBlob = await infoRes.blob();
  // // @ts-ignore
  // console.log("blob", infoBlob);

  // displayInfo(songInfo);
};

export interface ResolveJson {
  [index: string]:
    | string
    | number
    | boolean
    | { transcodings: Transcoding[] }
    | undefined;
  created_at?: string;
  description?: string;
  embeddable_by?: string;
  genre?: string;
  kind?: string;
  last_modified?: string;
  license?: string;
  permalink?: string;
  permalink_url?: string;
  state?: string;
  title?: string;
  track_format?: string;
  uri?: string;
  urn?: string;
  waveform_url: string;
  display_date?: string;
  tag_list?: string;
  comment_count?: number;
  download_count?: number;
  duration?: number;
  full_duration?: number;
  id: number; // 1317984667
  likes_count?: number;
  playback_count?: number;
  reposts_count?: number;
  user_id?: number;
  commentable?: boolean;
  downloadable?: boolean;
  has_downloads_left?: boolean;
  public?: boolean;
  streamable?: boolean;
  caption?: any;
  label_name?: any;
  visuals?: any;
  purchase_title?: any;
  purchase_url?: any;
  release_date?: any;
  media: {
    transcodings: Transcoding[]; // https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/b6705d26-a662-499e-8c4b-1e922b59475c/stream/hls
  };
  track_authorization: string; // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI4MDg3M30.NtHZS90th2v8CbYqlPkjemw9qbZZHBl2ZBCQwFnTksk";
}
export interface Transcoding {
  url: string; //"https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/b6705d26-a662-499e-8c4b-1e922b59475c/stream/hls";
  preset: string; //"mp3_1_0";
  quality?: string; //"sq";
  duration: number;
  snipped?: boolean;
}
