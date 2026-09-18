#!/usr/bin/env python3
"""Validation sans écriture de l'état canonique de L'Ombre des Convois."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SAVE = ROOT / "saves" / "SAVE_CURRENT.json"
STATE = ROOT / "CURRENT_STATE.md"
LOG = ROOT / "SESSION_LOG.md"


def require(value, label):
    if not value:
        raise ValueError(f"Valeur manquante : {label}")


def main():
    for file_path in (SAVE, STATE, LOG):
        if not file_path.is_file():
            raise FileNotFoundError(f"Fichier requis absent : {file_path.relative_to(ROOT)}")

    with SAVE.open(encoding="utf-8") as handle:
        save = json.load(handle)

    require(save.get("meta", {}).get("campaign"), "meta.campaign")
    require(save.get("meta", {}).get("resume", {}).get("scene"), "meta.resume.scene")
    require(save.get("rhod", {}).get("hp", {}).get("max"), "rhod.hp.max")
    require(save.get("rhod", {}).get("credits") is not None, "rhod.credits")

    state_text = STATE.read_text(encoding="utf-8")
    last_action = save["meta"]["resume"].get("last_player_action", "")
    if last_action and last_action not in state_text:
        raise ValueError("CURRENT_STATE.md ne reprend pas la dernière action du JSON canonique.")

    print("Campagne valide : état court, journal et sauvegarde JSON sont cohérents.")


if __name__ == "__main__":
    main()