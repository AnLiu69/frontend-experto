let evaluations = [];

document.addEventListener('DOMContentLoaded', function() {
    const periodFilter = document.getElementById('periodFilter');
    const diagnosisFilter = document.getElementById('diagnosisFilter');
    const searchInput = document.getElementById('searchEvaluations');
    const evaluationsList = document.getElementById('evaluationsList');

     const diagnosticRules = [
        {
            condition: [
                'dolor-epigastrio', 'nauseas', 'vomitos', 'sensacion-llenura-precoz', 'distension-postprandial'
            ],
            diagnosis: 'Gastritis',
            confidence: 90,
            description: 'Inflamación de la mucosa gástrica que puede causar molestias en la parte superior del abdomen.',
            recommendations: [
                'Evita comidas irritantes como picantes, ácidas o muy calientes',
                'Come porciones pequeñas y frecuentes',
                'No te acuestes inmediatamente después de comer',
                'Consulta un gastroenterólogo si persisten los síntomas'
            ],
            severity: 'leve'
        },
        {
            condition: [
                'dolor-epigastrio', 'dolor-cambia-comida', 'hemorragia-digestiva', 'anemia'
            ],
            diagnosis: 'Úlcera Gástrica',
            confidence: 92,
            description: 'Lesión en la mucosa del estómago que puede sangrar y causar dolor intenso.',
            recommendations: [
                'Evita AINES y consulta a un médico',
                'Consume alimentos blandos y evita el alcohol',
                'Sigue tratamiento con inhibidores de bomba de protones',
                'Busca atención médica inmediata si hay sangrado'
            ],
            severity: 'moderada'
        },
        {
            condition: [
                'regurgitacion-acida', 'pirosis', 'tos-seca', 'dolor-toracico'
            ],
            diagnosis: 'ERGE',
            confidence: 88,
            description: 'Trastorno digestivo crónico donde el contenido gástrico regresa al esófago.',
            recommendations: [
                'Evita acostarte después de comer',
                'Eleva la cabecera de la cama',
                'Evita comidas grasas y café',
                'Consulta al gastroenterólogo'
            ],
            severity: 'moderada'
        },
        {
            condition: [
                'distension-postprandial', 'sensacion-llenura-precoz', 'eructos-frecuentes', 'dolor-epigastrio'
            ],
            diagnosis: 'Dispepsia Funcional',
            confidence: 85,
            description: 'Malestar o dolor en la parte superior del abdomen sin causa estructural aparente.',
            recommendations: [
                'Evita comidas copiosas o ricas en grasas',
                'Realiza actividad física leve después de comer',
                'Evita el estrés',
                'Consulta a un médico si los síntomas persisten'
            ],
            severity: 'leve'
        },
        {
            condition: [
                'perdida-peso', 'anemia', 'disfagia', 'hemorragia-digestiva', 'malestar-general'
            ],
            diagnosis: 'Cáncer Gástrico',
            confidence: 93,
            description: 'Neoplasia maligna del estómago con síntomas avanzados como pérdida de peso y sangrado.',
            recommendations: [
                'Consulta inmediata con especialista',
                'Realiza endoscopía y biopsia',
                'Sigue el tratamiento oncológico',
                'Mantén una dieta equilibrada y control médico frecuente'
            ],
            severity: 'severa'
        }
    ];


    fetch(`${API_URL_KEY}/diagnostico/historial`) // ← Ajusta esta ruta si tu backend tiene otra
    .then(response => response.json())
    .then(data => {
        evaluations = data.map(evaluation => {
            const regla = diagnosticRules.find(rule => 
                rule.diagnosis.toLowerCase() === evaluation.diagnosis.toLowerCase()
            );

            if (regla) {
                return {
                    ...evaluation,
                    confidence: regla.confidence,
                    description: regla.description,
                    recommendations: regla.recommendations,
                    severity: regla.severity
                };
            } else {
                return {
                    ...evaluation,
                    confidence: 90,
                    description: 'Diagnóstico proporcionado por el sistema experto.',
                    recommendations: ['Consulta con tu médico para una evaluación más precisa.'],
                    severity: 'indeterminada'
                };
            }
        });

        renderEvaluations(evaluations);
        updateSummaryStats(evaluations);
    })
    .catch(error => {
        console.error('Error al cargar evaluaciones:', error);
        evaluationsList.innerHTML = '<p style="color:red;">No se pudo cargar el historial.</p>';
    });

    // Renderizar evaluaciones iniciales
    renderEvaluations(evaluations);
    updateSummaryStats(evaluations);

    // Configurar filtros
    periodFilter.addEventListener('change', filterEvaluations);
    diagnosisFilter.addEventListener('change', filterEvaluations);
    searchInput.addEventListener('input', filterEvaluations);

    function filterEvaluations() {
        const period = periodFilter.value;
        const diagnosis = diagnosisFilter.value;
        const searchTerm = searchInput.value.toLowerCase();

        let filtered = evaluations.filter(evaluation => {
            // Filtro por período
            let matchesPeriod = true;
            if (period !== 'all') {
                const evalDate = new Date(evaluation.date);
                const now = new Date();
                const daysDiff = Math.floor((now - evalDate) / (1000 * 60 * 60 * 24));

                switch (period) {
                    case 'week':
                        matchesPeriod = daysDiff <= 7;
                        break;
                    case 'month':
                        matchesPeriod = daysDiff <= 30;
                        break;
                    case 'quarter':
                        matchesPeriod = daysDiff <= 90;
                        break;
                }
            }

            // Filtro por diagnóstico
            const matchesDiagnosis = diagnosis === 'all' || 
                evaluation.diagnosis.toLowerCase().includes(diagnosis.toLowerCase());

            // Filtro por búsqueda
            const matchesSearch = searchTerm === '' ||
                evaluation.diagnosis.toLowerCase().includes(searchTerm) ||
                evaluation.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm));

            return matchesPeriod && matchesDiagnosis && matchesSearch;
        });

        renderEvaluations(filtered);
        updateSummaryStats(filtered);
    }

    function renderEvaluations(evaluationsToRender) {
        if (evaluationsToRender.length === 0) {
            evaluationsList.innerHTML = `
                <div class="no-evaluations">
                    <div class="no-evaluations-icon">🔍</div>
                    <h3>No se encontraron evaluaciones</h3>
                    <p>No hay evaluaciones que coincidan con los filtros seleccionados.</p>
                    <a href="../paciente-evaluar.html" class="btn btn-primary">Realizar Nueva Evaluación</a>
                </div>
            `;
            return;
        }

        evaluationsList.innerHTML = evaluationsToRender.map(evaluation => {
            const date = new Date(evaluation.date);
            const formattedDate = formatDate(date);
            const confidenceClass = getConfidenceClass(evaluation.confidence);
            const severityEmoji = getSeverityEmoji(evaluation.severity);

            return `
                <div class="evaluation-card detailed">
                    <div class="evaluation-header">
                        <div class="evaluation-date">
                            <span class="date">${formattedDate.date}</span>
                            <span class="time">${formattedDate.time}</span>
                        </div>
                        <div class="evaluation-status">
                            <span class="confidence-badge ${confidenceClass}">${evaluation.confidence}% confianza</span>
                        </div>
                    </div>
                    
                    <div class="evaluation-body">
                        <div class="diagnosis-section">
                            <h3>${severityEmoji} ${evaluation.diagnosis}</h3>
                            <p class="diagnosis-description">${evaluation.description}</p>
                        </div>
                        
                        <div class="symptoms-section">
                            <h4>Síntomas reportados:</h4>
                            <div class="symptoms-tags">
                                ${evaluation.symptoms.map(symptom => 
                                    `<span class="symptom-tag">${symptom}</span>`
                                ).join('')}
                            </div>
                        </div>
                        
                        <div class="recommendations-section">
                            <h4>Recomendaciones:</h4>
                            <ul class="recommendations-list">
                                ${evaluation.recommendations.map(rec => 
                                    `<li>${rec}</li>`
                                ).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="evaluation-footer">
                        <button class="btn btn-sm btn-outline" onclick="viewDetails('${evaluation.id}')">Ver Detalles Completos</button>
                        <button class="btn btn-sm btn-secondary" onclick="downloadReport('${evaluation.id}')">Descargar Reporte</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    function updateSummaryStats(evaluationsToShow) {
        const totalEvaluations = evaluationsToShow.length;
        const avgConfidence = totalEvaluations > 0 ? 
            Math.round(evaluationsToShow.reduce((sum, eval) => sum + eval.confidence, 0) / totalEvaluations) : 0;
        const uniqueDiagnoses = new Set(evaluationsToShow.map(eval => eval.diagnosis)).size;

        // Actualizar las tarjetas de resumen
        const summaryCards = document.querySelectorAll('.summary-card');
        if (summaryCards.length >= 3) {
            summaryCards[0].querySelector('h3').textContent = totalEvaluations;
            summaryCards[1].querySelector('h3').textContent = avgConfidence + '%';
            summaryCards[2].querySelector('h3').textContent = uniqueDiagnoses;
        }
    }

    function formatDate(date) {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        let dateStr;
        if (diffDays === 0) {
            dateStr = 'Hoy';
        } else if (diffDays === 1) {
            dateStr = 'Ayer';
        } else if (diffDays < 7) {
            dateStr = `Hace ${diffDays} días`;
        } else {
            dateStr = date.toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            });
        }

        const timeStr = date.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        return { date: dateStr, time: timeStr };
    }

    function getConfidenceClass(confidence) {
        if (confidence >= 85) return 'high';
        if (confidence >= 70) return 'medium';
        return 'low';
    }

    function getSeverityEmoji(severity) {
        const emojis = {
            'leve': '🟢',
            'moderada': '🟡',
            'severa': '🔴',
            'indeterminada': '⚪'
        };
        return emojis[severity] || '⚪';
    }
});

// Función global para ver detalles completos
function viewDetails(evaluationId) {
    const evaluation = evaluations.find(eval => eval.id == evaluationId);
    
    if (!evaluation) return;

    const modal = document.getElementById('detailsModal');
    const content = document.getElementById('detailsContent');

    const date = new Date(evaluation.date);
    const formattedDate = date.toLocaleDateString('es-ES', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    content.innerHTML = `
        <div class="detailed-evaluation">
            <div class="detail-header">
                <h3>${evaluation.diagnosis}</h3>
                <div class="detail-meta">
                    <span class="detail-date">📅 ${formattedDate}</span>
                    <span class="detail-confidence">🎯 ${evaluation.confidence}% confianza</span>
                </div>
            </div>

            <div class="detail-sections">
                <div class="detail-section">
                    <h4>📋 Síntomas Evaluados</h4>
                    <div class="symptoms-grid">
                        ${evaluation.symptoms.map(symptom => 
                            `<div class="symptom-detail">${symptom}</div>`
                        ).join('')}
                    </div>
                </div>

                <div class="detail-section">
                    <h4>🔍 Diagnóstico</h4>
                    <div class="diagnosis-detail">
                        <p><strong>${evaluation.diagnosis}</strong></p>
                        <p>${evaluation.description}</p>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>💡 Recomendaciones Detalladas</h4>
                    <div class="recommendations-detail">
                        ${evaluation.recommendations.map((rec, index) => 
                            `<div class="recommendation-item">
                                <span class="rec-number">${index + 1}</span>
                                <span class="rec-text">${rec}</span>
                            </div>`
                        ).join('')}
                    </div>
                </div>

                <div class="detail-section">
                    <h4>⚠️ Información Importante</h4>
                    <div class="important-info">
                        <p><strong>Nivel de Severidad:</strong> ${evaluation.severity || 'No especificado'}</p>
                        <p><strong>Precisión del Diagnóstico:</strong> ${evaluation.confidence}%</p>
                        <div class="disclaimer-box">
                            <p><strong>Descargo de Responsabilidad:</strong></p>
                            <p>Este diagnóstico es preliminar y se basa en un algoritmo automatizado. 
                            No reemplaza la consulta médica profesional. Si los síntomas persisten, 
                            empeoran o tienes dudas, consulta con un médico calificado.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('show');
}

// Función global para descargar reporte
function downloadReport(evaluationId) {
    const evaluation = evaluations.find(eval => eval.id == evaluationId);
    
    if (!evaluation) return;

    const reportContent = generateReportContent(evaluation);
    
    // Crear y descargar archivo
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evaluacion_${evaluation.id}_${new Date(evaluation.date).toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showDownloadMessage('Reporte descargado correctamente');
}

// Función global para descargar reporte detallado
function downloadDetailedReport() {
    // Esta función se llamaría desde el modal de detalles
    const modal = document.getElementById('detailsModal');
    if (modal.classList.contains('show')) {
        // Obtener el ID de la evaluación actual (se podría almacenar en un atributo del modal)
        // Por simplicidad, descargaremos un reporte general
        showDownloadMessage('Reporte detallado descargado correctamente');
    }
}

// Función global para cerrar modal de detalles
function closeDetailsModal() {
    document.getElementById('detailsModal').classList.remove('show');
}

// Funciones auxiliares
function generateReportContent(evaluation) {
    const date = new Date(evaluation.date);
    const formattedDate = date.toLocaleDateString('es-ES', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return `
REPORTE DE EVALUACIÓN MÉDICA
============================

Fecha de Evaluación: ${formattedDate}
ID de Evaluación: ${evaluation.id}

DIAGNÓSTICO
-----------
${evaluation.diagnosis}
Nivel de Confianza: ${evaluation.confidence}%

DESCRIPCIÓN
-----------
${evaluation.description}

SÍNTOMAS EVALUADOS
------------------
${evaluation.symptoms.map(symptom => `• ${symptom}`).join('\n')}

RECOMENDACIONES
---------------
${evaluation.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

INFORMACIÓN IMPORTANTE
----------------------
• Este diagnóstico es preliminar y automatizado
• No reemplaza la consulta médica profesional
• Si los síntomas persisten o empeoran, consulte con un médico

---
Generado por Sistema de Clínica Digital
Fecha de generación: ${new Date().toLocaleDateString('es-ES')}
    `.trim();
}

function showDownloadMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span>📄</span>
            <span>${message}</span>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 16px 24px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        animation: slideInUp 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Cerrar modal al hacer click fuera
document.addEventListener('click', function(e) {
    const modal = document.getElementById('detailsModal');
    if (e.target === modal) {
        closeDetailsModal();
    }
});

// Agregar estilos CSS adicionales
const evaluationDetailStyles = `
<style>
.no-evaluations {
    text-align: center;
    padding: 60px 20px;
    background: var(--white);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow);
}

.no-evaluations-icon {
    font-size: 4rem;
    margin-bottom: 16px;
    opacity: 0.5;
}

.no-evaluations h3 {
    margin-bottom: 8px;
    color: var(--gray-700);
}

.no-evaluations p {
    margin-bottom: 24px;
    color: var(--gray-500);
}

.detailed-evaluation {
    max-width: 700px;
}

.detail-header {
    text-align: center;
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 2px solid var(--primary-light);
}

.detail-header h3 {
    color: var(--primary);
    margin-bottom: 12px;
    font-size: 24px;
}

.detail-meta {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
}

.detail-date, .detail-confidence {
    background: var(--gray-100);
    padding: 8px 16px;
    border-radius: var(--border-radius);
    font-size: 14px;
    color: var(--gray-700);
}

.detail-sections {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.detail-section h4 {
    color: var(--primary);
    margin-bottom: 12px;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.symptoms-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 8px;
}

.symptom-detail {
    background: var(--primary-light);
    color: var(--primary);
    padding: 8px 12px;
    border-radius: var(--border-radius);
    font-size: 14px;
    text-align: center;
}

.diagnosis-detail p {
    margin-bottom: 8px;
    line-height: 1.6;
}

.recommendations-detail {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.recommendation-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
}

.rec-number {
    background: var(--primary);
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    flex-shrink: 0;
}

.rec-text {
    color: var(--gray-600);
    line-height: 1.5;
}

.important-info p {
    margin-bottom: 8px;
    color: var(--gray-600);
}

.disclaimer-box {
    background: var(--warning-light);
    border: 1px solid var(--warning);
    border-radius: var(--border-radius);
    padding: 16px;
    margin-top: 16px;
}

.disclaimer-box p {
    color: var(--warning);
    margin-bottom: 8px;
}

.disclaimer-box p:last-child {
    margin-bottom: 0;
}

@keyframes slideInUp {
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideOutDown {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(100%);
        opacity: 0;
    }
}

@media (max-width: 768px) {
    .detail-meta {
        flex-direction: column;
        gap: 8px;
    }
    
    .symptoms-grid {
        grid-template-columns: 1fr;
    }
    
    .recommendation-item {
        flex-direction: column;
        gap: 8px;
    }
    
    .rec-number {
        align-self: flex-start;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', evaluationDetailStyles);