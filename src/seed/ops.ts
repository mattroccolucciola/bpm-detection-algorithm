/**
 * THIS IS THE API: https://developers.soundcloud.com/docs/api/explorer/open-api#/miscellaneous/get_resolve
 * Played a song:
 * https://soundcloud.com/liltecca/faster
 *
 * Checked network requests to find signed txn:
 * https://cf-hls-media.sndcdn.com/media/159660/1436524/1596184/zlobEAQSXVfu.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovemxvYkVBUVNYVmZ1LjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NjEyNzU0MDV9fX1dfQ__&Signature=KNTSH0zTKCSUju5Wg4Wu987bKg-i~6g9CaWWLbN82ekzmH~tJtGpgxTTLRBftLtX4HihQH6CXelMyj-jzcApSwFIzlX2kAhXFUYEy-oTCGxnUobk3tuPJELu2PsLQVvwwEVHl3nyjGFpVoxO8A-ltM5I8S~4WGTLg-2jTNWude3eWCK8w3xKJBxuVxQN-~cZIo1j2E5iTaoRUiiHAzxvRexWHK6PZC556-nwcsWaxZRuHrjLogCGipjUkb4cpqPsYdfEugJNiX0I2IOSj2Yllykpp7eNkq~NGl5DMteuQ4aizIlbGzZP1N-5I8R-H3dcU1aOxK9OtbqpuxzSQUz2Yg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
 *
 *  // Got the api key: APKAI6TU7MMXM5DG6EPQ
 *  // Policy    = eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovemxvYkVBUVNYVmZ1LjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NjEyNzU0MDV9fX1dfQ__
 *  // Signature = KNTSH0zTKCSUju5Wg4Wu987bKg-i~6g9CaWWLbN82ekzmH~tJtGpgxTTLRBftLtX4HihQH6CXelMyj-jzcApSwFIzlX2kAhXFUYEy-oTCGxnUobk3tuPJELu2PsLQVvwwEVHl3nyjGFpVoxO8A-ltM5I8S~4WGTLg-2jTNWude3eWCK8w3xKJBxuVxQN-~cZIo1j2E5iTaoRUiiHAzxvRexWHK6PZC556-nwcsWaxZRuHrjLogCGipjUkb4cpqPsYdfEugJNiX0I2IOSj2Yllykpp7eNkq~NGl5DMteuQ4aizIlbGzZP1N-5I8R-H3dcU1aOxK9OtbqpuxzSQUz2Yg__
 *  // kp        = APKAI6TU7MMXM5DG6EPQ
 * After about 5 minutes, this link does not work anymore
 * Now were left with:
 *    https://cf-hls-media.sndcdn.com/media/159660/1436524/1596184/zlobEAQSXVfu.128.mp3?Policy={policyStr}&Signature={signatureStr}&Key-Pair-Id={kp}
 *  // d
 *
 */
export {};

/**
 *
 */
//  URL: https://cf-hls-media.sndcdn.com/media/159660/1755845/1915505/zlobEAQSXVfu.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovemxvYkVBUVNYVmZ1LjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NjEyNzU5MTR9fX1dfQ__&Signature=Ich-2kUxvqt1bo63nn9auh8G~L5ES0s9HTyl~VgmPZHpxQWn6EfBUk6itw-WUHqq1hxLWTRam2aG0yoFXUwS0o0FW1ADsR9IsvJYg6oyTT-qNVsLCxMt~nFfQ8mZCQq6~djEuWvM7R~fKCO5FbrgUpZ5Ku5Z8K2JmStqRPE4~zjXhFp~fPgWkV7k2hL7rYL3PYnYmMRe2rktRk5Qs9wK-e~10lDeEASC787g7Q3uCN2YP4b7d572glCxgC3kLy57Hl2~W4zuicQx8BIATlYrqAZzXsD~Rj0MxhosA8oWRzIZubheYPrdRsu5DJf-AZCneEP2im7~g5Rd1Ty6siu-Lg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
//  Status: 206
//  Source: Network
//  Address: 52.85.61.98:443

