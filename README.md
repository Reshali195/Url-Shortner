# URL Shortener Microservice
In this Project You have to type url of any webpage/website and then click on the post botton then you receive an json :-( "short_url":1) according to which 
you can symply redirect to your website without typing url again and again


### Deploy it to Glitch
[https://feather-option.glitch.me/](https://url-shortener-fccmicroservice.glitch.me/)

### User Story
+ I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON response. Example : {"original_url":"www.google.com","short_url":1}
+ If I pass an invalid URL that doesn’t follow the valid http(s)://www.example.com(/more/routes) format, the JSON response will contain an error like {"error":"invalid URL"}. HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.
+ When I visit the shortened URL, it will redirect me to my original link.


