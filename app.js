// ============================================
// KUNAAL WACHANEKAR - HUMAN PERFORMANCE PLATFORM
// app.js - Core Application Logic
// ============================================

// ============================================
// STATE MANAGEMENT
// ============================================
const AppState = {
  currentStep: 0,
  totalSteps: 10,
  assessmentData: {},
  selectedService: null,
  showHypnotherapy: false,
  services: {
    'physique': {
      title: 'Physique Transformation',
      icon: '&#x1F3CB;&#xFE0F;',
      who: 'Individuals seeking significant changes in body composition, muscle development, and aesthetic physique. Suitable for beginners to advanced trainees.',
      includes: [
        'Comprehensive body composition analysis',
        'Customized resistance training program',
        'Progressive overload strategies',
        'Pose and presentation guidance',
        'Weekly check-ins and adjustments',
        'Photo and measurement tracking'
      ],
      how: 'Begins with a detailed assessment of your current physique, training history, and goals. A periodized program is designed specifically for your body type and objectives.',
      expect: 'Measurable changes in body composition, improved muscle definition, increased strength, and enhanced confidence in your physical appearance.',
      process: 'Initial consultation (60 min) → Assessment → Program design → Weekly check-ins → Monthly reviews → Continuous refinement'
    },
    'strength': {
      title: 'Strength & Conditioning',
      icon: '&#x26A1;',
      who: 'Athletes, fitness enthusiasts, and individuals looking to build functional strength, power, and overall athletic performance.',
      includes: [
        'Strength-focused periodization',
        'Power and explosiveness training',
        'Movement pattern optimization',
        'Mobility and flexibility work',
        'Recovery protocols',
        'Performance metrics tracking'
      ],
      how: 'Assessment of current strength levels, movement patterns, and athletic goals. Program designed around compound movements and progressive overload.',
      expect: 'Significant increases in strength metrics, improved movement quality, enhanced athletic capability, and reduced injury risk.',
      process: 'Movement screening → Strength assessment → Program design → Technique coaching → Progressive loading → Performance review'
    },
    'contest': {
      title: 'Contest Preparation',
      icon: '&#x1F3C6;',
      who: 'Physique athletes preparing for bodybuilding, classic physique, or fitness competitions. Requires minimum 12-16 week commitment.',
      includes: [
        'Competition-specific training protocols',
        'Precision nutrition and meal planning',
        'Peak week strategy',
        'Posing and presentation coaching',
        'Conditioning timeline management',
        'Stage-ready physique optimization'
      ],
      how: 'Structured preparation timeline with reverse-engineered goals. Every week is calculated to bring you to stage in peak condition.',
      expect: 'Competition-ready physique with optimal conditioning, confident stage presence, and a strategic approach to peak week.',
      process: 'Initial assessment → Timeline planning → Weekly adjustments → Peak week protocol → Stage day support → Post-show guidance'
    },
    'nutrition': {
      title: 'Nutrition & Lifestyle',
      icon: '&#x1F957;',
      who: 'Anyone looking to optimize their nutrition for health, performance, body composition, or specific lifestyle goals.',
      includes: [
        'Personalized meal planning',
        'Macro and micronutrient optimization',
        'Meal timing strategies',
        'Lifestyle integration planning',
        'Grocery and meal prep guidance',
        'Sustainable habit development'
      ],
      how: 'Comprehensive nutrition assessment including current eating patterns, preferences, restrictions, and goals. Plan designed for adherence and results.',
      expect: 'Improved energy levels, better body composition, enhanced recovery, and sustainable eating habits that fit your lifestyle.',
      process: 'Nutrition audit → Goal setting → Meal plan design → Weekly adjustments → Habit tracking → Long-term sustainability'
    },
    'hypnotherapy': {
      title: 'Hypnotherapy',
      icon: '&#x1F9E0;',
      who: 'Individuals seeking behavioural change, habit transformation, confidence building, stress management, or performance enhancement through subconscious reprogramming.',
      includes: [
        'One-on-one hypnotherapy sessions',
        'Behavioural pattern analysis',
        'Subconscious reprogramming',
        'Confidence and performance enhancement',
        'Stress and anxiety management',
        'Habit transformation protocols'
      ],
      how: 'Uses guided hypnosis to access the subconscious mind and reprogram limiting beliefs, habits, and behaviours. Each session is tailored to your specific needs.',
      expect: 'Reduced anxiety, improved confidence, transformed habits, enhanced mental performance, and lasting behavioural change.',
      process: 'Initial consultation → Pattern identification → Hypnotherapy sessions → Integration exercises → Progress review → Maintenance'
    },
    'performance': {
      title: 'Human Performance',
      icon: '&#x1F9EC;',
      who: 'High-performers, executives, athletes, and individuals seeking comprehensive optimization of their physical and mental capabilities.',
      includes: [
        'Integrated training and nutrition',
        'Recovery optimization',
        'Sleep and circadian protocols',
        'Stress management systems',
        'Cognitive performance enhancement',
        'Lifestyle architecture'
      ],
      how: 'Holistic assessment of all performance variables. A comprehensive system designed to optimize every aspect of your human potential.',
      expect: 'Peak physical condition, enhanced mental clarity, optimized recovery, sustained high performance, and improved quality of life.',
      process: 'Comprehensive audit → System design → Implementation → Biometric tracking → Continuous optimization → Peak maintenance'
    }
  }
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  initLoading();
  initParticles();
  initNeuralNodes();
  initNavigation();
  initAssessment();
  initScrollAnimations();
  initCheckboxRadios();
  initDateInput();
});

