(() => {
  const data = window.STUDYBC_DATA;
  const curriculum = 'https://curriculum.gov.bc.ca/curriculum';
  const esc = value => String(value || '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
  })[ch]);
  const trimTopic = value => String(value || '').replace(/\s+/g, ' ').trim();
  const topicWords = value => trimTopic(value).split(/[;,/&]+|\s+and\s+/i).map(s => s.trim()).filter(Boolean);

  const visual = (course, lesson, category, labels) => {
    const short = value => {
      const text = trimTopic(value);
      if (text.length <= 18) return text;
      const boundary = text.lastIndexOf(' ', 15);
      return `${text.slice(0, boundary > 7 ? boundary : 15)}…`;
    };
    const [a, b, c] = labels.map(short).map(esc);
    const heading = esc(lesson.title);
    const description = `${lesson.title}: ${labels.join(', ')}`;
    const topic = lesson.title.toLowerCase();
    const context = `${course.title} ${lesson.unit}`.toLowerCase();
    const palettes = {
      math: `<path class="diagram-outline diagram-muted" d="M75 185 H565 M320 45 V250"/><path class="diagram-highlight" d="M115 218 Q190 188 250 130 T500 72"/><circle class="diagram-highlight-fill" cx="320" cy="112" r="7"/><text class="diagram-label" x="336" y="106" font-size="14">${a}</text><text class="diagram-label diagram-muted" x="565" y="210" font-size="13">x</text><text class="diagram-label diagram-muted" x="332" y="48" font-size="13">y</text><text class="diagram-label" x="320" y="275" text-anchor="middle" font-size="14">${b} → ${c}</text>`,
      science: `<circle class="diagram-outline diagram-muted" cx="310" cy="133" r="80"/><circle class="diagram-highlight-fill" cx="310" cy="133" r="25"/><text class="diagram-label" x="310" y="138" text-anchor="middle" font-size="12">${a}</text><rect class="diagram-outline" x="55" y="87" width="145" height="70" rx="12"/><text class="diagram-label" x="127" y="127" text-anchor="middle" font-size="14">${b}</text><rect class="diagram-outline" x="420" y="87" width="145" height="70" rx="12"/><text class="diagram-label" x="492" y="127" text-anchor="middle" font-size="14">${c}</text><path class="diagram-outline" d="M205 122 H228 M218 112 L228 122 L218 132 M392 122 H415 M405 112 L415 122 L405 132"/><text class="diagram-label diagram-muted" x="310" y="252" text-anchor="middle" font-size="13">model · interaction · observable evidence</text>`,
      humanities: `<path class="diagram-outline" d="M100 135 H520 M510 125 L520 135 L510 145"/><circle class="diagram-highlight-fill" cx="145" cy="135" r="16"/><circle class="diagram-outline" cx="310" cy="135" r="16"/><circle class="diagram-outline" cx="475" cy="135" r="16"/><text class="diagram-label" x="145" y="90" text-anchor="middle" font-size="14">${a}</text><text class="diagram-label" x="310" y="90" text-anchor="middle" font-size="14">${b}</text><text class="diagram-label" x="475" y="90" text-anchor="middle" font-size="14">${c}</text><text class="diagram-label diagram-muted" x="310" y="200" text-anchor="middle" font-size="13">connect ideas with sourced evidence; distinguish inference from fact</text>`,
      language: `<rect class="diagram-outline diagram-highlight-fill" x="35" y="82" width="165" height="92" rx="14"/><rect class="diagram-outline" x="228" y="82" width="165" height="92" rx="14"/><rect class="diagram-outline" x="421" y="82" width="165" height="92" rx="14"/><text class="diagram-label" x="117" y="119" text-anchor="middle" font-size="14">${a}</text><text class="diagram-label" x="117" y="144" text-anchor="middle" font-size="12">who / what</text><text class="diagram-label" x="310" y="119" text-anchor="middle" font-size="14">${b}</text><text class="diagram-label" x="310" y="144" text-anchor="middle" font-size="12">action / relation</text><text class="diagram-label" x="503" y="119" text-anchor="middle" font-size="14">${c}</text><text class="diagram-label" x="503" y="144" text-anchor="middle" font-size="12">detail / context</text><path class="diagram-outline" d="M202 128 H220 M212 120 L220 128 L212 136 M395 128 H413 M405 120 L413 128 L405 136"/><text class="diagram-label diagram-muted" x="310" y="218" text-anchor="middle" font-size="13">build meaning from parts, then check against context</text>`,
      design: `<rect class="diagram-outline" x="38" y="88" width="126" height="70" rx="12"/><rect class="diagram-outline diagram-highlight-fill" x="188" y="88" width="126" height="70" rx="12"/><rect class="diagram-outline" x="338" y="88" width="126" height="70" rx="12"/><rect class="diagram-outline" x="488" y="88" width="126" height="70" rx="12"/><text class="diagram-label" x="101" y="128" text-anchor="middle" font-size="13">${a}</text><text class="diagram-label" x="251" y="128" text-anchor="middle" font-size="13">${b}</text><text class="diagram-label" x="401" y="128" text-anchor="middle" font-size="13">make</text><text class="diagram-label" x="551" y="128" text-anchor="middle" font-size="13">${c}</text><path class="diagram-outline" d="M166 123 H181 M174 115 L182 123 L174 131 M316 123 H331 M324 115 L332 123 L324 131 M466 123 H481 M474 115 L482 123 L474 131"/><path class="diagram-outline diagram-muted" d="M550 166 Q550 220 102 220 Q82 220 82 166"/><text class="diagram-label diagram-muted" x="310" y="248" text-anchor="middle" font-size="13">test the result, reflect, then revise</text>`,
      process: `<rect class="diagram-outline" x="55" y="92" width="150" height="72" rx="12"/><rect class="diagram-outline diagram-highlight-fill" x="235" y="92" width="150" height="72" rx="12"/><rect class="diagram-outline" x="415" y="92" width="150" height="72" rx="12"/><text class="diagram-label" x="130" y="123" text-anchor="middle" font-size="13">${a}</text><text class="diagram-label diagram-muted" x="130" y="144" text-anchor="middle" font-size="12">observe / identify</text><text class="diagram-label" x="310" y="123" text-anchor="middle" font-size="13">${b}</text><text class="diagram-label diagram-muted" x="310" y="144" text-anchor="middle" font-size="12">apply a safe method</text><text class="diagram-label" x="490" y="123" text-anchor="middle" font-size="13">${c}</text><text class="diagram-label diagram-muted" x="490" y="144" text-anchor="middle" font-size="12">check / reflect</text><path class="diagram-outline" d="M208 128 H228 M220 120 L228 128 L220 136 M388 128 H408 M400 120 L408 128 L400 136"/>`
    };
    let svg = palettes[category] || palettes.process;
    if (category === 'science' && /punnett|inheritance pattern|monohybrid/.test(topic)) {
      svg = `<text class="diagram-label" x="318" y="35" text-anchor="middle" font-size="15">Aa × Aa · each parent contributes one allele</text><text class="diagram-label" x="255" y="78" text-anchor="middle" font-size="14">A</text><text class="diagram-label" x="355" y="78" text-anchor="middle" font-size="14">a</text><text class="diagram-label" x="145" y="132" text-anchor="middle" font-size="14">A</text><text class="diagram-label" x="145" y="212" text-anchor="middle" font-size="14">a</text><rect class="diagram-outline diagram-muted" x="195" y="92" width="220" height="160"/><path class="diagram-outline diagram-muted" d="M305 92 V252 M195 172 H415"/><rect class="diagram-highlight-fill diagram-outline" x="195" y="92" width="110" height="80"/><rect class="diagram-outline" x="305" y="92" width="110" height="80"/><rect class="diagram-outline" x="195" y="172" width="110" height="80"/><rect class="diagram-highlight-fill diagram-outline" x="305" y="172" width="110" height="80"/><text class="diagram-label" x="250" y="139" text-anchor="middle" font-size="18">AA</text><text class="diagram-label" x="360" y="139" text-anchor="middle" font-size="18">Aa</text><text class="diagram-label" x="250" y="219" text-anchor="middle" font-size="18">Aa</text><text class="diagram-label" x="360" y="219" text-anchor="middle" font-size="18">aa</text><text class="diagram-label" x="490" y="132" font-size="14">Genotypes</text><text class="diagram-label" x="490" y="155" font-size="14">1 AA : 2 Aa : 1 aa</text><text class="diagram-label" x="490" y="199" font-size="14">Phenotypes</text><text class="diagram-label" x="430" y="222" font-size="13">3:1 under complete dominance</text>`;
    } else if (category === 'science' && /biology|genetic|cell/.test(context) && /dna|gene|chromosome/.test(topic)) {
      svg = `<path class="diagram-outline" d="M215 45 C390 75 225 110 400 145 C225 180 390 215 215 245 M400 45 C225 75 390 110 215 145 C390 180 225 215 400 245"/><path class="diagram-outline diagram-muted" d="M245 59 L370 59 M260 83 L355 83 M282 109 L332 109 M332 135 L282 135 M355 161 L260 161 M370 187 L245 187 M350 213 L265 213 M325 237 L290 237"/><text class="diagram-label" x="120" y="92" font-size="14">sugar-phosphate</text><text class="diagram-label" x="120" y="112" font-size="14">backbone</text><path class="diagram-outline" d="M205 102 L255 102"/><text class="diagram-label" x="438" y="125" font-size="14">paired bases</text><path class="diagram-outline" d="M410 130 L430 130"/><text class="diagram-label diagram-muted" x="310" y="280" text-anchor="middle" font-size="13">DNA double helix · sequence stores genetic information</text>`;
    } else if (category === 'science' && /biology|genetic|cell/.test(context) && /cell|organelle/.test(topic)) {
      svg = `<path class="diagram-outline" d="M112 135 C105 72 199 48 285 69 C369 40 458 87 472 139 C470 197 386 224 300 202 C213 229 125 202 112 135 Z"/><circle class="diagram-highlight-fill" cx="288" cy="136" r="31"/><text class="diagram-label" x="288" y="141" text-anchor="middle" font-size="12">nucleus</text><ellipse class="diagram-outline" cx="187" cy="124" rx="26" ry="12"/><ellipse class="diagram-outline" cx="378" cy="164" rx="26" ry="12"/><text class="diagram-label" x="188" y="128" text-anchor="middle" font-size="10">mitochondrion</text><path class="diagram-outline" d="M303 106 L354 75"/><text class="diagram-label" x="360" y="75" font-size="13">cell membrane</text><text class="diagram-label diagram-muted" x="290" y="254" text-anchor="middle" font-size="13">cell structures work together; not to scale</text>`;
    } else if (category === 'science' && /chemistry/.test(context) && /mole|stoichiometr/.test(topic)) {
      svg = `<rect class="diagram-outline" x="25" y="82" width="160" height="84" rx="12"/><text class="diagram-label" x="105" y="116" text-anchor="middle" font-size="16">mass (g)</text><text class="diagram-label diagram-muted" x="105" y="142" text-anchor="middle" font-size="13">÷ molar mass</text><rect class="diagram-highlight-fill diagram-outline" x="240" y="82" width="160" height="84" rx="12"/><text class="diagram-label" x="320" y="124" text-anchor="middle" font-size="17">amount (mol)</text><rect class="diagram-outline" x="455" y="82" width="160" height="84" rx="12"/><text class="diagram-label" x="535" y="116" text-anchor="middle" font-size="15">particles</text><text class="diagram-label diagram-muted" x="535" y="142" text-anchor="middle" font-size="12">× 6.022×10²³</text><path class="diagram-outline" d="M190 122 H230 M218 112 L230 122 L218 132 M405 122 H445 M433 112 L445 122 L433 132"/><text class="diagram-label diagram-muted" x="320" y="220" text-anchor="middle" font-size="13">balanced coefficients convert moles of one substance to another</text>`;
    } else if (category === 'science' && /chemistry/.test(context) && /bond|molecular|ionic|covalent/.test(topic)) {
      svg = `<text class="diagram-label" x="165" y="44" text-anchor="middle" font-size="15">ionic · electron transfer</text><circle class="diagram-outline" cx="120" cy="122" r="38"/><text class="diagram-label" x="120" y="127" text-anchor="middle" font-size="16">Na</text><circle class="diagram-outline" cx="218" cy="122" r="43"/><text class="diagram-label" x="218" y="127" text-anchor="middle" font-size="16">Cl</text><circle class="diagram-highlight-fill" cx="161" cy="85" r="7"/><path class="diagram-outline" d="M166 85 H184 M176 77 L184 85 L176 93"/><text class="diagram-label" x="167" y="170" text-anchor="middle" font-size="13">Na⁺ + Cl⁻</text><path class="diagram-outline diagram-muted" d="M310 45 V195"/><text class="diagram-label" x="470" y="44" text-anchor="middle" font-size="15">covalent · shared pair</text><circle class="diagram-outline" cx="430" cy="122" r="38"/><circle class="diagram-outline" cx="510" cy="122" r="38"/><circle class="diagram-highlight-fill" cx="465" cy="116" r="6"/><circle class="diagram-highlight-fill" cx="477" cy="128" r="6"/><text class="diagram-label diagram-muted" x="470" y="190" text-anchor="middle" font-size="13">bond type depends on electron behaviour</text>`;
    } else if (category === 'science' && /physics|motion/.test(context) && /force|dynamics|newton/.test(topic)) {
      svg = `<rect class="diagram-outline" x="270" y="105" width="100" height="72" rx="12"/><text class="diagram-label" x="320" y="146" text-anchor="middle" font-size="15">object</text><path class="diagram-outline" d="M320 105 V48 M310 60 L320 48 L330 60 M320 177 V238 M310 226 L320 238 L330 226 M270 141 H205 M217 131 L205 141 L217 151 M370 141 H435 M423 131 L435 141 L423 151"/><text class="diagram-label" x="320" y="38" text-anchor="middle" font-size="14">Fₙ</text><text class="diagram-label" x="320" y="262" text-anchor="middle" font-size="14">Fᵍ</text><text class="diagram-label" x="195" y="136" text-anchor="end" font-size="13">Ff</text><text class="diagram-label" x="445" y="136" font-size="13">Fapp</text><text class="diagram-label diagram-muted" x="320" y="286" text-anchor="middle" font-size="12">free-body diagram · vectors show forces acting on the object</text>`;
    } else if (category === 'math' && /sine law|cosine law|non-right triangle|oblique triangle/.test(topic)) {
      svg = `<path class="diagram-outline" d="M105 218 L300 55 L520 218 Z"/><path class="diagram-outline diagram-muted" d="M298 72 A24 24 0 0 1 322 83 M125 218 A23 23 0 0 0 121 201 M500 218 A23 23 0 0 1 514 199"/><text class="diagram-label" x="300" y="42" text-anchor="middle" font-size="16">C · side c</text><text class="diagram-label" x="85" y="236" font-size="16">A</text><text class="diagram-label" x="520" y="238" font-size="16">B</text><text class="diagram-label" x="285" y="231" text-anchor="middle" font-size="14">side c opposite C</text><text class="diagram-label" x="146" y="125" font-size="14">side b</text><text class="diagram-label" x="418" y="125" font-size="14">side a</text><text class="diagram-label diagram-muted" x="320" y="278" text-anchor="middle" font-size="13">Sine law pairs each side with its opposite angle; triangle angle sum = 180°</text>`;
    } else if (category === 'math' && /trigon|triangle|sine|cosine|right angle/.test(topic)) {
      svg = `<path class="diagram-outline" d="M105 225 L105 78 L500 225 Z"/><path class="diagram-outline diagram-muted" d="M105 203 H127 V225 M466 225 A34 34 0 0 1 475 199"/><text class="diagram-label" x="91" y="70" font-size="15">B</text><text class="diagram-label" x="90" y="245" font-size="15">A · 90°</text><text class="diagram-label" x="505" y="245" font-size="15">C · θ</text><text class="diagram-label" x="254" y="246" text-anchor="middle" font-size="13">adjacent</text><text class="diagram-label" x="80" y="152" text-anchor="middle" font-size="13" transform="rotate(-90 80 152)">opposite</text><text class="diagram-label" x="309" y="137" text-anchor="middle" font-size="13" transform="rotate(20 309 137)">hypotenuse</text><text class="diagram-label diagram-muted" x="320" y="278" text-anchor="middle" font-size="13">SOH · CAH · TOA: name sides relative to θ</text>`;
    } else if (category === 'math' && /derivative|differentiation|tangent line|curve analysis|optimization/.test(topic)) {
      svg = `<path class="diagram-outline diagram-muted" d="M75 220 H565 M320 45 V250"/><path class="diagram-highlight" d="M130 213 Q220 192 286 138 T510 65"/><path class="diagram-outline" d="M185 223 L465 92"/><circle class="diagram-highlight-fill" cx="320" cy="126" r="7"/><text class="diagram-label" x="333" y="119" font-size="14">(a, f(a))</text><text class="diagram-label" x="446" y="95" font-size="13">tangent slope f′(a)</text><text class="diagram-label diagram-muted" x="565" y="215" font-size="13">x</text><text class="diagram-label diagram-muted" x="331" y="50" font-size="13">y</text><text class="diagram-label" x="320" y="278" text-anchor="middle" font-size="13">derivative = instantaneous rate at the marked point</text>`;
    } else if (category === 'math' && /limit|continuity/.test(topic)) {
      svg = `<path class="diagram-outline diagram-muted" d="M75 220 H565 M320 45 V250"/><path class="diagram-highlight" d="M120 210 L490 70"/><circle class="diagram-outline diagram-highlight-fill" cx="320" cy="144" r="8"/><circle class="diagram-outline" cx="320" cy="144" r="4"/><path class="diagram-outline diagram-muted" d="M320 144 V220 M310 220 H330"/><text class="diagram-label" x="335" y="138" font-size="14">approach f(a)</text><text class="diagram-label" x="320" y="278" text-anchor="middle" font-size="13">limit: nearby values approach a value; continuity also requires f(a)</text>`;
    } else if (category === 'science' && /physics|motion|kinematic/.test(context) && /force|dynamics|newton/.test(topic)) {
      svg = `<circle class="diagram-outline diagram-highlight-fill" cx="320" cy="148" r="34"/><path class="diagram-outline" d="M320 112 V45 M310 57 L320 45 L330 57 M320 184 V250 M310 238 L320 250 L330 238 M286 148 H205 M217 138 L205 148 L217 158 M354 148 H435 M423 138 L435 148 L423 158"/><text class="diagram-label" x="320" y="153" text-anchor="middle" font-size="14">object</text><text class="diagram-label" x="320" y="38" text-anchor="middle" font-size="14">Fₙ</text><text class="diagram-label" x="320" y="271" text-anchor="middle" font-size="14">Fᵍ</text><text class="diagram-label" x="184" y="153" text-anchor="end" font-size="14">Fₐₚₚ / Ff</text><text class="diagram-label" x="455" y="153" font-size="14">net force</text><text class="diagram-label diagram-muted" x="320" y="288" text-anchor="middle" font-size="12">draw vectors from the object; direction shows force direction</text>`;
    } else if (category === 'science' && /physics|motion/.test(context) && /kinematic|motion graph|velocity|acceleration/.test(topic)) {
      svg = `<path class="diagram-outline" d="M82 220 H550 M82 220 V52 M82 60 L76 70 M550 220 L540 214 M82 163 L510 78"/><text class="diagram-label" x="540" y="245" font-size="13">time (s)</text><text class="diagram-label" x="35" y="65" font-size="13">velocity</text><text class="diagram-label" x="300" y="104" font-size="14">slope = acceleration</text><text class="diagram-label" x="300" y="200" font-size="13">area under v–t = displacement</text><path class="diagram-outline diagram-muted" d="M82 163 H510 V220 H82 Z"/>`;
    } else if (category === 'science' && /chemistry/.test(context) && /atom|atomic structure|periodic/.test(topic)) {
      svg = `<circle class="diagram-outline diagram-muted" cx="305" cy="130" r="82"/><circle class="diagram-outline diagram-muted" cx="305" cy="130" r="47"/><circle class="diagram-highlight-fill" cx="305" cy="130" r="23"/><text class="diagram-label" x="305" y="126" text-anchor="middle" font-size="11">nucleus</text><text class="diagram-label" x="305" y="141" text-anchor="middle" font-size="11">p⁺, n⁰</text><circle class="diagram-highlight-fill" cx="305" cy="48" r="7"/><circle class="diagram-highlight-fill" cx="352" cy="130" r="7"/><text class="diagram-label" x="395" y="94" font-size="14">electrons (e⁻)</text><text class="diagram-label diagram-muted" x="305" y="245" text-anchor="middle" font-size="13">Bohr model · shells are energy levels, not paths</text>`;
    } else if (category === 'science' && /chemistry/.test(context) && /reaction|stoichiometr|balancing|equation/.test(topic)) {
      svg = `<rect class="diagram-outline" x="45" y="82" width="190" height="76" rx="12"/><text class="diagram-label" x="140" y="127" text-anchor="middle" font-size="16">reactants</text><path class="diagram-outline" d="M248 120 H390 M375 105 L390 120 L375 135"/><rect class="diagram-outline diagram-highlight-fill" x="405" y="82" width="190" height="76" rx="12"/><text class="diagram-label" x="500" y="127" text-anchor="middle" font-size="16">products</text><text class="diagram-label diagram-muted" x="320" y="205" text-anchor="middle" font-size="14">atoms rearrange; a balanced equation conserves each element</text><text class="diagram-label" x="320" y="236" text-anchor="middle" font-size="13">coefficients give mole ratios</text>`;
    } else if (category === 'science' && /biology|genetic|cell/.test(context) && /cell/.test(topic)) {
      svg = `<path class="diagram-outline" d="M112 135 C105 72 199 48 285 69 C369 40 458 87 472 139 C470 197 386 224 300 202 C213 229 125 202 112 135 Z"/><circle class="diagram-highlight-fill" cx="288" cy="136" r="31"/><text class="diagram-label" x="288" y="141" text-anchor="middle" font-size="12">nucleus</text><path class="diagram-outline" d="M303 106 L354 75"/><text class="diagram-label" x="360" y="75" font-size="13">cell membrane</text><text class="diagram-label diagram-muted" x="290" y="254" text-anchor="middle" font-size="13">cell model · structures interact; not to scale</text>`;
    } else if (category === 'science' && /biology|genetic|cell|mitosis|meiosis/.test(context + topic) && /mitosis|meiosis|chromosome/.test(topic)) {
      svg = `<text class="diagram-label" x="310" y="32" text-anchor="middle" font-size="15">one diploid parent cell</text><circle class="diagram-outline" cx="310" cy="104" r="42"/><path class="diagram-highlight" d="M296 91 L309 117 M309 91 L296 117 M312 91 L325 117 M325 91 L312 117"/><path class="diagram-outline" d="M310 148 V178 M160 178 H460 M160 178 V193 M260 178 V193 M360 178 V193 M460 178 V193"/><circle class="diagram-outline diagram-highlight-fill" cx="160" cy="220" r="23"/><circle class="diagram-outline diagram-highlight-fill" cx="260" cy="220" r="23"/><circle class="diagram-outline diagram-muted" cx="360" cy="220" r="20"/><circle class="diagram-outline diagram-muted" cx="460" cy="220" r="20"/><text class="diagram-label" x="210" y="273" text-anchor="middle" font-size="13">mitosis → 2 cells; chromosome number maintained</text><text class="diagram-label diagram-muted" x="430" y="253" text-anchor="middle" font-size="12">meiosis → 4 haploid cells</text>`;
    } else if (category === 'science') {
      svg = `<rect class="diagram-outline" x="38" y="84" width="165" height="78" rx="12"/><rect class="diagram-outline diagram-highlight-fill" x="238" y="84" width="165" height="78" rx="12"/><rect class="diagram-outline" x="438" y="84" width="165" height="78" rx="12"/><text class="diagram-label" x="120" y="119" text-anchor="middle" font-size="13">${a}</text><text class="diagram-label diagram-muted" x="120" y="141" text-anchor="middle" font-size="12">system / conditions</text><text class="diagram-label" x="320" y="119" text-anchor="middle" font-size="13">${b}</text><text class="diagram-label diagram-muted" x="320" y="141" text-anchor="middle" font-size="12">process / relationship</text><text class="diagram-label" x="520" y="119" text-anchor="middle" font-size="13">${c}</text><text class="diagram-label diagram-muted" x="520" y="141" text-anchor="middle" font-size="12">evidence / outcome</text><path class="diagram-outline" d="M205 123 H228 M218 113 L228 123 L218 133 M405 123 H428 M418 113 L428 123 L418 133"/>`;
    } else if (category === 'math') {
      svg = `<rect class="diagram-outline" x="38" y="88" width="165" height="74" rx="12"/><rect class="diagram-outline diagram-highlight-fill" x="238" y="88" width="165" height="74" rx="12"/><rect class="diagram-outline" x="438" y="88" width="165" height="74" rx="12"/><text class="diagram-label" x="120" y="119" text-anchor="middle" font-size="13">${a}</text><text class="diagram-label diagram-muted" x="120" y="142" text-anchor="middle" font-size="12">known quantities</text><text class="diagram-label" x="320" y="119" text-anchor="middle" font-size="13">${b}</text><text class="diagram-label diagram-muted" x="320" y="142" text-anchor="middle" font-size="12">rule / representation</text><text class="diagram-label" x="520" y="119" text-anchor="middle" font-size="13">${c}</text><text class="diagram-label diagram-muted" x="520" y="142" text-anchor="middle" font-size="12">result + check</text><path class="diagram-outline" d="M205 123 H228 M218 113 L228 123 L218 133 M405 123 H428 M418 113 L428 123 L418 133"/>`;
    }
    if (category === 'language') {
      svg = `<text class="diagram-label" x="320" y="36" text-anchor="middle" font-size="15">${a} · sentence structure</text><rect class="diagram-outline diagram-highlight-fill" x="42" y="72" width="160" height="58" rx="10"/><rect class="diagram-outline" x="240" y="72" width="160" height="58" rx="10"/><rect class="diagram-outline" x="438" y="72" width="160" height="58" rx="10"/><text class="diagram-label" x="122" y="106" text-anchor="middle" font-size="14">subject</text><text class="diagram-label" x="320" y="106" text-anchor="middle" font-size="14">conjugated verb</text><text class="diagram-label" x="518" y="106" text-anchor="middle" font-size="14">detail</text><path class="diagram-outline" d="M202 101 H234 M224 93 L234 101 L224 109 M400 101 H432 M422 93 L432 101 L422 109"/><path class="diagram-outline diagram-muted" d="M122 130 V166 H518 V130 M320 130 V166"/><text class="diagram-label" x="320" y="202" text-anchor="middle" font-size="15">${b} → ${c}</text><text class="diagram-label diagram-muted" x="320" y="238" text-anchor="middle" font-size="13">Check word order, agreement, tense, and meaning in context.</text>`;
    } else if (category === 'math' && /factor|polynomial|expand|area model/.test(topic)) {
      svg = `<text class="diagram-label" x="320" y="37" text-anchor="middle" font-size="15">Area model · ${a}</text><rect class="diagram-outline" x="188" y="72" width="110" height="62"/><rect class="diagram-outline diagram-highlight-fill" x="298" y="72" width="110" height="62"/><rect class="diagram-outline" x="188" y="134" width="110" height="62"/><rect class="diagram-outline" x="298" y="134" width="110" height="62"/><path class="diagram-outline diagram-muted" d="M188 64 V55 H298 V64 M298 55 H408 V64 M180 72 H168 V134 H180 M168 134 V196 H180"/><text class="diagram-label" x="243" y="109" text-anchor="middle" font-size="14">x²</text><text class="diagram-label" x="353" y="109" text-anchor="middle" font-size="14">x</text><text class="diagram-label" x="243" y="171" text-anchor="middle" font-size="14">x</text><text class="diagram-label" x="353" y="171" text-anchor="middle" font-size="14">1</text><text class="diagram-label" x="320" y="235" text-anchor="middle" font-size="14">(x + 1)² = x² + 2x + 1</text>`;
    } else if (category === 'process' && /computer|technology|programming|web development/.test(context)) {
      svg = `<text class="diagram-label" x="320" y="38" text-anchor="middle" font-size="15">${heading}</text><rect class="diagram-outline" x="42" y="87" width="150" height="64" rx="12"/><path class="diagram-outline diagram-highlight-fill" d="M320 75 L410 119 L320 163 L230 119 Z"/><rect class="diagram-outline" x="448" y="87" width="150" height="64" rx="12"/><text class="diagram-label" x="117" y="125" text-anchor="middle" font-size="14">input</text><text class="diagram-label" x="320" y="124" text-anchor="middle" font-size="14">condition / step</text><text class="diagram-label" x="523" y="125" text-anchor="middle" font-size="14">output</text><path class="diagram-outline" d="M195 119 H226 M215 111 L226 119 L215 127 M412 119 H444 M433 111 L444 119 L433 127"/><path class="diagram-outline diagram-muted" d="M320 164 V208 H117 V155 M320 208 H523 V155"/><text class="diagram-label diagram-muted" x="320" y="245" text-anchor="middle" font-size="13">Trace a normal case and a boundary case; compare expected and actual output.</text>`;
    } else if (category === 'process' && /business|economics|accounting|marketing|entrepreneur/.test(context)) {
      svg = `<text class="diagram-label" x="320" y="38" text-anchor="middle" font-size="15">${heading}</text><rect class="diagram-outline" x="38" y="90" width="160" height="72" rx="12"/><rect class="diagram-outline diagram-highlight-fill" x="240" y="90" width="160" height="72" rx="12"/><rect class="diagram-outline" x="442" y="90" width="160" height="72" rx="12"/><text class="diagram-label" x="118" y="122" text-anchor="middle" font-size="13">resources / cost</text><text class="diagram-label" x="320" y="122" text-anchor="middle" font-size="13">decision</text><text class="diagram-label" x="522" y="122" text-anchor="middle" font-size="13">result</text><text class="diagram-label diagram-muted" x="118" y="144" text-anchor="middle" font-size="12">${a}</text><text class="diagram-label diagram-muted" x="320" y="144" text-anchor="middle" font-size="12">${b}</text><text class="diagram-label diagram-muted" x="522" y="144" text-anchor="middle" font-size="12">${c}</text><path class="diagram-outline" d="M201 126 H232 M222 118 L232 126 L222 134 M403 126 H434 M424 118 L434 126 L424 134"/><text class="diagram-label diagram-muted" x="320" y="215" text-anchor="middle" font-size="13">State assumptions; compare evidence, costs, and outcomes.</text>`;
    } else if (category === 'humanities' && /history|war|revolution|colon|rights|government|politic|democracy/.test(`${topic} ${context}`)) {
      svg = `<text class="diagram-label" x="320" y="38" text-anchor="middle" font-size="15">${heading} · evidence over time</text><path class="diagram-outline" d="M82 130 H558 M546 118 L558 130 L546 142"/><circle class="diagram-highlight-fill diagram-outline" cx="145" cy="130" r="13"/><circle class="diagram-outline" cx="320" cy="130" r="13"/><circle class="diagram-outline" cx="495" cy="130" r="13"/><text class="diagram-label" x="145" y="91" text-anchor="middle" font-size="13">context</text><text class="diagram-label" x="320" y="91" text-anchor="middle" font-size="13">event / change</text><text class="diagram-label" x="495" y="91" text-anchor="middle" font-size="13">consequence</text><text class="diagram-label diagram-muted" x="320" y="188" text-anchor="middle" font-size="13">Compare primary sources: creator · date · purpose · perspective</text><text class="diagram-label" x="320" y="225" text-anchor="middle" font-size="13">${b} → claim → ${c}</text>`;
    } else if (category === 'humanities' && /geograph|map|climate|population|migration/.test(topic)) {
      svg = `<path class="diagram-outline" d="M150 76 L265 58 L369 76 L490 56 V196 L369 215 L265 196 L150 215 Z"/><path class="diagram-outline diagram-muted" d="M265 58 V196 M369 76 V215 M150 145 L265 126 L369 146 L490 125"/><circle class="diagram-highlight-fill" cx="320" cy="137" r="12"/><path class="diagram-outline" d="M320 149 V228"/><text class="diagram-label" x="320" y="252" text-anchor="middle" font-size="13">${heading}: locate pattern · compare scale · explain evidence</text>`;
    }
    return {
      title: `${lesson.title}: topic model`,
      caption: description,
      viewBox: '0 0 640 290',
      svg: `<title>${heading}</title>${svg}`
    };
  };

  function makeLesson(course, entry) {
    const name = trimTopic(entry.title);
    const unit = trimTopic(entry.unit);
    const area = `${course.area} ${course.title} ${unit}`.toLowerCase();
    const topic = name.toLowerCase();
    const terms = topicWords(name);
    const first = terms[0] || name;
    const second = terms[1] || unit;
    let category = 'process';
    let sections;
    let worked;
    let practice;
    let goals;
    let labels;

    if (/math|calculus|statistics|geometry/.test(area)) {
      category = 'math';
      let rule = 'Translate the question into variables, identify the relationship that applies, and keep units consistent. Show each transformation so you can check where a result came from.';
      let steps = ['Write the known quantities and the unknown with units.', 'Choose a representation (equation, table, or graph) that connects them.', 'Solve one operation at a time, then substitute the result back to check.'];
      let result = 'A valid solution follows the relationship and satisfies the original conditions.';
      let q = `For a new ${name.toLowerCase()} problem, which step should come before calculating?`;
      let options = ['Identify what is known, what is asked, and the relevant relationship', 'Choose numbers without defining variables', 'Ignore units until the end'];
      let answer = options[0];
      let why = 'Defining quantities and the relationship prevents using the right operation on the wrong values.';
      if (/system of linear/.test(topic) && !/inequalit/.test(topic)) {
        rule = 'A system is a set of equations that must be true for the same values. Its solution is the intersection of their graphs. Elimination combines equations to remove a variable; substitution replaces a variable with an equivalent expression.';
        steps = ['Solve x+y=7 and x−y=1. Add the equations to eliminate y: 2x=8.', 'Divide by 2: x=4.', 'Substitute into x+y=7: y=3. Check (4,3) in both equations.'];
        result = '(x,y)=(4,3).';
        q = 'What is the solution to x+y=5 and x−y=1?';
        options = ['(3, 2)', '(2, 3)', '(4, 1)']; answer = options[0];
        why = 'Adding gives 2x=6 so x=3; substituting gives y=2.';
      } else if (/slope|linear|rate of change/.test(topic) && !/inequalit/.test(topic)) {
        rule = 'A linear relationship changes by a constant amount per equal step. Its slope is rise over run, \\(m=\\frac{y_2-y_1}{x_2-x_1}\\); the intercept is the value at \\(x=0\\).';
        steps = ['Use points (2, 5) and (6, 13).', 'Find the change in y: 13−5=8; change in x: 6−2=4.', 'Divide: m=8/4=2. Check: y rises 2 for each 1 step in x.'];
        result = 'The slope is 2 units of y per unit of x.';
        q = 'What is the slope between (1, 4) and (3, 10)?';
        options = ['2', '3', '6']; answer = '3';
        why = 'Slope=(10−4)/(3−1)=6/2=3. Dividing by the change in y alone gives the wrong rate.';
      } else if (/limit|continuity/.test(topic)) {
        rule = 'A limit describes the value a function approaches near an input, whether or not the function reaches that value there. A function is continuous at a when its value exists, its limit exists, and both are equal.';
        steps = ['Find \\(\\lim_{x\\to2}(3x+1)\\).', 'This linear function is continuous, so substitute x=2.', 'The limit is 3(2)+1=7.'];
        result = '7.';
        q = 'For \\(f(x)=x+4\\), what is \\(\\lim_{x\\to3}f(x)\\)?';
        options = ['7', '4', 'Does not exist']; answer = '7';
        why = 'A polynomial or linear function is continuous, so direct substitution gives 3+4=7.';
      } else if (/differential equation|slope field/.test(topic)) {
        rule = 'A differential equation relates an unknown function to its derivative. A slope field draws the slope prescribed at many points; solution curves follow those local directions. Initial conditions select one curve from the family.';
        steps = ['Solve \\(\\frac{dy}{dx}=2x\\) by integrating both sides.', 'Integrate: \\(y=x^2+C\\).', 'If y(0)=3, then C=3, so the particular solution is \\(y=x^2+3\\).'];
        result = '\\(y=x^2+C\\); with y(0)=3, \\(y=x^2+3\\).';
        q = 'What is a solution to \\(dy/dx=2x\\)?';
        options = ['y=x²+C', 'y=2x+C', 'y=x+C']; answer = 'y=x²+C';
        why = 'Differentiating x²+C gives 2x; the constant of integration accounts for a family of solutions.';
      } else if (/fundamental theorem/.test(topic)) {
        rule = 'The Fundamental Theorem of Calculus connects accumulation and differentiation: if F′=f, then \\(\\int_a^b f(x)dx=F(b)-F(a)\\). A definite integral is signed area/net change, not always geometric area.';
        steps = ['Evaluate \\(\\int_0^2 2x\\,dx\\).', 'An antiderivative is F(x)=x².', 'Use the bounds: F(2)−F(0)=4−0=4.'];
        result = '4.';
        q = 'If F′=f, what is \\(\\int_a^b f(x)dx\\)?';
        options = ['F(b)−F(a)', 'F(a)−F(b)', 'f(b)−f(a)']; answer = 'F(b)−F(a)';
        why = 'The net accumulation equals the antiderivative at the upper bound minus its value at the lower bound.';
      } else if (/antiderivative|integral|integration|accumulat/.test(topic)) {
        rule = 'An integral accumulates signed change; an antiderivative reverses differentiation. For powers, \\(\\int x^n dx=\\frac{x^{n+1}}{n+1}+C\\) when n≠−1.';
        steps = ['Find \\(\\int 3x^2 dx\\).', 'Raise the power by one and divide by the new power: \\(3x^3/3\\).', 'Add the integration constant: \\(x^3+C\\). Differentiate to check.'];
        result = '\\(\\int 3x^2dx=x^3+C\\).';
        q = 'Which is an antiderivative of 2x?';
        options = ['x²+C', '2+C', 'x+C']; answer = 'x²+C';
        why = 'The derivative of x² is 2x; the constant differentiates to zero.';
      } else if (/\bderivative\b|\bdifferentiation\b|tangent line|related rates|curve analysis|optimization/.test(topic)) {
        rule = 'The derivative gives instantaneous rate of change and the slope of a tangent. For powers, \\(\\frac{d}{dx}x^n=nx^{n-1}\\); constants differentiate to zero. Applications use the derivative to locate rates, critical points, or extrema.';
        steps = ['Differentiate \\(f(x)=x^3+2x\\) term by term.', 'Apply the power rule: \\(f\\prime(x)=3x^2+2\\).', 'At x=2, the tangent slope is \\(3(2)^2+2=14\\).'];
        result = '\\(f\\prime(x)=3x^2+2\\); at x=2, slope = 14.';
        q = 'What is the derivative of \\(x^4\\)?';
        options = ['4x³', 'x³', '4x']; answer = '4x³';
        why = 'Multiply by the exponent, then reduce the exponent by one.';
      } else if (/vector-valued|parametric|polar/.test(topic)) {
        rule = 'A parametric curve defines coordinates using a parameter: x=x(t), y=y(t). Direction and speed follow increasing t; where dx/dt≠0, \\(dy/dx=(dy/dt)/(dx/dt)\\). Polar coordinates locate a point by radius and angle.';
        steps = ['For x=t² and y=t³, find dy/dx at t=2.', 'Compute dx/dt=2t=4 and dy/dt=3t²=12.', 'Divide: dy/dx=12/4=3.'];
        result = '3.';
        q = 'If dx/dt=2 and dy/dt=6, what is dy/dx?';
        options = ['3', '8', '1/3']; answer = '3';
        why = 'For a parametric curve, dy/dx=(dy/dt)/(dx/dt)=6/2=3.';
      } else if (/exponential|logarithm/.test(topic)) {
        rule = 'An exponential function changes by a constant factor over equal input steps; a logarithm answers which exponent produces a value. The inverse relationship is \\(b^x=y\\iff\\log_b(y)=x\\) for b>0, b≠1.';
        steps = ['Rewrite \\(\\log_2(8)=x\\) in exponential form.', 'The equivalent equation is \\(2^x=8\\).', 'Since \\(2^3=8\\), x=3.'];
        result = '3.';
        q = 'What is \\(\\log_{10}(100)\\)?';
        options = ['2', '10', '1000']; answer = '2';
        why = 'The logarithm asks for the exponent: 10²=100.';
      } else if (/function|domain|range|system of/.test(topic) && !/quadratic/.test(topic)) {
        rule = 'A function assigns exactly one output to each allowed input. Domain is the set of inputs; range is the set of outputs. For equations or inequalities, preserve equivalent relationships and check candidate values in the original statement.';
        steps = ['For \\(f(x)=2x+1\\), find f(3).', 'Substitute 3 for x: f(3)=2(3)+1.', 'Evaluate: f(3)=7; the input is 3 and the output is 7.'];
        result = 'f(3)=7.';
        q = 'For \\(f(x)=x^2\\), what is f(−2)?';
        options = ['4', '−4', '−2']; answer = '4';
        why = 'Substitute the input: (−2)²=4. Squaring a negative gives a positive.';
      } else if (/radical|square root/.test(topic)) {
        rule = 'A square root is the non-negative number whose square gives the radicand. Simplify by extracting perfect-square factors: \\(\\sqrt{ab}=\\sqrt a\\sqrt b\\) for non-negative a,b. Check the original domain before solving radical equations.';
        steps = ['Simplify \\(\\sqrt{72}\\) by separating a perfect-square factor.', '\\(72=36×2\\), so \\(\\sqrt{72}=\\sqrt{36}\\sqrt2\\).', 'Since \\(\\sqrt{36}=6\\), the simplified form is \\(6\\sqrt2\\).'];
        result = '\\(6\\sqrt2\\).';
        q = 'Simplify \\(\\sqrt{50}\\).';
        options = ['5√2', '25√2', '10√5']; answer = '5√2';
        why = '50=25×2, and √25=5. The square root is not √25×2.';
      } else if (/proportion|proportional|scale|unit conversion/.test(topic)) {
        rule = 'A proportional relationship has a constant ratio: \\(y=kx\\). A table or equivalent ratio can reveal the scale factor. Convert units before comparing quantities, and preserve the same order in both ratios.';
        steps = ['Three notebooks cost $6. Find the cost of 5 at the same unit price.', 'Unit price = $6÷3=$2 per notebook.', 'Cost = 5×$2=$10. Check that the total increases with quantity.'];
        result = '$10.';
        q = 'A map scale is 1 cm : 4 km. What real distance is 3 cm?';
        options = ['12 km', '7 km', '1.33 km']; answer = '12 km';
        why = 'Multiply both parts by 3: 3 cm represents 3×4=12 km.';
      } else if (/conic|circle geometry/.test(topic)) {
        rule = 'Conic sections arise from intersecting a plane with a cone. In coordinate form, the equation’s squared terms and constants identify the curve. A circle centered at (h,k) with radius r has \\((x-h)^2+(y-k)^2=r^2\\).';
        steps = ['For \\((x-2)^2+(y+1)^2=9\\), compare with the circle form.', 'The centre is (2, −1); the radius is \\(\\sqrt9=3\\).', 'Check: the point (5, −1) is 3 units from the centre, so it lies on the circle.'];
        result = 'Centre (2, −1), radius 3.';
        q = 'What is the radius of \\((x+1)^2+(y-4)^2=16\\)?';
        options = ['4', '16', '8']; answer = '4';
        why = 'The right side is r², so r=√16=4.';
      } else if (/circle/.test(topic)) {
        rule = 'A circle is the set of points a fixed distance r from its centre. Circumference is \\(C=2\\pi r\\), area is \\(A=\\pi r^2\\); distinguish a length from a squared area.';
        steps = ['A circle has radius 3 cm. Find its area.', 'Use \\(A=\\pi r^2\\).', 'Substitute r=3: \\(A=9\\pi\\) cm², about 28.3 cm².'];
        result = '\\(9\\pi\\) cm².';
        q = 'What is the circumference of a circle with radius 2 m?';
        options = ['4π m', '2π m²', '8 m']; answer = '4π m';
        why = 'C=2πr=2π(2)=4π m; circumference is measured in length units.';
      } else if (/transform|congruen|similarity|similar figures/.test(topic)) {
        rule = 'A transformation maps points according to a rule. Translations, rotations, and reflections preserve lengths and angles; dilations scale lengths by a common factor. Congruent figures have equal size and shape; similar figures have equal angles and proportional sides.';
        steps = ['A point (2, 1) is translated 3 units right and 2 up.', 'Add (3, 2) to its coordinates: (2+3, 1+2).', 'The image is (5, 3); translation preserves distances and angles.'];
        result = '(5, 3).';
        q = 'Which transformation changes size but preserves shape?';
        options = ['Dilation', 'Translation', 'Reflection']; answer = 'Dilation';
        why = 'A dilation scales all lengths by the same factor; translations and reflections preserve size.';
      } else if (/exponent|power|radical/.test(topic)) {
        rule = 'An exponent counts repeated multiplication: \\(a^m a^n=a^{m+n}\\) and \\((a^m)^n=a^{mn}\\). For a≠0, \\(a^0=1\\) and \\(a^{-n}=1/a^n\\). Apply a power to every factor inside parentheses.';
        steps = ['Simplify \\(x^3x^4\\).', 'The factors have the same base, so add exponents: 3+4=7.', 'The result is \\(x^7\\).'];
        result = '\\(x^7\\).';
        q = 'Simplify \\((a^2)^3\\).';
        options = ['a⁶', 'a⁵', 'a⁹']; answer = 'a⁶';
        why = 'Power of a power means multiply exponents: 2×3=6.';
      } else if (/inequalit/.test(topic)) {
        rule = 'An inequality compares values and its solution is a set of inputs. You may add or subtract the same quantity on both sides; when multiplying or dividing by a negative number, reverse the inequality sign.';
        steps = ['Solve \\(-2x<6\\).', 'Divide both sides by −2 and reverse < to >.', 'The solution is \\(x>-3\\). Check x=0: −2(0)<6 is true.'];
        result = '\\(x>-3\\).';
        q = 'Solve \\(-3x\\le6\\).';
        options = ['x≥−2', 'x≤−2', 'x≥2']; answer = 'x≥−2';
        why = 'Divide by −3 and reverse the sign: x≥−2.';
      } else if (/geometry|area|perimeter|volume|measurement/.test(topic)) {
        rule = 'Choose a measurement formula that matches the shape and the quantity requested. Area uses square units, volume uses cubic units, and perimeter is a length. Convert units before combining measurements.';
        steps = ['A rectangle is 8 cm by 3 cm. Find its area.', 'Use A=length×width.', 'A=8×3=24 cm²; square the unit because two dimensions are multiplied.'];
        result = '24 cm².';
        q = 'A rectangle is 5 m by 4 m. What is its area?';
        options = ['20 m²', '18 m', '9 m²']; answer = '20 m²';
        why = 'Area=length×width=5×4=20 square metres.';
      } else if (/quadratic|parabola|polynomial|factor/.test(topic)) {
        rule = 'A polynomial is a sum of terms with non-negative integer powers. Factoring rewrites a sum as a product; this reveals values that make the expression zero. Expand to verify a factorization.';
        steps = ['Factor \\(x^2+5x+6\\): find two numbers with product 6 and sum 5.', 'Those numbers are 2 and 3, so write \\((x+2)(x+3)\\).', 'Check: \\(x^2+3x+2x+6=x^2+5x+6\\).'];
        result = '\\(x^2+5x+6=(x+2)(x+3)\\).';
        q = 'Which pair factors \\(x^2+7x+12\\)?';
        options = ['(x+3)(x+4)', '(x+2)(x+6)', '(x−3)(x−4)']; answer = options[0];
        why = '3×4=12 and 3+4=7. Always check both product and sum.';
      } else if (/regression|association/.test(topic)) {
        rule = 'Regression models describe an association between variables; the slope estimates the change in predicted response per unit of explanatory variable. Check a scatterplot and residuals, and do not infer causation from association alone.';
        steps = ['A fitted model is \\(\\hat y=2x+1\\), where x is study hours and y is predicted practice score.', 'For x=3, substitute: \\(\\hat y=2(3)+1\\).', 'The predicted score is 7; it is an estimate, not a guaranteed observation.'];
        result = '\\(\\hat y=7\\).';
        q = 'A strong association in observational data proves that x causes y.';
        options = ['False; confounding or other explanations may remain', 'True in every study', 'Only if the sample is large']; answer = options[0];
        why = 'Association describes a pattern; causal claims need a design and evidence that address alternative explanations.';
      } else if (/confidence interval|hypothesis test|significance test/.test(topic)) {
        rule = /hypothesis|significance/.test(topic)
          ? 'A significance test compares sample evidence with a null model. The p-value is the probability, assuming the null model and its conditions, of results at least as extreme as those observed; it is not the probability that the null is true.'
          : 'A confidence interval is produced by a method that captures the fixed population parameter in a stated proportion of repeated samples under its assumptions. Interpret the interval in context and check its conditions.';
        steps = ['A sample estimate is 50 and a computed 95% confidence interval is [46, 54].', 'State the population quantity being estimated and the method’s confidence level.', 'Interpret: the method used has 95% long-run coverage when assumptions hold; do not say there is a 95% chance this fixed parameter moves.'];
        result = 'The interval estimates a population value from 46 to 54 under the method’s assumptions.';
        q = 'What does a 95% confidence level describe?';
        options = ['Long-run capture rate of the interval method under its assumptions', 'A 95% probability that this fixed parameter changes', 'The chance the sample mean is correct']; answer = options[0];
        why = 'Confidence refers to the repeated-sampling method; the parameter is fixed, while intervals vary from sample to sample.';
      } else if (/survey|sampling|experiment|data collection/.test(topic)) {
        rule = 'A sample should represent the population the study aims to describe. Random sampling helps reduce selection bias; random assignment in an experiment helps balance confounders between treatment groups. The two serve different purposes.';
        steps = ['A school wants to estimate student commute times.', 'Select students randomly from the full enrollment list, rather than only surveying cyclists at the bike rack.', 'Record nonresponse and how commute time is measured; both can bias the estimate.'];
        result = 'Random selection from the target population is more representative than a convenience sample.';
        q = 'Which method best estimates commute times for all students?';
        options = ['Randomly sample from the full student list', 'Ask only students arriving by bike', 'Ask the first five students at the door']; answer = options[0];
        why = 'A full-list random sample gives students a known chance of selection; location-based convenience samples overrepresent some commutes.';
      } else if (/probability|statistics|sampling|data|inference|random variable|distribution/.test(topic)) {
        rule = 'Statistics describes patterns in data and uses a sample to reason about a population. State the population, variable, and sampling method; bias or small samples can weaken a conclusion.';
        steps = ['A fair six-sided die has six equally likely outcomes.', 'Two outcomes (2 and 4) are even.', 'Probability(even)=favourable/total=2/6=1/3.'];
        result = 'The probability is 1/3.';
        q = 'A fair coin is tossed once. What is P(heads)?';
        options = ['1/2', '1', '0']; answer = '1/2';
        why = 'One of the two equally likely outcomes is heads.';
      } else if (/sequence|series|convergence/.test(topic)) {
        rule = 'A sequence is an ordered list generated by a rule. First inspect how terms change; a constant difference signals an arithmetic sequence, while a constant ratio signals a geometric sequence.';
        steps = ['For 4, 7, 10, 13, compare consecutive terms.', 'Each difference is +3, so it is arithmetic with common difference 3.', 'Continue by adding 3: the next term is 16.'];
        result = 'Common difference 3; next term 16.';
        q = 'What is the next term of 5, 10, 20, 40, …?';
        options = ['80', '45', '60']; answer = '80';
        why = 'Each term is multiplied by 2; adding a fixed amount does not fit the pattern.';
      } else if (/trigon|triangle|angle|sine|cosine/.test(topic)) {
        rule = 'A diagram clarifies which quantities are known. In a right triangle, \\(\\sin\\theta=\\frac{opp}{hyp}\\), \\(\\cos\\theta=\\frac{adj}{hyp}\\), and \\(\\tan\\theta=\\frac{opp}{adj}\\). Match sides to the marked angle.';
        steps = ['A right triangle has angle 30° and hypotenuse 10 cm; find the opposite side.', 'Use sine because opposite and hypotenuse are involved: \\(\\sin30^\\circ=opp/10\\).', 'Since \\(\\sin30^\\circ=0.5\\), opposite = 5 cm.'];
        result = 'The opposite side is 5 cm.';
        q = 'For a right triangle, which ratio is opposite ÷ hypotenuse?';
        options = ['sine', 'cosine', 'tangent']; answer = 'sine';
        why = 'SOH: sine equals opposite over hypotenuse.';
      } else if (/percent|finance|interest|budget|tax|ratio|rate|measurement/.test(topic)) {
        rule = 'Rates compare different units; percentages compare a part with a whole. Convert percentages to decimals before multiplying, and identify whether the question asks for the part, whole, or rate.';
        steps = ['Find 15% of $80.', 'Convert 15% to 0.15.', 'Multiply: 0.15×$80=$12; check that a part is smaller than the whole.'];
        result = '$12.';
        q = 'What is 20% of $50?';
        options = ['$10', '$25', '$40']; answer = '$10';
        why = '0.20×50=10; $25 is half the total, not 20%.';
      }
      sections = [
        { heading: `1. Meaning of ${name}`, content: `${rule} In ${course.title}, “${name}” belongs to ${unit}. Start by defining each symbol or quantity in the problem; the same symbol can mean different things in different contexts.` },
        { heading: '2. Choose a method and check it', content: 'Write the rule before substituting values. Keep both sides of an equation balanced, carry units through calculations, and check by substitution, estimation, or a graph. A numerical answer is not complete until it answers the question asked.' },
        { heading: '3. Try it', content: 'Cover the worked example and solve the checkpoint from memory. Then explain why the chosen representation fits this topic.' }
      ];
      worked = { prompt: `Worked example: ${name}`, steps, answer: result };
      practice = [{ id: `${entry.id}-check1`, type: 'multiple-choice', question: q, options, answer, explanation: why },
        { id: `${entry.id}-check2`, type: 'reflection', question: `In one sentence, explain what ${name.toLowerCase()} helps you find or describe. What check would catch an unreasonable result?`, answer: `Name the quantity or relationship represented by ${name}, then check units, assumptions, and whether the result fits the original context.`, explanation: 'A sound explanation links the mathematical result to its meaning and includes a relevant check.' }];
      goals = [`Explain the key idea in ${name}`, 'Choose and apply a suitable method', 'Check a result in context'];
      labels = [first, 'relationship', second];
    } else if (/science|chemistry|physics|biology|earth|environment/.test(area) && !/computer science/.test(area)) {
      category = 'science';
      let explain = 'Science uses models to explain patterns and evidence to test those explanations. Define the system, identify what can be observed or measured, and distinguish a model from the real object or process.';
      let steps = ['State the question and identify the system being studied.', 'Choose a model or relationship; label what each part represents.', 'Compare the prediction with observations, including units and uncertainty.'];
      let result = 'A conclusion should match the evidence and state the model’s limits.';
      let q = `In studying ${name.toLowerCase()}, what should a useful scientific model do?`;
      let options = ['Represent relevant parts of the system and make a checkable prediction', 'Include every detail of reality', 'Replace measurements with a guess'];
      let answer = options[0], why = 'A model focuses on features that matter to the question; observations test its predictions.';
      if (/mole|stoichiometr|reaction|equation|concentration/.test(topic)) {
        explain = 'Chemical equations represent rearrangements of atoms. A balanced equation has the same number of each atom on both sides. Coefficients give mole ratios; convert mass to moles before using them. For solutions, \\(C=n/V\\) with V in litres.';
        steps = ['Balance \\(H_2+O_2\\rightarrow H_2O\\): put 2 before H₂O to balance oxygen.', 'Now there are 4 H on the right, so put 2 before H₂.', 'Check: H=4 and O=2 on each side. Coefficients are 2:1:2.'];
        result = '\\(2H_2+O_2\\rightarrow2H_2O\\).';
        q = 'In \\(2H_2+O_2\\rightarrow2H_2O\\), how many moles of water form from 1 mol O₂ (with excess H₂)?';
        options = ['2 mol', '1 mol', '4 mol']; answer = '2 mol';
        why = 'The balanced coefficients show a 1:2 mole ratio of O₂ to H₂O.';
      } else if (/atom|periodic|bond|molecular|ionic|covalent/.test(topic)) {
        explain = 'Atoms contain protons and neutrons in a small nucleus and electrons around it. Atomic number equals proton count. In a neutral atom, proton and electron counts match; atoms form bonds by transferring or sharing valence electrons.';
        steps = ['A neutral sodium atom has atomic number 11, so it has 11 protons.', 'Neutrality means it also has 11 electrons.', 'If it loses one electron, the ion has charge +1; the nucleus is unchanged.'];
        result = 'Na has 11 p⁺ and 11 e⁻; Na⁺ has 10 e⁻.';
        q = 'What changes when a neutral atom becomes a positive ion?';
        options = ['It loses one or more electrons', 'It gains protons', 'It loses its nucleus']; answer = options[0];
        why = 'A positive ion forms when electrons are lost; changing proton count would change the element.';
      } else if (/motion|kinematic|velocity|acceleration|force|newton|dynamics/.test(topic)) {
        explain = 'Describe motion relative to a reference frame. Velocity includes direction; acceleration is change in velocity per time. For constant acceleration, \\(v_f=v_i+at\\) and \\(\\Delta x=v_it+\\frac12at^2\\). Choose a positive direction before substituting.';
        steps = ['A cyclist starts from rest and accelerates at 2 m/s² for 3 s.', 'Use \\(v_f=v_i+at\\): \\(v_f=0+(2)(3)\\).', 'The final velocity is 6 m/s in the chosen positive direction.'];
        result = '6 m/s.';
        q = 'A cart moving at 4 m/s speeds up by 2 m/s each second. What is its acceleration?';
        options = ['2 m/s²', '8 m/s', '2 m']; answer = '2 m/s²';
        why = 'Acceleration is change in velocity divided by time; its unit is m/s².';
      } else if (/energy|work|power|momentum|impulse/.test(topic)) {
        explain = 'Energy describes a system’s capacity for change; it transfers or transforms but is conserved in an isolated system. Work transfers energy when a force acts through a displacement: \\(W=F\\Delta x\\) for a constant force parallel to motion. Power is energy transferred per time.';
        steps = ['A 10 N force pushes a box 3 m in the same direction.', 'Use \\(W=F\\Delta x\\): 10×3.', 'The force transfers 30 J of energy to the box.'];
        result = '30 J of work.';
        q = 'A 20 J energy transfer occurs in 4 s. What is the average power?';
        options = ['5 W', '80 W', '0.2 W']; answer = '5 W';
        why = 'Power=energy/time=20 J/4 s=5 J/s=5 W.';
      } else if (/wave|sound|light|optics|electric|circuit|magnet/.test(topic)) {
        explain = 'Waves transfer energy without net transport of matter. Frequency counts cycles per second, wavelength is the distance between matching points, and wave speed is \\(v=f\\lambda\\). In a circuit, current requires a closed conducting path and a potential difference.';
        steps = ['A wave has frequency 4 Hz and wavelength 2 m.', 'Use \\(v=f\\lambda\\).', 'Wave speed = 4×2 = 8 m/s.'];
        result = '8 m/s.';
        q = 'If wave speed is 12 m/s and frequency is 3 Hz, what is the wavelength?';
        options = ['4 m', '36 m', '9 m']; answer = '4 m';
        why = 'Rearrange v=fλ: λ=v/f=12/3=4 m.';
      } else if (/mitosis|meiosis|chromosome/.test(topic)) {
        explain = 'Mitosis is one nuclear division that usually produces two genetically similar daughter cells with the same chromosome number as the parent cell. Meiosis involves two divisions and produces haploid cells with half the chromosome number; crossing over and independent assortment create variation.';
        steps = ['A human body cell has 46 chromosomes.', 'Mitosis produces daughter cells with 46 chromosomes each for growth and repair.', 'Meiosis produces gametes with 23 chromosomes; fertilization restores 46.'];
        result = 'Mitosis: two diploid cells; meiosis: four haploid cells (in the standard model).';
        q = 'Which process makes haploid gametes from a diploid cell?';
        options = ['Meiosis', 'Mitosis', 'DNA replication alone']; answer = 'Meiosis';
        why = 'Meiosis halves chromosome number; mitosis generally preserves it in daughter cells.';
      } else if (/cell|genetic|dna|inherit|evolution|ecosystem|ecology|organism|photosynth|respiration/.test(topic)) {
        explain = 'Living systems are organized and interdependent. To explain a biological process, identify the structures or populations involved, describe what changes, and use evidence at the correct scale (cell, organism, population, or ecosystem).';
        steps = ['For an inheritance question, identify the alleles carried by each parent.', 'List possible allele combinations in a Punnett square.', 'Interpret the combinations as probabilities for each offspring, not guarantees about a family.'];
        result = 'An offspring probability describes likelihood per conception, not a certain outcome.';
        q = 'A genetic probability of 1/4 means:';
        options = ['Each offspring has a 25% chance under the model', 'Exactly one of every four children must show the trait', 'The trait is impossible']; answer = options[0];
        why = 'Probability is a likelihood for each independent outcome, not a guaranteed sequence.';
      }
      sections = [
        { heading: `1. The system: ${name}`, content: `${explain} In ${course.title}, this topic is taught in ${unit}. Define unfamiliar terms before interpreting a diagram or data.` },
        { heading: '2. Use evidence', content: 'Record observations with units, separate measured evidence from interpretation, and name assumptions. A useful explanation predicts what would happen if one condition changed; evidence can support or challenge that prediction.' },
        { heading: '3. Model limits', content: 'Every diagram, equation, or scientific model simplifies reality. State what it represents, what it omits, and whether the omitted detail matters to the question.' }
      ];
      worked = { prompt: `Worked example: apply a model to ${name}`, steps, answer: result };
      practice = [{ id: `${entry.id}-check1`, type: 'multiple-choice', question: q, options, answer, explanation: why },
        { id: `${entry.id}-check2`, type: 'reflection', question: `What evidence or measurement would help test an explanation of ${name.toLowerCase()}?`, answer: 'Choose an observation or measurement linked to the claim, record units and conditions, and compare the result with a prediction.', explanation: 'A test needs observable evidence connected to a prediction, not just a repeated claim.' }];
      goals = [`Describe the system involved in ${name}`, 'Apply a scientific model or relationship', 'Connect a conclusion to evidence and limits'];
      labels = [first, 'system model', 'evidence'];
    } else if (/social studies|history|geography|government|politic|economics|psychology|justice/.test(area) &&
      !/business|account|finance|marketing|entrepreneur/.test(area)) {
      category = 'humanities';
      const historical = /history|war|revolution|colon|rights|reconciliation|identity|government|politic|democracy/.test(`${topic} ${unit}`.toLowerCase());
      const text = historical
        ? 'Study this topic through context and evidence rather than treating a short summary as the whole story. Establish when and where, identify the people and institutions involved, and compare primary sources with later interpretations. Ask who created each source, for whom, and whose perspectives are absent.'
        : 'Define the key term and scale of analysis first. In geography, locate the place and examine spatial patterns; in economics, identify the decision, trade-offs, and affected groups; in psychology, distinguish a measured observation from an interpretation.';
      const steps = historical
        ? ['Frame one answerable question about the topic.', 'Read a primary source in context: note creator, date, audience, purpose, and evidence.', 'Make a limited claim, support it with specific evidence, and acknowledge another perspective or source limitation.']
        : ['Define the concept and identify the people, place, or system involved.', 'Examine a map, data set, case, or source; record what it shows and what it cannot show.', 'Support one conclusion with evidence and identify a plausible alternative explanation.'];
      sections = [
        { heading: `1. Place ${name} in context`, content: `${text} The course unit is ${unit}; use it to identify relevant time, place, institutions, and related ideas. Avoid assuming that one person's experience represents everyone.` },
        { heading: '2. Build an evidence-based explanation', content: 'Separate a factual observation from an inference. Make a focused claim, cite or describe the evidence that supports it, then explain the connection. Consider cause and consequence, continuity and change, scale, and perspective where relevant.' },
        { heading: '3. Check perspective and limits', content: 'Ask which voices are present or missing, how the source was produced, and whether another source changes the interpretation. A strong conclusion is specific to its evidence and does not claim more than the sources show.' }
      ];
      worked = { prompt: `Worked example: make a defensible claim about ${name}`, steps, answer: 'A defensible response states a bounded claim, cites a specific source or data point, explains how it supports the claim, and notes a limitation or perspective.' };
      const q = historical ? 'Which approach best supports a historical claim about a contested event?' : 'Which approach best supports a conclusion about a social or geographic pattern?';
      const answer = historical ? 'Use contextualized sources and explain whose perspectives they represent.' : 'Use relevant data or sources, describe their limits, and consider another explanation.';
      practice = [{ id: `${entry.id}-check1`, type: 'multiple-choice', question: q, options: [answer, 'Use one source without checking its context', 'Treat an opinion as proof'], answer, explanation: 'Evidence must be relevant, contextualized, and interpreted with awareness of its limits.' },
        { id: `${entry.id}-check2`, type: 'reflection', question: `Write one question you would ask before accepting a claim about ${name.toLowerCase()}.`, answer: 'Check the source, evidence, context, purpose, and whose perspective is represented.', explanation: 'Source evaluation helps distinguish supportable conclusions from unsupported generalizations.' }];
      goals = [`Explain ${name} in context`, 'Support an interpretation with relevant evidence', 'Consider perspective and source limits'];
      labels = ['context', 'evidence', 'interpretation'];
    } else if (/english|literature|writing|language arts/.test(area)) {
      category = 'humanities';
      sections = [
        { heading: `1. Read or write with purpose: ${name}`, content: `Strong communication begins with a purpose and an audience. For ${name}, identify the central idea, the text or task, and what the audience should understand. Distinguish a topic (the subject) from a claim or interpretation (what you say about it).` },
        { heading: '2. Build meaning with evidence', content: 'Use a precise detail, quotation, or example. Introduce it, show what it reveals, and explain how the author’s choices or your reasoning support the point. Naming a technique is not analysis until you explain its effect and significance.' },
        { heading: '3. Revise for clarity', content: 'Organize ideas so each paragraph advances the main point. Read for accurate evidence, logical transitions, sentence clarity, and tone. Editing corrects surface errors; revision can change the ideas and structure.' }
      ];
      const steps = ['Claim: a short story uses a repeated image of a locked door.', 'Evidence: identify two moments where the door appears and describe what changes.', 'Analysis: explain how the repeated image develops an interpretation; avoid claiming more than the text supports.'];
      worked = { prompt: `Worked example: analyze a detail in ${name}`, steps, answer: 'A complete analysis links a specific textual detail to its effect and to a defensible interpretation.' };
      const answer = 'State a focused idea, use a precise example, and explain how it supports the interpretation.';
      practice = [{ id: `${entry.id}-check1`, type: 'multiple-choice', question: 'What makes textual evidence persuasive in an analysis?', options: [answer, 'Adding a quotation without explaining it', 'Naming a device without discussing its effect'], answer, explanation: 'Evidence must be connected to the claim through explanation; quotations alone do not prove an interpretation.' },
        { id: `${entry.id}-check2`, type: 'reflection', question: `Write a one-sentence claim about a text or task related to ${name}. What specific evidence would support it?`, answer: 'A focused, arguable claim plus a precise example and an explanation of their connection.', explanation: 'A claim becomes an analysis when supported by relevant evidence and reasoning.' }];
      goals = [`Identify purpose and audience for ${name}`, 'Support a claim with precise evidence', 'Revise for clarity and effect'];
      labels = ['claim', 'textual detail', 'analysis'];
    } else if (/language/.test(area)) {
      category = 'language';
      const french = /french/.test(course.title.toLowerCase());
      const spanish = /spanish/.test(course.title.toLowerCase());
      const sample = french ? 'Je parle français.' : spanish ? 'Yo hablo español.' : 'Subject + verb + detail.';
      const vocab = french ? ['je = I', 'parle = speak', 'français = French'] : spanish ? ['yo = I', 'hablo = speak', 'español = Spanish'] : ['subject = who/what', 'verb = action/state', 'detail = added meaning'];
      sections = [
        { heading: `1. Build meaning for ${name}`, content: `Language learning connects form, meaning, and situation. Identify the speaker, audience, time, and purpose; use familiar words and context clues before translating word for word. The basic sentence pattern is subject + conjugated verb + useful detail.` },
        { heading: '2. Notice the grammar', content: `Model: “${sample}” (${vocab.join('; ')}). The verb carries information about the subject and may change with person or tense. Check agreement, word order, accents, and whether the expression fits the context. A memorized pattern is a starting point, not a rule for every sentence.` },
        { heading: '3. Practise retrieval', content: `Cover the model and produce a new sentence about ${name.toLowerCase()}. Say it aloud, check meaning with a reliable dictionary or course source, then correct one feature. Compare how tone or word choice changes for a different audience.` }
      ];
      const steps = [`Start with a speaker and idea: “${sample}”`, 'Identify the subject and conjugated verb before adding details.', 'Change one detail to make a new message; verify the verb still agrees with the subject.'];
      worked = { prompt: `Worked example: form a clear sentence connected to ${name}`, steps, answer: sample };
      const answer = 'Identify the subject, conjugate the verb to match, then check meaning and context.';
      practice = [{ id: `${entry.id}-check1`, type: 'multiple-choice', question: 'When changing a sentence to use a different subject, what should you check?', options: [answer, 'Only the final punctuation', 'Whether the sentence has more words'], answer, explanation: 'In many languages the verb form changes with person; context and agreement are essential.' },
        { id: `${entry.id}-check2`, type: 'reflection', question: `Create one short sentence related to ${name}. Identify its subject and verb, then verify its meaning.`, answer: 'A valid sentence has a clear subject and a verb form that fits; vocabulary and meaning should be checked in context.', explanation: 'Self-checking meaning, agreement, and context develops accuracy beyond memorizing a translation.' }];
      goals = [`Recognize useful forms in ${name}`, 'Build and interpret a short message', 'Check grammar and meaning in context'];
      labels = ['subject', 'verb form', 'meaning'];
    } else if (/business|economic|account|entrepreneur|marketing|finance/.test(area)) {
      category = 'math';
      const economics = /economics|macroeconomics|microeconomics/.test(course.title.toLowerCase());
      const equation = economics
        ? 'Economics studies choices under scarcity. Opportunity cost is the value of the next-best alternative forgone; supply and demand describe how buyers and sellers interact, not a guarantee about every individual decision.'
        : /account|finance|budget|cost|revenue|profit|tax|interest/.test(topic)
        ? 'Separate money received from money spent. Net income = revenue − expenses; percentages and time periods must use consistent units.'
        : 'A business decision connects a customer need, a proposed value, resources, costs, and evidence of demand. State assumptions before comparing options.';
      const steps = economics
        ? ['A student can work for 2 hours at $18 per hour or use that time to study.', 'If the student studies, the next-best alternative is $18×2=$36 in wages.', 'The opportunity cost of studying in this example is $36 of foregone wages; other benefits and costs are not measured here.']
        : ['A student seller receives $120 and spends $75 on materials and fees.', 'Net result = $120 − $75.', 'The remaining $45 is before any other costs or taxes; state what is excluded.'];
      sections = [
        { heading: `1. Key idea: ${name}`, content: `${equation} Identify who makes the decision, the goal, the constraints, and who is affected. Distinguish measured facts from estimates.` },
        { heading: '2. Compare choices', content: 'List the relevant benefits, costs, risks, and assumptions. Use a simple table or calculation where possible; a larger revenue figure alone does not mean greater profit or better value.' },
        { heading: '3. Communicate a defensible decision', content: 'Show the calculation or evidence, explain why it supports the choice, and test how a changed assumption could alter the result. Financial rules depend on jurisdiction and situation; verify current requirements with an authoritative source.' }
      ];
      worked = { prompt: `Worked example: evaluate a simple ${name.toLowerCase()} decision`, steps, answer: economics ? 'The opportunity cost is $36 in foregone wages.' : 'Net result is $45 before unlisted costs; the conclusion depends on the assumptions stated.' };
      const question = economics ? 'A student studies instead of working 2 hours at $18/hour. What is the opportunity cost in foregone wages?' : 'Revenue is $200 and total listed expenses are $140. What is the net amount before unlisted costs?';
      const options = economics ? ['$36', '$18', '$0'] : ['$60', '$140', '$340'];
      const answer = economics ? '$36' : '$60';
      practice = [{ id: `${entry.id}-check1`, type: 'multiple-choice', question, options, answer, explanation: economics ? 'The next-best alternative is 2×$18=$36 in wages; this is one cost, not the only consideration.' : 'Subtract expenses from revenue: $200−$140=$60. Do not add expenses or ignore the costs.' },
        { id: `${entry.id}-check2`, type: 'reflection', question: `Name one assumption that could change a decision about ${name.toLowerCase()}.`, answer: 'Examples include demand, price, costs, time, customer needs, or constraints; explain how a change affects the choice.', explanation: 'Testing assumptions shows whether a decision remains sound when conditions change.' }];
      goals = [`Explain ${name} using course vocabulary`, 'Use evidence or calculations to compare options', 'State assumptions and possible limits'];
      labels = ['need', 'choice', 'outcome'];
    } else if (/computer|technology|programming|web development/.test(area)) {
      category = 'process';
      sections = [
        { heading: `1. Break down ${name}`, content: `A computational or technical solution starts with a clear problem. Define the user or system, inputs, desired output, constraints, and what counts as success. Split the work into steps small enough to test.` },
        { heading: '2. Trace the procedure', content: 'Write the algorithm in plain language or pseudocode before coding. For each step, track the current values and expected output. Use a small normal case by hand, then test a boundary case such as empty, minimum, or maximum input.' },
        { heading: '3. Debug with evidence', content: 'When actual and expected results differ, reproduce the case, isolate the step where values diverge, and change one thing at a time. Check accessibility, privacy, and security requirements appropriate to the design; do not treat a passing test as proof that no defects exist.' }
      ];
      const steps = ['Task: find the larger of 8 and 5.', 'Set current maximum to 8; compare 5 with 8.', 'Since 5 is not greater, keep 8. Output 8; test a tie and a one-item input separately.'];
      worked = { prompt: `Worked example: trace a small procedure for ${name}`, steps, answer: 'Output 8; the trace records why the output follows from the inputs.' };
      const answer = 'Define inputs and expected output, trace one example, then test a boundary case.';
      practice = [{ id: `${entry.id}-check1`, type: 'multiple-choice', question: 'A program gives the wrong result for an empty list. What is the best next step?', options: [answer, 'Delete the test and assume users will not do that', 'Rewrite everything without reproducing the bug'], answer, explanation: 'A reproducible failing case helps isolate the defect; boundary cases reveal assumptions.' },
        { id: `${entry.id}-check2`, type: 'reflection', question: `Give one test case that could reveal an error in a feature related to ${name}.`, answer: 'State the input, expected output, and why that case tests a normal or boundary condition.', explanation: 'A useful test compares an explicit expectation with the observed behavior.' }];
      goals = [`Describe the purpose of ${name}`, 'Represent a procedure as testable steps', 'Use cases and evidence to revise a solution'];
      labels = ['input', 'process', 'output'];
    } else if (/career|health|wellness|food|physical|family|safety/.test(area)) {
      category = 'process';
      sections = [
        { heading: `1. Apply ${name} to a real context`, content: `Start by identifying the situation, the people involved, relevant needs, and the decision to be made. Separate reliable information from assumptions. Context matters: access, culture, environment, and personal circumstances can change what is appropriate.` },
        { heading: '2. Use a safe, informed process', content: 'Compare options using reliable, current sources and consider likely benefits, risks, and constraints. For health, nutrition, safety, or legal questions, use qualified local guidance; this lesson is for learning and is not personal medical or legal advice.' },
        { heading: '3. Reflect and seek support', content: 'Explain why an option fits the stated situation, what could change the decision, and when to ask a trusted adult or qualified professional. Respect consent, privacy, and individual boundaries.' }
      ];
      const steps = ['Situation: a class group is choosing a way to include everyone in an activity.', 'Ask participants about access needs and preferences; do not assume everyone has the same ability or resources.', 'Choose an option, confirm it with those affected, and adjust if it excludes someone.'];
      worked = { prompt: `Worked example: make a context-aware choice about ${name}`, steps, answer: 'A sound choice responds to the people involved, uses reliable information, and is checked with those affected.' };
      const answer = 'Consider context, reliable evidence, affected people, safety, and where support is needed.';
      practice = [{ id: `${entry.id}-check1`, type: 'multiple-choice', question: 'Which approach is most responsible when a health or safety question is uncertain?', options: [answer, 'Rely on an unverified social post', 'Assume one answer fits every person'], answer, explanation: 'Reliable, current guidance and qualified support are important when decisions can affect health or safety.' },
        { id: `${entry.id}-check2`, type: 'reflection', question: `What context or perspective should be considered when applying ${name.toLowerCase()}?`, answer: 'Identify affected people, their needs and boundaries, reliable information, and any reason to seek qualified support.', explanation: 'Considering context avoids overgeneralizing and helps make a safer, more inclusive decision.' }];
      goals = [`Describe ${name} in a relevant situation`, 'Use reliable information and consider context', 'Identify when support or further guidance is needed'];
      labels = ['situation', 'informed choice', 'check'];
    } else {
      category = /arts|media|textiles|music|design/.test(area) ? 'design' : 'humanities';
      sections = [
        { heading: `1. Understand ${name}`, content: `Begin with the purpose and context of ${name} in ${course.title}. Identify the important materials, ideas, people, or choices and define unfamiliar terms. Use the unit focus—${unit}—to connect this lesson to the wider course.` },
        { heading: '2. Examine a concrete example', content: 'Notice what is present, how the parts relate, and what effect those choices have. Make an observation first, then an interpretation supported by details. In creative work, identify the intention, audience, materials or techniques, and constraints.' },
        { heading: '3. Make, analyze, and revise', content: 'Try a small example or analysis. Make one deliberate choice, predict its effect, and compare the outcome with your intention. Use feedback or evidence to revise; explain what changed and why.' }
      ];
      const steps = ['Set a clear purpose and identify an audience or question.', 'Choose one relevant element, technique, source, or material and explain why it fits.', 'Review the result against the purpose; name one revision supported by observation or feedback.'];
      worked = { prompt: `Worked example: apply a process to ${name}`, steps, answer: 'A successful response connects an intentional choice to an observable effect and explains a possible revision.' };
      const answer = 'Connect a deliberate choice to its effect, then explain the evidence or feedback that supports a revision.';
      practice = [{ id: `${entry.id}-check1`, type: 'multiple-choice', question: `When analyzing or creating work related to ${name}, what is the strongest reflection?`, options: [answer, 'It is good because I like it', 'List materials without explaining their effect'], answer, explanation: 'A useful reflection links intention, choice, effect, and evidence rather than only stating preference.' },
        { id: `${entry.id}-check2`, type: 'reflection', question: `Choose one decision you could make in a task about ${name}. What effect do you expect, and how would you evaluate it?`, answer: 'State a deliberate choice, the intended effect, and observable evidence or feedback that could confirm or challenge it.', explanation: 'Predicting and checking an effect makes creative and analytical choices purposeful.' }];
      goals = [`Explain the purpose of ${name}`, 'Connect a choice to its effect', 'Use evidence or feedback to revise'];
      labels = ['purpose', 'choice', 'effect'];
    }

    const diagram = visual(course, entry, category, labels);
    const definition = sections[0].content.split(/(?:\.\s|[!?]\s)/)[0].trim();
    return {
      ...entry,
      published: true,
      generated: true,
      time: '15 min',
      source: { name: 'StudyBC lesson · BC curriculum alignment', curriculum },
      goals,
      vocabulary: [{ term: name, definition }],
      sections,
      examples: [worked],
      mistakes: ['Skipping the meaning of key terms or units.', 'Treating an example or model as proof without checking its assumptions.'],
      interactive: { type: 'reflection', label: 'Explain the idea, solve the example, and check your reasoning.' },
      practice,
      diagram,
      summary: sections.map(section => section.heading.replace(/^\d+\.\s*/, '')),
      cheatSheet: goals.slice(0, 3)
    };
  }

  let count = 0;
  for (const course of data.courses) {
    for (let index = 0; index < course.lessons.length; index += 1) {
      const entry = course.lessons[index];
      if (entry.published !== false) continue;
      course.lessons[index] = makeLesson(course, entry);
      count += 1;
    }
    if (course.lessons.some(lesson => lesson.generated)) {
      course.units = course.units.map(unit => ({
        ...unit,
        lessons: course.lessons.filter(lesson => lesson.unit === unit.name).length
      }));
    }
  }
  let backfilled = 0;
  for (const course of data.courses) {
    for (const lesson of course.lessons) {
      if (lesson.published === false || lesson.diagram?.svg) continue;
      const context = `${course.area} ${course.title}`.toLowerCase();
      const category = /math|calculus|statistics|geometry/.test(context) ? 'math'
        : /science|chemistry|physics|biology/.test(context) ? 'science'
          : /english|literature|writing|language arts|humanities|social studies/.test(context) ? 'humanities'
            : /language|french|spanish|mandarin/.test(context) ? 'language'
              : /arts|media|textiles|music|design/.test(context) ? 'design'
                : 'process';
      const vocabulary = (lesson.vocabulary || []).map(item => item.term).filter(Boolean);
      const goals = (lesson.goals || []).filter(Boolean);
      const titleParts = topicWords(lesson.title);
      const labels = [vocabulary[0] || titleParts[0] || lesson.title, vocabulary[1] || goals[0] || lesson.unit, vocabulary[2] || goals[1] || 'check'];
      lesson.diagram = visual(course, lesson, category, labels);
      backfilled += 1;
    }
  }
  if (count) console.info(`StudyBC authored ${count} curriculum topic lessons.`);
  if (backfilled) console.info(`StudyBC added topic visuals to ${backfilled} published lessons.`);
})();
