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

/** # Initialize audio context.
 *
 * Throwing an error if device not supported.
 */
const initAudioContext = (): AudioContext => {
  // Check if hack is necessary. Only occurs in iOS6+ devices
  // and only when you first boot the iPhone, or play a audio/video
  // with a different sample rate
  if (
    /(iPhone|iPad)/i.test(navigator.userAgent) ||
    new window.AudioContext().sampleRate !== sampleRate
  ) {
    let audioCtx = new window.AudioContext();
    const buffer = audioCtx.createBuffer(1, 1, sampleRate);

    const dummy = audioCtx.createBufferSource();
    dummy.buffer = buffer;
    dummy.connect(audioCtx.destination);
    dummy.start(0);
    dummy.disconnect();

    audioCtx.close(); // dispose old context
    throw new Error("Device not supported");
    // return new AudioContext();
  } else return new window.AudioContext();
};

/** # Preprocess the mp3 response body for BPM algo
 * Create audio context, buffer the mp3
 */
export const processMp3 = async (mp3Res: Response) => {
  const audioCtx = initAudioContext();
  const audioData: ArrayBuffer = await mp3Res.arrayBuffer();
  audioCtx.decodeAudioData(
    audioData,
    decodeThenAnalyzeBuffer(audioCtx),
    bufferErrorCallback
  );
};
/** @deprecated
 * @todo rename
 */
export const decodeAndAnalyzeBuffer_ = (audioCtx: AudioContext) =>
  function (this: XMLHttpRequest, e: ProgressEvent<EventTarget>) {
    const audioData: ArrayBuffer = this.response;
    audioCtx.decodeAudioData(
      audioData,
      decodeThenAnalyzeBuffer(audioCtx),
      bufferErrorCallback
    );
  };
