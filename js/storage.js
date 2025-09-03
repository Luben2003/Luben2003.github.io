// Función para guardar en localStorage
function saveToLocalStorage() {
    const data = {
        documents: documents,
        schedule: schedule,
        extractedTexts: extractedTexts
    };
    localStorage.setItem('documentOrganizer', JSON.stringify(data));
    showNotification('Datos guardados correctamente');
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