# Security & Authentication Page - Documentation

## Page Purpose
Documents Keycloak SSO and OAuth2 Proxy architecture for the linuxserver.lan infrastructure, including protected services and authentication flow.

## Likely Data Sources
```bash
# List OAuth2 proxy containers
docker ps --format '{{.Names}}' | grep -E 'auth-proxy|oauth2'

# Keycloak configuration
docker exec keycloak /opt/keycloak/bin/kcadm.sh get clients -r master

# Check protected services
docker ps --format '{{.Names}}' | grep proxy

# Traefik routing for auth
docker inspect traefik --format '{{json .Config.Labels}}'
```

## Components Documented
- Keycloak SSO server
- OAuth2 Proxy containers
- Protected services list
- Authentication flow diagram
- Client configuration

## How to Update This Page

### Step 1: Get Current Auth Setup
```bash
# List all OAuth2 proxy containers
docker ps --format '{{.Names}}' | grep -i proxy

# Count protected services
docker ps --format '{{.Names}}' | grep -i auth-proxy | wc -l
```

### Step 2: Check Keycloak Clients
```bash
# Via Keycloak admin console
# https://keycloak.ai-servicers.com/admin
```

### Step 3: Update index.html
Edit `/home/administrator/projects/nginx/sites/security-auth/index.html` to:
- Update protected services list
- Update service count in stats
- Add new OAuth2 proxy configurations
- Update authentication flow if changed

### Step 4: Deploy
```bash
cd /home/administrator/projects/nginx
./deploy.sh
```

## Page Structure

### HTML Sections
- **Header**: Title, subtitle
- **Nav Links**: Portal, Infrastructure, Deployment, Network
- **Stats Grid**: Protected services count, Keycloak clients
- **Architecture Diagram**: Auth flow visualization
- **Protected Services**: List with status
- **Setup Guide**: Step-by-step Keycloak client creation

## Maintenance Notes
- Parent page: `/infrastructure-docs/`
- Update when new services get OAuth2 protection
- Keycloak URL: https://keycloak.ai-servicers.com

---
*Last Updated: 2025-11-26*
*Note: Original source commands not documented - inferred from page content*
