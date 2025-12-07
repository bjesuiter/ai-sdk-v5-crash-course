import { opencodeZen } from "@local/utils/providers/opencode-zen.ts";
import { streamText } from "ai";

const output = streamText({
  model: opencodeZen("big-pickle"),
  prompt:
    `Which country makes the best sausages? Answer in a single paragraph.`,
});

console.log(`Thinking...`);

console.log(
  `
Reasoning: 
------------
`,
  await output.reasoning,
);

for await (const chunk of output.textStream) {
  process.stdout.write(chunk);
}

console.log(); // Empty log to separate the output from the usage

const usage = await output.usage;
console.log(`\nStatistics:`);
console.log(`Total tokens: ${usage.totalTokens}`);
console.log(`Cached input tokens: ${usage.cachedInputTokens}`);
console.log(`Input tokens: ${usage.inputTokens}`);
console.log(`Output tokens: ${usage.outputTokens}`);
console.log(`Reasoning tokens: ${usage.reasoningTokens}`);
