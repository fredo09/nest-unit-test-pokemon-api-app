import { sum } from './sum.helper';

describe('sum.helper tests', () => {
  it('Should return the sum of two numbers', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
});
