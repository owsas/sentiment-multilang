/*
* Multilanguage AFINN-based sentiment analysis for Node.js
*/

// Dependencies
import lexicon from './lib/lexicon';

export type ISentimentVote = 'neutral' | 'positive' | 'negative';

export type ISentimentSupportedLang = 'en' | 'es' | 'fr' | 'it' | 'de' | 'nl' | 'unknown';

export interface ISentimentResult {
  score: number,
  comparative: number,
  vote: ISentimentVote,
  tokens: string[],
  words: string[],
  positive: string[],
  negative: string[],
  language: string,
}

export function tokenize(input) {
  return input
    .toLowerCase()
    .replace(/^\s+|^0-9+|[^a-z-úñäâàáéèëêïîíìöôùüûœç\- ]+/g, '')
    .replace('/ {2,}/', ' ')
    .split(' ');
};

// Performs sentiment analysis on the provided input 'phrase'
export function sentiment(phrase: string, lang: ISentimentSupportedLang, callback?: (err: any, result: ISentimentResult) => void) {
  // Parse arguments
  if (typeof phrase === 'undefined') phrase = '';
  if ((typeof (lang) === 'undefined') || !lexicon["langs"][lang]) lang = 'unknown';
  if (typeof callback === 'undefined') callback = null;

  // Storage objects
  var tokens = tokenize(phrase),
    score = 0,
    words = [],
    positive = [],
    negative = [];

  // Iterate over tokens if language is knowed
  var len = tokens.length;
  if (lang !== 'unknown') {
    while (len--) {
      // var prevobj = (len > 0) ? String(tokens[len-1]): "";
      var negation = (lexicon["negations"][lang] && lexicon["negations"][lang][tokens[len - 1]]) ? -1 : 1;
      var obj = lexicon["truncated"][lang] ? tokens[len].replace(/[aeiouúäâàáéèëêïîíìöôùüû]$/, "") : String(tokens[len]);
      var item = Number(lexicon[lang][obj]);
      if (!lexicon[lang][obj]) continue;

      words.push(obj);
      if (item > 0) positive.push(obj);
      if (item < 0) negative.push(obj);
      score += item * negation;
    }
  }

  // Handle optional async interface
  var result: ISentimentResult = {
    score: score,
    comparative: score / tokens.length,
    vote: 'neutral',
    tokens: tokens,
    words: words,
    positive: positive,
    negative: negative,
    language: lang
  };

  // Classify text as positive, negative or neutral.
  if (result.score > 0) { result.vote = 'positive'; }
  else if (result.score < 0) { result.vote = 'negative'; }

  if (!callback) return result;
  callback(null, result);
};
