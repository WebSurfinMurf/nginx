# Claude AI Assistant Notes - NGINX Reverse Proxy

> **For overall environment context, see: `/home/administrator/projects/AINotes/AINotes.md`**

## Project Overview
NGINX serves as the main reverse proxy and static site host:
- Central routing point for all web services
- Static site hosting via `/sites/` directory structure
- OAuth2 Proxy integration for Keycloak authentication
- Subdomain-based routing for different services
- SSL termination and certificate management via Traefik

### Static Sites Hosted (Path-Based on nginx.ai-servicers.com)
All static sites are now served under **nginx.ai-servicers.com** using path-based routing.

#### Main Portal Sites (3 sites on landing page)
- **Landing Page** - https://nginx.ai-servicers.com/
  - Portal with index of top-level documentation
- **Context Comparison** - /context-compare/ *(has sub-pages)*
  - Side-by-side comparison of human learning vs AI context loading
  - Quick-access nav bar links to Claude Code documentation sub-pages
- **Infrastructure Documentation** - /infrastructure-docs/ *(has sub-pages)*
  - Complete architecture diagram and system documentation
- **MCP Architecture Guide** - /mcp-architecture/
  - Token-efficient MCP architecture documentation

#### Sub-Pages (accessed via Context Comparison)
These pages are NOT listed on the main portal - they are accessed via quick-access nav bar on `/context-compare/`:
- **Claude Code CLI Config** - /claudecodecliconfig/
  - Executive summary of Claude Code CLI configuration
- **LLM Memory** - /llm-memory/
  - How Claude Code remembers: CLAUDE.md vs OpenMemory
- **User-Level Skills** - /user-level-skills/
  - Documentation of 7 user-level skills from ~/.claude/skills/
- **Project-Level Skills** - /project-skills/
  - Documentation of 8 project-level skills from ~/projects/.claude/skills/
- **User-Level Agents** - /user-level-agents/
  - Documentation of PM agent from ~/.claude/agents/
- **Project-Level Agents** - /project-agents/
  - Documentation of 3 agents from ~/projects/.claude/agents/
- **LangChain Portal** - /langchain-portal/
  - LangChain API directory and quick links

#### Sub-Pages (accessed via Infrastructure Documentation)
These pages are NOT listed on the main portal - they are accessed via nav buttons on `/infrastructure-docs/`:
- **Hosted Applications** - /applications/
  - Directory of all self-hosted applications (25+ apps across 8 categories)
- **Deployment Patterns** - /deployment-patterns/
  - Standard patterns for deploying services to linuxserver.lan
- **Security & Authentication** - /security-auth/
  - Keycloak SSO and OAuth2 Proxy architecture
- **Network Topology** - /network-topology/
  - Docker network architecture visualization
- **DevScripts** - /devscripts/
  - Infrastructure automation tools (27+ scripts for git, maintenance, Claude Code)

#### Sub-Page Hierarchy
```
Main Portal (3 sites)
├── /context-compare/  (quick-access nav bar to Claude Code docs)
│   ├── /claudecodecliconfig/
│   ├── /llm-memory/
│   ├── /mcp-architecture/
│   ├── /user-level-skills/
│   ├── /project-skills/
│   ├── /user-level-agents/
│   ├── /project-agents/
│   └── /langchain-portal/
│
├── /infrastructure-docs/  (nav buttons to infra docs)
│   ├── /applications/
│   ├── /deployment-patterns/
│   ├── /security-auth/
│   ├── /network-topology/
│   └── /devscripts/
│
└── /mcp-architecture/
```
**Note**: When adding/removing sub-pages, update both the parent page nav AND ensure back-links exist on sub-pages.

## Recent Work & Changes
_This section is updated by Claude during each session_

### Session: 2025-11-07 (Context Comparison Page - Side-by-Side)
- **Created Context Comparison Page**: Streamlined two-column comparison format
  - **URL**: https://nginx.ai-servicers.com/context-compare/
  - **Design**: Side-by-side columns with parallel examples in box format
  - **Inspiration**: Uses box design similar to context-architecture "Context Loading Sequence"
  - **Layout**:
    - Left column: Human learning progression (🧑‍💼 New Software Engineer)
    - Right column: AI context loading (🤖 Claude Code)
    - Parallel examples at each level show the equivalency
  - **Content**: 5 levels (0-4) with streamlined examples
    - Level 0: College Graduate vs AI Model (baseline)
    - Level 1: Company Onboarding vs User Level Context
    - Level 2: Department Training vs Project Level Common Context
    - Level 3: Role Assignment vs Project Specific Context
    - Level 4: Assignment Details vs Run-Time Tool Loading
  - **Key Features**:
    - Color-coded levels (gray, blue, orange, purple, green)
    - Concise examples focusing on parallel concepts
    - "Tools learned/loaded on-demand" shown at Level 4
    - Links to other documentation pages
  - **Deployment**:
    - Created directory: `/home/administrator/projects/nginx/sites/context-compare/`
    - Set permissions: `chmod 755` (avoiding 403 error)
    - Added location block to nginx-portal.conf
    - Added card to landing page (6 sites total)
    - Deployed successfully

