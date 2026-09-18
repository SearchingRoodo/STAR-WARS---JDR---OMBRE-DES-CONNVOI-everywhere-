# L’Ombre des Convois — kit de continuité multiplateforme

Ce dossier est la **source de vérité unique** de la campagne. Il permet de reprendre exactement au même endroit depuis Hermès, Claude, Discord ou un chat, sans remettre toute la campagne dans le contexte à chaque échange.

## Démarrer ou reprendre

1. Ouvrir `CURRENT_STATE.md`.
2. Donner au modèle le prompt de `prompts/REPRISE.md` et le contenu de `CURRENT_STATE.md`.
3. Si une précision manque, joindre au besoin `saves/SAVE_CURRENT.json`, puis seulement les sources pertinentes (`JDR RULES.pdf`, une référence image, etc.).
4. À la fin de chaque scène ou session, appliquer `prompts/SAUVEGARDE.md` : l’état compact est mis à jour et une entrée est ajoutée à `SESSION_LOG.md`.

Ne charge jamais tous les documents d’un coup : c’est coûteux et cela augmente le risque que le modèle mélange les versions.

## Fichiers à connaître

| Fichier | Rôle | Lecture requise |
|---|---|---|
| `JDR RULES.pdf` | Règles et canon historique | seulement si une règle ou un fait ancien est en jeu |
| `saves/SAVE_CURRENT.json` | sauvegarde exhaustive et chiffrée | au démarrage d’une nouvelle plateforme ou sur demande précise |
| `CURRENT_STATE.md` | contexte court, prêt à jouer | chaque reprise |
| `SESSION_LOG.md` | faits récents, audit des changements | les 3 dernières entrées si nécessaire |
| `BACKLOG.md` | scènes, pistes et améliorations à traiter | avant une préparation, pas à chaque tour |
| `CLAUDE.md` / `AGENTS.md` | consignes de MJ pour Claude/Hermès/autres agents | configuration de projet |
| `SYNC_PROTOCOL.md` | règles anti-conflit et synchronisation | pour installer Discord ou changer de plateforme |

## Synchronisation réellement fiable

Utiliser un dépôt Git privé comme transport entre les plateformes. OneDrive peut garder une copie locale et les images, mais ne doit pas résoudre des conflits sur les fichiers de sauvegarde : deux versions simultanées de `CURRENT_STATE.md`, c’est la manière la plus rapide d’inventer une chronologie parallèle.

- **Hermès / Claude** : ouvre le dépôt et suit `CLAUDE.md` + `AGENTS.md`.
- **Discord** : le bot lit le dernier commit avant toute action et crée un commit après chaque sauvegarde.
- **Chat** : joindre `CURRENT_STATE.md`, puis copier le bloc de sauvegarde produit à la fin dans les fichiers du dépôt. Un chat ne peut pas écrire de lui-même sur ton PC sans intégration autorisée.

Le protocole détaillé est dans `SYNC_PROTOCOL.md`.

## Économie de tokens

La règle simple : **état court toujours, archive seulement à la demande**. La scène courante et les chiffres vitaux tiennent dans `CURRENT_STATE.md`; le JSON complet sert de coffre-fort, pas de prologue.

Pour une partie courante, vise une réponse de MJ de 250 à 450 mots. Lance une image uniquement avec `IMAGE` : la scène est alors figée et aucune action de jeu ne progresse.