function initLoading() {
  setTimeout(() => {
    document.getElementById('loadingOverlay').classList.add('hidden');
  }, 1500);
}

// ============================================
// PARTICLES & VISUAL EFFECTS
// ============================================
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const particleCount = window.innerWidth < 768 ? 20 : 40;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 4) + 's';
    particle.style.width = (2 + Math.random() * 3) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

function initNeuralNodes() {
  const container = document.getElementById('neuralNodes');
  if (!container) return;
  const nodeCount = window.innerWidth < 768 ? 8 : 15;
  for (let i = 0; i < nodeCount; i++) {
    const node = document.createElement('div');
    node.className = 'neural-node';
    node.style.left = Math.random() * 100 + '%';
    node.style.top = Math.random() * 100 + '%';
    node.style.animationDelay = Math.random() * 4 + 's';
    node.style.animationDuration = (3 + Math.random() * 3) + 's';
    container.appendChild(node);
  }
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
      navbar.style.background = 'rgba(10, 10, 15, 0.85)';
    }
  });

  // Active bottom bar link
  const bottomLinks = document.querySelectorAll('.mobile-bottom-bar a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    bottomLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('active');
}

function scrollToBooking() {
  document.getElementById('assessment').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    AppState.currentStep = 8;
    updateAssessmentUI();
  }, 600);
}

// ============================================
// ASSESSMENT LOGIC
// ============================================
function initAssessment() {
  updateAssessmentUI();

  // Hypnotherapy checkbox listener
  const hypnoCheckbox = document.getElementById('hypnotherapyCheckbox');
  if (hypnoCheckbox) {
    hypnoCheckbox.addEventListener('change', function() {
      AppState.showHypnotherapy = this.checked;
      updateStepIndicators();
    });
  }
}

function updateStepIndicators() {
  const hypnoIndicator = document.getElementById('hypnoStepIndicator');
  const hypnoLine = document.getElementById('hypnoStepLine');
  if (hypnoIndicator && hypnoLine) {
    hypnoIndicator.style.display = AppState.showHypnotherapy ? 'flex' : 'none';
    hypnoLine.style.display = AppState.showHypnotherapy ? 'block' : 'none';
  }
}

