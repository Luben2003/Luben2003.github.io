  // ================== PROCESADOR AVANZADO CON IA ==================
class AIProcessor {
    constructor() {
        this.models = new Map();
        this.isInitialized = false;
        this.endpoints = {
            categorization: 'https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base',
            summarization: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
            ner: 'https://api-inference.huggingface.co/models/dbmdz/bert-large-cased-finetuned-conll03-english',
            translation: 'https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-es-en'
        };
    }

    async initialize(apiKey) {
        this.apiKey = apiKey;
        
        try {
            // Verificar conectividad con los endpoints
            await this.healthCheck();
            this.isInitialized = true;
            console.log('Sistema de IA inicializado correctamente');
            return true;
        } catch (error) {
            console.error('Error inicializando IA:', error);
            this.isInitialized = false;
            return false;
        }
    }

    async healthCheck() {
        // Verificar que los servicios de IA estén disponibles
        for (const [name, endpoint] of Object.entries(this.endpoints)) {
            try {
                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                });
                
                if (!response.ok) {
                    console.warn(`Servicio ${name} no disponible: ${response.status}`);
                }
            } catch (error) {
                console.warn(`Error conectando con servicio ${name}:`, error);
            }
        }
    }

    async analyzeDocument(text, filename) {
        if (!this.isInitialized) {
            throw new Error('Sistema de IA no inicializado');
        }

        const results = {
            categories: [],
            entities: [],
            summary: '',
            sentiment: null,
            keywords: [],
            metadata: {
                language: 'es',
                wordCount: text.split(/\s+/).length,
                readingTime: Math.ceil(text.split(/\s+/).length / 200) // 200 palabras por minuto
            }
        };

        try {
            // Ejecutar análisis en paralelo
            const analysisPromises = [
                this.detectCategories(text),
                this.extractEntities(text),
                this.generateSummary(text),
                this.analyzeSentiment(text),
                this.extractKeywords(text)
            ];

            const [
                categories, 
                entities, 
                summary, 
                sentiment, 
                keywords
            ] = await Promise.allSettled(analysisPromises);

            if (categories.status === 'fulfilled') results.categories = categories.value;
            if (entities.status === 'fulfilled') results.entities = entities.value;
            if (summary.status === 'fulfilled') results.summary = summary.value;
            if (sentiment.status === 'fulfilled') results.sentiment = sentiment.value;
            if (keywords.status === 'fulfilled') results.keywords = keywords.value;

            // Detectar idioma
            results.metadata.language = this.detectLanguage(text);

            return results;
        } catch (error) {
            console.error('Error en análisis de documento:', error);
            throw error;
        }
    }

    async detectCategories(text) {
        try {
            // Implementación local como fallback
            const localCategories = this.localCategoryDetection(text);
            
            // Si tenemos API key, usar el servicio de Hugging Face
            if (this.apiKey) {
                try {
                    const response = await fetch(this.endpoints.categorization, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${this.apiKey}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ inputs: text })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        return this.processCategoryResponse(data);
                    }
                } catch (apiError) {
                    console.warn('Error usando API de categorización, usando fallback local:', apiError);
                }
            }

            return localCategories;
        } catch (error) {
            console.error('Error detectando categorías:', error);
            return this.localCategoryDetection(text);
        }
    }

    localCategoryDetection(text) {
        const lowerText = text.toLowerCase();
        const categories = [];

        // Detección basada en palabras clave
        const keywordCategories = {
            'trabajo': ['reunión', 'proyecto', 'empresa', 'cliente', 'jefe', 'equipo', 'oficina'],
            'estudio': ['examen', 'tarea', 'universidad', 'profesor', 'apuntes', 'estudiar', 'curso'],
            'personal': ['familia', 'amigos', 'vacaciones', 'cumpleaños', 'cena', 'fiesta', 'hobby'],
            'salud': ['doctor', 'médico', 'hospital', 'enfermedad', 'cita', 'salud', 'ejercicio'],
            'finanzas': ['banco', 'dinero', 'pago', 'factura', 'impuestos', 'inversión', 'ahorro']
        };

        for (const [category, keywords] of Object.entries(keywordCategories)) {
            if (keywords.some(keyword => lowerText.includes(keyword))) {
                categories.push(category);
            }
        }

        // Si no se detectaron categorías, usar una por defecto
        if (categories.length === 0) {
            categories.push('otros');
        }

        return categories;
    }

    processCategoryResponse(apiData) {
        if (!apiData || !Array.isArray(apiData) || apiData.length === 0) {
            return ['otros'];
        }

        // Procesar respuesta de la API de Hugging Face
        const emotions = apiData[0];
        const categories = [];

        // Mapear emociones a categorías
        const emotionToCategory = {
            'anger': 'importante',
            'disgust': 'importante',
            'fear': 'importante',
            'joy': 'personal',
            'neutral': 'otros',
            'sadness': 'importante',
            'surprise': 'importante'
        };

        for (const emotion of emotions) {
            if (emotion.score > 0.3) { // Umbral de confianza
                const category = emotionToCategory[emotion.label] || 'otros';
                if (!categories.includes(category)) {
                    categories.push(category);
                }
            }
        }

        return categories.length > 0 ? categories : ['otros'];
    }

    async extractEntities(text) {
        try {
            // Implementación local como fallback
            const localEntities = this.localEntityExtraction(text);
            
            if (this.apiKey) {
                try {
                    const response = await fetch(this.endpoints.ner, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${this.apiKey}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ inputs: text })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        return this.processEntityResponse(data);
                    }
                } catch (apiError) {
                    console.warn('Error usando API de NER, usando fallback local:', apiError);
                }
            }

            return localEntities;
        } catch (error) {
            console.error('Error extrayendo entidades:', error);
            return this.localEntityExtraction(text);
        }
    }

    localEntityExtraction(text) {
        const entities = [];
        
        // Expresiones regulares para detectar tipos comunes de entidades
        const patterns = {
            'PERSON': /\b([A-Z][a-z]+ [A-Z][a-z]+)\b/g,
            'DATE': /\b(\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{1,2} (de )?(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre))\b/gi,
            'ORG': /\b([A-Z][a-z]+ (S\.A\.|S\.L\.|Inc|Ltd|Corp)|Universidad [A-Z][a-z]+|Gobierno [A-Z][a-z]+)\b/g,
            'LOCATION': /\b([A-Z][a-z]+( (City|Pueblo|Provincia|Estado|País))?)\b/g,
            'EMAIL': /\b[\w\.-]+@[\w\.-]+\.\w+\b/g,
            'PHONE': /\b(\+?\d{1,3}[-.\s]?)?\(?\d{2,3}\)?[-.\s]?\d{2,4}[-.\s]?\d{2,4}\b/g
        };

        for (const [type, pattern] of Object.entries(patterns)) {
            let match;
            while ((match = pattern.exec(text)) !== null) {
                entities.push({
                    text: match[0],
                    type: type,
                    start: match.index,
                    end: match.index + match[0].length
                });
            }
        }

        return entities;
    }

    processEntityResponse(apiData) {
        if (!apiData || !Array.isArray(apiData) || apiData.length === 0) {
            return [];
        }

        const entities = [];
        const entityGroups = apiData[0];

        for (const entity of entityGroups) {
            if (entity.score > 0.8) { // Alto umbral de confianza
                entities.push({
                    text: entity.word,
                    type: entity.entity_group,
                    score: entity.score,
                    start: entity.start,
                    end: entity.end
                });
            }
        }

        return entities;
    }

    async generateSummary(text, maxSentences = 3) {
        try {
            // Si el texto es corto, no necesita resumen
            if (text.split(/\s+/).length < 50) {
                return text;
            }

            if (this.apiKey) {
                try {
                    const response = await fetch(this.endpoints.summarization, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${this.apiKey}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            inputs: text,
                            parameters: {
                                max_length: 150,
                                min_length: 30,
                                do_sample: false
                            }
                        })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data && data[0] && data[0].summary_text) {
                            return data[0].summary_text;
                        }
                    }
                } catch (apiError) {
                    console.warn('Error usando API de resumen, usando fallback local:', apiError);
                }
            }

            // Fallback: algoritmo de resumen simple basado en frases clave
            return this.localTextSummary(text, maxSentences);
        } catch (error) {
            console.error('Error generando resumen:', error);
            return this.localTextSummary(text, maxSentences);
        }
    }

    localTextSummary(text, maxSentences) {
        // Algoritmo simple de extracción de frases clave
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        
        if (sentences.length <= maxSentences) {
            return text;
        }

        // Seleccionar las primeras y últimas frases (often contain main ideas)
        const importantSentences = [
            ...sentences.slice(0, Math.floor(maxSentences/2)),
            ...sentences.slice(-Math.ceil(maxSentences/2))
        ];

        return importantSentences.join('. ') + '.';
    }

    async analyzeSentiment(text) {
        try {
            // Análisis de sentimiento local básico
            const localSentiment = this.localSentimentAnalysis(text);
            
            // Podríamos implementar una llamada a API aquí si tuviéramos un endpoint
            return localSentiment;
        } catch (error) {
            console.error('Error analizando sentimiento:', error);
            return this.localSentimentAnalysis(text);
        }
    }

    localSentimentAnalysis(text) {
        const lowerText = text.toLowerCase();
        
        // Palabras positivas y negativas (lista básica en español)
        const positiveWords = ['bueno', 'excelente', 'genial', 'fantástico', 'maravilloso', 'perfecto', 'feliz', 'contento', 'alegre', 'éxito'];
        const negativeWords = ['malo', 'terrible', 'horrible', 'pésimo', 'triste', 'enojado', 'molesto', 'frustrado', 'problema', 'error', 'fracaso'];
        
        let positiveCount = 0;
        let negativeCount = 0;
        
        for (const word of positiveWords) {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = lowerText.match(regex);
            if (matches) positiveCount += matches.length;
        }
        
        for (const word of negativeWords) {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = lowerText.match(regex);
            if (matches) negativeCount += matches.length;
        }
        
        if (positiveCount > negativeCount) return 'positive';
        if (negativeCount > positiveCount) return 'negative';
        return 'neutral';
    }

    async extractKeywords(text, maxKeywords = 10) {
        try {
            // Algoritmo simple de extracción de palabras clave
            return this.localKeywordExtraction(text, maxKeywords);
        } catch (error) {
            console.error('Error extrayendo palabras clave:', error);
            return this.localKeywordExtraction(text, maxKeywords);
        }
    }

    localKeywordExtraction(text, maxKeywords) {
        // Eliminar stopwords y palabras comunes
        const stopwords = ['de', 'la', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se', 'las', 'por', 'un', 'para', 'con', 'no', 'una', 'su', 'al', 'lo', 'como', 'más', 'pero', 'sus', 'le', 'ya', 'o', 'este', 'sí', 'porque', 'esta', 'entre', 'cuando', 'muy', 'sin', 'sobre', 'también', 'me', 'hasta', 'hay', 'donde', 'quien', 'desde', 'todo', 'nos', 'durante', 'todos', 'uno', 'les', 'ni', 'contra', 'otros', 'ese', 'eso', 'ante', 'ellos', 'e', 'esto', 'mí', 'antes', 'algunos', 'qué', 'unos', 'yo', 'otro', 'otras', 'otra', 'él', 'tanto', 'esa', 'estos', 'mucho', 'quienes', 'nada', 'muchos', 'cual', 'poco', 'ella', 'estar', 'estas', 'algunas', 'algo', 'nosotros', 'mi', 'mis', 'tú', 'te', 'ti', 'tu', 'tus', 'ellas', 'nosotras', 'vosotros', 'vosotras', 'os', 'mío', 'mía', 'míos', 'mías', 'tuyo', 'tuya', 'tuyos', 'tuyas', 'suyo', 'suya', 'suyos', 'suyas', 'nuestro', 'nuestra', 'nuestros', 'nuestras', 'vuestro', 'vuestra', 'vuestros', 'vuestras', 'esos', 'esas', 'estoy', 'estás', 'está', 'estamos', 'estáis', 'están', 'esté', 'estés', 'estemos', 'estéis', 'estén', 'estaré', 'estarás', 'estará', 'estaremos', 'estaréis', 'estarán', 'estaría', 'estarías', 'estaríamos', 'estaríais', 'estarían', 'estaba', 'estabas', 'estábamos', 'estabais', 'estaban', 'estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron', 'estuviera', 'estuvieras', 'estuviéramos', 'estuvierais', 'estuvieran', 'estuviese', 'estuvieses', 'estuviésemos', 'estuvieseis', 'estuviesen', 'estando', 'estado', 'estada', 'estados', 'estadas', 'estad', 'he', 'has', 'ha', 'hemos', 'habéis', 'han', 'haya', 'hayas', 'hayamos', 'hayáis', 'hayan', 'habré', 'habrás', 'habrá', 'habremos', 'habréis', 'habrán', 'habría', 'habrías', 'habríamos', 'habríais', 'habrían', 'había', 'habías', 'habíamos', 'habíais', 'habían', 'hube', 'hubiste', 'hubo', 'hubimos', 'hubisteis', 'hubieron', 'hubiera', 'hubieras', 'hubiéramos', 'hubierais', 'hubieran', 'hubiese', 'hubieses', 'hubiésemos', 'hubieseis', 'hubiesen', 'habiendo', 'habido', 'habida', 'habidos', 'habidas', 'soy', 'eres', 'es', 'somos', 'sois', 'are', 'sea', 'seas', 'seamos', 'seáis', 'sean', 'seré', 'serás', 'será', 'seremos', 'seréis', 'serán', 'sería', 'serías', 'seríamos', 'seríais', 'serían', 'era', 'eras', 'éramos', 'erais', 'eran', 'fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron', 'fuera', 'fueras', 'fuéramos', 'fuerais', 'fueran', 'fuese', 'fueses', 'fuésemos', 'fueseis', 'fuesen', 'siendo', 'sido', 'tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen', 'tenga', 'tengas', 'tengamos', 'tengáis', 'tengan', 'tendré', 'tendrás', 'tendrá', 'tendremos', 'tendréis', 'tendrán', 'tendría', 'tendrías', 'tendríamos', 'tendríais', 'tendrían', 'tenía', 'tenías', 'teníamos', 'teníais', 'tenían', 'tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis', 'tuvieron', 'tuviera', 'tuvieras', 'tuviéramos', 'tuvierais', 'tuvieran', 'tuviese', 'tuvieses', 'tuviésemos', 'tuvieseis', 'tuviesen', 'teniendo', 'tenido', 'tenida', 'tenidos', 'tenidas', 'tened'];
        
        // Tokenizar y limpiar el texto
        const words = text.toLowerCase()
            .replace(/[^\w\sáéíóúüñ]/gi, '') // Eliminar puntuación
            .split(/\s+/)
            .filter(word => word.length > 3 && !stopwords.includes(word));
        
        // Contar frecuencia de palabras
        const wordCount = {};
        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });
        
        // Ordenar por frecuencia y tomar las más relevantes
        return Object.entries(wordCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, maxKeywords)
            .map(entry => entry[0]);
    }

    detectLanguage(text) {
        // Detección simple basada en caracteres comunes
        const spanishIndicators = /[áéíóúüñ]/gi;
        const englishIndicators = /[^aeiou][aeiou][^aeiou][e]?|th|sh|ch|wh/gi;
        
        const spanishMatches = (text.match(spanishIndicators) || []).length;
        const englishMatches = (text.match(englishIndicators) || []).length;
        
        return spanishMatches > englishMatches ? 'es' : 'en';
    }

    // Método para procesar imágenes con modelos de visión por computadora
    async analyzeImage(imageData) {
        // Placeholder para análisis de imágenes
        // En una implementación real, usaríamos TensorFlow.js o una API similar
        console.log('Análisis de imagen con IA', imageData);
        return {
            tags: ['documento', 'texto', 'imagen'],
            containsText: true,
            quality: 'good'
        };
    }
}

// Instancia global del procesador de IA
const aiProcessor = new AIProcessor();