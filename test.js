function calcWeightedAvg(listOfDicts) {
    let countSum = 0;
    tempoCounts.forEach(element => {
        countSum += element['count'];
    });
    let weightedAvg = 0;
    for (let i = 0; i < listOfDicts.length; i++) {
        const element =listOfDicts[i];
        let target = element['target'];
        let countWeight = element['count'] / countSum;
        weightedAvg += target * countWeight;
    }
    return weightedAvg
}

function buildRequest(mp3URL) {
    audioCtxSrc = audioCtx.createBufferSource();
    let _request_ = new XMLHttpRequest();
    _request_.open('GET', mp3URL, true);
    _request_.responseType = 'arraybuffer';
    return _request_
}

function newfxn() {
    var audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
        audioCtxSrc.buffer = buffer;
        audioCtxSrc.connect(audioCtx.destination);
        audioCtxSrc.loop = true;

        var offlineContext = new OfflineAudioContext(1, buffer.length, buffer.sampleRate);
        var oSource = offlineContext.createBufferSource();
        oSource.buffer = buffer;
        var filter = offlineContext.createBiquadFilter();
        filter.type = "lowpass";
        oSource.connect(filter);
        filter.connect(offlineContext.destination);
        oSource.start(0);
        offlineContext.startRendering();
        offlineContext.oncomplete = function(e) {
            var filteredBuffer = e.renderedBuffer;
            //If you want to analyze both channels, use the other channel later
            var data = filteredBuffer.getChannelData(0);
            var max = arrayMax(data);
            var min = arrayMin(data);
            var thresholdPct = 0.99;
            var threshold = min + ((max - min) * thresholdPct);
            var peaks = getPeaksAtThreshold(data, threshold);
            var intervalCounts = countIntervalsBetweenNearbyPeaks(peaks);
            var tempoCounts = groupNeighborsByTempo(intervalCounts);
            console.log(threshold, min, max);
            console.log('peaks',peaks);
            console.log('intervalCounts',intervalCounts);
            console.log('tempoCounts', tempoCounts);
            
            tempoCounts.sort(function(a, b) {
                return b.count - a.count;
            });
            // var total = 0;
            // for(var i = 0; i < tempoCounts.length; i++) {
            //     total += tempoCounts[i];
            // }
            // var avg = total / tempoCounts.length;
            // console.log(avg);
            weightedAvg = calcWeightedAvg(tempoCounts);

            if (tempoCounts.length) {
                console.log(tempoCounts[0].tempo, weightedAvg);
                //output.innerHTML = tempoCounts[0].tempo;
            };
        };
        function arrayMin(arr) {
            var len = arr.length,
              min = Infinity;
            while (len--) {
                if (arr[len] < min) {
                    min = arr[len];
                }
            }
            return min;
        }
          
        function arrayMax(arr) {
            var len = arr.length,
                max = -Infinity;
            while (len--) {
                if (arr[len] > max) {
                    max = arr[len];
                }
            }
            return max;
        }
        function getPeaksAtThreshold(data, threshold) {
            var peaksArray = [];
            var length = data.length;
            for (var i = 0; i < length;) {
            if (data[i] > threshold) {
                peaksArray.push(i);
                // Skip forward ~ 1/4s to get past this peak.
                i += 10000;
            }
            i++;
            }
            return peaksArray;
        }
        function countIntervalsBetweenNearbyPeaks(peaks) {
            var intervalCounts = [];
            peaks.forEach(function(peak, index) {
                for (var i = 0; i < 10; i++) {
                    var interval = peaks[index + i] - peak;
                    var foundInterval = intervalCounts.some(function(intervalCount) {
                        if (intervalCount.interval === interval) return intervalCount.count++;
                    });
                        //Additional checks to avoid infinite loops in later processing
                    if (!isNaN(interval) && interval !== 0 && !foundInterval) {
                        intervalCounts.push({
                            interval: interval,
                            count: 1
                            });
                        }
                    }
                });
            return intervalCounts;
        }
        function groupNeighborsByTempo(intervalCounts) {
            var tempoCounts = [];
            intervalCounts.forEach(function(intervalCount) {
                //Convert an interval to tempo
                var theoreticalTempo = 60 / (intervalCount.interval / 44100);
                theoreticalTempo = Math.round(theoreticalTempo);
                if (theoreticalTempo === 0) {
                    return;
                }
                // Adjust the tempo to fit within the 90-180 BPM range
                while (theoreticalTempo < 90) theoreticalTempo *= 2;
                while (theoreticalTempo > 180) theoreticalTempo /= 2;
            
                var foundTempo = tempoCounts.some(function(tempoCount) {
                    if (tempoCount.tempo === theoreticalTempo) return tempoCount.count += intervalCount.count;
                });
                if (!foundTempo) {
                    tempoCounts.push({
                    tempo: theoreticalTempo,
                    count: intervalCount.count
                    });
                }
            });
            return tempoCounts;
        }
        },
        function(e){ console.log("Error with decoding audio data" + e.err); });
    }

function getData(mp3URL) {
    request = buildRequest(mp3URL)
    request.onload = newfxn;
    request.send();
}