//  Request
//  :method: GET
//  :scheme: https
//  :authority: cf-hls-media.sndcdn.com
//  :path: /media/159660/1755845/1915505/zlobEAQSXVfu.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovemxvYkVBUVNYVmZ1LjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NjEyNzU5MTR9fX1dfQ__&Signature=Ich-2kUxvqt1bo63nn9auh8G~L5ES0s9HTyl~VgmPZHpxQWn6EfBUk6itw-WUHqq1hxLWTRam2aG0yoFXUwS0o0FW1ADsR9IsvJYg6oyTT-qNVsLCxMt~nFfQ8mZCQq6~djEuWvM7R~fKCO5FbrgUpZ5Ku5Z8K2JmStqRPE4~zjXhFp~fPgWkV7k2hL7rYL3PYnYmMRe2rktRk5Qs9wK-e~10lDeEASC787g7Q3uCN2YP4b7d572glCxgC3kLy57Hl2~W4zuicQx8BIATlYrqAZzXsD~Rj0MxhosA8oWRzIZubheYPrdRsu5DJf-AZCneEP2im7~g5Rd1Ty6siu-Lg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
//  Accept: */*
//  Connection: Keep-Alive
//  Range: bytes=0-1
//  Host: cf-hls-media.sndcdn.com
//  Accept-Language: en-US,en;q=0.9
//  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Safari/605.1.15
//  Referer: https://cf-hls-media.sndcdn.com/media/159660/1755845/1915505/zlobEAQSXVfu.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovemxvYkVBUVNYVmZ1LjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NjEyNzU5MTR9fX1dfQ__&Signature=Ich-2kUxvqt1bo63nn9auh8G~L5ES0s9HTyl~VgmPZHpxQWn6EfBUk6itw-WUHqq1hxLWTRam2aG0yoFXUwS0o0FW1ADsR9IsvJYg6oyTT-qNVsLCxMt~nFfQ8mZCQq6~djEuWvM7R~fKCO5FbrgUpZ5Ku5Z8K2JmStqRPE4~zjXhFp~fPgWkV7k2hL7rYL3PYnYmMRe2rktRk5Qs9wK-e~10lDeEASC787g7Q3uCN2YP4b7d572glCxgC3kLy57Hl2~W4zuicQx8BIATlYrqAZzXsD~Rj0MxhosA8oWRzIZubheYPrdRsu5DJf-AZCneEP2im7~g5Rd1Ty6siu-Lg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
//  Accept-Encoding: identity
//  X-Playback-Session-Id: 3ECDBB8B-0124-4A6F-AE72-4E45893D29EE

//  Response
//  :status: 206
//  Content-Type: audio/mpeg
//  Access-Control-Allow-Origin: *
//  Age: 31823
//  Via: 1.1 99b519fb7ca87e7fd6040aacb1160452.cloudfront.net (CloudFront)
//  Access-Control-Allow-Methods: GET, OPTIONS
//  Access-Control-Allow-Headers: Accept, Authorization, Content-Type, Origin, X-SC-Auth
//  Date: Tue, 23 Aug 2022 08:38:38 GMT
//  Content-Length: 2
//  Accept-Ranges: bytes
//  Content-Range: bytes 0-1/159661
//  x-amz-cf-id: gtP_F7Goa4tTKykSHSLfkfiVIjjethTeSp_hNdv0J0oTzCUBbtZ4lA==
//  Server: am/2
//  x-amz-cf-pop: EWR53-P1
//  allow: GET, OPTIONS
//  Strict-Transport-Security: max-age=63072000
//  x-cache: Hit from cloudfront

