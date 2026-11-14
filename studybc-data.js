window.STUDYBC_DATA = {
  grades: ["10", "11", "12", "AP"],
  areas: [
    { id: "mathematics", title: "Mathematics", icon: "fa-calculator" },
    { id: "sciences", title: "Sciences", icon: "fa-flask" },
    { id: "social-studies", title: "Social Studies", icon: "fa-landmark" },
    { id: "english", title: "English Language Arts", icon: "fa-book-open" },
    { id: "business", title: "Business & Economics", icon: "fa-chart-line" },
    { id: "computer-science", title: "Computer Science & Tech", icon: "fa-computer" },
    { id: "wellness", title: "Career & Health", icon: "fa-heart-pulse" },
    { id: "languages", title: "Languages", icon: "fa-language" }
  ],
  courses: [
    {
      id: "fm10",
      grade: "10",
      area: "Mathematics",
      title: "Foundations of Math and Pre-Calculus 10",
      code: "FMP 10",
      textbook: "Foundations of Math and Pre-Calculus 10 — often paired with classroom handouts and teacher-approved texts; verify with your school.",
      status: "Complete",
      summary: "Build algebra, graphing, and problem-solving confidence with a strong foundation for future math pathways.",
      bigIdeas: [
        { title: "Algebra is a language for patterns and relationships.", detail: "Patterns describe how quantities change together, and equations help us represent and predict that connection." },
        { title: "Functions reveal how quantities depend on each other.", detail: "Graphs and tables help us see a relationship at a glance and interpret change." },
        { title: "Measurement and geometry help us describe the physical world.", detail: "Area, volume, angle relationships, and spatial reasoning connect mathematical rules to everyday contexts." }
      ],
      competencies: [
        { label: "Reasoning and analyzing", detail: "Students use patterns, logic, and structure to solve unfamiliar problems." },
        { label: "Understanding and solving", detail: "Students model situations, choose strategies, and justify results." },
        { label: "Communicating and representing", detail: "Students explain thinking using equations, tables, graphs, diagrams, and language." }
      ],
      learningStandards: [
        { name: "Operations on polynomial expressions", elaboration: "Expand and simplify expressions, connect algebraic rules to area models, and solve equations with multiple steps." },
        { name: "Linear relations and slope", elaboration: "Use tables, graphs, and equations to describe lines and interpret rate of change." },
        { name: "Factoring and quadratic relationships", elaboration: "Recognize common factoring patterns and connect zeros, graphs, and equations." },
        { name: "Trigonometry and right triangles", elaboration: "Use sine, cosine, and tangent to solve for missing sides and angles in realistic problems." }
      ],
      units: [
        { name: "Linear Relationships", summary: "Slope, rate of change, and graphing equations.", lessons: 4, hours: 10 },
        { name: "Polynomials", summary: "Simplifying, factoring, and solving expressions.", lessons: 5, hours: 12 },
        { name: "Quadratics", summary: "Parabolas, zeros, and real-world modeling.", lessons: 5, hours: 10 },
        { name: "Trigonometry", summary: "Right triangles and angle relationships.", lessons: 4, hours: 9 }
      ],
      prerequisites: ["Positive and negative number operations", "Fractions and decimals", "Solving one- and two-step equations"],
      leadsTo: ["Foundations of Math 11", "Pre-Calculus 11", "Workplace Math 11"],
      lessons: [
        {
          id: "linear-relations",
          title: "Linear Relations and Slope",
          unit: "Linear Relationships",
          time: "35 min",
          goals: ["Interpret slope as a rate of change", "Write equations from a graph or table", "Use a graph to predict values"],
          vocabulary: [
            { term: "Slope", definition: "The steepness of a line; a measure of how much y changes when x changes by 1." },
            { term: "Rate of change", definition: "How one quantity changes compared with another, such as kilometres per hour." },
            { term: "Intercept", definition: "The value where a graph crosses the x- or y-axis." }
          ],
          sections: [
            { heading: "What is slope?", content: "Slope compares vertical change to horizontal change. If your phone battery drains 10% every 20 minutes, the rate of change is -0.5% per minute. In equations, slope tells us how quickly one quantity changes relative to another." },
            { heading: "Why slope matters", content: "A larger slope means a steeper line. In a bus fare graph, a steeper slope could mean a bigger cost increase per kilometre. In real life, slope can describe speed, growth, or cost." }
          ],
          examples: [
            { prompt: "Find the slope between (2, 5) and (6, 13).", steps: ["Subtract y-values: 13 - 5 = 8.", "Subtract x-values: 6 - 2 = 4.", "Divide: 8 ÷ 4 = 2.", "The slope is 2."], answer: "m = 2" },
            { prompt: "A taxi charges $3 base fee plus $2 per kilometre. Write the equation.", steps: ["The base fee is the y-intercept: 3.", "The cost per kilometre is the slope: 2.", "Use y = mx + b: y = 2x + 3."], answer: "y = 2x + 3" },
            { prompt: "A line passes through (0, 7) and (3, 13). What is the rate of change?", steps: ["Change in y: 13 - 7 = 6.", "Change in x: 3 - 0 = 3.", "Rate = 6 ÷ 3 = 2.", "The line rises 2 units for every 1 unit of x."], answer: "2" }
          ],
          mistakes: ["Forgetting to subtract in the same order on both axes.", "Confusing the x- and y-intercepts.", "Writing slope as run over rise instead of rise over run."],
          interactive: { type: "slider", label: "Adjust the slope and watch the line change.", min: 0, max: 5, value: 2 },
          practice: [
            { id: "q1", type: "multiple-choice", question: "What is the slope of the line through (1, 3) and (5, 11)?", options: ["2", "3", "4", "8"], answer: "2", explanation: "The slope is (11 - 3)/(5 - 1) = 8/4 = 2." },
            { id: "q2", type: "short-answer", question: "A canoe rental costs $15 plus $8 per hour. Write an equation for total cost C in terms of h hours.", answer: "C = 8h + 15", explanation: "The slope is 8 and the y-intercept is 15." },
            { id: "q3", type: "numeric", question: "A line has points (2, 4) and (6, 12). What is the slope?", answer: 2, tolerance: 0.2, explanation: "(12-4)/(6-2)=8/4=2." }
          ],
          summary: ["Slope tells us how quickly a relationship changes.", "On a graph, it is rise over run.", "Linear equations follow y = mx + b."],
          cheatSheet: ["Slope = (y₂ - y₁)/(x₂ - x₁)", "If x increases by 1, y changes by the slope.", "The y-intercept is the starting value when x = 0."]
        },
        {
          id: "polynomials",
          title: "Factoring and Simplifying Polynomials",
          unit: "Polynomials",
          time: "40 min",
          goals: ["Combine like terms", "Factor common terms", "Recognize special patterns"],
          vocabulary: [
            { term: "Polynomial", definition: "An algebraic expression made of terms that include numbers, variables, and powers." },
            { term: "Like terms", definition: "Terms that share the same variable and exponent, so they can be combined." },
            { term: "Factor", definition: "To rewrite an expression as a product, often to reveal common structure." }
          ],
          sections: [
            { heading: "Why factor?", content: "Factoring is the reverse of expanding. It helps you solve equations, simplify fractions, and understand where a graph crosses the x-axis." },
            { heading: "Common factor method", content: "Look for the biggest number or variable that appears in every term, then divide each piece by it." }
          ],
          examples: [
            { prompt: "Simplify 3x + 9.", steps: ["Both terms are divisible by 3.", "Factor 3: 3(x + 3).", "This is the factored form."], answer: "3(x + 3)" },
            { prompt: "Factor x² + 5x + 6.", steps: ["Find two numbers that multiply to 6 and add to 5.", "The numbers are 2 and 3.", "Write (x + 2)(x + 3)."], answer: "(x + 2)(x + 3)" },
            { prompt: "Expand (x + 4)(x - 2).", steps: ["Multiply x·x = x².", "Multiply x·(-2) = -2x.", "Multiply 4·x = 4x.", "Multiply 4·(-2) = -8.", "Combine: x² + 2x - 8."], answer: "x² + 2x - 8" }
          ],
          mistakes: ["Not distributing the negative sign correctly.", "Forgetting to check the middle term after factoring.", "Combining unlike terms as though they are the same."],
          interactive: { type: "sorter", label: "Sort each expression into simplified or factored form.", items: ["3x + 12", "3(x + 4)", "x² - 4", "(x + 2)(x - 2)"] },
          practice: [
            { id: "q4", type: "multiple-choice", question: "Factor 4x + 12.", options: ["4(x + 3)", "x(4 + 12)", "4x + 12", "12(x + 4)"], answer: "4(x + 3)", explanation: "Both terms are divisible by 4." },
            { id: "q5", type: "short-answer", question: "Factor x² + 7x + 12.", answer: "(x + 3)(x + 4)", explanation: "3 and 4 multiply to 12 and add to 7." },
            { id: "q6", type: "numeric", question: "What is the sum of the roots in x² + 5x + 6 = 0?", answer: -5, tolerance: 0.1, explanation: "For x² + bx + c, the sum of roots is -b." }
          ],
          summary: ["Factoring is the reverse of expansion.", "Common factoring removes a shared factor.", "Product-sum thinking helps with quadratics."],
          cheatSheet: ["Factor out the GCF first.", "Look for special patterns: difference of squares and trinomial factoring.", "Check by expanding the answer." ]
        }
      ]
    },
    {
      id: "chem11",
      grade: "11",
      area: "Sciences",
      title: "Chemistry 11",
      code: "CHEM 11",
      textbook: "Chemistry 11 — teacher-approved text and lab manual; verify exact editions with your school.",
      status: "In progress",
      summary: "Explore atoms, bonding, and chemical reactions with visual models and lab reasoning.",
      bigIdeas: [
        { title: "Atoms are the building blocks of matter.", detail: "Matter is made of particles that have structure, charge, and arrangement." },
        { title: "Chemical bonds create structure and determine properties.", detail: "The type of bonding shapes melting point, conductivity, and reactivity." },
        { title: "Reactions transform matter while conserving key quantities.", detail: "Atoms are rearranged, but conservation laws help us predict outcomes." }
      ],
      competencies: [
        { label: "Questioning and predicting", detail: "Students form hypotheses and test explanations using evidence." },
        { label: "Planning and conducting", detail: "Students design safe and controlled investigations." },
        { label: "Applying and innovating", detail: "Students use models to explain real-world chemistry." }
      ],
      learningStandards: [
        { name: "Atomic structure and periodic trends", elaboration: "Relate electron arrangements to periodic behaviour and bonding patterns." },
        { name: "Chemical bonding", elaboration: "Compare ionic, covalent, and metallic bonding using structure and properties." },
        { name: "Reactions and stoichiometry", elaboration: "Balance equations and explain how quantities of reactants relate to products." }
      ],
      units: [
        { name: "Atoms & Periodic Table", summary: "Subatomic particles, atoms, and periodic trends.", lessons: 4, hours: 9 },
        { name: "Bonding", summary: "Ionic, covalent, and intermolecular forces.", lessons: 5, hours: 11 },
        { name: "Stoichiometry", summary: "Balancing equations and quantitative chemistry.", lessons: 4, hours: 10 }
      ],
      prerequisites: ["Lab safety and scientific notation", "Basic particle theory", "Algebraic solving"],
      leadsTo: ["Chemistry 12", "AP Chemistry", "Environmental Science 11"],
      lessons: [
        {
          id: "atomic-structure",
          title: "Atomic Structure and the Periodic Table",
          unit: "Atoms & Periodic Table",
          time: "30 min",
          goals: ["Describe protons, neutrons, and electrons", "Connect atomic number to element identity", "Use periodic trends to predict behavior"],
          vocabulary: [
            { term: "Atom", definition: "The smallest unit of an element that keeps the element's identity." },
            { term: "Electron", definition: "A negatively charged particle found outside the nucleus." },
            { term: "Atomic number", definition: "The number of protons in an atom's nucleus." }
          ],
          sections: [
            { heading: "Inside an atom", content: "Atoms have a nucleus containing protons and neutrons, surrounded by electrons in regions of space. The atomic number tells you the number of protons, which also equals the number of electrons in a neutral atom." },
            { heading: "Why the periodic table is helpful", content: "Elements are organized by increasing atomic number. Columns share similar bonding behaviour because they have similar valence electron arrangements." }
          ],
          examples: [
            { prompt: "How many protons, electrons, and neutrons are in a neutral carbon-14 atom?", steps: ["Carbon has atomic number 6, so it has 6 protons.", "Neutral atoms have equal electrons and protons, so 6 electrons.", "Carbon-14 has mass number 14, so neutrons = 14 - 6 = 8."], answer: "6 protons, 6 electrons, 8 neutrons" },
            { prompt: "Which element has the atomic number 11?", steps: ["Atomic number identifies the element.", "11 = sodium (Na)."], answer: "Sodium" },
            { prompt: "Why are alkali metals highly reactive?", steps: ["They have one valence electron.", "That electron is easy to lose in reactions."], answer: "They readily lose one electron to form compounds." }
          ],
          mistakes: ["Confusing atomic number with mass number.", "Forgetting electrons equal protons in a neutral atom.", "Mixing up periods and groups on the periodic table."],
          interactive: { type: "slider", label: "Move the atomic number slider to explore element identity.", min: 1, max: 20, value: 6 },
          practice: [
            { id: "c1", type: "multiple-choice", question: "An atom has 8 protons, 8 electrons, and 8 neutrons. What is its mass number?", options: ["8", "16", "24", "32"], answer: "16", explanation: "Mass number = protons + neutrons = 8 + 8 = 16." },
            { id: "c2", type: "short-answer", question: "What is the group name for elements that are very unreactive?", answer: "Noble gases", explanation: "They have full valence shells, making them stable." },
            { id: "c3", type: "numeric", question: "If an atom has 12 protons and 12 neutrons, what is its mass number?", answer: 24, tolerance: 0.1, explanation: "12 + 12 = 24." }
          ],
          summary: ["Atomic number identifies an element.", "The nucleus holds protons and neutrons.", "Elements in the same group share similar chemistry."],
          cheatSheet: ["Atomic number = number of protons", "Mass number = protons + neutrons", "Neutral atom: electrons = protons"]
        }
      ]
    },
    {
      id: "social10",
      grade: "10",
      area: "Social Studies",
      title: "Social Studies 10",
      code: "SS 10",
      textbook: "Social Studies 10 — teacher-approved text and case studies; verify local classroom resources.",
      status: "In progress",
      summary: "Explore identity, governance, and historical change through Canadian and global perspectives.",
      bigIdeas: [
        { title: "Identity shapes how societies see themselves.", detail: "People and communities are shaped by values, traditions, and lived experience." },
        { title: "Governance affects rights and responsibilities.", detail: "Laws, institutions, and political decisions influence daily life." },
        { title: "Historical change is driven by power and ideas.", detail: "Conflict, cooperation, and innovation reshape societies over time." }
      ],
      competencies: [
        { label: "Historical thinking", detail: "Students interpret primary sources and explain continuity and change." },
        { label: "Critical thinking", detail: "Students evaluate evidence and recognize perspectives." },
        { label: "Communication", detail: "Students explain arguments using evidence and respectful language." }
      ],
      learningStandards: [
        { name: "Canadian identity and governance", elaboration: "Analyze how democracy, rights, and citizenship shape Canada." },
        { name: "Historical development and conflict", elaboration: "Compare major turning points and their impacts on communities." },
        { name: "Global connections", elaboration: "Consider how migration, trade, and conflict connect local and global stories." }
      ],
      units: [
        { name: "Canadian Identity", summary: "Values, citizenship, and belonging.", lessons: 4, hours: 8 },
        { name: "World Wars", summary: "Causes, events, and social transformation.", lessons: 5, hours: 10 },
        { name: "Rights & Responsibilities", summary: "Law, governance, and active citizenship.", lessons: 4, hours: 8 }
      ],
      prerequisites: ["Reading and source analysis", "Basic historical vocabulary", "Opinion writing"],
      leadsTo: ["Explorations in Social Studies 11", "BC First Peoples 12", "Human Geography 12"],
      lessons: []
    }
  ]
};
