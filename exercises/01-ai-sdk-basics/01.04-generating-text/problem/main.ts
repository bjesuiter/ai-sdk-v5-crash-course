import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { opencodeZen } from "@local/utils";
import { zenGoogle } from "@local/utils/src/providers/zen-google.ts";
import { zenOpenai } from "@local/utils/src/providers/zen-openai.ts";
import { zenAnthropic } from "@local/utils/src/providers/zen-anthropic.ts";

// I recommend using the Google Gemini model:
// gemini-2.0-flash-lite
// const model = opencodeZen("big-pickle");
// const model = zenGoogle("gemini-3-pro");
// const model = zenOpenai("gpt-5-nano");
const model = zenAnthropic("claude-haiku-4-5");

const prompt = "What is the capital of France?";

const result = await generateText({
    model,
    prompt,
});

console.log(result.text);
