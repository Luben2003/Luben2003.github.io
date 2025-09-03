// ================== MANEJO DE ALMACENAMIENTO ==================

// Función para guardar en localStorage
function saveToLocalStorage() {
    const data = {
        documents: documents,
        schedule: schedule,
        extractedTexts: compressedTexts(), // Usar texto comprimido
        timestamp: new Date().getTime()
    };
    
    try {
        localStorage.setItem('documentOrganizer', JSON.stringify(data));
        showNotification('Datos guardados correctamente');
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            cleanupOldData();
            showNotification('Espacio liberado. Intenta guardar nuevamente.', false);
        }
    }
}

// Función para cargar desde localStorage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('documentOrganizer');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            documents = data.documents || [];
            schedule = data.schedule || [];
            extractedTexts = data.extractedTexts || {};
            
            // Actualizar la interfaz
            updateFileList();
            updateScheduleView();
            
            showNotification('Datos cargados correctamente');
        } catch (e) {
            console.error('Error al cargar datos guardados:', e);
        }
    }
}

// Comprimir textos para ahorrar espacio
function compressedTexts() {
    const compressed = {};
    Object.keys(extractedTexts).forEach(key => {
        if (extractedTexts[key].length > 10000) {
            compressed[key] = extractedTexts[key].substring(0, 10000) + '... [texto truncado]';
        } else {
            compressed[key] = extractedTexts[key];
        }
    });
    return compressed;
}

// Limpiar datos antiguos
function cleanupOldData() {
    const savedData = localStorage.getItem('documentOrganizer');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            if (data && data.timestamp) {
                const thirtyDaysAgo = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
                if (data.timestamp < thirtyDaysAgo) {
                    localStorage.removeItem('documentOrganizer');
                    documents = [];
                    schedule = [];
                    extractedTexts = {};
                    updateFileList();
                    updateScheduleView();
                    showNotification('Datos antiguos eliminados');
                }
            }
        } catch (e) {
            console.error('Error al limpiar datos:', e);
        }
    }
}