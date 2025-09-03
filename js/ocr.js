// ================== OCR MEJORADO ==================

// Configuración optimizada para OCR
const OCR_CONFIG = {
    workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/worker.min.js',
    corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@4/tesseract-core.wasm.js',
    langPath: 'https://cdn.jsdelivr.net/npm/tesseract.js-data@4',
    languages: ['spa', 'eng'],
    cacheMethod: 'refresh', // 'none', 'refresh', or 'persist'
    cacheSize: 20 // Número de trabajos en cache
};

// Pool de workers para mejor rendimiento
const workerPool = Tesseract.createWorkerPool(
    OCR_CONFIG.workerPath,
    OCR_CONFIG.corePath,
    2 // Número de workers (optimizado para dispositivos móviles)
);

async function initializeOCR() {
    try {
        for (const lang of OCR_CONFIG.languages) {
            await workerPool.loadLanguage(lang);
            await workerPool.initialize(lang);
        }
        console.log('OCR inicializado correctamente');
    } catch (error) {
        console.error('Error inicializando OCR:', error);
    }
}

// Inicializar OCR al cargar
initializeOCR();

async function processImageWithOCR(file) {
    showNotification(`Procesando imagen con OCR: ${file.name}`);
    
    // Mostrar barra de progreso
    const ocrProgress = document.getElementById('ocr-progress');
    const ocrProgressBar = document.getElementById('ocr-progress-bar');
    
    if (ocrProgress && ocrProgressBar) {
        ocrProgress.style.display = 'block';
        ocrProgressBar.style.width = '0%';
    }
    
    try {
        const result = await workerPool.recognize(file, OCR_CONFIG.languages, {
            logger: progress => {
                if (progress.status === 'recognizing text') {
                    const p = Math.round(progress.progress * 100);
                    if (ocrProgressBar) {
                        ocrProgressBar.style.width = `${p}%`;
                    }
                }
            }
        });
        
        // Ocultar barra de progreso
        setTimeout(() => {
            if (ocrProgress) {
                ocrProgress.style.display = 'none';
            }
        }, 500);
        
        // Procesar texto con hooks del sistema de plugins
        let processedText = pluginSystem.executeHook('ocr:afterExtract', result.data.text, file.name);
        
        // Guardar texto extraído en el estado
        appState.updateState({
            extractedTexts: {
                ...appState.state.extractedTexts,
                [file.name]: processedText
            }
        });
        
        // Mostrar resultado
        const ocrText = document.getElementById('ocr-text');
        const ocrResult = document.getElementById('ocr-result');
        
        if (ocrText && ocrResult) {
            ocrText.textContent = processedText || 'No se detectó texto en la imagen';
            ocrResult.style.display = 'block';
        }
        
        // Añadir mensaje al chat
        addMessage(`He procesado la imagen "${file.name}" y extraído texto con OCR.`, false);
        
        showNotification('OCR completado correctamente');
        
    } catch (error) {
        if (ocrProgress) {
            ocrProgress.style.display = 'none';
        }
        console.error('Error en OCR:', error);
        showNotification('Error al procesar la imagen con OCR', false);
    }
}