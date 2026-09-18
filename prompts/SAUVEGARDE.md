# Prompt de sauvegarde universel

À utiliser après une scène majeure, un changement persistant, une mission, `PAUSE` ou `EXPORT`.

```text
Arrête l’aventure au moment exact où elle se trouve et prépare une sauvegarde factuelle. Ne rejoue pas la scène et ne crée aucun événement supplémentaire.

Retourne exactement les trois blocs suivants :

1) PATCH_CURRENT_STATE
- point exact de reprise (lieu, scène, dernière action/réponse) ;
- uniquement les sections de CURRENT_STATE.md qui ont changé ;
- anciennes et nouvelles valeurs pour chaque chiffre modifié.

2) PATCH_SAVE_JSON
- JSON valide contenant seulement les clés modifiées de saves/SAVE_CURRENT.json ;
- aucun champ absent ne doit être inféré.

3) SESSION_LOG_ENTRY
- date UTC ; interface/modèle si connu ; action ; jet et résultat ; conséquences confirmées ; chiffres modifiés ; prochaine reprise.

Les faits incertains doivent rester explicitement incertains. Le résultat sera écrit dans les fichiers persistants par l’interface, donc la précision compte plus que le style.
```