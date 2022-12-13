import axios from "axios";

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

  // get the track id via the main url
  // previously: `https://api.soundcloud.com/resolve?url=${trackUrl}&client_id=${CLIENT_ID}`;
  // const resolveUrl = `https://api-v2.soundcloud.com/resolve?url=${trackUrl}&client_id=${CLIENT_ID}`; //&client_id=${CLIENT_ID}
  // const resolveUrl = `https://api-v2.soundcloud.com/resolve?url=${trackUrl}`; //&client_id=${CLIENT_ID}
  // const resolveUrl = `https://api.soundcloud.com/resolve?url=${trackUrl}&client_id=${CLIENT_ID}`;
  // const resolveUrl = `https://api.soundcloud.com/resolve?url=${trackUrl}`; // &client_id=${CLIENT_ID}

  const resolveUrl = `https://api.soundcloud.com/connect?client_id=${CLIENT_ID}&redirect_uri=${trackUrl}&response_type=code`;
  console.log("respolve", resolveUrl);

  // const { data } = await axios.get(resolveUrl);
  // console.log('data', data)
  const infoRes = await fetch(resolveUrl, {
    // mode: "no-cors",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "application/json",
      accept: "*/*",
      // Authorization: `OAuth ${CLIENT_ID}`, //OAuth ACCESS_TOKEN
    },
  });
  console.log("infoRes", infoRes);

  const text = await infoRes.text();
  console.log("text", text);
  const body = infoRes.body;
  console.log("body", body);
  const bodyUsed = infoRes.bodyUsed;
  console.log("bodyUsed", bodyUsed);
  // @ts-ignore
  const formData = await infoRes.formData();
  // @ts-ignore
  console.log("formData", formData);
  // @ts-ignore
  const infoBlob = await infoRes.blob();
  // @ts-ignore
  console.log("blob", infoBlob);
  // @ts-ignore
  const json = await infoRes.json();
  // @ts-ignore
  console.log("json", json);

  // displayInfo(songInfo);
};
