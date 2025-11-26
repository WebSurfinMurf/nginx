# Documentation Sites Project Plan

**Created:** 2025-11-25
**Sites to Create:** security-auth, deployment-patterns, network-topology
**Target Location:** nginx.ai-servicers.com/[site-name]/

---

## Site 1: security-auth

### Purpose
Document the complete Keycloak SSO and OAuth2 proxy architecture, enabling users to understand authentication flows and add new protected services.

### Content Sections

1. **Architecture Overview**
   - SSO flow diagram: Browser → Traefik → OAuth2 Proxy → Keycloak → Service
   - Token lifecycle (access tokens, refresh tokens, session cookies)
   - When authentication happens vs when it's bypassed

2. **Keycloak Configuration**
   - Realm structure (ai-servicers realm)
   - Client types: confidential vs public
   - Groups and roles (/administrators group)
   - User federation if any
   - Keycloak admin URL: keycloak.ai-servicers.com

3. **OAuth2 Proxy Setup**
   - All 16 protected services listed:
     - alist-auth-proxy
     - arangodb-auth-proxy
     - dashy-auth-proxy
     - dozzle-auth-proxy
     - drawio-auth-proxy
     - grafana-auth-proxy
     - loki-auth-proxy
     - microbin-auth-proxy
     - mongo-express-auth-proxy
     - netdata-auth-proxy
     - obsidian-auth-proxy
     - openmemory-ui-auth-proxy
     - portainer-auth-proxy
     - qdrant-auth-proxy
     - redis-commander-auth-proxy
     - stirling-pdf-auth-proxy
   - Standard OAuth2 proxy configuration template
   - Environment variables required
   - Cookie secret generation

4. **Adding a New Protected Service**
   - Step-by-step guide with code examples
   - Keycloak client creation
   - OAuth2 proxy container setup
   - Traefik label configuration
   - Testing authentication flow

5. **Troubleshooting**
   - Common issues: redirect loops, 401 errors, cookie problems
   - Debug logging
   - Token inspection

### Data Sources
- /home/administrator/projects/keycloak/
- /home/administrator/secrets/*.env (OAuth2 configs)
- Docker inspect of auth-proxy containers
- Keycloak admin API

### Visual Elements
- SSO flow diagram (SVG)
- Service protection matrix (which services are protected)
- Decision tree: "Should this service be protected?"

### Estimated Effort
- Research: 1 hour (gather configs from 16 proxies)
- Content: 2 hours
- Design/HTML: 1 hour
- Testing: 30 min

---

## Site 2: deployment-patterns

### Purpose
Document the standard patterns for deploying new services to the infrastructure, ensuring consistency and reducing onboarding time.

### Content Sections

1. **Standard Project Structure**
   ```
   /home/administrator/projects/[service]/
   ├── deploy.sh           # Deployment script
   ├── docker-compose.yml  # Optional compose file
   ├── CLAUDE.md           # AI context documentation
   ├── README.md           # Human documentation
   └── configs/            # Service-specific configs

   /home/administrator/secrets/
   └── [service].env       # Environment variables
   ```

2. **deploy.sh Anatomy**
   - Standard structure and sections
   - Environment loading pattern
   - Docker run command best practices
   - Traefik label templates
   - Network attachment patterns
   - Health check configuration
   - Example from a well-structured service

3. **Network Selection Guide**
   - When to use which network
   - 3-network pattern (traefik-net + keycloak-net + app-net)
   - 2-network pattern (traefik-net + database-net)
   - 1-network pattern (traefik-net only)
   - Creating new networks when needed

4. **Traefik Integration**
   - Required labels for HTTPS routing
   - Middleware configuration
   - Path-based vs subdomain routing
   - SSL certificate handling

5. **Secrets Management**
   - Environment file patterns
   - Loading secrets in deploy.sh
   - Never hardcoding credentials
   - Secrets file naming convention

6. **OAuth2 Protection** (links to security-auth)
   - When to add OAuth2 proxy
   - Quick setup checklist

7. **Logging Integration**
   - Promtail/Loki labels
   - Log driver configuration
   - Structured logging

8. **Deployment Checklist**
   - Pre-deployment verification
   - Deployment steps
   - Post-deployment validation
   - Rollback procedures

### Data Sources
- /home/administrator/projects/*/deploy.sh (40+ examples)
- /home/administrator/projects/CLAUDE.md (master patterns)
- Existing service-deployment skill

### Visual Elements
- Deployment flow diagram
- Network selection decision tree
- Checklist cards for each deployment type

