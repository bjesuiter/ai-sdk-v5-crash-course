import { opencodeZen } from "@local/utils/providers/opencode-zen.ts";
import { streamText } from "ai";

const model = opencodeZen("big-pickle");

const prompt =
  "Give me the first paragraph of a story about an imaginary planet.";

const stream = streamText({
  model,
  prompt,
});

for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}
