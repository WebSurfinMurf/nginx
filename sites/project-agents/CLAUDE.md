# Project-Level Agents Page - Documentation

## Page Purpose
Documents the 3 project-level agents loaded from the projects directory for Claude Code. These are infrastructure-specific specialist agents for the linuxserver.lan environment.

## Source Directory
```
~/projects/.claude/agents/
```

## Agents Documented (as of 2025-11-26)
1. **architect.md** - System design and architecture specialist
   - Infrastructure design, tech stack decisions
   - Service integration planning, performance optimization
   - Model: Sonnet
   - Tools: Read, Write, Grep, Glob, Bash

2. **developer.md** - Implementation and deployment specialist
   - Coding, service deployment, debugging
   - Database operations, container management
   - Model: Sonnet
   - Tools: Read, Write, Edit, Grep, Glob, Bash

3. **security.md** - Security and network infrastructure specialist
   - Network topology, firewall rules, SSL/TLS
   - Keycloak/OAuth2 setup, Traefik routing
   - Model: Sonnet
   - Tools: Read, Write, Grep, Glob, Bash

## Additional Files
- **AGENT-UPDATES-2025-11-02.md** - Historical agent update notes

## How to Update This Page

### Step 1: Check Current Agents
```bash
ls -la ~/projects/.claude/agents/
```

### Step 2: Read Each Agent Definition
Each agent is defined in a `.md` file containing:
- Agent name and description
- Model specification (sonnet/opus/haiku)
- Available tools
- Core expertise areas
- Context files loaded
- Escalation patterns

```bash
# Read agent definitions
cat ~/projects/.claude/agents/architect.md
cat ~/projects/.claude/agents/developer.md
cat ~/projects/.claude/agents/security.md
```

### Step 3: Update index.html
Edit `/home/administrator/projects/nginx/sites/project-agents/index.html` to:
- Add/remove agent cards as needed
- Update agent descriptions from the .md files
- Update tools, expertise, and escalation sections
- Update the agent count in stats section

### Step 4: Deploy
```bash
cd /home/administrator/projects/nginx
./deploy.sh
```

## Page Structure

### HTML Sections
- **Header**: Title, subtitle, location box (red theme)
- **Stats Row**: Agent count badges
- **Intro**: Explanation of project-level agents
- **Coordination Flow**: Visual diagram showing PM → Architect → Security → Developer
- **Agent Cards** (3 cards): Each with:
  - Icon, name, model badge
  - Color-coded left border (blue=architect, green=developer, orange=security)
  - Description
  - Available tools grid
  - Core expertise list
  - Context files
  - Escalates to (other agents)
- **Comparison Table**: Project vs User agents
- **Footer**: Related links

## Related Pages
- `/user-level-agents/` - User-level agents (~/.claude/agents/)
- `/project-skills/` - Project-level skills
- `/context-compare/` - Parent page with quick-access nav

## Maintenance Notes
- Agents are auto-discovered by Claude Code from `~/projects/.claude/agents/`
- These agents are coordinated by the PM agent (user-level)
- Typical flow: PM → Architect → Security → Developer
- Update this page when agents are added/modified

---
*Last Updated: 2025-11-26*
