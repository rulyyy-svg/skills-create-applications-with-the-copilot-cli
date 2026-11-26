// Supported operations: addition (+), subtraction (-), multiplication (*), and division (/).
const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => {
    if (b === 0) {
      throw new Error('Cannot divide by zero.');
    }

    return a / b;
  },
};

function calculate(firstOperand, operator, secondOperand) {
  const first = Number(firstOperand);
  const second = Number(secondOperand);

  if (!Number.isFinite(first) || !Number.isFinite(second)) {
    throw new Error('Operands must be valid numbers.');
  }

  const operation = operations[operator];
  if (!operation) {
    throw new Error(`Unsupported operation "${operator}". Use +, -, *, or /.`);
  }

  return operation(first, second);
}

if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length !== 3) {
    console.error('Usage: node src/calculator.js <number> <+|-|*|/> <number>');
    process.exitCode = 1;
  } else {
    try {
      console.log(calculate(args[0], args[1], args[2]));
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  }
}

module.exports = { calculate };
