# Claude Boot Sequence Documentation Site

## Purpose

This static site documents the Claude Code CLI boot sequence for linuxserver.lan infrastructure. It shows what files are loaded at startup vs on-demand, helping maintain and optimize the context loading hierarchy.

**URL**: https://nginx.ai-servicers.com/claude-boot-sequence/

---

## Key Concepts

### Boot Hierarchy (2 Levels)

1. **User Level** (`~/.claude/CLAUDE.md`) - Auto-loaded first
   - Imports: agent-docs/CLAUDE.md, inter-agent-protocol.md, skills/CLAUDE.md

2. **Project Level** (`$HOME/projects/CLAUDE.md`) - Auto-loaded when in projects/
   - Imports: specialist agent-docs, project skills, SYSTEM-OVERVIEW.md, directives.md

### Progressive Disclosure Pattern

- **Boot**: Load minimal essential context
- **On-Demand**: Load detailed reference docs when skills are invoked
- **Result**: Faster boot, smaller initial context, relevant info when needed

### On-Demand Files (NOT loaded at boot)

| File | Loaded By Skills |
|------|------------------|
| `AINotes/network.md` | network-config, troubleshooting, service-deployment |
| `AINotes/security.md` | keycloak-setup, secrets-security, traefik-setup |
| `AINotes/logging.md` | logging-observability |

---

## File Structure

```
claude-boot-sequence/
├── index.html      # Main documentation page
└── CLAUDE.md       # This context file
```

---

## When to Update This Page

Update this documentation when:
1. New files added to boot sequence (CLAUDE.md imports)
2. Files moved from boot to on-demand (or vice versa)
3. New agents or skills added
4. Boot hierarchy structure changes
5. New slash commands added

---

## Key Sections in index.html

| Section | Purpose |
|---------|---------|
| Auto-Loaded from ~/.claude/ | Built-in Claude Code behavior |
| Visual Boot Sequence Tree | Quick visual overview |
| Detailed Boot Sequence | Phase-by-phase breakdown |
| Design Decisions | Explains progressive disclosure |
| On-Demand Loading | Agents, skills, reference files |
| File Reference Matrix | All files with import chains |
| Boot Statistics | Summary counts |

---

## CSS Classes for Status Badges

```css
.status.loaded     /* Green - Loaded at boot */
.status.on-demand  /* Blue - Loaded when needed */
.status.not-loaded /* Yellow - Gap/not loaded */
```

Tree colors:
```css
.tree .loaded      /* Green */
.tree .on-demand   /* Blue */
.tree .not-loaded  /* Yellow/Warning */
```

---

## Related Files

| File | Purpose |
|------|---------|
| `~/.claude/CLAUDE.md` | User-level boot context |
| `$HOME/projects/CLAUDE.md` | Project-level boot context |
| `~/.claude/skills/CLAUDE.md` | User skills summary |
| `$HOME/projects/.claude/skills/CLAUDE.md` | Project skills summary |
| `~/.claude/docs/agent-docs/CLAUDE.md` | PM agent context |
| `$HOME/projects/.claude/docs/agent-docs/CLAUDE.md` | Specialist agents context |

---

## Current Statistics (2025-11-27)

- CLAUDE.md files at boot: 2 (user + project)
- Agent context files: 3 (PM, Specialist, Protocol)
- Skill summaries: 2 (user + project)
- AINotes at boot: 2 (SYSTEM-OVERVIEW, directives)
- AINotes on-demand: 3 (network, security, logging)
- Agents discovered: 4 (pm, architect, developer, security)
- Skills discovered: 15 (7 user + 8 project)
- Commands available: 6

---

## Deployment

This site is part of the nginx static sites. To deploy changes:

```bash
cd /home/administrator/projects/nginx
./deploy.sh
```

No nginx config changes needed - location block already exists in `nginx-portal.conf`.

---

*Last Updated: 2025-11-27*
