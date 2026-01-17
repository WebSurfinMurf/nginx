# Claude AI Assistant Notes - Agent Workflow Documentation

> **URL**: https://nginx.ai-servicers.com/agent-workflow/
> **Created**: 2026-01-17
> **Purpose**: Comprehensive hierarchical documentation of the multi-agent architecture

---

## Critical Notes - Don't Miss These

### MCP Architecture - IMPORTANT

**The ONLY MCP server agents can call is `code-executor`.**

Do NOT list filesystem, postgres, timescaledb, etc. as separate MCP servers that agents access directly. They are underlying servers accessed THROUGH code-executor.

**Correct architecture:**
```
Agent → code-executor → { filesystem, postgres, timescaledb, memory, arangodb, minio, n8n, playwright, ib }
```

**To verify current MCP tools, run:**
```
mcp__code-executor__list_mcp_tools()
```

As of 2026-01-17, this returns:
- **9 servers, 71 tools total**
- arangodb (7), filesystem (9), ib (10), memory (9), minio (9), n8n (6), playwright (6), postgres (9), timescaledb (6)

### AI Swarm Access

AI Swarm is accessed through `code-executor` via `dispatch_to_swarm`, NOT as a separate system. The diagram should show:
- `execute_code` → MCP tools (9 servers, 71 tools)
- `dispatch_to_swarm` → AI Swarm (Gemini, Codex, Claude)

### AI Swarm - Native CLI Integration (IMPORTANT)

**These are NOT simple API calls.** Each swarm node is a native CLI running in a Docker container with:
- **Full read-only access** to all projects (`/workspace` mounted read-only)
- **Native CLI tools**: Gemini CLI, OpenAI Codex CLI, Claude CLI
- **JSON interface**: Structured responses with `assessment`, `concerns`, `suggestions`, `approval` fields

Don't describe these as "AI models" or "API calls" - they are full CLI agents that can read and analyze the actual codebase.

### Things I Got Wrong Initially

1. **Listed gemini-image as an MCP server** - It doesn't exist. Always verify with `list_mcp_tools()`
2. **Showed filesystem/postgres/timescaledb as separate MCP servers** - They're underlying servers accessed via code-executor
3. **Didn't show AI Swarm in the MCP section** - It's a key pathway through code-executor

---

## Site Structure

```
/home/administrator/projects/nginx/sites/agent-workflow/
├── CLAUDE.md          # This file - maintenance notes
├── index.html         # Main documentation (all 5 levels)
├── css/
│   └── style.css      # Styling with agent color coding
└── js/
    └── main.js        # Interactivity, animations, search, dark mode
```

## Documentation Hierarchy (5 Levels)

| Level | Focus | What to Include |
|-------|-------|-----------------|
| 1 | Executive Overview | Agents only (PM, Architect, Security, Developer, QA) |
| 2 | Agent Coordination | Add AI Swarm, workflow with peer review |
| 3 | Agent Details | Deep dive into each agent's tools, responsibilities |
| 4 | Infrastructure | Skills, Hooks, MCP code-executor with both pathways |
| 5 | Implementation | File paths, code examples, handoff protocols |

**Principle**: Each level adds detail. Level 1 shouldn't mention skills/hooks/MCP. Level 4+ includes infrastructure.

---

## Agents Reference

| Agent | Color | Location | Tools |
|-------|-------|----------|-------|
| PM | `#6366f1` (indigo) | `~/.claude/agents/pm.md` | Read, Write, Grep, Glob, Bash |
| Architect | `#8b5cf6` (violet) | `~/projects/.claude/agents/architect.md` | Read, Write, Grep, Glob, Bash |
| Security | `#ef4444` (red) | `~/projects/.claude/agents/security.md` | Read, Write, Grep, Glob, Bash |
| Developer | `#10b981` (emerald) | `~/projects/.claude/agents/developer.md` | Read, Write, Edit, Grep, Glob, Bash |
| QA | `#f59e0b` (amber) | `~/projects/.claude/agents/qa.md` | Read, Write, Edit, Grep, Glob, Bash |

## Skills Count

When updating, verify actual counts:
- **User-level skills**: `ls ~/.claude/skills/`
- **Project-level skills**: `ls ~/projects/.claude/skills/`

## Hooks

Located at `~/.claude/hooks/`:
- pre-tool-use.sh
- post-tool-use.sh
- session-start.sh
- stop.sh
- user-prompt-submit.sh

---

## Updating This Documentation

### Before Making Changes

1. **Verify MCP tools**: `mcp__code-executor__list_mcp_tools()` - don't guess
2. **Check agent files**: Read actual agent .md files for current tools/descriptions
3. **Count skills**: Actually count directories, don't assume

### After Making Changes

1. Redeploy nginx: `cd /home/administrator/projects/nginx && ./deploy.sh`
2. Verify site loads: `curl -sI https://nginx.ai-servicers.com/agent-workflow/`
3. Check in browser for visual issues

### Key CSS Classes

| Class | Purpose |
|-------|---------|
| `.dual-architecture` | MCP section showing both pathways |
| `.arch-branch` | Left/right branches (MCP tools / AI Swarm) |
| `.swarm-box` | AI Swarm container with gradient border |
| `.primary-mcp` | Highlighted code-executor card |
| `.underlying-tool` | Individual MCP server cards with connector lines |

---

## Common Mistakes to Avoid

1. **Don't invent MCP servers** - Always verify with list_mcp_tools()
2. **Don't separate AI Swarm from MCP** - It's accessed via code-executor
3. **Don't show tools agents can't access** - Agents only call code-executor directly
4. **Don't hardcode tool counts** - They change; verify before updating
5. **Keep levels progressive** - Don't dump infrastructure details at Level 1

---

## Related Documentation

- **AI Swarm Architecture**: https://nginx.ai-servicers.com/ai-swarm-architecture/
- **Inter-Agent Protocol**: https://nginx.ai-servicers.com/inter-agent-protocol/
- **MCP Architecture**: https://nginx.ai-servicers.com/mcp-architecture/
- **Context Layers**: https://nginx.ai-servicers.com/context-layers/

---

*Last Updated: 2026-01-17 by Claude*
