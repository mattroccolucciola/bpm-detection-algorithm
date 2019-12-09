# Audio-Analysis-Beat-and-Genre-Detection

This project takes SoundCloud songs (via URL) and returns a BPM using soundwave analysis
Due to recent changes in SoundCloud authorization policies, pulling mp3 files requires
a code refactor (read: more API reverse-engineering). Unfortunately, the BPM detection algo cannot work without mp3s,
so I've included a sample file for you to test.

DESCRIPTION
- user will be able to enter the url of a song of their choice (into an input box)
- URL will query the song information via string manipulation to yield a viable api call
    - through this I will save info locally and retrieve audio file
    -  https://developers.soundcloud.com/docs/api/reference#tracks
- the audio will be analyzed using a beat detection algorithm, which will output a BPM
- BPM will be displayed alongside the song information


WIREFRAME
![](./images/site-main.png)
![](./images/site-search.png)


PRIORITY MATRIX
![](./images/priority_matrix.jpeg)


API SAMPLE
![](./images/api_sample.png)


MVP
- website with aesthetic formatting
- submit button for soundcloud url
- Beat detection algorithm working
    - pulls audio from soundcloud song provided in url
    - analyzes an audio sample
    - determines BPM
    - returns BPM


PMVP
- Genre detection
- Check if genre is real
- Genre change if BPM does not reflect labeled genre


TIMELINE

| Component        | Priority | Estimated Time | Time Invested | Time ∆   |
| :-------------:  | :------: | :------------: | :-----------: | :------: |
| HTML Design      |    L     |    30 Min      |    20 min     | -10 min  |
| CSS Structuring  |    L     |    30 Min      |   510 min     | |
| JS for base site |    L     |    30 Min      |     0 min     | |
| Pull MP3 - algo  |    H     |   120 Min      |   355 min     | +235 min |
| Analyze BPM algo |    H     |   360 Min      |   525 min     | +165 min |
| Genre label algo |    L     |   120 Min      |    85 min     | |
| Genre BPM algo   |    L     |    90 Min      |     0 min     | |
|     TOTAL        |   N/A    |   780 Min      |   915 min     | +390 min |



Code Snippet
async function getMP3Path() {
    // get the text from the input field
    let trackURL = mungUserInput()

    // get the track id via the main url
    let fullUrl = `https://api.soundcloud.com/resolve?url=${trackURL}&client_id=${CLIENT_ID}`

    // mung the page source, get the url for making api call
    streamData = await pullMp3URL(fullUrl);
    MP3Path = streamData['request']['responseURL']
    return MP3Path
}