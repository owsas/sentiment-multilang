# sentiment-multilang
### Multilanguage AFINN-based sentiment analysis for Node.js

Sentiment is a Node.js module that uses the [AFINN-111](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) wordlist to perform [sentiment analysis](http://en.wikipedia.org/wiki/Sentiment_analysis) on arbitrary blocks of input text.

It supports the following languages: English, French, Spanish, and Italian. For languages other than english, it uses a locale transposition of AFINN-111 wordlist. The wordlist can be extended adding words too.

## Installation
`npm install @owsas/sentiment-multilang`

![](https://travis-ci.org/owsas/sentiment-multilang.svg?branch=master)

## Usage
```javascript
// Require the sentiment-multilang module
var { sentiment } = require('@owsas/sentiment-multilang');

// Use the module to get sentiment from texts.
var r1 = sentiment('Cats are stupid.','en');
console.dir(r1);        // Vote: 'negative'

var r2 = sentiment('Cats are totally amazing!','en');
console.dir(r2);        // Vote: 'positive'

var r3 = sentiment('I gatti sono stupidi.','it');
console.dir(r3);        // Vote: 'negative'

var r4 = sentiment('I gatti sono totalmente stupendi!','it');
console.dir(r4);        // Vote: 'positive'
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
mocha test
```
