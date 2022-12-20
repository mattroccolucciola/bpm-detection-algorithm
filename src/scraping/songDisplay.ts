import { SongMetaData } from "./SongMetadata";

const parseSongDisplayDataFromHtml = (inputHtml: string): SongMetaData => {
  const parser = new DOMParser();
  const htmlScripts = parser
    .parseFromString(inputHtml, "text/html")
    .body.querySelectorAll("script");

  // there are multiple script elements, we need to find the one with `window.__sc_hydration` in it
  const script = [...htmlScripts].find((scriptNode: HTMLScriptElement) => {
    // could also use: innerHTML, innerText, textContent, outerText
    return scriptNode.text.includes("window.__sc_hydration");
  });

  const scriptStr = script?.text.split("window.__sc_hydration =")[1]!;
  const scriptJson: any[] = JSON.parse(scriptStr);
  const songData: SongMetaData = scriptJson.find((elem) => {
    return elem.hydratable && elem.hydratable === "sound";
  }).data;

  return songData;
};

/** # ENTRYPOINT: Track url is validated prior to calling this.
 *
 * This is the entrypoint for **all** song-related requests.
 *
 * Request the HTML file for the track.
 *
 * URL is in the form: https://soundcloud.com/${artistSlug}/${songSlug}
 */
export const getSongDisplayInfo = async (trackUrl: string) => {
  const resolveUrl = `${trackUrl}`;
  console.log("respolve", resolveUrl);

  // send request for html
  const infoRes = await fetch(resolveUrl, {
    method: "GET",
    headers: {
      accept: "*/*",
      // Authorization: `OAuth ${OAUTH_ACCESS_TOKEN}`,
    },
  });

  // convert html to text
  const htmlStr: string = await infoRes.text();

  // parse html, get the song info from the script tag

  const songData: SongMetaData = parseSongDisplayDataFromHtml(htmlStr);
  console.log("valuevalue", songData);

  return songData;
  // return getMp3(songData)
};
