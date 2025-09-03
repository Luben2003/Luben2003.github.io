proyecto/
├── index.html
├── css/
│   ├── style.css
│   └── components/
│       ├── header.css
│       ├── card.css
│       ├── chat.css
│       ├── upload.css
│       ├── schedule.css
│       └── modal.css
├── js/
│   ├── main.js
│   ├── ocr.js
│   ├── storage.js
│   ├── chat.js
│   ├── schedule.js
│   └── utils.js

¡Perfecto! Si ya tienes la estructura de carpetas que te proporcioné, entonces vamos a limpiar tu archivo index.html para que solo tenga el HTML y los enlaces a los archivos CSS/JS externos.

📝 index.html LIMPIO y CORRECTO:
html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Organizador Inteligente con OCR</title>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Nuestros archivos CSS -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/components/header.css">
    <link rel="stylesheet" href="css/components/card.css">
    <link rel="stylesheet" href="css/components/chat.css">
    <link rel="stylesheet" href="css/components/upload.css">
    <link rel="stylesheet" href="css/components/schedule.css">
    <link rel="stylesheet" href="css/components/modal.css">
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">
                <i class="fas fa-file-alt"></i>
                <h1>Organizador Inteligente con OCR</h1>
            </div>
            <div class="user">
                <i class="fas fa-user-circle fa-2x"></i>
            </div>
        </header>
        
        <div class="card">
            <div class="card-header">
                <span>Asistente Virtual</span>
                <i class="fas fa-robot"></i>
            </div>
            <div class="card-body">
                <div class="chat-container">
                    <div class="chat-messages" id="chat-messages">
                        <div class="message bot-message">
                            ¡Hola! Soy tu asistente organizador. Ahora puedo leer texto de imágenes usando OCR.
                            <div class="message-time">10:45 AM</div>
                        </div>
                        <div class="message user-message">
                            ¿Puedes leer texto de imágenes?
                            <div class="message-time">10:46 AM</div>
                        </div>
                        <div class="message bot-message">
                            ¡Sí! Sube una imagen con texto y podré extraerlo automáticamente para incluirlo en tu cronograma.
                            <div class="message-time">10:46 AM</div>
                        </div>
                    </div>
                    
                    <div class="input-area">
                        <input type="text" id="user-input" placeholder="Escribe tu mensaje aquí..." autocomplete="off">
                        <button id="send-button">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <span>Gestión de Documentos</span>
                <i class="fas fa-folder"></i>
            </div>
            <div class="card-body">
                <div class="upload-area" id="drop-zone">
                    <div class="upload-icon">
                        <i class="fas fa-cloud-upload-alt"></i>
                    </div>
                    <p>Arrastra tus documentos aquí o haz clic para seleccionar</p>
                    <p class="file-meta">Formatos soportados: PDF, DOCX, XLSX, PPTX, imágenes (OCR)</p>
                    <input type="file" id="file-input" style="display: none;" multiple accept=".pdf,.docx,.xlsx,.pptx,.txt,.jpg,.jpeg,.png">
                </div>
                
                <div class="progress-bar" id="ocr-progress">
                    <div class="progress" id="ocr-progress-bar"></div>
                </div>
                
                <div class="ocr-result" id="ocr-result">
                    <h4>Texto detectado:</h4>
                    <div id="ocr-text"></div>
                </div>
                
                <div class="file-list" id="file-list">
                    <div class="file-item">
                        <div class="file-icon">
                            <i class="fas fa-file-pdf"></i>
                        </div>
                        <div class="file-info">
                            <div class="file-name">Apuntes Matemáticas.pdf</div>
                            <div class="file-meta">2.4 MB - Subido: 12/05/2023</div>
                        </div>
                        <div class="file-actions">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>
                    </div>
                    <div class="file-item">
                        <div class="file-icon">
                            <i class="fas fa-file-word"></i>
                        </div>
                        <div class="file-info">
                            <div class="file-name">Ensayo Literatura.docx</div>
                            <div class="file-meta">1.1 MB - Subido: 11/05/2023</div>
                        </div>
                        <div class="file-actions">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>
                    </div>
                </div>
                
                <div class="storage-info" id="storage-info">
                    <i class="fas fa-database"></i> El cronograma se guarda en el almacenamiento local de tu navegador
                </div>
                
                <div class="controls">
                    <button class="btn btn-outline" id="clear-files">
                        <i class="fas fa-trash"></i> <span>Limpiar</span>
                    </button>
                    <button class="btn btn-primary" id="generate-schedule">
                        <i class="fas fa-calendar-alt"></i> <span>Generar Cronograma</span>
                    </button>
                </div>
            </div>
        </div>
        
        <div class="card" style="grid-column: 1 / -1;">
            <div class="card-header">
                <span>Cronograma Generado</span>
                <i class="fas fa-calendar-check"></i>
            </div>
            <div class="card-body">
                <div class="schedule-controls">
                    <button class="btn btn-outline" id="save-schedule">
                        <i class="fas fa-save"></i> <span>Guardar Cronograma</span>
                    </button>
                    <button class="btn btn-outline" id="load-schedule">
                        <i class="fas fa-folder-open"></i> <span>Cargar Cronograma</span>
                    </button>
                    <button class="btn btn-outline" id="view-document">
                        <i class="fas fa-eye"></i> <span>Ver Documento</span>
                    </button>
                    <button class="btn btn-outline" id="export-schedule">
                        <i class="fas fa-download"></i> <span>Exportar a PDF</span>
                    </button>
                </div>
                
                <div class="schedule-view" id="schedule-view">
                    <div class="empty-state">
                        <i class="fas fa-calendar-plus"></i>
                        <p>No hay cronograma generado. Haz clic en "Generar Cronograma" para crear uno.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Organizador Inteligente con OCR &copy; 2023 - <a href="https://github.com/Luben2003/organice" target="_blank">Ver en GitHub</a></p>
        </div>
    </div>

    <!-- Modal para visualizar el documento -->
    <div class="modal" id="document-modal">
        <div class="modal-content">
            <span class="close-modal" id="close-modal">&times;</span>
            <div class="document-header">
                <h2 class="document-title" id="document-title">Cronograma de Actividades</h2>
                <p class="document-date" id="document-date"></p>
            </div>
            <div class="document-body" id="document-body">
                <!-- El contenido del documento se insertará aquí -->
            </div>
            <div class="document-actions">
                <button class="btn btn-primary" id="print-document">
                    <i class="fas fa-print"></i> Imprimir
                </button>
                <button class="btn btn-outline" id="close-document">
                    <i class="fas fa-times"></i> Cerrar
                </button>
            </div>
        </div>
    </div>

    <div class="notification" id="notification">
        <i class="fas fa-check-circle"></i> <span id="notification-text"></span>
    </div>

    <!-- Scripts externos -->
    <script src="https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    
    <!-- Nuestros archivos JS -->
    <script src="js/utils.js"></script>
    <script src="js/storage.js"></script>
    <script src="js/chat.js"></script>
    <script src="js/ocr.js"></script>
    <script src="js/schedule.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
