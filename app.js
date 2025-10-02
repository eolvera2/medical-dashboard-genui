// Medical Dashboard GenUI Application - Interactive JavaScript

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Medical Dashboard GenUI Application Initialized');
    
    // Initialize all components
    initializeDragAndDrop();
    initializeGenUI();
    initializeChecklist();
    initializeInteractiveElements();
    initializeDataVisualization();
});

// Drag and Drop Functionality
function initializeDragAndDrop() {
    const availableModules = document.getElementById('available-modules');
    const workspace = document.getElementById('workspace');
    const dropzone = document.getElementById('workspace-dropzone');
    
    // Make modules draggable
    if (availableModules && typeof Sortable !== 'undefined') {
        new Sortable(availableModules, {
            group: {
                name: 'modules',
                pull: 'clone',
                put: false
            },
            animation: 150,
            sort: false,
            dragClass: 'dragging',
            onStart: function(evt) {
                dropzone.classList.add('drag-active');
            },
            onEnd: function(evt) {
                dropzone.classList.remove('drag-active');
            }
        });
        
        // Make workspace accept drops
        new Sortable(workspace, {
            group: {
                name: 'modules',
                put: true
            },
            animation: 150,
            onAdd: function(evt) {
                const moduleType = evt.item.dataset.module;
                const newCard = createWorkspaceCard(moduleType);
                evt.item.replaceWith(newCard);
                animateCardEntry(newCard);
            }
        });
    }
    
    // Handle dropzone
    if (dropzone) {
        dropzone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        
        dropzone.addEventListener('dragleave', function(e) {
            this.classList.remove('drag-over');
        });
        
        dropzone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
        });
    }
}

// Create workspace card based on module type
function createWorkspaceCard(moduleType) {
    const cardTemplates = {
        timeline: {
            title: 'Patient Timeline',
            content: generateTimelineContent()
        },
        abnormalities: {
            title: 'Key Abnormalities',
            content: generateAbnormalitiesContent()
        },
        soap: {
            title: 'SOAP Note',
            content: generateSOAPContent()
        },
        bodymap: {
            title: 'Body Map',
            content: generateBodyMapContent()
        },
        hp: {
            title: 'History & Physical',
            content: generateHPContent()
        },
        labs: {
            title: 'Laboratory Results',
            content: generateLabsContent()
        }
    };
    
    const template = cardTemplates[moduleType] || { title: 'New Module', content: '<p>Content loading...</p>' };
    
    const card = document.createElement('div');
    card.className = 'workspace-card card-enter';
    card.innerHTML = `
        <div class="card-header">
            <h3 class="card-title">${template.title}</h3>
            <button class="card-action" onclick="removeCard(this)">Remove ×</button>
        </div>
        <div class="card-content">
            ${template.content}
        </div>
    `;
    
    return card;
}

// Generate content for different module types
function generateTimelineContent() {
    return `
        <div class="timeline-container">
            <div class="timeline-item">
                <div class="timeline-date">Oct 2, 2024</div>
                <div class="timeline-content">
                    <div class="timeline-title">Current Visit</div>
                    <div class="timeline-description">Chest pain, shortness of breath</div>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-date">Sep 15, 2024</div>
                <div class="timeline-content">
                    <div class="timeline-title">Cardiology Follow-up</div>
                    <div class="timeline-description">BP controlled, medication adjusted</div>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-date">Jul 20, 2024</div>
                <div class="timeline-content">
                    <div class="timeline-title">Annual Physical</div>
                    <div class="timeline-description">Routine checkup, labs ordered</div>
                </div>
            </div>
        </div>
    `;
}

function generateAbnormalitiesContent() {
    return `
        <div class="abnormalities-grid">
            <div class="abnormal-item critical">
                <span class="abnormal-icon">⚠️</span>
                <div class="abnormal-details">
                    <div class="abnormal-name">Troponin I</div>
                    <div class="abnormal-value">0.08 ng/mL ↑</div>
                    <div class="abnormal-range">Normal: <0.04</div>
                </div>
            </div>
            <div class="abnormal-item warning">
                <span class="abnormal-icon">⚠️</span>
                <div class="abnormal-details">
                    <div class="abnormal-name">BNP</div>
                    <div class="abnormal-value">185 pg/mL ↑</div>
                    <div class="abnormal-range">Normal: <100</div>
                </div>
            </div>
            <div class="abnormal-item warning">
                <span class="abnormal-icon">⚠️</span>
                <div class="abnormal-details">
                    <div class="abnormal-name">D-Dimer</div>
                    <div class="abnormal-value">0.65 mg/L ↑</div>
                    <div class="abnormal-range">Normal: <0.50</div>
                </div>
            </div>
        </div>
    `;
}

