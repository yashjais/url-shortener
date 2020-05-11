const Url = require('../models/Url')
const validator = require('validator')
const BitlyClient = require('bitly').BitlyClient;
const bitly = new BitlyClient('b9fef62810d30d6dbed48ad56eec378f3b309809');

module.exports.shortner = (req, res) => {
    const body = req.body // object - containing body full info
    const { user } = req // object - containing user full info
    // console.log(validator.isURL(body.url)) // checking if the url is right

    if (validator.isURL(body.url)) {
        bitly.shorten(body.url)
            .then(function (result) {
                // console.log(result);
                const newUrl = {}
                newUrl.longUrl = body.url
                newUrl.user = user._id
                newUrl.shortenedUrl = result.link
                // console.log(newUrl)
                const url = new Url(newUrl)
                url.save()
                    .then(url => res.send(url))
                    .catch(err => res.send(err))
            })
            .catch(function (error) {
                res.send(error)
            });

        // -- different Package

        // tall(`${body.url}`)
        //     .then(unshortenedUrl => console.log('Tall url', unshortenedUrl))
        //     .catch(err => console.error('AAAW 👻', err))
        // console.log(body.url)
        // console.log('in url')

        // -- different Package

        // shortUrl.short('https://google.com', function (err, url) {
        //     console.log(url);
        // })
        // shortUrl.short(body.url, function (err, url) {
        //     if (err) {
        //         res.send(err)
        //     } else {
        //         console.log(url, 'here');
        //         res.send(url)
        //     }
        // })
    } else {
        res.send('invalid URL')
    }

    // console.log(user, body)
    // res.send(user)
}