// ================== PUNTO DE ENTRADA PRINCIPAL MEJORADO ==================

// Configuración de jsPDF
const { jsPDF } = window.jspdf;

// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Inicializando Organizador Inteligente con OCR...');
    
    // Referencias a elementos del DOM
    const elements = {
        chatMessages: document.getElementById('chat-messages'),
        userInput: document.getElementById('user-input'),
        sendButton: document.getElementById('send-button'),
        fileInput: document.getElementById('file-input'),
        dropZone: document.getElementById('drop-zone'),
        generateScheduleBtn: document.getElementById('generate-schedule'),
        scheduleView: document.getElementById('schedule-view'),
        clearFilesBtn: document.getElementById('clear-files'),
        saveScheduleBtn: document.getElementById('save-schedule'),
        loadScheduleBtn: document.getElementById('load-schedule'),
        exportScheduleBtn: document.getElementById('export-schedule'),
        viewDocumentBtn: document.getElementById('view-document'),
        notification: document.getElementById('notification'),
        notificationText: document.getElementById('notification-text'),
        ocrProgress: document.getElementById('ocr-progress'),
        ocrProgressBar: document.getElementById('ocr-progress-bar'),
        ocrResult: document.getElementById('ocr-result'),
        ocrText: document.getElementById('ocr-text'),
        documentModal: document.getElementById('document-modal'),
        closeModal: document.getElementById('close-modal'),
        closeDocument: document.getElementById('close-document'),
        printDocument: document.getElementById('print-document'),
        documentTitle: document.getElementById('document-title'),
        documentDate: document.getElementById('document-date'),
        documentBody: document.getElementById('document-body')
    };

    // Suscribirse a cambios de estado
    appState.subscribe(state => {
        updateUI(state);
    });

    // Inicializar PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch(error => {
                console.log('Error registrando Service Worker:', error);
            });
    }

    // Event listeners para el chat
    if (elements.sendButton && elements.userInput) {
        elements.sendButton.addEventListener('click', processUserInput);
        elements.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                processUserInput();
            }
        });
    }
    
    // ... (el resto de event listeners se mantiene similar pero usando appState)

    // Inicializar todas las funcionalidades
    initThemeSwitcher();
    initSearchFunctionality();
    initTemplates();
    initCategorySystem();
    initOCREditor();
    
    // Añadir mensajes iniciales al chat
    setTimeout(() => {
        addMessage("¡Bienvenido al Organizador Inteligente! Ahora con mejores funciones OCR y categorización automática.", false);
    }, 1000);

    console.log('Aplicación inicializada correctamente');
});

// Función para actualizar la UI basada en el estado
function updateUI(state) {
    updateFileList(state.documents);
    updateScheduleView(state.schedule);
    
    // Actualizar tema
    if (state.settings.theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

// Función para limpiar archivos (actualizada)
function clearFiles() {
    appState.updateState({
        documents: [],
        extractedTexts: {}
    });
    
    const ocrResult = document.getElementById('ocr-result');
    if (ocrResult) {
        ocrResult.style.display = 'none';
    }
    
    showNotification('Archivos eliminados correctamente');
}