📋 Lo que debes hacer:
Reemplaza tu archivo index.html actual con este código limpio

Asegúrate de que tienes todos los archivos CSS en sus carpetas:

css/style.css

css/components/header.css

css/components/card.css

css/components/chat.css

css/components/upload.css

css/components/schedule.css

css/components/modal.css

Asegúrate de que tienes todos los archivos JS en su carpeta:

js/utils.js

js/storage.js

js/chat.js

js/ocr.js

js/schedule.js

js/main.js

🔍 Si tienes errores:
Si al abrir el archivo no funciona algo, revisa:

Que las rutas de los archivos CSS y JS sean correctas

Que todos los archivos existan en las carpetas indicadas

La consola del navegador (F12) para ver errores específicos

¿Necesitas que te ayude con algún archivo en específico? ¿O todo está funcionando bien?




2. Archivo por archivo - Vamos a verificar cada uno:
🎯 EMPECEMOS CON LOS ARCHIVOS CSS:
Archivo: css/style.css
css
/* Variables CSS para consistencia */
:root {
    --primary: #4361ee;
    --secondary: #3a0ca3;
    --accent: #f72585;
    --light: #f8f9fa;
    --dark: #212529;
    --success: #4cc9f0;
    --warning: #f9c74f;
    --danger: #f94144;
    --gray: #6c757d;
    --light-bg: #edf2f4;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background: linear-gradient(135deg, #edf2f4 0%, #e5e5e5 100%);
    color: var(--dark);
    line-height: 1.6;
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.footer {
    grid-column: 1 / -1;
    text-align: center;
    padding: 20px;
    color: var(--gray);
    font-size: 0.9rem;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    background-color: var(--success);
    color: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transform: translateX(100%);
    transition: transform 0.3s ease-out;
    z-index: 1000;
}

.notification.show {
    transform: translateX(0);
}

/* ================== TEMA OSCURO ================== */
body.dark-theme {
    --primary: #6c8dfa;
    --secondary: #5e17eb;
    --light: #2d3748;
    --dark: #e2e8f0;
    --light-bg: #1a202c;
    background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
    color: #e2e8f0;
}

body.dark-theme .card {
    background: #2d3748;
}

body.dark-theme .task {
    background: #2d3748;
    color: #e2e8f0;
}

body.dark-theme input[type="text"] {
    background: #4a5568;
    color: #e2e8f0;
    border-color: #6c8dfa;
}

.theme-toggle {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 1.2rem;
    margin-left: 15px;
}

/* ================== MEJORAS RESPONSIVAS ================== */
@media (max-width: 900px) {
    .container {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 10px;
        gap: 15px;
    }
    
    header {
        padding: 1rem;
        flex-direction: column;
        text-align: center;
        gap: 10px;
    }
    
    .card-header {
        padding: 10px 15px;
        font-size: 1rem;
    }
    
    .btn span {
        display: none;
    }
    
    .btn i {
        margin-right: 0;
    }
}

/* Mejoras de accesibilidad */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Modo alto contraste */
@media (prefers-contrast: high) {
    :root {
        --primary: #000000;
        --secondary: #000000;
        --light: #ffffff;
        --dark: #000000;
    }
    
    .card {
        border: 2px solid #000000;
    }
}
Archivo: css/components/header.css
css
/* ================== ESTILOS HEADER ================== */
header {
    grid-column: 1 / -1;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    padding: 1.5rem;
    border-radius: 15px;
    margin-bottom: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 15px;
}

.logo i {
    font-size: 2.5rem;
}

.logo h1 {
    font-size: 1.8rem;
    font-weight: 700;
}

/* ================== BUSCADOR ================== */
.search-container {
    display: flex;
    gap: 10px;
    margin-left: auto;
}

#global-search {
    padding: 8px 15px;
    border: 1px solid #ced4da;
    border-radius: 20px;
    outline: none;
    width: 200px;
}

