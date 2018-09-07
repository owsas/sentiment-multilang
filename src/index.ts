/*
* Multilanguage AFINN-based sentiment analysis for Node.js
*/

// Dependencies
import * as latinize from 'latinize';
import * as stemmer from 'stemmer';

import lexicon from './lib/lexicon';

/**
 * Types of sentiment votes
 */
export type ISentimentVote = 'neutral' | 'positive' | 'negative';

/**
 * Supported languages
 */
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

/**
 * Tokenizes a string into an array of strings
 * @param input
 */
export function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    // .replace(/^\s+|^0-9+|[^a-z-úñäâàáéèëêïîíìöôùüûœç\- ]+/g, '')
    .replace(/\r?\n|\r/g, ' ')  // line breaks changed to space https://stackoverflow.com/a/10805292
    .replace(/n\'t/g, ' not')   // n't changed to not
    .replace(/'s/g, ' is')      // 's changed to is
    .replace(/['’]/g, ' ')      // apos changed to space
    .replace(/[.,\/#!$%\^&\*;:{}=_`\"~()]/g, '') // remove punctuation
    .replace(/\s{2,}/g, ' ')    // remove extra spaces https://stackoverflow.com/a/4328722
    .split(' ');
};


/**
 * Performs sentiment analysis on the provided input 'phrase'
 * @param phrase 
 * @param lang 
 * @param callback 
 */
export function sentiment(
  phrase: string, 
  lang: ISentimentSupportedLang, 
  callback?: (err: any, result: ISentimentResult) => void
): ISentimentResult {
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
      var stringToken = lexicon["truncated"][lang] ? tokens[len].replace(/[aeiouúäâàáéèëêïîíìöôùüû]$/, "") : String(tokens[len]);
      let punctuation = 0;
      // Extract the value using the input word, it's stemmed or it's latinized (no accents) version 
      const tokenValue = lexicon[lang] && (lexicon[lang][stringToken] || lexicon[lang][stemmer(stringToken)] || lexicon[lang][latinize(stringToken)]);

      if (tokenValue === undefined) {
        // Search on the emojis data
        if (!lexicon['emoji'][stringToken]) {
          continue; // continue the while loop with the next iteration
        }

        // It's an emoji
        punctuation = Number(lexicon['emoji'][stringToken]);
      } else {
        // It's a word
        punctuation = tokenValue;
      }

      words.push(stringToken);
      if (punctuation > 0) positive.push(stringToken);
      if (punctuation < 0) negative.push(stringToken);
      score += punctuation * negation;
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