### Session: 2025-11-07 (New Hire Context Analogy Page)
- **Created New Hire Context Documentation**: Executive-friendly page explaining layered context
  - **URL**: https://nginx.ai-servicers.com/new-hire-context/
  - **Purpose**: Help executives understand the importance of context organization using a relatable analogy
  - **Content**:
    - Level 0: College Graduate (general knowledge) → AI Model (ChatGPT, Copilot)
    - Level 1: Company Context (onboarding) → User Level Context & Tools
    - Level 2: Department Context (training) → Project Level Common Context & Tools
    - Level 3: Job Role Context (shadowing) → Project Specific Context & Tools
    - Level 4: Assignment Context (sprint tasks) → Run-Time Context & Tool Loading
    - Side-by-side comparison grid showing human vs AI context layers
    - Summary explaining how layered context creates specialists
  - **Design**: Clean, professional, easy-to-scan format for executive comprehension
  - **Key Message**: "Without layered context, you have generalists. With layered context, you build specialists."
  - **Deployment**:
    - Created directory: `/home/administrator/projects/nginx/sites/new-hire-context/`
    - Added location block to nginx-portal.conf
    - Added card to landing page (5 sites total)
    - Deployed successfully
  - **Issue Fixed**: 403 Forbidden error due to incorrect directory permissions
    - Directory was created with `700` (drwx------) instead of `755` (drwxr-xr-x)
    - Fixed with `chmod 755 /home/administrator/projects/nginx/sites/new-hire-context/`
    - Root cause: Write tool sometimes creates directories with restrictive permissions
  - **Documentation Updated**:
    - Updated `nginx-static-site` skill with permissions requirements in Step 2
    - Added "403 Forbidden" troubleshooting section to skill
    - Added "Common Gotcha: Directory Permissions" section to nginx/CLAUDE.md
    - Future deployments will include `chmod 755` in the workflow
  - **Page Enhancements**:
    - Made "Claude Code Context" in heading a clickable link to /context-architecture/
    - Added tool learning analogy to Level 4: "Learn tools as needed: Jira workflow, Postman collections, specific APIs"
    - Added new example box showing on-demand tool learning (Postman, Jira)
    - Parallels human learning tools (Postman, Jira) with AI loading tools (skills, MCP tools)
    - Updated both narrative section and comparison grid

### Session: 2025-11-07 (GitLab Backup System & Architecture Refinement)
- **Updated Context Architecture Documentation**: Added comprehensive backup system section
  - **URL**: https://nginx.ai-servicers.com/context-architecture/
  - **New Content**:
    - "Configuration Backup & Version Control" section
    - Documentation of claude-pull and claude-push scripts
    - GitLab repository structure (claude-code-config)
    - What gets backed up vs excluded
    - Best practices for backup workflow
    - Repository location: gitlab.ai-servicers.com/administrators/claude-code-config
  - **Updates to Existing Sections**:
    - Added GitLab backup mentions to Layer 1 (User Bootstrap) and Layer 2 (Infrastructure)
    - Updated implementation checklist with backup script creation
    - Updated footer with backup repository link
    - Removed "Old Approach (Pre-2025-11-07)" historical comparison section
    - Refined layer names to be more descriptive:
      - Layer 1: "User Level Context & Tools"
      - Layer 2: "Project Level Common Context & Tools"
      - Layer 3: "Project Specific Context & Tools"
      - Layer 4: "Run-Time Context & Tool Loading"
  - **Integration**: Backup system now documented alongside context loading architecture