#search-btn {
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.search-results {
    padding: 15px;
}

.search-results h4 {
    margin: 15px 0 10px 0;
    color: var(--primary);
}

.search-item {
    padding: 8px;
    background: var(--light-bg);
    margin-bottom: 5px;
    border-radius: 5px;
}
Archivo: css/components/card.css
css
/* ================== ESTILOS TARJETAS ================== */
.card {
    background: white;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.card-header {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    padding: 15px 20px;
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-body {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}
Archivo: css/components/chat.css
css
/* ================== ESTILOS CHAT ================== */
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.chat-messages {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-height: 200px;
}

.message {
    padding: 12px 16px;
    border-radius: 18px;
    max-width: 80%;
    animation: fadeIn 0.3s ease-in;
    position: relative;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.user-message {
    background-color: var(--primary);
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 5px;
}

.bot-message {
    background-color: var(--light-bg);
    color: var(--dark);
    align-self: flex-start;
    border-bottom-left-radius: 5px;
}

.message-time {
    font-size: 0.7rem;
    opacity: 0.7;
    margin-top: 5px;
    text-align: right;
}

.input-area {
    display: flex;
    padding: 15px;
    background-color: #f8f9fa;
    border-top: 1px solid #dee2e6;
    gap: 10px;
}

input[type="text"] {
    flex: 1;
    padding: 12px 15px;
    border: 1px solid #ced4da;
    border-radius: 20px;
    outline: none;
    font-size: 16px;
    transition: border-color 0.3s;
}

input[type="text"]:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
}

button {
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover {
    background-color: var(--secondary);
    transform: rotate(5deg);
}
Archivo: css/components/upload.css
css
/* ================== ESTILOS SUBIDA ================== */
.upload-area {
    border: 2px dashed var(--primary);
    padding: 30px;
    text-align: center;
    border-radius: 10px;
    margin: 15px 0;
    cursor: pointer;
    transition: all 0.3s;
    background-color: rgba(67, 97, 238, 0.05);
}

.upload-area:hover {
    background-color: rgba(67, 97, 238, 0.1);
    border-color: var(--secondary);
}

.upload-icon {
    font-size: 3rem;
    color: var(--primary);
    margin-bottom: 15px;
}

.file-list {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.file-item {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: var(--light-bg);
    border-radius: 8px;
    gap: 10px;
}

.file-icon {
    font-size: 1.5rem;
    color: var(--primary);
}

.file-info {
    flex: 1;
}

.file-name {
    font-weight: 600;
}

.file-meta {
    font-size: 0.8rem;
    color: var(--gray);
}

.storage-info {
    font-size: 0.8rem;
    padding: 10px;
    background-color: var(--light-bg);
    border-radius: 8px;
    margin-top: 15px;
    text-align: center;
}

.progress-bar {
    height: 5px;
    background-color: #e9ecef;
    border-radius: 3px;
    margin-top: 10px;
    overflow: hidden;
    display: none;
}

.progress {
    height: 100%;
    background-color: var(--primary);
    width: 0%;
    transition: width 0.3s;
}

.ocr-result {
    margin-top: 15px;
    padding: 15px;
    background-color: var(--light-bg);
    border-radius: 8px;
    font-size: 0.9rem;
    display: none;
    max-height: 200px;
    overflow-y: auto;
}

.ocr-toggle {
    color: var(--primary);
    cursor: pointer;
    font-size: 0.8rem;
    margin-top: 5px;
    display: inline-block;
}

/* ================== ESTILOS CATEGORÍAS ================== */
.category-section {
    margin-bottom: 20px;
    padding: 15px;
    background-color: var(--light-bg);
    border-radius: 10px;
}

.category-section h4 {
    margin-bottom: 10px;
    color: var(--primary);
}

.category-list {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.category-tag {
    padding: 5px 12px;
    background: white;
    border: 1px solid var(--primary);
    border-radius: 20px;
    color: var(--primary);
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.8rem;
}

.category-tag:hover,
.category-tag.active {
    background: var(--primary);
    color: white;
}
Archivo: css/components/schedule.css
css
/* ================== ESTILOS CRONOGRAMA ================== */
.schedule-view {
    margin-top: 20px;
    flex: 1;
    overflow-y: auto;
}

.task {
    padding: 15px;
    border-left: 4px solid var(--primary);
    background-color: white;
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s;
}

.task:hover {
    transform: translateX(5px);
}

.task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.task-title {
    font-weight: 600;
    color: var(--dark);
}

.task-date {
    font-size: 0.9rem;
    color: var(--primary);
    font-weight: 500;
}

.task-desc {
    font-size: 0.9rem;
    color: var(--gray);
    margin-bottom: 10px;
}

.task-priority {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.priority-high {
    background-color: rgba(249, 65, 68, 0.2);
    color: var(--danger);
}

.priority-medium {
    background-color: rgba(249, 199, 79, 0.2);
    color: #d4a200;
}

.priority-low {
    background-color: rgba(76, 201, 240, 0.2);
    color: var(--success);
}

.empty-state {
    text-align: center;
    padding: 30px;
    color: var(--gray);
}

.empty-state i {
    font-size: 3rem;
    margin-bottom: 15px;
    color: #ced4da;
}

.controls {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    gap: 10px;
}

.btn {
    padding: 12px 15px;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    white-space: nowrap;
    min-width: 120px;
    text-align: center;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
}

.btn-primary:hover {
    opacity: 0.9;
    transform: translateY(-2px);
}

.btn-outline {
    background: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);
}

.btn-outline:hover {
    background-color: var(--primary);
    color: white;
}

.tag {
    display: inline-block;
    background-color: var(--secondary);
    color: white;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    margin-top: 5px;
}

.schedule-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

.schedule-controls .btn {
    flex: 1;
    min-width: 140px;
}

/* ================== ESTILOS PLANTILLAS ================== */
.templates-container {
    margin-bottom: 20px;
    padding: 15px;
    background-color: var(--light-bg);
    border-radius: 10px;
}

.templates-container h4 {
    margin-bottom: 10px;
    color: var(--primary);
}

.template-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.btn-template {
    padding: 8px 15px;
    background: white;
    border: 1px solid var(--primary);
    border-radius: 20px;
    color: var(--primary);
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.9rem;
}

.btn-template:hover {
    background: var(--primary);
    color: white;
}
Archivo: css/components/modal.css
css
/* ================== ESTILOS MODAL ================== */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2000;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    border-radius: 15px;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow: auto;
    padding: 20px;
    position: relative;
}

.close-modal {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--gray);
}

.close-modal:hover {
    color: var(--dark);
}

.document-header {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid var(--primary);
}

.document-title {
    color: var(--primary);
    margin-bottom: 10px;
}

.document-date {
    color: var(--gray);
    font-size: 0.9rem;
}

.document-task {
    margin-bottom: 15px;
    padding: 15px;
    border-left: 4px solid var(--primary);
    background-color: var(--light-bg);
    border-radius: 8px;
}

.document-task-high {
    border-left-color: var(--danger);
}

.document-task-medium {
    border-left-color: var(--warning);
}

.document-task-low {
    border-left-color: var(--success);
}

.document-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 25px;
}
🚀 AHORA VAMOS CON LOS ARCHIVOS JAVASCRIPT:
¿Tienes todos estos archivos en la carpeta js/? ¿O necesitas que te proporcione alguno en específico?

okok
🔍 Verificación de Archivos JavaScript
¡Perfecto! Ahora vamos con los archivos JavaScript. Te voy a proporcionar cada uno para que verifiques que los tengas correctamente:

📁 Archivos JavaScript:
Archivo: js/utils.js
javascript
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
Archivo: js/storage.js
javascript
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
Archivo: js/chat.js
javascript
// ================== FUNCIONALIDAD CHAT ==================

// Función para procesar el input del usuario
function processUserInput() {
    const userInput = document.getElementById('user-input');
    if (!userInput) return;
    
    const message = userInput.value.trim();
    if (message === '') return;
    
    addMessage(message, true);
    userInput.value = '';
    
    // Respuestas del bot según las palabras clave
    setTimeout(() => {
        let response = '';
        
        if (message.toLowerCase().includes('documento') || message.toLowerCase().includes('archivo')) {
            response = 'Puedes subir tus documentos arrastrándolos al área indicada o haciendo clic en ella. Los organizaré por tipo y fecha.';
        } else if (message.toLowerCase().includes('cronograma') || message.toLowerCase().includes('plan')) {
            response = 'Puedo generarte un cronograma basado en tus documentos. Haz clic en el botón "Generar Cronograma" para comenzar.';
        } else if (message.toLowerCase().includes('hola') || message.toLowerCase().includes('buenos días')) {
            response = '¡Hola! ¿En qué puedo ayudarte hoy?';
        } else if (message.toLowerCase().includes('organizar') || message.toLowerCase().includes('clasificar')) {
            response = 'Puedo organizar tus documentos por tipo, fecha o prioridad. Solo sube los archivos y yo me encargo del resto.';
        } else if (message.toLowerCase().includes('guardar')) {
            response = 'Tu cronograma se guarda automáticamente en el almacenamiento local de tu navegador. También puedes usar el botón "Guardar Cronograma" para forzar el guardado.';
        } else if (message.toLowerCase().includes('imagen') || message.toLowerCase().includes('ocr') || message.toLowerCase().includes('texto')) {
            response = 'Puedo extraer texto de imágenes usando tecnología OCR. Solo sube una imagen con texto y la procesaré automáticamente.';
        } else if (message.toLowerCase().includes('ver documento') || message.toLowerCase().includes('documento')) {
            response = 'Puedes ver tu cronograma en formato de documento haciendo clic en el botón "Ver Documento".';
        } else {
            response = 'Entendido. ¿Necesitas ayuda para organizar documentos o generar un cronograma?';
        }
        
        addMessage(response, false);
    }, 1000);
}
Archivo: js/ocr.js
javascript
// ================== FUNCIONALIDAD OCR ==================

function handleFileUpload(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Verificar el tipo de archivo
        const fileType = file.type;
        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain',
            'image/jpeg',
            'image/png'
        ];
        
        if (!allowedTypes.includes(fileType)) {
            showNotification(`Tipo de archivo no compatible: ${file.name}`, false);
            continue;
        }
        
        documents.push({
            name: file.name,
            type: file.type,
            size: file.size,
            uploadDate: new Date()
        });
        
        addMessage(`Documento "${file.name}" subido correctamente.`, false);
        addFileToList(file);
        
        // Si es una imagen, procesar con OCR
        if (fileType.includes('image')) {
            processImageWithOCR(file);
        }
    }
    
    saveToLocalStorage();
}

