const _get = async (url) => {
    console.log('fetching', url)
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    let response = await fetch(
        url,
        {
            method: 'GET',
            headers: headers,
        }
    )
    let resJSON = await response.json() 
    return resJSON
}