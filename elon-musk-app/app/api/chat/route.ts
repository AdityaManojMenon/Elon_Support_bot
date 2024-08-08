import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(config);

export async function POST(request: Request) {
    const { messages, language } = await request.json();

    //Now we need to get response from GPT-4 and send it to the client (frontend)
    const response = await openai.createChatCompletion({
        model: "gpt-4",
        stream: true,
        messages: [
            { role: "system", content: "Respond to the following question as if you were Elon Musk, using a direct, innovative, and make subtle jokes. Try explaining your answers with some analogies. Don't elaborate too much" },
            ...messages
        ]
    });

    //create a stream of data from OpenAI
    const stream = await OpenAIStream(response);

    //send the stream as a response to our client
    return new StreamingTextResponse(stream);
}
