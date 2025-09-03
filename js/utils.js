// ================== FUNCIONES DE UTILIDAD ==================

// Función para mostrar notificaciones
function showNotification(message, isSuccess = true) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    if (!notification || !notificationText) return;
    
    notification.style.backgroundColor = isSuccess ? 'var(--success)' : 'var(--danger)';
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Función para formatear el tamaño del archivo
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Función para agregar mensajes al chat
function addMessage(message, isUser) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageDiv.innerHTML = `
        ${message}
        <div class="message-time">${time}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ================== TEMA CLARO/OSCURO ==================
function initThemeSwitcher() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.classList.add('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.appendChild(themeToggle);
    }
    
    // Cargar tema guardado
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// ================== EDITOR OCR ==================
function initOCREditor() {
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i> Editar texto';
    editButton.classList.add('btn', 'btn-outline');
    editButton.addEventListener('click', toggleOCREditor);
    
    // Añadir solo si existe el elemento OCR result
    const ocrResult = document.getElementById('ocr-result');
    if (ocrResult) {
        ocrResult.appendChild(editButton);
    }
}

function toggleOCREditor() {
    const ocrText = document.getElementById('ocr-text');
    if (!ocrText) return;
    
    const isEditing = ocrText.getAttribute('contenteditable') === 'true';
    
    if (isEditing) {
        ocrText.setAttribute('contenteditable', 'false');
        ocrText.style.border = 'none';
        this.innerHTML = '<i class="fas fa-edit"></i> Editar texto';
        
        // Guardar cambios
        const filename = Object.keys(extractedTexts).find(name => 
            extractedTexts[name] === ocrText.textContent
        );
        if (filename) {
            extractedTexts[filename] = ocrText.textContent;
            saveToLocalStorage();
        }
    } else {
        ocrText.setAttribute('contenteditable', 'true');
        ocrText.style.border = '1px dashed var(--primary)';
        ocrText.focus();
        this.innerHTML = '<i class="fas fa-save"></i> Guardar';
    }
}

// ================== BUSCADOR ==================
function initSearchFunctionality() {
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('search-container');
    searchContainer.innerHTML = `
        <input type="text" id="global-search" placeholder="Buscar en documentos...">
        <button id="search-btn"><i class="fas fa-search"></i></button>
    `;
    
    const header = document.querySelector('header');
    if (header) {
        header.appendChild(searchContainer);
    }
    
    document.getElementById('search-btn').addEventListener('click', performSearch);
    document.getElementById('global-search').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

function performSearch() {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase();
    if (!query) return;
    
    // Buscar en documentos
    const results = {
        documents: documents.filter(doc => doc.name.toLowerCase().includes(query)),
        schedule: schedule.filter(task => 
            task.title.toLowerCase().includes(query) || 
            task.description.toLowerCase().includes(query)
        ),
        ocrTexts: Object.keys(extractedTexts).filter(filename => 
            extractedTexts[filename].toLowerCase().includes(query)
        )
    };
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const scheduleView = document.getElementById('schedule-view');
    if (!scheduleView) return;
    
    // Mostrar resultados en la interfaz
    let resultHTML = '<div class="search-results">';
    
    if (results.documents.length > 0) {
        resultHTML += '<h4>Documentos encontrados:</h4>';
        results.documents.forEach(doc => {
            resultHTML += `<div class="search-item">📄 ${doc.name}</div>`;
        });
    }
    
    if (results.schedule.length > 0) {
        resultHTML += '<h4>Tareas encontradas:</h4>';
        results.schedule.forEach(task => {
            resultHTML += `<div class="search-item">📅 ${task.title}</div>`;
        });
    }
    
    if (results.ocrTexts.length > 0) {
        resultHTML += '<h4>Texto encontrado en imágenes:</h4>';
        results.ocrTexts.forEach(filename => {
            resultHTML += `<div class="search-item">🖼️ ${filename}</div>`;
        });
    }
    
    if (results.documents.length === 0 && results.schedule.length === 0 && results.ocrTexts.length === 0) {
        resultHTML += '<p>No se encontraron resultados.</p>';
    }
    
    resultHTML += '</div>';
    
    // Mostrar en el área de cronograma
    scheduleView.innerHTML = resultHTML;
}

// ================== SISTEMA DE CATEGORÍAS ==================
function initCategorySystem() {
    // Añadir interfaz para categorías
    const categoryHTML = `
        <div class="category-section">
            <h4>Categorías</h4>
            <div class="category-list">
                <span class="category-tag" data-category="trabajo">Trabajo</span>
                <span class="category-tag" data-category="estudio">Estudio</span>
                <span class="category-tag" data-category="personal">Personal</span>
                <span class="category-tag" data-category="otros">Otros</span>
            </div>
        </div>
    `;
    
    // Insertar en el área de documentos
    const cardBody = document.querySelector('.card-body');
    if (cardBody) {
        cardBody.insertAdjacentHTML('afterbegin', categoryHTML);
        
        // Event listeners para categorías
        document.querySelectorAll('.category-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                filterByCategory(tag.dataset.category);
            });
        });
    }
}

function filterByCategory(category) {
    // Quitar filtros actuales
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.classList.remove('active');
    });
    
    // Marcar categoría activa
    const activeTag = document.querySelector(`[data-category="${category}"]`);
    if (activeTag) {
        activeTag.classList.add('active');
    }
    
    // Filtrar documentos
    const filteredDocs = documents.filter(doc => doc.category === category);
    const filteredSchedule = schedule.filter(task => task.category === category);
    
    // Actualizar vistas filtradas
    updateFileList(filteredDocs);
    updateScheduleView(filteredSchedule);
    
    showNotification(`Mostrando categoría: ${category}`);
}

// Función global para mostrar/ocultar resultados OCR
window.toggleOCRResult = function(filename) {
    if (extractedTexts[filename]) {
        const ocrText = document.getElementById('ocr-text');
        const ocrResult = document.getElementById('ocr-result');
        
        if (ocrText && ocrResult) {
            ocrText.textContent = extractedTexts[filename];
            ocrResult.style.display = ocrResult.style.display === 'none' ? 'block' : 'none';
        }
    }
};