function processImageWithOCR(file) {
    showNotification(`Procesando imagen con OCR: ${file.name}`);
    
    // Mostrar barra de progreso
    const ocrProgress = document.getElementById('ocr-progress');
    const ocrProgressBar = document.getElementById('ocr-progress-bar');
    
    if (ocrProgress && ocrProgressBar) {
        ocrProgress.style.display = 'block';
        ocrProgressBar.style.width = '0%';
    }
    
    // Usar Tesseract.js para OCR
    Tesseract.recognize(
        file,
        'spa+eng', // Idiomas: español e inglés
        { 
            logger: progress => {
                if (progress.status === 'recognizing text') {
                    // Actualizar barra de progreso
                    const p = Math.round(progress.progress * 100);
                    if (ocrProgressBar) {
                        ocrProgressBar.style.width = `${p}%`;
                    }
                }
            }
        }
    ).then(result => {
        // Ocultar barra de progreso
        setTimeout(() => {
            if (ocrProgress) {
                ocrProgress.style.display = 'none';
            }
        }, 500);
        
        // Guardar texto extraído
        const text = result.data.text;
        extractedTexts[file.name] = text;
        
        // Mostrar resultado
        const ocrText = document.getElementById('ocr-text');
        const ocrResult = document.getElementById('ocr-result');
        
        if (ocrText && ocrResult) {
            ocrText.textContent = text || 'No se detectó texto en la imagen';
            ocrResult.style.display = 'block';
        }
        
        // Añadir mensaje al chat
        addMessage(`He procesado la imagen "${file.name}" y extraído texto con OCR.`, false);
        
        showNotification('OCR completado correctamente');
        saveToLocalStorage();
    }).catch(err => {
        if (ocrProgress) {
            ocrProgress.style.display = 'none';
        }
        console.error('Error en OCR:', err);
        showNotification('Error al procesar la imagen con OCR', false);
    });
}

