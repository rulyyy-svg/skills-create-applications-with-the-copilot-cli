function toFiniteNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error('Operands must be valid numbers.');
  }

  return number;
}

function modulo(a, b) {
  const dividend = toFiniteNumber(a);
  const divisor = toFiniteNumber(b);

  if (divisor === 0) {
    throw new Error('Cannot modulo by zero.');
  }

  return dividend % divisor;
}

function power(base, exponent) {
  return toFiniteNumber(base) ** toFiniteNumber(exponent);
}

function squareRoot(n) {
  const number = toFiniteNumber(n);
  if (number < 0) {
    throw new Error('Cannot take the square root of a negative number.');
  }

  return Math.sqrt(number);
}

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '%': modulo,
  '^': power,
  '/': (a, b) => {
    if (b === 0) {
      throw new Error('Cannot divide by zero.');
    }

    return a / b;
  },
};

function calculate(firstOperand, operator, secondOperand) {
  if (operator === 'sqrt') {
    return squareRoot(firstOperand);
  }

  const first = toFiniteNumber(firstOperand);
  const second = toFiniteNumber(secondOperand);
  const operation = operations[operator];
  if (!operation) {
    throw new Error(`Unsupported operation "${operator}". Use +, -, *, /, %, ^, or sqrt.`);
  }

  return operation(first, second);
}

if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 2 && args[0] === 'sqrt') {
    try {
      console.log(calculate(args[1], 'sqrt'));
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  } else if (args.length === 3) {
    try {
      console.log(calculate(args[0], args[1], args[2]));
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  } else {
    console.error('Usage: node src/calculator.js <number> <+|-|*|/|%|^> <number> OR node src/calculator.js sqrt <number>');
    process.exitCode = 1;
  }
}

module.exports = { calculate, modulo, power, squareRoot };
