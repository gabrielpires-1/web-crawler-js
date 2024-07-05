import { sortPages } from './report.js'
import { test, expect } from '@jest/globals'

test('sortPages', () => {
  const input = {
    url1: 5,
    url2: 1,
    url3: 3,
    url4: 10,
    url5: 7
  }
  const actual = sortPages(input)
  const expected = {
    "url4": 10,
    "url5": 7,
    "url1": 5,
    "url3": 3,
    "url2": 1
  }
  expect(actual).toEqual(expected)
})

test('sortPages null case', () => {
  const input = {}
  const actual = sortPages(input)
  const expected = {}
  expect(actual).toEqual(expected)
})

test('sorting function', () => {
  const inputObj = {
    'wagslane.dev/tags/devops': 1,
    'wagslane.dev/posts/no-one-does-devops': 2,
    'wagslane.dev/posts/leave-scrum-to-rugby': 5,
    'wagslane.dev/posts/managers-that-cant-code': 4,
    'wagslane.dev/posts/kanban-vs-scrum': 4,
    'wagslane.dev/tags/education': 1
  }
  const actual = sortPages(inputObj)
  const expectedObj = {
    'wagslane.dev/posts/leave-scrum-to-rugby': 5,
    'wagslane.dev/posts/managers-that-cant-code': 4,
    'wagslane.dev/posts/kanban-vs-scrum': 4,
    'wagslane.dev/posts/no-one-does-devops': 2,
    'wagslane.dev/tags/devops': 1,
    'wagslane.dev/tags/education': 1
  }
  expect(actual).toStrictEqual(expectedObj)
})