function getVisibleSteps() {
  return AppState.showHypnotherapy ? 10 : 9;
}

function getAdjustedStep(rawStep) {
  // Map raw step to visible step index
  if (!AppState.showHypnotherapy && rawStep >= 7) {
    return rawStep + 1; // Skip hypnotherapy step
  }
  return rawStep;
}

function getRawStep(visibleStep) {
  if (!AppState.showHypnotherapy && visibleStep >= 7) {
    return visibleStep - 1;
  }
  return visibleStep;
}

function nextStep() {
  if (!validateCurrentStep()) return;

  saveStepData();

  const visibleSteps = getVisibleSteps();
  const currentVisible = getVisibleStepIndex(AppState.currentStep);

  if (currentVisible < visibleSteps - 1) {
    AppState.currentStep++;
    // Skip hypnotherapy if not selected
    if (!AppState.showHypnotherapy && AppState.currentStep === 7) {
      AppState.currentStep = 8;
    }
    updateAssessmentUI();
    document.getElementById('assessmentBody').scrollTop = 0;
  }
}

function prevStep() {
  if (AppState.currentStep > 0) {
    AppState.currentStep--;
    // Skip hypnotherapy if not selected (going back)
    if (!AppState.showHypnotherapy && AppState.currentStep === 7) {
      AppState.currentStep = 6;
    }
    updateAssessmentUI();
    document.getElementById('assessmentBody').scrollTop = 0;
  }
}

function getVisibleStepIndex(rawStep) {
  if (!AppState.showHypnotherapy && rawStep > 7) {
    return rawStep - 1;
  }
  return rawStep;
}

