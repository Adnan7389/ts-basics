#!/usr/bin/env node

import * as readlineSync from "readline-sync";
import chalk from "chalk";

const name: string = readlineSync.question("What is your name? ");
const age: number = Number(readlineSync.question("How old are you? "));

console.log(chalk.green(`Hello, ${name}! You are ${age} years old.`));
