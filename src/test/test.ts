/*
 * If you want run tests please install the test framework Mocha (https://mochajs.org).
 * Then type the command on the parent folder: mocha test
 */

// Require the sentiment module
import { sentiment } from "..";
import { clean } from '../lib/clean';

describe('English', function () {
  test('It should return positive or negative', function () {
    expect(sentiment('Cats are stupid.', 'en').vote).toEqual('negative');
    expect(sentiment('Cats are totally amazing!', 'en').vote).toEqual('positive');
    expect(sentiment('I had the most wonderful stay', 'en').vote).toEqual('positive');
    expect(sentiment('I’m really disappointed with the battery life of my device', 'en').vote).toEqual('negative');
  });
});

describe('Italian', function () {
  test('It should return positive or negative', function () {
    expect(sentiment('Il mare è bello', 'it').vote).toEqual('positive');
    expect(sentiment('I gatti sono stupidi.', 'it').vote).toEqual('negative');
  });
});

describe('Spanish', function () {
  test('It should return positive or negative', function () {
    expect(sentiment('Los gatos son estúpidos.', 'es').vote).toEqual('negative');
    expect(sentiment('Los gatos son totalmente increíbles!', 'es').vote).toEqual('positive');
  });

  test('It should not care about accents', function () {
    expect(sentiment('Son absolutamente increibles!', 'es').vote).toEqual('positive');
  });
});

describe('Wrong language', function () {
  test('It should return positive, negative or neutral', function () {
    expect(sentiment('Seems somebody had a good meal! #lion #safari #cats #wildlife #Africa #adventure #offroad https://t.co/6cX7hAlrYY', 'en').vote).toEqual('positive');
    expect((sentiment as any)('Seems somebody had a good meal! #lion #safari #cats #wildlife #Africa #adventure #offroad https://t.co/6cX7hAlrYY', '8g8u').vote).toEqual('neutral');
    expect(sentiment('Seems somebody had a good meal! #lion #safari #cats #wildlife #Africa #adventure #offroad https://t.co/6cX7hAlrYY', 'it').vote).toEqual('neutral');
  });
});

describe('Emoji', function() {
  test('It should detect the usage of emojis', function () {
    expect(sentiment('Te amo! 😍', 'es').vote).toEqual('positive');
  });
});

describe('Cleaner', function() {
  test('It should clean lang file', function () {
    const output = clean({
      "embrace": 1,
      "abandon": -2,
      "Abandon": -2
    })
    expect(Object.keys(output)[0]).toEqual('abandon');
    expect(Object.keys(output).length).toEqual(2);
  });
});