function addFileToList(file) {
    const fileList = document.getElementById('file-list');
    if (!fileList) return;
    
    // Determinar el icono según el tipo de archivo
    let fileIcon = 'fa-file';
    if (file.type.includes('pdf')) fileIcon = 'fa-file-pdf';
    else if (file.type.includes('word')) fileIcon = 'fa-file-word';
    else if (file.type.includes('excel') || file.type.includes('sheet')) fileIcon = 'fa-file-excel';
    else if (file.type.includes('powerpoint') || file.type.includes('presentation')) fileIcon = 'fa-file-powerpoint';
    else if (file.type.includes('image')) fileIcon = 'fa-file-image';
    else if (file.type.includes('text')) fileIcon = 'fa-file-alt';
    
    const fileItem = document.createElement('div');
    fileItem.classList.add('file-item');
    
    // Si es una imagen con texto extraído, añadir indicador
    const hasOCR = extractedTexts[file.name] ? '<span class="tag">OCR</span>' : '';
    
    fileItem.innerHTML = `
        <div class="file-icon">
            <i class="fas ${fileIcon}"></i>
        </div>
        <div class="file-info">
            <div class="file-name">${file.name} ${hasOCR}</div>
            <div class="file-meta">${formatFileSize(file.size)} - Subido: ${new Date().toLocaleDateString()}</div>
            ${extractedTexts[file.name] ? '<div class="ocr-toggle" onclick="toggleOCRResult(\'' + file.name + '\')">Ver texto extraído</div>' : ''}
        </div>
        <div class="file-actions">
            <i class="fas fa-ellipsis-v"></i>
        </div>
    `;
    
    fileList.appendChild(fileItem);
}

