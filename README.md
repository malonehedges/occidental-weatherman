# occidental-weatherman

[Actions on Google](https://developers.google.com/actions/) came out today and I wanted to test it out.

Occidental College has a weather station that is publicly accessible at [apps.oxy.edu/ws](http://apps.oxy.edu/ws/). I scrape this for the temperature and then respond to the [API.AI](https://api.ai/) webhook I set up.

I followed the [getting started tutorial with API.AI](https://developers.google.com/actions/develop/apiai/) and only ran into issues when working with async calls. Looking into the source of the actions-on-google npm package, I was able to figure out the way that async is handled.

This bot on Google Assistant isn't currently published.

## License

MIT
