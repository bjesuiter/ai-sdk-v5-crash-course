import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const bigPickleUrl = process.env.OPENCODE_ENDPOINT_OPENAI_COMPAT;
if (!bigPickleUrl) {
    throw new Error("OPENCODE_ENDPOINT_OPENAI_COMPAT is not set");
}

const zenApiKey = process.env.OPENCODE_ZEN_API_KEY;
if (!zenApiKey) {
    throw new Error("OPENCODE_ZEN_API_KEY is not set");
}

export const bigPickle = createOpenAICompatible({
    baseURL: bigPickleUrl,
    apiKey: zenApiKey,
    name: "opencode-zen",
});
