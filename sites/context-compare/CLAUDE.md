# Context Compare Page - Documentation

## Page Purpose
Side-by-side comparison of human learning progression vs AI context loading. Demonstrates how both humans and AI start with general knowledge and progressively specialize through layered context.

## Format Preservation Rules

**CRITICAL**: Keep the EXACT two-column layout format for all future changes.

### Change Guidelines
1. **Default scope**: Changes should be LIMITED to updating the "AI Coding Context" column (right side) unless explicitly specified by the user
2. **Human Learning column** (left side): Do NOT modify unless user specifically requests it
3. **Layout structure**: Preserve the 5-level hierarchy (Level 0-4) and box formatting
4. **Link style**: Use relative paths for internal nginx sites, absolute URLs for external resources

---

## Quick-Access Navigation Bar (Top of Page)

These links appear at the top of the page for easy access to all referenced documentation:

| Icon | Label | URL |
|------|-------|-----|
| 🛠️ | CLI Config | `/claudecodecliconfig/` |
| 🧠 | LLM Memory | `/llm-memory/` |
| ⚙️ | MCP Architecture | `/mcp-architecture/` |
| 🏷️ | User Skills | `/user-level-skills/` |
| 🛠️ | Project Skills | `/project-skills/` |
| 📋 | User Agents | `/user-level-agents/` |
| 🔧 | Project Agents | `/project-agents/` |

---

## All Links on Page (Organized by Level)

### Header
| Link Text | URL | Type | Description |
|-----------|-----|------|-------------|
| Claude Code | `/claudecodecliconfig/` | Internal | Claude CLI Configuration documentation |

### Level 0: Baseline (AI Model)
| Link Text | URL | Type | Description |
|-----------|-----|------|-------------|
| Claude | `https://www.anthropic.com/claude-code` | External | Anthropic's official Claude Code product page |
| ChatGPT | `https://developers.openai.com/codex/cli` | External | OpenAI's official Codex CLI documentation |
| Gemini | `https://geminicli.com/` | External | Gemini CLI landing page |

### Level 1: User Level Context (~/.claude/)
| Link Text | URL | Type | Description |
|-----------|-----|------|-------------|
| user-level skills | `/user-level-skills/` | Internal | 7 user-level skills documentation |
| agent | `/user-level-agents/` | Internal | PM agent documentation |

### Level 2: Project Level Common Context (~/projects/.claude/)
| Link Text | URL | Type | Description |
|-----------|-----|------|-------------|
| Infrastructure documentation | `/deployment-patterns/` | Internal | Deployment patterns documentation |
| projects skills | `/project-skills/` | Internal | 8 project-level skills documentation |
| agents | `/project-agents/` | Internal | 3 project-level agents (Architect, Developer, Security) |
| Network topology | `/network-topology/` | Internal | Network topology visualization |
| security policies | `/security-auth/` | Internal | Security & authentication documentation |

### Level 3: Project Specific Context (~/projects/{service}/)
| Link Text | URL | Type | Description |
|-----------|-----|------|-------------|
| Service architecture | `/infrastructure-docs/` | Internal | Infrastructure documentation |

### Level 4: Run-Time Tool Loading
| Link Text | URL | Type | Description |
|-----------|-----|------|-------------|
| mem0 | `/llm-memory/` | Internal | LLM Memory / OpenMemory documentation |
| mcp-code-executioner | `/mcp-architecture/` | Internal | MCP Architecture Guide |
| Application integration | `/applications/` | Internal | Hosted Applications directory |

### Footer Links
| Link Text | URL | Type | Description |
|-----------|-----|------|-------------|
| Detailed New Hire Analogy | `/new-hire-context/` | Internal | New hire context analogy page |
| Technical Architecture | `/claudecodecliconfig/` | Internal | Claude CLI configuration |
| All Documentation | `/` | Internal | Nginx portal landing page |

---

## Link Summary

### Internal Links (Relative - nginx.ai-servicers.com)
- `/claudecodecliconfig/` - Claude CLI Configuration
- `/user-level-skills/` - User-Level Skills (7)
- `/user-level-agents/` - User-Level Agents (PM)
- `/project-skills/` - Project-Level Skills (8)
- `/project-agents/` - Project-Level Agents (3)
- `/deployment-patterns/` - Deployment Patterns
- `/network-topology/` - Network Topology
- `/security-auth/` - Security & Authentication
- `/infrastructure-docs/` - Infrastructure Documentation
- `/llm-memory/` - LLM Memory
- `/mcp-architecture/` - MCP Architecture
- `/applications/` - Hosted Applications
- `/new-hire-context/` - New Hire Analogy
- `/` - Portal Landing Page

### External Links (Absolute URLs)
- `https://www.anthropic.com/claude-code` - Claude Code (Anthropic product page)
- `https://developers.openai.com/codex/cli` - OpenAI Codex CLI
- `https://geminicli.com/` - Gemini CLI (landing page)

---

## Content by Level (AI Column)

### Level 0: Baseline
- **Title**: AI Model
- **Context Type**: General training (Claude, ChatGPT, Gemini, etc.)
- **What It Knows**: General programming, common frameworks, best practices, public documentation

### Level 1: User Level Context
- **Title**: User Level Context
- **Context Type**: ~/.claude/
- **What It Loads**: User preferences, 7 user-level skills, Session history, 1 agent (PM)

### Level 2: Project Level Common Context
- **Title**: Project Level Common Context
- **Context Type**: ~/projects/.claude/
- **What It Loads**: Infrastructure documentation, 8 projects skills, 3 agents, Network topology and security policies

### Level 3: Project Specific Context
- **Title**: Project Specific Context
- **Context Type**: ~/projects/{service}/CLAUDE.md
- **What It Loads**: Service architecture, Docker configuration, API endpoints, Recent changes

### Level 4: Run-Time Tool Loading
- **Title**: Run-Time Tool Loading
- **Context Type**: On-demand tools
- **What It Loads**: mem0 (past lessons), mcp-code-executioner, Skill invocations, Application integration

---

## Maintenance Notes

1. **Adding new links**: Follow the pattern of existing links in the same level
2. **URL format**: Internal = relative (`/path/`), External = absolute (`https://...`)
3. **External links**: Add `target="_blank"` attribute for new tab opening
4. **Testing**: After changes, deploy nginx and verify all links work

---

*Last Updated: 2025-11-26*