function generateSOAPContent() {
    return `
        <div class="soap-sections">
            <div class="soap-section">
                <h4>Subjective</h4>
                <p>65 yo male presents with chest pain and SOB × 2 days. Pain is pressure-like, radiates to left arm, worsens with exertion.</p>
            </div>
            <div class="soap-section">
                <h4>Objective</h4>
                <p>VS: BP 142/88, HR 92, T 98.6°F, O2 96%. Cardiac exam: Regular rhythm, no murmurs. Lungs: Clear bilaterally.</p>
            </div>
            <div class="soap-section">
                <h4>Assessment</h4>
                <p>Acute coronary syndrome vs. unstable angina. Risk factors: HTN, DM, former smoker.</p>
            </div>
            <div class="soap-section">
                <h4>Plan</h4>
                <p>1. Serial troponins<br>2. ECG monitoring<br>3. Cardiology consult<br>4. Consider cardiac cath if indicated</p>
            </div>
        </div>
    `;
}

function generateBodyMapContent() {
    return `
        <div class="bodymap-container">
            <div class="bodymap-svg">
                <svg viewBox="0 0 200 300" style="width: 100%; max-width: 200px; margin: 0 auto; display: block;">
                    <g id="body-outline">
                        <!-- Simple body outline -->
                        <ellipse cx="100" cy="50" rx="25" ry="30" fill="#f0f0f0" stroke="#999"/>
                        <rect x="85" y="70" width="30" height="80" fill="#f0f0f0" stroke="#999"/>
                        <rect x="60" y="80" width="20" height="60" fill="#f0f0f0" stroke="#999"/>
                        <rect x="120" y="80" width="20" height="60" fill="#f0f0f0" stroke="#999"/>
                        <rect x="85" y="150" width="12" height="70" fill="#f0f0f0" stroke="#999"/>
                        <rect x="103" y="150" width="12" height="70" fill="#f0f0f0" stroke="#999"/>
                        
                        <!-- Pain indicators -->
                        <circle cx="95" cy="95" r="8" fill="#ff4444" opacity="0.7"/>
                        <text x="95" y="99" text-anchor="middle" fill="white" font-size="12">!</text>
                    </g>
                </svg>
            </div>
            <div class="bodymap-legend">
                <div class="legend-item">
                    <span class="legend-color" style="background: #ff4444;"></span>
                    <span>Chest pain - left sided</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color" style="background: #ff8844;"></span>
                    <span>Radiating to left arm</span>
                </div>
            </div>
        </div>
    `;
}

function generateHPContent() {
    return `
        <div class="hp-content">
            <div class="hp-section">
                <h4>History of Present Illness</h4>
                <p>Mr. Doe is a 65-year-old male with a history of HTN, DM2, and hyperlipidemia who presents with acute onset chest pain and shortness of breath starting 2 days ago.</p>
            </div>
            <div class="hp-section">
                <h4>Physical Examination</h4>
                <ul>
                    <li><strong>General:</strong> Alert, mild distress</li>
                    <li><strong>Cardiac:</strong> RRR, no murmurs/rubs/gallops</li>
                    <li><strong>Pulmonary:</strong> Clear to auscultation bilaterally</li>
                    <li><strong>Extremities:</strong> No edema, pulses 2+ throughout</li>
                </ul>
            </div>
        </div>
    `;
}