/**

 THEN LOOKED AT THE PLAYLIST.m3:
 https://cf-hls-media.sndcdn.com/playlist/zlobEAQSXVfu.128.mp3/playlist.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL3BsYXlsaXN0L3psb2JFQVFTWFZmdS4xMjgubXAzL3BsYXlsaXN0Lm0zdTgqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxMjc2OTM3fX19XX0_&Signature=Vpsm6zQDXvJ5Y8sy4NbcICgqB6DH3R5igzYc2S1~ngQ-XwR~zMxYppgU5NQ2V7CyRJmnoHDiKBWIn5h4VKfVUW-2J9YspjpCVig4qdOTXqsFjDOjOwme9RDIfeCIc8JkhNg1CQS59OPPZZdzEDYjyGHtiHKOSYIcgeRjlS8PIopHW6~pPKKI5se~7kpNnscansCwsVqPLJoWP2WIDgK8nOEi-OwNoH1JLLiHqrgXlwAZ0YggdTX~4SdZaKS1ZGc~p~rTlsQ31UqmgfzBjYjkETeVwr6BJpaECZAYwM7bGzBeTgl1HFwuYDrR2m~XJL7W3jz2VAkxT92GCez8f7NJYw__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ&track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI3NjY4Nn0.IqnQXjxT8qPyEM6L4A20JLCYDH0OwMu44yrRoJu5rWM


// "hls" request in network tab 
// JUST REALIZED AFTER SENDING THE BELOW 'RELATED?ANON_USER_ID' REQUEST: I CAN HIT THIS ENDPOINT MULTIPLE TIMES TO GET A NEW SIGNATURE
 sending this: https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/b6705d26-a662-499e-8c4b-1e922b59475c/stream/hls?client_id=lnFbWHXluNwOkW7TxTYUXrrse0qj1C72&track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI3NjY4Nn0.IqnQXjxT8qPyEM6L4A20JLCYDH0OwMu44yrRoJu5rWM
 client_id: lnFbWHXluNwOkW7TxTYUXrrse0qj1C72
track_authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI3NjY4Nn0.IqnQXjxT8qPyEM6L4A20JLCYDH0OwMu44yrRoJu5rWM

  RESPONSE
 gets me this: {"url":"https://cf-hls-media.sndcdn.com/playlist/zlobEAQSXVfu.128.mp3/playlist.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL3BsYXlsaXN0L3psb2JFQVFTWFZmdS4xMjgubXAzL3BsYXlsaXN0Lm0zdTgqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxMjc3MjM5fX19XX0_&Signature=MKEgPIBUekvnLaxaTiNvHSMyl5j25sMlcgV9c5XyCrAzzXyhnWk7f5xxUGJ8rfVI2aHtVV8LWPNMyByV-z~gkwzdrhhtTirEkhyU2myb-0Qsv~gFgviyvRqLh~xlQTzw54ZFTnFMe1Qgzu7ye808YKBcZpvfsunx6NgAmteNfgiquKICxX-Lf0Sr1WYHMriZGV7yu8bSDBwcBlLFeCebaZLN7sWv73E~bj6ajNgy2Cgyh5nD6bKFzWTlskpK0mIhYi0yy-Ux7GU5lt1zGIgY4sxLVLehPNzmGD5ds2U409vJwMMfNDfPZh3h4oqyfFsvZXi8y-VNlxQ21tslIMMLrA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ&track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI3NjY4Nn0.IqnQXjxT8qPyEM6L4A20JLCYDH0OwMu44yrRoJu5rWM"}

 https://cf-hls-media.sndcdn.com/media/159660/0/31762/zlobEAQSXVfu.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovemxvYkVBUVNYVmZ1LjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NjEyNzY5Mzd9fX1dfQ__&Signature=O9HZ969EaWnZrlN34eaN5YZcCPUgcNF28HtCC7mKnV9610-Octqpwi4lp-XwclPC6DzUtjzMLEo6jhW5XiKZYRFlpNgpgZL-YeLv9toRh2B-U4ksnbY~q4KRZLonRqIBXeIlpCLHIQ8OWHwlhpRAGMzPcHRWsY3xSVWXRV4A2lyzipgCxhzfup4ydkvPfvM7qb45ir2Va~g2INtSgD3ZJAyxTPvXi6P9NVdgwrgV3se9pW0kZmxaxovbxPOqRoyiPGkDr~ddA-9dt3PxDSupiJsl-yjiyOoHeD630pteSTpFdLkXu3W6wQ9C9B0F6O6JP7S1GGcDP59szjm6v87yzQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ




 I THINK THIS IS IT - on the "related" request on soudcloud.com/liltecca/faster:
 I TRIED THIS LINK: https://api-v2.soundcloud.com/tracks/1317984667/related?anon_user_id=15079866&client_id=lnFbWHXluNwOkW7TxTYUXrrse0qj1C72&limit=10&offset=0&linked_partitioning=1&app_version=1660899819&app_locale=en

 
 
//  REPEATEDLY CALLING THIS: thought this worked, but it gets stale: https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/stream/hls?client_id=lnFbWHXluNwOkW7TxTYUXrrse0qj1C72&track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI3NjY4Nn0.IqnQXjxT8qPyEM6L4A20JLCYDH0OwMu44yrRoJu5rWM
//  GETS ME A FRESH SIGNATURE AND RETURNS A READY-TO-GO LINK AYAYAYAYA
// BUT
// BUT
// BUT
// I STILL NEED THE MP3
// 
// WHICH I CAN GET HERE
// https://cf-hls-media.sndcdn.com/media/159660/0/31762/zlobEAQSXVfu.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovemxvYkVBUVNYVmZ1LjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NjEyNzgyMTd9fX1dfQ__&Signature=P78csZeaaOi~Y7MI6OkStFvQPuQDkFxnhXQ7y-AK1njnmoj0IzaQdkNAWZZUYxvQWbL5sJUs4QZYLpwLcWV4QObHxmhlhAjn4DF52YZTbQiWCTQG8jqFcYb8cNhppNGcx~LE2dvWtkiCL5iU5D-~eu7pPcor3harF3NETrtDfG8YzNaj6UHoAfU1XnC6mECchLUj93H0LDdxUc3GyIrFGyiMgS-7jI7DgUkmYY59OEn4HWc6WDVoxVnwc2k5gRety6uyjlKiL0bIdv8Co~tP-VDIJ-0rJgvrOiepboTSiRTkkkjtIcD9pc7h98jn3d1jx8UBtqrZpC6eQKeKHu5nQQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
https://cf-hls-media.sndcdn.com/media/159660/1276864/1436523/zlobEAQSXVfu.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovemxvYkVBUVNYVmZ1LjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NjEyNzg0Mzd9fX1dfQ__&Signature=H5U3bZUVuG8AWOLRLtFZ4Lvm1tEdyPjXevWLzwqLkUgCjkYpyAEfyxqAeESwyl0mBTLaR8cPIX9l~oNTsBddkfhc3wqdKVEINsJpgAo9vceDjCVj5Z8HJHW3Uk1ZrvvxbBITcAvKB75qaImN13fzVGPhld6pm~z458RqJZRdMYKbFtw-raxNCsjOOVCY6Oe9dD-2XPJBuNIBm5Lo7cUwOZ6ZGD3NeVKTZEbS3mB8hEJwVp2Vti4Eh1FW91jvTt7hacYXsiNKkhuufPC3Hqv~tPHaBW9Gm37XHDg0wsXnc677zmdFVDBizthMw~-Hp6BDamWlCQ6QqZPpESajtqwkhA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ


 */

