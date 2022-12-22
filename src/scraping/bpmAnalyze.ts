import { ISongAudio } from "./processAudio";

/** ## Initiate audio analysis.
 *
 * This assumes that offline context and node are initialized.
 *
 * Second half of `decodeBuffer()`.
 */
export class BpmAnalyzer extends ISongAudio {
  async initAudioRender() {
    console.log("IM REND");
    const offlineCtx = this.offline?.ctx!;
    const offlineNode = this.offline?.node!;
    // offlineContext = this.offline?.ctx
    // offlineSource = this.offline?.node
    // create low-pass filter
    // const filter = offlineCtx.createBiquadFilter()!;
    // filter.frequency.value = 150;
    // filter.type = "lowpass";
    // offlineNode.connect(filter);
    // filter.connect(offlineCtx.destination!);

    // source.buffer = audioBuffer;
    // source.connect(context.destination);
    // source.start();

    // const gain = offlineCtx.createGain();

    // gain.gain.value = 0.5;
    // offlineNode.connect(gain);
    // gain.connect(offlineCtx.destination);

    // console.log("CONNETIN");
    // offlineNode.start(0);
    // console.log("PLAIN");
    // // start the source playing
    // await offlineCtx.startRendering()!;
  }
}
