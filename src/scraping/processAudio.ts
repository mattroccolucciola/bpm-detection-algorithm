import { calculateBPM } from "./bpmDetection";
import { sampleRate } from "./fetchMp3";

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
const decodeThenAnalyzeBuffer_: DecodeSuccessCallback = (
  decodedBuffer: AudioBuffer
) => {
  console.log("legacy decode then analyze buffer");
  const audioCtx = new AudioContext({ sampleRate });
  console.log("audio context:\n", audioCtx);
  console.log("legacy buffer:\n", decodedBuffer);
  const offlineCtx: OfflineAudioContext = decodeBuffer(audioCtx, decodedBuffer);
  console.log("legacy offlineCtx from `decodeBuffer()`:\n", offlineCtx);

  if (offlineCtx.sampleRate !== sampleRate)
    throw new Error(`Sample rate for offline context is not ${sampleRate}`);

  console.log("now rendering...");
  offlineCtx.oncomplete = renderBufferAndCalcBPM;
};
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
    audioCtx.decodeAudioData(
      audioData,
      // decodeThenAnalyzeBuffer_(audioCtx),
      decodeThenAnalyzeBuffer_,
      bufferErrorCallback
    );
  } else if (logic === 1) {
    console.log("going with logic ", logic);
    const xxx = await audioCtx.decodeAudioData(
      audioData,
      // decodeThenAnalyzeBuffer_(audioCtx),
      decodeThenAnalyzeBuffer_,
      bufferErrorCallback
    );
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
export const decodeAndAnalyzeBuffer_ = function (
  this: XMLHttpRequest,
  e: ProgressEvent<EventTarget>
) {
  console.log('here 1')
  const audioCtx = new AudioContext();
  console.log('here 2')
  const audioData: ArrayBuffer = this.response;
  console.log('here 3: audio data', audioData)
  console.log('e',e);
  
  audioCtx.decodeAudioData(
    audioData,
    // decodeThenAnalyzeBuffer_(audioCtx),
    decodeThenAnalyzeBuffer_,
    bufferErrorCallback
  );
};
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
