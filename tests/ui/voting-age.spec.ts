import { test, expect } from '@playwright/test';

function getVotingMessage(age: number) {
  if (typeof age !== 'number' || age < 0) {
    throw new Error('Ви ввели щось не те.');
  }
  if (age >= 18) {
    return 'Ви можете голосувати.';
  } else {
    return 'Ви ще не можете голосувати.';
  }
}

test('17 years old cannot vote', () => {
  expect(getVotingMessage(17)).toBe('Ви ще не можете голосувати.');
});

test('18 years old can vote', () => {
  expect(getVotingMessage(18)).toBe('Ви можете голосувати.');
});

test('19 years old can vote', () => {
  expect(getVotingMessage(19)).toBe('Ви можете голосувати.');
});