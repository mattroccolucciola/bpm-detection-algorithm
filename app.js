CLIENT_ID = '6aSX01kZxpetA85mf5R9Ezqs3ozjO2zc';
titleElem = document.querySelector('.song-title');
titleText = document.querySelector('#song-title');
genreElem = document.querySelector('.orig-genre');
genreText = document.querySelector('#orig-genre');
imgElem = document.querySelector('.img');
imgText = document.querySelector('#img');
releaseDateText = document.querySelector('#release-date');
outputElem = document.querySelector('.output');
/*
this script is for getting and displaying the song information

Algo:
1. get the song title element
2. get the genre element
3. call the api for song info
4. display the song info and genre
*/

// main function
function main() {
    let submitButton = document.querySelector('#getURL');

    // the entire script basically needs to be assigned to the submit button
    submitButton.addEventListener('click', getSongInfoOnClick)
}
main()

function displayInfo(_songInfo_) {
    titleText.innerText = _songInfo_['title'];
    imgText.setAttribute('src', _songInfo_['img']);
    genreText.innerText = _songInfo_['genre'];
    releaseDateText.innerText = _songInfo_['release_date'];
    outputElem.style.visibility = 'visible';
}

function displayLoading_(progress) {
    if ((!progress) || (progress === 0)) {
        titleText.innerText = 'Loading';
        genreText.innerText = 'Loading';
        imgText.innerText = 'Loading';
        releaseDateText.innerText = 'Loading';
    }

    // change the styling
    document.querySelector('.intro').style.visibility = 'hidden';
    document.querySelector('header').className = 'search';
    document.querySelector('main').className = 'search';
    document.querySelector('.input').className = 'input search';
}

async function getSongInfoOnClick(event) {
    // prevent default
    event.preventDefault();

    // show that query is in progress
    displayLoading_();

    // get the song info
    songInfo = await getSongInfo();
    displayInfo(songInfo);
};

async function getSongInfo() {
    /*
    https://soundcloud.com/petitbiscuit/we-were-young-robotaki-remix
    https://soundcloud.com/skrillex/skrillex-feat-beam-mumbai-powe
    https://soundcloud.com/skrillex/skrillex-feat-alvin-risk-fuji-opener
    https://soundcloud.com/skrillex/skrillex-bangarang-feat-sirah
    https://soundcloud.com/inspected/sam-gellaitry-waiting-so-long
    */

    // get the text from the input field
    let trackURL = mungUserInput()
    if (trackURL === '') {alert('please enter valid url')}

    // get the track id via the main url
    let fullUrl = `https://api.soundcloud.com/resolve?url=${trackURL}&client_id=${CLIENT_ID}`

    // mung the page source, get the url for making api call
    songInfo = await pullMp3URL_(fullUrl);
    return songInfo
}

// process input from user and parse & clean it
function mungUserInput() {
    let submitField = document.querySelector('#url');
    let userInput = submitField.value;
    userInput = 'https://soundcloud.com/inspected/sam-gellaitry-waiting-so-long';

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

// get the assets from servers
async function pullMp3URL_(url) {
    let ApiInfo = await axios.get(url);
    let infoData = ApiInfo['data'];
    console.log('infoData', infoData);

    // image
    let imgPathPre = infoData['artwork_url'];
    let imgPath = imgPathPre.replace('large', 't500x500');

    let info = {
        'img'  : imgPath,
        'title': infoData['title'],
        'permalink': infoData['permalink_url'],
        'release_date': infoData['created_at'],
        'genre': infoData['genre'],
    };
    return info;
}