function generateLabsContent() {
    return `
        <div class="labs-table">
            <table style="width: 100%; font-size: 13px;">
                <thead>
                    <tr style="background: var(--surface-tertiary);">
                        <th style="padding: 8px; text-align: left;">Test</th>
                        <th style="padding: 8px;">Result</th>
                        <th style="padding: 8px;">Reference</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 8px;">Troponin I</td>
                        <td style="padding: 8px; text-align: center; color: var(--status-critical); font-weight: 600;">0.08 ↑</td>
                        <td style="padding: 8px; text-align: center;"><0.04 ng/mL</td>
                    </tr>
                    <tr style="background: var(--surface-secondary);">
                        <td style="padding: 8px;">BNP</td>
                        <td style="padding: 8px; text-align: center; color: var(--status-warning); font-weight: 600;">185 ↑</td>
                        <td style="padding: 8px; text-align: center;"><100 pg/mL</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">WBC</td>
                        <td style="padding: 8px; text-align: center;">8.5</td>
                        <td style="padding: 8px; text-align: center;">4-11 K/uL</td>
                    </tr>
                    <tr style="background: var(--surface-secondary);">
                        <td style="padding: 8px;">Hemoglobin</td>
                        <td style="padding: 8px; text-align: center;">13.2</td>
                        <td style="padding: 8px; text-align: center;">13-17 g/dL</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Creatinine</td>
                        <td style="padding: 8px; text-align: center;">1.1</td>
                        <td style="padding: 8px; text-align: center;">0.7-1.3 mg/dL</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// GenUI Functionality
function initializeGenUI() {
    const generateBtn = document.getElementById('generate-btn');
    const genuiPrompt = document.getElementById('genui-prompt');
    const loadingOverlay = document.getElementById('loading-overlay');
    
    if (generateBtn && genuiPrompt) {
        generateBtn.addEventListener('click', function() {
            const prompt = genuiPrompt.value.trim();
            if (prompt) {
                processGenUIRequest(prompt);
            }
        });
        
        genuiPrompt.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const prompt = this.value.trim();
                if (prompt) {
                    processGenUIRequest(prompt);
                }
            }
        });
    }
}

// Process GenUI requests
function processGenUIRequest(prompt) {
    const loadingOverlay = document.getElementById('loading-overlay');
    const workspace = document.getElementById('workspace');
    
    // Show loading overlay
    loadingOverlay.classList.remove('hidden');
    
    // Simulate AI processing
    setTimeout(() => {
        // Parse the prompt and generate appropriate content
        const generatedCard = generateCardFromPrompt(prompt);
        
        // Remove dropzone if it exists
        const dropzone = document.getElementById('workspace-dropzone');
        if (dropzone) {
            dropzone.remove();
        }
        
        // Add the new card to workspace
        workspace.insertBefore(generatedCard, workspace.firstChild);
        animateCardEntry(generatedCard);
        
        // Hide loading overlay
        loadingOverlay.classList.add('hidden');
        
        // Clear the prompt
        document.getElementById('genui-prompt').value = '';
        
        // Show success notification
        showNotification('Dashboard updated successfully!', 'success');
    }, 1500);
}

// Generate card based on prompt
function generateCardFromPrompt(prompt) {
    const promptLower = prompt.toLowerCase();
    const card = document.createElement('div');
    card.className = 'workspace-card card-enter';
    
    // Determine content based on prompt keywords
    if (promptLower.includes('cardiac') || promptLower.includes('heart')) {
        card.innerHTML = `
            <div class="card-header">
                <h3 class="card-title">Cardiac Risk Assessment</h3>
                <button class="card-action" onclick="removeCard(this)">Remove ×</button>
            </div>
            <div class="card-content">
                <div class="risk-assessment">
                    <div class="risk-score">
                        <div class="score-label">HEART Score</div>
                        <div class="score-value">6/10</div>
                        <div class="score-interpretation">Moderate Risk</div>
                    </div>
                    <div class="risk-factors">
                        <h4>Risk Factors Present:</h4>
                        <ul>
                            <li>Age > 65 years</li>
                            <li>Known CAD risk factors (3+)</li>
                            <li>Elevated troponin</li>
                            <li>ST-segment deviation on ECG</li>
                        </ul>
                    </div>
                    <div class="recommendations">
                        <h4>Recommendations:</h4>
                        <p>Consider admission for cardiac monitoring and serial troponins. Cardiology consultation recommended.</p>
                    </div>
                </div>
            </div>
        `;
    } else if (promptLower.includes('medication') || promptLower.includes('drug')) {
        card.innerHTML = `
            <div class="card-header">
                <h3 class="card-title">Medication Analysis</h3>
                <button class="card-action" onclick="removeCard(this)">Remove ×</button>
            </div>
            <div class="card-content">
                <div class="medications-list">
                    <div class="med-item">
                        <div class="med-name">Metoprolol 50mg BID</div>
                        <div class="med-status success">✓ Appropriate for HTN/Cardiac</div>
                    </div>
                    <div class="med-item">
                        <div class="med-name">Aspirin 81mg Daily</div>
                        <div class="med-status success">✓ Indicated for CAD prevention</div>
                    </div>
                    <div class="med-item">
                        <div class="med-name">Lisinopril 20mg Daily</div>
                        <div class="med-status warning">⚠️ Monitor K+ levels</div>
                    </div>
                    <div class="med-alert">
                        <strong>Alert:</strong> Consider adding statin therapy for cardiovascular risk reduction.
                    </div>
                </div>
            </div>
        `;
    } else if (promptLower.includes('ecg') || promptLower.includes('ekg')) {
        card.innerHTML = `
            <div class="card-header">
                <h3 class="card-title">ECG Analysis</h3>
                <button class="card-action" onclick="removeCard(this)">Remove ×</button>
            </div>
            <div class="card-content">
                <div class="ecg-results">
                    <div class="ecg-summary">
                        <h4>Findings:</h4>
                        <ul>
                            <li>Rhythm: Sinus rhythm</li>
                            <li>Rate: 92 bpm</li>
                            <li>PR Interval: 180 ms (normal)</li>
                            <li>QRS Duration: 94 ms (normal)</li>
                            <li>QTc: 440 ms (normal)</li>
                        </ul>
                    </div>
                    <div class="ecg-interpretation">
                        <h4>Interpretation:</h4>
                        <p class="alert-text">ST-segment depression in leads V4-V6 suggestive of lateral ischemia. Clinical correlation recommended.</p>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Default response for unrecognized prompts
        card.innerHTML = `
            <div class="card-header">
                <h3 class="card-title">AI-Generated Insights</h3>
                <button class="card-action" onclick="removeCard(this)">Remove ×</button>
            </div>
            <div class="card-content">
                <div class="ai-insights">
                    <h4>Analysis for: "${prompt}"</h4>
                    <p>Based on the patient's current presentation and medical history, the following insights have been generated:</p>
                    <ul>
                        <li>Continue monitoring vital signs closely</li>
                        <li>Consider additional diagnostic testing as indicated</li>
                        <li>Maintain current treatment protocol</li>
                        <li>Re-evaluate in 2-4 hours</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    return card;
}

// Initialize checklist functionality
function initializeChecklist() {
    const checkboxes = document.querySelectorAll('.checkbox');
    let completedCount = 0;
    const totalCount = checkboxes.length;
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            const item = this.closest('.checklist-item');
            
            if (this.classList.contains('checked')) {
                this.classList.remove('checked');
                item.classList.remove('completed');
            } else {
                this.classList.add('checked');
                item.classList.add('completed');
            }
            
            updateProgress();
        });
    });
    
    function updateProgress() {
        const checked = document.querySelectorAll('.checkbox.checked').length;
        const total = document.querySelectorAll('.checkbox').length;
        const percentage = Math.round((checked / total) * 100);
        
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${checked} of ${total} completed`;
        }
    }
}

