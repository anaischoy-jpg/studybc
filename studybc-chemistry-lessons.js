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

  const diagrams = {
    'Matter and the mole': ['Mole conversion map', 'Mass, amount, and particles are connected by molar mass and Avogadro’s constant.', '0 0 640 220', `<rect class="diagram-outline" x="30" y="80" width="160" height="70" rx="12"/><text class="diagram-label" x="110" y="110" text-anchor="middle" font-size="16">mass (g)</text><text class="diagram-label diagram-muted" x="110" y="132" text-anchor="middle" font-size="13">m ÷ M</text><path class="diagram-outline" d="M194 115 H258 M248 105 L258 115 L248 125"/><rect class="diagram-outline diagram-highlight-fill" x="264" y="80" width="112" height="70" rx="12"/><text class="diagram-label" x="320" y="121" text-anchor="middle" font-size="17">moles (n)</text><path class="diagram-outline" d="M380 115 H444 M434 105 L444 115 L434 125"/><rect class="diagram-outline" x="450" y="80" width="160" height="70" rx="12"/><text class="diagram-label" x="530" y="110" text-anchor="middle" font-size="16">particles (N)</text><text class="diagram-label diagram-muted" x="530" y="132" text-anchor="middle" font-size="13">n × 6.022×10²³</text><text class="diagram-label diagram-muted" x="320" y="185" text-anchor="middle" font-size="14">1 mol = 6.022 × 10²³ representative particles</text>`],
    'Atomic theory': ['A simple Bohr model of an atom', 'A tiny, dense, positive nucleus is surrounded by electrons; the drawing is a model and not to scale.', '0 0 420 300', `<circle class="diagram-outline diagram-muted" cx="200" cy="145" r="95"/><circle class="diagram-outline diagram-muted" cx="200" cy="145" r="55"/><circle class="diagram-highlight-fill" cx="200" cy="145" r="24"/><text class="diagram-label" x="200" y="141" text-anchor="middle" font-size="12">nucleus</text><text class="diagram-label" x="200" y="157" text-anchor="middle" font-size="11">p⁺, n⁰</text><circle class="diagram-highlight-fill" cx="200" cy="50" r="7"/><circle class="diagram-highlight-fill" cx="255" cy="145" r="7"/><text class="diagram-label" x="278" y="90" font-size="14">electron (e⁻)</text><path class="diagram-outline" d="M270 96 L255 130"/><text class="diagram-label diagram-muted" x="200" y="270" text-anchor="middle" font-size="13">electrons occupy energy levels around the nucleus</text>`],
    'Periodic trends': ['Periodic-table trend directions', 'Across a period, effective nuclear attraction generally increases; down a group, atoms gain electron shells.', '0 0 520 300', `<rect class="diagram-outline" x="85" y="55" width="300" height="180" rx="8"/><path class="diagram-outline diagram-muted" d="M85 100 H385 M85 145 H385 M85 190 H385 M145 55 V235 M205 55 V235 M265 55 V235 M325 55 V235"/><text class="diagram-label" x="235" y="85" text-anchor="middle" font-size="15">period (→)</text><text class="diagram-label" x="112" y="270" font-size="13">group ↓</text><path class="diagram-outline" d="M125 215 L345 215 M335 205 L345 215 L335 225"/><text class="diagram-label diagram-muted" x="235" y="257" text-anchor="middle" font-size="12">atomic radius generally decreases →</text><path class="diagram-outline" d="M110 105 V210 M100 115 L110 105 L120 115"/><text class="diagram-label" x="115" y="92" font-size="12">radius generally increases ↓</text><text class="diagram-label" x="403" y="136" font-size="12">trend is general;</text><text class="diagram-label" x="403" y="153" font-size="12">check the property</text>`],
    'Atomic structure': ['Particles and charge in a neutral atom', 'Protons and neutrons are in the nucleus. A neutral atom has equal numbers of protons and electrons.', '0 0 460 280', `<circle class="diagram-outline diagram-muted" cx="210" cy="135" r="82"/><circle class="diagram-highlight-fill" cx="210" cy="135" r="34"/><text class="diagram-label" x="210" y="127" text-anchor="middle" font-size="13">nucleus</text><text class="diagram-label" x="210" y="145" text-anchor="middle" font-size="12">p⁺ + n⁰</text><circle class="diagram-highlight-fill" cx="210" cy="53" r="7"/><circle class="diagram-highlight-fill" cx="292" cy="135" r="7"/><path class="diagram-outline" d="M244 112 L325 80"/><text class="diagram-label" x="330" y="80" font-size="14">electron e⁻</text><path class="diagram-outline" d="M181 164 L120 204"/><text class="diagram-label" x="40" y="218" font-size="14">proton p⁺</text><text class="diagram-label diagram-muted" x="210" y="255" text-anchor="middle" font-size="13">atomic number = number of protons</text>`],
    'Chemical bonding': ['Ionic transfer and covalent sharing', 'Ionic bonding forms after electron transfer; covalent bonding forms when atoms share electron pairs.', '0 0 620 270', `<text class="diagram-label" x="150" y="38" text-anchor="middle" font-size="17">ionic: transfer</text><circle class="diagram-outline" cx="115" cy="125" r="42"/><text class="diagram-label" x="115" y="130" text-anchor="middle" font-size="17">Na</text><circle class="diagram-outline" cx="240" cy="125" r="48"/><text class="diagram-label" x="240" y="130" text-anchor="middle" font-size="17">Cl</text><circle class="diagram-highlight-fill" cx="160" cy="92" r="7"/><path class="diagram-outline" d="M165 92 H195 M185 82 L195 92 L185 102"/><text class="diagram-label diagram-muted" x="174" y="160" text-anchor="middle" font-size="12">e⁻</text><text class="diagram-label" x="150" y="207" text-anchor="middle" font-size="14">Na⁺ + Cl⁻ attract</text><path class="diagram-outline diagram-muted" d="M310 35 V225"/><text class="diagram-label" x="465" y="38" text-anchor="middle" font-size="17">covalent: sharing</text><circle class="diagram-outline" cx="415" cy="125" r="42"/><circle class="diagram-outline" cx="505" cy="125" r="42"/><circle class="diagram-highlight-fill" cx="455" cy="125" r="6"/><circle class="diagram-highlight-fill" cx="465" cy="125" r="6"/><text class="diagram-label" x="460" y="207" text-anchor="middle" font-size="14">shared electron pair</text>`],
    'Nomenclature': ['Naming an ionic compound', 'Name the positive ion first, then the negative ion; use subscripts to balance total charge.', '0 0 560 240', `<rect class="diagram-outline" x="45" y="65" width="205" height="105" rx="12"/><text class="diagram-label" x="147" y="98" text-anchor="middle" font-size="16">Ca²⁺ + Cl⁻</text><text class="diagram-label diagram-muted" x="147" y="128" text-anchor="middle" font-size="13">charges must sum to 0</text><path class="diagram-outline" d="M255 118 H305 M295 108 L305 118 L295 128"/><rect class="diagram-highlight-fill diagram-outline" x="315" y="65" width="200" height="105" rx="12"/><text class="diagram-label" x="415" y="98" text-anchor="middle" font-size="17">CaCl₂</text><text class="diagram-label diagram-muted" x="415" y="128" text-anchor="middle" font-size="13">calcium chloride</text><text class="diagram-label" x="280" y="205" text-anchor="middle" font-size="14">criss-cross charge magnitudes as subscripts; reduce if needed</text>`],
    'Ionic compounds': ['Alternating ions in an ionic lattice', 'Oppositely charged ions attract in a repeating three-dimensional lattice; a formula unit gives the simplest ion ratio.', '0 0 440 280', `<path class="diagram-outline diagram-muted" d="M120 75 L270 75 L320 120 L170 120 Z M120 130 L270 130 L320 175 L170 175 Z M120 185 L270 185 L320 230 L170 230 Z M120 75 V185 M170 120 V230 M270 75 V185 M320 120 V230 M120 130 L270 130 M170 175 L320 175"/><text class="diagram-label" x="145" y="105" text-anchor="middle" font-size="16">+</text><text class="diagram-label" x="220" y="105" text-anchor="middle" font-size="16">−</text><text class="diagram-label" x="295" y="105" text-anchor="middle" font-size="16">+</text><text class="diagram-label" x="145" y="160" text-anchor="middle" font-size="16">−</text><text class="diagram-label" x="220" y="160" text-anchor="middle" font-size="16">+</text><text class="diagram-label" x="295" y="160" text-anchor="middle" font-size="16">−</text><text class="diagram-label" x="350" y="137" font-size="13">ionic lattice</text><text class="diagram-label diagram-muted" x="220" y="260" text-anchor="middle" font-size="13">electrostatic attraction acts in every direction</text>`],
    'Covalent compounds': ['Shared pairs in a water molecule', 'Oxygen shares one electron pair with each hydrogen and keeps two lone pairs in the Lewis model.', '0 0 420 260', `<circle class="diagram-outline" cx="210" cy="135" r="52"/><circle class="diagram-outline" cx="105" cy="135" r="34"/><circle class="diagram-outline" cx="315" cy="135" r="34"/><text class="diagram-label" x="210" y="141" text-anchor="middle" font-size="18">O</text><text class="diagram-label" x="105" y="141" text-anchor="middle" font-size="18">H</text><text class="diagram-label" x="315" y="141" text-anchor="middle" font-size="18">H</text><circle class="diagram-highlight-fill" cx="157" cy="128" r="5"/><circle class="diagram-highlight-fill" cx="169" cy="142" r="5"/><circle class="diagram-highlight-fill" cx="251" cy="128" r="5"/><circle class="diagram-highlight-fill" cx="263" cy="142" r="5"/><circle class="diagram-highlight-fill" cx="200" cy="76" r="5"/><circle class="diagram-highlight-fill" cx="220" cy="76" r="5"/><circle class="diagram-highlight-fill" cx="200" cy="194" r="5"/><circle class="diagram-highlight-fill" cx="220" cy="194" r="5"/><text class="diagram-label diagram-muted" x="210" y="240" text-anchor="middle" font-size="13">two bonding pairs + two lone pairs on O</text>`],
    'Chemical reactions': ['Reactants rearrange into products', 'Atoms are conserved in a chemical reaction; bonds break and new bonds form.', '0 0 620 230', `<text class="diagram-label" x="155" y="37" text-anchor="middle" font-size="16">before: reactants</text><circle class="diagram-outline" cx="105" cy="112" r="24"/><circle class="diagram-outline" cx="155" cy="112" r="24"/><circle class="diagram-highlight-fill" cx="225" cy="112" r="20"/><circle class="diagram-highlight-fill" cx="270" cy="112" r="20"/><path class="diagram-outline" d="M307 112 H365 M355 102 L365 112 L355 122"/><text class="diagram-label" x="484" y="37" text-anchor="middle" font-size="16">after: products</text><circle class="diagram-outline" cx="420" cy="112" r="24"/><circle class="diagram-highlight-fill" cx="465" cy="112" r="20"/><circle class="diagram-outline" cx="515" cy="112" r="24"/><circle class="diagram-highlight-fill" cx="560" cy="112" r="20"/><text class="diagram-label diagram-muted" x="310" y="186" text-anchor="middle" font-size="13">same kinds and counts of atoms; different connections</text>`],
    'Balancing equations': ['Particle count in 2H₂ + O₂ → 2H₂O', 'The coefficients make four hydrogen atoms and two oxygen atoms on each side; subscripts stay unchanged.', '0 0 680 240', `<text class="diagram-label" x="170" y="38" text-anchor="middle" font-size="17">reactants</text><circle class="diagram-outline" cx="85" cy="95" r="17"/><circle class="diagram-outline" cx="120" cy="95" r="17"/><circle class="diagram-outline" cx="85" cy="145" r="17"/><circle class="diagram-outline" cx="120" cy="145" r="17"/><text class="diagram-label" x="102" y="197" text-anchor="middle" font-size="14">2H₂</text><circle class="diagram-highlight-fill" cx="195" cy="95" r="17"/><circle class="diagram-highlight-fill" cx="230" cy="95" r="17"/><text class="diagram-label" x="212" y="145" text-anchor="middle" font-size="14">O₂</text><text class="diagram-label" x="325" y="124" text-anchor="middle" font-size="22">→</text><text class="diagram-label" x="500" y="38" text-anchor="middle" font-size="17">products</text><circle class="diagram-outline" cx="430" cy="115" r="22"/><circle class="diagram-highlight-fill" cx="400" cy="115" r="15"/><circle class="diagram-highlight-fill" cx="460" cy="115" r="15"/><circle class="diagram-outline" cx="520" cy="115" r="22"/><circle class="diagram-highlight-fill" cx="490" cy="115" r="15"/><circle class="diagram-highlight-fill" cx="550" cy="115" r="15"/><text class="diagram-label" x="490" y="170" text-anchor="middle" font-size="14">2H₂O</text><text class="diagram-label diagram-muted" x="340" y="220" text-anchor="middle" font-size="13">H: 4 = 4 · O: 2 = 2</text>`],
    'Reaction stoichiometry': ['Use a balanced equation as a mole map', 'The coefficients in a balanced equation give the mole ratio used to convert between substances.', '0 0 620 230', `<rect class="diagram-outline" x="45" y="70" width="180" height="80" rx="12"/><text class="diagram-label" x="135" y="102" text-anchor="middle" font-size="16">2 mol H₂</text><text class="diagram-label diagram-muted" x="135" y="127" text-anchor="middle" font-size="13">known amount</text><path class="diagram-outline" d="M235 110 H385 M375 100 L385 110 L375 120"/><text class="diagram-label diagram-highlight" x="310" y="83" text-anchor="middle" font-size="14">× 2 mol H₂O</text><text class="diagram-label diagram-highlight" x="310" y="146" text-anchor="middle" font-size="14">÷ 2 mol H₂</text><rect class="diagram-highlight-fill diagram-outline" x="395" y="70" width="180" height="80" rx="12"/><text class="diagram-label" x="485" y="102" text-anchor="middle" font-size="16">2 mol H₂O</text><text class="diagram-label diagram-muted" x="310" y="196" text-anchor="middle" font-size="13">balanced coefficients → mole ratio → desired quantity</text>`],
    'Concentration': ['Molar concentration in a prepared solution', 'Concentration is moles of dissolved solute divided by the total solution volume in litres.', '0 0 520 270', `<path class="diagram-outline" d="M80 55 H245 M98 55 V190 Q98 210 120 210 H205 Q227 210 227 190 V55"/><path class="diagram-outline diagram-muted" d="M99 130 H226"/><circle class="diagram-highlight-fill" cx="130" cy="158" r="6"/><circle class="diagram-highlight-fill" cx="178" cy="179" r="6"/><circle class="diagram-highlight-fill" cx="198" cy="145" r="6"/><text class="diagram-label" x="162" y="240" text-anchor="middle" font-size="14">solution volume V (L)</text><text class="diagram-label" x="350" y="112" text-anchor="middle" font-size="25">C = n / V</text><text class="diagram-label diagram-muted" x="350" y="143" text-anchor="middle" font-size="14">mol/L = moles ÷ litres</text><text class="diagram-label diagram-muted" x="350" y="178" text-anchor="middle" font-size="13">dilution: C₁V₁ = C₂V₂</text>`],
    'Acids and bases': ['pH scale and aqueous solutions', 'At 25 °C, pH below 7 is acidic, 7 is neutral, and above 7 is basic; each pH step is tenfold in hydrogen-ion concentration.', '0 0 620 230', `<path class="diagram-outline" d="M85 110 H535 M525 100 L535 110 L525 120"/><rect class="diagram-highlight-fill" x="95" y="82" width="142" height="56" rx="10"/><rect class="diagram-outline" x="238" y="82" width="142" height="56" rx="10"/><rect class="diagram-highlight-fill" x="381" y="82" width="142" height="56" rx="10"/><text class="diagram-label" x="166" y="116" text-anchor="middle" font-size="16">acidic · pH &lt; 7</text><text class="diagram-label" x="309" y="116" text-anchor="middle" font-size="16">neutral · pH = 7</text><text class="diagram-label" x="452" y="116" text-anchor="middle" font-size="16">basic · pH &gt; 7</text><text class="diagram-label diagram-muted" x="166" y="166" text-anchor="middle" font-size="13">more H₃O⁺</text><text class="diagram-label diagram-muted" x="452" y="166" text-anchor="middle" font-size="13">more OH⁻</text><text class="diagram-label" x="310" y="205" text-anchor="middle" font-size="13">pH = −log₁₀[H₃O⁺] · neutralization: acid + base → salt + water</text>`],
    'Introduction to organic chemistry': ['Carbon skeletons and functional groups', 'Carbon forms four covalent bonds. Organic molecules can be drawn as structural formulas; each line is a shared electron pair.', '0 0 560 260', `<path class="diagram-outline" d="M110 130 L180 80 L250 130 L320 80 L390 130"/><text class="diagram-label" x="110" y="136" text-anchor="middle" font-size="16">C</text><text class="diagram-label" x="180" y="76" text-anchor="middle" font-size="16">C</text><text class="diagram-label" x="250" y="136" text-anchor="middle" font-size="16">C</text><text class="diagram-label" x="320" y="76" text-anchor="middle" font-size="16">C</text><text class="diagram-label" x="390" y="136" text-anchor="middle" font-size="16">C</text><path class="diagram-outline diagram-muted" d="M110 130 V70 M110 130 V190 M180 80 V35 M180 80 V130 M250 130 V190 M250 130 V70 M320 80 V35 M320 80 V130 M390 130 V70 M390 130 V190"/><text class="diagram-label" x="442" y="139" font-size="14">carbon chain</text><text class="diagram-label diagram-muted" x="280" y="232" text-anchor="middle" font-size="13">each carbon completes four bonds; attached H atoms are often omitted</text>`],
    'Energy changes in reactions': ['Exothermic and endothermic energy profiles', 'Exothermic reactions release energy to surroundings; endothermic reactions absorb it. Activation energy is the barrier to reaction.', '0 0 620 300', `<path class="diagram-outline" d="M70 45 V245 H565 M70 245 L70 45 M62 55 L70 45 L78 55 M555 237 L565 245 L555 253"/><text class="diagram-label" x="35" y="145" transform="rotate(-90 35 145)" text-anchor="middle" font-size="14">potential energy</text><text class="diagram-label" x="320" y="282" text-anchor="middle" font-size="14">reaction progress</text><path class="diagram-outline" d="M105 105 C170 105 165 65 245 65 S300 190 400 190 H520"/><path class="diagram-highlight" d="M105 215 C170 215 165 65 245 65 S300 105 400 105 H520"/><text class="diagram-label" x="450" y="181" font-size="13">products lower</text><text class="diagram-label diagram-muted" x="450" y="96" font-size="13">products higher</text><text class="diagram-label" x="500" y="213" font-size="13">exothermic</text><text class="diagram-label diagram-highlight" x="500" y="130" font-size="13">endothermic</text>`]
  };

  const completedLessons = [
    {
      title: 'Concentration', unit: 'Solutions & Acids', time: '18 min',
      goals: ['Calculate molar concentration in mol/L', 'Rearrange C = n/V to find amount or volume', 'Explain how dilution changes concentration'],
      vocabulary: [{ term: 'Concentration', definition: 'Amount of dissolved solute per volume of solution.' }, { term: 'Dilution', definition: 'Lowering concentration by adding solvent while keeping solute amount constant.' }],
      sections: [
        { heading: 'Meaning and units', content: 'A solution is a uniform mixture of solute and solvent. Molar concentration tells how much solute is in each litre of the final solution: \\(C=\\frac{n}{V}\\). Here \\(C\\) is in mol/L, \\(n\\) in mol, and \\(V\\) in L. Convert mL to L by dividing by 1000.' },
        { heading: 'Solve and check', content: 'Rearrange the same relationship: \\(n=CV\\), or \\(V=\\frac{n}{C}\\). A larger amount in the same volume gives a more concentrated solution. When diluting a measured stock, solute amount is unchanged, so \\(C_1V_1=C_2V_2\\). The final volume means total solution volume, not the amount of water added.' }
      ],
      examples: [{ prompt: 'Find C for 0.150 mol of solute in 300. mL of solution.', steps: ['Convert volume: 300. mL = 0.300 L; the formula requires litres.', 'Substitute: C = 0.150 mol ÷ 0.300 L.', 'Calculate and report units: C = 0.500 mol/L.'], answer: '0.500 mol/L' }],
      diagram: diagrams.Concentration,
      practice: [
        { id: 'chem11-concentration-q1', type: 'multiple-choice', question: 'What is the concentration of 0.200 mol in 0.500 L?', options: ['0.100 mol/L', '0.400 mol/L', '2.50 mol/L'], answer: '0.400 mol/L', explanation: 'Use C=n/V: 0.200 ÷ 0.500 = 0.400 mol/L. Multiplying gives the wrong direction.' },
        { id: 'chem11-concentration-q2', type: 'multiple-choice', question: 'A 20.0 mL sample of 2.00 mol/L stock is diluted to 100.0 mL total. What is the new concentration?', options: ['0.400 mol/L', '2.00 mol/L', '10.0 mol/L'], answer: '0.400 mol/L', explanation: 'C₂=C₁V₁/V₂=2.00×20.0/100.0=0.400 mol/L. Use the final total volume.' }
      ],
      summary: ['C=n/V with V in litres.', 'Dilution keeps n constant: C₁V₁=C₂V₂.'],
      cheatSheet: ['C=n/V', 'n=CV', 'C₁V₁=C₂V₂']
    },
    {
      title: 'Acids and bases', unit: 'Solutions & Acids', time: '20 min',
      goals: ['Distinguish acids and bases in aqueous solution', 'Interpret pH and its logarithmic scale', 'Describe neutralization products'],
      vocabulary: [{ term: 'Acid', definition: 'A substance that increases hydronium-ion concentration in water.' }, { term: 'Base', definition: 'A substance that accepts H⁺ or increases hydroxide-ion concentration in water.' }, { term: 'Neutralization', definition: 'Reaction of an acid and a base that produces water and dissolved ions (a salt).' }],
      sections: [
        { heading: 'Acids and bases in water', content: 'In water, acids increase hydronium \\(\\mathrm{H_3O^+}\\); bases may provide hydroxide \\(\\mathrm{OH^-}\\) or accept a proton. Indicators change colour over a pH range. Never identify an unknown chemical by tasting or touching it.' },
        { heading: 'Read pH', content: 'At about 25 °C, pH below 7 is acidic, 7 is neutral, and above 7 is basic. The scale is logarithmic: a solution at pH 3 has ten times the hydronium concentration of one at pH 4. For dilute aqueous solutions, \\(\\mathrm{pH}=-\\log_{10}[H_3O^+]\\), with concentration in mol/L.' },
        { heading: 'Neutralization', content: 'A typical acid-base reaction forms water and a salt: \\(\\mathrm{HCl+NaOH\\rightarrow NaCl+H_2O}\\). The ionic core is \\(\\mathrm{H^++OH^-\rightarrow H_2O}\\). Balance atoms and charge; neutralization does not always make the final solution exactly pH 7 if reactants are not mixed in matching amounts.' }
      ],
      examples: [{ prompt: 'Compare pH 2 and pH 5 solutions by hydronium concentration.', steps: ['A difference of 3 pH units represents a factor of 10³.', 'The pH 2 solution has 1000 times the hydronium concentration of pH 5.', 'A lower pH means more acidic, not merely “three times as acidic.”'], answer: 'pH 2 has 1000× the [H₃O⁺] of pH 5.' }],
      diagram: diagrams['Acids and bases'],
      practice: [
        { id: 'chem11-acids-q1', type: 'multiple-choice', question: 'Which solution is most acidic?', options: ['pH 2', 'pH 6', 'pH 8'], answer: 'pH 2', explanation: 'Lower pH means greater hydronium concentration and greater acidity.' },
        { id: 'chem11-acids-q2', type: 'multiple-choice', question: 'What are the products of HCl + NaOH → ?', options: ['NaCl + H₂O', 'NaH + ClO', 'H₂ + NaClO'], answer: 'NaCl + H₂O', explanation: 'Acid-base neutralization forms water and a salt; balance as written, 1:1.' }
      ],
      summary: ['Acids increase H₃O⁺; bases accept H⁺ or increase OH⁻.', 'Each pH step is a tenfold concentration change.', 'Acid + base can form salt + water.'],
      cheatSheet: ['pH=−log₁₀[H₃O⁺]', 'H⁺ + OH⁻ → H₂O']
    },
    {
      title: 'Introduction to organic chemistry', unit: 'Organic Chemistry & Energy', time: '20 min',
      goals: ['Explain why carbon forms many compounds', 'Read a simple structural formula', 'Distinguish saturated and unsaturated hydrocarbons'],
      vocabulary: [{ term: 'Hydrocarbon', definition: 'A compound containing only carbon and hydrogen.' }, { term: 'Alkane', definition: 'A saturated hydrocarbon with only carbon-carbon single bonds.' }, { term: 'Functional group', definition: 'A specific atom or group of atoms that strongly influences a molecule’s properties and reactions.' }],
      sections: [
        { heading: 'Carbon frameworks', content: 'Carbon has four valence electrons and usually forms four covalent bonds. Carbon atoms connect into chains, branches, and rings, and can bond to elements such as H, O, and N. This flexibility makes a very large range of organic molecules.' },
        { heading: 'Read structures', content: 'In a structural formula, each line represents a shared pair of electrons. In a line-angle sketch, every line end and corner represents a carbon; hydrogens attached to carbon are usually omitted. Add enough H atoms to give each neutral carbon four bonds.' },
        { heading: 'Families and properties', content: 'Alkanes have only single C–C bonds; alkenes contain at least one C=C double bond. A functional group, such as –OH in an alcohol, helps predict chemical behaviour. Two molecules with the same molecular formula can have different structures and properties (isomers).' }
      ],
      examples: [{ prompt: 'Interpret CH₃–CH₂–OH.', steps: ['There are two carbon atoms joined by a single bond.', 'The –OH group identifies an alcohol; it is not a hydrocarbon because oxygen is present.', 'The molecular formula is C₂H₆O; each carbon has four bonds.'], answer: 'Ethanol: a two-carbon alcohol.' }],
      diagram: diagrams['Introduction to organic chemistry'],
      practice: [
        { id: 'chem11-organic-q1', type: 'multiple-choice', question: 'What does each line in a structural formula represent?', options: ['A shared electron pair (covalent bond)', 'One proton', 'One mole of atoms'], answer: 'A shared electron pair (covalent bond)', explanation: 'A line represents one covalent bond: two shared electrons.' },
        { id: 'chem11-organic-q2', type: 'multiple-choice', question: 'Which feature makes a hydrocarbon unsaturated?', options: ['A C=C double bond', 'Only C–C single bonds', 'An –OH group'], answer: 'A C=C double bond', explanation: 'An alkene has a carbon-carbon double bond; –OH instead indicates an alcohol functional group.' }
      ],
      summary: ['Carbon forms four covalent bonds and builds chains, branches, and rings.', 'Structural lines show shared pairs; carbon hydrogens may be omitted.', 'Functional groups help classify organic compounds.'],
      cheatSheet: ['Carbon: typically 4 bonds', 'alkane: C–C only', 'alkene: contains C=C']
    },
    {
      title: 'Energy changes in reactions', unit: 'Organic Chemistry & Energy', time: '18 min',
      goals: ['Distinguish exothermic and endothermic changes', 'Interpret a reaction energy profile', 'Explain activation energy and energy change'],
      vocabulary: [{ term: 'Exothermic', definition: 'Transfers energy from the reacting system to the surroundings.' }, { term: 'Endothermic', definition: 'Transfers energy from the surroundings into the reacting system.' }, { term: 'Activation energy', definition: 'Minimum energy reactant particles need for a reaction pathway.' }],
      sections: [
        { heading: 'Track energy', content: 'A reaction transfers energy between the reacting system and its surroundings. If the surroundings warm, the reaction may be exothermic; if they cool, it may be endothermic. Define the system before describing the direction of transfer.' },
        { heading: 'Energy profiles', content: 'A reaction profile plots potential energy against reaction progress. Reactants rise to a peak because bonds must be disrupted and an activated arrangement formed; the peak-to-reactant difference is activation energy. Products lower than reactants means energy was released (\\(\\Delta H<0\\)); products higher means energy was absorbed (\\(\\Delta H>0\\)).' },
        { heading: 'Bond energy model', content: 'Breaking bonds requires energy; forming bonds releases energy. The overall change is approximately \\(\\Delta H=\\text{energy to break bonds}-\\text{energy released forming bonds}\\). A catalyst offers a lower-activation-energy pathway; it does not change reactant/product energies or \\(\\Delta H\\).' }
      ],
      examples: [{ prompt: 'A reaction profile has products 80 kJ lower than reactants. Classify it and state ΔH.', steps: ['Compare product energy with reactant energy.', 'Products are lower, so energy leaves the reacting system: exothermic.', 'ΔH = products − reactants = −80 kJ for the reaction as written.'], answer: 'Exothermic; ΔH = −80 kJ.' }],
      diagram: diagrams['Energy changes in reactions'],
      practice: [
        { id: 'chem11-energy-q1', type: 'multiple-choice', question: 'Products lie above reactants on an energy profile. What is true?', options: ['Endothermic; ΔH > 0', 'Exothermic; ΔH < 0', 'A catalyst changed ΔH'], answer: 'Endothermic; ΔH > 0', explanation: 'The system ends at higher energy, so it absorbed energy. A catalyst changes activation energy, not ΔH.' },
        { id: 'chem11-energy-q2', type: 'multiple-choice', question: 'What does a catalyst change?', options: ['The activation-energy pathway', 'The identities of products in every reaction', 'The overall energy difference ΔH'], answer: 'The activation-energy pathway', explanation: 'A catalyst lowers activation energy by an alternate pathway; initial and final energies stay the same.' }
      ],
      summary: ['Exothermic: ΔH<0; endothermic: ΔH>0.', 'Activation energy is the reactant-to-peak energy difference.', 'A catalyst lowers activation energy, not ΔH.'],
      cheatSheet: ['ΔH=Hproducts−Hreactants', 'break bonds: energy in', 'form bonds: energy out']
    }
  ];

  for (const [title, [diagramTitle, caption, viewBox, svg]] of Object.entries(diagrams)) {
    const existing = course.lessons.find(item => item.title.toLowerCase() === title.toLowerCase());
    if (existing && !existing.diagram) existing.diagram = { title: diagramTitle, caption, viewBox, svg };
  }
  for (const item of completedLessons) {
    const mapped = course.lessons.find(existing => existing.published === false &&
      existing.unit === item.unit && existing.title.toLowerCase() === item.title.toLowerCase());
    const authored = {
      id: mapped?.id || `chem11-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      ...item,
      diagram: { title: item.diagram[0], caption: item.diagram[1], viewBox: item.diagram[2], svg: item.diagram[3] },
      subunit: mapped?.subunit || item.unit,
      published: true,
      source: { name: 'StudyBC original lesson', curriculum: curriculumUrl },
      mistakes: [],
      interactive: { type: 'reflection', label: 'Explain the key idea before checking your answer.' }
    };
    if (mapped) course.lessons.splice(course.lessons.indexOf(mapped), 1, authored);
    else if (!course.lessons.some(existing => existing.title === item.title && existing.unit === item.unit)) course.lessons.push(authored);
  }

  course.units = course.units.map(unit => ({
    ...unit,
    lessons: course.lessons.filter(item => item.unit === unit.name).length
  }));
})();
