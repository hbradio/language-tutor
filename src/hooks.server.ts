import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import GoogleProvider from "@auth/core/providers/google";
import { GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET, DISCORD_BOT_TOKEN, OPENAI_API_KEY } from "$env/static/private"
import { Client, GatewayIntentBits } from "discord.js";
import { generateInstagramPost } from "$lib/instadad/instadad";
import { evaluateMessage, respond, chat } from "$lib/language/language";

export const handle = SvelteKitAuth({
  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
    GoogleProvider({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
})

console.log("Logging into Discord")

let languageMessageHistory = []

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.on("messageCreate", async function(message) {
  if (message.author.bot) return;
  if (message.content[0] === "!") {
    return;
  }
  switch (message.channel.name) {
    case "instadads":
      const instaResponse = await generateInstagramPost(message.content);
      message.reply(instaResponse);
      return;
    case "spanish-practice":
      if (message.content.includes("%%")) {
        const chatResponse = await chat(message.content);
        message.reply(chatResponse);
        return;
      }
      const evalResponse = await evaluateMessage(message.content);
      message.reply(evalResponse);
      languageMessageHistory.push({"role": "user", "content": message.content})
      console.log(languageMessageHistory);
      if (message.content.includes("<@1144730272923918378>")) {
        const convResponse = await respond(languageMessageHistory);
        message.channel.send(convResponse);
        languageMessageHistory.push({"role": "assistant", "content": convResponse})
      }
      return;
    default:
      return;
  }
});

client.login(DISCORD_BOT_TOKEN);
