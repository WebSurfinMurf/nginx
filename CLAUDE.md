# Claude AI Assistant Notes - NGINX Reverse Proxy

> **For overall environment context, see: `/home/administrator/projects/AINotes/AINotes.md`**

## Project Overview
NGINX serves as the main reverse proxy and static site host:
- Central routing point for all web services
- Static site hosting via `/sites/` directory structure
- OAuth2 Proxy integration for Keycloak authentication
- Subdomain-based routing for different services
- SSL termination and certificate management via Traefik

### Static Sites Hosted
- **nginx-portal** - https://nginx.ai-servicers.com
  - Main portal/landing page for nginx-hosted services
  - Links to diagrams and other nginx services
  - Created: 2025-11-04
- **langchain-portal** - https://langchain-portal.ai-servicers.com
  - LangChain API directory and quick links
  - Beautiful portal page with all LangServe endpoints
  - Created: 2025-09-30

## Recent Work & Changes
_This section is updated by Claude during each session_

### Session: 2025-11-04
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

## Static Site Hosting Standard

### Creating a New Static Site

**Standard Pattern**: Pages (not projects) go under `nginx/sites/`

#### 1. Create Site Directory
```bash
mkdir -p /home/administrator/projects/nginx/sites/{site-name}/
```

#### 2. Add HTML Content
```bash
# Create your index.html
/home/administrator/projects/nginx/sites/{site-name}/index.html
```

#### 3. Create NGINX Virtual Host Config
```bash
# Create config file
/home/administrator/projects/nginx/configs/{site-name}.conf
```

Example config:
```nginx
server {
    listen 80;
    server_name {site-name}.ai-servicers.com;

    root /usr/share/nginx/sites/{site-name};
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### 4. Deploy
```bash
cd /home/administrator/projects/nginx
./deploy.sh
```

The deploy.sh already includes:
- Sites directory mount: `-v /home/administrator/projects/nginx/sites:/usr/share/nginx/sites:ro`
- Traefik labels for automatic HTTPS routing
- Let's Encrypt certificate generation

#### 5. Access
Your site will be available at: `https://{site-name}.ai-servicers.com`

### Benefits of This Pattern
- ✅ No additional Docker containers needed
- ✅ Automatic HTTPS via Traefik
- ✅ Easy to add new pages (just mkdir + add config)
- ✅ Centralized static content management
- ✅ Follows separation: projects vs pages

### Authentication
- **Public sites**: No additional config needed
- **Protected sites**: Add OAuth2 proxy labels or create separate proxy container

---
*Last Updated: 2025-09-30 by Claude*