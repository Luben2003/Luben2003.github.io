// ================== FUNCIONALIDAD CRONOGRAMA ==================
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
    documentDate.textContent = `Generado el: ${new Date().toLocaleDateString()}`;
    
    // Limpiar contenido anterior
    documentBody.innerHTML = '';
    
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
        
        documentBody.appendChild(taskElement);
    });
    
    // Mostrar modal
    documentModal.style.display = 'flex';
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