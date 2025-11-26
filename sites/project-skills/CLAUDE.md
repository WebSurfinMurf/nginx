# Project-Level Skills Page - Documentation

## Page Purpose
Documents the 8 project-level skills loaded from the projects directory for Claude Code. These are infrastructure-specific skills for the linuxserver.lan environment.

## Source Directory
```
~/projects/.claude/skills/
```

## Skills Documented (as of 2025-11-26)
1. **keycloak-setup** - Keycloak OIDC client configuration, OAuth2 proxy setup
2. **logging-observability** - Loki, Promtail, Grafana, Netdata, Dozzle, TimescaleDB
3. **network-config** - Docker networks, DNS, port mappings, security isolation
4. **nginx-static-site** - Static site deployment under nginx.ai-servicers.com
5. **postgres-integration** - PostgreSQL database integration and management
6. **service-deployment** - Docker deployment, OAuth2 auth, Traefik integration
7. **traefik-setup** - HTTP/HTTPS routing, SSL/TLS, middleware configuration
8. **troubleshooting** - Debugging, diagnostics, log analysis, emergency procedures

## How to Update This Page

### Step 1: Check Current Skills
```bash
ls -la ~/projects/.claude/skills/
```

### Step 2: Read Each Skill's SKILL.md
Each skill directory contains a `SKILL.md` file with:
- Skill name and description
- Trigger phrases
- Key features/capabilities
- Usage examples

```bash
# Example: Read a skill definition
cat ~/projects/.claude/skills/keycloak-setup/SKILL.md
```

### Step 3: Update index.html
Edit `/home/administrator/projects/nginx/sites/project-skills/index.html` to:
- Add/remove skill cards as needed
- Update skill descriptions from SKILL.md content
- Update the skill count in the stats section

### Step 4: Deploy
```bash
cd /home/administrator/projects/nginx
./deploy.sh
```

## Page Structure

### HTML Sections
- **Header**: Title, subtitle, location box (green theme)
- **Stats Row**: Skill count badges
- **Intro**: Explanation of project-level skills vs user-level skills
- **Skills Grid**: Individual skill cards (2-column layout) with:
  - Icon and name
  - Skill filename (code badge)
  - Description
  - Trigger phrases
  - Key features list
- **Comparison Table**: Project vs User skills
- **Footer**: Related links

## Related Pages
- `/user-level-skills/` - User-level skills (~/.claude/skills/)
- `/context-compare/` - Parent page with quick-access nav
- `/claudecodecliconfig/` - CLI configuration overview

## Maintenance Notes
- Skills are auto-discovered by Claude Code from `~/projects/.claude/skills/`
- Each skill must have a `SKILL.md` file to be recognized
- These skills are infrastructure-specific to linuxserver.lan
- Update this page when skills are added/removed/modified

---
*Last Updated: 2025-11-26*