function updateFileList(filteredDocs = null) {
    const fileList = document.getElementById('file-list');
    if (!fileList) return;
    
    fileList.innerHTML = '';
    
    const docsToShow = filteredDocs || documents;
    
    docsToShow.forEach(doc => {
        let fileIcon = 'fa-file';
        if (doc.type.includes('pdf')) fileIcon = 'fa-file-pdf';
        else if (doc.type.includes('word')) fileIcon = 'fa-file-word';
        else if (doc.type.includes('excel') || doc.type.includes('sheet')) fileIcon = 'fa-file-excel';
        else if (doc.type.includes('powerpoint') || doc.type.includes('presentation')) fileIcon = 'fa-file-powerpoint';
        else if (doc.type.includes('image')) fileIcon = 'fa-file-image';
        else if (doc.type.includes('text')) fileIcon = 'fa-file-alt';
        
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-item');
        
        // Si es una imagen con texto extraído, añadir indicador
        const hasOCR = extractedTexts[doc.name] ? '<span class="tag">OCR</span>' : '';
        
        fileItem.innerHTML = `
            <div class="file-icon">
                <i class="fas ${fileIcon}"></i>
            </div>
            <div class="file-info">
                <div class="file-name">${doc.name} ${hasOCR}</div>
                <div class="file-meta">${formatFileSize(doc.size)} - Subido: ${new Date(doc.uploadDate).toLocaleDateString()}</div>
                ${extractedTexts[doc.name] ? '<div class="ocr-toggle" onclick="toggleOCRResult(\'' + doc.name + '\')">Ver texto extraído</div>' : ''}
            </div>
            <div class="file-actions">
                <i class="fas fa-ellipsis-v"></i>
            </div>
        `;
        
        fileList.appendChild(fileItem);
    });
}
Archivo: js/schedule.js
javascript
// ================== FUNCIONALIDAD CRONOGRAMA ==================

// Plantillas de cronograma
const scheduleTemplates = {
    estudiantil: [
        { title: "Revisar apuntes de clase", daysOffset: 0, priority: "priority-high" },
        { title: "Realizar ejercicios prácticos", daysOffset: 1, priority: "priority-medium" },
        { title: "Preparar resumen", daysOffset: 3, priority: "priority-low" },
        { title: "Repasar antes del examen", daysOffset: 6, priority: "priority-high" }
    ],
    laboral: [
        { title: "Revisar correos importantes", daysOffset: 0, priority: "priority-high" },
        { title: "Elaborar informe de avance", daysOffset: 2, priority: "priority-medium" },
        { title: "Preparar reunión de equipo", daysOffset: 4, priority: "priority-high" },
        { title: "Planificar semana siguiente", daysOffset: 5, priority: "priority-medium" }
    ],
    proyecto: [
        { title: "Definir objetivos del proyecto", daysOffset: 0, priority: "priority-high" },
        { title: "Investigar y recopilar información", daysOffset: 1, priority: "priority-medium" },
        { title: "Crear plan de trabajo", daysOffset: 2, priority: "priority-high" },
        { title: "Ejecutar primera fase", daysOffset: 3, priority: "priority-medium" },
        { title: "Revisar y ajustar", daysOffset: 7, priority: "priority-high" }
    ]
};

function generateSchedule() {
    if (documents.length === 0) {
        addMessage('Primero necesitas subir algunos documentos para generar un cronograma.', false);
        showNotification('Sube documentos primero para generar un cronograma', false);
        return;
    }
    
    // Limpiar el cronograma existente
    schedule = [];
    
    // Generar tareas basadas en los documentos
    documents.forEach((doc, index) => {
        const daysToAdd = index % 4; // Distribuir las tareas en varios días
        const taskDate = new Date();
        taskDate.setDate(taskDate.getDate() + daysToAdd);
        
        const priorities = ['priority-high', 'priority-medium', 'priority-low'];
        const priorityLabels = ['Alta prioridad', 'Media prioridad', 'Baja prioridad'];
        const priorityIndex = index % 3;
        
        // Diferentes tipos de tareas según el tipo de documento
        let taskTitle = '';
        let taskDescription = '';
        
        if (doc.type.includes('pdf') || doc.type.includes('text')) {
            taskTitle = `Estudiar ${doc.name}`;
            taskDescription = `Leer y analizar el documento ${doc.name}. Tomar notas importantes.`;
        } else if (doc.type.includes('word')) {
            taskTitle = `Redactar ${doc.name}`;
            taskDescription = `Completar la redacción del documento ${doc.name}. Revisar ortografía y gramática.`;
        } else if (doc.type.includes('excel') || doc.type.includes('sheet')) {
            taskTitle = `Analizar datos en ${doc.name}`;
            taskDescription = `Revisar y analizar los datos en la hoja de cálculo ${doc.name}. Crear gráficos si es necesario.`;
        } else if (doc.type.includes('powerpoint') || doc.type.includes('presentation')) {
            taskTitle = `Preparar presentación ${doc.name}`;
            taskDescription = `Revisar y practicar la presentación ${doc.name}. Preparar notas para la exposición.`;
        } else if (doc.type.includes('image') && extractedTexts[doc.name]) {
            // Si es una imagen con texto extraído, usar ese texto
            const text = extractedTexts[doc.name];
            const shortText = text.length > 100 ? text.substring(0, 100) + '...' : text;
            taskTitle = `Revisar contenido de ${doc.name}`;
            taskDescription = `Revisar el contenido detectado en la imagen: "${shortText}"`;
        } else {
            taskTitle = `Revisar ${doc.name}`;
            taskDescription = `Revisar y procesar el documento ${doc.name}.`;
        }
        
        schedule.push({
            id: index + 1,
            title: taskTitle,
            description: taskDescription,
            date: taskDate,
            priority: priorities[priorityIndex],
            priorityLabel: priorityLabels[priorityIndex],
            completed: false
        });
    });
    
    // Ordenar por fecha
    schedule.sort((a, b) => a.date - b.date);
    
    updateScheduleView();
    saveToLocalStorage();
    
    addMessage('He generado un cronograma basado en tus documentos. Puedes verlo en la sección de abajo.', false);
    showNotification('Cronograma generado correctamente');
}

