# url-metadata-scrapper

## POST API

#### Endpoint : https://mhp0k4u2z0.execute-api.us-east-1.amazonaws.com/dev/ <br />

### Sample request body: 
`{
    "url": "https://github.com/"
 }` <br />

### Sample response body : 
`{
    "data": {
        "viewport": "width=device-width, initial-scale=1",
        "og:site_name": "Test",
        "og:title": "Test",
        "og:url": "https://www.test.com",
        "og:type": "website",
        "og:image": "https://test.com/static/logo/zh_tagline_light.png",
        "og:image:width": "220",
        "og:image:height": "220",
        "name": "Zonehaven",
        "url": "https://www.test.com",
        "thumbnailUrl": "https://test.com/static/logo/zh_tagline_light.png",
        "image": "https://test.com/static/logo/zh_tagline_light.png",
        "twitter:title": "Test",
        "twitter:image": "https://test.com/static/logo/zh_tagline_light.png",
        "twitter:url": "https://www.test.com",
        "twitter:card": "summary",
        "title": "Test Title",
        "keywords": "Evacuation Management, Community Evacuation, Evacuation Software, Evacuation Platform, Wildfire Evacuation Tool",
        "description": "Zonehaven provides a system of two interconnected applications that bridge the gap between first responders and community members. Learn more about the work we are doing to improve the evacuation process.",
        "robots": "index,nofollow",
        "next-head-count": "25"
    }
}
`
