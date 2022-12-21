import { sampleRate } from "./fetchMp3";
// constants
const tempoRange = { min: 80, max: 160 };

interface IntervalCount {
  interval: number;
  count: number;
}
interface TempoCount {
  tempo: number;
  count: number;
}

const getPeaksAtThreshold = (
  buffer: Float32Array,
  thresh: number
): number[] => {
  const peaksArray: number[] = [];
  for (let i = 0; i < buffer.length; i++) {
    if (buffer[i] > thresh) {
      peaksArray.push(i); // if value > threshold, it's a peak -> add the index of this value to list
      i += 0.25 * sampleRate;
    }
  }
  return peaksArray;
};

const countIntervalsBetweenNearbyPeaks = (peaksArr: number[]) => {
  const intervalCountArray: IntervalCount[] = [];
  peaksArr.forEach(function (_peak_, idx) {
    for (let i = 0; i < 10; i++) {
      const interval: number = peaksArr[idx + i] - _peak_;
      const foundInterval: boolean = intervalCountArray.some(function (
        intervalCount
      ) {
        if (intervalCount.interval === interval) return intervalCount.count++;
      });
      //Additional checks to avoid infinite loops in later processing
      if (!isNaN(interval) && interval !== 0 && !foundInterval) {
        intervalCountArray.push({ interval: interval, count: 1 });
      }
    }
  });
  return intervalCountArray;
};

/**
 * TODO: elucidate the variable definitions
 * Is interval in seconds?
 */
const groupNeighborsByTempo = (
  intervalCtArr: IntervalCount[]
): TempoCount[] => {
  const tempoCtArray: TempoCount[] = [];
  intervalCtArr.forEach((intervalCount) => {
    // Convert interval (sec) to tempo (b/min)
    // (60sec / 1min) / (x sec / 44100b)
    // (60sec / 1min) * (44100b / x sec) = 2,646,000 beats / x min
    let estTempo: number = Math.round(
      60 / (intervalCount.interval / sampleRate)
    );

    if (estTempo === 0) return;

    // Adjust tempo to fit within the 80-160 BPM range
    while (estTempo < tempoRange.min) estTempo *= 2;
    while (estTempo > tempoRange.max) estTempo /= 2;

    // elucidate: what is found?
    const foundTempo = tempoCtArray.some((tempoCt: TempoCount) => {
      if (tempoCt.tempo === estTempo)
        return (tempoCt.count += intervalCount.count);
    });
    if (!foundTempo) {
      tempoCtArray.push({
        tempo: estTempo,
        count: intervalCount.count,
      });
    }
  });
  return tempoCtArray;
};

const calcWeightedAvg = (tempoCtArr: TempoCount[]): number => {
  let countSum = 0;
  tempoCtArr.forEach((tempoCt: TempoCount) => {
    countSum += tempoCt.count;
  });

  let weightedAvg = 0;
  for (let i = 0; i < tempoCtArr.length; i++) {
    const element: TempoCount = tempoCtArr[i];
    let countWeight = element.count / countSum;
    weightedAvg += element.tempo * countWeight;
  }
  return weightedAvg;
};

/** Calculate the BPM using a simple BPM detection algo for MP3 files
 * @param audioBufferArray
 * @returns weighted avg bpm
 */
export const calculateBPM = (audioBufferArray: Float32Array): number => {
  const arrMax: number = audioBufferArray.reduce(
    (max, value) => (value > max ? value : max),
    audioBufferArray[0]
  );
  const arrMin: number = audioBufferArray.reduce(
    (min, value) => (value < min ? value : min),
    audioBufferArray[0]
  );

  // set initial threshold, to be reduced via while loop
  const thresholdPct = 0.9;
  const threshold = arrMin + (arrMax - arrMin) * thresholdPct;

  // get the array of peak locations, borrowed from https://stackoverflow.com/a/30112800
  const peaksArr = getPeaksAtThreshold(audioBufferArray, threshold);
  const intervalCountArr: IntervalCount[] =
    countIntervalsBetweenNearbyPeaks(peaksArr);
  const tempoCountArr = groupNeighborsByTempo(intervalCountArr);
  tempoCountArr.sort(function (a, b) {
    return b.count - a.count;
  });

  const weightedAvg: number = calcWeightedAvg(tempoCountArr);
  console.log(
    `calculated bpm: ${tempoCountArr[0].tempo}    |||    weighted avg: ${weightedAvg}`,
    tempoCountArr
  );

  if (tempoCountArr.length) {
    const bpm = tempoCountArr[0].tempo;
    if (bpm > 110 && bpm < 130) {
      // genreEstText.innerText = "Dance";
    }
  }
  console.log("weighted avg");
  return weightedAvg;
};
