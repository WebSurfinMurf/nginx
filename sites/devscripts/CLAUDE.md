# DevScripts Page - Documentation

## Page Purpose
Documents infrastructure automation tools available in the devscripts directory. Provides quick reference for system maintenance, git management, Claude Code management, backup, and utility scripts.

## Source Directory
```
/home/administrator/projects/devscripts/
```

## Primary Source File
```
/home/administrator/projects/devscripts/CLAUDE.md
```

This is the authoritative source for script inventory and descriptions.

## How to Update This Page

### Step 1: Check Current Scripts
```bash
# List all scripts
ls -la /home/administrator/projects/devscripts/*.sh
ls -la /home/administrator/projects/devscripts/*.py

# Read the source CLAUDE.md for current inventory
cat /home/administrator/projects/devscripts/CLAUDE.md
```

### Step 2: Compare with Page Content
Look for:
- New scripts added to devscripts/
- Scripts removed or deprecated
- Updated usage patterns or descriptions
- New categories of scripts

### Step 3: Update index.html
Edit `/home/administrator/projects/nginx/sites/devscripts/index.html` to:
- Add new script cards
- Remove deprecated scripts
- Update descriptions and usage examples
- Update stats (script count, categories)

### Step 4: Deploy
```bash
cd /home/administrator/projects/nginx
./deploy.sh
```

## Page Structure

### HTML Sections
- **Header**: Title, subtitle, back link to infrastructure-docs
- **Stats Bar**: Script count, category count, languages
- **Categories** (6 total):
  1. System Maintenance (healthcheck.sh, cleanserver.sh, updatelinux.sh)
  2. Git Management (gitinit, gitpush, gitpull, gitversion)
  3. Claude Code Management (claude-push/pull, validate, bulk-generate, etc.)
  4. Backup & Maintenance (backup scripts, log rotation)
  5. Utilities (find-project, mergecode, restorecode, sharefile, etc.)
  6. Tools (glab CLI, claude-diff)

### Script Card Structure
Each script card includes:
- Script name (with language tag if Python)
- Description
- Usage example

## Scripts Inventory (from source)

### System Maintenance
- healthcheck.sh - System and Docker health monitoring
- cleanserver.sh - Docker cleanup and log rotation
- updatelinux.sh - System update automation

### Git Management
- gitinit - Initialize git repo on GitLab/GitHub
- gitpush - Git push with retry logic
- gitpull - Git pull helper
- gitversion - Git version/tag helper

### Claude Code Management
- claude-push/claude-pull - Config backup to GitLab
- validate-claude-md.py - Validate CLAUDE.md files
- bulk-generate-claude.sh - Generate CLAUDE.md for all projects
- build-claude-index.py - Build searchable index
- detect-patterns.py - Detect code patterns
- claude-diff.py - Compare configurations
- update-claude-after-deploy.sh - Update docs post-deployment

### Backup & Maintenance
- backup/backup-projects-data.sh - Main backup script
- backup/setup-backup-mount.sh - USB drive setup
- maintenance/cleanup-logs-and-ephemeral-data.sh - Weekly cleanup
- maintenance/setup-docker-log-rotation.sh - Docker log config

### Utilities
- find-project.py - Search projects
- project-health-check.py - Project health assessment
- mergecode - Merge code from multiple sources
- restorecode - Restore from backups
- sharefile - Create temp sharing links
- cleanup-github-repos.sh - Clean sensitive data from Git
- delete_repos.sh - Bulk delete repositories

### Tools
- glab - GitLab CLI v1.77.0
- claude-diff.py - Compare Claude configs

## Maintenance Notes
- Parent page: `/infrastructure-docs/`
- Source: `/home/administrator/projects/devscripts/CLAUDE.md`
- Update when scripts are added, removed, or significantly changed

---
*Last Updated: 2025-11-26*
