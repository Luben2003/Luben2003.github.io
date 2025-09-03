// ================== INTEGRACIÓN DE IA CON EL SISTEMA EXISTENTE ==================

// Configuración de IA
const AI_CONFIG = {
    ENABLED: true,
    API_KEY: null, // Se establecerá desde la interfaz
    AUTO_ANALYSIS: true,
    MIN_TEXT_LENGTH: 50 // Mínimo de caracteres para análisis automático
};

// Inicializar el sistema de IA
async function initializeAISystem() {
    if (!AI_CONFIG.ENABLED) {
        console.log('Sistema de IA deshabilitado');
        return false;
    }

    try {
        // Intentar cargar API key desde localStorage
        const savedApiKey = localStorage.getItem('aiApiKey');
        if (savedApiKey) {
            AI_CONFIG.API_KEY = savedApiKey;
        }

        const initialized = await aiProcessor.initialize(AI_CONFIG.API_KEY);
        
        if (initialized) {
            console.log('Sistema de IA inicializado correctamente');
            // Añadir controles de IA a la interfaz
            addAIControlsToUI();
            return true;
        } else {
            console.warn('Sistema de IA inicializado en modo limitado (sin API)');
            return true; // Aún funciona con capacidades locales
        }
    } catch (error) {
        console.error('Error inicializando sistema de IA:', error);
        return false;
    }
}

// Añadir controles de IA a la interfaz
function addAIControlsToUI() {
    // Panel de configuración de IA
    const aiConfigPanel = document.createElement('div');
    aiConfigPanel.className = 'ai-config-panel';
    aiConfigPanel.innerHTML = `
        <div class="ai-config-header">
            <h4><i class="fas fa-robot"></i> Configuración de IA</h4>
            <button class="ai-config-toggle"><i class="fas fa-cog"></i></button>
        </div>
        <div class="ai-config-content" style="display: none;">
            <div class="ai-config-item">
                <label for="ai-api-key">API Key (Hugging Face):</label>
                <input type="password" id="ai-api-key" placeholder="hf_..." value="${AI_CONFIG.API_KEY || ''}">
                <button id="save-ai-key">Guardar</button>
            </div>
            <div class="ai-config-item">
                <label>
                    <input type="checkbox" id="ai-auto-analysis" ${AI_CONFIG.AUTO_ANALYSIS ? 'checked' : ''}>
                    Análisis automático
                </label>
            </div>
            <div class="ai-config-item">
                <button id="ai-analyze-all" class="btn btn-outline">
                    <i class="fas fa-brain"></i> Analizar todo
                </button>
            </div>
        </div>
    `;

    // Insertar en la interfaz
    const firstCard = document.querySelector('.card');
    if (firstCard) {
        firstCard.parentNode.insertBefore(aiConfigPanel, firstCard);
    }

    // Event listeners para los controles de IA
    document.querySelector('.ai-config-toggle').addEventListener('click', function() {
        const content = document.querySelector('.ai-config-content');
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('save-ai-key').addEventListener('click', function() {
        const apiKey = document.getElementById('ai-api-key').value;
        if (apiKey) {
            AI_CONFIG.API_KEY = apiKey;
            localStorage.setItem('aiApiKey', apiKey);
            aiProcessor.initialize(apiKey);
            showNotification('API Key guardada correctamente');
        }
    });

    document.getElementById('ai-auto-analysis').addEventListener('change', function() {
        AI_CONFIG.AUTO_ANALYSIS = this.checked;
    });

    document.getElementById('ai-analyze-all').addEventListener('click', function() {
        analyzeAllDocuments();
    });
}

// Integrar con el sistema de procesamiento de documentos
function setupAIIntegration() {
    // Interceptar el procesamiento de documentos para añadir análisis de IA
    const originalHandleFiles = window.handleFiles;
    
    window.handleFiles = async function(files) {
        // Primero procesar normalmente
        await originalHandleFiles(files);
        
        // Luego análisis de IA si está habilitado
        if (AI_CONFIG.ENABLED && AI_CONFIG.AUTO_ANALYSIS) {
            for (const file of files) {
                if (file.type.includes('image') || file.type.includes('text') || file.type.includes('pdf')) {
                    await analyzeDocumentWithAI(file);
                }
            }
        }
    };

    // Extender el objeto document para incluir análisis de IA
    const originalAddDocument = appState.addDocument;
    
    appState.addDocument = function(document) {
        // Añadir campo para análisis de IA
        const docWithAI = {
            ...document,
            aiAnalysis: null,
            aiProcessed: false
        };
        
        return originalAddDocument.call(this, docWithAI);
    };
}

// Analizar un documento con IA
async function analyzeDocumentWithAI(file) {
    try {
        // Buscar el documento en el estado
        const document = appState.state.documents.find(doc => doc.name === file.name);
        if (!document || document.aiProcessed) {
            return;
        }

        showNotification(`Analizando ${file.name} con IA...`);

        let textToAnalyze = '';
        
        // Obtener texto para análisis
        if (file.type.includes('image') && appState.state.extractedTexts[file.name]) {
            textToAnalyze = appState.state.extractedTexts[file.name];
        } else if (file.type.includes('text')) {
            // Para archivos de texto, leer el contenido
            textToAnalyze = await readFileAsText(file);
        }
        
        // Solo analizar si hay suficiente texto
        if (textToAnalyze && textToAnalyze.length >= AI_CONFIG.MIN_TEXT_LENGTH) {
            const analysis = await aiProcessor.analyzeDocument(textToAnalyze, file.name);
            
            // Actualizar el documento con el análisis
            const updatedDocuments = appState.state.documents.map(doc => {
                if (doc.name === file.name) {
                    return {
                        ...doc,
                        aiAnalysis: analysis,
                        aiProcessed: true,
                        // Aplicar categorías detectadas automáticamente
                        category: analysis.categories[0] || doc.category
                    };
                }
                return doc;
            });
            
            appState.updateState({ documents: updatedDocuments });
            
            // Mostrar resultados en el chat
            addMessage(`He analizado "${file.name}" con IA. Detectado: ${analysis.categories.join(', ')}.`, false);
            
            showNotification('Análisis de IA completado');
        }
    } catch (error) {
        console.error('Error en análisis de IA:', error);
        showNotification('Error en análisis de IA', false);
    }
}

// Analizar todos los documentos
async function analyzeAllDocuments() {
    const documents = appState.state.documents.filter(doc => !doc.aiProcessed);
    
    if (documents.length === 0) {
        showNotification('No hay documentos nuevos para analizar');
        return;
    }

    showNotification(`Analizando ${documents.length} documentos con IA...`);
    
    for (const doc of documents) {
        const file = await findFileByName(doc.name);
        if (file) {
            await analyzeDocumentWithAI(file);
        }
    }
    
    showNotification('Análisis completo de todos los documentos');
}

// Helper para leer archivo como texto
function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = e => reject(e);
        reader.readAsText(file);
    });
}

// Helper para encontrar archivo por nombre
function findFileByName(filename) {
    // Esta función necesitaría acceso a la lista original de archivos
    // En una implementación real, necesitaríamos mantener una referencia
    return null; // Placeholder
}

// Inicializar la integración de IA cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeAISystem().then(success => {
            if (success) {
                setupAIIntegration();
            }
        });
    }, 2000);
});