function updateScheduleView(filteredSchedule = null) {
    const scheduleView = document.getElementById('schedule-view');
    if (!scheduleView) return;
    
    scheduleView.innerHTML = '';
    
    const scheduleToShow = filteredSchedule || schedule;
    
    if (scheduleToShow.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.classList.add('empty-state');
        emptyState.innerHTML = `
            <i class="fas fa-calendar-plus"></i>
            <p>No hay cronograma generado. Haz clic en "Generar Cronograma" para crear uno.</p>
        `;
        scheduleView.appendChild(emptyState);
        return;
    }
    
    scheduleToShow.forEach(task => {
        const taskDate = new Date(task.date);
        
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <div class="task-header">
                <div class="task-title">${task.title}</div>
                <div class="task-date">${taskDate.toLocaleDateString()}</div>
            </div>
            <div class="task-desc">${task.description}</div>
            <span class="task-priority ${task.priority}">${task.priorityLabel}</span>
        `;
        
        scheduleView.appendChild(taskElement);
    });
}

function viewDocument() {
    if (schedule.length === 0) {
        showNotification('No hay cronograma para mostrar. Genera uno primero.', false);
        return;
    }
    
    // Actualizar fecha del documento
    const documentDate = document.getElementById('document-date');
    if (documentDate) {
        documentDate.textContent = `Generado el: ${new Date().toLocaleDateString()}`;
    }
    
    // Limpiar contenido anterior
    const documentBody = document.getElementById('document-body');
    if (documentBody) {
        documentBody.innerHTML = '';
    }
    
    // Agregar tareas al documento
    schedule.forEach(task => {
        const taskDate = new Date(task.date);
        const taskElement = document.createElement('div');
        taskElement.classList.add('document-task');
        taskElement.classList.add(`document-task-${task.priority.split('-')[1]}`);
        
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p><strong>Fecha:</strong> ${taskDate.toLocaleDateString()}</p>
            <p><strong>Descripción:</strong> ${task.description}</p>
            <p><strong>Prioridad:</strong> ${task.priorityLabel}</p>
        `;
        
        if (documentBody) {
            documentBody.appendChild(taskElement);
        }
    });
    
    // Mostrar modal
    const documentModal = document.getElementById('document-modal');
    if (documentModal) {
        documentModal.style.display = 'flex';
    }
}