### Session: 2025-11-04 (Part 3 - Claude Context Documentation)
- **Added Claude Code CLI Structure Documentation**: New comprehensive documentation page
  - **URL**: https://nginx.ai-servicers.com/claude-context/
  - **Purpose**: Documents the multi-layered context management system for Claude Code CLI
  - **Content**:
    - Executive summary of context architecture
    - 5-layer system: Initialization, Project Docs, Commands, Skills, Agents
    - Complete documentation of memoryfiles.md bootstrap process
    - 9 core AINotes files loaded on every session
    - 50+ CLAUDE.md project documentation files
    - 11 slash commands with two-tier system
    - 13 infrastructure skills
    - 4 specialized agents with inter-agent protocol
    - OpenMemory (mem0) persistent memory integration
    - 64+ MCP tools across 8 servers
    - Session state management in ~/.claude/
  - **Visual Elements**: SVG architecture diagram, statistics grid, layer cards
  - **Deployment**:
    - Created directory: `/home/administrator/projects/nginx/sites/claude-context/`
    - Added location block to nginx-portal.conf
    - Added card to landing page
    - Deployed successfully

### Session: 2025-11-04 (Part 2 - Path-Based Routing)
- **Migrated to Path-Based Architecture**: Consolidated all static sites under single domain
  - **Why**: Avoids need for multi-wildcard certificates (*.ai-servicers.com AND *.nginx.ai-servicers.com)
  - **Pattern**: All sites served from `nginx.ai-servicers.com/[site-name]/`
  - **Structure**:
    ```
    sites/nginx-portal/          → nginx.ai-servicers.com/
    sites/infrastructure-docs/   → nginx.ai-servicers.com/infrastructure-docs/
    sites/langchain-portal/      → nginx.ai-servicers.com/langchain-portal/
    ```
  - Created landing page at nginx.ai-servicers.com with clickable index
  - Updated nginx-portal.conf with `location` blocks using `alias` directives
  - Removed subdomain configs (infrastructure-docs.conf, langchain-portal.conf)
  - Updated Traefik routing to single domain: `Host(\`nginx.ai-servicers.com\`)`
  - **Benefits**: Single domain, single cert, easy to add new sites

### Session: 2025-11-04 (Part 1 - Infrastructure Consolidation)
- **Infrastructure Consolidation**: Eliminated main-nginx container
  - Moved nginx.ai-servicers.com portal from separate main-nginx container to general nginx container
  - Created nginx-portal site under nginx/sites/nginx-portal/
  - Added nginx-portal.conf configuration
  - Moved data from data/nginx-main/ to data/nginx/nginx-portal/
  - Now serving nginx.ai-servicers.com through main nginx container
  - Reduced container count from 3 nginx containers to 2

### Session: 2025-09-30
- **Static Sites Standard Established**: Created new pattern for hosting static pages
  - Created `/home/administrator/projects/nginx/sites/` directory structure
  - First site: `langchain-portal` at https://langchain-portal.ai-servicers.com
  - Updated deploy.sh to mount sites directory: `-v /home/administrator/projects/nginx/sites:/usr/share/nginx/sites:ro`
  - Created virtual host config pattern in `configs/{site-name}.conf`
  - Added Traefik labels to deploy.sh for automatic HTTPS routing
  - Standard allows multiple static sites without additional containers
- **Configuration Updates**:
  - Fixed Chainguard nginx logging permissions (removed custom log files)
  - Added sites directory mount to both authenticated and direct deployment modes
  - Container now serves both dynamic proxying and static sites

### Session: 2025-08-22
- **Initial Setup**: Created NGINX deployment with OAuth2 Proxy support
- Created deployment script with dual-mode support (with/without auth)
- Configured for Chainguard NGINX image (security-focused)
- Prepared for Keycloak integration
- **Issue Found**: Administrator user lacks Docker access (needs root fix)

## Network Architecture
- **Primary Network**: `traefik-net`
- **Port Configuration**:
  - Port 80: HTTP (OAuth2 Proxy when auth enabled, NGINX direct when disabled)
  - Port 443: HTTPS (future)
- **Authentication Flow**: Browser → OAuth2 Proxy → Keycloak → NGINX

## Container Configuration
### NGINX Container
- **Container**: nginx
- **Image**: cgr.dev/chainguard/nginx:latest (security-hardened)
- **Network**: traefik-net
- **Volumes**:
  - nginx_conf: /etc/nginx/conf.d (configuration)
  - nginx_html: /usr/share/nginx/html (static content)
  - /home/administrator/projects/data/nginx/certs: /etc/nginx/certs (SSL certificates)

### OAuth2 Proxy Container (when enabled)
- **Container**: nginx-oauth2-proxy
- **Image**: quay.io/oauth2-proxy/oauth2-proxy:latest
- **Network**: traefik-net
- **Port**: 80 → 4180 (intercepts all traffic)

