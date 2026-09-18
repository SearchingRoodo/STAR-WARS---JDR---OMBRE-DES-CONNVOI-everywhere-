# Protocole de synchronisation — une campagne, plusieurs interfaces

## Principe

Le dépôt est le seul état durable. Les chats et les modèles sont des **interfaces de jeu**, pas des mémoires. Un modèle ne doit jamais reprendre depuis son souvenir de conversation lorsqu’un fichier de sauvegarde existe.

## Stratégie conseillée

1. Mettre ce dossier dans OneDrive pour la copie locale et les assets.
2. L’initialiser aussi comme **dépôt Git privé** et choisir ce dépôt comme synchronisation de référence.
3. Hermès/Claude et le bot Discord lisent la branche `main` avant d’écrire.
4. Chat utilise `CURRENT_STATE.md` joint ou collé ; à la fin, son bloc de sauvegarde est reporté dans le dépôt.

OneDrive n’est pas le mécanisme de résolution : si Git signale un conflit sur `CURRENT_STATE.md` ou `saves/SAVE_CURRENT.json`, arrêter et choisir la sauvegarde correspondant à la session réellement la plus récente. Ne jamais fusionner des chiffres à la main comme une liste de courses.

## Lecture minimale avant une action

1. `CURRENT_STATE.md`.
2. Les trois dernières entrées de `SESSION_LOG.md` si besoin.
3. `saves/SAVE_CURRENT.json` uniquement si le MJ doit vérifier une valeur non présente dans l’état court.
4. `JDR RULES.pdf` uniquement pour une règle, un calcul ou un fait ancien en doute.

## Écriture après une scène

1. Appliquer le bloc de `prompts/SAUVEGARDE.md`.
2. Mettre à jour **la même information** dans `CURRENT_STATE.md` et `saves/SAVE_CURRENT.json`.
3. Ajouter une ligne horodatée à `SESSION_LOG.md` : action, jet, conséquence, chiffres modifiés, point exact de reprise.
4. Créer une copie immuable dans `saves/archive/` seulement à la fin d’une session, après une mission, ou avant une décision irréversible.
5. Committer avec le format `save: <lieu> — <événement bref>`.

## Verrou d’écriture

Une seule interface a le droit d’écrire à la fois. Avant une scène longue, elle crée `runtime/SESSION_LOCK.md` avec : interface, date/heure UTC, scène et auteur. Elle supprime le verrou après la sauvegarde/commit. Si le verrou appartient à une autre session en cours, ne pas jouer en parallèle.

## Répartition des plateformes

| Interface | À utiliser pour | Contexte transmis |
|---|---|---|
| Hermès / Claude | continuité, préparation, logique de campagne, fichiers | `AGENTS.md` + `CURRENT_STATE.md` |
| Discord | jouer rapidement à distance, commandes, logs immédiats | état compact, puis JSON seulement sur commande |
| ChatGPT | narration très immersive, visuels, idées de scène | `AGENTS.md` + état compact + éventuelle image demandée |

Le modèle le plus créatif n’est pas forcément celui qui doit tenir les chiffres. L’état des fichiers les tient à sa place ; chaque modèle peut alors faire ce qu’il fait de mieux sans réinventer Rhod à chaque changement de fenêtre.