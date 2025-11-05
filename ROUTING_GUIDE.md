# NGINX Routing Guide - Subdomains vs Path-based

## Two Routing Strategies

### 1. SUBDOMAIN ROUTING (Recommended)
**Pattern**: `service.ai-servicers.com`

**Advantages**:
- Clean URLs
- Complete isolation between apps
- Easier cookie/session management
- Simple SSL with wildcard cert (*.ai-servicers.com)
- Apps don't need to know their base path

**Examples**:
- `drawio.ai-servicers.com` → Draw.io
- `kroki.ai-servicers.com` → Kroki diagrams
- `pgadmin.ai-servicers.com` → pgAdmin
- `portainer.ai-servicers.com` → Portainer

### 2. PATH-BASED ROUTING
**Pattern**: `ai-servicers.com/service/`

**Advantages**:
- Single domain/certificate
- Easier for some corporate networks

**Disadvantages**:
- Apps must support base path configuration
- Cookie/session conflicts possible
- More complex proxy configuration
- Some apps break with path prefixes

## Implementation Examples

### Subdomain Configuration (Recommended)

Create `/home/administrator/projects/nginx/configs/subdomain-routing.conf`:

```nginx
# Kroki Service - Subdomain
server {
    listen 80;
    server_name kroki.ai-servicers.com;
    
    location / {
        proxy_pass http://kroki:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# pgAdmin - Subdomain
server {
    listen 80;
    server_name pgadmin.ai-servicers.com;
    
    location / {
        proxy_pass http://pgadmin:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Portainer - Subdomain
server {
    listen 80;
    server_name portainer.ai-servicers.com;
    
    location / {
        proxy_pass http://portainer:9000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Path-based Configuration (Alternative)

Create `/home/administrator/projects/nginx/configs/path-routing.conf`:

```nginx
server {
    listen 80;
    server_name ai-servicers.com;
    
    # Kroki at /kroki/
    location /kroki/ {
        proxy_pass http://kroki:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Prefix /kroki;
    }
    
    # pgAdmin at /pgadmin/
    location /pgadmin/ {
        proxy_pass http://pgadmin:80/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Script-Name /pgadmin;
    }
    
    # Portainer at /portainer/ (requires special handling)
    location /portainer/ {
        proxy_pass http://portainer:9000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Rewrite for Portainer API
        rewrite ^/portainer/(.*) /$1 break;
    }
}
```

## How to Deploy Configurations

### Step 1: Create config directory
```bash
mkdir -p /home/administrator/projects/nginx/configs
```

### Step 2: Choose your routing strategy
```bash
# For subdomains (recommended):
cp subdomain-routing.conf /home/administrator/projects/nginx/configs/active.conf

# OR for path-based:
cp path-routing.conf /home/administrator/projects/nginx/configs/active.conf
```

### Step 3: Mount config in container
Edit `deploy.sh` to mount the config:
```bash
-v /home/administrator/projects/nginx/configs:/etc/nginx/conf.d:ro
```

### Step 4: Deploy NGINX
```bash
cd /home/administrator/projects/nginx
./deploy.sh
```

## Current Services Available for Proxying

Based on your scan, these services can be proxied through NGINX:

| Service | Container | Internal Port | Current External | Suggested Route |
|---------|-----------|---------------|-----------------|-----------------|
| Kroki | kroki | 8000 | 8090 | kroki.ai-servicers.com |
| Draw.io | drawio | 8080 | via OAuth2 Proxy | drawio.ai-servicers.com |
| pgAdmin | pgadmin | 80 | 8901 | pgadmin.ai-servicers.com |
| Keycloak | keycloak | 8080 | 8443 | Already on keycloak.ai-servicers.com |
| Open WebUI | open-webui | 8080 | 8000 | webui.ai-servicers.com |
| Portainer | portainer | 9000 | 9000 | portainer.ai-servicers.com |
| Rundeck | rundeck | 4440 | 4440 | rundeck.ai-servicers.com |

## Traefik Integration

Since Traefik is already handling ports 80/443, you have options:

### Option 1: NGINX as Secondary Proxy (Current Setup)
- NGINX runs on port 8081
- Direct access: `linuxserver.lan:8081`
- Services accessed through NGINX port

### Option 2: Replace Traefik with NGINX
- Stop Traefik
- Run NGINX on ports 80/443
- Full control over routing

### Option 3: Use Traefik for External, NGINX for Internal
- Traefik handles *.ai-servicers.com (external)
- NGINX handles internal services on different port
- Best of both worlds

## DNS Configuration

For subdomain routing, add DNS records:
```
*.ai-servicers.com → Your server IP
```

Or add to `/etc/hosts` for testing:
```
192.168.1.13 kroki.ai-servicers.com
192.168.1.13 pgadmin.ai-servicers.com
192.168.1.13 portainer.ai-servicers.com
```

## Testing Routes

After deployment, test with:
```bash
# Subdomain test
curl -H "Host: kroki.ai-servicers.com" http://localhost:8081

# Path-based test
curl http://localhost:8081/kroki/

# Direct service test
curl http://linuxserver.lan:8081
```

## WebSocket Support

For services requiring WebSockets (like Portainer):
```nginx
location / {
    proxy_pass http://service:port;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

## SSL/TLS Configuration

For HTTPS support, add:
```nginx
server {
    listen 443 ssl;
    server_name service.ai-servicers.com;
    
    ssl_certificate /etc/nginx/certs/cert.pem;
    ssl_certificate_key /etc/nginx/certs/key.pem;
    
    # ... proxy configuration ...
}
```

---
*Generated: 2025-08-23*