## Important Files & Paths
- **Deploy Script**: `/home/administrator/projects/nginx/deploy.sh`
- **Environment**: `$HOME/projects/secrets/nginx.env`
- **Cookie Secret**: `$HOME/projects/secrets/nginx-oauth2-cookie.secret`
- **Docker Fix Guide**: `/home/administrator/projects/nginx/FIX_DOCKER_ACCESS.md`

## Access Points
### Without Authentication (current)
- **Direct**: http://linuxserver.lan
- **Health Check**: http://linuxserver.lan/health

### With Authentication (after Keycloak setup)
- **Protected**: http://linuxserver.lan (requires Keycloak login)
- **Subdomains**: *.ai-servicers.com (future, via Traefik)

## Routing Strategy

### Recommended Approach: Subdomains
Use subdomains for each service (e.g., app1.ai-servicers.com, app2.ai-servicers.com)

**Advantages**:
- Clean URLs without path prefixes
- Better cookie/session isolation
- Easier SSL certificate management (wildcard cert)
- Service independence

### Alternative: Path-based
Use paths for each service (e.g., nginx.ai-servicers.com/app1)

**Disadvantages**:
- More complex application configuration
- Potential path conflicts
- Cookie/session sharing issues

## Keycloak Configuration Required

To enable authentication:

1. **Create Client in Keycloak Admin**:
   - Client ID: `nginx`
   - Client Protocol: `openid-connect`
   - Access Type: `confidential`
   - Valid Redirect URIs: `http://linuxserver.lan/oauth2/callback`
   - Web Origins: `http://linuxserver.lan`

2. **Get Client Secret**:
   - Go to Credentials tab
   - Copy the secret
   - Update in `$HOME/projects/secrets/nginx.env`

3. **Enable Authentication**:
   - Set `OAUTH2_PROXY_ENABLED=true` in nginx.env
   - Run deploy.sh again

## Service Configuration Examples

### Adding a New Service (Subdomain)

1. Create NGINX config: `/etc/nginx/conf.d/service.conf`
```nginx
server {
    listen 80;
    server_name service.ai-servicers.com;
    
    location / {
        proxy_pass http://service-container:port;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

2. Update DNS or /etc/hosts
3. Reload NGINX: `docker exec nginx nginx -s reload`

## Known Issues & TODOs
- [x] Create deployment structure
- [x] Set up dual-mode deployment (auth/no-auth)
- [ ] Fix Docker access for administrator user
- [ ] Configure Keycloak client
- [ ] Test OAuth2 Proxy integration
- [ ] Add SSL/TLS support
- [ ] Configure service routing rules
- [ ] Set up monitoring/logging

## Common Commands
```bash
# Deploy NGINX
cd /home/administrator/projects/nginx
./deploy.sh

# Check container status
docker ps | grep nginx

# View NGINX logs
docker logs nginx --tail 20

# View OAuth2 Proxy logs (when enabled)
docker logs nginx-oauth2-proxy --tail 20

# Reload NGINX configuration
docker exec nginx nginx -s reload

# Test configuration
docker exec nginx nginx -t

