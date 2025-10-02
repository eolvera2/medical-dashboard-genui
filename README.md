# Medical Dashboard GenUI Application

## Overview
A modern, AI-powered medical dashboard application implementing the DynamicUI/GenUI concept from the research paper. This application features a sophisticated three-panel layout with drag-and-drop functionality, real-time AI generation capabilities, and a comprehensive medical information management system designed with the Fluent 2 design system.

## Features

### 🎯 Core Functionality
- **GenUI Integration**: Natural language interface for generating dashboard components
- **Drag-and-Drop Modules**: Intuitive module management system
- **Three-Panel Layout**: 
  - Left: Patient information and available modules
  - Center: Dynamic workspace
  - Right: Clinical checklist and actions

### 🏥 Medical Features
- Patient information display with chief complaint tracking
- Vital signs monitoring with trend indicators
- Chronic conditions and risk factor management
- Differential diagnosis table with probability indicators
- Clinical guidelines integration
- Laboratory results tracking
- SOAP note documentation
- Body map visualization
- Patient timeline

### 🎨 Design System
- Modern Fluent 2 Design System implementation
- Clean, professional medical aesthetic
- Responsive layout (adapts to different screen sizes)
- Dark mode support
- Smooth animations and transitions
- Accessibility-focused design

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - runs entirely in the browser

### Running the Application
1. Open `index.html` in a web browser
2. The dashboard will load with sample patient data

### Using GenUI Features
1. **Generate Components**: 
   - Type a request in the prompt field (e.g., "Add cardiac risk assessment")
   - Press Enter or click "Generate"
   - AI will create and add relevant components to the workspace

2. **Drag and Drop**:
   - Drag modules from the left panel
   - Drop them into the center workspace
   - Modules automatically populate with relevant data

3. **Checklist Management**:
   - Click checkboxes to mark items complete
   - Progress bar updates automatically
   - Use action buttons to initiate clinical workflows

## Project Structure

```
dynamicui/
├── index.html          # Main HTML structure
├── styles.css          # Fluent 2 design system styles
├── app.js             # Interactive functionality and GenUI logic
└── README.md          # Documentation
```

## GenUI Commands Examples

Try these natural language commands in the GenUI prompt:

- "Add cardiac risk assessment"
- "Show medication analysis"
- "Display ECG results"
- "Add laboratory panel"
- "Show patient timeline"
- "Create SOAP note"

## Key Technologies

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with CSS variables
- **JavaScript**: ES6+ features for interactivity
- **Fluent UI Web Components**: Microsoft's design system
- **Sortable.js**: Drag-and-drop functionality
- **Chart.js**: Data visualization (ready for integration)

## Medical Dashboard Components

### Patient Information Card
- Demographics and MRN
- Chief complaint with severity scale
- Visit history summary
- Priority status indicators

### Available Modules
- **Timeline**: Patient medical history
- **Abnormalities**: Lab values and vital alerts
- **SOAP Summary**: Clinical documentation
- **Body Map**: Anatomical visualization
- **H&P Summary**: History and Physical
- **Lab Results**: Recent test results

### Workspace Cards
- Dynamically generated based on context
- Real-time data population
- Interactive elements
- Remove/customize options

### Clinical Checklist
- Missing data tracking
- Questions to ask during examination
- Action items with one-click execution
- AI-powered recommendations

## Design Principles

1. **Clinical Efficiency**: Optimized for rapid information access
2. **Safety First**: Clear visual indicators for critical values
3. **Context Awareness**: AI understands medical terminology
4. **Flexibility**: Customizable workspace for different specialties
5. **Evidence-Based**: Integrated clinical guidelines

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

- [ ] Real-time data integration with EHR systems
- [ ] Advanced AI model integration
- [ ] Voice command support
- [ ] Multi-patient view
- [ ] Collaborative features for care teams
- [ ] Mobile responsive design
- [ ] Print-friendly reports
- [ ] Data export capabilities

## Security Considerations

This is a demonstration application. In production:
- Implement HIPAA compliance
- Add user authentication
- Encrypt patient data
- Audit logging
- Role-based access control

## Based on Research

This implementation is inspired by the DynamicUI/GenUI research paper, demonstrating how AI can transform medical dashboards through natural language interfaces and intelligent component generation.

## License

This is a demonstration project for educational purposes.

## Author

Created as a modern implementation of GenUI concepts for medical applications, showcasing the potential of AI-driven user interfaces in healthcare.

---

**Note**: This is a prototype demonstration. Always consult with healthcare professionals for medical decisions. This application uses simulated patient data and should not be used for actual clinical care.

## Deployment Instructions

### Deploying to Azure Static Web Apps

This application is configured for deployment to Azure Static Web Apps. Follow these steps:

#### Prerequisites
- GitHub account
- Azure account (free tier works)
- Azure CLI installed (optional, can use portal)

#### Step 1: Push to GitHub
```bash
# Create a new repository on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/medical-dashboard-genui.git
git push -u origin main
```

#### Step 2: Create Azure Static Web App

**Option A: Using Azure Portal (Recommended)**
1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource" → Search for "Static Web App"
3. Fill in:
   - **Resource Group**: Create new or use existing
   - **Name**: `medical-dashboard-genui` (or your choice)
   - **Region**: Choose closest to you
   - **Plan type**: Free
   - **Source**: GitHub
   - **Organization**: Your GitHub username
   - **Repository**: medical-dashboard-genui
   - **Branch**: main
   - **Build Presets**: Custom
   - **App location**: `/`
   - **Api location**: Leave empty
   - **Output location**: Leave empty
4. Click "Review + create" → "Create"

**Option B: Using Azure CLI**
```bash
# Login to Azure
az login

# Create resource group (if needed)
az group create --name medical-dashboard-rg --location "Central US"

# Create Static Web App
az staticwebapp create \
  --name medical-dashboard-genui \
  --resource-group medical-dashboard-rg \
  --source https://github.com/YOUR_USERNAME/medical-dashboard-genui \
  --branch main \
  --app-location "/" \
  --login-with-github
```

#### Step 3: Access Your Deployed App
- Your app will be available at: `https://[your-app-name].azurestaticapps.net`
- Azure automatically rebuilds and redeploys when you push to GitHub

### Configuration Files

- **staticwebapp.config.json**: Contains security headers and routing rules
- **.gitignore**: Excludes unnecessary files from repository

### Custom Domain (Optional)
1. In Azure Portal, go to your Static Web App
2. Click "Custom domains" → "Add"
3. Follow the DNS configuration instructions

### Authentication (Optional)
To add authentication:
1. Modify `staticwebapp.config.json` to include auth rules
2. Configure identity providers in Azure Portal

### Monitoring
- View deployment status in GitHub Actions tab
- Monitor app health in Azure Portal
- Check application insights for usage analytics

### Troubleshooting
- If deployment fails, check GitHub Actions logs
- Verify all files are committed to repository
- Ensure branch name matches configuration
- Check Azure Portal for any error messages

### Support
For issues or questions about deployment, consult:
- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [GitHub Actions Documentation](https://docs.github.com/actions)
