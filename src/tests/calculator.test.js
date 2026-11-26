const assert = require('node:assert/strict');
const { test } = require('node:test');
const { calculate } = require('../calculator');

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
  assert.throws(() => calculate('2', '%', '3'), {
    message: 'Unsupported operation "%". Use +, -, *, or /.',
  });
});
