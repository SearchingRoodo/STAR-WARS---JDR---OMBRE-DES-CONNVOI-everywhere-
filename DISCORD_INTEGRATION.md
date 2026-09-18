# Contrat fonctionnel du bot Discord

Le bot Discord ne doit pas être une seconde campagne. Il est une télécommande du dépôt.

## Commandes utiles

| Commande | Résultat |
|---|---|
| `/reprise` | lit `CURRENT_STATE.md`, affiche le point exact et ouvre la scène |
| `/action <texte>` | transmet l’action de Rhod au MJ avec l’état compact |
| `/jet d20` | lance le dé du joueur, conserve le résultat pour la résolution suivante |
| `/statut` | affiche PV, crédits, XP, Force, blessures et lieu |
| `/save` | force la sauvegarde : JSON + état court + journal + commit |
| `/pause` | sauvegarde et rend le point de reprise copiable dans un chat |
| `/image <description>` | fige la scène ; ne progresse pas le jeu |
| `/backlog` | lit/ajoute une piste non canonique |

## Règles techniques non négociables

- Au démarrage de chaque commande de jeu : récupérer le dernier état du dépôt.
- Après `/save` ou `/pause` : écrire les trois fichiers de continuité, créer l’archive si une session se termine, puis pousser le commit.
- Conserver l’ID Discord, l’horodatage UTC et le modèle utilisé dans le journal, mais jamais des clés API ou le texte d’authentification.
- Interdire deux commandes `/action` simultanées dans la même campagne tant que la réponse précédente n’est pas sauvegardée.
- En cas d’échec d’écriture : répondre que la scène n’est pas validée et ne pas annoncer les changements comme canoniques.

## À installer plus tard

Le développement réel du bot demande simplement le choix de l’hébergement (PC local, serveur, Railway/Render/VPS) et les identifiants Discord/Git. Ne les place jamais dans ce dossier : utiliser un fichier `.env` ignoré par Git.