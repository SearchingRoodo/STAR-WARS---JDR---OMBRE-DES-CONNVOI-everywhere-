# Mission pour un agent local — installation du bot Discord

Cette mission doit être exécutée par un agent ayant accès au PC Windows de Rodolphe, pas par une session cloud sans accès au disque local.

## But

Installer et lancer le bot situé dans `discord-bot/` depuis le dépôt GitHub :

`https://github.com/SearchingRoodo/STAR-WARS---JDR---OMBRE-DES-CONNVOI-everywhere-.git`

Le bot doit lire la campagne depuis le clone local et pouvoir pousser les sauvegardes canoniques vers GitHub.

## Dossier attendu

Chercher d’abord le projet dans :

`C:\Users\rodol\OneDrive\Images\RP STARWARS\Jeux de role - IA`

Ne supprimer, écraser ou déplacer aucun fichier de référence déjà présent. Si ce dossier n’est pas un clone Git du dépôt attendu, créer un **sous-dossier de clone dédié** (par exemple `L-Ombre-des-Convois`) plutôt que de fusionner aveuglément deux historiques.

## Actions autorisées

1. Vérifier Node.js et npm (`node --version`, `npm --version`). Node 20+ est requis.
2. Cloner ou mettre à jour le dépôt depuis GitHub.
3. Se placer dans `<racine-du-clone>\discord-bot`.
4. Créer `.env` à partir de `.env.example` seulement s’il n’existe pas.
5. Lancer `npm install`, puis `npm run check`.
6. Vérifier que le compte Windows peut pousser sur GitHub avec un test Git non destructif.
7. Démarrer le bot avec `npm start` après que Rodolphe a renseigné le `.env`.
8. Rapporter clairement chaque réussite, échec et chemin final du clone.

## Secrets : interdiction stricte

- Ne jamais demander, afficher, journaliser ou envoyer un `DISCORD_TOKEN` dans le chat, Git, un fichier versionné ou une commande visible.
- Le fichier `.env` est ignoré par Git. Rodolphe doit y saisir lui-même son token régénéré.
- Ne jamais créer de token GitHub ou Discord à la place de Rodolphe.

## Valeurs que Rodolphe doit fournir localement

Dans `<racine-du-clone>\discord-bot\.env` :

```env
DISCORD_TOKEN=               # saisi par Rodolphe, jamais transmis à l’agent
DISCORD_CLIENT_ID=           # Application ID Discord
DISCORD_GUILD_ID=            # ID du serveur Discord de test
CAMPAIGN_ROOT=..
```

Le token est le seul élément réellement secret. Les deux IDs peuvent être lus dans le portail Discord / Discord Developer Mode.

## Discord : dernier geste utilisateur

Dans le portail développeur Discord : OAuth2 → URL Generator → cocher `bot` et `applications.commands`, puis utiliser l’URL générée pour ajouter le bot au serveur de test.

## Critère de fin

Le terminal affiche `Connecté comme <nom-du-bot>`. Les commandes `/reprise`, `/statut`, `/backlog`, `/pause` et `/save` apparaissent sur le serveur de test. `/action` est volontairement une file d’attente tant qu’un moteur MJ IA n’est pas branché.