function exportToPDF() {
    if (schedule.length === 0) {
        showNotification('No hay cronograma para exportar. Genera uno primero.', false);
        return;
    }
    
    // Crear un nuevo documento PDF
    const doc = new jsPDF();
    
    // Agregar título
    doc.setFontSize(20);
    doc.setTextColor(67, 97, 238);
    doc.text('Cronograma de Actividades', 105, 20, { align: 'center' });
    
    // Agregar fecha
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
    
    // Agregar contenido
    let y = 50;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    schedule.forEach((task, index) => {
        const taskDate = new Date(task.date);
        
        // Comprobar si necesitamos una nueva página
        if (y > 250) {
            doc.addPage();
            y = 20;
        }
        
        // Agregar número de tarea
        doc.setFontSize(14);
        doc.setTextColor(67, 97, 238);
        doc.text(`${index + 1}. ${task.title}`, 20, y);
        
        // Agregar detalles de la tarea
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Fecha: ${taskDate.toLocaleDateString()}`, 20, y + 7);
        doc.text(`Prioridad: ${task.priorityLabel}`, 20, y + 14);
        
        // Agregar descripción (puede ser multilínea)
        const descriptionLines = doc.splitTextToSize(`Descripción: ${task.description}`, 170);
        doc.text(descriptionLines, 20, y + 21);
        
        // Calcular la nueva posición Y
        y += 21 + (descriptionLines.length * 7) + 10;
        
        // Agregar línea separadora
        doc.setDrawColor(200, 200, 200);
        doc.line(20, y - 5, 190, y - 5);
    });
    
    // Guardar el PDF
    doc.save('cronograma.pdf');
    showNotification('PDF exportado correctamente');
}

// ================== PLANTILLAS PREDEFINIDAS ==================
function initTemplates() {
    const templatesContainer = document.createElement('div');
    templatesContainer.classList.add('templates-container');
    templatesContainer.innerHTML = `
        <h4>Plantillas de Cronograma</h4>
        <div class="template-buttons">
            <button class="btn-template" data-template="estudiantil">Estudiantil</button>
            <button class="btn-template" data-template="laboral">Laboral</button>
            <button class="btn-template" data-template="proyecto">Proyecto</button>
        </div>
    `;
    
    // Insertar antes de los controles del cronograma
    const scheduleControls = document.querySelector('.schedule-controls');
    if (scheduleControls) {
        scheduleControls.parentNode.insertBefore(templatesContainer, scheduleControls);
    }
    
    // Event listeners para plantillas
    document.querySelectorAll('.btn-template').forEach(btn => {
        btn.addEventListener('click', () => {
            applyTemplate(btn.dataset.template);
        });
    });
}

function applyTemplate(templateName) {
    const template = scheduleTemplates[templateName];
    if (!template) return;
    
    schedule = template.map((item, index) => {
        const taskDate = new Date();
        taskDate.setDate(taskDate.getDate() + item.daysOffset);
        
        return {
            id: index + 1,
            title: item.title,
            description: `Tarea generada desde la plantilla "${templateName}"`,
            date: taskDate,
            priority: item.priority,
            priorityLabel: item.priority.replace('priority-', '').charAt(0).toUpperCase() + 
                          item.priority.replace('priority-', '').slice(1) + " prioridad",
            completed: false,
            fromTemplate: templateName
        };
    });
    
    updateScheduleView();
    saveToLocalStorage();
    showNotification(`Plantilla "${templateName}" aplicada correctamente`);
}
Archivo: js/main.js
javascript
// ================== PUNTO DE ENTRADA PRINCIPAL ==================

// Configuración de jsPDF
const { jsPDF } = window.jspdf;

// Variables globales
let documents = [];
let schedule = [];
let extractedTexts = {};

// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const generateScheduleBtn = document.getElementById('generate-schedule');
    const scheduleView = document.getElementById('schedule-view');
    const clearFilesBtn = document.getElementById('clear-files');
    const saveScheduleBtn = document.getElementById('save-schedule');
    const loadScheduleBtn = document.getElementById('load-schedule');
    const exportScheduleBtn = document.getElementById('export-schedule');
    const viewDocumentBtn = document.getElementById('view-document');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    const ocrProgress = document.getElementById('ocr-progress');
    const ocrProgressBar = document.getElementById('ocr-progress-bar');
    const ocrResult = document.getElementById('ocr-result');
    const ocrText = document.getElementById('ocr-text');
    const documentModal = document.getElementById('document-modal');
    const closeModal = document.getElementById('close-modal');
    const closeDocument = document.getElementById('close-document');
    const printDocument = document.getElementById('print-document');
    const documentTitle = document.getElementById('document-title');
    const documentDate = document.getElementById('document-date');
    const documentBody = document.getElementById('document-body');
    
    // Cargar datos guardados al iniciar
    loadFromLocalStorage();
    
    // Event listeners para el chat
    if (sendButton && userInput) {
        sendButton.addEventListener('click', processUserInput);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                processUserInput();
            }
        });
    }
    
    // Manejo de subida de archivos
    if (dropZone && fileInput) {
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', handleFileUpload);
        
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.backgroundColor = 'rgba(67, 97, 238, 0.15)';
        });
        
        dropZone.addEventListener('dragleave', () => {
            dropZone.style.backgroundColor = 'rgba(67, 97, 238, 0.05)';
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.backgroundColor = 'rgba(67, 97, 238, 0.05)';
            
            const files = e.dataTransfer.files;
            handleFiles(files);
        });
    }
    
    // Event listeners para botones
    if (generateScheduleBtn) generateScheduleBtn.addEventListener('click', generateSchedule);
    if (clearFilesBtn) clearFilesBtn.addEventListener('click', clearFiles);
    if (saveScheduleBtn) saveScheduleBtn.addEventListener('click', saveToLocalStorage);
    if (loadScheduleBtn) loadScheduleBtn.addEventListener('click', loadFromLocalStorage);
    if (viewDocumentBtn) viewDocumentBtn.addEventListener('click', viewDocument);
    if (exportScheduleBtn) exportScheduleBtn.addEventListener('click', exportToPDF);
    
    // Event listeners para el modal
    if (closeModal) closeModal.addEventListener('click', () => {
        if (documentModal) documentModal.style.display = 'none';
    });
    
    if (closeDocument) closeDocument.addEventListener('click', () => {
        if (documentModal) documentModal.style.display = 'none';
    });
    
    if (printDocument) printDocument.addEventListener('click', () => {
        window.print();
    });
    
    if (documentModal) {
        documentModal.addEventListener('click', (e) => {
            if (e.target === documentModal) {
                documentModal.style.display = 'none';
            }
        });
    }
    
    // Inicializar nuevas funcionalidades
    initThemeSwitcher();
    initSearchFunctionality();
    initTemplates();
    initCategorySystem();
    initOCREditor();
    
    // Limpiar datos antiguos al cargar
    setTimeout(cleanupOldData, 2000);
    
    // Añadir algunos mensajes iniciales al chat
    setTimeout(() => {
        addMessage("Ahora puedo extraer texto de imágenes usando tecnología OCR. Sube una imagen con texto y podré leerlo automáticamente.", false);
    }, 1500);
    
    // Inicializar la vista
    updateScheduleView();
});

// Función para limpiar archivos
function clearFiles() {
    documents = [];
    extractedTexts = {};
    updateFileList();
    
    const ocrResult = document.getElementById('ocr-result');
    if (ocrResult) {
        ocrResult.style.display = 'none';
    }
    
    saveToLocalStorage();
    showNotification('Archivos eliminados correctamente');
}