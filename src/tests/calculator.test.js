const assert = require('node:assert/strict');
const { test } = require('node:test');
const { calculate, modulo, power, squareRoot } = require('../calculator');

test('adds the example operands', () => {
  assert.equal(calculate('2', '+', '3'), 5);
});

test('subtracts the example operands', () => {
  assert.equal(calculate('10', '-', '4'), 6);
});

test('multiplies the example operands', () => {
  assert.equal(calculate('45', '*', '2'), 90);
});

test('divides the example operands', () => {
  assert.equal(calculate('20', '/', '5'), 4);
});

test('calculates modulo examples and edge cases', () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(calculate('5', '%', '2'), 1);
  assert.equal(modulo(-5, 2), -1);
  assert.throws(() => modulo(10, 0), {
    message: 'Cannot modulo by zero.',
  });
  assert.throws(() => calculate('5', '%', '0'), {
    message: 'Cannot modulo by zero.',
  });
});

test('calculates powers including zero and negative exponents', () => {
  assert.equal(power(2, 3), 8);
  assert.equal(calculate('2', '^', '3'), 8);
  assert.equal(power(5, 0), 1);
  assert.equal(power(2, -2), 0.25);
  assert.equal(power(-2, 3), -8);
});

test('calculates square roots and rejects negative numbers', () => {
  assert.equal(squareRoot(16), 4);
  assert.equal(calculate('16', 'sqrt'), 4);
  assert.equal(squareRoot(0), 0);
  assert.equal(squareRoot(2), Math.sqrt(2));
  assert.throws(() => squareRoot(-1), {
    message: 'Cannot take the square root of a negative number.',
  });
  assert.throws(() => calculate('-1', 'sqrt'), {
    message: 'Cannot take the square root of a negative number.',
  });
});

test('supports decimal and negative operands', () => {
  assert.equal(calculate('-2.5', '+', '1'), -1.5);
  assert.equal(calculate('-9', '-', '-4'), -5);
  assert.equal(calculate('-3', '*', '2'), -6);
  assert.equal(calculate('1', '/', '2'), 0.5);
});

test('throws a clear error when dividing by zero', () => {
  assert.throws(() => calculate('8', '/', '0'), {
    message: 'Cannot divide by zero.',
  });
});

test('rejects operands that are not finite numbers', () => {
  assert.throws(() => calculate('not-a-number', '+', '2'), {
    message: 'Operands must be valid numbers.',
  });
  assert.throws(() => calculate('Infinity', '*', '2'), {
    message: 'Operands must be valid numbers.',
  });
});

test('rejects unsupported operations', () => {
  assert.throws(() => calculate('2', '?', '3'), {
    message: 'Unsupported operation "?". Use +, -, *, /, %, ^, or sqrt.',
  });
});