### Estimated Effort
- Research: 1 hour (analyze deploy.sh patterns)
- Content: 2.5 hours
- Design/HTML: 1.5 hours
- Testing: 30 min

---

## Site 3: network-topology

### Purpose
Provide a visual, interactive representation of the Docker network architecture showing which containers connect to which networks.

### Content Sections

1. **Network Overview**
   - 29 custom Docker networks
   - Core networks vs service-specific networks
   - Network isolation philosophy

2. **Interactive Network Diagram**
   - Visual map showing all networks as nodes
   - Containers as connected elements
   - Color-coded by network type:
     - Orange: Entry/routing (traefik-net)
     - Purple: Security (keycloak-net)
     - Blue: AI services (litellm-net, etc.)
     - Green: Data (postgres-net, redis-net, etc.)
     - Gray: Application networks

3. **Network Details**
   For each of the 29 networks:
   - Network name
   - Purpose
   - Connected containers (with count)
   - Subnet if relevant
   - External vs internal

4. **Core Networks Deep Dive**
   - **traefik-net**: All externally accessible services
   - **postgres-net**: Database connections
   - **keycloak-net**: Authentication services
   - **mcp-net**: MCP server communication
   - **loki-net**: Logging infrastructure

5. **Container-to-Network Matrix**
   - Table showing all 78 containers
   - Which networks each connects to
   - Sortable/filterable

6. **Network Patterns**
   - Standard patterns for different service types
   - Why certain containers need multiple networks
   - Security implications of network choices

7. **Troubleshooting Network Issues**
   - Container can't reach another container
   - DNS resolution within Docker
   - Network inspection commands

### Data Sources
- docker network ls
- docker network inspect [each network]
- docker inspect [containers] for network attachments

### Visual Elements
- **Primary**: Interactive SVG network topology diagram
- Network legend with color coding
- Expandable network cards showing members
- Container search/filter

### Technical Approach
- Generate data dynamically from Docker API or cache
- SVG-based visualization
- CSS for interactivity (hover states, expandable sections)
- Consider using D3.js-style force-directed graph OR
- Simple grid/flow diagram

### Estimated Effort
- Research: 1.5 hours (gather all network/container mappings)
- Content: 1.5 hours
- Design/HTML/SVG: 3 hours (most complex visually)
- Testing: 30 min

---

## Implementation Order

### Recommended Sequence

1. **deployment-patterns** (First)
   - Most foundational
   - Useful immediately for new service deployments
   - Moderate complexity

2. **security-auth** (Second)
   - Builds on deployment-patterns
   - High value for protected services
   - Moderate complexity

3. **network-topology** (Third)
   - Most visually complex
   - Benefits from understanding deployment patterns first
   - Can reuse data gathered for other sites

### Total Estimated Effort
- deployment-patterns: ~5.5 hours
- security-auth: ~4.5 hours
- network-topology: ~6.5 hours
- **Total: ~16.5 hours**

---

## File Structure to Create

```
/home/administrator/projects/nginx/sites/
├── security-auth/
│   └── index.html
├── deployment-patterns/
│   └── index.html
└── network-topology/
    └── index.html

/home/administrator/projects/nginx/configs/nginx-portal.conf
  (add 3 new location blocks)

/home/administrator/projects/nginx/sites/nginx-portal/index.html
  (add 3 new cards to landing page)
```

---

## Pre-Implementation Data Gathering

### For security-auth
```bash
# Get all OAuth2 proxy configs
for proxy in $(docker ps --format "{{.Names}}" | grep auth-proxy); do
  echo "=== $proxy ==="
  docker inspect $proxy --format '{{json .Config.Env}}' | jq .
done

# Get Keycloak clients
# (via Keycloak admin API or UI inspection)
```

### For deployment-patterns
```bash
# Analyze common patterns in deploy.sh files
grep -h "docker run" /home/administrator/projects/*/deploy.sh | head -20
grep -h "traefik" /home/administrator/projects/*/deploy.sh | head -20
```

### For network-topology
```bash
# Get all network-to-container mappings
for net in $(docker network ls --format "{{.Name}}" | grep -v "bridge\|host\|none"); do
  echo "=== $net ==="
  docker network inspect $net --format '{{range .Containers}}{{.Name}} {{end}}'
done
```

---

## Success Criteria

Each site should:
1. Load in under 2 seconds
2. Be mobile-responsive
3. Match the dark theme of infrastructure-docs
4. Include navigation links to other documentation
5. Be self-contained (no external dependencies)
6. Include last-updated timestamp
7. Be accurate and reflect current infrastructure state
