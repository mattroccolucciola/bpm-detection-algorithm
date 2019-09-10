# Audio-Analysis-Beat-and-Genre-Detection
This project takes SoundCloud songs (via URL) and returns a BPM using soundwave analysis

DESCRIPTION
- user will be able to enter the url of a song of their choice (into an input box)
- URL will query the song information via string manipulation to yield a viable api call
    - through this I will save info locally and retrieve audio file
    -  https://developers.soundcloud.com/docs/api/reference#tracks
- the audio will be analyzed using a beat detection algorithm, which will output a BPM
- BPM will be displayed alongside the song information


WIREFRAME
![](./site-main.png)
![](./site-search.png)


PRIORITY MATRIX
![](./priority_matrix.jpeg)


API SAMPLE
![](./api_sample.png)


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

HTML design
est 30 minutes

CSS Structuring
est 30 minutes

JS for base site (element (re)positioning and displaying info from beat/genre detection alos)
est 30 minutes

