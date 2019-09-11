track_id = 170734376;
CLIENT_ID = '6aSX01kZxpetA85mf5R9Ezqs3ozjO2zc';

let trackPerma = 'https://soundcloud.com/petitbiscuit/we-were-young-robotaki-remix'


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

async function pullMp3(url) {
    info = await axios.get(url);
    streamURL = info['data']['stream_url'] + `?client_id=${CLIENT_ID}`;
    streamData = await axios.get(streamURL);
    return streamData['request']['responseURL'];
}

/*
https://soundcloud.com/petitbiscuit/we-were-young-robotaki-remix
*/
// get the mp3
async function getMP3 (event) {
    // prevent default
    event.preventDefault();

    // delete this line, its for testing only
    document.querySelector('#url').value = 'https://soundcloud.com/petitbiscuit/we-were-young-robotaki-remix';
    // document.querySelector('#url').value = 'https://soundcloud.com/inspected/sam-gellaitry-waiting-so-long';

    // get the text from the input field
    let trackURL = mungUserInput()

    // get the track id via the main url
    let fullUrl = `https://api.soundcloud.com/resolve?url=${trackURL}&client_id=${CLIENT_ID}`
    
    // mung the page source, get the url for making api call
    mp3URL = await pullMp3(fullUrl);
    console.log(mp3URL);
    console.log('hi');
    
    
    





    // test (below)
    
    // test (above)






    // let trackIDRequest = await axios.get(trackURL, {
    //         headers: {
                
    //         },
    //     });
    // console.log(trackIDRequest);
    

    let info = {};
    // let response;
    
    // response = await axios.get(
    //     `"https://api.soundcloud.com/tracks/${track_id}?client_id=${CLIENT_ID}"`
    // );
    // console.log(response);
    // return response
};



// main function
function main() {
    let submitButton = document.querySelector('#getURL');

    // the entire script basically needs to be assigned to the submit button
    submitButton.addEventListener('click', getMP3)
    
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