// Initialize interactive elements
function initializeInteractiveElements() {
    // Action buttons
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            showNotification(`Action initiated: ${buttonText}`, 'info');
        });
    });
    
    // Card action buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('diagnosis-action')) {
            const diagnosisName = e.target.closest('.diagnosis-row').querySelector('.diagnosis-name').textContent;
            showNotification(`Opening details for: ${diagnosisName}`, 'info');
        }
    });
    
    // Notification button
    const notificationBtn = document.getElementById('notifications-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotification('You have 3 new notifications', 'info');
        });
    }
}

// Remove card from workspace
function removeCard(button) {
    const card = button.closest('.workspace-card');
    card.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
        card.remove();
        checkWorkspaceEmpty();
    }, 300);
}

// Check if workspace is empty and add dropzone
function checkWorkspaceEmpty() {
    const workspace = document.getElementById('workspace');
    const cards = workspace.querySelectorAll('.workspace-card');
    const dropzone = document.getElementById('workspace-dropzone');
    
    if (cards.length === 0 && !dropzone) {
        const newDropzone = document.createElement('div');
        newDropzone.id = 'workspace-dropzone';
        newDropzone.className = 'dropzone';
        newDropzone.innerHTML = `
            <div class="dropzone-content">
                <span class="dropzone-icon">➕</span>
                <span class="dropzone-text">Drop modules here to add to workspace</span>
            </div>
        `;
        workspace.appendChild(newDropzone);
    }
}

