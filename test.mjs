import minimist from "custom-minimist";

const args = minimist(process.argv.slice(2));
console.log("minimist args", args);
