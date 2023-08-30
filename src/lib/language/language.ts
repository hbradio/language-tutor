import { openai } from "$lib/components/openai";

export async function evaluateMessage(message: string) : Promise<string> {
  try {
    const prompt = `Evaluate the following Latin American Spanish message. If it can be changed to be more gramatically correct, idiomatic, 
    or natural, please reply with the altered version along with an explanation of the changes in English. If it is ok as it is, please reply with "ok".
    Here is the message:
    ${message}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{"role": "user", "content": `${prompt}`}],
      temperature: 0,
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch(error) {
    return "Sorry, my bot brain isn't working right now."
  }
}

export async function respond(conversationHistory) : Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: conversationHistory,
      temperature: 0,
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch(error) {
    return "Sorry, my bot brain isn't working right now."
  }
}

export async function chat(message: string) : Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {"role": "system", "content": "You are a Spanish tutor. You will be asked questions about Latin American Spanish."},
        {"role": "user", "content": `${message}`},
      ],
      temperature: 0,
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch(error) {
    return "Sorry, my bot brain isn't working right now."
  }
}