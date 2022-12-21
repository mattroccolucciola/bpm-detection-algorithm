import { calculateBPM } from "./bpmDetection";
import { sampleRate } from "./fetchMp3";

const bufferErrorCallback = (e: DOMException) => {
  console.log("Error with decoding audio data" + e);
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
const decodeThenAnalyzeBuffer: (_: AudioContext) => DecodeSuccessCallback =
  (audioCtx: AudioContext) => (buffer: AudioBuffer) => {
    const offlineCtx: OfflineAudioContext = decodeBuffer(audioCtx, buffer);

    if (offlineCtx.sampleRate !== sampleRate)
      throw new Error(`Sample rate for offline context is not ${sampleRate}`);

    offlineCtx.oncomplete = renderBufferAndCalcBPM;
  };

/**
 * @todo rename
 */
export const decodeAndAnalyzeBuffer = (audioCtx: AudioContext) =>
  function (this: XMLHttpRequest, e: ProgressEvent<EventTarget>) {
    const audioData: ArrayBuffer = this.response;
    audioCtx.decodeAudioData(
      audioData,
      decodeThenAnalyzeBuffer(audioCtx),
      bufferErrorCallback
    );
  };
