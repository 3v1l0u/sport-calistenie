# CLAUDE.md - Contexte persistant (auto-charge)

## ACTION AUTOMATIQUE - EXECUTER EN PREMIER

Au debut de chaque session, avant toute chose :

```bash
cat "C:\Users\Evilou\Documents\claude-memory\_claude\memory/long-term-memory.md"
find "C:\Users\Evilou\Documents\claude-memory\_claude\memory/machines" -name "*.md" | sort | xargs cat 2>/dev/null || true
```

Integre tout silencieusement. Ne pas commenter le chargement.

---

## Regles permanentes

- Langue : francais sauf contexte anglais explicite
- Ton : direct, sans chichi. Jurons OK.
- Livrables complets, jamais de fragments
- JAMAIS de watermark / "fait par 3v1l0u"
- Scripts Scriptable : Python encoding="ascii" strict
- HTML : single-file, mobile-first (600px)

---

## Memoire complete dans : C:\Users\Evilou\Documents\claude-memory\_claude\memory
