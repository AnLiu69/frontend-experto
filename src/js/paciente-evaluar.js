// Información detallada de síntomas
const symptomInfo = {
    'dolor-epigastrio': {
        title: 'Dolor o ardor en epigastrio',
        description: 'Dolor localizado en la parte superior central del abdomen, justo debajo del esternón. Puede presentarse como ardor o molestia constante.',
        causes: ['Gastritis', 'Úlcera gástrica', 'Reflujo gastroesofágico', 'Cáncer gástrico'],
        severity: 'Consulte si el dolor es persistente, severo o se presenta en ayunas y mejora con la comida.'
    },
    'nauseas': {
        title: 'Náuseas',
        description: 'Sensación de malestar en el estómago con impulso de vomitar.',
        causes: ['Gastritis', 'Intoxicación alimentaria', 'Embarazo', 'Migraña'],
        severity: 'Consulte si las náuseas persisten por más de 24 horas o se acompañan de deshidratación.'
    },
    'vomitos': {
        title: 'Vómitos',
        description: 'Expulsión forzada del contenido del estómago a través de la boca.',
        causes: ['Gastroenteritis', 'Úlcera gástrica', 'Obstrucción intestinal', 'Enfermedades gástricas'],
        severity: 'Consulte si los vómitos contienen sangre, son persistentes o se acompañan de signos de deshidratación.'
    },
    'regurgitacion-acida': {
        title: 'Regurgitación ácida',
        description: 'Retorno involuntario del contenido ácido del estómago hacia la garganta o boca.',
        causes: ['Reflujo gastroesofágico', 'Hernia hiatal', 'Disfunción del esfínter esofágico inferior'],
        severity: 'Consulte si ocurre con frecuencia, interfiere con el sueño o causa molestias persistentes.'
    },
    'pirosis': {
        title: 'Pirosis (ardor retroesternal)',
        description: 'Sensación de ardor que asciende desde el estómago hacia el pecho o garganta.',
        causes: ['Reflujo gastroesofágico', 'Gastritis', 'Úlcera gástrica'],
        severity: 'Consulte si ocurre más de dos veces por semana o se asocia a dificultad para tragar.'
    },
    'tos-seca': {
        title: 'Tos seca',
        description: 'Tos sin producción de flema, persistente o irritativa.',
        causes: ['Reflujo gastroesofágico', 'Irritación esofágica', 'Afecciones respiratorias asociadas'],
        severity: 'Consulte si la tos dura más de 3 semanas o se presenta especialmente por las noches.'
    },
    'dolor-comida': {
        title: 'Dolor que cambia con la comida',
        description: 'Molestia abdominal que aparece o se modifica con la ingesta de alimentos.',
        causes: ['Gastritis', 'Úlcera gástrica o duodenal', 'Trastornos digestivos funcionales'],
        severity: 'Consulte si el dolor persiste, cambia de intensidad o se acompaña de pérdida de apetito.'
    },
    'llenura-precoz': {
        title: 'Sensación de llenura precoz',
        description: 'Sensación de estar lleno después de consumir poca cantidad de alimentos.',
        causes: ['Dispepsia funcional', 'Gastroparesia', 'Cáncer gástrico'],
        severity: 'Consulte si impide terminar las comidas y se acompaña de vómitos o pérdida de peso.'
    },
    'hemorragia-digestiva': {
        title: 'Hemorragia digestiva',
        description: 'Presencia de sangre en vómito (hematemesis) o en las heces (melena).',
        causes: ['Úlcera gástrica', 'Varices esofágicas', 'Cáncer gástrico', 'Gastritis erosiva'],
        severity: 'URGENTE: Consulte de inmediato si observa sangre al vomitar o heces negras y malolientes.'
    },
    'dolor-toracico': {
        title: 'Dolor torácico',
        description: 'Dolor o molestia en el pecho, que puede confundirse con un problema cardíaco.',
        causes: ['Reflujo gastroesofágico', 'Espasmo esofágico', 'Úlcera gástrica'],
        severity: 'Consulte si el dolor es intenso, se irradia al brazo o mandíbula o se asocia a dificultad para respirar.'
    },
    'perdida-peso': {
        title: 'Pérdida de peso',
        description: 'Disminución involuntaria del peso corporal, sin cambios en la dieta o actividad física.',
        causes: ['Cáncer gástrico', 'Úlcera gástrica', 'Problemas de absorción', 'Enfermedades crónicas'],
        severity: 'Consulte si pierde más del 5% de su peso en un mes sin causa aparente.'
    },
    'anemia': {
        title: 'Anemia',
        description: 'Disminución en los niveles de glóbulos rojos o hemoglobina, causando fatiga y palidez.',
        causes: ['Pérdida crónica de sangre', 'Déficit de hierro o vitamina B12', 'Enfermedades digestivas'],
        severity: 'Consulte si presenta fatiga persistente, mareos, palpitaciones o palidez notoria.'
    },
    'disfagia': {
        title: 'Dificultad para tragar (Disfagia)',
        description: 'Sensación de que los alimentos se quedan atascados o dificultad para tragar líquidos o sólidos.',
        causes: ['Reflujo gastroesofágico', 'Estenosis esofágica', 'Trastornos neuromusculares', 'Tumores'],
        severity: 'Consulte si la disfagia es progresiva, dolorosa o se asocia con pérdida de peso.'
    },
    'saciedad-precoz': {
        title: 'Saciedad precoz persistente',
        description: 'Sensación constante de estar lleno tras ingerir pequeñas cantidades de comida.',
        causes: ['Dispepsia funcional', 'Cáncer gástrico', 'Trastornos del vaciamiento gástrico'],
        severity: 'Consulte si impide alimentarse adecuadamente o se acompaña de náuseas o vómitos.'
    },
    'hipo-persistente': {
        title: 'Hipo persistente',
        description: 'Contracciones involuntarias del diafragma que duran más de 48 horas.',
        causes: ['Irritación del nervio frénico', 'Reflujo ácido', 'Trastornos gástricos', 'Problemas neurológicos'],
        severity: 'Consulte si dura más de 2 días, interfiere con el sueño o la alimentación.'
    },
    'malestar-debilidad': {
        title: 'Malestar general / Debilidad',
        description: 'Sensación de fatiga física o mental, falta de energía o sensación general de malestar.',
        causes: ['Anemia', 'Infecciones', 'Enfermedades digestivas crónicas', 'Desnutrición'],
        severity: 'Consulte si dura más de una semana o limita sus actividades cotidianas.'
    },
    'eructos-frecuentes': {
        title: 'Eructos frecuentes',
        description: 'Expulsión repetitiva de aire del estómago a través de la boca.',
        causes: ['Reflujo gastroesofágico', 'Aerofagia', 'Gastritis', 'Intolerancias alimentarias'],
        severity: 'Consulte si es muy frecuente, se acompaña de dolor abdominal o náuseas.'
    },
    'distension-postprandial': {
        title: 'Distensión abdominal postprandial',
        description: 'Hinchazón del abdomen después de comer.',
        causes: ['Intolerancia alimentaria', 'Dispepsia funcional', 'Síndrome de intestino irritable', 'Gastroparesia'],
        severity: 'Consulte si la distensión es constante, se asocia con dolor, pérdida de peso o cambios en el apetito.'
    }
};

