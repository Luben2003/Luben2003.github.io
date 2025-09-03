// ================== GESTIÓN AVANZADA DE ESTADO ==================
class StateManager {
    constructor() {
        this.state = {
            documents: [],
            schedule: [],
            extractedTexts: {},
            settings: {
                theme: 'light',
                language: 'es',
                notifications: true,
                autoSave: true
            },
            categories: ['trabajo', 'estudio', 'personal', 'otros'],
            userPreferences: {}
        };
        
        this.subscribers = [];
        this.init();
    }

    init() {
        // Cargar estado inicial desde localStorage
        this.loadState();
        
        // Auto-guardar cada 30 segundos si está habilitado
        setInterval(() => {
            if (this.state.settings.autoSave) {
                this.saveState();
            }
        }, 30000);
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    notify() {
        this.subscribers.forEach(callback => callback(this.state));
    }

    updateState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
        
        if (this.state.settings.autoSave) {
            this.saveState();
        }
    }

    saveState() {
        try {
            const stateToSave = {
                ...this.state,
                // No guardar configuraciones temporales
                _version: '1.0',
                _timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('documentOrganizerState', JSON.stringify(stateToSave));
            return true;
        } catch (error) {
            console.error('Error saving state:', error);
            if (error.name === 'QuotaExceededError') {
                this.cleanupOldData();
            }
            return false;
        }
    }

    loadState() {
        try {
            const savedState = localStorage.getItem('documentOrganizerState');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                
                // Validar y mezclar con estado por defecto
                this.state = {
                    ...this.state,
                    ...parsedState,
                    settings: {
                        ...this.state.settings,
                        ...(parsedState.settings || {})
                    }
                };
                
                this.notify();
                return true;
            }
        } catch (error) {
            console.error('Error loading state:', error);
        }
        return false;
    }

    cleanupOldData() {
        // Limpiar textos OCR antiguos para liberar espacio
        const textKeys = Object.keys(this.state.extractedTexts);
        if (textKeys.length > 20) {
            // Mantener solo los 20 textos más recientes
            const recentTexts = {};
            textKeys.slice(-20).forEach(key => {
                recentTexts[key] = this.state.extractedTexts[key];
            });
            this.updateState({ extractedTexts: recentTexts });
        }
    }

    // Métodos helpers para operaciones comunes
    addDocument(document) {
        const documents = [...this.state.documents, document];
        this.updateState({ documents });
    }

    removeDocument(documentName) {
        const documents = this.state.documents.filter(doc => doc.name !== documentName);
        const extractedTexts = { ...this.state.extractedTexts };
        delete extractedTexts[documentName];
        
        this.updateState({ documents, extractedTexts });
    }

    addScheduleTask(task) {
        const schedule = [...this.state.schedule, task];
        this.updateState({ schedule });
    }
}

// Instancia global del gestor de estado
const appState = new StateManager();