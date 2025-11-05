# Port Inventory for LinuxServer

## Currently Used Ports (from serverinventory.md)

### External Services (Host Level)
| Port | Service | Container/Purpose | Notes |
|------|---------|------------------|-------|
| 80 | HTTP | Traefik | Main reverse proxy |
| 443 | HTTPS | Traefik | SSL/TLS termination |
| 25 | SMTP | Mailu | Mail server |
| 465 | SMTPS | Mailu | Secure SMTP |
| 587 | Submission | Mailu | Mail submission |
| 993 | IMAPS | Mailu | Secure IMAP |
| 2222 | SSH Gateway | ShellHub | SSH management |
| 5432 | PostgreSQL | Postgres | Database (if exposed) |
| 8083 | Dashboard | Traefik | Admin dashboard |
| 8443 | HTTPS | Keycloak | Identity management |
| 9100 | Metrics | Metrics endpoint | Monitoring |

### Internal Services (Container-to-Container)
| Port | Service | Notes |
|------|---------|-------|
| 8080 | Various | Common internal service port |
| 4180 | OAuth2 Proxy | Authentication proxy |
| 6379 | Redis | Cache/session storage |
| 27017 | MongoDB | ShellHub database |

## Port Allocation Strategy

### Reserved Ranges
- **80-443**: Primary web services (Traefik managed)
- **1000-2999**: System services
- **3000-3999**: Development tools
- **4000-4999**: Authentication/proxy services
- **5000-5999**: Databases
- **6000-6999**: Cache/message queues
- **8000-8999**: Application services
- **9000-9999**: Monitoring/metrics

### Available Ports for NGINX
Based on the scan, these ports appear available:
- **8081**: ✅ AVAILABLE
- **8082**: ✅ AVAILABLE 
- **8084**: ✅ AVAILABLE
- **8085**: ✅ AVAILABLE
- **8086**: ✅ AVAILABLE
- **8087**: ✅ AVAILABLE
- **8088**: ✅ AVAILABLE
- **8089**: ✅ AVAILABLE
- **8090**: ✅ AVAILABLE (RECOMMENDED)
- **8091-8099**: Likely available

## Service Port Mapping

### Running Containers (from inventory)
| Container | Internal Port | Exposed Port | Network |
|-----------|--------------|--------------|---------|
| traefik | 80, 443, 8080 | 80, 443, 8083 | traefik-net |
| keycloak | 8080, 8443 | 8443 | traefik-net |
| keycloak-postgres | 5432 | - | keycloak-net |
| open-webui | 8080 | via Traefik | traefik-net |
| shellhub | Various | 2222 | traefik-net |
| shellhub-mongo | 27017 | - | Internal |
| mailu-front | 80, 443 | 25, 465, 587, 993 | mailu |
| mailu-redis | 6379 | - | mailu |
| claude-code | 3000 | via Traefik | traefik-net |
| claude-code-admin | 3000 | via Traefik | traefik-net |

## Recommended NGINX Configuration

### Primary Option
**Port 8090** - Clean, unused, follows convention

### Alternative Options
- Port 8081 - If 8090 conflicts
- Port 8085 - Secondary alternative
- Port 8888 - Common proxy port (check first)

## Port Check Script

```bash
#!/bin/bash
# Quick port availability check
for port in 80 8080 8081 8082 8083 8084 8085 8090 8443; do
    if docker ps 2>/dev/null | grep -q ":$port->"; then
        echo "❌ Port $port: IN USE (Docker)"
    elif ss -tln | grep -q ":$port "; then
        echo "❌ Port $port: IN USE (System)"
    else
        echo "✅ Port $port: AVAILABLE"
    fi
done
```

## Domain Routing (via Traefik)

Current services accessible via Traefik:
- traefik.ai-servicers.com (Dashboard)
- keycloak.ai-servicers.com (Identity)
- mail.ai-servicers.com (Webmail)
- shellhub.ai-servicers.com (SSH Gateway)
- open-webui.ai-servicers.com (Web UI)

### For NGINX
Recommended: Create subdomain routing
- nginx.ai-servicers.com (Main proxy)
- *.nginx.ai-servicers.com (Service subdomains)

Or use port-based access:
- linuxserver.lan:8090 (Direct access)

## Notes
- Traefik is handling ports 80/443 for all external traffic
- Most services communicate internally via Docker networks
- Port 8080 is commonly used internally by many containers
- Always check `docker ps` before allocating a new port

---
*Generated: 2025-08-23*