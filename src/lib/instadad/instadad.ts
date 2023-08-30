import { openai } from "$lib/components/openai";

function generatePrompt(userInput: string): string {
  return `Turn the follow description of an event into a self-righteous parenting Instagram post.
The post is by a dad.
Here is the event:
${userInput}
`;
}

export async function generateInstagramPost(userInput: string): Promise<string> {
  try {
    const prompt = generatePrompt(userInput);
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
