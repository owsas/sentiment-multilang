# sentiment-multilang
## Multilanguage AFINN-based sentiment analysis for Node.js

Sentiment is a Node.js module that uses the [AFINN-111](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) wordlist to perform [sentiment analysis](http://en.wikipedia.org/wiki/Sentiment_analysis) on arbitrary blocks of input text.

It supports the following languages: English, French, Spanish, German, Dutch and Italian. For languages other than english, it uses a locale transposition of AFINN-111 wordlist. The wordlist can be extended adding words too.  

Emojis are also supported: 
```js 
describe('Emoji', function() {
  test('It should detect the usage of emojis', function () {
    expect(sentiment('Te amo! 😍', 'es').vote).toEqual('positive');
  });
});
```
## Installation
`npm install @owsas/sentiment-multilang`

![](https://travis-ci.org/owsas/sentiment-multilang.svg?branch=master)

## Usage
```javascript
// Require the sentiment-multilang module
const { sentiment } = require('@owsas/sentiment-multilang');
// Get the sentiment from a text in a supported language
const result = sentiment('I had the most wonderful stay', 'en');  // result.vote = 'positive'
```

## Improvements
* All languages were moved to `langs` directory in separate `.json` files
* Code was moved to Typescript, and users can now see hints in their code
* Tests were moved to `jest`
* Testing with `travis`

## Credits
* Cloned repo: https://github.com/davidemiceli/sentiment-multilang 
* Emojis from: https://github.com/nicolasbonnici/node-sentiment/blob/master/lib/AFINN.js
* Dutch from: https://github.com/vdcrea/node-sentiment
* German from: https://github.com/vdcrea/node-sentiment

## Test
```bash
npm t # runs jest
```
