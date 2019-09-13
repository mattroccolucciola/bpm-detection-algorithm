track_id = 170734376;
CLIENT_ID = '6aSX01kZxpetA85mf5R9Ezqs3ozjO2zc';
AudioContext = window.AudioContext || window.webkitAudioContext;
OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext
audioCtx = new AudioContext();

// process input from user and parse & clean it
function mungUserInput() {
    let submitField = document.querySelector('#url');
    let userInput = submitField.value;

    // check if its a permalink or full URL
    if (userInput.includes('soundcloud.com/')) {
        urlString = userInput;
    } else if (userInput.includes('/')) {
        urlString = `https://soundcloud.com/${userInput}`;
    } else {
        alert('Please use valid SoundCloud URL');
        return
    }
    return urlString
}

// main function
function main() {
    let submitButton = document.querySelector('#getURL');

    // the entire script basically needs to be assigned to the submit button
    submitButton.addEventListener('click', getMP3AndFindBPM)
}
main()

// full function
async function getMP3AndFindBPM(event) {
    // prevent default
    event.preventDefault();

    // get the mp3 path
    // mp3URL = await getMP3Path();
    // console.log(mp3URL);

    // analyze the bpm
    mp3URL = './waiting-so-long.mp3'
    // analyzeMP3(mp3URL);
    getData(mp3URL);
};

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



// get the mp3
async function getMP3Path() {
    // delete this line, its for testing only
    //document.querySelector('#url').value = 'https://soundcloud.com/petitbiscuit/we-were-young-robotaki-remix';
    // document.querySelector('#url').value = 'https://soundcloud.com/skrillex/skrillex-feat-beam-mumbai-power';
    //document.querySelector('#url').value = 'https://soundcloud.com/skrillex/skrillex-feat-alvin-risk-fuji-opener';
    //document.querySelector('#url').value = 'https://soundcloud.com/skrillex/skrillex-bangarang-feat-sirah';
    // document.querySelector('#url').value = 'https://soundcloud.com/inspected/sam-gellaitry-waiting-so-long';

    // get the text from the input field
    let trackURL = mungUserInput()
    if (trackURL === '') {
        alert('please enter valid url');
    }

    // get the track id via the main url
    let fullUrl = `https://api.soundcloud.com/resolve?url=${trackURL}&client_id=${CLIENT_ID}`

    // mung the page source, get the url for making api call
    streamData = await pullMp3(fullUrl);
    streamData = streamData['request']['responseURL']
    return streamData
}
// get the asset from servers
async function pullMp3(url) {
    info = await axios.get(url);
    streamURL = info['data']['stream_url'] + `?client_id=${CLIENT_ID}`;
    return await axios.get(streamURL);
}

function analyzeMP3(audioURL) {
    request = getRequestElem(audioURL);
    request.onload = convertBufferAndAnalyzeBPM;
    request.send();
}

function getRequestElem(audioURL) {
    let request = new XMLHttpRequest();
    request.open('GET', audioURL, true);
    request.responseType = 'arraybuffer';
    return request;
}

function convertBufferAndAnalyzeBPM() {
    // get the audio/array buffer
    let audioData = request.response;
    console.log('orig audio data', audioData);
    // arr = new Int8Array(audioData);

    // decode this buffer
    audioCtx.decodeAudioData(audioData, decodeBuffer);
}

function decodeBuffer(buffer) {
    console.log('this', buffer);
    
    // convert buffer
    offlineCtx = renderSong(buffer)
    console.log('offlineCtx', offlineCtx, new Float32Array(offlineCtx));

    // Act on the rendered song
    offlineCtx.oncomplete = filterOlC;
}

function renderSong(buffer) {
    // Create offline context
    //offlineCtx = new offlineCtx(1, buffer.length, 44100);
    offlineCtx = new OfflineAudioContext(1, buffer.length, 44100);

    // Create buffer source
    source = offlineCtx.createBufferSource();
    source.buffer = buffer;
    console.log('buffer', buffer, new Int8Array(buffer));

    // Create filter
    let filter = offlineCtx.createBiquadFilter();
    filter.type = "lowpass";
    console.log('filter', filter, new Int8Array(filter));
    // Pipe the song into the filter, and the filter into the offline context
    source.connect(filter);
    let fx = filter.connect(offlineCtx.destination);
    console.log('fx', fx, new Int8Array(fx));

    // Set track to start at zero
    source.start(0);
    // Render the song
    offlineCtx.startRendering();
    return offlineCtx
}

function filterOlC(e) {
    // Filtered buffer!
    var filteredBuffer = e.renderedBuffer;
    console.log('filteredbuffer  ', typeof(filteredBuffer), filteredBuffer);

    // analyze mp3
    console.log('audioCtx', audioCtx);
    console.log(e);

    getPeaksAtThreshold(filteredBuffer, .8)
}

function getPeaksAtThreshold(data, threshold) {
    var peaksArray = [];
    console.log('data', data);
    for(let i = 0; i < data.length;) {
        // console.log('i', data[i]);
        if (data[i] > threshold) {
            peaksArray.push(i);
            i += 10000; // advance ~0.25s past the peak
        }
        i++;
    }
    console.log('peaks array', peaksArray);
    return peaksArray;
}












// extra

// not used yet- used for getting genre information
async function getTrackInfo(fullURL) {
    let trackIDRequest = await axios.get(fullURL);
    let trackIDURI = trackIDRequest['data']['uri'];
    let trackIDURL = `${trackIDURI}?client_id=${CLIENT_ID}`;
    let metaRequest = await axios.get(trackIDURL);
    let metaData = metaRequest['data'];
}