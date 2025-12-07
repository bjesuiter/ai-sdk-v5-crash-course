import { opencodeZen } from "@local/utils/providers/opencode-zen.ts";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  type ModelMessage,
  streamText,
  type UIMessage,
} from "ai";

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();

  const messages: UIMessage[] = body.messages;

  const modelMessages: ModelMessage[] = convertToModelMessages(messages);

  const streamTextResult = streamText({
    model: opencodeZen("big-pickle"),
    messages: modelMessages,
  });

  const stream = streamTextResult.toUIMessageStream();

  return createUIMessageStreamResponse({
    stream,
  });
};
