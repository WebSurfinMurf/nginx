# Docker Access Fix Required

The administrator user (UID 2000) needs to be properly configured for Docker access.

## Current Issues
1. User "administrator" (UID 2000) is not in /etc/passwd
2. User is not in the docker group
3. Cannot use sudo (user doesn't exist in passwd database)

## Fix Instructions (Run as Root)

```bash
# Step 1: Add administrator user to system
useradd -u 2000 -m -d /home/administrator -s /bin/bash administrator

# Step 2: Set up proper group
groupadd -g 2000 administrators 2>/dev/null || true

# Step 3: Add administrator to docker group
usermod -aG docker administrator

# Step 4: Verify the fix
su - administrator -c "docker ps"
```

## Temporary Workaround (NOT RECOMMENDED for production)

```bash
# As root, temporarily make docker socket world-accessible
chmod 666 /var/run/docker.sock

# Deploy NGINX
su - administrator -c "cd /home/administrator/projects/nginx && ./deploy.sh"

# Restore proper permissions
chmod 660 /var/run/docker.sock
```

## Once Fixed

After fixing Docker access, you can deploy NGINX by running:
```bash
cd /home/administrator/projects/nginx
./deploy.sh
```

The deployment will:
1. Create NGINX container on port 80
2. Set up volumes for configuration and HTML
3. Prepare for OAuth2 Proxy integration with Keycloak