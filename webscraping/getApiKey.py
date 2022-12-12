# from html:
selector = ".webAuthContainerWrapper.hidden > iframe"
selector_attr = "src"

# use the selector and attr to get the key within <iframe src="..."> element
html_with_api_key = ""

# bookended by "https://secure.soundcloud.com/web-auth?client_id=" and "&amp;device_id="
api_key_str = (
    html_with_api_key.split("https://secure.soundcloud.com/web-auth?client_id=")[1]
    .split("device_id=")[0]
    .split("&")[0]
)
