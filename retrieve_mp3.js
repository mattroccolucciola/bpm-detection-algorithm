track_id = 170734376;
CLIENT_ID = '6aSX01kZxpetA85mf5R9Ezqs3ozjO2zc';
AudioContext = window.AudioContext || window.webkitAudioContext;
OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext
audioCtx = new AudioContext();

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
    mp3URL = await getMP3Path();

    // analyze the bpm
    //mp3URL = './waiting-so-long.mp3'
    analyzeSongBPM(mp3URL);
};

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
    streamData = await pullMp3URL(fullUrl);
    MP3Path = streamData['request']['responseURL']
    return MP3Path
}

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

// get the asset from servers
async function pullMp3URL(url) {
    info = await axios.get(url);
    streamURL = info['data']['stream_url'] + `?client_id=${CLIENT_ID}`;
    return await axios.get(streamURL);
}

// done with first part of script, now analyze
function analyzeSongBPM(mp3URL) {
    console.log(mp3URL);
    
    request = buildRequest(mp3URL)
    request.onload = decodeAndAnalyzeBuffer;
    request.send();
}

function buildRequest(mp3URL) {
    audioCtxSrc = audioCtx.createBufferSource();
    let _request_ = new XMLHttpRequest();
    _request_.open('GET', mp3URL, true);
    _request_.responseType = 'arraybuffer';
    return _request_
}

// decode the buffer and analyze it
function decodeAndAnalyzeBuffer() {
    let audioData = request.response;
    audioCtx.decodeAudioData(
        audioData,
        decodeThenAnalyzeBuffer,
        function(e){ console.log("Error with decoding audio data" + e.err); }
    );
}

function decodeThenAnalyzeBuffer(buffer) {
    offlineContext = decodeBuffer(buffer);
    offlineContext.oncomplete = renderBufferAndCalcBPM;
}

function decodeBuffer(_buffer_) {
    // connect AudioContext node to the source object
    audioCtxSrc.buffer = _buffer_;
    audioCtxSrc.connect(audioCtx.destination);
    audioCtxSrc.loop = true;
    let offlineContext = new OfflineAudioContext(1, _buffer_.length, _buffer_.sampleRate);
    let oSource = offlineContext.createBufferSource();
    oSource.buffer = _buffer_;
    let filter = offlineContext.createBiquadFilter();
    filter.frequency.value = 150;
    filter.type = "lowpass";
    oSource.connect(filter);
    filter.connect(offlineContext.destination);
    oSource.start(0);
    offlineContext.startRendering();
    return offlineContext;
}

function calculateBPM(audioBufferArray) {
    arrMax = audioBufferArray.reduce((max, value) => value > max ? value : max, audioBufferArray[0]);
    arrMin = audioBufferArray.reduce((min, value) => value < min ? value : min, audioBufferArray[0]);

    // set initial threshold, to be reduced via while loop
    let thresholdPct = 0.9;
    let threshold = arrMin + ((arrMax - arrMin) * thresholdPct);
    
    // get the array of peak locations, borrowed from https://stackoverflow.com/a/30112800
    let peaksArr = getPeaksAtThreshold(audioBufferArray, threshold);
    let intervalCountArr = countIntervalsBetweenNearbyPeaks(peaksArr);
    let tempoCountArr = groupNeighborsByTempo(intervalCountArr);
    console.log(threshold, arrMin, arrMax);
    console.log('peaks', peaksArr);
    console.log('intervalCounts', intervalCountArr);
    console.log('tempoCounts', tempoCountArr);
    
    tempoCountArr.sort(function(a, b) {
        return b.count - a.count;
    });

    weightedAvg = calcWeightedAvg(tempoCountArr);

    if (tempoCountArr.length) {
        console.log(tempoCountArr[0].tempo, weightedAvg);
        //output.innerText = tempoCountArr[0].tempo;
    };
}

function renderBufferAndCalcBPM(offlineAudioCompletionEvent) {
    let filteredBuffer = offlineAudioCompletionEvent.renderedBuffer;

    // If you want to analyze both channels, use the other channel later
    let audioBufferArray = filteredBuffer.getChannelData(0);

    // algo to calculate bpm
    calculateBPM(audioBufferArray);
};

function getPeaksAtThreshold(_audioBufferArray_, _thresh_) {
    var peaksArray = [];
    for (let i = 0; i < _audioBufferArray_.length; i++) {
        if (_audioBufferArray_[i] > _thresh_) {
            peaksArray.push(i); // if value > threshold, it's a peak -> add the index of this value to list
            i += (0.25 * 44100);
        }
    }
    return peaksArray;
}
function countIntervalsBetweenNearbyPeaks(_peaksArr_) {
    let intervalCountArray = [];
    _peaksArr_.forEach(function(_peak_, idx) {
        for (let i = 0; i < 10; i++) {
            let interval = _peaksArr_[idx + i] - _peak_;
            let foundInterval = intervalCountArray.some(function(intervalCount) {
                if (intervalCount.interval === interval) return intervalCount.count++;
            });
                //Additional checks to avoid infinite loops in later processing
            if (!isNaN(interval) && interval !== 0 && !foundInterval) {
                intervalCountArray.push({'interval': interval, 'count': 1});
            }
        }
    });
    return intervalCountArray;
}
function groupNeighborsByTempo(_intervalCountArr_) {
    let tempoCountArray = [];
    _intervalCountArr_.forEach(function(intervalCount) {
        
        //Convert interval to tempo
        let theoreticalTempo = 60 / (intervalCount.interval / 44100);
        theoreticalTempo = Math.round(theoreticalTempo);
        if (theoreticalTempo === 0) {return}
        
        //Adjust tempo to fit within the 90-180 BPM range
        while (theoreticalTempo < 80 ) theoreticalTempo *= 2;
        while (theoreticalTempo > 160) theoreticalTempo /= 2;
    
        let foundTempo = tempoCountArray.some(function(tempoCount) {
            if (tempoCount.tempo === theoreticalTempo) return tempoCount.count += intervalCount.count;
        });
        if (!foundTempo) {
            tempoCountArray.push({
            tempo: theoreticalTempo,
            count: intervalCount.count
            });
        }
    });
    return tempoCountArray;
}
function calcWeightedAvg(listOfDicts) {
    let countSum = 0;
    listOfDicts.forEach(element => {
        countSum += element['count'];
    });
    l = listOfDicts[0];

    let j = 0;
    for (elem in l) {
        if (j === 0) {target=elem} else if (j === 1) {count=elem}; j++
    }
    let weightedAvg = 0;
    for (let i = 0; i < listOfDicts.length; i++) {
        const element = listOfDicts[i];
        let targetVal = element[target];
        let countWeight = element[count] / countSum;
        weightedAvg += targetVal * countWeight;
    }
    return weightedAvg
}