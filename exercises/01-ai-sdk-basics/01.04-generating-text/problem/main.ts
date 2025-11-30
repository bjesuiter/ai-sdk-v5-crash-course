import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { opencodeZen } from "@local/utils";

// I recommend using the Google Gemini model:
// gemini-2.0-flash-lite
const model = opencodeZen("big-pickle");

const prompt = "What is the capital of France?";

const result = await generateText({
    model,
    prompt,
});

console.log(result.text);
