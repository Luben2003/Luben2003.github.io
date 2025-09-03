// ================== SISTEMA DE PLUGINS ==================
class PluginSystem {
    constructor() {
        this.plugins = new Map();
        this.hooks = new Map();
    }

    registerPlugin(name, plugin) {
        if (this.plugins.has(name)) {
            console.warn(`Plugin "${name}" ya está registrado`);
            return false;
        }

        this.plugins.set(name, {
            ...plugin,
            enabled: true
        });

        // Registrar hooks del plugin
        if (plugin.hooks) {
            Object.keys(plugin.hooks).forEach(hookName => {
                this.registerHook(hookName, plugin.hooks[hookName]);
            });
        }

        console.log(`Plugin "${name}" registrado correctamente`);
        return true;
    }

    registerHook(hookName, callback) {
        if (!this.hooks.has(hookName)) {
            this.hooks.set(hookName, []);
        }
        this.hooks.get(hookName).push(callback);
    }

    executeHook(hookName, ...args) {
        if (!this.hooks.has(hookName)) return args[0];
        
        return this.hooks.get(hookName).reduce((result, callback) => {
            try {
                return callback(result, ...args.slice(1)) || result;
            } catch (error) {
                console.error(`Error en hook ${hookName}:`, error);
                return result;
            }
        }, args[0]);
    }

    enablePlugin(name) {
        const plugin = this.plugins.get(name);
        if (plugin) {
            plugin.enabled = true;
            if (plugin.onEnable) plugin.onEnable();
        }
    }

    disablePlugin(name) {
        const plugin = this.plugins.get(name);
        if (plugin) {
            plugin.enabled = false;
            if (plugin.onDisable) plugin.onDisable();
        }
    }
}

// Plugins incorporados
const builtInPlugins = {
    advancedOCR: {
        name: 'Advanced OCR',
        description: 'Mejora el reconocimiento OCR con procesamiento adicional',
        hooks: {
            'ocr:afterExtract': (text, filename) => {
                // Limpiar y formatear texto OCR
                return text
                    .replace(/\n{3,}/g, '\n\n') // Limitar saltos de línea múltiples
                    .replace(/([.!?])\s*/g, '$1 ') // Normalizar espacios después de puntuación
                    .trim();
            }
        },
        onEnable: () => console.log('Advanced OCR habilitado'),
        onDisable: () => console.log('Advanced OCR deshabilitado')
    },

    smartCategorization: {
        name: 'Smart Categorization',
        description: 'Categorización automática de documentos basada en contenido',
        hooks: {
            'document:beforeAdd': (document, content) => {
                // Categorizar basado en contenido o nombre de archivo
                const lowerContent = content.toLowerCase();
                const lowerName = document.name.toLowerCase();
                
                if (lowerContent.includes('examen') || lowerName.includes('examen')) {
                    document.category = 'estudio';
                    document.priority = 'high';
                } else if (lowerContent.includes('reunión') || lowerName.includes('reunión')) {
                    document.category = 'trabajo';
                    document.priority = 'medium';
                }
                
                return document;
            }
        }
    }
};

// Instancia global del sistema de plugins
const pluginSystem = new PluginSystem();

// Registrar plugins incorporados
Object.entries(builtInPlugins).forEach(([name, plugin]) => {
    pluginSystem.registerPlugin(name, plugin);
});