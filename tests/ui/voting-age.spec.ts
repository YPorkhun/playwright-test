import { test, expect } from '@playwright/test';

const errorMessage = {
  
  validationError : 'Ви ввели щось не те.',
  underAgeMessage : 'Ви ще не можете голосувати.',
  successMessage : 'Ви можете голосувати.'

  }

function getVotingMessage(age: number) {
  if (typeof age !== 'number' || age < 0) {
    throw new Error(errorMessage.validationError);
  }
  if (age >= 18 && age <= 120) {
    return errorMessage.successMessage;
  } else {
    return errorMessage.underAgeMessage;
  }
}

test('17 years old cannot vote', () => {
  expect(getVotingMessage(17)).toBe(errorMessage.underAgeMessage);
});

test('18 years old can vote', () => {
  expect(getVotingMessage(18)).toBe(errorMessage.successMessage);
});

test('19 years old can vote', () => {
  expect(getVotingMessage(19)).toBe(errorMessage.successMessage);
});

test('Not a number', () => {
  expect(() => getVotingMessage('not-a-number' as unknown as number)).toThrow(errorMessage.validationError);
});