// Algoritmo de diagnóstico simulado
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

let selectedSymptoms = [];

document.addEventListener('DOMContentLoaded', function() {
    const symptomsForm = document.getElementById('symptomsForm');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const evaluateBtn = document.getElementById('evaluateBtn');

    // Configurar event listeners para checkboxes
    const checkboxes = document.querySelectorAll('input[name="symptoms"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSelectedSymptoms();
            updateProgress();
            updateEvaluateButton();
        });
    });

    // Manejar envío del formulario
    symptomsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (selectedSymptoms.length > 0) {
            enviarEvaluacionAlServidor();
        }
    });

    function updateSelectedSymptoms() {
        selectedSymptoms = Array.from(document.querySelectorAll('input[name="symptoms"]:checked'))
            .map(checkbox => checkbox.value);
    }

    function updateProgress() {
        const totalSymptoms = document.querySelectorAll('input[name="symptoms"]').length;
        const selectedCount = selectedSymptoms.length;
        const percentage = (selectedCount / totalSymptoms) * 100;

        progressFill.style.width = `${Math.min(percentage, 100)}%`;
        progressText.textContent = `${selectedCount} síntomas seleccionados`;
    }

    function updateEvaluateButton() {
        evaluateBtn.disabled = selectedSymptoms.length === 0;
        if (selectedSymptoms.length > 0) {
            evaluateBtn.textContent = `Evaluar ${selectedSymptoms.length} Síntomas`;
        } else {
            evaluateBtn.textContent = 'Evaluar Síntomas';
        }
    }
});

