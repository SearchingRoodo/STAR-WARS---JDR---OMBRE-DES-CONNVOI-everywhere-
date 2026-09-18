require("dotenv").config();

const { AttachmentBuilder, Client, Events, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");
const campaign = require("./campaign");

const required = ["DISCORD_TOKEN", "DISCORD_CLIENT_ID"];
for (const key of required) {
  if (!process.env[key]) throw new Error(`Variable manquante dans .env : ${key}`);
}

const commands = [
  new SlashCommandBuilder().setName("reprise").setDescription("Affiche le point de reprise canonique."),
  new SlashCommandBuilder().setName("statut").setDescription("Affiche le statut compact de Rhod."),
  new SlashCommandBuilder().setName("backlog").setDescription("Envoie le backlog actuel."),
  new SlashCommandBuilder()
    .setName("action")
    .setDescription("Place une action dans la file de jeu sans la rendre canonique.")
    .addStringOption((option) => option.setName("texte").setDescription("Action de Rhod.").setRequired(true)),
  new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Inscrit une pause factuelle puis sauvegarde.")
    .addStringOption((option) => option.setName("note").setDescription("Note optionnelle.")),
  new SlashCommandBuilder()
    .setName("save")
    .setDescription("Commit et pousse les fichiers canoniques déjà modifiés.")
    .addStringOption((option) => option.setName("message").setDescription("Résumé court du changement."))
].map((command) => command.toJSON());

async function registerCommands() {
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
  const route = process.env.DISCORD_GUILD_ID
    ? Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID)
    : Routes.applicationCommands(process.env.DISCORD_CLIENT_ID);
  await rest.put(route, { body: commands });
  console.log(`Commandes Discord enregistrées (${process.env.DISCORD_GUILD_ID ? "serveur de test" : "global"}).`);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Connecté comme ${readyClient.user.tag}.`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    if (interaction.commandName === "reprise") {
      const state = Buffer.from(campaign.readText(campaign.files.state), "utf8");
      await interaction.reply({ content: campaign.summary(), files: [new AttachmentBuilder(state, { name: "CURRENT_STATE.md" })], ephemeral: true });
      return;
    }
    if (interaction.commandName === "statut") {
      await interaction.reply({ content: campaign.summary(), ephemeral: true });
      return;
    }
    if (interaction.commandName === "backlog") {
      const backlog = Buffer.from(campaign.readText(campaign.files.backlog), "utf8");
      await interaction.reply({ files: [new AttachmentBuilder(backlog, { name: "BACKLOG.md" })], ephemeral: true });
      return;
    }
    if (interaction.commandName === "action") {
      const action = interaction.options.getString("texte", true);
      campaign.appendQueue(interaction.user.tag, action);
      await interaction.reply("Action placée dans la file. Elle n’est pas encore canonique : le moteur MJ doit la résoudre, puis appliquer une sauvegarde.");
      return;
    }
    if (interaction.commandName === "pause") {
      campaign.appendPause(interaction.options.getString("note"));
      await interaction.deferReply({ ephemeral: true });
      await interaction.editReply(campaign.saveToGit("pause Discord"));
      return;
    }
    if (interaction.commandName === "save") {
      await interaction.deferReply({ ephemeral: true });
      await interaction.editReply(campaign.saveToGit(interaction.options.getString("message") || "mise à jour Discord"));
    }
  } catch (error) {
    console.error(error);
    const message = `Erreur : ${error.message}`;
    if (interaction.deferred || interaction.replied) await interaction.editReply(message);
    else await interaction.reply({ content: message, ephemeral: true });
  }
});

registerCommands().then(() => client.login(process.env.DISCORD_TOKEN));