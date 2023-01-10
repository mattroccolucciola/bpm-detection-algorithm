import { calculateBPM } from "./bpmDetection";
import { mediaBaseUrl, sampleRate } from "./fetchMp3";

export class SongSlice {
  url: string;
  arrayBuffer: ArrayBuffer;
  offset: number;
  byteOffset: number;

  constructor(
    url: string,
    arrayBuffer: ArrayBuffer,
    offset: number,
    byteOffset: number
  ) {
    this.url = url;
    this.arrayBuffer = arrayBuffer;
    this.offset = offset;
    this.byteOffset = byteOffset;
  }
  get byteLen(): number {
    return this.arrayBuffer.byteLength;
  }
}

/** Everything related to the song as its being processed and analyzed */
export class ISongAudio {
  /** Song's **audio buffer** length (in bytes) */
  length?: number;
  arrBufLen?: number;
  ctx?: AudioContext;
  node?: AudioBufferSourceNode;
  offline?: {
    ctx: OfflineAudioContext;
    node: AudioBufferSourceNode;
  };
  buffer?: AudioBuffer;
  arrBuffer?: ArrayBuffer;
}

export class SongAudio extends ISongAudio {
  slices: SongSlice[] = [];

  oldCallbackFetchProcess(mp3PlaylistUrl: string) {
    // build request
    let req = new XMLHttpRequest();
    req.open("GET", mp3PlaylistUrl, true);
    // req.responseType = "arraybuffer";
    // build request done

    //
    // const m3uRes = await fetch(mp3PlaylistUrl);
    // const resTextLines = (await m3uRes.text()).split("\n");
    const callbackDecodeAndAnalyzeBuffer = function (
      this: XMLHttpRequest,
      e: ProgressEvent<EventTarget>
    ) {
      const m3uRes = this.response;
      const resTextLines = m3uRes.split("\n");
      const slices: SongSlice[] = [];

      for (let idx = 10; idx < resTextLines.length; idx++) {
        const line = resTextLines[idx];
        const isMp3Url = line.includes(mediaBaseUrl);
        if (isMp3Url) {
          // alias
          const mp3Url = line;
          console.log("mp3Url", mp3Url);

          // get array+audio buffers from URL
          const callbackFetchAudioBuffer = (mp3Url: string) => {
            let length = 0;
            let arrBufLen = 0;
            // get from soundcloud
            const mp3SliceRes: Response = await fetch(mp3Url);
            // get the buffer directly from the res
            const mp3SliceArrBuf: ArrayBuffer = await mp3SliceRes.arrayBuffer();
            // decode that res buffer into a Web Audio API - compatible 'audio buffer'
            // add to slice arr
            this.slices.push(
              new SongSlice(mp3Url, mp3SliceArrBuf, length!, arrBufLen!)
            );

            // update new buffer size (in bytes)
            // this.length! += mp3SliceAudioBuf.length;
            this.arrBufLen! += mp3SliceArrBuf.byteLength;
          };
          callbackFetchAudioBuffer(mp3Url);
        }
      }

      // this.concatBuffers();
      // this.ctx.decodeAudioData(
      //   audioData,
      //   decodeThenAnalyzeBuffer,
      //   function (e) {
      //     console.log("Error with decoding audio data" + e.err);
      //   }
      // );
    };
    req.onload = callbackDecodeAndAnalyzeBuffer;
    req.send();
    //
  }

  async fetchSongsFromM3u(resTextLines: string[]) {
    // get song buffers by order in which they exist in the song, also get audio buffer size
    for (let idx = 10; idx < resTextLines.length; idx++) {
      const line = resTextLines[idx];
      const isMp3Url = line.includes(mediaBaseUrl);
      if (isMp3Url) {
        // alias
        const mp3Url = line;

        // get array+audio buffers from URL
        await this.fetchAudioBuffer(mp3Url);
      }
    }

    this.concatBuffers();
    // with the updated buffer size, we can init the song's audio buffer then assign the slice buffers to them
    await this.setBuffer();
  }

