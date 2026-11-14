(() => {
  const curriculumUrl = 'https://curriculum.gov.bc.ca/curriculum';
  const course = window.STUDYBC_DATA?.courses.find(item => item.id === 'chem11');

  if (!course) {
    console.error('StudyBC could not add the Chemistry 11 lesson: course chem11 is missing.');
    return;
  }

  const lesson = {
    id: 'chem11-solutions-authored',
    title: 'Solutions',
    unit: 'Solutions & Acids',
    subunit: 'Solutions & Concentration',
    published: true,
    time: '20 min',
    source: { name: 'StudyBC original lesson', curriculum: curriculumUrl },
    goals: [
      'Identify the solute and solvent in a solution',
      'Calculate molar concentration from amount and volume',
      'Use dilution calculations when solvent is added'
    ],
    vocabulary: [
      { term: 'Solution', definition: 'A homogeneous mixture in which one or more substances are evenly distributed through another.' },
      { term: 'Solute', definition: 'A substance dissolved in a solution.' },
      { term: 'Solvent', definition: 'The substance that dissolves the solute; in an aqueous solution, the solvent is water.' },
      { term: 'Molar concentration', definition: 'The amount of dissolved substance per litre of solution, measured in mol/L.' }
    ],
    sections: [
      {
        heading: 'What makes a solution?',
        content: 'When salt dissolves in water, salt is the solute and water is the solvent. The result is a solution: the particles are dispersed throughout, so a small sample has the same composition as another sample from the same mixture. A solution can be liquid, gas, or solid; alloy metals are solid solutions.'
      },
      {
        heading: 'Calculate concentration',
        content: 'Molar concentration, C, is amount of solute divided by the total volume of solution: \\(C=\\frac{n}{V}\\). Use moles for n and litres for V. If mass is given, first find moles with \\(n=\\frac{m}{M_m}\\), where Mm is molar mass. Concentration describes the prepared solution, not just the amount of solvent.'
      },
      {
        heading: 'Dilute a solution',
        content: 'Adding solvent lowers concentration but does not change the amount of dissolved solute. Therefore \\(C_1V_1=C_2V_2\\), provided no solute is added or removed. Volumes must use the same units. In a lab, measure the stock solution and add solvent until the final solution reaches its required total volume.'
      },
      {
        heading: 'Concentration and solubility',
        content: 'Concentration tells how much solute is present in a given volume. Solubility describes the maximum amount that can dissolve under specified conditions, especially temperature. An unsaturated solution can dissolve more solute; a saturated solution is at its solubility limit. Do not confuse “concentrated” with “saturated.”'
      }
    ],
    examples: [
      {
        prompt: 'A solution contains 12.0 g of NaCl in a final volume of 0.500 L. Find its molar concentration. (Mm NaCl = 58.44 g/mol.)',
        steps: [
          'Convert mass to moles: n = 12.0 g ÷ 58.44 g/mol = 0.205 mol (3 significant figures).',
          'Use the final solution volume in litres: V = 0.500 L.',
          'Calculate concentration: C = 0.205 mol ÷ 0.500 L = 0.410 mol/L.'
        ],
        answer: '0.410 mol/L NaCl.'
      },
      {
        prompt: 'How much 1.00 mol/L stock solution is needed to prepare 100.0 mL of 0.200 mol/L solution?',
        steps: [
          'Use C₁V₁ = C₂V₂, with both volumes in the same units.',
          'V₁ = (0.200 mol/L × 100.0 mL) ÷ 1.00 mol/L = 20.0 mL.',
          'Measure 20.0 mL of stock, then add water until the total solution volume is 100.0 mL.'
        ],
        answer: '20.0 mL of stock solution.'
      }
    ],
    diagram: {
      title: 'Solute particles distributed through a solvent',
      caption: 'The dissolved solute is spread throughout the water, so samples from a well-mixed solution have the same composition. The particle drawing is a model, not to scale.',
      viewBox: '0 0 620 300',
      svg: `<path class="diagram-outline" d="M92 54 H350 M116 54 V226 Q116 250 140 250 H302 Q326 250 326 226 V54"/>
        <path class="diagram-outline diagram-muted" d="M117 129 H325"/>
        <circle class="diagram-highlight-fill" cx="153" cy="158" r="8"/><circle class="diagram-highlight-fill" cx="206" cy="187" r="8"/>
        <circle class="diagram-highlight-fill" cx="262" cy="148" r="8"/><circle class="diagram-highlight-fill" cx="289" cy="210" r="8"/>
        <circle class="diagram-outline" cx="177" cy="218" r="5"/><circle class="diagram-outline" cx="229" cy="158" r="5"/>
        <circle class="diagram-outline" cx="280" cy="184" r="5"/><circle class="diagram-outline" cx="145" cy="195" r="5"/>
        <path class="diagram-outline" d="M365 95 H424"/><path class="diagram-outline" d="M414 85 L424 95 L414 105"/>
        <rect class="diagram-outline" x="438" y="58" width="154" height="74" rx="12"/>
        <circle class="diagram-highlight-fill" cx="461" cy="82" r="7"/><text class="diagram-label" x="477" y="87" font-size="15">solute</text>
        <circle class="diagram-outline" cx="461" cy="110" r="5"/><text class="diagram-label" x="477" y="115" font-size="15">solvent</text>
        <text class="diagram-label" x="220" y="278" text-anchor="middle" font-size="15">homogeneous solution</text>
        <text class="diagram-label diagram-muted" x="515" y="173" text-anchor="middle" font-size="13">same ratio in</text>
        <text class="diagram-label diagram-muted" x="515" y="194" text-anchor="middle" font-size="13">each small sample</text>`
    },
    mistakes: [
      'Using millilitres in C = n ÷ V without converting to litres.',
      'Using the mass of solute as though it were the number of moles.',
      'In a dilution, adding the calculated water volume instead of bringing the mixture to the final volume.'
    ],
    interactive: { type: 'reflection', label: 'Explain what changes and what stays constant during dilution.' },
    practice: [
      {
        id: 'chem11-solutions-practice-1',
        type: 'multiple-choice',
        question: 'What is the molar concentration of 0.300 mol of solute in 0.750 L of solution?',
        options: ['0.225 mol/L', '0.400 mol/L', '2.50 mol/L', '4.00 mol/L'],
        answer: '0.400 mol/L',
        explanation: 'C = n ÷ V = 0.300 mol ÷ 0.750 L = 0.400 mol/L.'
      },
      {
        id: 'chem11-solutions-practice-2',
        type: 'multiple-choice',
        question: 'A student adds water to a solution without spilling or adding solute. What happens?',
        options: ['The amount of solute increases', 'The concentration decreases while the amount of solute stays constant', 'The concentration and solute amount both increase', 'The solution must become saturated'],
        answer: 'The concentration decreases while the amount of solute stays constant',
        explanation: 'Dilution increases the total volume while the amount of dissolved solute stays the same.'
      }
    ],
    summary: [
      'A solution contains solute distributed through a solvent.',
      'Molar concentration is C = n ÷ V, with volume in litres.',
      'Dilution follows C₁V₁ = C₂V₂ when the amount of solute stays constant.',
      'Concentration and solubility describe different properties.'
    ],
    cheatSheet: ['n = m ÷ Mm', 'C = n ÷ V (mol/L)', 'C₁V₁ = C₂V₂']
  };

  const mappedIndex = course.lessons.findIndex(item =>
    item.published === false &&
    item.unit === lesson.unit &&
    item.title.toLowerCase() === lesson.title.toLowerCase()
  );

  if (mappedIndex >= 0) {
    lesson.id = course.lessons[mappedIndex].id;
    course.lessons[mappedIndex] = lesson;
  } else if (!course.lessons.some(item =>
    item.published !== false &&
    item.unit === lesson.unit &&
    item.title.toLowerCase() === lesson.title.toLowerCase()
  )) {
    course.lessons.push(lesson);
  }

  course.units = course.units.map(unit => ({
    ...unit,
    lessons: course.lessons.filter(item => item.unit === unit.name).length
  }));
})();
