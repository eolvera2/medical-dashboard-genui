# View Mode Switching Guide

## Overview
The Medical Dashboard GenUI application now features two distinct view modes designed to optimize the workflow for different stages of patient care: **Pre-Visit Mode** and **Visit Mode**.

## View Modes

### Pre-Visit Mode (Default)
**Purpose**: Planning and preparation before patient interaction

**Layout**:
- **Left Panel** (360px): Full patient information card and draggable modules
- **Center Panel** (flexible): Clinical workspace with full-size cards
- **Right Panel** (380px): Clinical checklist and action items

**Header Color**: Purple-to-violet gradient (#667EEA to #764BA2)

**Use Case**: Review patient history, plan visit objectives, prepare questions

---

### Visit Mode
**Purpose**: Active patient interaction with quick access to critical information

**Layout**:
- **Left Panel** (60px): Collapsed to thin sidebar with expand button
- **Center Panel** (flexible): Clinical checklist (moved from right)
- **Right Panel** (400px): Compact workspace cards (moved from center)

**Header Color**: Teal-to-emerald gradient (#11CDEF to #2DCE89)

**Use Case**: During patient consultation with focus on checklist completion

---

## Features

### 1. View Mode Selector
- Located in header between GenUI controls and user profile
- Dropdown with "Pre-Visit" and "Visit" options
- Automatically saves preference to localStorage

### 2. Smooth Animations
- **Duration**: 600ms total transition
- **Phases**:
  1. Content fade out (200ms)
  2. Panel repositioning (400ms)
  3. Content fade in (300ms)
- **Easing**: Cubic bezier (0.4, 0, 0.2, 1)

### 3. Collapsed Sidebar (Visit Mode)
- **Default State**: Collapsed to 60px width
- **Icon**: Patient avatar (👤)
- **Expand Arrow**: Visual indicator
- **Action**: Click to expand to 360px
- **Color**: Teal gradient matching Visit mode theme

### 4. Compact Workspace Cards (Visit Mode)
- **Default Height**: 200px (collapsed)
- **Expand Button**: ⬍ icon in card header
- **Expanded Height**: Up to 2000px
- **Visible Content** (when collapsed):
  - First 2 items from most sections
  - Critical information prioritized
  - Active/important items always visible

### 5. Panel Swapping
- Center and right panels swap positions smoothly
- Order changes using CSS flexbox `order` property
- Border styling updates automatically

---

## User Interactions

### Switching Modes
**Method 1**: Dropdown selector
- Click dropdown in header
- Select desired mode
- Wait for animation to complete

**Method 2**: Keyboard shortcut
- Press `Ctrl/Cmd + Shift + V`
- Toggles between Pre-Visit and Visit modes
- Works from any focused element

### Expanding Left Panel (Visit Mode Only)
**Method 1**: Click button
- Click the patient avatar button in collapsed sidebar
- Panel expands to 360px
- Click again to collapse

**Method 2**: Keyboard shortcut
- Press `Ctrl/Cmd + Shift + L`
- Only works in Visit mode
- Toggles expansion state

### Expanding Workspace Cards (Visit Mode Only)
- Click the ⬍ expand button in card header
- Card height expands to show all content
- Button rotates 180° to indicate expanded state
- Click again to collapse

---

## Technical Implementation

### HTML Structure
```html
<!-- View Mode Selector in Header -->
<div class="view-mode-selector">
    <select id="view-mode-dropdown" class="view-dropdown">
        <option value="pre-visit">Pre-Visit</option>
        <option value="visit">Visit</option>
    </select>
</div>

<!-- Collapsed Sidebar in Left Panel -->
<div class="collapsed-sidebar">
    <button class="sidebar-toggle" id="sidebar-toggle">
        <span class="sidebar-icon">👤</span>
        <span class="sidebar-arrow">▶</span>
    </button>
</div>

<!-- Expand Button in Card Headers -->
<div class="card-actions">
    <button class="card-expand" title="Expand/Collapse">⬍</button>
    <button class="card-action">Details →</button>
</div>
```

### CSS Classes
```css
/* Visit Mode State */
.dashboard-container.visit-mode {
    grid-template-columns: 60px 1fr 400px;
}

/* Header Color Transition */
body.visit-mode .dashboard-header {
    background: linear-gradient(135deg, #11CDEF 0%, #2DCE89 100%);
}

/* Collapsed Sidebar */
.dashboard-container.visit-mode .collapsed-sidebar {
    display: flex;
}

/* Compact Cards */
.dashboard-container.visit-mode .right-panel .workspace-card {
    max-height: 200px;
}

.dashboard-container.visit-mode .right-panel .workspace-card[data-expanded="true"] {
    max-height: 2000px;
}
```

### JavaScript Functions
```javascript
// Main view switching function
switchViewMode(newMode)

// Toggle left panel expansion
toggleLeftPanel()

// Toggle individual card expansion
toggleCardExpansion(button)

// State persistence
saveViewModePreference(mode)
loadViewModePreference()
```

---

## Responsive Behavior

### Breakpoints
- **< 1400px**: Right panel narrows to 320px in Visit mode
- **< 1600px**: Right panel narrows to 360px in Visit mode
- **≥ 1600px**: Right panel full width at 400px in Visit mode

### Mobile Considerations
On smaller screens, the application maintains functionality but may hide panels or stack elements vertically for optimal mobile experience.

---

## Accessibility

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order follows visual flow
- Focus indicators clearly visible
- Keyboard shortcuts don't interfere with native browser functions

### Screen Readers
- ARIA labels on all interactive elements
- Live region announcements for mode changes
- Semantic HTML structure maintained
- Alternative text for visual indicators

### Visual Indicators
- Clear color differentiation between modes
- High contrast maintained in both modes
- Animation can be disabled via browser settings (prefers-reduced-motion)
- Focus states clearly visible

---

## Performance Optimization

### Animation Performance
- GPU-accelerated transforms used
- RequestAnimationFrame for smooth 60fps
- Debounced resize handlers
- Efficient CSS transitions

### State Management
- Minimal DOM manipulation
- CSS classes for state changes
- LocalStorage for persistence
- No unnecessary re-renders

---

## Best Practices

### When to Use Pre-Visit Mode
✅ Reviewing patient history before appointment
✅ Planning visit objectives and questions
✅ Organizing workspace with relevant modules
✅ Preparing for complex cases

### When to Use Visit Mode
✅ During active patient consultation
✅ When following clinical checklist step-by-step
✅ Need quick access to critical data
✅ Limited screen space available
✅ Focus on task completion

---

## Troubleshooting

### Issue: Mode won't switch
**Solution**: Check browser console for errors, ensure JavaScript is enabled

### Issue: Animations are jumpy
**Solution**: Close other resource-intensive applications, check GPU acceleration

### Issue: Preference not saving
**Solution**: Enable localStorage in browser settings, check privacy settings

### Issue: Panel won't expand
**Solution**: Ensure you're in Visit mode, try keyboard shortcut Ctrl+Shift+L

---

## Future Enhancements

### Planned Features
- [ ] Custom view mode configurations
- [ ] Additional view mode presets (e.g., "Post-Visit", "Emergency")
- [ ] Drag-to-resize panel widths
- [ ] Save custom panel layouts per mode
- [ ] Animation speed preferences
- [ ] Color theme customization per mode

### Feedback
If you encounter issues or have suggestions for improvement, please submit feedback through the application's feedback system or contact the development team.

---

## Version History

### v1.0 - Initial Implementation
- Two-mode system (Pre-Visit, Visit)
- Smooth transition animations
- Collapsible left panel
- Expandable workspace cards
- Header color transitions
- State persistence
- Keyboard shortcuts
- Responsive design
- Accessibility features

---

*Last Updated: October 2, 2025*
*Documentation Version: 1.0*
