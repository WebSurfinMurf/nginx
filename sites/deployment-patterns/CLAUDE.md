# Deployment Patterns Page - Documentation

## Page Purpose
Documents standard patterns for deploying services to linuxserver.lan, including project structure, deploy.sh anatomy, network selection, and Traefik integration.

## Likely Data Sources
```bash
# Example deploy.sh scripts
cat ~/projects/*/deploy.sh

# Standard project structure
ls -la ~/projects/*/

# Docker compose examples
cat ~/projects/*/docker-compose.yml

# Traefik labels examples
grep -r "traefik" ~/projects/*/deploy.sh
```

## Patterns Documented
- Standard project structure
- deploy.sh script anatomy
- Network selection (1/2/3-network patterns)
- Traefik label configuration
- Secrets management
- OAuth2 proxy integration

## How to Update This Page

### Step 1: Review Current Patterns
```bash
# Check deploy.sh patterns across projects
for dir in ~/projects/*/; do
  if [ -f "$dir/deploy.sh" ]; then
    echo "=== $(basename $dir) ==="
    head -50 "$dir/deploy.sh"
  fi
done
```

### Step 2: Identify New Patterns
Look for:
- New network configurations
- Updated Traefik label patterns
- New authentication methods
- Changed secrets management

### Step 3: Update index.html
Edit `/home/administrator/projects/nginx/sites/deployment-patterns/index.html` to:
- Add new pattern sections
- Update code examples
- Update network diagrams if needed

### Step 4: Deploy
```bash
cd /home/administrator/projects/nginx
./deploy.sh
```

## Page Structure

### HTML Sections
- **Header**: Title, subtitle
- **Nav Links**: Portal, Infrastructure, Security, Network
- **Project Structure**: File tree diagram
- **deploy.sh Anatomy**: Code blocks with explanations
- **Network Patterns**: 1/2/3-network diagrams
- **Traefik Integration**: Label examples
- **Secrets Management**: Environment file patterns

## Maintenance Notes
- Parent page: `/infrastructure-docs/`
- Examples should reflect actual deploy.sh scripts
- Update when deployment standards change

---
*Last Updated: 2025-11-26*
*Note: Original source commands not documented - inferred from page content*
