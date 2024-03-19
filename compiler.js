const getAst = (tokens) => {
  const node = {
    type: "Program",
    body: [],
  };
  while (tokens.length > 0) {
    const token = tokens.shift();
    if (token.type === "keyword" && token.value === "ye") {
      let declaration = {
        type: "declaration",
        name: tokens.shift().value,
        value: null,
      };

      let expression = "";
      if (tokens[0].type === "operator" && tokens[0].value === "=") {
        tokens.shift();
        while (tokens.length > 0 && tokens[0].type !== "keyword") {
          expression += tokens.shift().value;
        }
        declaration.value = expression;
      }
      node.body.push(declaration);
    }

    if (token.type === "keyword" && token.value === "bol") {
      node.body.push({
        type: "print",
        expression: tokens.shift().value,
      });
    }
  }
  return node;
};

const lexer = (input) => {
  const token = [];
  let cursor = 0;
  while (cursor < input.length) {
    let char = input[cursor];
    // Skip WhiteSpace
    if (/\s/.test(char)) {
      cursor++;
      continue;
    }

    if (/[a-zA-Z]/.test(char)) {
      let word = "";
      while (/[a-zA-Z0-9]/.test(char) && char !== undefined) {
        word += char;
        char = input[++cursor];
      }
      if (["ye", "bol"].includes(word)) {
        token.push({ type: "keyword", value: word });
      } else {
        token.push({ type: "identifier", value: word });
      }
    }

    //handling Numbers
    if (/[0-9]/.test(char)) {
      let expression = "";
      while (/[0-9]/.test(char)) {
        expression += char;
        char = input[++cursor];
      }
      token.push({ type: "number", value: parseInt(expression) });
    }

    //handling Operators
    if (/[\+\-\*\/=]/.test(char)) {
      token.push({ type: "operator", value: char });
    }
    cursor++;
  }
  return token;
};

const generateCode = (ast) => {
  switch (ast.type) {
    case "Program":
      return ast.body.map(generateCode).join("\n");
    case "declaration":
      return `const ${ast.name} = ${ast.value}`;
    case "print":
      return `console.log(${ast.expression})`;
  }
};

const runner = (code) => {
  eval(code);
};
const compile = (value) => {
  const code = `
   ${value}
    `;
  const token = lexer(code);
  const ast = getAst(token);
  const execultableCode = generateCode(ast);
  runner(execultableCode);
  //   console.dir(execultableCode, { depth: null });
};
module.exports = compile;
// compile();

// COde -----> Lexer (Tokenized)----> AssertionError(Abstract Syntax tree)------->Code Generation ----->RUN
