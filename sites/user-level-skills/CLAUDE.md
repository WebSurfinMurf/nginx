# User-Level Skills Page - Documentation

## Page Purpose
Documents the 7 user-level skills loaded from the user's home directory for Claude Code.

## Source Directory
```
~/.claude/skills/
```

## Skills Documented (as of 2025-11-26)
1. **naming-validator** - Resource naming standards validation
2. **secrets-security** - Secrets management and security hardening
3. **openmemory** - mem0/OpenMemory integration for persistent memory
4. **gitlab-integration** - GitLab repository management and CI/CD
5. **architecture-diagram-creator** - Project architecture diagram generation
6. **claudemd-generator** - CLAUDE.md file generation
7. **skill-creator** - Guide for creating new skills

## How to Update This Page

### Step 1: Check Current Skills
```bash
ls -la ~/.claude/skills/
```

### Step 2: Read Each Skill's SKILL.md
Each skill directory contains a `SKILL.md` file with:
- Skill name and description
- Trigger phrases
- Key features/capabilities
- Usage examples

```bash
# Example: Read a skill definition
cat ~/.claude/skills/naming-validator/SKILL.md
```

### Step 3: Update index.html
Edit `/home/administrator/projects/nginx/sites/user-level-skills/index.html` to:
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
- **Header**: Title, subtitle, location box
- **Stats Row**: Skill count badges
- **Intro**: Explanation of user-level skills
- **Skills Grid**: Individual skill cards with:
  - Icon and name
  - Skill filename (code badge)
  - Description
  - Trigger phrases
  - Key features list
- **Comparison Table**: User vs Project skills
- **Footer**: Related links

## Related Pages
- `/project-skills/` - Project-level skills (~/projects/.claude/skills/)
- `/context-compare/` - Parent page with quick-access nav
- `/claudecodecliconfig/` - CLI configuration overview

## Maintenance Notes
- Skills are auto-discovered by Claude Code from `~/.claude/skills/`
- Each skill must have a `SKILL.md` file to be recognized
- Update this page when skills are added/removed/modified

---
*Last Updated: 2025-11-26*
