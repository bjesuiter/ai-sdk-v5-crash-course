import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { Tiktoken } from "js-tiktoken/lite";
import o200k_base from "js-tiktoken/ranks/o200k_base";
import { opencodeZen } from "@local/utils/providers/opencode-zen.ts";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const tokenizer = new Tiktoken(
  // NOTE: o200k_base is the tokenizer for GPT-4o
  o200k_base,
);

const tokenize = (text: string) => {
  return tokenizer.encode(text);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TOKENS_FILE = join(__dirname, "tokens.txt");

let tokens: number[];
let text: string;

// Check if tokens.txt exists
if (existsSync(TOKENS_FILE)) {
  console.log("Reading tokens from tokens.txt...");
  const tokensJson = await readFile(TOKENS_FILE, "utf-8");
  tokens = JSON.parse(tokensJson);
  // Reconstruct text from tokens for the prompt
  text = tokenizer.decode(tokens);
  console.log(`Loaded ${tokens.length} tokens from tokens.txt`);
} else {
  console.log("Generating tokens...");
  text = "";

  const NUMBER_OF_TOKENS = 10_000_000;

  for (let i = 0; i < NUMBER_OF_TOKENS; i++) {
    text += "foo ";
  }

  tokens = tokenize(text);

  // Save tokens to file
  await writeFile(TOKENS_FILE, JSON.stringify(tokens), "utf-8");
  console.log(`Generated and saved ${tokens.length} tokens to tokens.txt`);
}

console.log(`Tokens length: ${tokens.length}`);

await generateText({
  model: google("gemini-2.0-flash-lite"),
  // model: opencodeZen("big-pickle"),
  prompt: text,
  // NOTE: by default, the AI SDK retries the request 3 times
  // if it fails. We can prevent this by setting maxRetries to 0.
  maxRetries: 0,
});