  /** ## Initialize the song's audio buffer, holds all of the song slices.
   */
  async setBuffer() {
    // decode that res buffer into a Web Audio API - compatible 'audio buffer'
    const isSafari = true;
    let mp3SliceAudioBuf: AudioBuffer;
    if (isSafari) {
      console.log("its safari");
      this.ctx!.decodeAudioData(this.arrBuffer!, (buf: AudioBuffer) => {
        let ct = 0;

        this.buffer = buf;
        console.log("buf", buf);
        const newNode = this.ctx!.createBufferSource();
        console.log("newNode", newNode);
        newNode.buffer = this.buffer;
        newNode.playbackRate.setValueAtTime(1, 0);
        console.log("setValueAtTimenewNode", newNode);
        newNode.start();
        console.log("startnewNode", newNode);
        newNode.connect(this.ctx!.destination);
        console.log("ctx state", this.ctx?.state);
        this.ctx!.resume();
        console.log("ctx state", this.ctx?.state);
        this.ctx!.createGain();
        console.log("ctx state", this.ctx?.state);
        this.initOfflineCtx();
        // console.log("prep", this.offline?.ctx);

        this.offline!.ctx.oncomplete = renderBufferAndCalcBPM;
        this.offline?.node.playbackRate.setValueAtTime(1, 0);
        this.offline?.node.start(0);
        this.offline?.node.connect(this.offline?.ctx!.destination);
        console.log("post", this.offline?.node);

        console.log("offlineCtx state", this.ctx?.state);
        this.offline?.ctx!.resume();
        console.log("offlineCtx state", this.ctx?.state);
        this.offline?.ctx!.createGain();
        console.log("offlineCtx state", this.ctx?.state);
        console.log("prep", this.offline?.ctx);

        // this.offline?.node.context.state

        // this.ctx!.resume();
        // this.ctx!.createGain();
        // console.log(newNode.context.state);
        // console.log(this.ctx!.state);
      });
    } else {
      mp3SliceAudioBuf = await this.ctx!.decodeAudioData(this.arrBuffer!);
      this.buffer = mp3SliceAudioBuf;
      const newNode = this.ctx!.createBufferSource();
      newNode.buffer = this.buffer;
      newNode.playbackRate.setValueAtTime(1, 0);
      newNode.start();
      newNode.connect(this.ctx!.destination);
      this.ctx!.resume();
      this.ctx!.createGain();
      console.log(newNode.context.state);
      console.log(this.ctx!.state);
    }
  }

  appendBuffer(buffer1: ArrayBuffer, buffer2: ArrayBuffer): ArrayBuffer {
    const songBuf = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    songBuf.set(new Uint8Array(buffer1), 0);
    songBuf.set(new Uint8Array(buffer2), buffer1.byteLength);

    return songBuf.buffer;
  }

  /** # UTILITY */
  concatBuffers() {
    let ogBuf = new ArrayBuffer(0);

    for (let idx = 0; idx < this.slices.length; idx++) {
      const slice: SongSlice = this.slices[idx];

      const sliceArrBuf: ArrayBuffer = slice.arrayBuffer;
      ogBuf = this.appendBuffer(ogBuf, sliceArrBuf);
    }
    this.arrBuffer = ogBuf;
  }

  /** ## Fetches the audio buffer from a mp3 url.
   *
   * 1. Fetch the url, get response object
   * 1. Get array buffer from response
   * 1. Convert array buffer to audio buffer
   *
   * Returns audio buffer.
   *
   * Length property is assumed to be set before this method is called.
   */
  async fetchAudioBuffer(mp3Url: string) {
    this.length = 0;
    this.arrBufLen = 0;
    // get from soundcloud
    const mp3SliceRes: Response = await fetch(mp3Url);
    // get the buffer directly from the res
    const mp3SliceArrBuf: ArrayBuffer = await mp3SliceRes.arrayBuffer();
    // decode that res buffer into a Web Audio API - compatible 'audio buffer'
    // add to slice arr
    this.slices.push(
      new SongSlice(mp3Url, mp3SliceArrBuf, this.length!, this.arrBufLen!)
    );

    // update new buffer size (in bytes)
    // this.length! += mp3SliceAudioBuf.length;
    this.arrBufLen! += mp3SliceArrBuf.byteLength;

    // return mp3SliceAudioBuf;
  }