function validateCurrentStep() {
  const step = AppState.currentStep;

  if (step === 0) {
    const name = document.getElementById('fullName').value.trim();
    const age = document.getElementById('age').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name) { showToast('Please enter your full name'); return false; }
    if (!age) { showToast('Please enter your age'); return false; }
    if (!phone) { showToast('Please enter your phone number'); return false; }
    if (!email) { showToast('Please enter your email'); return false; }
    if (!isValidEmail(email)) { showToast('Please enter a valid email'); return false; }
  }

  if (step === 7) { // Hypnotherapy step
    const consent = document.getElementById('hypnoConsent');
    if (consent && !consent.checked) {
      showToast('Please confirm hypnotherapy consent to continue');
      return false;
    }
  }

  return true;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function saveStepData() {
  const step = AppState.currentStep;

  if (step === 0) {
    AppState.assessmentData.fullName = document.getElementById('fullName').value;
    AppState.assessmentData.age = document.getElementById('age').value;
    AppState.assessmentData.sex = document.getElementById('sex').value;
    AppState.assessmentData.phone = document.getElementById('phone').value;
    AppState.assessmentData.whatsapp = document.getElementById('whatsapp').value;
    AppState.assessmentData.email = document.getElementById('email').value;
    AppState.assessmentData.location = document.getElementById('location').value;
  }

  if (step === 1) {
    AppState.assessmentData.height = document.getElementById('height').value;
    AppState.assessmentData.weight = document.getElementById('weight').value;
    AppState.assessmentData.bodyfat = document.getElementById('bodyfat').value;
    AppState.assessmentData.trainingExp = document.getElementById('trainingExp').value;
    AppState.assessmentData.yearsTraining = document.getElementById('yearsTraining').value;
    AppState.assessmentData.activityLevel = document.getElementById('activityLevel').value;
    AppState.assessmentData.waist = document.getElementById('waist').value;
    AppState.assessmentData.measurements = document.getElementById('measurements').value;
  }

  if (step === 2) {
    const goals = [];
    document.querySelectorAll('#primaryGoals input:checked').forEach(cb => goals.push(cb.value));
    AppState.assessmentData.primaryGoals = goals;
    AppState.assessmentData.goalDescription = document.getElementById('goalDescription').value;
    AppState.assessmentData.timeline = document.getElementById('timeline').value;
    AppState.assessmentData.barriers = document.getElementById('barriers').value;
    AppState.assessmentData.triedBefore = document.getElementById('triedBefore').value;
    AppState.assessmentData.commitment = document.getElementById('commitment').value;
  }

  if (step === 3) {
    AppState.assessmentData.occupation = document.getElementById('occupation').value;
    AppState.assessmentData.workSchedule = document.getElementById('workSchedule').value;
    AppState.assessmentData.sleepDuration = document.getElementById('sleepDuration').value;
    AppState.assessmentData.sleepQuality = document.getElementById('sleepQuality').value;
    AppState.assessmentData.stressLevel = document.getElementById('stressLevel').value;
    AppState.assessmentData.trainingFrequency = document.getElementById('trainingFrequency').value;
    AppState.assessmentData.travelFreq = document.getElementById('travelFreq').value;
    AppState.assessmentData.alcohol = document.getElementById('alcohol').value;
    AppState.assessmentData.smoking = document.getElementById('smoking').value;
    AppState.assessmentData.currentRoutine = document.getElementById('currentRoutine').value;
  }

  if (step === 4) {
    const diet = document.querySelector('input[name="diet"]:checked');
    AppState.assessmentData.diet = diet ? diet.value : '';
    AppState.assessmentData.allergies = document.getElementById('allergies').value;
    AppState.assessmentData.intolerances = document.getElementById('intolerances').value;
    AppState.assessmentData.foodsAvoided = document.getElementById('foodsAvoided').value;
    AppState.assessmentData.restrictions = document.getElementById('restrictions').value;
    AppState.assessmentData.mealsPerDay = document.getElementById('mealsPerDay').value;
    AppState.assessmentData.waterIntake = document.getElementById('waterIntake').value;
    AppState.assessmentData.eatingPattern = document.getElementById('eatingPattern').value;
    AppState.assessmentData.supplements = document.getElementById('supplements').value;
    AppState.assessmentData.previousDiets = document.getElementById('previousDiets').value;
  }

  if (step === 5) {
    AppState.assessmentData.injuries = document.getElementById('injuries').value;
    AppState.assessmentData.medicalConditions = document.getElementById('medicalConditions').value;
    AppState.assessmentData.medications = document.getElementById('medications').value;
    AppState.assessmentData.exerciseRestrictions = document.getElementById('exerciseRestrictions').value;
    AppState.assessmentData.healthcareAdvice = document.getElementById('healthcareAdvice').value;
    AppState.assessmentData.emergencyContact = document.getElementById('emergencyContact').value;
  }

  if (step === 6) {
    const services = [];
    document.querySelectorAll('#serviceSelection input:checked').forEach(cb => services.push(cb.value));
    AppState.assessmentData.selectedServices = services;
    const mode = document.querySelector('input[name="mode"]:checked');
    AppState.assessmentData.workMode = mode ? mode.value : '';

    // Update booking summary
    updateBookingSummary();
  }

  if (step === 7) {
    AppState.assessmentData.hypnoChange = document.getElementById('hypnoChange').value;
    AppState.assessmentData.hypnoDifferent = document.getElementById('hypnoDifferent').value;
    AppState.assessmentData.hypnoKnow = document.getElementById('hypnoKnow').value;
    AppState.assessmentData.hypnoSense = document.getElementById('hypnoSense').value;
    AppState.assessmentData.hypnoCost = document.getElementById('hypnoCost').value;
    AppState.assessmentData.hypnoPossible = document.getElementById('hypnoPossible').value;
    AppState.assessmentData.hypnoWhen = document.getElementById('hypnoWhen').value;
    AppState.assessmentData.hypnoExceptions = document.getElementById('hypnoExceptions').value;
    AppState.assessmentData.hypnoTried = document.getElementById('hypnoTried').value;
    AppState.assessmentData.hypnoImportance = document.getElementById('hypnoImportance').value;
    AppState.assessmentData.hypnoConfidence = document.getElementById('hypnoConfidence').value;
    AppState.assessmentData.hypnoFuture = document.getElementById('hypnoFuture').value;
    AppState.assessmentData.hypnoInstead = document.getElementById('hypnoInstead').value;
  }

  if (step === 8) {
    AppState.assessmentData.preferredDate = document.getElementById('preferredDate').value;
    AppState.assessmentData.preferredTime = document.getElementById('preferredTime').value;
    AppState.assessmentData.consultationType = document.getElementById('consultationType').value;
    AppState.assessmentData.bookingNotes = document.getElementById('bookingNotes').value;
  }
}