# Access container shell
docker exec -it nginx sh
```

## Troubleshooting

1. **Docker Permission Denied**: 
   - See `/home/administrator/projects/nginx/FIX_DOCKER_ACCESS.md`
   - Administrator user needs to be added to docker group

2. **OAuth2 Proxy Issues**:
   - Check cookie secret is exactly 32 bytes (base64 of 24 bytes)
   - Verify Keycloak client configuration
   - Check redirect URLs match exactly

3. **Service Not Accessible**:
   - Verify NGINX configuration syntax
   - Check upstream service is running
   - Review proxy headers

4. **502 Bad Gateway**:
   - Upstream service not running
   - Wrong container name or port
   - Network connectivity issues

## Backup Considerations
- **Configuration**: nginx_conf volume
- **Static Content**: nginx_html volume  
- **SSL Certificates**: /home/administrator/projects/data/nginx/certs directory
- **Environment**: nginx.env file
- **Cookie Secret**: Backup OAuth2 proxy cookie secret

## Security Notes
- Using Chainguard image for reduced attack surface
- OAuth2 Proxy provides centralized authentication
- Keep KEYCLOAK_CLIENT_SECRET secure
- Regular updates recommended for security patches

## Static Site Hosting Standard (Path-Based)

### Current Architecture (Updated 2025-11-04)

**All static sites are served under `nginx.ai-servicers.com` using path-based routing.**

**URL Pattern**: `nginx.ai-servicers.com/[site-name]/`

**Benefits**:
- ✅ Single domain, single certificate (*.ai-servicers.com covers it)
- ✅ No multi-wildcard certificates needed
- ✅ Easy to add new sites (directory + location block + link)
- ✅ Clean disk organization
- ✅ Simple landing page shows all available sites

### Directory Structure
```
/home/administrator/projects/nginx/sites/
├── nginx-portal/          → nginx.ai-servicers.com/ (landing page)
├── infrastructure-docs/   → nginx.ai-servicers.com/infrastructure-docs/
├── langchain-portal/      → nginx.ai-servicers.com/langchain-portal/
├── claude-context/        → nginx.ai-servicers.com/claude-context/
└── [new-site]/           → nginx.ai-servicers.com/[new-site]/
```

### Deploying a New Static Site

#### Step 1: Create Site Directory
```bash
mkdir -p /home/administrator/projects/nginx/sites/[site-name]/
```

#### Step 2: Add HTML Content
```bash
# Create your index.html
cat > /home/administrator/projects/nginx/sites/[site-name]/index.html <<'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Your Site Title</title>
</head>
<body>
    <h1>Your Site Content</h1>
</body>
</html>
EOF
```

#### Step 3: Add Location Block to nginx-portal.conf
Edit `/home/administrator/projects/nginx/configs/nginx-portal.conf`:
```nginx
# Add this before the health check endpoint:
# Your New Site
location /[site-name]/ {
    alias /usr/share/nginx/sites/[site-name]/;
    index index.html;
    try_files $uri $uri/ =404;
}
```

#### Step 4: Add Link to Landing Page
Edit `/home/administrator/projects/nginx/sites/nginx-portal/index.html` and add:
```html
<a href="/[site-name]/" class="service-card">
    <div class="icon">🎯</div>
    <h3>Your Site Name</h3>
    <p>Description of your site</p>
</a>
```

#### Step 5: Deploy
```bash
cd /home/administrator/projects/nginx
./deploy.sh
```

#### Step 6: Access
Your site will be available at: `https://nginx.ai-servicers.com/[site-name]/`

### Configuration Details

**nginx-portal.conf structure**:
```nginx
server {
    listen 80;
    server_name nginx.ai-servicers.com;

    root /usr/share/nginx/sites/nginx-portal;
    index index.html;

    # Landing page
    location = / {
        try_files /index.html =404;
    }

    # Each site gets a location block with alias
    location /infrastructure-docs/ {
        alias /usr/share/nginx/sites/infrastructure-docs/;
        index index.html;
        try_files $uri $uri/ =404;
    }

    # Add more sites here...
}
```

**Traefik Routing** (in deploy.sh):
```bash
--label "traefik.http.routers.nginx.rule=Host(\`nginx.ai-servicers.com\`)"
```

### Important Notes
- **No separate config files** - All sites use one nginx-portal.conf
- **No Traefik changes** - Single domain handles all paths
- **No certificate changes** - *.ai-servicers.com wildcard covers nginx.ai-servicers.com
- **Clean URLs** - Users see nginx.ai-servicers.com/site-name/ (no "sites" in URL)
- **Organized disk** - All sites in sites/ directory

### ⚠️ Common Gotcha: Use Relative URLs

**All internal links within nginx.ai-servicers.com sites must use relative paths.**

- ✅ `href="/infrastructure-docs/"` (relative)
- ❌ `href="https://nginx.ai-servicers.com/infrastructure-docs/"` (absolute)

**Why**: Sites are all served from the same domain. Relative paths are cleaner, portable, and work correctly regardless of protocol (http/https).

### ⚠️ Common Gotcha: Directory Permissions

**Problem**: New site returns "403 Forbidden"

**Cause**: When creating directories with `mkdir` or using the Write tool, directories sometimes get created with `700` permissions (owner-only access). The nginx container process needs read/execute access.

**Solution**: Always set directory permissions to `755` after creating a site directory:
```bash
chmod 755 /home/administrator/projects/nginx/sites/[site-name]/
```

**Check permissions**:
```bash
ls -ld /home/administrator/projects/nginx/sites/[site-name]/
# Should show: drwxr-xr-x (755)
```

**All site directories must have `755` permissions for nginx to access them.**

---
*Last Updated: 2025-11-07 by Claude*