  /** Create audio node.
   *
   * Assumes audio buffer was created.
   *
   * This method creates and assigns the offline context property.
   *
   * First half of `decodeBuffer()`.
   */
  initOfflineCtx() {
    // const offlineCtx: OfflineAudioContext = decodeBuffer(
    //   audioCtx,
    //   decodedBuffer
    // );

    // connect AudioContext node to the source object

    this.node = this.ctx!.createBufferSource();
    this.node!.buffer = this.buffer!;
    this.node!.start(0);
    this.node!.connect(this.ctx!.destination);
    this.node!.loop = true;

    // create the offline context
    const ctx = new OfflineAudioContext(1, this.buffer?.length!, sampleRate);
    this.offline = { ctx, node: ctx.createBufferSource() };

    // prev: offlineCtxSrc
    // assign buffer to offline node
    this.offline.node.buffer = this.buffer!;
  }
}

const bufferErrorCallback = (e: DOMException) => {
  console.error("Error with decoding audio data" + e);
};

/**
 *
 */
const renderBufferAndCalcBPM = () =>
  function (
    this: OfflineAudioContext,
    offlineAudioCompletionEvent: OfflineAudioCompletionEvent
  ) {
    const filteredBuffer: AudioBuffer =
      offlineAudioCompletionEvent.renderedBuffer;

    // If you want to analyze both channels, use the other channel later
    const audioBufferArray: Float32Array = filteredBuffer.getChannelData(0);

    // algo to calculate bpm
    calculateBPM(audioBufferArray);
  };

/**
 * @todo rename
 */
const decodeBuffer = (audioCtx: AudioContext, buffer: AudioBuffer) => {
  // connect AudioContext node to the source object
  const audioCtxSrc = audioCtx.createBufferSource();
  audioCtxSrc.buffer = buffer;
  audioCtxSrc.connect(audioCtx.destination);
  audioCtxSrc.loop = true;

  //let offlineContext = new OfflineAudioContext(1, buffer.length, buffer.sampleRate);
  const offlineContext = new OfflineAudioContext(1, buffer.length, sampleRate);
  const oSource = offlineContext.createBufferSource();
  oSource.buffer = buffer;
  const filter = offlineContext.createBiquadFilter();
  filter.frequency.value = 150;
  filter.type = "lowpass";
  oSource.connect(filter);
  filter.connect(offlineContext.destination);
  oSource.start(0);
  offlineContext.startRendering();
  return offlineContext;
};

/**
 * @todo rename
 */
const decodeThenAnalyzeBuffer = (
  audioCtx: AudioContext,
  decodedBuffer: AudioBuffer
) => {
  const offlineCtx: OfflineAudioContext = decodeBuffer(audioCtx, decodedBuffer);

  if (offlineCtx.sampleRate !== sampleRate)
    throw new Error(`Sample rate for offline context is not ${sampleRate}`);

  offlineCtx.oncomplete = renderBufferAndCalcBPM;
};

/** @deprecated
 * @todo rename
 */
// const decodeThenAnalyzeBuffer_: DecodeSuccessCallback = (
//   decodedBuffer: AudioBuffer
// ) => {
//   console.log("legacy decode then analyze buffer");
//   const audioCtx = new AudioContext({ sampleRate });
//   console.log("audio context:\n", audioCtx);
//   console.log("legacy buffer:\n", decodedBuffer);
//   const offlineCtx: OfflineAudioContext = decodeBuffer(audioCtx, decodedBuffer);
//   console.log("legacy offlineCtx from `decodeBuffer()`:\n", offlineCtx);