// Función llamada al backend
async function enviarEvaluacionAlServidor() {
    const sintomasSeleccionados = selectedSymptoms.map(s => mapSymptomToId(s));

    if (sintomasSeleccionados.length === 0) return;

    try {
        const res = await fetch(`${API_URL_KEY}/diagnostico`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sintomas: sintomasSeleccionados })
        });

        const data = await res.json();
        const nombreEnfermedad = data.diagnostico?.trim();

        if (!nombreEnfermedad || nombreEnfermedad === 'false') {
            return alert("No se pudo determinar un diagnóstico. Consulta con tu médico.");
        }

        const regla = diagnosticRules.find(rule => rule.diagnosis.toLowerCase() === nombreEnfermedad.toLowerCase());

        if (regla) {
            mostrarDiagnostico({
                ...regla,
                adjustedConfidence: regla.confidence, // este campo ya es usado por tu frontend
                matchingSymptoms: selectedSymptoms // opcional
            });
        } else {
            mostrarDiagnostico({
                diagnosis: nombreEnfermedad,
                adjustedConfidence: 70,
                description: 'Diagnóstico proporcionado por el sistema experto.',
                recommendations: ['Consulta con tu médico para una evaluación más precisa.'],
                severity: 'indeterminada',
                matchingSymptoms: selectedSymptoms
            });
        }  

    } catch (error) {
        console.error("Error al enviar síntomas:", error);
        alert("Hubo un error al procesar la evaluación.");
    }
}

// Función global para mostrar información del síntoma
function showSymptomInfo(symptomId) {
    const info = symptomInfo[symptomId];
    if (!info) return;

    const modal = document.getElementById('symptomInfoModal');
    const title = document.getElementById('symptomInfoTitle');
    const content = document.getElementById('symptomInfoContent');

    title.textContent = info.title;
    content.innerHTML = `
        <div class="symptom-info-content">
            <div class="info-section">
                <h4>Descripción</h4>
                <p>${info.description}</p>
            </div>
            
            <div class="info-section">
                <h4>Posibles Causas</h4>
                <ul>
                    ${info.causes.map(cause => `<li>${cause}</li>`).join('')}
                </ul>
            </div>
            
            <div class="info-section">
                <h4>Cuándo Consultar</h4>
                <p class="severity-info">${info.severity}</p>
            </div>
        </div>
    `;

    modal.classList.add('show');
}

// Función global para cerrar modal de información
function closeSymptomInfo() {
    document.getElementById('symptomInfoModal').classList.remove('show');
}

