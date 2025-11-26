# Network Topology Page - Documentation

## Page Purpose
Documents Docker network architecture showing all networks, containers, and their connections on linuxserver.lan.

## Likely Data Sources
```bash
# List all Docker networks
docker network ls

# Get network details
docker network inspect <network-name>

# List containers on each network
for net in $(docker network ls --format '{{.Name}}'); do
  echo "=== $net ==="
  docker network inspect $net --format '{{range .Containers}}{{.Name}} {{end}}'
done

# Get container network connections
docker inspect <container> --format '{{json .NetworkSettings.Networks}}'
```

## Networks Documented
- Core networks (traefik-net, postgres-net, keycloak-net, etc.)
- Service-specific networks
- Container-to-network mappings

## How to Update This Page

### Step 1: Get Current Network State
```bash
# Count networks
docker network ls --format '{{.Name}}' | wc -l

# Count containers
docker ps --format '{{.Names}}' | wc -l

# List all networks with container counts
for net in $(docker network ls --format '{{.Name}}'); do
  count=$(docker network inspect $net --format '{{len .Containers}}')
  echo "$net: $count containers"
done
```

### Step 2: Map Network Connections
```bash
# For each container, show its networks
docker ps --format '{{.Names}}' | while read container; do
  echo "=== $container ==="
  docker inspect $container --format '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}'
done
```

### Step 3: Update index.html
Edit `/home/administrator/projects/nginx/sites/network-topology/index.html` to:
- Update network count in stats
- Update container count
- Add/remove network cards
- Update container lists per network

### Step 4: Deploy
```bash
cd /home/administrator/projects/nginx
./deploy.sh
```

## Page Structure

### HTML Sections
- **Header**: Title, subtitle
- **Nav Links**: Portal, Infrastructure, Deployment, Security
- **Stats Grid**: Network count, container count
- **Core Networks**: Cards for main networks with container lists
- **Network Diagram**: Visual topology (if present)
- **Connection Patterns**: Common network configurations

## Maintenance Notes
- Parent page: `/infrastructure-docs/`
- Update when networks are added/removed
- Update when containers change network membership

---
*Last Updated: 2025-11-26*
*Note: Original source commands not documented - inferred from page content*
