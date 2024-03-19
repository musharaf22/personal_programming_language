// import { compile } from "./compiler";
const compile = require("./compiler");
const code = ` ye x = 10;
ye y = 50;
ye z = 100;
ye sum = x + y + z;
bol sum`;

compile(code);
