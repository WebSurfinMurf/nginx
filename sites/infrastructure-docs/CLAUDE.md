# Infrastructure Documentation Page - Documentation

## Page Purpose
Main infrastructure overview showing architecture diagram, metrics, and links to detailed sub-pages for the ai-servicers.com / linuxserver.lan infrastructure.

## Likely Data Sources
```bash
# Container count
docker ps --format '{{.Names}}' | wc -l

# Project count
ls -d ~/projects/*/ | wc -l

# Network count
docker network ls --format '{{.Name}}' | wc -l

# MCP tools - from MCP configuration
ls ~/projects/mcp/
```

## Sub-Pages (accessed via nav buttons)
- `/applications/` - Hosted Applications
- `/deployment-patterns/` - Deployment Patterns
- `/security-auth/` - Security & Authentication
- `/network-topology/` - Network Topology

## External Links
- GitHub button → https://github.com/WebSurfinMurf

## How to Update This Page

### Step 1: Gather Current Metrics
```bash
# Get current counts
echo "Containers: $(docker ps --format '{{.Names}}' | wc -l)"
echo "Projects: $(ls -d ~/projects/*/ 2>/dev/null | wc -l)"
echo "Networks: $(docker network ls --format '{{.Name}}' | wc -l)"
```

### Step 2: Update index.html
Edit `/home/administrator/projects/nginx/sites/infrastructure-docs/index.html` to:
- Update metric values in the metric-grid section
- Update project listings if needed
- Add/remove service sections as infrastructure changes

### Step 3: Deploy
```bash
cd /home/administrator/projects/nginx
./deploy.sh
```

## Page Structure

### HTML Sections
- **Header**: Title, subtitle
- **Nav Buttons**: GitHub, sub-page links
- **Metric Grid**: Container count, project count, network count, MCP tools
- **Service Sections**: Grouped by category (Core, Databases, AI/ML, etc.)
- **Footer**: Links and credits

## Maintenance Notes
- This is the parent page for infrastructure documentation
- Sub-pages are accessed via nav buttons (not on main portal)
- Update metrics when significant infrastructure changes occur

---
*Last Updated: 2025-11-26*
*Note: Original source commands not documented - inferred from page content*