// Función global para limpiar selección
function clearSelection() {
    const checkboxes = document.querySelectorAll('input[name="symptoms"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    selectedSymptoms = [];
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressText').textContent = '0 síntomas seleccionados';
    document.getElementById('evaluateBtn').disabled = true;
    document.getElementById('evaluateBtn').textContent = 'Evaluar Síntomas';
}


function mostrarDiagnostico(diagnosis) {
    const modal = document.getElementById('diagnosisModal');
    const content = document.getElementById('diagnosisContent');

    const severityColors = {
        'leve': 'var(--success)',
        'moderada': 'var(--warning)',
        'severa': 'var(--danger)',
        'indeterminada': 'var(--secondary)'
    };

    const severityColor = severityColors[diagnosis.severity] || 'var(--secondary)';

    content.innerHTML = `
        <div class="diagnosis-result">
            <div class="diagnosis-header">
                <h3 style="color: ${severityColor};">${diagnosis.diagnosis}</h3>
                <div class="confidence-indicator">
                    <span class="confidence-label">Nivel de confianza:</span>
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: ${diagnosis.adjustedConfidence}%; background: ${severityColor};"></div>
                    </div>
                    <span class="confidence-value">${diagnosis.adjustedConfidence}%</span>
                </div>
            </div>

            <div class="diagnosis-body">
                <div class="diagnosis-section">
                    <h4>Descripción</h4>
                    <p>${diagnosis.description}</p>
                </div>

                <div class="diagnosis-section">
                    <h4>Síntomas Evaluados</h4>
                    <div class="evaluated-symptoms">
                        ${selectedSymptoms.map(symptom => {
                            const isMatching = diagnosis.matchingSymptoms && diagnosis.matchingSymptoms.includes(symptom);
                            return `<span class="symptom-tag ${isMatching ? 'matching' : 'additional'}">${getSymptomName(symptom)}</span>`;
                        }).join('')}
                    </div>
                </div>

                <div class="diagnosis-section">
                    <h4>Recomendaciones</h4>
                    <ul class="recommendations">
                        ${diagnosis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>

                <div class="diagnosis-section">
                    <div class="diagnosis-footer">
                        <p class="disclaimer">
                            <strong>Importante:</strong> Este diagnóstico es preliminar y no reemplaza la consulta médica profesional. 
                            Si los síntomas persisten o empeoran, consulte con un médico.
                        </p>
                        <div class="diagnosis-meta">
                            <span>Evaluación realizada: ${new Date().toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('show');
}

function getSymptomName(symptomId) {
    const symptomNames = {
        'dolor-epigastrio': 'Dolor o ardor en epigastrio',
        'nauseas': 'Náuseas',
        'vomitos': 'Vómitos',
        'regurgitacion-acida': 'Regurgitación ácida',
        'pirosis': 'Pirosis (ardor retroesternal)',
        'tos-seca': 'Tos seca',
        'dolor-cambia-comida': 'Dolor que cambia con la comida',
        'sensacion-llenura-precoz': 'Sensación de llenura precoz',
        'hemorragia-digestiva': 'Hemorragia digestiva',
        'dolor-toracico': 'Dolor torácico',
        'perdida-peso': 'Pérdida de peso',
        'anemia': 'Anemia',
        'disfagia': 'Dificultad para tragar (Disfagia)',
        'saciedad-precoz': 'Saciedad precoz persistente',
        'hipo-persistente': 'Hipo persistente',
        'malestar-general': 'Malestar general / Debilidad',
        'eructos-frecuentes': 'Eructos frecuentes',
        'distension-postprandial': 'Distensión abdominal postprandial'
    };
    return symptomNames[symptomId] || symptomId;
}

function mapSymptomToId(symptomKey) {
    const mapping = {
        'dolor-epigastrio': '1',
        'nauseas': '2',
        'vomitos': '3',
        'regurgitacion-acida': '4',
        'pirosis': '5',
        'tos-seca': '6',
        'dolor-comida': '7',
        'llenura-precoz': '8',
        'hemorragia-digestiva': '9',
        'dolor-toracico': '10',
        'perdida-peso': '11',
        'anemia': '12',
        'disfagia': '13',
        'saciedad-precoz': '14',
        'hipo-persistente': '15',
        'malestar-debilidad': '16',
        'eructos-frecuentes': '17',
        'distension-postprandial': '18'
    };
    return mapping[symptomKey];
}

// Función global para cerrar modal de diagnóstico
function closeDiagnosisModal() {
    document.getElementById('diagnosisModal').classList.remove('show');
}

// Cerrar modales al hacer click fuera
document.addEventListener('click', function(e) {
    const symptomModal = document.getElementById('symptomInfoModal');
    const diagnosisModal = document.getElementById('diagnosisModal');
    
    if (e.target === symptomModal) {
        closeSymptomInfo();
    }
    
    if (e.target === diagnosisModal) {
        closeDiagnosisModal();
    }
});

// Agregar estilos CSS adicionales
const evaluationStyles = `
<style>
.symptom-info-content {
    max-width: 500px;
}

.info-section {
    margin-bottom: 20px;
}

.info-section h4 {
    color: var(--primary);
    margin-bottom: 8px;
    font-size: 16px;
}

.info-section p, .info-section ul {
    color: var(--gray-600);
    line-height: 1.5;
}

.info-section ul {
    padding-left: 20px;
}

.info-section li {
    margin-bottom: 4px;
}

.severity-info {
    background: var(--warning-light);
    color: var(--warning);
    padding: 12px;
    border-radius: var(--border-radius);
    font-weight: 500;
}

.diagnosis-result {
    max-width: 700px;
}

.diagnosis-header {
    text-align: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid var(--gray-200);
}

.diagnosis-header h3 {
    margin-bottom: 16px;
    font-size: 24px;
}

.confidence-indicator {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: center;
}

.confidence-label {
    font-weight: 500;
    color: var(--gray-700);
}

.confidence-bar {
    width: 200px;
    height: 8px;
    background: var(--gray-200);
    border-radius: 4px;
    overflow: hidden;
}

.confidence-fill {
    height: 100%;
    transition: width 0.3s ease;
}

.confidence-value {
    font-weight: 600;
    color: var(--gray-900);
}

.diagnosis-body {
    text-align: left;
}

.diagnosis-section {
    margin-bottom: 24px;
}

.diagnosis-section h4 {
    color: var(--primary);
    margin-bottom: 12px;
    font-size: 16px;
}

.evaluated-symptoms {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.symptom-tag {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
}

.symptom-tag.matching {
    background: var(--success-light);
    color: var(--success);
    border: 1px solid var(--success);
}

.symptom-tag.additional {
    background: var(--gray-100);
    color: var(--gray-600);
    border: 1px solid var(--gray-300);
}

.recommendations {
    margin: 0;
    padding-left: 20px;
}

.recommendations li {
    margin-bottom: 8px;
    color: var(--gray-600);
    line-height: 1.5;
}

.diagnosis-footer {
    background: var(--gray-50);
    padding: 16px;
    border-radius: var(--border-radius);
    margin-top: 16px;
}

.disclaimer {
    color: var(--gray-700);
    font-size: 14px;
    margin-bottom: 12px;
}

.diagnosis-meta {
    color: var(--gray-500);
    font-size: 12px;
    text-align: right;
}

@media (max-width: 768px) {
    .confidence-indicator {
        flex-direction: column;
        gap: 8px;
    }
    
    .confidence-bar {
        width: 150px;
    }
    
    .evaluated-symptoms {
        flex-direction: column;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', evaluationStyles);