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