//   if (offlineCtx.sampleRate !== sampleRate)
//     throw new Error(`Sample rate for offline context is not ${sampleRate}`);

//   console.log("now rendering...");
//   offlineCtx.oncomplete = renderBufferAndCalcBPM;
// };
// const decodeThenAnalyzeBuffer_: (_: AudioContext) => DecodeSuccessCallback =
//   (audioCtx: AudioContext) => (decodedBuffer: AudioBuffer) => {
//     console.log("legacy decode then analyze buffer");
//     console.log("audio context:\n", audioCtx);
//     console.log("legacy buffer:\n", decodedBuffer);
//     const offlineCtx: OfflineAudioContext = decodeBuffer(
//       audioCtx,
//       decodedBuffer
//     );
//     console.log("legacy offlineCtx from `decodeBuffer()`:\n", offlineCtx);

//     if (offlineCtx.sampleRate !== sampleRate)
//       throw new Error(`Sample rate for offline context is not ${sampleRate}`);

//     console.log("now rendering...");
//     offlineCtx.oncomplete = renderBufferAndCalcBPM;
//   };

/** # Initialize audio context.
 *
 * Throwing an error if device not supported.
 */
const initAudioContext = (): AudioContext => {
  return new window.AudioContext({ sampleRate });
};

/** # Preprocess the mp3 response object for BPM algo
 * Pass in the response which contains mp3, return audio context for BPM processing.
 *
 * Create audio context, buffer the mp3
 */
export const processMp3 = async (mp3Res: Response) => {
  const audioCtx = initAudioContext();
  // audioCtx.createBufferSource().buffer;

  const audioData: ArrayBuffer = await mp3Res.arrayBuffer();
  console.log("audioData", audioData);

  const logic: number = 0;
  if (logic === 0) {
    console.log("going with logic ", logic);
    // audioCtx.decodeAudioData(
    //   audioData,
    //   // decodeThenAnalyzeBuffer_(audioCtx),
    //   decodeThenAnalyzeBuffer_,
    //   bufferErrorCallback
    // );
  } else if (logic === 1) {
    console.log("going with logic ", logic);
    // const xxx = await audioCtx.decodeAudioData(
    //   audioData,
    //   // decodeThenAnalyzeBuffer_(audioCtx),
    //   decodeThenAnalyzeBuffer_,
    //   bufferErrorCallback
    // );
  } else if (logic === 2) {
    console.log("going with logic ", logic);
    try {
      const decodedBuffer = await audioCtx.decodeAudioData(audioData);
      console.log("successfully decoded buffer", decodedBuffer);
      // currently here
      decodeThenAnalyzeBuffer(audioCtx, decodedBuffer);
      console.log("successfully `analyzed` buffer");
    } catch (err) {
      bufferErrorCallback(err as DOMException);
    }
  }
};
/** @deprecated
 * @todo rename
 */
// export const decodeAndAnalyzeBuffer_ = function (
//   this: XMLHttpRequest,
//   e: ProgressEvent<EventTarget>
// ) {
//   console.log("here 1");
//   // const audioCtx = new AudioContext();
//   console.log("here 2");
//   const audioData: ArrayBuffer = this.response;
//   console.log("here 3: audio data", audioData);
//   console.log("e", e);

//   audioCtx.decodeAudioData(
//     audioData,
//     // decodeThenAnalyzeBuffer_(audioCtx),
//     decodeThenAnalyzeBuffer_,
//     bufferErrorCallback
//   );
// };
// export const decodeAndAnalyzeBuffer_ = (audioCtx: AudioContext) =>
//   function (this: XMLHttpRequest, e: ProgressEvent<EventTarget>) {
//     const audioData: ArrayBuffer = this.response;
//     audioCtx.decodeAudioData(
//       audioData,
//       // decodeThenAnalyzeBuffer_(audioCtx),
//       decodeThenAnalyzeBuffer_,
//       bufferErrorCallback
//     );
//   };
