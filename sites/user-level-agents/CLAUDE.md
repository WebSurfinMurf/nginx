# User-Level Agents Page - Documentation

## Page Purpose
Documents the user-level agents loaded from the user's home directory for Claude Code. These agents provide universal orchestration capabilities across all projects.

## Source Directory
```
~/.claude/agents/
```

## Agents Documented (as of 2025-11-26)
1. **pm.md** - Project Manager agent
   - Orchestrates architect, security, and developer agents
   - Task decomposition and delegation
   - Progress tracking and reporting
   - Model: Sonnet
   - Tools: Read, Write, Grep, Glob, Bash

## How to Update This Page

### Step 1: Check Current Agents
```bash
ls -la ~/.claude/agents/
```

### Step 2: Read Each Agent Definition
Each agent is defined in a `.md` file containing:
- Agent name and description
- Model specification (sonnet/opus/haiku)
- Available tools
- Core expertise areas
- Context files loaded
- Workspace directories
- Coordination patterns

```bash
# Read the PM agent definition
cat ~/.claude/agents/pm.md
```

### Step 3: Update index.html
Edit `/home/administrator/projects/nginx/sites/user-level-agents/index.html` to:
- Add/remove agent cards as needed
- Update agent descriptions from the .md files
- Update tools, expertise, and coordination sections
- Update the agent count in stats section

### Step 4: Deploy
```bash
cd /home/administrator/projects/nginx
./deploy.sh
```

## Page Structure

### HTML Sections
- **Header**: Title, subtitle, location box (purple/blue theme)
- **Stats Row**: Agent count badges
- **Intro**: Explanation of user-level agents
- **Agent Card**: Detailed card with:
  - Icon, name, model badge
  - Description
  - Available tools
  - Core expertise list
  - Coordinates with (other agents)
  - Workspace structure
  - Typical workflow steps
  - Context files
- **Comparison Table**: User vs Project agents
- **Footer**: Related links

## Related Pages
- `/project-agents/` - Project-level agents (~/projects/.claude/agents/)
- `/user-level-skills/` - User-level skills
- `/context-compare/` - Parent page with quick-access nav

## Maintenance Notes
- Agents are auto-discovered by Claude Code from `~/.claude/agents/`
- The PM agent coordinates project-level agents (architect, developer, security)
- Agent workspace: `~/projects/data/claudeagents/pm/`
- Update this page when agents are added/modified

---
*Last Updated: 2025-11-26*
