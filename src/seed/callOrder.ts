import { ResolveJson } from "./classes";
import { playlistCallPayload } from "./playlistUrls";
import { resolveJsonOrig } from "./trackResolveJson";

export {};

// get client id
const clientId = "lnFbWHXluNwOkW7TxTYUXrrse0qj1C72";

// get trackURL
const trackUrl = "https://soundcloud.com/liltecca/faster";

// call resolve
// TEMPLATE: https://api-v2.soundcloud.com/resolve?url=${trackURL}&client_id=${CLIENT_ID}
const resolveUrl = `https://api-v2.soundcloud.com/resolve?url=${trackUrl}&client_id=${clientId}`;

const fetchReq: (url: string) => ResolveJson = (resolveUrl) => {
  // make fetch request
  return resolveJsonOrig;
};
const resJson = fetchReq(resolveUrl);

// parse
const trackId = resJson.id;
const trackTranscodings = resJson.media.transcodings;
const trackMp3 = trackTranscodings.filter((val) => {
  return val.preset === "mp3_1_0";
})[0];
const trackHls = trackMp3.url;

const trackAuth = resJson.track_authorization;

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

const fetchPlaylistUrl = (
  trackId: number,
  trackHls: string,
  trackAuth: string,
  clientId: string
) => {
  const playlistCallUrl = buildSignedPlaylistCall(
    trackId,
    trackHls!,
    trackAuth,
    clientId
  );
  // fetch
  if (playlistCallUrl) console.log("fetching:", playlistCallUrl);

  // response
  const playlistCallObj = playlistCallPayload;

  return playlistCallObj.url;
};

// get the playlist url
const playlistUrl = fetchPlaylistUrl(trackId, trackHls, trackAuth, clientId);
/**
https://cf-hls-media.sndcdn.com/media/159660/0/31762/zlobEAQSXVfu.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovemxvYkVBUVNYVmZ1LjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NjEyODQzOTJ9fX1dfQ__&Signature=Drb8XOr94iixZSZmnMS4j6DqkjfyL0juSBlNkxWPNRuJtQKT2-bqmQOX4BmSMOKSgUFBGYpE7P4Zz9IMNfqCvoUelS-hzBNTn4uGg4Ru~4EZz81Ubfje4QaH9GSrozb5pIyYMMzMxM0cELIjeBaWBDg~sA0DMT1w8uZsnFYQ5OmLcB8ebxS6GiVT3qYSk-LQ6y4YnbwmCzNvhjug4bbF5oxD8ogSJjkUhjhBDgUtU9OUWjKpmcIWio4v1Gj4j~ySCCqRxbcdgflcRub5D-HpyT-K2mz7ik52fZvq4T8ZQ6bhHlM5ERb-18nglia3wida9UvLuCkY-wRopPFK5~GXPA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
https://cf-hls-media.sndcdn.com/media/159660/0/31762/zlobEAQSXVfu.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovemxvYkVBUVNYVmZ1LjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NjEyODQzOTJ9fX1dfQ__&Signature=Drb8XOr94iixZSZmnMS4j6DqkjfyL0juSBlNkxWPNRuJtQKT2-bqmQOX4BmSMOKSgUFBGYpE7P4Zz9IMNfqCvoUelS-hzBNTn4uGg4Ru~4EZz81Ubfje4QaH9GSrozb5pIyYMMzMxM0cELIjeBaWBDg~sA0DMT1w8uZsnFYQ5OmLcB8ebxS6GiVT3qYSk-LQ6y4YnbwmCzNvhjug4bbF5oxD8ogSJjkUhjhBDgUtU9OUWjKpmcIWio4v1Gj4j~ySCCqRxbcdgflcRub5D-HpyT-K2mz7ik52fZvq4T8ZQ6bhHlM5ERb-18nglia3wida9UvLuCkY-wRopPFK5~GXPA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
 */
// from here i can get the playlist .m3u8 file, which should represent the mp3. I need to either
// stitch the mp3 files together or use a lib like FFMPEG https://github.com/ffmpegwasm/ffmpeg.wasm
// to convert to mp3
// https://stackoverflow.com/questions/72387562/i-download-audio-files-but-in-m3u8-format-how-to-convert-to-mp3