function updateAssessmentUI() {
  const steps = document.querySelectorAll('.assessment-step');
  const indicators = document.querySelectorAll('.assessment-progress-step');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // Show/hide steps
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === AppState.currentStep);
  });

  // Update indicators
  indicators.forEach((ind, index) => {
    ind.classList.remove('active', 'completed');
    const stepNum = parseInt(ind.dataset.step);
    if (stepNum < AppState.currentStep) {
      ind.classList.add('completed');
    } else if (stepNum === AppState.currentStep) {
      ind.classList.add('active');
    }
  });

  // Update buttons
  prevBtn.style.display = AppState.currentStep === 0 ? 'none' : 'flex';

  const visibleSteps = getVisibleSteps();
  const currentVisible = getVisibleStepIndex(AppState.currentStep);

  if (currentVisible === visibleSteps - 1) {
    nextBtn.textContent = 'Finish';
    nextBtn.onclick = finishAssessment;
  } else if (AppState.currentStep === 8) {
    nextBtn.textContent = 'Confirm & Proceed';
    nextBtn.onclick = nextStep;
  } else {
    nextBtn.textContent = 'Continue';
    nextBtn.onclick = nextStep;
  }
}

function updateBookingSummary() {
  const services = AppState.assessmentData.selectedServices || [];
  const serviceNames = services.map(s => {
    const map = {
      'personal-training': 'Personal Training',
      'online-training': 'Online Training',
      'diet-consultation': 'Diet Consultation',
      'contest-prep': 'Contest Preparation',
      'transformation': 'Transformation',
      'hypnotherapy': 'Hypnotherapy',
      'lifestyle': 'Lifestyle / Performance'
    };
    return map[s] || s;
  }).join(', ') || 'Not selected';

  const modeMap = { 'in-person': 'In Person', 'online': 'Online', 'either': 'Either' };
  const mode = modeMap[AppState.assessmentData.workMode] || 'Not selected';

  document.getElementById('summaryService').textContent = serviceNames;
  document.getElementById('summaryMode').textContent = mode;
}

