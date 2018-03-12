import node from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "index.js",
  output: {
    format: "iife",
    file: "bundle.js"
  },
  plugins: [
    node({
      jsnext: true,
      main: true
    }),
    json({
      include: "*/**"
    }),
    commonjs({
      include: "*/**",
      extensions: ["js", "json"]
    })
  ]
};
