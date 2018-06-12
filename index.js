// 使用 `eventproxy` 来控制并发

var eventproxy = require('eventproxy')
var superagent = require('superagent')
var cheerio = require('cheerio')
var url = require('url')
var express = require('express')
var ep = new eventproxy()

var app = express()
app.listen(4000, function() {
  console.log('app is listening at port 4000')
})

app.get('/', function(request, response) {
  const baseUrl = 'https://movie.douban.com/trailers'
  const detailUrls = []
  const list = []

  superagent.get(baseUrl).end(function(err, res) {
    if (err) return console.log(err)
    const $ = cheerio.load(res.text)
    $('#upcoming .list-items')
      .find('.title')
      .each(function(_, element) {
        const href = $(element)
          .children()
          .attr('href')
        detailUrls.push(href)
      })

    detailUrls.forEach(function(x) {
      superagent.get(x).end(function(err, res2) {
        if (err) {
          ep.emit('got_detail_html', [])
        } else {
          const $ = cheerio.load(res2.text)
          ep.emit('got_detail_html', {
            source: $('source').attr('src'),
            title: $('h1 a').text(),
          })
        }
      })
    })

    ep.after('got_detail_html', detailUrls.length, function(movies) {
      response.send(movies)
    })
  })
})
