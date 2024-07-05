import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('normalizeURL protocol', () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalize https://wagslane.dev', () => {
  const input = 'https://wagslane.dev'
  const actual = normalizeURL(input)
  const expected = 'wagslane.dev'
  expect(actual).toEqual(expected)
})

test('normalizeURL slash', () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
  const input = 'https://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
  const input = 'http://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalize "http://example.com/path" to "example.com/path"', () => {
  expect(normalizeURL('http://example.com/path')).toBe('example.com/path');
});

test('normalize "http://example.com/path/" to "example.com/path"', () => {
  expect(normalizeURL('http://example.com/path/')).toBe('example.com/path');
});

test('normalize "http://example.com/path//" to "example.com/path"', () => {
  expect(normalizeURL('http://example.com/path//')).toBe('example.com/path');
});

test('normalize "http://example.com/path//////" to "example.com/path"', () => {
  expect(normalizeURL('http://example.com/path//////')).toBe('example.com/path');
});

test('normalize "https://Example.com/path//////" to "example.com/path"', () => {
  expect(normalizeURL('https://Example.com/path//////')).toBe('example.com/path');
});

test('getURLsFromHTML absolute', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = ['https://blog.boot.dev/']
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = ['https://blog.boot.dev/path/one']
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = ['https://blog.boot.dev/path/one', 'https://other.com/path/one']
  expect(actual).toEqual(expected)
})
