const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.resolve(process.env.CAMPAIGN_ROOT || path.join(__dirname, "../.."));
const files = {
  state: path.join(root, "CURRENT_STATE.md"),
  save: path.join(root, "saves", "SAVE_CURRENT.json"),
  log: path.join(root, "SESSION_LOG.md"),
  backlog: path.join(root, "BACKLOG.md"),
  queue: path.join(root, "runtime", "DISCORD_ACTION_QUEUE.md")
};

function readText(file) {
  return fs.readFileSync(file, "utf8");
}

function readSave() {
  return JSON.parse(readText(files.save));
}

function summary() {
  const save = readSave();
  const resume = save.meta.resume;
  const rhod = save.rhod;
  return [
    `**Lieu :** ${resume.location}`,
    `**Scène :** ${resume.scene}`,
    `**Dernière action :** ${resume.last_player_action}`,
    `**Rhod :** ${rhod.hp.current}/${rhod.hp.max} PV · ${rhod.credits.toLocaleString("fr-FR")} cr · ${rhod.xp.current}/${rhod.xp.next} XP`
  ].join("\n");
}

function appendQueue(user, action) {
  fs.mkdirSync(path.dirname(files.queue), { recursive: true });
  const date = new Date().toISOString();
  fs.appendFileSync(files.queue, `\n## ${date}\n- Joueur Discord : ${user}\n- Action proposée : ${action}\n`, "utf8");
}

function appendPause(note) {
  const date = new Date().toISOString();
  const suffix = note ? ` — ${note}` : "";
  fs.appendFileSync(files.log, `\n## ${date} — Pause Discord\n- Aucune action de jeu ajoutée.${suffix}\n`, "utf8");
}

function git(command, args) {
  return execFileSync("git", [command, ...args], {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
}

function saveToGit(message) {
  const status = git("status", ["--porcelain", "--", "CURRENT_STATE.md", "SESSION_LOG.md", "BACKLOG.md", "saves"]);
  if (!status) return "Aucun changement canonique à envoyer.";
  git("add", ["CURRENT_STATE.md", "SESSION_LOG.md", "BACKLOG.md", "saves"]);
  git("commit", ["-m", `save: ${message.slice(0, 90) || "mise à jour Discord"}`]);
  git("push", []);
  return "Sauvegarde envoyée sur GitHub.";
}

module.exports = { files, readText, summary, appendQueue, appendPause, saveToGit };