/**
Further breaking down the pre-playlist request

ORIG:
https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/b6705d26-a662-499e-8c4b-1e922b59475c/stream/hls?client_id=lnFbWHXluNwOkW7TxTYUXrrse0qj1C72&track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI3NjY4Nn0.IqnQXjxT8qPyEM6L4A20JLCYDH0OwMu44yrRoJu5rWM

// Break down:
trackId = 1317984667
someHash = "b6705d26-a662-499e-8c4b-1e922b59475c"
clientId = "lnFbWHXluNwOkW7TxTYUXrrse0qj1C72"
trackAuth = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI3NjY4Nn0.IqnQXjxT8qPyEM6L4A20JLCYDH0OwMu44yrRoJu5rWM"
https://api-v2.soundcloud.com/media/soundcloud:tracks:{trackId}/{someHash}/stream/hls?client_id={clientId}&track_authorization={track_auth}


https://api-v2.soundcloud.com/resolve?url=${trackURL}&client_id=${CLIENT_ID}
https://api-v2.soundcloud.com/resolve?url=https://soundcloud.com/liltecca/faster&client_id=lnFbWHXluNwOkW7TxTYUXrrse0qj1C72

I can reliably get `someHash` from calling the orig page "https://soundcloud.com/liltecca/faster" and parsing:
URLWithSomeHash = window.__sc_hydration[6].data.media.transcodings[0].url
where window.__sc_hydration.hydratable === "sound"
mp3Value = window.__sc_hydration[6].data.waveform_url.split("https://wave.sndcdn.com/")[1].split("_m.json")[0]
 */
