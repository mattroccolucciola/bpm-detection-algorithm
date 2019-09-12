track_id = 170734376;
CLIENT_ID = '6aSX01kZxpetA85mf5R9Ezqs3ozjO2zc';

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
async function pullMp3(url) {
    info = await axios.get(url);
    streamURL = info['data']['stream_url'] + `?client_id=${CLIENT_ID}`;
    return await axios.get(streamURL);
    return streamData['request']['responseURL'];
}

// get the mp3
async function getMP3Path () {
    // delete this line, its for testing only
    document.querySelector('#url').value = 'https://soundcloud.com/petitbiscuit/we-were-young-robotaki-remix';
    // document.querySelector('#url').value = 'https://soundcloud.com/inspected/sam-gellaitry-waiting-so-long';

    // get the text from the input field
    let trackURL = mungUserInput()

    // get the track id via the main url
    let fullUrl = `https://api.soundcloud.com/resolve?url=${trackURL}&client_id=${CLIENT_ID}`

    // mung the page source, get the url for making api call
    streamData = await pullMp3(fullUrl);
    return streamData
}

function createBuffers(node) {
    var context = window.AudioContext || window.webkitAudioContext
    context = new context
    request = new XMLHttpRequest();
    request.open('GET', node['request']['responseURL'], true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        let audioData = request.response;
        context.decodeAudioData(audioData, function(buffer) {
            dogBarkingBuffer = buffer;
            console.log('buffer');
            console.log(buffer);
        });
    }
    request.send();


















    // var context = window.AudioContext || window.webkitAudioContext
    // // Fetch Audio Track via AJAX with URL
    // request = new XMLHttpRequest();
    // await request.open('GET', url, true);
    // request.responseType = 'arraybuffer';
    // request.onload = async function() {
    //     let audioData = request.response;
    //     console.log(request);
        
    //     console.log(audioData);
        
        
    //     await context.decodeAudioData(audioData, function(buffer) {
    //         dogBarkingBuffer = buffer;
    //     });
    // }
    // request.send();

















    // request.onload = function(ajaxResponseBuffer) {
   
    //     // Create and Save Original Buffer Audio Context in 'originalBuffer'
    //     var AudioContext = window.AudioContext || window.webkitAudioContext
    //     var OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext
        
    //     var audioCtx = new AudioContext();
        
    //     var songLength = ajaxResponseBuffer.total;
    
    //     // Arguments: Channels, Length, Sample Rate
    //     var offlineCtx = new OfflineAudioContext(1, songLength, 44100);
    //     source = offlineCtx.createBufferSource();
        
    //     var audioData = request.response;
    //     console.log('audioData');
    //     console.log(ajaxResponseBuffer);
    //     audioCtx.decodeAudioData(audioData, function(buffer) {
    
    //         window.originalBuffer = buffer.getChannelData(0);
    //         var source = offlineCtx.createBufferSource();
    //         source.buffer = buffer;

    //         // Create a Low Pass Filter to Isolate Low End Beat
    //         var filter = offlineCtx.createBiquadFilter();
    //         filter.type = "lowpass";
    //         filter.frequency.value = 140;
    //         source.connect(filter);
    //         filter.connect(offlineCtx.destination);
    //         console.log(offlineCtx);
            
    //         // Render this low pass filter data to new Audio Context and Save in 'lowPassBuffer'
    //         offlineCtx.startRendering().then(function(lowPassAudioBuffer) {

    //             var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    //             var song = audioCtx.createBufferSource();
    //             song.buffer = lowPassAudioBuffer;
    //             song.connect(audioCtx.destination);

    //             // Save lowPassBuffer in Global Array
    //             window.lowPassBuffer = song.buffer.getChannelData(0);
    //             console.log("Low Pass Buffer Rendered!");
    //         });

    //     },
    //     function(e) {});
    // }
    // request.send();
}
    
   
   

function analyzeMP3BPM(mp3Path) {
    // Create offline context
    var offlineContext = new OfflineAudioContext(1, 1000000, 44100);

    // Create buffer source
    var source = offlineContext.createBufferSource();
    source.buffer = buffer;

    // Create filter
    var filter = offlineContext.createBiquadFilter();
    filter.type = "lowpass";

    // Pipe the song into the filter, and the filter into the offline context
    source.connect(filter);
    filter.connect(offlineContext.destination);

    // Schedule the song to start playing at time:0
    source.start(0);

    // Render the song
    offlineContext.startRendering()

    // Act on the result
    offlineContext.oncomplete = function(e) {
        // Filtered buffer!
        var filteredBuffer = e.renderedBuffer;
    };
}

// full function
async function getAndAnalyzeMP3 (event) {
    // prevent default
    event.preventDefault();

    // get the mp3 path
    streamData = await getMP3Path();
    console.log(streamData);
    
    // analyze the bpm
    // mp3Path = './waiting-so-long.mp3'
    createBuffers(streamData);
    // bpm = analyzeMP3BPM(mp3Path);
};

// main function
function main() {
    let submitButton = document.querySelector('#getURL');

    // the entire script basically needs to be assigned to the submit button
    submitButton.addEventListener('click', getAndAnalyzeMP3)
    
}

main()












// extra

// not used yet- used for getting genre information
async function getTrackInfo(fullURL) {
    let trackIDRequest = await axios.get(fullURL);
    let trackIDURI = trackIDRequest['data']['uri'];
    let trackIDURL = `${trackIDURI}?client_id=${CLIENT_ID}`;
    let metaRequest = await axios.get(trackIDURL);
    let metaData = metaRequest['data'];
}

async function getSoundInfo (track_id) {
    response = await axios.get(
        `"https://api.soundcloud.com/tracks/${track_id}?client_id=${CLIENT_ID}"`
    );
    return response
}