# Hosted Applications Page - Documentation

## Page Purpose
Directory of all self-hosted applications on ai-servicers.com infrastructure, organized by category.

## Likely Data Sources
```bash
# List all running containers
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}'

# List projects directory
ls -la ~/projects/

# Check container URLs via Traefik labels
docker inspect <container> --format '{{json .Config.Labels}}' | jq
```

## Categories Documented
- Productivity & Documents
- Development & DevOps
- AI & Machine Learning
- Data & Analytics
- Monitoring & Logging
- Security & Identity
- Media & Communication
- Utilities & Tools

## How to Update This Page

### Step 1: Scan Current Applications
```bash
# List all running containers with their images
docker ps --format '{{.Names}}: {{.Image}}'

# Check for new projects
ls ~/projects/
```

### Step 2: Get Application Details
For each application, gather:
- Name and description
- URL (from Traefik labels or docker-compose)
- Category
- Icon (emoji)

### Step 3: Update index.html
Edit `/home/administrator/projects/nginx/sites/applications/index.html` to:
- Add new application cards
- Remove deprecated applications
- Update categories as needed
- Update stats (container count, app count)

### Step 4: Deploy
```bash
cd /home/administrator/projects/nginx
./deploy.sh
```

## Page Structure

### HTML Sections
- **Header**: Title, subtitle
- **Back Links**: Portal, Infrastructure Documentation
- **Stats Bar**: Container count, app count, categories
- **Category Sections**: Each with app cards containing:
  - Icon
  - Name (linked to URL)
  - Description
- **Footer**: Links

## Maintenance Notes
- Parent page: `/infrastructure-docs/`
- Applications are grouped by functional category
- Update when new services are deployed or removed

---
*Last Updated: 2025-11-26*
*Note: Original source commands not documented - inferred from page content*
