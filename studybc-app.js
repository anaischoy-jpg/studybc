(() => {
  const root = document.getElementById('app');
  const data = window.STUDYBC_DATA;
  const progressKey = 'studybc-progress-v2';
  const themeKey = 'studybc-theme';
  const flashcardsKey = 'studybc-custom-flashcards-v1';
  const focusTimer = {
    durationSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
    endsAt: null,
    running: false,
    soundMode: 'rain',
    ambientOn: false,
    audioContext: null,
    noiseSource: null,
    noiseGain: null,
    message: ''
  };
  const progress = { completed: {}, answers: {}, quizAttempts: [], explored: {}, topicNotes: {}, myList: [], lastViewed: null };
  const state = {
    view: 'home',
    courseId: 'fm10',
    lessonId: 'linear-relations',
    lessonTab: 'core',
    grade: 'All',
    subject: 'All',
    search: '',
    commandOpen: false,
    theme: 'light',
    feedback: {},
    reflectionDrafts: {},
    revealedAnswers: {},
    quizCourseId: 'fm10',
    quizUnit: 'All units',
    quizSelections: {},
    tutorCourseId: 'fm10',
    tutorUnit: '',
    tutorPrompt: '',
    tutorBreakdown: null,
    customFlashcards: [],
    flashcardIndex: 0,
    flashcardRevealed: false,
    flashcardNotice: '',
    feedbackDraft: null,
    preparedFeedback: null,
    installHelp: false,
    notice: ''
  };
  let installPrompt = null;
  let focusInterval = null;
  let mathJaxRenderQueue = Promise.resolve();

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
  const keyFor = (courseId, lessonId, questionId) => `${courseId}:${lessonId}:${questionId}`;
  const lessonKey = (courseId, lessonId) => `${courseId}:${lessonId}`;

  function formatTimerTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  }

  function updateFocusTimerDisplay() {
    let completed = false;
    if (focusTimer.running && focusTimer.endsAt) {
      focusTimer.remainingSeconds = Math.max(0, Math.ceil((focusTimer.endsAt - Date.now()) / 1000));
      if (focusTimer.remainingSeconds === 0) {
        focusTimer.running = false;
        focusTimer.endsAt = null;
        focusTimer.message = 'Focus session complete. Take a short break before your next round.';
        stopAmbientSound();
        window.clearInterval(focusInterval);
        focusInterval = null;
        completed = true;
      }
    }

    const display = document.getElementById('focus-time');
    const progressBar = document.getElementById('focus-progress');
    const status = document.getElementById('focus-status');
    if (display) display.textContent = formatTimerTime(focusTimer.remainingSeconds);
    if (progressBar) {
      progressBar.value = focusTimer.durationSeconds - focusTimer.remainingSeconds;
      progressBar.max = focusTimer.durationSeconds;
    }
    if (status) status.textContent = focusTimer.running ? 'Focus session in progress' : focusTimer.message || 'Ready when you are';
    if (completed) render();
  }

  function startFocusTimer() {
    if (focusTimer.remainingSeconds <= 0) focusTimer.remainingSeconds = focusTimer.durationSeconds;
    focusTimer.endsAt = Date.now() + focusTimer.remainingSeconds * 1000;
    focusTimer.running = true;
    focusTimer.message = '';
    if (focusInterval === null) focusInterval = window.setInterval(updateFocusTimerDisplay, 1000);
    updateFocusTimerDisplay();
  }

  function pauseFocusTimer() {
    if (focusTimer.running && focusTimer.endsAt) {
      focusTimer.remainingSeconds = Math.max(0, Math.ceil((focusTimer.endsAt - Date.now()) / 1000));
    }
    focusTimer.running = false;
    focusTimer.endsAt = null;
    window.clearInterval(focusInterval);
    focusInterval = null;
    updateFocusTimerDisplay();
  }

  function setFocusDuration(minutes) {
    pauseFocusTimer();
    focusTimer.durationSeconds = minutes * 60;
    focusTimer.remainingSeconds = focusTimer.durationSeconds;
    focusTimer.message = '';
    updateFocusTimerDisplay();
    render();
  }

  function stopAmbientSound() {
    if (focusTimer.noiseSource) {
      focusTimer.noiseSource.stop();
      focusTimer.noiseSource.disconnect();
      focusTimer.noiseSource = null;
    }
    if (focusTimer.noiseGain) {
      focusTimer.noiseGain.disconnect();
      focusTimer.noiseGain = null;
    }
    focusTimer.ambientOn = false;
  }

  async function startAmbientSound() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      focusTimer.message = 'Ambient audio is not supported in this browser.';
      render();
      return;
    }

    try {
      focusTimer.audioContext ||= new AudioContextClass();
      await focusTimer.audioContext.resume();
      stopAmbientSound();

      const context = focusTimer.audioContext;
      const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
      const samples = buffer.getChannelData(0);
      let brown = 0;
      for (let index = 0; index < samples.length; index += 1) {
        const white = Math.random() * 2 - 1;
        brown = (brown + 0.02 * white) / 1.02;
        samples[index] = focusTimer.soundMode === 'rain' ? white : brown * 3.5;
      }

      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      source.buffer = buffer;
      source.loop = true;
      filter.type = focusTimer.soundMode === 'rain' ? 'bandpass' : 'lowpass';
      filter.frequency.value = focusTimer.soundMode === 'rain' ? 850 : 500;
      filter.Q.value = focusTimer.soundMode === 'rain' ? 0.45 : 0.7;
      gain.gain.value = 0.08;
      source.connect(filter).connect(gain).connect(context.destination);
      source.start();
      focusTimer.noiseSource = source;
      focusTimer.noiseGain = gain;
      focusTimer.ambientOn = true;
      focusTimer.message = `${focusTimer.soundMode === 'rain' ? 'Soft rain' : 'Brown noise'} playing. Adjust your device volume to a comfortable level.`;
      render();
    } catch (error) {
      console.error('StudyBC could not start ambient audio.', error);
      focusTimer.message = 'Ambient audio could not start. Check your browser audio settings and try again.';
      render();
    }
  }

  function showStorageNotice(action) {
    state.notice = `StudyBC could not ${action} your progress in this browser. Your current session still works, but progress may not persist.`;
  }

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(progressKey) || '{}');
      if (saved && typeof saved === 'object') {
        Object.assign(progress, {
          completed: saved.completed && typeof saved.completed === 'object' ? saved.completed : {},
          answers: saved.answers && typeof saved.answers === 'object' ? saved.answers : {},
          quizAttempts: Array.isArray(saved.quizAttempts) ? saved.quizAttempts : [],
          explored: saved.explored && typeof saved.explored === 'object' ? saved.explored : {},
          topicNotes: saved.topicNotes && typeof saved.topicNotes === 'object' ? saved.topicNotes : {},
          myList: Array.isArray(saved.myList) ? saved.myList.filter(id => data.courses.some(course => course.id === id)) : [],
          lastViewed: saved.lastViewed && typeof saved.lastViewed === 'object' ? saved.lastViewed : null
        });
      }
    } catch (error) {
      showStorageNotice('read');
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(progressKey, JSON.stringify(progress));
      state.notice = '';
    } catch (error) {
      showStorageNotice('save');
    }
  }

  function loadCustomFlashcards() {
    try {
      const saved = JSON.parse(localStorage.getItem(flashcardsKey) || '[]');
      state.customFlashcards = Array.isArray(saved)
        ? saved.filter(card => typeof card.front === 'string' && typeof card.back === 'string')
          .slice(0, 500)
          .map(card => ({ front: card.front.slice(0, 500), back: card.back.slice(0, 1500) }))
        : [];
    } catch (error) {
      console.error('StudyBC could not load your custom flashcards.', error);
      state.flashcardNotice = 'Saved flashcards could not be read in this browser.';
    }
  }

  function saveCustomFlashcards() {
    try {
      localStorage.setItem(flashcardsKey, JSON.stringify(state.customFlashcards));
      return true;
    } catch (error) {
      console.error('StudyBC could not save your custom flashcards.', error);
      state.flashcardNotice = 'Flashcards could not be saved. Check available browser storage.';
      return false;
    }
  }

  function parseFlashcardFile(text) {
    const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    if (/^(front|term|question)\s*[,|\t]/i.test(lines[0] || '')) lines.shift();
    return lines.slice(0, 200).map(line => {
      const separator = line.includes('\t') ? '\t' : line.includes('|') ? '|' : ',';
      const parts = [];
      let value = '';
      let quoted = false;
      for (let index = 0; index < line.length; index += 1) {
        const character = line[index];
        if (character === '"' && quoted && line[index + 1] === '"') {
          value += '"';
          index += 1;
        } else if (character === '"') {
          quoted = !quoted;
        } else if (character === separator && !quoted) {
          parts.push(value.trim());
          value = '';
        } else {
          value += character;
        }
      }
      if (quoted) return null;
      parts.push(value.trim());
      const front = (parts.shift() || '').slice(0, 500);
      const back = parts.join(separator).slice(0, 1500);
      return front && back ? { front, back } : null;
    }).filter(Boolean);
  }

  function saveAssessment(attempt) {
    progress.quizAttempts.unshift(attempt);
    progress.quizAttempts = progress.quizAttempts.slice(0, 50);
    saveProgress();
  }

  function courseById(courseId) {
    return data.courses.find(course => course.id === courseId) || data.courses[0];
  }

  function lessonById(course, lessonId) {
    return course.lessons.find(lesson => lesson.id === lessonId) || course.lessons[0] || null;
  }

  function currentCourse() {
    return courseById(state.courseId);
  }

  function currentLesson() {
    return lessonById(currentCourse(), state.lessonId);
  }

  function findUnit(course, lesson) {
    return course.units.find(unit => unit.name === lesson?.unit) || course.units[0];
  }

  function questionId(question, index) {
    return question.id || `question-${index + 1}`;
  }

  function questionState(course, lesson, question, index) {
    const key = keyFor(course.id, lesson.id, questionId(question, index));
    return progress.answers[key] || state.feedback[key] || null;
  }

  function isLessonComplete(course, lesson) {
    if (lesson.published === false) return false;
    if (progress.completed[lessonKey(course.id, lesson.id)]) return true;
    return lesson.practice.length > 0 && lesson.practice.every((question, index) => {
      return questionState(course, lesson, question, index)?.correct;
    });
  }

  function courseProgress(course) {
    const publishedLessons = course.lessons.filter(lesson => lesson.published !== false);
    const completed = publishedLessons.filter(lesson => isLessonComplete(course, lesson)).length;
    const mappedLessons = course.lessons.filter(lesson => lesson.published === false);
    const explored = mappedLessons.filter(lesson => progress.explored[lessonKey(course.id, lesson.id)]).length;
    return {
      completed,
      total: publishedLessons.length,
      mapped: mappedLessons.length,
      explored,
      percent: publishedLessons.length ? Math.round(completed / publishedLessons.length * 100) : 0
    };
  }

  function isInMyList(courseId) {
    return progress.myList.includes(courseId);
  }

  function topicGuideProgress(course) {
    const stats = courseProgress(course);
    return `${stats.explored} of ${stats.mapped} curriculum topics explored`;
  }

  function topicLearningPlan(course, lesson) {
    const area = `${course.area} ${course.title}`.toLowerCase();
    const topic = lesson.title;
    if (/mathematics|math|calculus|statistics/.test(area)) {
      return {
        focus: 'Move from meaning to a mathematical representation, then test whether the representation answers the question.',
        steps: [
          `Define the key words and symbols in “${topic}” in plain language. Identify what is known and what you need to find.`,
          'Represent the idea with a labelled diagram, table, number line, graph, or equation. State what each value and unit means.',
          'Work one example from your course materials line by line. Name the rule used at each step and keep the equals sign balanced.',
          'Check by substituting the result, estimating its size, and explaining why it fits the original situation.'
        ],
        checkpoint: `Without looking at notes, explain the main idea in “${topic},” show a representation, and solve one new example. What check would reveal an error?`
      };
    }
    if (/science|biology|chemistry|physics|earth/.test(area)) {
      return {
        focus: 'Connect a scientific question to a model, observable evidence, and a conclusion with stated limits.',
        steps: [
          `Write a question about “${topic}” and identify the system, organism, substance, or physical quantities involved.`,
          'Define unfamiliar vocabulary and draw or select a model. Label what the model represents and what it leaves out.',
          'Use a worked problem or investigation from your course materials. Record the evidence, units, variables, and reasoning in order.',
          'Explain what the evidence supports, check whether the conclusion follows, and name one limitation or source of uncertainty.'
        ],
        checkpoint: `Explain “${topic}” with a labelled model and evidence. What observation would support your explanation, and what could the model not show?`
      };
    }
    if (/social studies|history|geography|government|politic/.test(area)) {
      return {
        focus: 'Build a historical or civic explanation from context, evidence, and more than one perspective.',
        steps: [
          `Define “${topic}” and place it in its relevant time, place, institutions, or geographic context.`,
          'Identify whose perspectives are represented and whose may be missing. Distinguish a primary source from a later interpretation.',
          'Make a focused claim, select evidence from reliable course sources, and explain how each piece supports the claim.',
          'Consider cause and consequence, continuity and change, and how another perspective might qualify your conclusion.'
        ],
        checkpoint: `Make one evidence-based claim about “${topic}.” Which source supports it, whose perspective does it represent, and what is one limitation?`
      };
    }
    if (/english|language arts|literature|writing/.test(area)) {
      return {
        focus: 'Study how meaning is created, then support an interpretation with specific evidence and clear communication.',
        steps: [
          `Write a plain-language definition of “${topic}” and identify the text, audience, purpose, or situation where it matters.`,
          'Annotate a short passage or example: notice specific words, structure, choices, and their effects rather than only naming a device.',
          'Form an interpretation or claim and support it with precise evidence. Explain the connection in your own words.',
          'Revise for audience, clarity, organization, and accurate citation where sources are used.'
        ],
        checkpoint: `Explain “${topic}” using one precise example from a text or communication task. What evidence supports your interpretation?`
      };
    }
    if (/computer|technology|programming|web development/.test(area)) {
      return {
        focus: 'Translate an idea into a design or procedure, test it with deliberate cases, and revise using evidence.',
        steps: [
          `Describe “${topic}” in plain language and state the user need, problem, or rule it addresses.`,
          'Break the task into inputs, outputs, constraints, and smaller steps. Sketch a diagram, pseudocode, interface, or data representation.',
          'Walk through one example by hand. Record the expected result before testing a tool or implementation.',
          'Test a normal case and an edge case, identify any mismatch, and explain what the test does and does not prove.'
        ],
        checkpoint: `Describe a small example of “${topic}” as inputs, steps, and output. What test case would catch a likely mistake?`
      };
    }
    if (/business|econom|account|finance/.test(area)) {
      return {
        focus: 'Connect choices, constraints, evidence, and quantitative reasoning to a clearly defined situation.',
        steps: [
          `Define “${topic}” and identify the decision-maker, objective, and constraints in an example from your course.`,
          'List relevant quantities, units, assumptions, and who is affected. Separate facts from estimates or opinions.',
          'Work through a course example and show the calculation or reasoning behind the decision.',
          'Compare an alternative, check sensitivity to changed assumptions, and communicate a conclusion with its limits.'
        ],
        checkpoint: `Use “${topic}” to explain a decision. What evidence or calculation supports it, and how might a changed assumption affect your conclusion?`
      };
    }
    if (/language|french|spanish|indigenous/.test(area)) {
      return {
        focus: 'Build meaning across listening, reading, speaking, and writing, using the course’s target language and cultural context.',
        steps: [
          `Identify the vocabulary, grammar pattern, communication task, or cultural idea represented by “${topic}.”`,
          'Find an authentic course example. Notice the context, audience, register, and clues that help you understand unfamiliar language.',
          'Practise retrieving key expressions, then use them in a new spoken or written message rather than only copying the model.',
          'Check meaning and form with course resources, revise errors, and reflect on how cultural context shapes interpretation.'
        ],
        checkpoint: `Use the target language to give one short example related to “${topic}.” Explain the context and check your vocabulary or grammar against course resources.`
      };
    }
    if (/arts|media|textiles|food|design/.test(area)) {
      return {
        focus: 'Connect an intention to choices of materials, techniques, and audience, then reflect on the effect of those choices.',
        steps: [
          `State what “${topic}” means in your course and identify a purpose, audience, or design problem it addresses.`,
          'Study an example and annotate the techniques, materials, elements, or decisions that shape its effect.',
          'Plan a small experiment or draft. Make one deliberate choice and record what you expect it to change.',
          'Review the result against the intention, gather feedback where possible, and explain one revision.'
        ],
        checkpoint: `Create or analyze a small example of “${topic}.” Which choice most affects the result, and what evidence supports your reflection?`
      };
    }
    if (/career|health|physical|wellness/.test(area)) {
      return {
        focus: 'Connect the concept to a realistic situation, practical decision-making, and safe, reliable information.',
        steps: [
          `Describe “${topic}” in plain language and identify a real situation where it is relevant.`,
          'List the people, needs, risks, and reliable information that should be considered before making a decision.',
          'Apply the idea to a specific example. Explain each choice and identify when help from a trusted adult or qualified professional is appropriate.',
          'Reflect on how context, access, and different perspectives may change the best next step.'
        ],
        checkpoint: `Describe a safe, realistic application of “${topic}.” What reliable information would guide the decision, and when would you seek support?`
      };
    }
    return {
      focus: 'Understand the concept, examine an example, and communicate your reasoning in a form suited to this subject.',
      steps: [
        `Define “${topic}” in your own words and identify the course question or context it helps explain.`,
        'Break the topic into smaller ideas. Make a labelled sketch, concept map, sequence, comparison, or other useful representation.',
        'Study one example from your course materials. Describe what happens, why it matters, and how the evidence supports your explanation.',
        'Try a new example, compare it with the first, and revise your explanation based on what changes and what stays the same.'
      ],
      checkpoint: `Explain “${topic}” to a new learner using one example and a visual or other representation. What evidence shows that the explanation is sound?`
    };
  }

  function assessmentQuestions(course, unitName) {
    return course.lessons
      .filter(lesson => lesson.published !== false && (unitName === 'All units' || lesson.unit === unitName))
      .flatMap(lesson => lesson.practice
        .filter(question => question.type === 'multiple-choice' && question.options?.length > 1)
        .map((question, index) => ({ lesson, question, id: questionId(question, index) })));
  }

  function assessmentKey(lesson, questionIdValue) {
    return `${lesson.id}|${questionIdValue}`;
  }

  function renderDiagram(lesson) {
    const diagram = lesson.diagram;
    if (!diagram?.svg) {
      return `<section class="info-box diagram-progress" aria-live="polite"><span class="eyebrow">Custom visual in progress</span><h2>${escapeHtml(lesson.title)}</h2><p>A topic-specific annotated diagram has not been authored for this lesson yet. StudyBC will not substitute a generic graphic.</p></section>`;
    }
    const diagramId = `diagram-${escapeHtml(lesson.id)}`;
    return `<figure class="lesson-diagram info-box"><span class="eyebrow">Topic-specific visual</span><h2 id="${diagramId}-title">${escapeHtml(diagram.title)}</h2><svg viewBox="${escapeHtml(diagram.viewBox || '0 0 620 280')}" role="img" aria-labelledby="${diagramId}-title ${diagramId}-description">${diagram.svg}</svg><figcaption id="${diagramId}-description">${escapeHtml(diagram.caption)}</figcaption></figure>`;
  }

  function renderProgressPage() {
    const gradeOrder = ['10', '11', '12', 'AP'];
    const groupedCourses = gradeOrder.map(grade => ({
      grade,
      courses: data.courses.filter(course => course.grade === grade)
    })).filter(group => group.courses.length);
    const totals = data.courses.reduce((all, course) => {
      const progressForCourse = courseProgress(course);
      all.completed += progressForCourse.completed;
      all.total += progressForCourse.total;
      all.explored += progressForCourse.explored;
      all.mapped += progressForCourse.mapped;
      return all;
    }, { completed: 0, total: 0, explored: 0, mapped: 0 });
    const recentAttempts = progress.quizAttempts.slice(0, 20);
    const attemptsByGrade = gradeOrder.map(grade => ({
      grade,
      attempts: recentAttempts.filter(attempt => courseById(attempt.courseId).grade === grade)
    })).filter(group => group.attempts.length);
    return `<div class="page-shell tool-page">
      <header class="course-header"><div class="course-header-main"><span class="eyebrow">Your learning dashboard</span><h1>Progress tracker</h1><p>Organized by grade. Mastered lessons, curriculum topics that still need full lessons, and quiz scores are tracked separately on this device.</p></div><div class="course-progress-card"><strong>${totals.total ? Math.round(totals.completed / totals.total * 100) : 0}%</strong><span>${totals.completed} of ${totals.total} authored lessons complete</span><div class="progress-track"><span style="width:${totals.total ? Math.round(totals.completed / totals.total * 100) : 0}%"></span></div><small>${totals.mapped} curriculum topics still need full lessons</small></div></header>
      <section class="info-box"><span class="eyebrow">Courses by grade</span><h2>Learning progress</h2>${groupedCourses.map(group => `<section class="grade-progress-group"><h3>${group.grade === 'AP' ? 'Advanced Placement' : `Grade ${group.grade}`}</h3><div class="tracker-list">${group.courses.map(course => {
        const stats = courseProgress(course);
        const percent = stats.percent;
        return `<article class="tracker-row"><div><strong>${escapeHtml(course.title)}</strong><small>${escapeHtml(course.area)} · ${stats.total ? `${stats.completed}/${stats.total} authored lessons` : `${stats.mapped} topics need authored lessons`}${isInMyList(course.id) ? ' · In My list' : ''}</small></div><strong>${stats.total ? `${percent}%` : 'Not started'}</strong><div class="progress-track"><span style="width:${percent}%"></span></div></article>`;
      }).join('')}</div></section>`).join('')}</section>
      <section class="info-box"><span class="eyebrow">Quiz and test results</span><h2>Scores by grade</h2>${recentAttempts.length ? attemptsByGrade.map(group => `<section class="grade-progress-group"><h3>${group.grade === 'AP' ? 'Advanced Placement' : `Grade ${group.grade}`}</h3><div class="tracker-list">${group.attempts.map(attempt => `<article class="tracker-row score-row"><div><strong>${escapeHtml(attempt.courseTitle)} · ${escapeHtml(attempt.label)}</strong><small>${escapeHtml(new Date(attempt.date).toLocaleString())} · ${attempt.correct}/${attempt.total} correct</small></div><strong>${attempt.percent}%</strong></article>`).join('')}</div></section>`).join('') : '<p>No scored assessments yet. Take a unit quiz or course test to see your results here.</p>'}</section>
    </div>`;
  }

  function renderMyListPage() {
    const courses = progress.myList.map(courseById).filter(Boolean);
    const gradeOrder = ['10', '11', '12', 'AP'];
    const groups = gradeOrder.map(grade => ({
      grade,
      courses: courses.filter(course => course.grade === grade)
    })).filter(group => group.courses.length);
    return `<div class="page-shell tool-page">
      <header class="course-header"><div class="course-header-main"><span class="eyebrow">Your personal shortlist</span><h1>My list</h1><p>Courses you want to get to later, organized by grade. Your list is saved in this browser and is separate from completed courses.</p></div><div class="course-progress-card"><strong>${courses.length}</strong><span>${courses.length === 1 ? 'course saved' : 'courses saved'}</span></div></header>
      ${courses.length ? groups.map(group => `<section class="info-box"><span class="eyebrow">${group.grade === 'AP' ? 'Advanced Placement' : `Grade ${group.grade}`}</span><div class="my-list-grid">${group.courses.map(course => `<article class="my-list-card"><div><span class="course-subject">${escapeHtml(course.area)}</span><h2>${escapeHtml(course.title)}</h2><p>${escapeHtml(course.summary)}</p></div><div class="card-actions"><button class="primary-button" type="button" data-open-course="${escapeHtml(course.id)}">Start course</button><button class="secondary-button" type="button" data-toggle-my-list="${escapeHtml(course.id)}">Remove from My list</button></div></article>`).join('')}</div></section>`).join('') : `<section class="info-box my-list-empty"><h2>No courses saved yet</h2><p>Browse the library and choose <strong>＋ My list</strong> on any course you want to study later.</p><button class="primary-button" type="button" data-view="home">Browse courses</button></section>`}
    </div>`;
  }

  function renderQuizPage() {
    const course = courseById(state.quizCourseId);
    const questions = assessmentQuestions(course, state.quizUnit);
    const mode = state.quizUnit === 'All units' ? 'Course test' : 'Unit quiz';
    const latest = state.quizScore;
    return `<div class="page-shell tool-page">
      <header class="course-header"><div class="course-header-main"><span class="eyebrow">Practice and assessment</span><h1>Quizzes & tests</h1><p>Choose a course or unit. Your percentage is based on scored multiple-choice questions, with explanations available in the lesson.</p></div><div class="course-progress-card"><strong>${questions.length}</strong><span>scored questions available</span></div></header>
      <section class="info-box assessment-controls"><label>Course<select id="quiz-course">${data.courses.map(item => `<option value="${escapeHtml(item.id)}" ${item.id === course.id ? 'selected' : ''}>${escapeHtml(item.title)}</option>`).join('')}</select></label><label>Unit or test<select id="quiz-unit"><option value="All units" ${state.quizUnit === 'All units' ? 'selected' : ''}>Full course test</option>${course.units.map(unit => `<option value="${escapeHtml(unit.name)}" ${state.quizUnit === unit.name ? 'selected' : ''}>${escapeHtml(unit.name)} quiz</option>`).join('')}</select></label></section>
      ${latest ? `<section class="score-card" role="status"><span class="eyebrow">Last score</span><strong>${latest.percent}%</strong><p>${latest.correct} of ${latest.total} correct — ${latest.percent >= 80 ? 'strong work; keep building on it.' : 'review the explanations and try again.'}</p><details class="quiz-review"><summary>Review answers and explanations</summary>${(latest.review || []).map((item, index) => `<article class="quiz-review-item"><strong>${index + 1}. ${escapeHtml(item.question)}</strong><p>Your answer: ${escapeHtml(item.selected || 'No answer selected')}</p><p>Correct answer: ${escapeHtml(item.answer)}</p><p>${escapeHtml(item.explanation)}</p></article>`).join('')}</details><button class="secondary-button" type="button" data-clear-quiz>Start a new attempt</button></section>` : ''}
      ${state.quizActive ? `<section class="info-box"><div class="practice-heading"><div><span class="eyebrow">${escapeHtml(mode)}</span><h2>Answer every question</h2></div><span class="question-count">${questions.length} questions</span></div>${questions.length ? `<div class="quiz-question-list">${questions.map((item, index) => {
        const key = assessmentKey(item.lesson, item.id);
        const selected = state.quizSelections[key];
        return `<article class="practice-item"><span class="question-number">Question ${index + 1} · ${escapeHtml(item.lesson.title)}</span><p class="question-prompt">${escapeHtml(item.question.question)}</p><div class="mcq-list">${item.question.options.map((option, optionIndex) => `<button type="button" class="option-button ${selected === optionIndex ? 'selected' : ''}" data-quiz-choice="${escapeHtml(key)}" data-choice="${optionIndex}"><span class="option-letter">${String.fromCharCode(65 + optionIndex)}</span>${escapeHtml(option)}</button>`).join('')}</div></article>`;
      }).join('')}<button class="primary-button" type="button" data-submit-quiz>Submit ${escapeHtml(mode.toLowerCase())}</button></div>` : '<p>There are no scored multiple-choice questions in this selection yet. Try another unit or return to lessons for reflection practice.</p>'}</section>` : `<section class="info-box"><h2>Ready when you are</h2><p>${questions.length ? `${questions.length} scored questions are available. Choose a unit to make a focused quiz, or use the full course test.` : 'This selection has no scored multiple-choice questions yet.'} Reflections are kept in the lesson practice and are not treated as right-or-wrong test answers.</p><button class="primary-button" type="button" data-start-quiz ${questions.length ? '' : 'disabled'}>Start ${escapeHtml(mode.toLowerCase())}</button></section>`}
    </div>`;
  }

  function renderFlashcardsPage() {
    const card = state.customFlashcards[state.flashcardIndex % Math.max(state.customFlashcards.length, 1)];
    return `<div class="page-shell tool-page">
      <header class="course-header"><div class="course-header-main"><span class="eyebrow">Your classroom materials</span><h1>My flashcards</h1><p>Create cards from class notes or import a TXT/CSV file. Content stays in this browser and is not uploaded to StudyBC.</p></div><div class="course-progress-card"><strong>${state.customFlashcards.length}</strong><span>custom cards saved</span></div></header>
      <section class="info-box flashcard-tools">
        <form class="flashcard-form" id="custom-flashcard-form"><label for="flashcard-front">Front</label><textarea id="flashcard-front" name="front" rows="2" maxlength="500" required placeholder="Term, question, formula, or prompt"></textarea><label for="flashcard-back">Back</label><textarea id="flashcard-back" name="back" rows="3" maxlength="1500" required placeholder="Definition, answer, or explanation"></textarea><button class="primary-button" type="submit">Add flashcard</button></form>
        <form class="flashcard-upload-form" id="flashcard-upload-form"><label for="flashcard-file">Import cards (.txt or .csv)</label><input id="flashcard-file" type="file" accept=".txt,.csv,text/plain,text/csv" required><p class="content-note">One card per line: front,back (or use a tab or |). CSV headers such as front,back are optional.</p><button class="secondary-button" type="submit">Import file</button></form>
      </section>
      ${state.flashcardNotice ? `<p class="storage-notice" role="status">${escapeHtml(state.flashcardNotice)}</p>` : ''}
      ${card ? `<section class="info-box flashcard-review"><div class="practice-heading"><div><span class="eyebrow">Active recall</span><h2>Card ${state.flashcardIndex % state.customFlashcards.length + 1} of ${state.customFlashcards.length}</h2></div><span class="question-count">Your material</span></div><article class="custom-flashcard" aria-live="polite"><span class="eyebrow">${state.flashcardRevealed ? 'Answer' : 'Prompt'}</span><p>${escapeHtml(state.flashcardRevealed ? card.back : card.front)}</p></article><div class="flashcard-actions">${state.flashcardRevealed ? `<button class="secondary-button" type="button" data-flashcard-action="again">Review again</button><button class="primary-button" type="button" data-flashcard-action="next">Got it · next</button>` : `<button class="primary-button" type="button" data-flashcard-action="reveal">Reveal answer</button>`}</div><details class="custom-card-list"><summary>Manage ${state.customFlashcards.length} saved cards</summary><ul>${state.customFlashcards.map((item, index) => `<li><span><strong>${escapeHtml(item.front)}</strong><small>${escapeHtml(item.back)}</small></span><button class="secondary-button" type="button" data-delete-flashcard="${index}" aria-label="Delete ${escapeHtml(item.front)}">Delete</button></li>`).join('')}</ul></details></section>` : `<section class="info-box"><h2>No custom cards yet</h2><p>Add one above or import a class-notes file to start practicing.</p></section>`}
    </div>`;
  }

  function renderTutorPage() {
    const course = courseById(state.tutorCourseId);
    const unitName = state.tutorUnit || course.units[0]?.name || '';
    const lessons = course.lessons.filter(lesson => lesson.unit === unitName && lesson.published !== false);
    return `<div class="page-shell tool-page">
      <header class="course-header"><div class="course-header-main"><span class="eyebrow">Offline lesson finder</span><h1>Find a lesson</h1><p>Search published lesson titles and teaching content in this course. This tool links to existing material; it does not generate lessons or study plans.</p></div><div class="course-progress-card"><strong><i class="fa-solid fa-book-open"></i></strong><span>Topic-specific instruction</span></div></header>
      <form class="info-box tutor-form" id="tutor-form"><div class="assessment-controls"><label>Course<select id="tutor-course">${data.courses.map(item => `<option value="${escapeHtml(item.id)}" ${item.id === course.id ? 'selected' : ''}>${escapeHtml(item.title)}</option>`).join('')}</select></label><label>Unit<select id="tutor-unit">${course.units.map(unit => `<option value="${escapeHtml(unit.name)}" ${unit.name === unitName ? 'selected' : ''}>${escapeHtml(unit.name)}</option>`).join('')}</select></label></div><label for="tutor-prompt">What topic or idea are you looking for?</label><textarea id="tutor-prompt" rows="3" placeholder="For example: solving a system of equations" required>${escapeHtml(state.tutorPrompt)}</textarea><button class="primary-button" type="submit">Find lessons</button></form>
      ${state.tutorBreakdown ? `<section class="info-box tutor-response" aria-live="polite"><span class="eyebrow">Published lesson results</span><h2>${escapeHtml(state.tutorBreakdown.title)}</h2>${state.tutorBreakdown.lessons.length ? `<div class="lesson-list">${state.tutorBreakdown.lessons.map(lesson => `<button type="button" class="lesson-row" data-open-lesson="${escapeHtml(course.id)}|${escapeHtml(lesson.id)}"><span><strong>${escapeHtml(lesson.title)}</strong><small>${escapeHtml(lesson.time)} · explanations, examples, and practice</small></span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>`).join('')}</div>` : ''}<p class="content-note">${escapeHtml(state.tutorBreakdown.note)}</p></section>` : `<section class="info-box"><h2>Search course instruction</h2><p>Results include only published lessons with actual teaching material. Curriculum outlines are not offered as substitutes for lessons.</p></section>`}
      <section class="info-box"><span class="eyebrow">Published in this unit</span><h2>${escapeHtml(unitName || 'No units available')}</h2><div class="unit-topic-chips">${lessons.map(lesson => `<span>${escapeHtml(lesson.title)}</span>`).join('') || '<p>No full lessons have been published for this unit yet.</p>'}</div></section>
    </div>`;
  }

  function renderAboutPage() {
    return `<div class="page-shell tool-page about-page">
      <header class="hero-panel"><span class="eyebrow">About StudyBC</span><h1>Learning should feel possible, one clear step at a time.</h1><p class="hero-copy">StudyBC is an independent self-study space designed to make BC and AP course topics easier to explore, understand, and practice.</p></header>
      <section class="info-box"><span class="eyebrow">Why we’re here</span><h2>Our goal</h2><p>Help learners build confidence through approachable explanations, visible learning pathways, worked reasoning, and practice with useful feedback—without assuming everyone starts with the same background or pace.</p></section>
      <section class="info-box"><span class="eyebrow">What guides the project</span><h2>Values</h2><div class="value-grid"><article><strong>Clarity</strong><p>Start with plain-language foundations and make each step understandable.</p></article><article><strong>Curiosity</strong><p>Connect ideas to examples, questions, and real situations.</p></article><article><strong>Honesty</strong><p>Mark curriculum outlines separately from fully authored lessons, and show how scores are calculated.</p></article><article><strong>Access</strong><p>Support self-paced learning across devices, with progress stored locally in the learner’s browser.</p></article></div></section>
      <section class="info-box"><span class="eyebrow">Curriculum coverage</span><h2>Topic access and lesson depth</h2><p>StudyBC separates full lessons with explanations, worked examples, and practice from curriculum topics whose lesson content is still being written. An outline is not presented as a lesson. Use the official BC curriculum to check course standards.</p></section>
    </div>`;
  }

  function renderSourcesPage() {
    return `<div class="page-shell tool-page">
      <header class="course-header"><div class="course-header-main"><span class="eyebrow"><i class="fa-solid fa-book-open" aria-hidden="true"></i> Attribution & alignment</span><h1>Sources</h1><p>See what StudyBC uses for curriculum alignment and what can—and cannot—be verified about the bundled questions.</p></div><div class="course-progress-card"><strong><i class="fa-solid fa-link" aria-hidden="true"></i></strong><span>Source transparency</span></div></header>
      <section class="info-box source-card"><span class="eyebrow">Official curriculum references</span><h2>Curriculum alignment</h2><ul class="source-list">
        <li><a href="https://curriculum.gov.bc.ca/" target="_blank" rel="noopener noreferrer">British Columbia Curriculum</a><p>The official provincial curriculum site. StudyBC’s supplied map is used as a planning and alignment reference; it does not certify that every standard has a complete lesson.</p></li>
        <li><a href="https://apcentral.collegeboard.org/courses" target="_blank" rel="noopener noreferrer">College Board AP Central — Courses</a><p>Official course frameworks and AP course information for the AP subjects represented in the StudyBC catalog.</p></li>
      </ul></section>
      <section class="info-box source-card"><span class="eyebrow">Textbooks & workbooks</span><h2>No verified book citations are available</h2><p>The bundled question data does not include title, author, edition, page, or question-level attribution for commercial textbooks or workbooks. StudyBC therefore cannot truthfully list a textbook as the source of a question. No textbook titles are being attributed here by guesswork.</p><p>The bundled lesson and question provenance is not documented at item level, so this page does not claim that every existing item was independently authored or adapted from a specific publication. Before naming a textbook or workbook as a source, its use must be verified and its bibliographic details recorded. New lesson material should be written for StudyBC and aligned to the curriculum rather than copied from commercial texts.</p></section>
      <section class="info-box source-card"><span class="eyebrow">Video references</span><h2>Optional visual explanations</h2><p>Lesson video buttons open a YouTube search for the course and topic. Results are third-party material selected by YouTube; StudyBC does not claim authorship or endorsement. A dedicated StudyBC channel can be linked after one exists.</p></section>
    </div>`;
  }

  function renderFocusTimerPage() {
    const presets = [{ minutes: 25, label: 'Focus · 25 min' }, { minutes: 50, label: 'Deep focus · 50 min' }, { minutes: 5, label: 'Short break · 5 min' }];
    return `<div class="page-shell tool-page focus-page">
      <header class="course-header"><div class="course-header-main"><span class="eyebrow"><i class="fa-regular fa-clock" aria-hidden="true"></i> Study rhythm</span><h1>Focus timer</h1><p>Work in a focused block, then take a deliberate break. The timer keeps running while you browse StudyBC.</p></div><div class="course-progress-card"><strong><i class="fa-solid fa-hourglass-half" aria-hidden="true"></i></strong><span>One task at a time</span></div></header>
      <section class="info-box focus-timer-card">
        <div class="focus-illustration" aria-hidden="true"><svg viewBox="0 0 360 150"><path d="M26 112C74 109 75 40 122 42s52 67 95 64 48-40 75-42 31 16 42 17" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><circle cx="122" cy="42" r="9" fill="currentColor"/><circle cx="217" cy="106" r="9" fill="currentColor"/><circle cx="292" cy="64" r="9" fill="currentColor"/></svg><span><i class="fa-solid fa-book-open" aria-hidden="true"></i> Focus</span><span><i class="fa-solid fa-mug-hot" aria-hidden="true"></i> Break</span></div>
        <div class="focus-clock" role="timer" aria-label="Focus timer"><span id="focus-time">${formatTimerTime(focusTimer.remainingSeconds)}</span><progress id="focus-progress" max="${focusTimer.durationSeconds}" value="${focusTimer.durationSeconds - focusTimer.remainingSeconds}">0%</progress></div>
        <p id="focus-status" class="focus-status" role="status" aria-live="polite">${escapeHtml(focusTimer.running ? 'Focus session in progress' : focusTimer.message || 'Ready when you are')}</p>
        <div class="focus-presets" aria-label="Timer duration">${presets.map(preset => `<button class="secondary-button ${focusTimer.durationSeconds === preset.minutes * 60 ? 'selected' : ''}" type="button" data-focus-duration="${preset.minutes}" aria-pressed="${focusTimer.durationSeconds === preset.minutes * 60}">${preset.label}</button>`).join('')}</div>
        <div class="focus-controls"><button class="primary-button" type="button" data-focus-action="start" ${focusTimer.running ? 'disabled' : ''}><i class="fa-solid fa-play" aria-hidden="true"></i> Start</button><button class="secondary-button" type="button" data-focus-action="pause" ${focusTimer.running ? '' : 'disabled'}><i class="fa-solid fa-pause" aria-hidden="true"></i> Pause</button><button class="secondary-button" type="button" data-focus-action="reset"><i class="fa-solid fa-rotate-left" aria-hidden="true"></i> Reset</button></div>
      </section>
      <section class="info-box ambient-card"><span class="eyebrow"><i class="fa-solid fa-headphones" aria-hidden="true"></i> Optional ambient sound</span><h2>Soft background audio</h2><p>Rain and brown-noise textures are generated in your browser; no audio is downloaded or streamed. Playback starts only when you turn it on. Keep the volume comfortable.</p><div class="ambient-controls"><label>Sound<select id="focus-sound"><option value="rain" ${focusTimer.soundMode === 'rain' ? 'selected' : ''}>Gentle rain</option><option value="brown" ${focusTimer.soundMode === 'brown' ? 'selected' : ''}>Soft brown noise</option></select></label><button class="secondary-button" type="button" data-toggle-ambient aria-pressed="${focusTimer.ambientOn}"><i class="fa-solid ${focusTimer.ambientOn ? 'fa-volume-high' : 'fa-volume-xmark'}" aria-hidden="true"></i> ${focusTimer.ambientOn ? 'Turn sound off' : 'Play soft sound'}</button></div><p class="content-note">Audio is synthesized locally and is not a recording of real rain.</p></section>
      <section class="info-box"><span class="eyebrow">A gentle routine</span><h2>Make the block count</h2><ol class="focus-routine"><li>Choose one lesson or one small goal.</li><li>Put distracting tabs and notifications away.</li><li>When the timer ends, stretch and decide what to study next.</li></ol></section>
    </div>`;
  }

  function renderVideoReference(course, lesson) {
    const query = encodeURIComponent(`${course.title} ${lesson.unit} ${lesson.title} explained`);
    return `<section class="video-reference info-box"><div class="video-reference-art" aria-hidden="true"><i class="fa-brands fa-youtube"></i><span>Watch · See · Review</span></div><div class="video-reference-copy"><span class="eyebrow">A visual alternative</span><h2>Explore video explanations</h2><p>Open YouTube results for this topic if you prefer to learn by watching. Check the creator and details before relying on a video.</p><a class="secondary-button" href="https://www.youtube.com/results?search_query=${query}" target="_blank" rel="noopener noreferrer">Search YouTube for this lesson <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a><small>Third-party results; not a StudyBC channel link or endorsement.</small></div></section>`;
  }

  function subjectIcon(area) {
    const subject = String(area || '').toLowerCase();
    if (/math|calculus|statistics/.test(subject)) return 'fa-calculator';
    if (/science|biology|chemistry|physics/.test(subject)) return 'fa-flask';
    if (/computer|technology/.test(subject)) return 'fa-laptop-code';
    if (/econom|business|account/.test(subject)) return 'fa-chart-line';
    if (/english|language|literature/.test(subject)) return 'fa-book-open';
    if (/social|history|geography/.test(subject)) return 'fa-earth-americas';
    return 'fa-graduation-cap';
  }

  function renderInstallHelp() {
    if (!state.installHelp) return '';
    return `<section class="install-help info-box" role="dialog" aria-modal="true" aria-labelledby="install-help-title"><button class="install-help-close" type="button" data-close-install aria-label="Close install instructions">×</button><span class="eyebrow">Install StudyBC</span><h2 id="install-help-title">Add the app to your device</h2><p>StudyBC can be installed from its secure website. When installed, it opens in its own app window and its core study pages can be available offline.</p><div class="install-instructions"><article><strong>iPhone or iPad</strong><p>Open the StudyBC site in Safari → tap Share → choose <b>Add to Home Screen</b> → tap Add.</p></article><article><strong>Mac or computer</strong><p>Open the site in Chrome or Edge and use the install icon in the address bar/menu. In Safari on Mac, use <b>File → Add to Dock</b> where available.</p></article></div><p class="content-note">Installation requires StudyBC to be served from HTTPS (or localhost during development). iPhone/iPad installation is done through Safari, not an App Store download.</p><button class="secondary-button" type="button" data-close-install>Got it</button></section><button class="install-help-backdrop" type="button" data-close-install aria-label="Close install instructions"></button>`;
  }

  function renderFeedbackPage() {
    const draft = state.feedbackDraft || {};
    return `<div class="page-shell tool-page">
      <header class="course-header"><div class="course-header-main"><span class="eyebrow">Help improve StudyBC</span><h1>Feedback</h1><p>Share a correction, suggest a topic, or tell us what made a lesson easier or harder to use.</p></div></header>
      <form class="info-box feedback-form" id="feedback-form"><label>Your name (optional)<input name="name" autocomplete="name" value="${escapeHtml(draft.name || '')}"></label><label>Your email (optional)<input name="replyTo" type="email" autocomplete="email" value="${escapeHtml(draft.replyTo || '')}"></label><label>Feedback type<select name="category">${['Content correction', 'Lesson request', 'Accessibility or usability', 'Other feedback'].map(category => `<option ${draft.category === category ? 'selected' : ''}>${category}</option>`).join('')}</select></label><label>Message<textarea name="message" rows="6" required>${escapeHtml(draft.message || '')}</textarea></label><p class="content-note">Your email app will open with a draft addressed to anaischoy@gmail.com. StudyBC does not send or store the message.</p><button class="primary-button" type="submit">Prepare feedback email</button>${state.preparedFeedback ? `<a class="secondary-button email-draft-link" href="${escapeHtml(state.preparedFeedback)}">Open prepared email</a>` : ''}</form>
    </div>`;
  }

  function setTheme(theme, persist = true) {
    state.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    if (persist) {
      try {
        localStorage.setItem(themeKey, theme);
      } catch (error) {
        showStorageNotice('save your display preference');
      }
    }
  }

  function searchText(course, lesson) {
    if (lesson.published === false) {
      return [course.title, course.area, lesson.title, lesson.unit].join(' ').toLowerCase();
    }
    const parts = [course.title, course.area, course.code, course.summary, lesson.title, lesson.unit, ...lesson.goals, ...lesson.summary, ...lesson.cheatSheet];
    lesson.vocabulary.forEach(item => parts.push(item.term, item.definition));
    lesson.sections.forEach(section => parts.push(section.heading, section.content));
    lesson.examples.forEach(item => parts.push(item.prompt, item.answer, ...item.steps));
    lesson.practice.forEach(item => parts.push(item.question, item.answer, item.explanation, ...(item.options || [])));
    return parts.join(' ').toLowerCase();
  }

  function matchingLessons(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return data.courses.flatMap(course => course.lessons
      .filter(lesson => searchText(course, lesson).includes(q))
      .map(lesson => ({ course, lesson })))
      .slice(0, 12);
  }

  function getVisibleCourses() {
    const query = state.search.trim().toLowerCase();
    return data.courses.filter(course => {
      const gradeMatch = state.grade === 'All' || course.grade === state.grade;
      const subjectMatch = state.subject === 'All' || course.area === state.subject;
      const queryMatch = !query || course.title.toLowerCase().includes(query) ||
        course.summary.toLowerCase().includes(query) ||
        course.lessons.some(lesson => searchText(course, lesson).includes(query));
      return gradeMatch && subjectMatch && queryMatch;
    });
  }

  function openCourse(courseId) {
    const course = courseById(courseId);
    state.view = 'course';
    state.courseId = course.id;
    state.lessonId = course.lessons[0]?.id || '';
    progress.lastViewed = { courseId: course.id, lessonId: state.lessonId };
    saveProgress();
    state.search = '';
    state.commandOpen = false;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openLesson(courseId, lessonId) {
    const course = courseById(courseId);
    const lesson = lessonById(course, lessonId);
    if (!lesson) return;
    state.view = 'lesson';
    state.courseId = course.id;
    state.lessonId = lesson.id;
    state.lessonTab = 'core';
    progress.lastViewed = { courseId: course.id, lessonId: lesson.id };
    saveProgress();
    state.search = '';
    state.commandOpen = false;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function lessonLink(course, lesson, extraClass = '') {
    const complete = lesson.published !== false && isLessonComplete(course, lesson);
    return `<button type="button" class="tree-link ${extraClass}" data-open-lesson="${escapeHtml(course.id)}|${escapeHtml(lesson.id)}">
      <span>${escapeHtml(lesson.title)}</span><span class="tree-check" aria-label="${lesson.published === false ? 'Lesson content in progress' : complete ? 'Completed' : 'Not yet complete'}">${complete ? '✓' : ''}</span>
    </button>`;
  }

  function renderSidebar() {
    const course = currentCourse();
    const lesson = currentLesson();
    return `<aside class="sidebar" aria-label="Course lessons">
      <div class="sidebar-header">
        <div class="brand-mark small" aria-hidden="true">B</div>
        <div><span class="eyebrow">StudyBC • ${escapeHtml(course.grade)}</span><strong>${escapeHtml(course.title)}</strong></div>
      </div>
      <button class="sidebar-course-link" type="button" data-open-course="${escapeHtml(course.id)}">Course overview</button>
      <nav class="sidebar-tree">
        ${course.units.map(unit => {
          const unitLessons = course.lessons.filter(item => item.unit === unit.name);
          const groups = unit.subunits?.length ? unit.subunits : [{ name: '', lessonIds: unitLessons.map(item => item.id) }];
          const groupedIds = new Set(groups.flatMap(group => group.lessonIds || []));
          const looseLessons = unitLessons.filter(item => !groupedIds.has(item.id) && !groups.some(group => group.name && item.subunit === group.name));
          return `<section class="tree-section">
          <div class="tree-label">${escapeHtml(unit.name)}</div>
          ${groups.map(group => {
            const groupLessons = unitLessons.filter(item => (group.lessonIds || []).includes(item.id) || (group.name && item.subunit === group.name));
            return `${group.name ? `<div class="tree-subunit-label">${escapeHtml(group.name)}</div>` : ''}<div class="tree-children">${groupLessons.map(item =>
              lessonLink(course, item, item.id === lesson?.id && state.view === 'lesson' ? 'selected' : '')
            ).join('') || '<span class="tree-empty">No topics mapped in this subunit.</span>'}</div>`;
          }).join('')}
          ${looseLessons.length ? `<div class="tree-subunit-label">Additional lessons</div><div class="tree-children">${looseLessons.map(item => lessonLink(course, item, item.id === lesson?.id && state.view === 'lesson' ? 'selected' : '')).join('')}</div>` : ''}
        </section>`;
        }).join('')}
      </nav>
      <div class="sidebar-progress">
        <div class="progress-label"><span>Your progress</span><strong>${courseProgress(course).percent}%</strong></div>
        <div class="progress-track"><span style="width:${courseProgress(course).percent}%"></span></div>
        <small>${courseProgress(course).completed} of ${courseProgress(course).total} authored lessons complete · ${courseProgress(course).mapped} topics still need full lessons</small>
      </div>
    </aside>`;
  }

  function searchBox(id, placeholder, className = '') {
    return `<label class="search-wrap ${className}">
      <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
      <input id="${id}" type="search" value="${escapeHtml(state.search)}" placeholder="${escapeHtml(placeholder)}" aria-label="Search all StudyBC lessons and concepts" autocomplete="off" />
    </label>`;
  }

  function renderSearchResults(query) {
    const matches = matchingLessons(query);
    if (!query.trim()) return '';
    return `<div class="search-results" role="region" aria-label="Search results">
      <div class="search-result-heading">${matches.length ? `${matches.length} lesson matches` : 'No lesson matches yet'}</div>
      ${matches.map(({ course, lesson }) => `<button class="search-result" type="button" data-open-lesson="${escapeHtml(course.id)}|${escapeHtml(lesson.id)}">
        <span><strong>${escapeHtml(lesson.title)}</strong><small>${escapeHtml(course.title)} · ${escapeHtml(lesson.unit)}</small></span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </button>`).join('')}
    </div>`;
  }

  function renderHome() {
    const courses = getVisibleCourses();
    const activeCourses = data.courses.filter(course => course.lessons.some(lesson => lesson.published !== false));
    const completedCount = activeCourses.reduce((total, course) => total + courseProgress(course).completed, 0);
    const lessonCount = activeCourses.reduce((total, course) => total + course.lessons.filter(lesson => lesson.published !== false).length, 0);
    const mappedCount = data.courses.reduce((total, course) => total + courseProgress(course).mapped, 0);
    const exploredCount = data.courses.reduce((total, course) => total + courseProgress(course).explored, 0);
    const myCourses = progress.myList.map(courseById).filter(Boolean);
    const subjects = [...new Set(data.courses.map(course => course.area))];
    const resumeCourse = courseById(progress.lastViewed?.courseId || state.courseId);
    const resumeLesson = lessonById(resumeCourse, progress.lastViewed?.lessonId || state.lessonId);

    return `<div class="page-shell">
      <section class="hero-panel">
        <div class="hero-top">
          <div class="brand-lockup"><div class="brand-mark">B</div><div><span class="eyebrow">Your independent study space</span><h1>Understand it. Practice it. Own it.</h1></div></div>
          <div class="hero-stat"><strong>${data.courses.length}</strong><span>courses mapped</span></div>
        </div>
        <p class="hero-copy">Begin with the foundations, follow worked examples, and build confidence one idea at a time.</p>
        ${searchBox('study-search', 'Search lessons, formulas, and concepts')}
        ${renderSearchResults(state.search)}
        <div class="filter-row">
          <div class="grade-pills" aria-label="Filter by grade">${['All', ...data.grades].map(grade =>
            `<button class="pill ${state.grade === grade ? 'active' : ''}" data-grade="${escapeHtml(grade)}" type="button">${grade === 'All' ? 'All grades' : grade === 'AP' ? 'AP' : `Grade ${grade}`}</button>`
          ).join('')}</div>
          <label class="subject-filter"><span>Subject</span><select id="subject-filter" aria-label="Filter by subject">
            <option value="All">All subjects</option>
            ${subjects.map(subject => `<option value="${escapeHtml(subject)}" ${state.subject === subject ? 'selected' : ''}>${escapeHtml(subject)}</option>`).join('')}
          </select></label>
        </div>
      </section>

      <section class="continue-panel">
        <div><span class="eyebrow">Pick up where you left off</span><h2>${escapeHtml(resumeLesson?.title || resumeCourse.title)}</h2><p>${escapeHtml(resumeCourse.title)} · ${escapeHtml(resumeLesson?.unit || 'Course overview')}</p></div>
        <button class="primary-button" type="button" data-open-lesson="${escapeHtml(resumeCourse.id)}|${escapeHtml(resumeLesson?.id || '')}">Continue learning <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
      </section>

      <section class="progress-overview" aria-label="Overall learning progress">
        <div><span class="eyebrow">Your learning</span><strong>${completedCount} <span>/ ${lessonCount}</span></strong><p>lessons completed across all courses</p></div>
        <div class="progress-track"><span style="width:${lessonCount ? Math.round(completedCount / lessonCount * 100) : 0}%"></span></div>
      </section>
      <section class="topic-progress-strip"><span>${mappedCount} curriculum topics still need complete lessons</span><button class="secondary-button" type="button" data-view="progress">View organized progress</button></section>

      <section class="my-list-section">
        <div class="section-heading"><div><span class="eyebrow">Plan ahead</span><h2>My list</h2></div><span>${myCourses.length} saved</span></div>
        <p class="catalog-note">Save courses you want to get to later. Your list is private to this browser and stays separate from course mastery.</p>
        ${myCourses.length ? `<div class="my-list-grid">${myCourses.map(course => `<article class="my-list-card"><div><span class="grade-chip">${course.grade === 'AP' ? 'AP' : `Grade ${escapeHtml(course.grade)}`}</span><span class="course-subject">${escapeHtml(course.area)}</span><h3>${escapeHtml(course.title)}</h3></div><div class="card-actions"><button class="primary-button" type="button" data-open-course="${escapeHtml(course.id)}">Open course</button><button class="secondary-button" type="button" data-toggle-my-list="${escapeHtml(course.id)}">Remove</button></div></article>`).join('')}</div>` : '<div class="empty-state my-list-empty"><strong>Your list is ready when you are.</strong><p>Save any course from the library to keep it here for later.</p></div>'}
      </section>

      <section class="course-results">
        <div class="section-heading"><div><span class="eyebrow">Browse the library</span><h2>Courses</h2></div><span>${courses.length} ${courses.length === 1 ? 'course' : 'courses'}</span></div>
        <p class="catalog-note">Full lessons include explanations, worked examples, and practice. Curriculum outline entries are clearly identified until their lesson content is written. Official links let you check the complete standards.</p>
        ${courses.length ? `<div class="course-grid">${courses.map(course => {
          const stats = courseProgress(course);
          return `<article class="course-card">
            <div class="course-card-art" aria-hidden="true"><i class="fa-solid ${subjectIcon(course.area)}"></i><span>${escapeHtml(course.area)}</span></div>
            <div class="card-topline"><span class="grade-chip">${course.grade === 'AP' ? 'AP' : `Grade ${escapeHtml(course.grade)}`}</span><span class="course-subject">${escapeHtml(course.area)}</span><span class="catalog-badge ${stats.total ? 'active' : 'mapped'}">${stats.total ? 'Lessons & curriculum map' : 'Curriculum outline'}</span></div>
            <h3>${escapeHtml(course.title)}</h3><p>${escapeHtml(course.summary)}</p>
            <div class="course-card-progress"><div class="progress-label"><span>${stats.total ? `${stats.completed} of ${stats.total} authored lessons` : 'Full lessons not yet authored'}</span><strong>${stats.total ? `${stats.percent}%` : 'Outline'}</strong></div><div class="progress-track"><span style="width:${stats.percent}%"></span></div>${stats.mapped ? `<small class="mapped-count">${stats.mapped} curriculum topics still need full lessons</small>` : ''}</div>
            <div class="card-actions"><button class="primary-button" type="button" data-open-course="${escapeHtml(course.id)}">Explore course</button>
              ${course.lessons[0] ? `<button class="secondary-button" type="button" data-open-lesson="${escapeHtml(course.id)}|${escapeHtml(course.lessons[0].id)}">Start a lesson</button>` : ''}
              <button class="secondary-button list-toggle ${isInMyList(course.id) ? 'saved' : ''}" type="button" data-toggle-my-list="${escapeHtml(course.id)}" aria-pressed="${isInMyList(course.id)}">${isInMyList(course.id) ? 'In My list' : '＋ My list'}</button>
            </div>
          </article>`;
        }).join('')}</div>` : `<div class="empty-state"><h3>No matching courses</h3><p>Try a different search or remove a filter.</p><button class="secondary-button" data-reset-filters type="button">Reset filters</button></div>`}
      </section>
    </div>`;
  }

  function renderCourseOverview(course) {
    const stats = courseProgress(course);
    return `<div class="page-shell">
      <header class="course-header"><div class="course-header-main"><span class="eyebrow">${escapeHtml(course.grade === 'AP' ? 'AP' : `Grade ${course.grade}`)} · ${escapeHtml(course.area)} · ${escapeHtml(course.code)}</span><h1>${escapeHtml(course.title)}</h1><p>${escapeHtml(course.summary)}</p></div>
        <div class="course-progress-card"><strong>${stats.total ? `${stats.percent}%` : `${stats.mapped}`}</strong><span>${stats.total ? `${stats.completed} of ${stats.total} authored lessons complete` : 'topics need full lessons'}${stats.mapped ? ` · ${stats.mapped} curriculum topics still in outline form` : ''}</span><div class="progress-track"><span style="width:${stats.percent}%"></span></div><button class="secondary-button list-toggle ${isInMyList(course.id) ? 'saved' : ''}" type="button" data-toggle-my-list="${escapeHtml(course.id)}" aria-pressed="${isInMyList(course.id)}">${isInMyList(course.id) ? '✓ In My list' : '＋ Add to My list'}</button></div>
      </header>
      <div class="course-layout">
        <section class="summary-stack">
          <div class="info-box"><span class="eyebrow">Course guide</span><h2>Big ideas</h2>${course.bigIdeas.map(idea => `<article class="idea-item"><strong>${escapeHtml(idea.title)}</strong><p>${escapeHtml(idea.detail)}</p></article>`).join('')}</div>
          <div class="info-box"><span class="eyebrow">Learning pathway</span><h2>Units & lessons</h2><div class="unit-list">
            ${course.units.map((unit, index) => {
              const unitLessons = course.lessons.filter(lesson => lesson.unit === unit.name);
              const groups = unit.subunits?.length ? unit.subunits : [{ name: '', lessonIds: unitLessons.map(lesson => lesson.id) }];
              const groupedIds = new Set(groups.flatMap(group => group.lessonIds || []));
              const looseLessons = unitLessons.filter(lesson => !groupedIds.has(lesson.id) && !groups.some(group => group.name && lesson.subunit === group.name));
              const unitPublished = unitLessons.filter(lesson => lesson.published !== false);
              const unitCompleted = unitPublished.filter(lesson => isLessonComplete(course, lesson)).length;
              const unitPercent = unitPublished.length ? Math.round(unitCompleted / unitPublished.length * 100) : 0;
              return `<section class="unit-card"><div class="unit-header"><h3><span class="unit-number">${String(index + 1).padStart(2, '0')}</span>${escapeHtml(unit.name)}</h3><span>${unitLessons.length} topics</span></div><p>${escapeHtml(unit.summary)}</p>
              ${unitPublished.length ? `<div class="unit-progress"><div class="progress-label"><span>${unitCompleted} of ${unitPublished.length} authored lessons complete</span><strong>${unitPercent}%</strong></div><div class="progress-track"><span style="width:${unitPercent}%"></span></div></div>` : `<small class="mapped-count">${unitLessons.length} curriculum topics still need full lessons</small>`}
              ${groups.map(group => {
                const groupLessons = unitLessons.filter(lesson => (group.lessonIds || []).includes(lesson.id) || (group.name && lesson.subunit === group.name));
                return `<div class="subunit-block">${group.name ? `<h4>${escapeHtml(group.name)}</h4>` : ''}<div class="unit-lessons">${groupLessons.map(lesson => `<button type="button" class="overview-lesson ${lesson.published === false ? 'topic-guide-link' : ''}" data-open-lesson="${escapeHtml(course.id)}|${escapeHtml(lesson.id)}"><span><strong>${escapeHtml(lesson.title)}</strong><small>${lesson.published === false ? 'Curriculum outline · lesson in progress' : `${escapeHtml(lesson.time)} · ${lesson.practice.length} practice questions`}</small></span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>`).join('') || '<p class="tree-empty">No curriculum topics mapped in this subunit.</p>'}</div></div>`;
              }).join('')}
              ${looseLessons.length ? `<div class="subunit-block"><h4>Additional lessons</h4><div class="unit-lessons">${looseLessons.map(lesson => `<button type="button" class="overview-lesson" data-open-lesson="${escapeHtml(course.id)}|${escapeHtml(lesson.id)}"><span><strong>${escapeHtml(lesson.title)}</strong><small>${escapeHtml(lesson.time)} · ${lesson.practice.length} practice questions</small></span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>`).join('')}</div></div>` : ''}
            </section>`;
            }).join('')}
          </div></div>
        </section>
        <aside class="summary-stack">
          <div class="info-box"><span class="eyebrow">Getting started</span><h2>What you’ll need</h2><ul>${course.prerequisites.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul><h3 class="subheading">Where this can lead</h3><ul>${course.leadsTo.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>
          <div class="info-box"><span class="eyebrow">Learning standards</span><h2>Topics in this course</h2>${course.learningStandards.map(item => `<details class="content-item"><summary>${escapeHtml(item.name)}</summary><p>${escapeHtml(item.elaboration)}</p></details>`).join('')}</div>
          <div class="info-box"><span class="eyebrow">Sources & alignment</span><p>See the Sources page for curriculum references and information about textbook and workbook attribution. Listed textbook titles are not assumed to be the source of StudyBC questions.</p><button class="secondary-button" type="button" data-view="sources">View sources and attribution</button></div>
        </aside>
      </div>
    </div>`;
  }

  function renderFeedback(result) {
    if (!result) return '';
    if (result.reflection) {
      return `<div class="answer-feedback ${result.correct ? 'correct' : 'incorrect'}" role="status">
        <strong>${result.correct ? 'Marked as understood.' : 'Review suggested — revisit the notes, then try again.'}</strong>
        <p><strong>Sample response:</strong> ${escapeHtml(result.modelAnswer)}</p>
        <p>${escapeHtml(result.explanation)}</p>
      </div>`;
    }
    return `<div class="answer-feedback ${result.correct ? 'correct' : 'incorrect'}" role="status">
      <strong>${result.correct ? 'Correct — nicely reasoned.' : 'Not quite — try again after reviewing the steps.'}</strong>
      <p>${escapeHtml(result.explanation)}</p>
    </div>`;
  }

  function renderQuestion(course, lesson, question, index) {
    const id = questionId(question, index);
    const key = keyFor(course.id, lesson.id, id);
    const result = questionState(course, lesson, question, index);
    const correct = Boolean(result?.correct);
    const isChoice = question.type === 'multiple-choice' && question.options?.length;
    const isReflection = question.type === 'reflection';
    const options = isChoice ? `<div class="mcq-list">${question.options.map((option, optionIndex) => {
      const selected = result?.selected === optionIndex;
      const isAnswer = correct && option === question.answer;
      return `<button type="button" class="option-button ${isAnswer ? 'answer-correct' : selected && !correct ? 'answer-wrong' : ''}" data-answer-choice="${optionIndex}" data-question-key="${escapeHtml(key)}" ${correct ? 'disabled' : ''}>
        <span class="option-letter">${String.fromCharCode(65 + optionIndex)}</span>${escapeHtml(option)}
      </button>`;
    }).join('')}</div>` : isReflection ? `<div class="reflection-entry">
      <label for="reflection-${escapeHtml(key)}">Write your thoughts before revealing a sample response</label>
      <textarea id="reflection-${escapeHtml(key)}" data-reflection-input="${escapeHtml(key)}" rows="4" ${correct ? 'disabled' : ''}>${escapeHtml(state.reflectionDrafts[key] || result?.response || '')}</textarea>
      <button class="secondary-button" type="button" data-reveal-model="${escapeHtml(key)}" ${correct ? 'disabled' : ''}>${state.revealedAnswers[key] || result ? 'Review sample response' : 'Reveal sample response'}</button>
      ${state.revealedAnswers[key] || result ? `${result ? '' : `<div class="model-response"><strong>Sample response</strong><p>${escapeHtml(question.answer)}</p></div>`}
        ${correct ? '' : `<div class="self-assessment"><span>After comparing, how confident are you?</span><div><button class="primary-button" type="button" data-self-assess="understood" data-question-key="${escapeHtml(key)}">I understand this</button><button class="secondary-button" type="button" data-self-assess="review" data-question-key="${escapeHtml(key)}">I need more review</button></div></div>`}` : ''}
    </div>` : `<div class="answer-entry"><input type="${question.type === 'numeric' ? 'number' : 'text'}" ${question.type === 'numeric' ? 'step="any"' : 'autocomplete="off"'} value="${escapeHtml(result?.response || '')}" data-answer-input="${escapeHtml(key)}" aria-label="Your answer to ${escapeHtml(question.question)}" ${correct ? 'disabled' : ''} /><button class="secondary-button" type="button" data-check-answer="${escapeHtml(key)}" ${correct ? 'disabled' : ''}>Check answer</button></div>`;

    return `<article class="practice-item" id="practice-${escapeHtml(key)}">
      <div class="question-heading"><span class="question-number">Question ${index + 1}</span>${correct ? '<span class="answered-chip"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Mastered</span>' : ''}</div>
      <p class="question-prompt">${escapeHtml(question.question)}</p>${options}${renderFeedback(result)}
    </article>`;
  }

  function renderMappedTopic(course, lesson, unit) {
    const standard = course.learningStandards.find(item => item.name === unit?.name);
    const scope = standard?.elaboration || unit?.summary || lesson.title;
    const authoredLessons = course.lessons.filter(item => item.unit === lesson.unit && item.published !== false);
    const subunit = lesson.subunit || unit?.subunits?.find(group => group.lessonIds?.includes(lesson.id))?.name;
    const activeTab = ['core', 'visual', 'examples', 'practice'].includes(state.lessonTab) ? state.lessonTab : 'core';
    return `<div class="page-shell lesson-page">
      <header class="lesson-heading">
        <div class="lesson-topline"><span class="eyebrow">${escapeHtml(course.area)} · ${escapeHtml(course.grade === 'AP' ? 'AP' : `Grade ${course.grade}`)}</span><span class="lesson-time">Lesson content in progress</span></div>
        <h1>${escapeHtml(lesson.title)}</h1>
        <p class="lesson-meta-row"><span>${escapeHtml(course.title)}</span><span aria-hidden="true">/</span><span>${escapeHtml(unit?.name || lesson.unit)}</span>${subunit ? `<span aria-hidden="true">/</span><span>${escapeHtml(subunit)}</span>` : ''}</p>
      </header>
      <div class="lesson-outline-grid">
        <main class="lesson-main-content">
          ${renderLessonTabBar(activeTab)}
          <section class="lesson-tab-panel info-box" id="lesson-panel-${escapeHtml(lesson.id)}-core" role="tabpanel" aria-labelledby="lesson-tab-${escapeHtml(lesson.id)}-core" tabindex="0" data-lesson-panel="core" ${activeTab !== 'core' ? 'hidden' : ''}>
            <span class="eyebrow">Curriculum scope · lesson in progress</span><h2>${escapeHtml(lesson.title)}</h2><p>${escapeHtml(scope)}</p>
            <p>This entry is still a curriculum outline, not a finished lesson. The instructional content, examples, and practice are being authored.</p>
            <p><a href="https://curriculum.gov.bc.ca/curriculum" target="_blank" rel="noopener noreferrer">Compare this topic with the official British Columbia Curriculum</a>.</p>
            ${authoredLessons.length ? `<h3>Published lessons in this unit</h3><div class="unit-lessons">${authoredLessons.map(item => `<button type="button" class="overview-lesson" data-open-lesson="${escapeHtml(course.id)}|${escapeHtml(item.id)}"><span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.time || 'Authored lesson')}</small></span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>`).join('')}</div>` : ''}
          </section>
          <section class="lesson-tab-panel" id="lesson-panel-${escapeHtml(lesson.id)}-visual" role="tabpanel" aria-labelledby="lesson-tab-${escapeHtml(lesson.id)}-visual" tabindex="0" data-lesson-panel="visual" ${activeTab !== 'visual' ? 'hidden' : ''}>
            ${renderDiagram(lesson)}
          </section>
          <section class="lesson-tab-panel info-box" id="lesson-panel-${escapeHtml(lesson.id)}-examples" role="tabpanel" aria-labelledby="lesson-tab-${escapeHtml(lesson.id)}-examples" tabindex="0" data-lesson-panel="examples" ${activeTab !== 'examples' ? 'hidden' : ''}>
            <span class="eyebrow">Worked examples · in progress</span><h2>No worked examples yet</h2><p>Examples will be written for this topic after the lesson explanation is ready.</p>
          </section>
          <section class="lesson-tab-panel info-box" id="lesson-panel-${escapeHtml(lesson.id)}-practice" role="tabpanel" aria-labelledby="lesson-tab-${escapeHtml(lesson.id)}-practice" tabindex="0" data-lesson-panel="practice" ${activeTab !== 'practice' ? 'hidden' : ''}>
            <span class="eyebrow">Practice checkpoint · in progress</span><h2>No practice questions yet</h2><p>Topic-specific questions and diagnostic feedback will be added with the lesson content.</p>
          </section>
        </main>
      </div>
      <button class="secondary-button" type="button" data-open-course="${escapeHtml(course.id)}">Return to course map</button>
    </div>`;
  }

  function renderLessonTabBar(activeTab) {
    const tabs = [
      ['core', 'Core Concept & Sub-Lessons'],
      ['visual', 'Visual Guide & Annotated Diagrams'],
      ['examples', 'Step-by-Step Worked Examples'],
      ['practice', 'Interactive Practice Checkpoint']
    ];
    const lesson = currentLesson();
    return `<div class="lesson-tabs" role="tablist" aria-label="Lesson sections">${tabs.map(([id, label]) => `<button type="button" class="lesson-tab ${activeTab === id ? 'active' : ''}" id="lesson-tab-${escapeHtml(lesson.id)}-${id}" role="tab" aria-controls="lesson-panel-${escapeHtml(lesson.id)}-${id}" aria-selected="${activeTab === id}" tabindex="${activeTab === id ? '0' : '-1'}" data-lesson-tab="${id}">${label}</button>`).join('')}</div>`;
  }

  function renderLesson(course) {
    const lesson = currentLesson();
    if (!lesson) return '<div class="empty-state"><h2>No lesson content yet</h2><p>Choose another lesson from the course navigation.</p></div>';
    const unit = findUnit(course, lesson);
    if (lesson.published === false) {
      return renderMappedTopic(course, lesson, unit);
    }
    const index = course.lessons.findIndex(item => item.id === lesson.id);
    const previous = course.lessons[index - 1];
    const next = course.lessons[index + 1];
    const done = isLessonComplete(course, lesson);
    const completedQuestions = lesson.practice.filter((question, qIndex) => questionState(course, lesson, question, qIndex)?.correct).length;
    const activeTab = ['core', 'visual', 'examples', 'practice'].includes(state.lessonTab) ? state.lessonTab : 'core';

    return `<div class="page-shell lesson-page">
      <header class="lesson-heading">
        <div class="lesson-topline"><span class="eyebrow">${escapeHtml(course.area)} · ${escapeHtml(course.grade === 'AP' ? 'AP' : `Grade ${course.grade}`)}</span><span class="lesson-time"><i class="fa-regular fa-clock" aria-hidden="true"></i> ${escapeHtml(lesson.time)}</span></div>
        <h1>${escapeHtml(lesson.title)}</h1><p class="lesson-meta-row"><span>${escapeHtml(course.title)}</span><span aria-hidden="true">/</span><span>${escapeHtml(unit?.name || lesson.unit)}</span></p>
        <div class="lesson-heading-actions"><span class="completion-indicator ${done ? 'done' : ''}">${done ? 'Lesson mastered' : `${completedQuestions} of ${lesson.practice.length} checkpoints correct`}</span><button class="secondary-button" type="button" data-toggle-complete="${escapeHtml(course.id)}|${escapeHtml(lesson.id)}" ${done && !progress.completed[lessonKey(course.id, lesson.id)] ? 'disabled' : ''}>${done ? progress.completed[lessonKey(course.id, lesson.id)] ? 'Undo completion' : 'Checkpoint mastered' : 'Mark lesson complete'}</button></div>
      </header>

      <div class="lesson-content-grid">
        <main class="lesson-main-content">
          ${renderLessonTabBar(activeTab)}
          <section class="lesson-tab-panel" id="lesson-panel-${escapeHtml(lesson.id)}-core" role="tabpanel" aria-labelledby="lesson-tab-${escapeHtml(lesson.id)}-core" tabindex="0" data-lesson-panel="core" ${activeTab !== 'core' ? 'hidden' : ''}>
            <section class="goal-box"><span class="eyebrow">Learning goals</span><h2>By the end of this lesson</h2><ul>${lesson.goals.map(goal => `<li>${escapeHtml(goal)}</li>`).join('')}</ul></section>
            <section class="info-box"><span class="eyebrow">Start from the beginning</span><h2>Key vocabulary</h2><div class="vocab-grid">${lesson.vocabulary.map(item => `<article class="vocab-card"><strong>${escapeHtml(item.term)}</strong><p>${escapeHtml(item.definition)}</p></article>`).join('')}</div></section>
            ${renderVideoReference(course, lesson)}
            <section class="info-box lesson-notes"><span class="eyebrow">Concepts → method → application</span><h2>Learn the idea</h2>${lesson.sections.map((section, sectionIndex) => `<article class="section-block"><span class="section-index">0${sectionIndex + 1}</span><div><h3>${escapeHtml(section.heading)}</h3><p>${escapeHtml(section.content)}</p></div></article>`).join('')}</section>
            <section class="info-box"><span class="eyebrow">Review before moving on</span><h2>Key takeaways</h2><ul class="takeaway-list">${lesson.summary.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul><div class="cheat-sheet">${lesson.cheatSheet.map(item => `<span>${escapeHtml(item)}</span>`).join('')}</div></section>
            ${lesson.source ? `<section class="info-box lesson-source-note"><span class="eyebrow">Lesson source</span><p>${escapeHtml(lesson.source.name)} · use the <a href="${escapeHtml(lesson.source.curriculum)}" target="_blank" rel="noopener noreferrer">official British Columbia Curriculum</a> to compare course standards. No commercial textbook or workbook is claimed as the source of this lesson.</p></section>` : ''}
          </section>
          <section class="lesson-tab-panel" id="lesson-panel-${escapeHtml(lesson.id)}-visual" role="tabpanel" aria-labelledby="lesson-tab-${escapeHtml(lesson.id)}-visual" tabindex="0" data-lesson-panel="visual" ${activeTab !== 'visual' ? 'hidden' : ''}>
            ${renderDiagram(lesson)}
          </section>
          <section class="lesson-tab-panel" id="lesson-panel-${escapeHtml(lesson.id)}-examples" role="tabpanel" aria-labelledby="lesson-tab-${escapeHtml(lesson.id)}-examples" tabindex="0" data-lesson-panel="examples" ${activeTab !== 'examples' ? 'hidden' : ''}>
            <section class="info-box"><span class="eyebrow">Follow the reasoning</span><h2>Worked examples</h2>${lesson.examples.length ? lesson.examples.map((worked, exampleIndex) => `<article class="example-box"><span class="example-label">Example ${exampleIndex + 1}</span><h3>${escapeHtml(worked.prompt)}</h3><ol>${worked.steps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}</ol><div class="answer-box"><strong>Result</strong><span>${escapeHtml(worked.answer)}</span></div></article>`).join('') : '<p class="content-note">Worked examples for this topic are still being authored.</p>'}</section>
            ${lesson.mistakes?.length ? `<section class="info-box"><span class="eyebrow">Avoid these errors</span><h2>Common mistakes</h2><ul>${lesson.mistakes.map(mistake => `<li>${escapeHtml(mistake)}</li>`).join('')}</ul></section>` : ''}
          </section>
          <section class="lesson-tab-panel" id="lesson-panel-${escapeHtml(lesson.id)}-practice" role="tabpanel" aria-labelledby="lesson-tab-${escapeHtml(lesson.id)}-practice" tabindex="0" data-lesson-panel="practice" ${activeTab !== 'practice' ? 'hidden' : ''}>
            <section class="info-box practice-section"><div class="practice-heading"><div><span class="eyebrow">Check your understanding</span><h2>Practice checkpoint</h2></div><span class="question-count">${completedQuestions} / ${lesson.practice.length} mastered</span></div><p class="practice-intro">Multiple-choice answers get immediate feedback; numeric and short answers can be checked for an explanation. For open-ended reflections, compare your response with the sample and self-assess.</p><div class="practice-list">${lesson.practice.map((question, qIndex) => renderQuestion(course, lesson, question, qIndex)).join('')}</div></section>
          </section>
          <nav class="lesson-actions" aria-label="Lesson navigation"><button class="secondary-button" type="button" data-open-lesson="${escapeHtml(course.id)}|${escapeHtml(previous?.id || lesson.id)}" ${previous ? '' : 'disabled'}><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Previous lesson</button><button class="primary-button" type="button" data-open-lesson="${escapeHtml(course.id)}|${escapeHtml(next?.id || lesson.id)}" ${next ? '' : 'disabled'}>${next ? 'Next lesson' : 'End of course'} ${next ? '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i>' : ''}</button></nav>
        </main>
        <aside class="lesson-aside"><div class="info-box sticky-study-card"><span class="eyebrow">In this unit</span><h2>${escapeHtml(unit?.name || lesson.unit)}</h2><nav class="unit-lesson-nav">${course.lessons.filter(item => item.unit === lesson.unit).map(item => lessonLink(course, item, item.id === lesson.id ? 'selected' : '')).join('')}</nav><div class="aside-divider"></div><span class="eyebrow">Progress</span><strong class="aside-progress">${completedQuestions} / ${lesson.practice.length} questions</strong><div class="progress-track"><span style="width:${lesson.practice.length ? Math.round(completedQuestions / lesson.practice.length * 100) : 0}%"></span></div><p class="aside-hint">Answer correctly to save your checkpoint progress in this browser.</p></div></aside>
      </div>
    </div>`;
  }

  function renderBreadcrumbs() {
    const course = currentCourse();
    const lesson = currentLesson();
    const crumbs = [{ title: 'Home', action: 'home' }];
    if (state.view === 'course' || state.view === 'lesson') crumbs.push({ title: course.title, action: 'course' });
    if (state.view === 'lesson' && lesson) {
      crumbs.push({ title: findUnit(course, lesson)?.name || lesson.unit, action: 'unit' });
      crumbs.push({ title: lesson.title, action: 'lesson' });
    }
    return `<nav class="breadcrumbs" aria-label="Breadcrumb">${crumbs.map((crumb, index) => `${index ? '<span class="crumb-separator" aria-hidden="true">/</span>' : ''}<button type="button" class="crumb ${index === crumbs.length - 1 ? 'current' : ''}" data-crumb="${crumb.action}" ${index === crumbs.length - 1 ? 'aria-current="page"' : ''}>${escapeHtml(crumb.title)}</button>`).join('')}</nav>`;
  }

  function renderCommandPalette() {
    const results = matchingLessons(state.search);
    const courseMatches = state.search.trim() ? data.courses.filter(course =>
      `${course.title} ${course.area} ${course.code} ${course.summary}`.toLowerCase().includes(state.search.toLowerCase())
    ).slice(0, 4) : data.courses.slice(0, 4);
    return `<div class="command-palette ${state.commandOpen ? 'open' : ''}" aria-hidden="${!state.commandOpen}">
      <button type="button" class="command-backdrop" data-close-command aria-label="Close search"></button>
      <section class="command-box" role="dialog" aria-modal="true" aria-label="Search StudyBC"><div class="command-input-row"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i><input id="command-search" type="search" value="${escapeHtml(state.search)}" placeholder="Search any course, lesson, formula, or idea..." autocomplete="off" /></div>
        <div class="command-list">${courseMatches.map(course => `<button type="button" class="command-item" data-open-course="${escapeHtml(course.id)}"><i class="fa-solid fa-book" aria-hidden="true"></i><span><strong>${escapeHtml(course.title)}</strong><small>Course · ${escapeHtml(course.area)}</small></span></button>`).join('')}
          ${results.map(({ course, lesson }) => `<button type="button" class="command-item" data-open-lesson="${escapeHtml(course.id)}|${escapeHtml(lesson.id)}"><i class="fa-regular fa-file-lines" aria-hidden="true"></i><span><strong>${escapeHtml(lesson.title)}</strong><small>${escapeHtml(course.title)} · ${escapeHtml(lesson.unit)}</small></span></button>`).join('')}
          ${!courseMatches.length && !results.length ? '<div class="command-empty">No matches found. Try another word or formula.</div>' : ''}
        </div><div class="command-hint"><span>Searches notes, examples, formulas, and practice</span><kbd>ESC</kbd></div>
      </section>
    </div>`;
  }

  function render() {
    const showSidebar = state.view === 'course' || state.view === 'lesson';
    const appInstalled = window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;
    const course = currentCourse();
    const content = state.view === 'home' ? renderHome()
      : state.view === 'mylist' ? renderMyListPage()
      : state.view === 'course' ? renderCourseOverview(course)
        : state.view === 'lesson' ? renderLesson(course)
          : state.view === 'progress' ? renderProgressPage()
            : state.view === 'quizzes' ? renderQuizPage()
            : state.view === 'flashcards' ? renderFlashcardsPage()
            : state.view === 'tutor' ? renderTutorPage()
                : state.view === 'about' ? renderAboutPage()
                  : state.view === 'sources' ? renderSourcesPage()
                    : state.view === 'focus' ? renderFocusTimerPage()
                      : renderFeedbackPage();
    root.innerHTML = `<div class="studybc-app ${showSidebar ? 'with-sidebar' : 'home-layout'}">
      ${showSidebar ? renderSidebar() : ''}
      <main class="main-panel">
        <header class="topbar">${renderBreadcrumbs()}<div class="topbar-actions">${searchBox('global-search', 'Search StudyBC', 'topbar-search')}<button class="theme-toggle secondary-button" type="button" data-toggle-theme aria-label="Switch to ${state.theme === 'dark' ? 'light' : 'dark'} mode" title="Toggle light and dark mode"><i class="fa-solid ${state.theme === 'dark' ? 'fa-sun' : 'fa-moon'}" aria-hidden="true"></i><span>${state.theme === 'dark' ? 'Light' : 'Dark'}</span></button><button class="secondary-button command-trigger" type="button" aria-label="Open search"><span class="search-shortcut">⌘K</span><span>Search</span></button></div></header>
        <nav class="study-nav" aria-label="StudyBC pages">${[['home', 'Library', 'fa-house'], ['mylist', `My list (${progress.myList.length})`, 'fa-bookmark'], ['progress', 'Progress', 'fa-chart-simple'], ['quizzes', 'Quizzes & tests', 'fa-clipboard-check'], ['flashcards', 'My flashcards', 'fa-clone'], ['focus', 'Focus timer', 'fa-clock'], ['tutor', 'Lesson finder', 'fa-lightbulb'], ['sources', 'Sources', 'fa-book-open'], ['about', 'About', 'fa-circle-info'], ['feedback', 'Feedback', 'fa-comment-dots']].map(([view, label, icon]) => `<button type="button" class="${state.view === view ? 'active' : ''}" data-view="${view}" ${state.view === view ? 'aria-current="page"' : ''}><i class="fa-solid ${icon}" aria-hidden="true"></i><span>${label}</span></button>`).join('')}${appInstalled ? '<span class="installed-app-label"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> App installed</span>' : '<button type="button" class="install-app-button" data-install-app><i class="fa-solid fa-download" aria-hidden="true"></i> Install app</button>'}</nav>
        ${state.notice ? `<div class="storage-notice" role="status"><i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i>${escapeHtml(state.notice)}</div>` : ''}
        ${state.view !== 'home' && state.search && !state.commandOpen ? renderSearchResults(state.search) : ''}
        ${content}
      </main>
    </div>${renderCommandPalette()}${renderInstallHelp()}`;

    const activeSearchId = state.commandOpen ? 'command-search' : null;
    if (activeSearchId) document.getElementById(activeSearchId)?.focus();
    if (state.theme === 'dark') document.documentElement.classList.add('dark');
    if (state.view === 'lesson') typesetLessonMath();
  }

  function typesetLessonMath() {
    const mathJax = window.MathJax;
    if (!mathJax?.typesetPromise || (!root.textContent.includes('\\(') && !root.textContent.includes('\\['))) return;
    mathJaxRenderQueue = mathJaxRenderQueue.then(() => {
      mathJax.typesetClear?.([root]);
      return mathJax.typesetPromise([root]);
    }).catch(error => {
      console.error('StudyBC could not render lesson mathematics with MathJax.', error);
    });
  }

  const mathJaxScript = document.getElementById('mathjax-script');
  mathJaxScript?.addEventListener('load', () => {
    if (state.view === 'lesson') typesetLessonMath();
  });
  mathJaxScript?.addEventListener('error', () => {
    console.error('StudyBC could not load MathJax; TeX lesson formulas may not render.');
  });

  function normalizeAnswer(value) {
    return String(value ?? '').toLowerCase().trim().replace(/[−–]/g, '-').replace(/[\s,$]/g, '').replace(/[.!?]/g, '');
  }

  function evaluateAnswer(course, lesson, question, response, selected = null) {
    if (question.type === 'multiple-choice') {
      return selected !== null && question.options[selected] === question.answer;
    }
    if (question.type === 'numeric') {
      const value = Number(response);
      return response !== '' && Number.isFinite(value) && Math.abs(value - Number(question.answer)) <= (question.tolerance ?? 0.000001);
    }
    return normalizeAnswer(response) === normalizeAnswer(question.answer);
  }

  function checkQuestion(questionKey, response, selected = null) {
    const [courseId, lessonId, id] = questionKey.split(':');
    const course = courseById(courseId);
    const lesson = lessonById(course, lessonId);
    const questionIndex = lesson?.practice.findIndex((item, index) => questionId(item, index) === id) ?? -1;
    if (!lesson || questionIndex < 0) return;
    const question = lesson.practice[questionIndex];
    const correct = evaluateAnswer(course, lesson, question, response, selected);
    const old = questionState(course, lesson, question, questionIndex);
    const result = {
      correct,
      selected,
      response: response ?? '',
      explanation: question.explanation,
      attempts: (old?.attempts || 0) + 1
    };
    state.feedback[questionKey] = result;
    if (correct) progress.answers[questionKey] = result;
    saveProgress();
    render();
    const questionElement = document.getElementById(`practice-${CSS.escape(questionKey)}`);
    questionElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function bindSearchInput(input) {
    state.search = input.value;
    render();
    const replacement = document.getElementById(input.id);
    if (replacement) {
      replacement.focus();
      replacement.setSelectionRange(replacement.value.length, replacement.value.length);
    }
  }

  root.addEventListener('input', event => {
    const input = event.target;
    if (input.matches('#study-search, #global-search, #command-search')) {
      bindSearchInput(input);
      return;
    }
    if (input.matches('[data-topic-note]')) {
      progress.topicNotes[input.dataset.topicNote] = input.value;
      saveProgress();
      return;
    }
    if (input.matches('[data-reflection-input]')) {
      state.reflectionDrafts[input.dataset.reflectionInput] = input.value;
    }
    if (input.form?.id === 'feedback-form') {
      state.feedbackDraft = Object.fromEntries(new FormData(input.form).entries());
    }
  });

  root.addEventListener('change', event => {
    const target = event.target;
    if (target.matches('#flashcard-file')) {
      state.flashcardNotice = '';
    } else if (target.matches('#focus-sound')) {
      focusTimer.soundMode = target.value === 'brown' ? 'brown' : 'rain';
      if (focusTimer.ambientOn) startAmbientSound();
      else render();
    } else if (target.matches('#subject-filter')) {
      state.subject = target.value;
      render();
    } else if (target.matches('#quiz-course')) {
      state.quizCourseId = target.value;
      state.quizUnit = 'All units';
      state.quizActive = false;
      state.quizScore = null;
      state.quizSelections = {};
      render();
    } else if (target.matches('#quiz-unit')) {
      state.quizUnit = target.value;
      state.quizActive = false;
      state.quizScore = null;
      state.quizSelections = {};
      render();
    } else if (target.matches('#tutor-course')) {
      state.tutorCourseId = target.value;
      state.tutorUnit = courseById(target.value).units[0]?.name || '';
      state.tutorBreakdown = null;
      render();
    } else if (target.matches('#tutor-unit')) {
      state.tutorUnit = target.value;
      state.tutorBreakdown = null;
      render();
    }
  });

  root.addEventListener('submit', event => {
    const form = event.target;
    if (form.id === 'custom-flashcard-form') {
      event.preventDefault();
      const values = new FormData(form);
      const card = {
        front: String(values.get('front') || '').trim(),
        back: String(values.get('back') || '').trim()
      };
      if (card.front && card.back && state.customFlashcards.length < 500) {
        state.customFlashcards.unshift(card);
        state.flashcardIndex = 0;
        state.flashcardRevealed = false;
        state.flashcardNotice = 'Flashcard added.';
        saveCustomFlashcards();
      } else if (state.customFlashcards.length >= 500) {
        state.flashcardNotice = 'The local deck limit is 500 cards. Delete cards before adding more.';
      }
      render();
    } else if (form.id === 'flashcard-upload-form') {
      event.preventDefault();
      const file = form.querySelector('#flashcard-file').files?.[0];
      if (!file) {
        state.flashcardNotice = 'Choose a TXT or CSV file first.';
        render();
        return;
      }
      if (file.size > 1024 * 1024) {
        state.flashcardNotice = 'Files must be 1 MB or smaller.';
        render();
        return;
      }
      file.text().then(text => {
        const cards = parseFlashcardFile(text);
        if (!cards.length) {
          state.flashcardNotice = 'No cards found. Add one front/back pair per line, separated by a comma, tab, or |.';
          render();
          return;
        }
        const importedCount = Math.min(cards.length, 500 - state.customFlashcards.length);
        if (!importedCount) {
          state.flashcardNotice = 'The local deck limit is 500 cards. Delete cards before importing more.';
          render();
          return;
        }
        state.customFlashcards = [...cards.slice(0, importedCount), ...state.customFlashcards];
        state.flashcardIndex = 0;
        state.flashcardRevealed = false;
        state.flashcardNotice = `${importedCount} card${importedCount === 1 ? '' : 's'} imported${cards.length > 200 ? ' (first 200 from file)' : ''}.`;
        saveCustomFlashcards();
        render();
      }).catch(error => {
        console.error('StudyBC could not read the selected flashcard file.', error);
        state.flashcardNotice = 'The selected file could not be read.';
        render();
      });
    } else if (form.id === 'tutor-form') {
      event.preventDefault();
      const course = courseById(state.tutorCourseId);
      const unitName = state.tutorUnit || course.units[0]?.name || '';
      const unit = course.units.find(item => item.name === unitName);
      const prompt = form.querySelector('#tutor-prompt').value.trim();
      state.tutorPrompt = prompt;
      const tokens = prompt.toLowerCase().split(/[^a-z0-9]+/).filter(token => token.length > 2);
      const relatedLessons = course.lessons.filter(lesson => lesson.unit === unitName && lesson.published !== false);
      const rankedLessons = relatedLessons.map(lesson => {
        const searchable = `${lesson.title} ${(lesson.goals || []).join(' ')} ${(lesson.summary || []).join(' ')} ${(lesson.sections || []).map(section => section.content).join(' ')}`.toLowerCase();
        return { lesson, score: tokens.reduce((score, token) => score + (searchable.includes(token) ? 1 : 0), 0) };
      }).sort((a, b) => b.score - a.score);
      const matched = rankedLessons.filter(item => item.score > 0).slice(0, 4).map(item => item.lesson);
      state.tutorBreakdown = {
        title: `Lessons matching “${prompt}”`,
        lessons: matched,
        note: matched.length
          ? 'These results link to published, topic-specific course instruction.'
          : relatedLessons.length
            ? `No published lesson in ${unit?.name || unitName} matched that search. Browse the unit lessons below or try different keywords.`
            : `No full lessons have been published for ${unit?.name || unitName} yet; its entries remain curriculum outlines.`
      };
      render();
    } else if (form.id === 'feedback-form') {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(form).entries());
      state.feedbackDraft = values;
      const subject = `[StudyBC feedback] ${values.category}`;
      const body = [
        `Name: ${values.name || '(not provided)'}`,
        `Reply email: ${values.replyTo || '(not provided)'}`,
        '',
        String(values.message || '')
      ].join('\n');
      state.preparedFeedback = `mailto:anaischoy@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      render();
    }
  });

  root.addEventListener('click', event => {
    const target = event.target.closest('button');
    if (!target) return;
    if (target.matches('[data-lesson-tab]')) {
      state.lessonTab = target.dataset.lessonTab;
      render();
      root.querySelector(`[data-lesson-tab="${CSS.escape(state.lessonTab)}"]`)?.focus();
      return;
    }
    if (target.matches('[data-flashcard-action]')) {
      if (target.dataset.flashcardAction === 'reveal') {
        state.flashcardRevealed = true;
      } else {
        if (target.dataset.flashcardAction === 'next') {
          state.flashcardIndex = (state.flashcardIndex + 1) % state.customFlashcards.length;
        }
        state.flashcardRevealed = false;
      }
      render();
      return;
    }
    if (target.matches('[data-delete-flashcard]')) {
      state.customFlashcards.splice(Number(target.dataset.deleteFlashcard), 1);
      state.flashcardIndex = Math.min(state.flashcardIndex, Math.max(state.customFlashcards.length - 1, 0));
      state.flashcardRevealed = false;
      state.flashcardNotice = 'Flashcard deleted.';
      saveCustomFlashcards();
      render();
      return;
    }
    if (target.matches('[data-view]')) {
      state.view = target.dataset.view;
      state.search = '';
      if (state.view === 'quizzes') {
        state.quizCourseId = currentCourse().id;
        state.quizUnit = 'All units';
        state.quizActive = false;
        state.quizScore = null;
        state.quizSelections = {};
      }
      if (state.view === 'tutor') {
        state.tutorCourseId = currentCourse().id;
        state.tutorUnit = currentCourse().units[0]?.name || '';
        state.tutorBreakdown = null;
      }
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (target.matches('[data-focus-duration]')) {
      const minutes = Number(target.dataset.focusDuration);
      if ([5, 25, 50].includes(minutes)) setFocusDuration(minutes);
      return;
    }
    if (target.matches('[data-focus-action]')) {
      if (target.dataset.focusAction === 'start') startFocusTimer();
      else if (target.dataset.focusAction === 'pause') pauseFocusTimer();
      else {
        pauseFocusTimer();
        focusTimer.remainingSeconds = focusTimer.durationSeconds;
        focusTimer.message = '';
      }
      render();
      return;
    }
    if (target.matches('[data-toggle-ambient]')) {
      if (focusTimer.ambientOn) {
        stopAmbientSound();
        focusTimer.message = 'Ambient sound off.';
        render();
      } else {
        startAmbientSound();
      }
      return;
    }
    if (target.matches('[data-install-app]')) {
      state.installHelp = !installPrompt;
      if (installPrompt) {
        const promptEvent = installPrompt;
        installPrompt = null;
        promptEvent.prompt()
          .then(() => promptEvent.userChoice)
          .then(() => render())
          .catch(error => {
            console.error('StudyBC app installation prompt failed.', error);
            state.installHelp = true;
            render();
          });
      } else {
        render();
      }
      return;
    }
    if (target.matches('[data-close-install]')) {
      state.installHelp = false;
      render();
      return;
    }
    if (target.matches('[data-toggle-my-list]')) {
      const courseId = target.dataset.toggleMyList;
      progress.myList = isInMyList(courseId)
        ? progress.myList.filter(id => id !== courseId)
        : [...progress.myList, courseId];
      saveProgress();
      render();
      return;
    }
    if (target.matches('[data-toggle-explored]')) {
      const [courseId, lessonId] = target.dataset.toggleExplored.split('|');
      const key = lessonKey(courseId, lessonId);
      if (progress.explored[key]) delete progress.explored[key];
      else progress.explored[key] = true;
      saveProgress();
      render();
      return;
    }
    if (target.matches('[data-quiz-choice]')) {
      state.quizSelections[target.dataset.quizChoice] = Number(target.dataset.choice);
      render();
      return;
    }
    if (target.matches('[data-start-quiz]')) {
      state.quizActive = true;
      state.quizScore = null;
      state.quizSelections = {};
      render();
      return;
    }
    if (target.matches('[data-clear-quiz]')) {
      state.quizActive = false;
      state.quizScore = null;
      state.quizSelections = {};
      render();
      return;
    }
    if (target.matches('[data-submit-quiz]')) {
      const course = courseById(state.quizCourseId);
      const questions = assessmentQuestions(course, state.quizUnit);
      if (!questions.length) return;
      const correct = questions.reduce((count, item) => {
        const selected = state.quizSelections[assessmentKey(item.lesson, item.id)];
        return count + (selected !== undefined && item.question.options[selected] === item.question.answer ? 1 : 0);
      }, 0);
      const attempt = {
        courseId: course.id,
        courseTitle: course.title,
        label: state.quizUnit === 'All units' ? 'Course test' : `${state.quizUnit} quiz`,
        date: new Date().toISOString(),
        correct,
        total: questions.length,
        percent: Math.round(correct / questions.length * 100),
        review: questions.map(item => {
          const selectedIndex = state.quizSelections[assessmentKey(item.lesson, item.id)];
          return {
            question: item.question.question,
            selected: selectedIndex === undefined ? '' : item.question.options[selectedIndex],
            answer: item.question.answer,
            explanation: item.question.explanation
          };
        })
      };
      saveAssessment(attempt);
      state.quizScore = attempt;
      state.quizActive = false;
      render();
      return;
    }
    if (target.matches('[data-open-course]')) {
      openCourse(target.dataset.openCourse);
      return;
    }
    if (target.matches('[data-open-lesson]')) {
      const [courseId, lessonId] = target.dataset.openLesson.split('|');
      openLesson(courseId, lessonId);
      return;
    }
    if (target.matches('[data-grade]')) {
      state.grade = target.dataset.grade;
      render();
      return;
    }
    if (target.matches('[data-reset-filters]')) {
      state.grade = 'All';
      state.subject = 'All';
      state.search = '';
      render();
      return;
    }
    if (target.matches('[data-toggle-theme]')) {
      setTheme(state.theme === 'dark' ? 'light' : 'dark');
      render();
      return;
    }
    if (target.matches('[data-toggle-complete]')) {
      const [courseId, lessonId] = target.dataset.toggleComplete.split('|');
      const key = lessonKey(courseId, lessonId);
      if (progress.completed[key]) {
        delete progress.completed[key];
      } else {
        progress.completed[key] = true;
      }
      saveProgress();
      render();
      return;
    }
    if (target.matches('[data-answer-choice]')) {
      const questionKey = target.dataset.questionKey;
      const [, lessonId, id] = questionKey.split(':');
      const course = currentCourse();
      const lesson = lessonById(course, lessonId);
      const index = lesson?.practice.findIndex((question, questionIndex) => questionId(question, questionIndex) === id) ?? -1;
      const question = lesson?.practice[index];
      if (question) checkQuestion(questionKey, question.options[Number(target.dataset.answerChoice)], Number(target.dataset.answerChoice));
      return;
    }
    if (target.matches('[data-check-answer]')) {
      const questionKey = target.dataset.checkAnswer;
      const input = root.querySelector(`[data-answer-input="${CSS.escape(questionKey)}"]`);
      if (input && input.value.trim()) checkQuestion(questionKey, input.value.trim());
      else if (input) {
        input.setCustomValidity('Enter an answer before checking.');
        input.reportValidity();
      }
      return;
    }
    if (target.matches('[data-reveal-model]')) {
      state.revealedAnswers[target.dataset.revealModel] = true;
      render();
      root.querySelector(`[data-reflection-input="${CSS.escape(target.dataset.revealModel)}"]`)?.focus();
      return;
    }
    if (target.matches('[data-self-assess]')) {
      const questionKey = target.dataset.questionKey;
      const [, lessonId, id] = questionKey.split(':');
      const course = currentCourse();
      const lesson = lessonById(course, lessonId);
      const index = lesson?.practice.findIndex((question, questionIndex) => questionId(question, questionIndex) === id) ?? -1;
      const question = lesson?.practice[index];
      if (!question || question.type !== 'reflection') return;
      const result = {
        correct: target.dataset.selfAssess === 'understood',
        reflection: true,
        response: state.reflectionDrafts[questionKey] || '',
        modelAnswer: question.answer,
        explanation: question.explanation,
        attempts: (questionState(course, lesson, question, index)?.attempts || 0) + 1
      };
      state.feedback[questionKey] = result;
      if (result.correct) progress.answers[questionKey] = result;
      saveProgress();
      render();
      return;
    }
    if (target.matches('.command-trigger')) {
      state.search = '';
      state.commandOpen = true;
      render();
      return;
    }
    if (target.matches('[data-close-command]')) {
      state.commandOpen = false;
      state.search = '';
      render();
      return;
    }
    if (target.matches('[data-crumb]')) {
      const action = target.dataset.crumb;
      if (action === 'home') {
        state.view = 'home';
        state.search = '';
      } else if (action === 'course' || action === 'unit') {
        state.view = 'course';
      }
      render();
    }
  });

  root.addEventListener('keydown', event => {
    if (event.target.matches('[data-lesson-tab]')) {
      const tabIds = ['core', 'visual', 'examples', 'practice'];
      const currentIndex = tabIds.indexOf(event.target.dataset.lessonTab);
      const nextIndex = event.key === 'ArrowRight' ? (currentIndex + 1) % tabIds.length
        : event.key === 'ArrowLeft' ? (currentIndex - 1 + tabIds.length) % tabIds.length
          : event.key === 'Home' ? 0
            : event.key === 'End' ? tabIds.length - 1
              : -1;
      if (nextIndex >= 0) {
        event.preventDefault();
        state.lessonTab = tabIds[nextIndex];
        render();
        root.querySelector(`[data-lesson-tab="${CSS.escape(state.lessonTab)}"]`)?.focus();
        return;
      }
    }
    if (event.target.matches('[data-answer-input]') && event.key === 'Enter') {
      event.preventDefault();
      const key = event.target.dataset.answerInput;
      if (event.target.value.trim()) checkQuestion(key, event.target.value.trim());
    }
  });

  window.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      state.search = '';
      state.commandOpen = !state.commandOpen;
      render();
    }
    if (event.key === 'Escape' && state.commandOpen) {
      state.commandOpen = false;
      state.search = '';
      render();
    }
  });

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
  });
  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    state.installHelp = false;
    render();
  });

  loadProgress();
  loadCustomFlashcards();
  try {
    const storedTheme = localStorage.getItem(themeKey);
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    setTheme(storedTheme === 'dark' || (!storedTheme && prefersDark) ? 'dark' : 'light', false);
  } catch (error) {
    state.theme = 'light';
    showStorageNotice('read your display preference');
  }
  render();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('./studybc-sw.js').catch(error => {
      console.error('StudyBC offline installation setup failed.', error);
      state.notice = 'StudyBC could not enable offline app support in this browser. You can still use the website online.';
      render();
    });
  }
})();
