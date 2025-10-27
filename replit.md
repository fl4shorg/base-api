# NEXUS API REST - Documentation

## Project Overview

This is a **NEXUS API REST** frontend application - a comprehensive REST API documentation and demonstration interface for various API services including generators, downloaders, image filters, and social media tools.

**Project Type:** Frontend-only application with mock backend  
**Framework:** Static HTML/CSS/JavaScript with Express.js server  
**Status:** Running with mock API endpoints  
**Last Updated:** October 27, 2025

---

## Architecture

### Original Setup
This project was imported from GitHub and originally consisted of:
- Static HTML files (docs.html, painel pages)
- CSS and JavaScript assets
- **No backend server code** - the frontend expected a separate API server

### Current Implementation
To make this work in Replit, we've added:
- **Express.js server** (`server.js`) serving static files
- **Mock API endpoints** simulating the expected backend responses
- All routes return sample/demo data to demonstrate the UI

---

## Project Structure

```
.
├── server.js                 # Express server with mock API endpoints
├── docs.html                 # Main API documentation page
├── paineis/                  # Admin panel pages
│   ├── painel_consultas.html # Query panel
│   └── painel_sociais.html   # Social media panel
├── css/                      # Stylesheets
├── js/                       # JavaScript files
├── vendors/                  # Third-party libraries
├── ajax/                     # SweetAlert2 library files
└── k/                        # Additional vendor files
```

---

## Mock API Endpoints

The server provides mock responses for the following endpoints:

### Configuration
- `GET /statusapi/info` - API configuration and branding information

### User Management
- `GET /api/users/count` - Total user count
- `GET /api/keyerrada/?apikey=<key>` - API key verification

### Generators (Single)
- `GET /gerar/:tipo?apikey=<key>` - Generate single items
  - Types: cpf, cnpj, placa, rg, email, telefone, etc.

### Generators (Multiple)
- `GET /gerarpro/:tipo?query=<count>&apikey=<key>` - Generate multiple items
  - Types: cpf, cnpj, rg, cep, numeros, uuid, etc.

### Image Filters
- `GET /filtro/:tipo?img=<url>&apikey=<key>` - Apply image filters
  - Types: blur, grayscale, invert, sepia, brightness, etc.

### Downloads
- `GET /youtube/:acao` - YouTube related actions
- `GET /download/:servico` - Download from various services
- `GET /api/:endpoint` - Generic API endpoints

### Pages
- `GET /` - Main documentation page
- `GET /runtime` - Runtime/docs page
- `GET /panel` - Admin panel

---

## Running the Project

The server automatically starts on port 5000:

```bash
npm start
```

The workflow is configured to run automatically in Replit.

---

## Important Notes

### ⚠️ This is a Demo Environment

1. **All API responses are mocked** - they return sample data, not real results
2. **No real data processing** - generators create random/fake data
3. **No authentication** - API key checks return success for any non-placeholder key
4. **External integrations don't work** - downloads, social media APIs, etc. are simulated

### 🔧 For Production Use

To use this with a real backend:

1. Replace the mock endpoints in `server.js` with proxy calls to your actual API
2. Or remove `server.js` entirely and serve the static files separately
3. Configure the real backend to handle all the `/api/*`, `/gerar/*`, etc. endpoints
4. Update API keys and authentication mechanisms

### 📝 Known Limitations

- Tawk.to chat widget may show console errors (external service)
- Some external CDN resources may fail to load
- Image filters return URLs unchanged (no actual processing)
- Download endpoints return mock URLs

---

## Recent Changes

### October 27, 2025
- ✅ Created Express.js server to serve static files
- ✅ Added mock API endpoints for all expected routes
- ✅ Created placeholder files for missing resources
- ✅ Configured Replit workflow on port 5000
- ✅ Application running successfully with demo data

---

## User Preferences

*No specific user preferences recorded yet.*

---

## Development

### Adding New Mock Endpoints

Edit `server.js` and add new routes following this pattern:

```javascript
app.get('/api/new-endpoint', (req, res) => {
  res.json({
    status: 'success',
    data: 'your mock data here'
  });
});
```

### Modifying Mock Data

The main configuration object is in `server.js` under `mockApiConfig`. Edit this to change:
- API name and branding
- Pricing information
- Contact links
- Images and logos

---

## Credits

**Original Project:** Fantasma - Vix Zap  
**Implementation:** Sistema de login, painel, sistema de request  
**Replit Adaptation:** Added Express server and mock backend (October 2025)