// Animate card entry
function animateCardEntry(card) {
    card.style.animation = 'slideIn 0.3s ease';
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? 'var(--status-success-bg)' : 'var(--surface-primary)'};
        color: ${type === 'success' ? 'var(--status-success)' : 'var(--text-primary)'};
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: var(--shadow-elevated);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-size: 14px;
        font-weight: 500;
        border: 1px solid ${type === 'success' ? 'var(--status-success)' : 'var(--border-card)'};
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize data visualization (placeholder for charts)
function initializeDataVisualization() {
    // This would integrate with Chart.js for real data visualization
    console.log('Data visualization components ready');
}

// Add custom styles for dynamic content
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translateX(20px);
        }
    }
    
    .timeline-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .timeline-item {
        display: flex;
        gap: 16px;
        padding: 12px;
        background: var(--surface-secondary);
        border-radius: 8px;
        border-left: 3px solid var(--brand-primary);
    }
    
    .timeline-date {
        font-size: 12px;
        color: var(--text-tertiary);
        min-width: 80px;
    }
    
    .timeline-title {
        font-weight: 600;
        margin-bottom: 4px;
    }
    
    .timeline-description {
        font-size: 13px;
        color: var(--text-secondary);
    }
    
    .abnormalities-grid {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .abnormal-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: var(--surface-secondary);
        border-radius: 8px;
    }
    
    .abnormal-item.critical {
        border-left: 3px solid var(--status-critical);
        background: var(--status-critical-bg);
    }
    
    .abnormal-item.warning {
        border-left: 3px solid var(--status-warning);
        background: var(--status-warning-bg);
    }
    
    .abnormal-icon {
        font-size: 20px;
    }
    
    .abnormal-name {
        font-weight: 600;
        font-size: 13px;
    }
    
    .abnormal-value {
        color: var(--status-critical);
        font-weight: 600;
        font-size: 14px;
    }
    
    .abnormal-range {
        font-size: 11px;
        color: var(--text-tertiary);
    }
    
    .soap-sections {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .soap-section h4 {
        font-size: 13px;
        color: var(--brand-primary);
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .soap-section p {
        font-size: 13px;
        line-height: 1.5;
        color: var(--text-secondary);
    }
    
    .hp-section {
        margin-bottom: 16px;
    }
    
    .hp-section h4 {
        font-size: 14px;
        color: var(--text-primary);
        margin-bottom: 8px;
    }
    
    .hp-section p,
    .hp-section li {
        font-size: 13px;
        color: var(--text-secondary);
        line-height: 1.5;
    }
    
    .hp-section ul {
        list-style: none;
        padding-left: 0;
    }
    
    .hp-section li {
        padding: 4px 0;
    }
    
    .risk-assessment {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .risk-score {
        text-align: center;
        padding: 20px;
        background: linear-gradient(135deg, var(--status-warning-bg), var(--surface-tertiary));
        border-radius: 12px;
    }
    
    .score-label {
        font-size: 12px;
        color: var(--text-tertiary);
        text-transform: uppercase;
    }
    
    .score-value {
        font-size: 36px;
        font-weight: bold;
        color: var(--status-warning);
        margin: 8px 0;
    }
    
    .score-interpretation {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary);
    }
    
    .risk-factors h4,
    .recommendations h4 {
        font-size: 13px;
        color: var(--text-primary);
        margin-bottom: 8px;
    }
    
    .risk-factors ul {
        list-style: none;
        padding-left: 0;
    }
    
    .risk-factors li {
        font-size: 13px;
        color: var(--text-secondary);
        padding: 4px 0;
        padding-left: 16px;
        position: relative;
    }
    
    .risk-factors li:before {
        content: "•";
        position: absolute;
        left: 0;
        color: var(--status-warning);
    }
    
    .recommendations p {
        font-size: 13px;
        color: var(--text-secondary);
        line-height: 1.5;
    }
    
    .medications-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .med-item {
        padding: 12px;
        background: var(--surface-secondary);
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .med-name {
        font-weight: 600;
        font-size: 13px;
    }
    
    .med-status {
        font-size: 12px;
    }
    
    .med-status.success {
        color: var(--status-success);
    }
    
    .med-status.warning {
        color: var(--status-warning);
    }
    
    .med-alert {
        padding: 12px;
        background: var(--status-warning-bg);
        border-radius: 8px;
        font-size: 13px;
        color: var(--status-warning);
    }
    
    .ecg-results {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .ecg-summary h4,
    .ecg-interpretation h4 {
        font-size: 13px;
        color: var(--text-primary);
        margin-bottom: 8px;
    }
    
    .ecg-summary ul {
        list-style: none;
        padding-left: 0;
    }
    
    .ecg-summary li {
        font-size: 13px;
        color: var(--text-secondary);
        padding: 4px 0;
    }
    
    .alert-text {
        padding: 12px;
        background: var(--status-critical-bg);
        color: var(--status-critical);
        border-radius: 8px;
        font-size: 13px;
        border-left: 3px solid var(--status-critical);
    }
    
    .ai-insights h4 {
        font-size: 14px;
        color: var(--text-primary);
        margin-bottom: 12px;
    }
    
    .ai-insights p {
        font-size: 13px;
        color: var(--text-secondary);
        margin-bottom: 12px;
        line-height: 1.5;
    }
    
    .ai-insights ul {
        list-style: none;
        padding-left: 0;
    }
    
    .ai-insights li {
        font-size: 13px;
        color: var(--text-secondary);
        padding: 6px 0;
        padding-left: 20px;
        position: relative;
    }
    
    .ai-insights li:before {
        content: "→";
        position: absolute;
        left: 0;
        color: var(--brand-primary);
    }
    
    .bodymap-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .bodymap-legend {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: var(--text-secondary);
    }
    
    .legend-color {
        width: 16px;
        height: 16px;
        border-radius: 4px;
    }
`;

document.head.appendChild(styleSheet);

// Log successful initialization
console.log('Medical Dashboard GenUI - All components initialized successfully');

// ===================================
// VIEW MODE SWITCHING FUNCTIONALITY
// ===================================

let currentViewMode = 'pre-visit';
let isTransitioning = false;

function initializeViewModeSwitcher() {
    const viewModeDropdown = document.getElementById('view-mode-dropdown');
    const dashboardContainer = document.querySelector('.dashboard-container');
    const dashboardHeader = document.querySelector('.dashboard-header');
    const leftPanel = document.querySelector('.left-panel');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    
    if (viewModeDropdown) {
        viewModeDropdown.addEventListener('change', function(e) {
            const newMode = e.target.value;
            switchViewMode(newMode);
        });
    }
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            toggleLeftPanel();
        });
    }
    
    // Panel collapse button
    const panelCollapseBtn = document.getElementById('panel-collapse-btn');
    if (panelCollapseBtn) {
        panelCollapseBtn.addEventListener('click', function() {
            toggleLeftPanel(); // Same function to collapse
        });
    }
    
    // Initialize card expand buttons
    initializeCardExpanders();
}

function switchViewMode(newMode) {
    if (isTransitioning || newMode === currentViewMode) return;
    
    isTransitioning = true;
    const dashboardContainer = document.querySelector('.dashboard-container');
    const body = document.body;
    
    // Switch modes immediately - CSS will handle smooth transitions
    if (newMode === 'visit') {
        dashboardContainer.classList.add('visit-mode');
        body.classList.add('visit-mode');
        currentViewMode = 'visit';
        
        // Set all cards to collapsed state when entering visit mode
        const workspaceCards = document.querySelectorAll('.workspace-card');
        workspaceCards.forEach(card => {
            card.setAttribute('data-expanded', 'false');
        });
    } else {
        dashboardContainer.classList.remove('visit-mode');
        body.classList.remove('visit-mode');
        currentViewMode = 'pre-visit';
        
        // Reset left panel expansion if returning to pre-visit
        const leftPanel = document.querySelector('.left-panel');
        if (leftPanel) {
            leftPanel.classList.remove('expanded');
        }
        
        // Expand all cards when returning to pre-visit mode
        const workspaceCards = document.querySelectorAll('.workspace-card');
        workspaceCards.forEach(card => {
            card.setAttribute('data-expanded', 'true');
        });
    }
    
    // Allow transitions to complete
    setTimeout(() => {
        isTransitioning = false;
        
        // Show notification
        const modeName = newMode === 'visit' ? 'Visit Mode' : 'Pre-Visit Mode';
        showNotification(`Switched to ${modeName}`, 'success');
    }, 600); // Match CSS transition duration
}

function toggleLeftPanel() {
    const leftPanel = document.querySelector('.left-panel');
    const dashboardContainer = document.querySelector('.dashboard-container');
    
    if (!leftPanel || currentViewMode !== 'visit') return;
    
    if (leftPanel.classList.contains('expanded')) {
        // Collapse
        leftPanel.classList.remove('expanded');
        dashboardContainer.style.gridTemplateColumns = '60px 1fr 400px';
    } else {
        // Expand
        leftPanel.classList.add('expanded');
        dashboardContainer.style.gridTemplateColumns = '360px 1fr 400px';
    }
}

// ===================================
// CARD EXPAND/COLLAPSE FUNCTIONALITY
// ===================================

function initializeCardExpanders() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('card-expand') || 
            e.target.closest('.card-expand')) {
            
            const button = e.target.classList.contains('card-expand') ? 
                          e.target : e.target.closest('.card-expand');
            toggleCardExpansion(button);
        }
    });
}

function toggleCardExpansion(button) {
    const card = button.closest('.workspace-card');
    if (!card) return;
    
    const isExpanded = card.getAttribute('data-expanded') === 'true';
    
    if (isExpanded) {
        // Collapse
        card.setAttribute('data-expanded', 'false');
        button.style.transform = 'rotate(0deg)';
        
        // Smooth scroll to top of card if needed
        const cardRect = card.getBoundingClientRect();
        if (cardRect.top < 100) {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else {
        // Expand
        card.setAttribute('data-expanded', 'true');
        button.style.transform = 'rotate(180deg)';
    }
}

// Initialize view mode switcher when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeViewModeSwitcher();
});

// ===================================
// ENHANCED KEYBOARD SHORTCUTS
// ===================================

document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Shift + V to toggle view mode
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'V') {
        e.preventDefault();
        const dropdown = document.getElementById('view-mode-dropdown');
        if (dropdown) {
            const newMode = currentViewMode === 'pre-visit' ? 'visit' : 'pre-visit';
            dropdown.value = newMode;
            switchViewMode(newMode);
        }
    }
    
    // Ctrl/Cmd + Shift + L to toggle left panel (in visit mode)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
        e.preventDefault();
        if (currentViewMode === 'visit') {
            toggleLeftPanel();
        }
    }
});

// ===================================
// RESPONSIVE PANEL ADJUSTMENTS
// ===================================

function handleResponsiveLayout() {
    const dashboardContainer = document.querySelector('.dashboard-container');
    const width = window.innerWidth;
    
    if (currentViewMode === 'visit') {
        if (width < 1400) {
            dashboardContainer.style.gridTemplateColumns = '60px 1fr 320px';
        } else if (width < 1600) {
            dashboardContainer.style.gridTemplateColumns = '60px 1fr 360px';
        } else {
            dashboardContainer.style.gridTemplateColumns = '60px 1fr 400px';
        }
    }
}

window.addEventListener('resize', debounce(handleResponsiveLayout, 250));

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// ANIMATION PERFORMANCE OPTIMIZATION
// ===================================

// Use requestAnimationFrame for smooth animations
function smoothTransition(element, property, startValue, endValue, duration) {
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-in-out)
        const easeProgress = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        const currentValue = startValue + (endValue - startValue) * easeProgress;
        element.style[property] = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// ===================================
// STATE PERSISTENCE
// ===================================

// Save view mode preference to localStorage
function saveViewModePreference(mode) {
    try {
        localStorage.setItem('medicalDashboardViewMode', mode);
    } catch (e) {
        console.warn('Could not save view mode preference:', e);
    }
}

// Load view mode preference from localStorage
function loadViewModePreference() {
    try {
        const savedMode = localStorage.getItem('medicalDashboardViewMode');
        if (savedMode && (savedMode === 'pre-visit' || savedMode === 'visit')) {
            const dropdown = document.getElementById('view-mode-dropdown');
            if (dropdown) {
                dropdown.value = savedMode;
                if (savedMode !== 'pre-visit') {
                    switchViewMode(savedMode);
                }
            }
        }
    } catch (e) {
        console.warn('Could not load view mode preference:', e);
    }
}

// Load preference on page load
window.addEventListener('load', function() {
    loadViewModePreference();
});

// Save preference when mode changes
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('view-mode-dropdown');
    if (dropdown) {
        dropdown.addEventListener('change', function() {
            saveViewModePreference(this.value);
        });
    }
});

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Add ARIA labels and announcements for screen readers
function announceViewModeChange(mode) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Dashboard view changed to ${mode === 'visit' ? 'Visit' : 'Pre-Visit'} mode`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

// Add screen reader only class to styles
const srOnlyStyle = document.createElement('style');
srOnlyStyle.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;
document.head.appendChild(srOnlyStyle);

console.log('View mode switching functionality initialized');
