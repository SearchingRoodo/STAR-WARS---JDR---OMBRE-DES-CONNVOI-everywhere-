# Bot Discord — L’Ombre des Convois

Le bot est la passerelle de persistance Discord : il lit la campagne depuis le dépôt et pousse les sauvegardes canoniques sur GitHub. Il ne génère pas encore de narration de MJ : la commande `/action` met volontairement l’action en attente jusqu’à ce qu’un moteur de modèle soit branché.

## Installation sur ton PC

Depuis la racine locale du dépôt :

```powershell
cd discord-bot
Copy-Item .env.example .env
npm install
npm run check
npm start
```

Dans `discord-bot/.env`, renseigne uniquement sur ton PC :

```env
DISCORD_TOKEN=nouveau_token_du_bot
DISCORD_CLIENT_ID=id_de_l_application_discord
DISCORD_GUILD_ID=id_de_ton_serveur_de_test
CAMPAIGN_ROOT=..
```

`DISCORD_CLIENT_ID` est l’**Application ID** dans le portail développeur Discord. Pour récupérer les IDs, active le *Developer Mode* dans Discord puis clic droit sur ton serveur → *Copy Server ID*.

Le compte Windows qui exécute le bot doit déjà avoir le droit de pousser sur GitHub depuis ce clone (GitHub Desktop, Git Credential Manager ou `gh auth login`).

## Commandes

- `/reprise` : point de reprise et fichier d’état.
- `/statut` : PV, crédits, XP, lieu et scène.
- `/backlog` : backlog actuel.
- `/action` : enregistre une action non résolue dans une file locale.
- `/pause` : inscrit une pause sans ajouter d’événement de jeu, puis commit/push.
- `/save` : pousse uniquement les changements canoniques déjà validés.

## Étape suivante : MJ IA dans Discord

Pour que `/action` devienne une vraie scène jouée, il faut brancher un fournisseur de modèle (OpenAI API, Claude API ou un endpoint personnel) et sa clé dans `.env`. Un abonnement ChatGPT ou Claude ne donne pas automatiquement une clé API. Le modèle devra toujours lire `CURRENT_STATE.md` et produire le patch de sauvegarde avant tout commit.