function finishAssessment() {
  saveStepData();
  showToast('Assessment complete! Choose how to submit below.');

  // Show submission options
  const footer = document.getElementById('assessmentFooter');
  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="location.reload()">Start Over</button>
    <a href="${generateWhatsAppLink()}" target="_blank" class="btn btn-whatsapp">Send via WhatsApp</a>
    <a href="${generateEmailLink()}" class="btn btn-primary">Send via Email</a>
  `;
}

function generateWhatsAppLink() {
  const data = AppState.assessmentData;
  const services = (data.selectedServices || []).map(s => {
    const map = {
      'personal-training': 'Personal Training',
      'online-training': 'Online Training',
      'diet-consultation': 'Diet Consultation',
      'contest-prep': 'Contest Preparation',
      'transformation': 'Transformation',
      'hypnotherapy': 'Hypnotherapy',
      'lifestyle': 'Lifestyle / Performance'
    };
    return map[s] || s;
  }).join(', ');

  const goals = (data.primaryGoals || []).join(', ');
  const modeMap = { 'in-person': 'In Person', 'online': 'Online', 'either': 'Either' };

  const message = `Hello Kunaal, I completed the assessment and would like to discuss coaching.

Name: ${data.fullName || ''}
Age: ${data.age || ''}
Phone: ${data.phone || ''}
Email: ${data.email || ''}
Location: ${data.location || ''}

Primary Goal: ${goals || ''}
Services: ${services || ''}
Mode: ${modeMap[data.workMode] || ''}

Preferred Date: ${data.preferredDate || ''}
Preferred Time: ${data.preferredTime || ''}
Consultation Type: ${data.consultationType || ''}

Commitment Level: ${data.commitment || ''}/10

I would like to know the next steps.`;

  return 'https://wa.me/919011101654?text=' + encodeURIComponent(message);
}

function generateEmailLink() {
  const data = AppState.assessmentData;
  const services = (data.selectedServices || []).map(s => {
    const map = {
      'personal-training': 'Personal Training',
      'online-training': 'Online Training',
      'diet-consultation': 'Diet Consultation',
      'contest-prep': 'Contest Preparation',
      'transformation': 'Transformation',
      'hypnotherapy': 'Hypnotherapy',
      'lifestyle': 'Lifestyle / Performance'
    };
    return map[s] || s;
  }).join(', ');

  const goals = (data.primaryGoals || []).join(', ');
  const modeMap = { 'in-person': 'In Person', 'online': 'Online', 'either': 'Either' };

  const subject = `New Coaching Assessment - ${data.fullName || 'Client'}`;

  const body = `COACHING ASSESSMENT SUMMARY

PERSONAL DETAILS
----------------
Name: ${data.fullName || ''}
Age: ${data.age || ''}
Sex: ${data.sex || ''}
Phone: ${data.phone || ''}
WhatsApp: ${data.whatsapp || ''}
Email: ${data.email || ''}
Location: ${data.location || ''}

BODY PROFILE
------------
Height: ${data.height || ''} cm
Weight: ${data.weight || ''} kg
Body Fat: ${data.bodyfat || ''}%
Training Experience: ${data.trainingExp || ''}
Years Training: ${data.yearsTraining || ''}
Activity Level: ${data.activityLevel || ''}

GOALS
-----
Primary Goals: ${goals || ''}
Description: ${data.goalDescription || ''}
Timeline: ${data.timeline || ''}
Barriers: ${data.barriers || ''}
Previously Tried: ${data.triedBefore || ''}
Commitment: ${data.commitment || ''}/10

LIFESTYLE
---------
Occupation: ${data.occupation || ''}
Work Schedule: ${data.workSchedule || ''}
Sleep Duration: ${data.sleepDuration || ''}
Sleep Quality: ${data.sleepQuality || ''}
Stress Level: ${data.stressLevel || ''}
Training Frequency: ${data.trainingFrequency || ''}
Travel Frequency: ${data.travelFreq || ''}
Alcohol: ${data.alcohol || ''}
Smoking: ${data.smoking || ''}

NUTRITION
---------
Diet Preference: ${data.diet || ''}
Allergies: ${data.allergies || ''}
Intolerances: ${data.intolerances || ''}
Foods Avoided: ${data.foodsAvoided || ''}
Restrictions: ${data.restrictions || ''}
Meals Per Day: ${data.mealsPerDay || ''}
Water Intake: ${data.waterIntake || ''}
Supplements: ${data.supplements || ''}

HEALTH & SAFETY
---------------
Injuries: ${data.injuries || ''}
Medical Conditions: ${data.medicalConditions || ''}
Medications: ${data.medications || ''}
Exercise Restrictions: ${data.exerciseRestrictions || ''}
Healthcare Advice: ${data.healthcareAdvice || ''}
Emergency Contact: ${data.emergencyContact || ''}

SERVICE SELECTION
-----------------
Services: ${services || ''}
Work Mode: ${modeMap[data.workMode] || ''}

BOOKING
-------
Preferred Date: ${data.preferredDate || ''}
Preferred Time: ${data.preferredTime || ''}
Consultation Type: ${data.consultationType || ''}
Notes: ${data.bookingNotes || ''}

---
Submitted via kunaal-human-performance.com`;

  return 'mailto:kunaalextraedge@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}

function submitPaymentConfirmation() {
  const transactionId = document.getElementById('transactionId').value;
  const amountPaid = document.getElementById('amountPaid').value;
  const data = AppState.assessmentData;

  const services = (data.selectedServices || []).map(s => {
    const map = {
      'personal-training': 'Personal Training',
      'online-training': 'Online Training',
      'diet-consultation': 'Diet Consultation',
      'contest-prep': 'Contest Preparation',
      'transformation': 'Transformation',
      'hypnotherapy': 'Hypnotherapy',
      'lifestyle': 'Lifestyle / Performance'
    };
    return map[s] || s;
  }).join(', ');

  const message = `Hello Kunaal, I have completed the payment.

Name: ${data.fullName || ''}
Service: ${services || ''}
Amount: ${amountPaid || ''}
Transaction ID / UTR: ${transactionId || ''}
Preferred Appointment: ${data.preferredDate || ''} ${data.preferredTime || ''}
Phone: ${data.phone || ''}
Email: ${data.email || ''}

Please confirm receipt.`;

  window.open('https://wa.me/919011101654?text=' + encodeURIComponent(message), '_blank');
}

// ============================================
// SERVICE MODAL
// ============================================
function openServiceModal(serviceKey) {
  const service = AppState.services[serviceKey];
  if (!service) return;

  AppState.selectedService = serviceKey;

  document.getElementById('modalTitle').innerHTML = `${service.icon} ${service.title}`;
  document.getElementById('modalBody').innerHTML = `
    <h4>Who It Is For</h4>
    <p>${service.who}</p>
    <h4>What It Includes</h4>
    <ul>${service.includes.map(i => `<li>${i}</li>`).join('')}</ul>
    <h4>How It Works</h4>
    <p>${service.how}</p>
    <h4>What You Can Expect</h4>
    <p>${service.expect}</p>
    <h4>Consultation Process</h4>
    <p>${service.process}</p>
  `;

  document.getElementById('serviceModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
  document.getElementById('serviceModal').classList.remove('active');
  document.body.style.overflow = '';
}

function selectServiceFromModal() {
  if (AppState.selectedService) {
    selectService(AppState.selectedService);
  }
}

function selectService(serviceKey) {
  document.getElementById('assessment').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    AppState.currentStep = 6;
    updateAssessmentUI();

    // Auto-check the service
    const checkbox = document.querySelector(`#serviceSelection input[value="${serviceKey}"]`);
    if (checkbox) {
      checkbox.checked = true;
      checkbox.closest('.checkbox-item').classList.add('selected');
    }
  }, 600);
}

// Close modal on overlay click
document.getElementById('serviceModal').addEventListener('click', function(e) {
  if (e.target === this) closeServiceModal();
});

// ============================================
// CHECKBOX / RADIO STYLING
// ============================================
function initCheckboxRadios() {
  document.querySelectorAll('.checkbox-item, .radio-item').forEach(item => {
    const input = item.querySelector('input');
    if (input) {
      input.addEventListener('change', () => {
        if (input.type === 'checkbox') {
          item.classList.toggle('selected', input.checked);
        } else {
          document.querySelectorAll(`input[name="${input.name}"]`).forEach(r => {
            r.closest('.radio-item').classList.toggle('selected', r === input);
          });
        }
      });
    }
  });
}

// ============================================
// DATE INPUT
// ============================================
function initDateInput() {
  const dateInput = document.getElementById('preferredDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .expertise-card, .credibility-card, .method-stage, .about-content p').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeServiceModal();
    closeMobileMenu();
  }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
