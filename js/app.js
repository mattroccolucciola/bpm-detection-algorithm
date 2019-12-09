
// global vars
CLIENT_ID = 'Vu5tlmvC9eCLFZkxXG32N1yQMfDSAPAA';

// doc element selectors
titleElem = document.querySelector('.song-title');
titleText = document.querySelector('#song-title');
genreElem = document.querySelector('.orig-genre');
genreText = document.querySelector('#orig-genre');
imgElem = document.querySelector('.img');
imgText = document.querySelector('#img');
releaseDateText = document.querySelector('#release-date');
outputElem = document.querySelector('.output');
embedElem = document.querySelector('.embed');
lengthText = document.querySelector('#length');
songTitleElem = document.querySelector('.song-title');
inputElem = document.querySelector('.input');
headerElem = document.querySelector('header');

// util fxns


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
    genreText.className = 'sub';
    releaseDateText.innerText = _songInfo_['release_date'];
    releaseDateText.className = 'sub';
    outputElem.style.visibility = 'visible';
    embedElem.innerHTML = _songInfo_['embed'];
    lengthText.innerText = _songInfo_['length'];
    lengthText.className = 'sub';
    songTitleElem.style.visibility = 'visible';
    inputElem.parentElement.removeChild(inputElem);
    headerElem.appendChild(inputElem);
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
    let resJSON = await _get(url);

    // image
    let imgPathPre = resJSON['artwork_url'];
    let imgPath = imgPathPre.replace('large', 't500x500');

    // length
    let origTime = (eval(resJSON['duration']) / 1000) / 60;
    let minutes = Math.floor(origTime);
    let seconds = Math.floor((origTime - minutes) * 60)
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    let lengthStr = `${minutes}:${seconds}`;
    
    let embedURL = `<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${resJSON['id']}&color=%2350a8a8&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>`;

    let info = {
        'img'  : imgPath,
        'title': resJSON['title'],
        'permalink': resJSON['permalink_url'],
        'release_date': resJSON['created_at'],
        'genre': resJSON['genre'],
        'embed': embedURL,
        'length': lengthStr,
    };
    return info;
}