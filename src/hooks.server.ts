import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import GoogleProvider from "@auth/core/providers/google";
import { GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET, DISCORD_BOT_TOKEN, OPENAI_API_KEY } from "$env/static/private"
import { Client, GatewayIntentBits } from "discord.js";
import OpenAI from "openai";

export const handle = SvelteKitAuth({
  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
    GoogleProvider({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
})

console.log("Logging into Discord")

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

const prefix = "!";

openai.api_key = OPENAI_API_KEY

function generatePrompt(userInput: string): string {
  return `Turn the follow description of an event into a self-righteous parenting Instagram post.
The post is by a dad.
Here is the event:
${userInput}
`;
}

async function callChatGpt(userInput: string): Promise<string> {
  try {
    const prompt = generatePrompt(userInput);
    console.log(prompt);
    // const completion = await openai.createCompletion({
    //   model: "gpt-4",
    //   prompt: prompt,
    //   temperature: 0.6,
    // });
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

client.on("messageCreate", async function(message) {
  console.log("Got message");
  if (message.author.bot) return;
  const channels = ["instadads"];
  if (!channels.includes(message.channel.name)) return;
  // if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  const response = await callChatGpt(message.content);
  console.log(response);
  message.reply(response);

  // if (command === "ping") {
  //   const timeTaken = Date.now() - message.createdTimestamp;
  //   message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  // }

});

client.login(DISCORD_BOT_TOKEN);
