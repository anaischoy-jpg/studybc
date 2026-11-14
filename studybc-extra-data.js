(function () {
  const lesson = (courseId, unit, spec) => ({
    id: spec.id,
    title: spec.title,
    unit,
    time: '25 min',
    goals: spec.goals,
    vocabulary: spec.vocabulary,
    sections: [
      { heading: 'Start with the idea', content: `${spec.foundation} ${spec.analogy}` },
      { heading: 'A reliable way to solve it', content: spec.method.join(' ') },
      { heading: 'Go further: use and interpretation', content: spec.application }
    ],
    examples: spec.examples,
    mistakes: spec.mistakes,
    interactive: { type: 'slider', label: 'Use the range to explore a changing value.', min: 0, max: 10, value: 5 },
    practice: spec.questions.map((question, index) => ({
      id: `${courseId}-${spec.id}-${index + 1}`,
      type: 'multiple-choice',
      question: question.prompt,
      options: question.options,
      answer: question.options[question.correct],
      explanation: question.explanation
    })),
    summary: spec.summary,
    cheatSheet: spec.cheatSheet
  });

  const createCourse = (definition) => {
    const units = definition.units.map(unit => ({
      name: unit.name,
      summary: unit.summary,
      lessons: unit.lessons.length,
      hours: unit.hours
    }));
    return {
      id: definition.id,
      grade: definition.grade,
      area: definition.area,
      title: definition.title,
      code: definition.code,
      textbook: definition.textbook,
      status: 'In progress',
      summary: definition.summary,
      bigIdeas: definition.bigIdeas.map(title => ({ title, detail: definition.summary })),
      competencies: [
        { label: 'Reason and explain', detail: 'Show why a method works, not only what answer it produces.' },
        { label: 'Apply and connect', detail: 'Use models and evidence to explain unfamiliar situations.' }
      ],
      learningStandards: definition.units.map(unit => ({ name: unit.name, elaboration: unit.summary })),
      units,
      prerequisites: definition.prerequisites,
      leadsTo: definition.leadsTo,
      lessons: definition.units.flatMap(unit => unit.lessons.map(spec => lesson(definition.id, unit.name, spec)))
    };
  };

  const q = (prompt, options, correct, explanation) => ({ prompt, options, correct, explanation });
  const example = (prompt, steps, answer) => ({ prompt, steps, answer });
  const spec = (id, title, foundation, analogy, method, application, examples, questions, extra = {}) => ({
    id,
    title,
    foundation,
    analogy,
    method,
    application,
    examples,
    questions,
    goals: extra.goals || ['Explain the central idea in your own words', 'Use a repeatable method to solve a problem', 'Check whether a result makes sense in context'],
    vocabulary: extra.vocabulary || [{ term: 'Model', definition: 'A simplified representation used to describe or predict a real situation.' }, { term: 'Assumption', definition: 'A condition treated as true so a model can be applied.' }],
    mistakes: extra.mistakes || ['Using a rule without checking its assumptions.', 'Skipping units or labels when interpreting a result.', 'Treating an estimate as exact when the inputs are approximate.'],
    summary: extra.summary || ['Name what is known and what is being asked.', 'Choose a model that matches the situation.', 'Check the answer against the original context.'],
    cheatSheet: extra.cheatSheet || ['Define the variables.', 'Show each step.', 'Interpret the result.']
  });

  const physics = createCourse({
    id: 'physics11', grade: '11', area: 'Sciences', title: 'Physics 11: Motion & Energy', code: 'PHYS 11',
    textbook: 'StudyBC original notes; compare terminology and expectations with your course outline.',
    summary: 'Build a first-principles understanding of motion, forces, energy, and evidence-based physical models.',
    bigIdeas: ['Motion can be described and predicted with mathematical models.', 'Forces explain changes in motion.', 'Energy moves and changes form while the total is conserved.'],
    prerequisites: ['Arithmetic with signed numbers', 'Ratios and unit conversions', 'Reading simple graphs'],
    leadsTo: ['Physics 12', 'Engineering', 'University science'],
    units: [
      { name: 'Describing Motion', summary: 'Position, velocity, acceleration, and motion graphs.', hours: 5, lessons: [
        spec('position-and-displacement', 'Position, Distance, and Displacement',
          'Position tells where an object is relative to a chosen origin. Distance adds the length of the whole path; displacement compares only the final position with the starting position.',
          'A walk around a block can cover 400 m of distance yet end at the starting point, so its displacement is zero.',
          ['Choose and label an origin and positive direction.', 'Record the initial and final positions.', 'Compute displacement as final position minus initial position.', 'For distance, add every segment of the path without signs.'],
          'Displacement is a vector: its direction matters. Distance is a scalar and cannot be negative. This distinction is essential when describing travel, navigation, and motion in one dimension.',
          [example('A student walks from x = 2 m to x = 11 m.', ['Initial position is 2 m.', 'Final position is 11 m.', 'Displacement is 11 - 2 = 9 m in the positive direction.'], 'Distance is 9 m; displacement is +9 m.'),
            example('A runner goes 8 m east and then 3 m west.', ['Total path length is 8 + 3 = 11 m.', 'Choose east as positive.', 'Net change is +8 - 3 = +5 m.'], 'Distance is 11 m; displacement is 5 m east.')],
          [q('A person walks 5 m north, then 5 m south. What is the displacement?', ['0 m', '5 m north', '10 m south', '10 m'], 0, 'Displacement is the final position minus the initial position. The person returns to the start, so the net change is 0 m even though the distance is 10 m.'),
            q('An object moves from x = -2 m to x = 4 m. What is its displacement?', ['-6 m', '2 m', '6 m', '8 m'], 2, 'Use final minus initial: 4 - (-2) = 6 m. The positive sign indicates the chosen positive direction.'),
            q('Which quantity includes the full path traveled?', ['Displacement', 'Distance', 'Position', 'Direction'], 1, 'Distance adds the lengths of all path segments. Displacement depends only on the change from start to finish.')],
          { vocabulary: [{ term: 'Position', definition: 'An object’s location measured from a stated origin.' }, { term: 'Displacement', definition: 'The signed change in position: final position minus initial position.' }, { term: 'Distance', definition: 'The total length of the path traveled.' }], cheatSheet: ['Displacement = final position - initial position', 'Distance is never negative', 'Choose a positive direction first'] }),
        spec('velocity-and-speed', 'Speed and Velocity',
          'Speed describes how quickly distance is covered. Average velocity describes displacement per elapsed time and includes direction. They can differ when an object turns around.',
          'A car’s speedometer shows speed, not whether the car is traveling north or south.',
          ['Find the elapsed time: final time minus initial time.', 'For average speed, divide total distance by elapsed time.', 'For average velocity, divide displacement by elapsed time.', 'Attach units and state direction when velocity is signed.'],
          'A position-time graph’s slope represents velocity. A flat segment means zero velocity; a steeper slope means a greater velocity magnitude.',
          [example('A cyclist travels 120 m east in 20 s.', ['Average velocity = displacement ÷ time.', '120 m ÷ 20 s = 6 m/s.', 'The displacement is east, so include the direction.'], '6 m/s east.'),
            example('A runner covers 100 m in 25 s.', ['Average speed = total distance ÷ time.', '100 m ÷ 25 s = 4 m/s.'], '4 m/s.')],
          [q('A person moves 30 m east in 10 s. What is average velocity?', ['3 m/s east', '3 m/s', '300 m/s east', '0.33 m/s east'], 0, 'Average velocity equals displacement divided by time: 30 m ÷ 10 s = 3 m/s east.'),
            q('A lap is 400 m and ends at the starting point. What is average velocity for the lap?', ['400 m/s', '400 m divided by time', '0 m/s', 'It must be positive'], 2, 'The displacement is zero because the runner finishes where they started. Average velocity is displacement divided by time, so it is zero.'),
            q('What does the slope of a position-versus-time graph represent?', ['Acceleration', 'Velocity', 'Distance', 'Force'], 1, 'Slope is change in position divided by change in time, which is velocity.')],
          { vocabulary: [{ term: 'Speed', definition: 'Distance traveled per unit time; a non-negative scalar.' }, { term: 'Velocity', definition: 'Displacement per unit time, including direction.' }, { term: 'Slope', definition: 'Vertical change divided by horizontal change on a graph.' }], cheatSheet: ['Average speed = distance / time', 'Average velocity = displacement / time', 'Position-time slope = velocity'] })
      ]},
      { name: 'Forces & Energy', summary: 'Newton’s laws, free-body reasoning, work, and energy conservation.', hours: 6, lessons: [
        spec('newtons-laws', 'Forces and Newton’s Laws',
          'A force is an interaction that can change an object’s motion. Newton’s laws connect the net force on an object to its acceleration; a balanced set of forces produces no acceleration.',
          'A shopping cart speeds up when you push it, but a heavier loaded cart accelerates less under the same push.',
          ['Choose one object as the system.', 'Draw every external force on that object.', 'Combine forces with signs or directions to find the net force.', 'Use net force = mass × acceleration and check units.'],
          'Newton’s third law pairs act on different objects, so they do not cancel on a single-object free-body diagram. Friction and air resistance are forces too.',
          [example('A 2 kg cart has a net force of 6 N to the right.', ['Newton’s second law: a = Fnet / m.', 'a = 6 N / 2 kg = 3 m/s².', 'The acceleration points right, matching the net force.'], '3 m/s² right.'),
            example('A book rests on a table.', ['Gravity pulls the book downward.', 'The table exerts an upward normal force.', 'At rest, the forces balance and the net force is zero.'], 'Net force = 0 N; acceleration = 0 m/s².')],
          [q('A 4 kg object experiences a net force of 12 N. What is its acceleration?', ['3 m/s²', '8 m/s²', '16 m/s²', '48 m/s²'], 0, 'Newton’s second law gives a = Fnet / m = 12 N / 4 kg = 3 m/s².'),
            q('If the net force on an object is zero, its acceleration is:', ['Always positive', 'Zero', 'Equal to its mass', 'Impossible to know'], 1, 'Newton’s second law says acceleration is proportional to net force. Zero net force means zero acceleration; the object may still move at constant velocity.'),
            q('A Newton’s third-law force pair acts on:', ['The same object', 'Two different objects', 'Only moving objects', 'No physical objects'], 1, 'Action-reaction forces are equal and opposite, but each force acts on a different member of the interaction pair.')],
          { vocabulary: [{ term: 'Net force', definition: 'The vector sum of all forces acting on one chosen object.' }, { term: 'Acceleration', definition: 'The rate at which velocity changes.' }, { term: 'Inertia', definition: 'An object’s tendency to resist a change in its motion.' }], cheatSheet: ['Fnet = ma', 'Balanced forces mean a = 0', 'Third-law forces act on different objects'] }),
        spec('work-and-energy', 'Work, Energy, and Conservation',
          'Energy is a quantity that can be transferred or transformed. In mechanics, kinetic energy is associated with motion and gravitational potential energy with height in a gravitational field.',
          'A skateboarder at the top of a ramp has stored gravitational energy; as they descend, more of it becomes motion energy.',
          ['Identify the system and the initial and final states.', 'Name the energy forms present at each state.', 'Account for transfers into or out of the system, including friction.', 'Compare total energy before and after; energy changes form but is conserved.'],
          'Mechanical energy is conserved when non-conservative transfers such as friction are negligible. With friction, some mechanical energy becomes thermal energy rather than disappearing.',
          [example('A 2 kg object moves at 3 m/s. Find its kinetic energy.', ['Use KE = ½mv².', 'Square speed: 3² = 9 m²/s².', 'KE = ½ × 2 kg × 9 m²/s² = 9 J.'], '9 J.'),
            example('A 1 kg book is lifted 2 m; use g = 9.8 m/s².', ['Use gravitational energy change ΔU = mgΔh.', 'ΔU = 1 × 9.8 × 2.', 'The increase is positive because height increases.'], '19.6 J.')],
          [q('What is the kinetic energy of a 2 kg object moving at 4 m/s?', ['8 J', '16 J', '24 J', '32 J'], 1, 'KE = ½mv² = ½ × 2 × 4² = 16 J. Be sure to square the speed.'),
            q('In an ideal frictionless fall, gravitational potential energy is mainly converted to:', ['Mass', 'Kinetic energy', 'Charge', 'Temperature only'], 1, 'With negligible friction, total mechanical energy is conserved, so a decrease in gravitational potential energy becomes an increase in kinetic energy.'),
            q('Does friction destroy energy?', ['Yes, energy vanishes', 'No, it transfers mechanical energy into other forms', 'Only if an object stops', 'Yes, but only on Earth'], 1, 'Friction transfers some mechanical energy into thermal energy and sound. Total energy is conserved when the system is considered broadly.')],
          { vocabulary: [{ term: 'Kinetic energy', definition: 'Energy associated with motion: KE = ½mv².' }, { term: 'Potential energy', definition: 'Stored energy associated with position or configuration.' }, { term: 'Conservation', definition: 'The total energy of an isolated system remains constant.' }], cheatSheet: ['KE = ½mv²', 'Δ gravitational energy = mgΔh', 'Energy transforms; it does not disappear'] })
      ]}
    ]
  });

  const economics = createCourse({
    id: 'economics12', grade: '12', area: 'Business & Economics', title: 'Economics 12: Choices & Markets', code: 'ECON 12',
    textbook: 'StudyBC original notes; use current public data for real-world economic comparisons.',
    summary: 'Use economic reasoning to understand scarcity, incentives, markets, inflation, and public policy.',
    bigIdeas: ['Scarcity makes trade-offs unavoidable.', 'Prices coordinate decisions in markets.', 'Economic indicators describe different parts of an economy.'],
    prerequisites: ['Percentages and ratios', 'Reading tables and line graphs', 'Comparing cause and effect'],
    leadsTo: ['Microeconomics', 'Macroeconomics', 'Business studies'],
    units: [
      { name: 'Economic Thinking', summary: 'Scarcity, opportunity cost, and incentives.', hours: 4, lessons: [
        spec('scarcity-and-choice', 'Scarcity, Choice, and Opportunity Cost',
          'Scarcity means available resources are limited relative to wants. Because time, money, and materials have alternative uses, choosing one option means giving up the next-best alternative.',
          'An hour spent studying economics cannot also be spent at a paid shift; the lost shift earnings may be part of the opportunity cost.',
          ['List the realistic alternatives.', 'Choose one option.', 'Identify the best alternative you did not choose.', 'Measure the opportunity cost in the most relevant forgone benefit, not every rejected option added together.'],
          'Opportunity cost is not always money. It can be time, enjoyment, or another benefit. A careful decision compares marginal benefits with marginal costs.',
          [example('You spend $12 on a movie instead of a book you value at $9.', ['The movie is the chosen option.', 'The best forgone alternative is the book.', 'Opportunity cost is the value of that next-best alternative, $9, not the $12 ticket price.'], 'The opportunity cost is the forgone book valued at $9.'),
            example('You have two free hours and choose a hike over a shift paying $18 per hour.', ['The next-best option is the paid shift.', 'Two hours of wages would be 2 × $18 = $36.', 'If no other relevant benefit exceeds it, $36 is the monetary opportunity cost.'], '$36 in forgone wages, plus any non-monetary trade-off.')],
          [q('Opportunity cost is best defined as:', ['Every possible option you reject', 'The value of the next-best alternative forgone', 'Only money already spent', 'The total cost of all resources'], 1, 'Opportunity cost focuses on the single next-best alternative forgone when a choice is made.'),
            q('A student chooses a $20 meal over a $15 meal. The $20 paid is:', ['Always the opportunity cost', 'A sunk cost', 'The purchase price; opportunity cost depends on the next-best option', 'A benefit'], 2, 'The purchase price is not itself the opportunity cost. The opportunity cost is the value of the best alternative the student gives up.'),
            q('Why does scarcity require choices?', ['Resources have no alternative uses', 'Wants are limited', 'Resources are limited relative to wants', 'Prices always rise'], 2, 'Scarcity exists because resources cannot satisfy every want at once, so people and societies must choose.')],
          { vocabulary: [{ term: 'Scarcity', definition: 'A condition where limited resources cannot satisfy all wants.' }, { term: 'Opportunity cost', definition: 'The value of the next-best alternative given up.' }, { term: 'Incentive', definition: 'A reward or cost that influences a decision.' }], cheatSheet: ['Scarcity → choice → trade-off', 'Opportunity cost = next-best forgone alternative', 'Compare marginal benefit with marginal cost'] }),
        spec('supply-and-demand', 'Supply, Demand, and Market Equilibrium',
          'Demand describes how much buyers are willing and able to purchase at different prices. Supply describes how much sellers are willing and able to offer. Their intersection is an equilibrium price and quantity in the model.',
          'A farmers’ market has more buyers than available berries at a low price; sellers may raise the price, encouraging more supply and reducing quantity demanded.',
          ['Draw price on the vertical axis and quantity on the horizontal axis.', 'Show demand sloping down and supply sloping up, other things equal.', 'Find where the curves intersect.', 'Distinguish a movement along a curve (price change) from a shift (another determinant changes).'],
          'Income, preferences, input costs, technology, and expectations can shift curves. A shift changes the equilibrium; a price change alone moves along the existing curve.',
          [example('Demand increases while supply stays fixed.', ['An increase in demand shifts the demand curve right.', 'At the old price, a shortage appears.', 'Competition among buyers pushes price upward.', 'The new equilibrium has a higher price and quantity.'], 'Equilibrium price and quantity both rise.'),
            example('The cost of flour rises for bakeries.', ['Flour is an input in bread production.', 'Higher input cost makes each quantity less profitable.', 'Supply shifts left.', 'With demand unchanged, equilibrium price rises and quantity falls.'], 'Price rises; equilibrium quantity falls.')],
          [q('A change in the good’s own price usually causes:', ['A shift of both curves', 'A movement along a curve', 'No change in quantity', 'A change in preferences'], 1, 'In the basic model, a good’s own price changes quantity demanded or supplied along an existing curve; non-price determinants shift curves.'),
            q('If demand rises and supply is unchanged, equilibrium quantity generally:', ['Falls', 'Rises', 'Must be zero', 'Cannot change'], 1, 'A rightward demand shift creates upward pressure on both equilibrium price and quantity in the standard model.'),
            q('A new technology lowers production costs. What happens to supply?', ['It shifts right', 'It shifts left', 'It becomes demand', 'It does not change'], 0, 'Lower production costs make it profitable to supply more at each price, shifting supply to the right.')],
          { vocabulary: [{ term: 'Demand', definition: 'The quantities buyers are willing and able to purchase at different prices.' }, { term: 'Supply', definition: 'The quantities sellers are willing and able to offer at different prices.' }, { term: 'Equilibrium', definition: 'A model outcome where quantity demanded equals quantity supplied.' }], cheatSheet: ['Demand shift right → P↑, Q↑ (supply fixed)', 'Supply shift right → P↓, Q↑ (demand fixed)', 'Own-price change = movement along a curve'] })
      ]},
      { name: 'Measuring the Economy', summary: 'GDP, inflation, unemployment, and the limits of indicators.', hours: 5, lessons: [
        spec('gdp-and-growth', 'GDP, Real Growth, and Living Standards',
          'Gross domestic product (GDP) measures the market value of final goods and services produced within a country during a period. It is an output measure, not a complete measure of well-being.',
          'GDP is like a country’s production receipt for a year: useful for measuring output, but it does not tell you how fairly income is shared or how healthy people feel.',
          ['Define the country and time period.', 'Count final goods and services produced inside the boundary.', 'Use real GDP to compare output after adjusting for price changes.', 'For average output per person, divide by population and state what the measure leaves out.'],
          'GDP per person is an average, not a typical person’s income. Unpaid work, environmental costs, leisure, and distribution require other measures.',
          [example('Nominal GDP rises 8% while prices rise 5%.', ['Nominal GDP includes quantity and price changes.', 'Approximate real growth = nominal growth - inflation.', '8% - 5% = 3%.'], 'Approximately 3% real GDP growth.'),
            example('GDP is $600 billion and population is 30 million.', ['Divide total GDP by population.', '$600 billion ÷ 30 million = $20,000.', 'This is an average output measure per person, not each person’s income.'], '$20,000 GDP per person.')],
          [q('Which is included in GDP?', ['A used bicycle resold between households', 'A newly produced haircut service', 'Unpaid cooking at home', 'A financial asset transfer'], 1, 'A newly provided final service produced during the period is counted. Resales, unpaid household production, and asset transfers are not current production in this basic accounting measure.'),
            q('Why use real GDP for growth comparisons?', ['It removes population', 'It adjusts for price-level changes', 'It measures happiness', 'It includes only exports'], 1, 'Real GDP adjusts for changes in prices, helping distinguish changes in output from inflation.'),
            q('GDP per person tells us:', ['How income is distributed exactly', 'Average output per person', 'Every household’s wealth', 'Environmental quality'], 1, 'GDP per person divides output by population. It is an average and does not reveal distribution or quality of life by itself.')],
          { vocabulary: [{ term: 'GDP', definition: 'Market value of final production within a country during a period.' }, { term: 'Nominal GDP', definition: 'GDP measured using current-period prices.' }, { term: 'Real GDP', definition: 'GDP adjusted for price-level changes to compare output over time.' }], cheatSheet: ['Approx. real growth = nominal growth - inflation', 'GDP per person = GDP / population', 'GDP is not a full measure of well-being'] }),
        spec('inflation-and-cpi', 'Inflation, CPI, and Purchasing Power',
          'Inflation is a sustained increase in the general price level. The Consumer Price Index (CPI) tracks the cost of a representative basket over time; the inflation rate is the percentage change in the index.',
          'If the same grocery basket costs more this year than last, each dollar buys a smaller share of that basket.',
          ['Read CPI for the earlier and later periods.', 'Compute the change: later CPI minus earlier CPI.', 'Divide by earlier CPI and multiply by 100%.', 'Interpret the result as an average basket-price change, not identical changes for every household.'],
          'Inflation changes purchasing power. A wage increase below inflation can mean real purchasing power falls, even when the dollar wage rises.',
          [example('CPI rises from 150 to 156.', ['Change in CPI = 156 - 150 = 6.', 'Percentage change = 6 ÷ 150 × 100%.', '6 ÷ 150 = 0.04, or 4%.'], 'Inflation is 4% over the measured period.'),
            example('A wage rises 3% while inflation is 5%.', ['Approximate real wage growth = nominal wage growth - inflation.', '3% - 5% = -2%.', 'The worker’s purchasing power falls by about 2%.'], 'Approximately -2% real wage growth.')],
          [q('CPI rises from 200 to 210. What is the inflation rate?', ['2%', '5%', '10%', '105%'], 1, 'Percentage change = (210 - 200) / 200 × 100% = 5%.'),
            q('If prices rise 4% and your nominal wage rises 2%, your real purchasing power approximately:', ['Rises 2%', 'Falls 2%', 'Does not change', 'Falls 6%'], 1, 'Approximate real wage change is 2% - 4% = -2%, so purchasing power falls.'),
            q('CPI most directly tracks:', ['Every price in the economy', 'A representative consumer basket over time', 'Stock market returns', 'Unemployment'], 1, 'CPI measures the change in cost of a representative basket. Individual households may experience different price changes.')],
          { vocabulary: [{ term: 'Inflation', definition: 'A sustained rise in the general price level.' }, { term: 'CPI', definition: 'An index tracking the cost of a representative basket of consumer goods and services.' }, { term: 'Purchasing power', definition: 'The amount of goods and services a unit of money can buy.' }], cheatSheet: ['Inflation rate = (new CPI - old CPI) / old CPI × 100%', 'Approx. real change = nominal change - inflation', 'An index is not every household’s exact experience'] })
      ]}
    ]
  });

  const computerScience = createCourse({
    id: 'cs11', grade: '11', area: 'Computer Science & Tech', title: 'Computer Science 11: Programming Foundations', code: 'CS 11',
    textbook: 'StudyBC original notes; examples use language-neutral pseudocode.',
    summary: 'Learn how algorithms represent solutions, how programs control data, and how to reason about correctness.',
    bigIdeas: ['Algorithms turn problems into explicit steps.', 'Programs manipulate representations of information.', 'Testing and iteration improve reliability.'],
    prerequisites: ['Following ordered instructions', 'Basic arithmetic', 'Curiosity about how software behaves'],
    leadsTo: ['Computer Programming 12', 'AP Computer Science', 'Software development'],
    units: [
      { name: 'Algorithms & Data', summary: 'Algorithms, variables, types, and input/output.', hours: 5, lessons: [
        spec('algorithm-thinking', 'Algorithms and Decomposition',
          'An algorithm is a finite, ordered set of unambiguous instructions that solves a problem. Decomposition makes a difficult task easier by splitting it into smaller tasks with clear inputs and outputs.',
          'A recipe is an algorithm: ingredients are inputs, ordered steps transform them, and a finished dish is the output.',
          ['State the problem and expected output.', 'Break it into smaller subproblems.', 'Write steps precisely enough that another person could follow them.', 'Test the steps with a typical case and an edge case.'],
          'A solution that works for one example may still fail generally. Trace the algorithm with different inputs, including empty, smallest, or unusually large cases.',
          [example('Plan an algorithm to find the larger of two numbers.', ['Read values a and b.', 'If a > b, output a.', 'Otherwise, output b.', 'Test with a = 4, b = 9: output 9.'], 'The algorithm returns the greater value; equal inputs return that shared value.'),
            example('Find the total of three prices.', ['Start total at 0.', 'Add the first price.', 'Add the second price.', 'Add the third price and display total.'], 'total = p1 + p2 + p3.')],
          [q('Which quality makes an algorithm unambiguous?', ['Different readers can interpret steps differently', 'Each step has a clear meaning', 'It never ends', 'It only works for one input'], 1, 'An algorithm needs precise steps so the same input and procedure lead to a predictable result.'),
            q('What is decomposition?', ['Combining unrelated outputs', 'Breaking a problem into smaller manageable parts', 'Removing all input', 'Writing code without a plan'], 1, 'Decomposition divides a larger problem into smaller subproblems that can be designed and tested.'),
            q('Why test an edge case?', ['To avoid checking normal cases', 'To reveal failures at boundary or unusual inputs', 'To make the program slower', 'To replace the algorithm'], 1, 'Boundary cases such as empty input or the smallest allowed value often expose assumptions that ordinary examples miss.')],
          { vocabulary: [{ term: 'Algorithm', definition: 'A finite sequence of clear steps for solving a problem.' }, { term: 'Decomposition', definition: 'Breaking a large problem into smaller subproblems.' }, { term: 'Edge case', definition: 'An unusual or boundary input that may expose a failure.' }], cheatSheet: ['Define input and output', 'Break the task into steps', 'Trace typical and boundary cases'] }),
        spec('variables-and-types', 'Variables, Values, and Data Types',
          'A variable is a named place in a program’s model of memory. It refers to a value; a data type describes what kind of value it is and which operations make sense.',
          'A labeled box can hold a number, a word, or a yes/no value. The label helps a program refer to the current contents.',
          ['Choose a meaningful variable name.', 'Assign a value using the language’s syntax.', 'Use a type that matches the intended information.', 'Update values deliberately and check how the update affects later steps.'],
          'Text concatenation is not numeric addition: adding the strings "2" and "3" may produce "23". Type conversion should be explicit when a calculation requires numbers.',
          [example('Track the number of books read.', ['Create a variable named booksRead.', 'Initialize it to 0.', 'After one completed book, add 1.', 'The updated value is 1.'], 'booksRead = 1.'),
            example('A user enters age as text "16".', ['The input is a string, even though its characters are digits.', 'Convert it to an integer before numeric comparison.', 'Compare the resulting number with a threshold.'], 'Use an integer value for numeric age calculations.')],
          [q('A variable is best described as:', ['A fixed output screen', 'A named reference to a value', 'A type of loop', 'A computer processor'], 1, 'A variable is a name used to store or refer to a value that the program can read and often update.'),
            q('What can happen when "2" and "3" are treated as strings?', ['They may concatenate to "23"', 'They always add to 5', 'The program converts them to dates', 'They become booleans'], 0, 'String concatenation joins text, so "2" + "3" can produce "23". Convert to numeric values when arithmetic is intended.'),
            q('Why use descriptive variable names?', ['They help communicate what values represent', 'They make all programs faster', 'They remove the need for tests', 'They force values to be constant'], 0, 'Clear names make code easier to understand, debug, and maintain.')],
          { vocabulary: [{ term: 'Variable', definition: 'A name referring to a value used by a program.' }, { term: 'Data type', definition: 'A category of values and the operations defined for them.' }, { term: 'Assignment', definition: 'An operation that gives a variable a value.' }], cheatSheet: ['Name values by their meaning', 'Distinguish text from numbers', 'Convert types intentionally'] })
      ]},
      { name: 'Control Flow & Quality', summary: 'Conditions, repetition, debugging, and testing.', hours: 6, lessons: [
        spec('conditions-and-logic', 'Conditions and Boolean Logic',
          'A condition is an expression that evaluates to true or false. Programs use conditions to choose which action to take, allowing one algorithm to handle different situations.',
          'A door sensor uses a condition: if the door is open, sound an alert; otherwise, remain quiet.',
          ['Translate the rule into a yes/no question.', 'Use a comparison such as equal to, greater than, or less than.', 'Combine conditions with AND, OR, or NOT only when needed.', 'Trace both true and false cases.'],
          'AND is true only when both parts are true; OR is true when at least one part is true. Parentheses make complex rules clearer and reduce logic mistakes.',
          [example('Check whether a score passes at 50 or higher.', ['Ask whether score >= 50.', 'If true, report pass.', 'If false, report not yet passing.', 'At score 50, the condition is true.'], 'score >= 50.'),
            example('A member gets a discount if age is under 18 OR over 64.', ['Evaluate age < 18.', 'Evaluate age > 64.', 'Combine with OR.', 'At age 40, both are false, so there is no age-based discount.'], '(age < 18) OR (age > 64).')],
          [q('When is A AND B true?', ['When either is true', 'Only when both are true', 'Only when both are false', 'Always'], 1, 'AND requires both component conditions to be true.'),
            q('For score >= 50, what happens at score 50?', ['The condition is false', 'The condition is true', 'The value is undefined', 'It depends on OR'], 1, 'The >= operator includes equality, so 50 is at least 50 and passes the condition.'),
            q('Why test both branches of an if/else?', ['One branch may contain a logic error', 'It changes the data type', 'It removes the condition', 'Only the else branch runs'], 0, 'The true and false paths are separate behaviors; each should be checked with an input that reaches it.')],
          { vocabulary: [{ term: 'Boolean', definition: 'A value with one of two states: true or false.' }, { term: 'Condition', definition: 'An expression evaluated as true or false.' }, { term: 'Branch', definition: 'A possible path selected by a condition.' }], cheatSheet: ['AND: both true', 'OR: at least one true', 'Test true and false paths'] }),
        spec('loops-and-testing', 'Loops, Iteration, and Testing',
          'A loop repeats a set of instructions. A correct loop has a clear stopping condition; otherwise, it may repeat forever. Testing compares observed behavior with expected behavior.',
          'A loop is like dealing one card to each player until the deck is empty: the stopping condition prevents dealing forever.',
          ['Identify the work to repeat.', 'Set an initial state before the loop.', 'Write a condition that becomes false when the task is done.', 'Update the state on each repetition and test that the loop terminates.'],
          'A counter-controlled loop is useful when the repetition count is known. A condition-controlled loop is useful when the stopping point depends on input or state.',
          [example('Add integers from 1 through 4.', ['Set total = 0 and n = 1.', 'While n <= 4, add n to total.', 'Increase n by 1 each time.', 'The additions are 1 + 2 + 3 + 4 = 10.'], 'total = 10; the loop stops when n becomes 5.'),
            example('A test checks a function that doubles a value.', ['Choose input 3 and expect 6.', 'Run the function and observe its output.', 'Compare actual with expected.', 'Add an edge case such as input 0.'], 'A test passes when actual output equals expected output.')],
          [q('What is necessary for a loop to stop?', ['A stopping condition that eventually becomes false', 'A larger screen', 'A variable with no updates', 'An output statement only'], 0, 'A loop must have a terminating condition, and its state must change so the condition can eventually become false.'),
            q('What does a unit test usually check?', ['One small component or behavior', 'The entire internet', 'Only program colors', 'Whether the computer is plugged in'], 0, 'A unit test checks a focused piece of behavior against an expected result.'),
            q('If a loop condition never changes and remains true, the loop may:', ['Terminate normally', 'Run indefinitely', 'Convert to a function', 'Delete its input'], 1, 'If nothing updates the values controlling a true condition, the loop may never terminate.')],
          { vocabulary: [{ term: 'Iteration', definition: 'One repetition of a loop’s instructions.' }, { term: 'Termination condition', definition: 'A condition that determines when a loop stops.' }, { term: 'Test case', definition: 'An input with an expected output used to check behavior.' }], cheatSheet: ['Initialize → test → do work → update', 'Check that the loop can stop', 'Compare actual output with expected output'] })
      ]}
    ]
  });

  const calculus = createCourse({
    id: 'apcalc', grade: 'AP', area: 'Mathematics', title: 'AP Calculus AB: Limits & Derivatives', code: 'AP CALC AB',
    textbook: 'StudyBC original notes; verify scope and notation against the current AP Calculus course framework.',
    summary: 'Develop limits, continuity, and derivative reasoning from graphical, numerical, and algebraic viewpoints.',
    bigIdeas: ['Limits describe local behavior near a point.', 'Derivatives measure instantaneous change.', 'Representations connect a function’s formula, graph, and context.'],
    prerequisites: ['Function notation', 'Algebraic manipulation', 'Reading graphs and average rates of change'],
    leadsTo: ['AP Calculus AB integration', 'AP Calculus BC', 'University calculus'],
    units: [
      { name: 'Limits & Continuity', summary: 'Approaching values, one-sided limits, and continuity.', hours: 6, lessons: [
        spec('limit-intuition', 'Limits from Tables and Graphs',
          'A limit asks what value f(x) approaches as x approaches a target. It concerns nearby behavior, not necessarily the function’s value at the target itself.',
          'Walking toward a doorway is like approaching x = a: where you are heading can be clear even if the doorway’s own label is different.',
          ['Identify the target x-value.', 'Inspect values for x slightly less than the target.', 'Inspect values for x slightly greater than the target.', 'If both sides approach the same number L, the two-sided limit is L.'],
          'A hole or jump at the target does not by itself determine the limit. Compare the left- and right-hand behavior; if they differ, the two-sided limit does not exist.',
          [example('For f(x) = (x² - 1)/(x - 1), find the limit as x approaches 1.', ['For x ≠ 1, factor x² - 1 = (x - 1)(x + 1).', 'Cancel the common factor for nearby x: f(x) = x + 1.', 'As x approaches 1, x + 1 approaches 2.'], 'The limit is 2, even though the original function is undefined at x = 1.'),
            example('A graph approaches y = 4 from the left and y = 4 from the right.', ['Record the left-hand limit as 4.', 'Record the right-hand limit as 4.', 'The two sides agree.'], 'The two-sided limit is 4.')],
          [q('If the left- and right-hand limits both equal 3, the two-sided limit is:', ['0', '3', 'Undefined in every case', '6'], 1, 'A two-sided limit exists and equals the shared one-sided value when both sides approach 3.'),
            q('Can a limit exist if f(a) is undefined?', ['No, never', 'Yes; nearby values can approach a number', 'Only if a = 0', 'Only for polynomials'], 1, 'A limit describes nearby behavior. The function can have a hole at a while values on both sides approach the same number.'),
            q('If the left-hand limit is 2 and the right-hand limit is 5, the two-sided limit:', ['Is 2', 'Is 5', 'Does not exist', 'Is 7'], 2, 'A two-sided limit requires both sides to approach the same value. Here they differ.')],
          { vocabulary: [{ term: 'Limit', definition: 'The value a function approaches as its input approaches a target.' }, { term: 'One-sided limit', definition: 'The value approached from only the left or only the right.' }, { term: 'Indeterminate form', definition: 'A form such as 0/0 that requires further analysis rather than direct evaluation.' }], cheatSheet: ['Check left and right separately', 'A limit is not necessarily f(a)', 'Different one-sided limits → no two-sided limit'] }),
        spec('continuity', 'Continuity and the Intermediate Value Theorem',
          'A function is continuous at x = a when its value is defined there, the limit exists, and the limit equals the function value. Intuitively, there is no break at that point.',
          'A continuous pencil stroke can be drawn without lifting the pencil; a graph with a hole or jump breaks that picture.',
          ['Check that f(a) is defined.', 'Check that the two-sided limit as x approaches a exists.', 'Check that the limit equals f(a).', 'For a closed interval, use the Intermediate Value Theorem only when continuity on the entire interval is established.'],
          'The Intermediate Value Theorem guarantees that a continuous function takes every value between f(a) and f(b) somewhere between a and b. It guarantees existence, not an exact location.',
          [example('Let f(x) = x². Is it continuous at x = 2?', ['f(2) = 4 is defined.', 'The limit as x approaches 2 is 4.', 'The limit equals f(2).'], 'Yes, f is continuous at x = 2.'),
            example('A continuous function has f(1) = -2 and f(4) = 7.', ['Zero lies between -2 and 7.', 'The function is continuous on [1, 4].', 'By the Intermediate Value Theorem, some input between 1 and 4 has output 0.'], 'There is at least one root in (1, 4).')],
          [q('Which condition is required for continuity at x = a?', ['f(a) is defined and equals the limit', 'The function is positive', 'The derivative is zero', 'The graph is a straight line'], 0, 'Continuity requires a defined function value, an existing limit, and equality between the limit and f(a).'),
            q('What does the Intermediate Value Theorem guarantee?', ['The exact root location', 'A continuous function takes intermediate values on an interval', 'Every function has a maximum', 'The derivative is constant'], 1, 'It guarantees existence of an input producing any value between endpoint outputs, assuming continuity.'),
            q('A removable hole at x = 2 can be fixed by:', ['Changing the value f(2) to equal the limit', 'Changing all other outputs', 'Taking a derivative', 'Making the function discontinuous elsewhere'], 0, 'If the limit exists, defining the missing function value to equal that limit removes the hole.')],
          { vocabulary: [{ term: 'Continuous at a', definition: 'f(a) is defined, the limit at a exists, and the two values are equal.' }, { term: 'Removable discontinuity', definition: 'A hole that can be removed by redefining the function at one point.' }, { term: 'Intermediate Value Theorem', definition: 'A continuous function takes every value between its endpoint values.' }], cheatSheet: ['Continuity: defined + limit exists + equal', 'IVT requires continuity on the whole interval', 'IVT proves existence, not location'] })
      ]},
      { name: 'Derivative Foundations', summary: 'Average and instantaneous rates, derivative definition, and basic rules.', hours: 7, lessons: [
        spec('derivative-as-rate', 'Derivative as Instantaneous Rate of Change',
          'The derivative at a point is the limit of average rates of change over smaller intervals. Geometrically it is the slope of the tangent line; in context it is an instantaneous rate with units.',
          'Average speed over a trip summarizes the whole trip. A speedometer aims to show the rate at this instant.',
          ['Compute average rate over an interval: change in output divided by change in input.', 'Shrink the interval toward the point of interest.', 'Take the limit if the rates approach a finite value.', 'Attach units, such as metres per second when position is measured in metres and time in seconds.'],
          'The derivative function f′(x) gives a slope at each input. A positive derivative means the function is locally increasing; a negative derivative means locally decreasing.',
          [example('Find the derivative of f(x) = x² at x = 3 from the difference quotient.', ['Compute [f(3+h) - f(3)] / h.', '[(3+h)² - 9] / h = (6h + h²) / h.', 'For h ≠ 0, this is 6 + h.', 'As h approaches 0, the limit is 6.'], 'f′(3) = 6.'),
            example('Position is s(t) = t² metres. Find instantaneous velocity at t = 2 s.', ['The derivative is s′(t) = 2t.', 'Evaluate at t = 2: 2 × 2 = 4.', 'Position is in metres and time in seconds.'], 'Velocity is 4 m/s at t = 2 s.')],
          [q('The derivative at a point is the limit of:', ['Average rates over intervals shrinking to that point', 'Function values added together', 'The area under every curve', 'The y-intercept'], 0, 'The derivative is defined as the limit of difference-quotient average slopes as the interval width approaches zero.'),
            q('If position is measured in metres and time in seconds, velocity units are:', ['m/s', 's/m', 'm·s', 'm²'], 0, 'Velocity is change in position divided by change in time, giving metres per second.'),
            q('A positive derivative at x = a indicates the function is locally:', ['Decreasing', 'Increasing', 'Constant everywhere', 'Undefined'], 1, 'A positive tangent slope means the function rises locally as x increases.')],
          { vocabulary: [{ term: 'Derivative', definition: 'The limit of average rate of change as the interval shrinks to zero.' }, { term: 'Difference quotient', definition: '[f(a+h) - f(a)] / h, an average rate over a small interval.' }, { term: 'Tangent line', definition: 'The line representing a curve’s instantaneous direction at a point.' }], cheatSheet: ['f′(a) = lim h→0 [f(a+h)-f(a)]/h', 'Derivative = tangent slope = instantaneous rate', 'Include units from output/input'] }),
        spec('power-rule', 'The Power Rule and Tangent Lines',
          'For a power function xⁿ, the power rule says its derivative is n·xⁿ⁻¹. The rule follows from the limit definition and lets us differentiate polynomial terms efficiently.',
          'Differentiation lowers the exponent by one and brings the old exponent down as a coefficient.',
          ['Rewrite constants as terms with exponent zero when useful.', 'For each term c·xⁿ, write c·n·xⁿ⁻¹.', 'Differentiate each polynomial term separately.', 'For a tangent line at x = a, use slope f′(a) and point (a, f(a)) in point-slope form.'],
          'The derivative describes local change, not total accumulated change. Always evaluate the derivative at the specified input when a numerical tangent slope is required.',
          [example('Differentiate f(x) = 3x⁴ - 2x + 7.', ['Derivative of 3x⁴ is 12x³.', 'Derivative of -2x is -2.', 'Derivative of constant 7 is 0.'], 'f′(x) = 12x³ - 2.'),
            example('Find the tangent line to f(x) = x² at x = 1.', ['f(1) = 1, so the point is (1, 1).', 'f′(x) = 2x, so the slope at 1 is 2.', 'Use y - 1 = 2(x - 1).'], 'y = 2x - 1.')],
          [q('What is the derivative of 5x³?', ['5x²', '15x²', '15x³', '3x²'], 1, 'Apply the power rule: 5 × 3 × x² = 15x².'),
            q('What is the derivative of a constant such as 9?', ['9', '1', '0', 'x'], 2, 'A constant does not change as x changes, so its derivative is zero.'),
            q('For a tangent line at x = a, what is its slope?', ['f(a)', 'f′(a)', 'a + f(a)', 'The y-intercept'], 1, 'The derivative evaluated at a gives the instantaneous slope at that point.')],
          { vocabulary: [{ term: 'Power rule', definition: 'd/dx(xⁿ) = n·xⁿ⁻¹.' }, { term: 'Tangent line', definition: 'A line with the same instantaneous slope as the curve at a point.' }, { term: 'Point-slope form', definition: 'y - y₁ = m(x - x₁), a line through (x₁, y₁) with slope m.' }], cheatSheet: ['d/dx(c xⁿ) = c n xⁿ⁻¹', 'Derivative of a constant = 0', 'Tangent: y - f(a) = f′(a)(x - a)'] })
      ]}
    ]
  });

  window.STUDYBC_DATA.courses.push(physics, economics, computerScience, calculus);
  const math = window.STUDYBC_DATA.courses.find(course => course.id === 'fm10');
  const chemistry = window.STUDYBC_DATA.courses.find(course => course.id === 'chem11');
  const social = window.STUDYBC_DATA.courses.find(course => course.id === 'social10');

  math.status = 'In progress';
  math.lessons.push(
    lesson('fm10', 'Quadratics', spec('quadratic-roots', 'Quadratic Equations and Their Roots',
      'A quadratic equation has a squared variable as its highest power. Its solutions, or roots, are the input values where the corresponding graph crosses or touches the x-axis.',
      'A ball’s height over time can often be approximated by a parabola; solving for a root finds when it reaches ground level.',
      ['Write the equation in the form ax² + bx + c = 0.', 'Try factoring when the coefficients permit it.', 'Set each factor equal to zero and solve.', 'Substitute each result into the original equation to check.'],
      'A quadratic can have two, one, or no real roots. The discriminant b² - 4ac helps classify roots, while graphing links roots to x-intercepts.',
      [example('Solve x² + 5x + 6 = 0.', ['Find numbers whose product is 6 and sum is 5: 2 and 3.', 'Factor: (x + 2)(x + 3) = 0.', 'Set each factor to zero: x = -2 or x = -3.'], 'x = -2, -3.'),
        example('Solve x² - 9 = 0.', ['Recognize a difference of squares: (x - 3)(x + 3) = 0.', 'Set each factor to zero.', 'The solutions are 3 and -3.'], 'x = ±3.')],
      [q('What are the roots of x² + 5x + 6 = 0?', ['1 and 6', '-2 and -3', '2 and 3', '-1 and -6'], 1, 'Factor as (x + 2)(x + 3) = 0, giving x = -2 or x = -3.'),
        q('The roots of a quadratic are where its graph crosses or touches the:', ['y-axis', 'x-axis', 'vertex only', 'line y = 1'], 1, 'Roots are solutions where y = 0, so they are x-intercepts.'),
        q('How many real roots does x² + 1 = 0 have?', ['Two', 'One', 'Zero', 'Four'], 2, 'For real x, x² is nonnegative, so it cannot equal -1. There are no real roots.')],
      { vocabulary: [{ term: 'Quadratic', definition: 'A degree-two polynomial equation or function.' }, { term: 'Root', definition: 'An input that makes a function equal zero.' }, { term: 'Discriminant', definition: 'The expression b² - 4ac that helps classify quadratic roots.' }], cheatSheet: ['Set the equation equal to zero', 'Factor, then use zero-product property', 'Check roots in the original equation'] })),
    lesson('fm10', 'Trigonometry', spec('right-triangle-trig', 'Right-Triangle Trigonometry',
      'A right triangle has one 90° angle. Relative to a chosen acute angle, its sides are opposite, adjacent, and hypotenuse. Sine, cosine, and tangent compare pairs of these side lengths.',
      'A ladder against a wall forms a right triangle. Trigonometric ratios connect the ladder’s angle to the height it reaches.',
      ['Choose the reference acute angle.', 'Label opposite, adjacent, and hypotenuse relative to that angle.', 'Choose sine, cosine, or tangent based on the known and unknown sides.', 'Substitute values, solve, and check that the answer has sensible units and size.'],
      'SOH CAH TOA is a memory aid: sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent. Use inverse ratios when solving for an angle.',
      [example('A right triangle has opposite side 3 and hypotenuse 5. Find sin θ.', ['Use sine because opposite and hypotenuse are involved.', 'sin θ = 3/5.', '3 ÷ 5 = 0.6.'], 'sin θ = 0.6.'),
        example('An angle has opposite side 6 and adjacent side 8. Find tan θ.', ['Use tangent: opposite ÷ adjacent.', 'tan θ = 6/8.', 'Simplify to 3/4.'], 'tan θ = 0.75.')],
      [q('Which ratio is opposite divided by hypotenuse?', ['cosine', 'tangent', 'sine', 'cotangent'], 2, 'SOH: sine equals opposite over hypotenuse.'),
        q('For an angle, opposite = 3 and adjacent = 4. What is tan θ?', ['0.75', '1.33', '3.5', '7'], 0, 'Tangent is opposite divided by adjacent: 3/4 = 0.75.'),
        q('Which side is always opposite the 90° angle?', ['Adjacent', 'Hypotenuse', 'Opposite to every acute angle', 'Base'], 1, 'The hypotenuse is the longest side and always lies opposite the right angle.')],
      { vocabulary: [{ term: 'Hypotenuse', definition: 'The longest side of a right triangle, opposite the right angle.' }, { term: 'Sine', definition: 'For an acute angle, opposite side divided by hypotenuse.' }, { term: 'Tangent', definition: 'For an acute angle, opposite side divided by adjacent side.' }], cheatSheet: ['SOH: sin = opposite / hypotenuse', 'CAH: cos = adjacent / hypotenuse', 'TOA: tan = opposite / adjacent'] }))
  );
  chemistry.status = 'In progress';
  chemistry.lessons.push(
    lesson('chem11', 'Bonding', spec('ionic-and-covalent-bonds', 'Ionic and Covalent Bonding',
      'Atoms bond when their interactions create a more stable arrangement. Ionic bonding involves attraction between oppositely charged ions; covalent bonding involves atoms sharing electron pairs.',
      'Ionic bonding is like attraction between opposite charges; covalent bonding is like two people sharing a pair of resources.',
      ['Identify whether the elements are metals or non-metals.', 'For ionic compounds, determine likely ion charges and balance total charge to zero.', 'For covalent molecules, count shared pairs and represent them with a Lewis structure.', 'Use the bonding model to predict properties, while remembering that real substances have broader structure.'],
      'Ionic compounds often form crystal lattices and conduct electricity when molten or dissolved because ions can move. Many covalent substances are molecular and do not conduct as pure substances.',
      [example('Determine the formula from Mg²⁺ and Cl⁻.', ['One magnesium ion has charge +2.', 'Each chloride ion has charge -1.', 'Two chloride ions balance one magnesium ion.'], 'MgCl₂.'),
        example('Describe the bond in H₂.', ['Each hydrogen atom contributes one electron.', 'The two atoms share a pair.', 'The shared pair is a single covalent bond.'], 'One shared electron pair; a single covalent bond.')],
      [q('What is the net charge of a neutral ionic compound?', ['Positive', 'Negative', 'Zero', 'It depends on color'], 2, 'Ions combine in ratios that balance total positive and negative charge to zero.'),
        q('Which description best matches a covalent bond?', ['Sharing electron pairs', 'Transferring protons', 'Sharing neutrons', 'Attraction between metal sheets only'], 0, 'Covalent bonds form when atoms share electron pairs.'),
        q('What is the formula from Al³⁺ and O²⁻?', ['AlO', 'Al₂O₃', 'Al₃O₂', 'AlO₂'], 1, 'Two Al³⁺ ions total +6 and three O²⁻ ions total -6, producing a neutral Al₂O₃ formula.')],
      { vocabulary: [{ term: 'Ion', definition: 'An atom or group of atoms with a net electric charge.' }, { term: 'Ionic bond', definition: 'Electrostatic attraction between oppositely charged ions.' }, { term: 'Covalent bond', definition: 'A bond formed when atoms share electron pairs.' }], cheatSheet: ['Ionic formula: total charge = 0', 'Covalent bond: shared electron pair', 'Metal + non-metal often forms ionic compounds'] })),
    lesson('chem11', 'Stoichiometry', spec('balancing-equations', 'Balancing Chemical Equations',
      'A chemical equation represents a reaction. Atoms are rearranged, not created or destroyed, so each element must have the same number of atoms on both sides.',
      'A reaction equation is like an inventory before and after rearranging building blocks: every type of block must still be accounted for.',
      ['Write correct reactant and product formulas first.', 'Count each element on both sides.', 'Change coefficients in front of formulas, never subscripts inside them.', 'Reduce to the smallest whole-number coefficients and recount every atom.'],
      'Balanced coefficients are mole ratios used in stoichiometry. A balanced equation does not say the reaction is fast, complete, or safe; it expresses conservation and relative amounts.',
      [example('Balance H₂ + O₂ → H₂O.', ['Put 2 before H₂O to make 2 oxygen atoms on the right.', 'Now the right has 4 hydrogen atoms.', 'Put 2 before H₂.', 'Recount: H = 4 on both sides; O = 2 on both sides.'], '2H₂ + O₂ → 2H₂O.'),
        example('Balance N₂ + H₂ → NH₃.', ['Put 2 before NH₃ to match 2 nitrogen atoms.', 'The products now have 6 hydrogen atoms.', 'Put 3 before H₂ to make 6 hydrogen atoms on the left.'], 'N₂ + 3H₂ → 2NH₃.')],
      [q('When balancing equations, what may be changed?', ['Subscripts in formulas', 'Element symbols', 'Coefficients before formulas', 'The identity of a reactant'], 2, 'Coefficients change the number of particles while preserving compound identity. Changing a subscript would change the substance.'),
        q('What is the balanced form of H₂ + O₂ → H₂O?', ['H₂ + O₂ → H₂O', '2H₂ + O₂ → 2H₂O', 'H₂ + 2O₂ → H₂O', '2H₂ + 2O₂ → H₂O'], 1, 'The coefficients 2, 1, and 2 give four H atoms and two O atoms on each side.'),
        q('Why must atoms balance in a chemical equation?', ['Atoms are conserved in ordinary chemical reactions', 'Products have no atoms', 'Coefficients are optional', 'Mass disappears'], 0, 'Chemical reactions rearrange atoms; conservation of matter requires equal counts of each element on both sides.')],
      { vocabulary: [{ term: 'Coefficient', definition: 'A number placed before a formula to show relative amount.' }, { term: 'Subscript', definition: 'A small number in a formula showing atoms within one particle.' }, { term: 'Stoichiometry', definition: 'Quantitative relationships among substances in a balanced reaction.' }], cheatSheet: ['Change coefficients, never subscripts', 'Count each element on each side', 'Use smallest whole-number coefficients'] }))
  );
  social.status = 'In progress';
  social.lessons.push(
    lesson('social10', 'Canadian Identity', spec('reading-historical-sources', 'Reading Historical Sources and Perspective',
      'A historical source is evidence created in or about the past. Sources reflect a creator, purpose, audience, and context; they provide evidence but are not automatically complete or neutral.',
      'A photograph records a moment, but framing excludes what is outside the camera. Written sources also reveal some perspectives and omit others.',
      ['Identify who created the source and when.', 'Ask why it was created and for whom.', 'Separate direct evidence from your inference.', 'Compare with another source and note whose voices are missing.'],
      'Corroboration strengthens or complicates an interpretation. A source can be valuable even when biased, if its purpose and limits are considered.',
      [example('A wartime poster urges citizens to enlist.', ['Identify the creator and date.', 'Its purpose is persuasion and recruitment.', 'Its language reveals values and strategies, not necessarily the full range of public opinion.', 'Compare it with letters or recruitment records.'], 'Use it as evidence of messaging and ideals; corroborate claims about public response.'),
        example('Two newspapers describe the same protest differently.', ['Compare word choice and details.', 'Identify audiences, ownership, and political context.', 'Check dates and corroborate events with independent records.'], 'Treat the differences as evidence of perspective, then test factual claims.')],
      [q('What is corroboration?', ['Copying one source', 'Comparing evidence across sources', 'Ignoring context', 'Replacing a source with an opinion'], 1, 'Corroboration compares multiple sources to see where accounts agree, differ, or add context.'),
        q('A source’s bias means it is:', ['Always useless', 'Created from a particular perspective or purpose', 'Automatically false', 'A secondary source only'], 1, 'Perspective can shape a source without making every detail false. Assess its purpose, evidence, and limits.'),
        q('Which question helps establish context?', ['Who created this and when?', 'Is the paper old?', 'Can I ignore the audience?', 'Does it confirm my opinion?'], 0, 'Creator and date help locate a source in its historical context and identify possible purposes or limitations.')],
      { vocabulary: [{ term: 'Primary source', definition: 'Evidence created during or by participants in the period studied.' }, { term: 'Perspective', definition: 'A viewpoint shaped by a person’s position, experience, and context.' }, { term: 'Corroboration', definition: 'Checking claims by comparing independent evidence.' }], cheatSheet: ['Creator + date + purpose + audience', 'Distinguish evidence from inference', 'Corroborate and consider missing voices'] }))
  );

  window.STUDYBC_DATA.courses.push(
    createCourse({
      id: 'physics12', grade: '12', area: 'Sciences', title: 'Physics 12: Fields & Electricity', code: 'PHYS 12',
      textbook: 'StudyBC original notes; check current school laboratory and safety requirements.',
      summary: 'Extend mechanics into electric circuits, fields, and quantitative reasoning about energy transfer.',
      bigIdeas: ['Fields model interactions at a distance.', 'Electric circuits transfer energy through charge motion.', 'Mathematical models connect measurable quantities.'],
      prerequisites: ['Physics 11 force and energy concepts', 'Algebra', 'Metric unit conversions'],
      leadsTo: ['Engineering', 'University physics', 'Electrical trades'],
      units: [
        { name: 'Electric Circuits', summary: 'Charge, current, voltage, and resistance.', hours: 5, lessons: [
          spec('current-voltage-resistance', 'Current, Voltage, and Resistance',
            'Electric current is the rate of charge flow. Voltage is energy transferred per unit charge. Resistance describes how strongly a component opposes current in a circuit.',
            'A circuit analogy uses water flow: current resembles flow rate, voltage resembles pressure difference, and resistance resembles a constriction.',
            ['Identify the quantity being asked for and its unit.', 'Use Ohm’s law V = IR for an ohmic component.', 'Rearrange algebraically for the unknown.', 'Check that volts, amperes, and ohms are consistent.'],
            'The water analogy is a model, not a literal description of electrons. Components, temperature, and circuit arrangement affect whether a simple Ohm’s-law model applies.',
            [example('A 6 Ω resistor has 12 V across it.', ['Use I = V/R.', 'I = 12 V / 6 Ω.', 'The current is 2 A.'], '2 A.'),
              example('A 3 A current flows through 4 Ω.', ['Use V = IR.', 'V = 3 A × 4 Ω.', 'The voltage is 12 V.'], '12 V.')],
            [q('A 10 Ω resistor has 20 V across it. What current flows?', ['0.5 A', '2 A', '10 A', '200 A'], 1, 'Ohm’s law gives I = V/R = 20/10 = 2 A.'),
              q('Voltage is energy transferred per unit:', ['Mass', 'Charge', 'Time', 'Resistance'], 1, 'Voltage is measured in joules per coulomb: energy transfer per unit charge.'),
              q('What is the resistance if V = 9 V and I = 3 A?', ['3 Ω', '6 Ω', '12 Ω', '27 Ω'], 0, 'R = V/I = 9/3 = 3 Ω.')],
            { vocabulary: [{ term: 'Current', definition: 'Charge flow per unit time, measured in amperes.' }, { term: 'Voltage', definition: 'Energy transferred per unit charge, measured in volts.' }, { term: 'Resistance', definition: 'Opposition to current, measured in ohms.' }], cheatSheet: ['V = IR', 'I = charge / time', 'Check units before substituting'] }),
          spec('series-parallel-circuits', 'Series and Parallel Circuits',
            'In a series circuit, components share one path and the same current. In a parallel circuit, branches share the same voltage while current divides among paths.',
            'A single-lane road is like a series path; a road with multiple branches resembles a parallel circuit.',
            ['Draw the circuit and mark nodes and branches.', 'For series components, add resistances and keep current the same.', 'For parallel branches, keep voltage the same and add branch currents.', 'Apply conservation of charge at junctions and verify totals.'],
            'Adding a parallel branch reduces equivalent resistance, so a fixed-voltage source supplies more total current. Real batteries have limits and internal resistance.',
            [example('Two resistors of 2 Ω and 5 Ω are in series.', ['Series resistances add.', 'Rtotal = 2 + 5.', 'Equivalent resistance is 7 Ω.'], '7 Ω.'),
              example('Two 6 Ω resistors are in parallel.', ['Use 1/Rtotal = 1/6 + 1/6.', '1/Rtotal = 2/6 = 1/3.', 'Invert to find total resistance.'], '3 Ω.')],
            [q('In a series circuit, the same quantity flows through each component:', ['Voltage', 'Current', 'Resistance', 'Power'], 1, 'A series circuit has a single path, so charge flow per unit time (current) is the same at each point.'),
              q('Two 4 Ω resistors in series have equivalent resistance:', ['2 Ω', '4 Ω', '8 Ω', '16 Ω'], 2, 'Series resistances add: 4 + 4 = 8 Ω.'),
              q('In parallel branches, each branch has the same:', ['Current always', 'Voltage', 'Resistance', 'Power'], 1, 'Parallel components connect across the same two nodes, so their potential difference is the same.')],
            { vocabulary: [{ term: 'Series circuit', definition: 'A circuit with components on one path.' }, { term: 'Parallel circuit', definition: 'A circuit with multiple branches connected across common nodes.' }, { term: 'Equivalent resistance', definition: 'The single resistance that has the same overall circuit effect.' }], cheatSheet: ['Series: Rtotal = R₁ + R₂ + …', 'Parallel: 1/Rtotal = 1/R₁ + 1/R₂ + …', 'Parallel branches share voltage'] })
        ]},
        { name: 'Fields & Interactions', summary: 'Electric fields, force, and potential energy.', hours: 5, lessons: [
          spec('electric-fields', 'Electric Fields and Charge',
            'An electric field describes the force that a positive test charge would experience at each location. Field direction is defined as the direction of force on a positive test charge.',
            'A map of wind arrows shows how air would push a leaf at each location; a field diagram similarly maps how a charge would be pushed.',
            ['Identify the source charge and the test charge.', 'Use attraction for opposite signs and repulsion for like signs.', 'Draw field arrows away from positive sources and toward negative sources.', 'Use symmetry and distance carefully when comparing field strength.'],
            'Field lines are a visualization, not physical strings. Closer line spacing represents stronger field in the drawing; lines do not cross because the field has one direction at a point.',
            [example('What is the direction of force on a positive test charge near a positive source?', ['Like charges repel.', 'The test charge is pushed away from the source.', 'The electric field points in the force direction for a positive test charge.'], 'Away from the positive source.'),
              example('What is the field direction near a negative source?', ['A positive test charge is attracted toward negative charge.', 'Field direction follows the force on that positive test charge.'], 'Toward the negative source.')],
            [q('Electric field direction is defined using force on a:', ['Negative test charge', 'Positive test charge', 'Neutral atom', 'Magnet'], 1, 'By convention, field direction is the force direction on a positive test charge.'),
              q('Field lines around an isolated positive charge point:', ['Toward it', 'Away from it', 'In circles', 'Nowhere'], 1, 'A positive test charge is repelled by a positive source, so field arrows point outward.'),
              q('Why can electric field lines not cross?', ['Fields are always zero', 'The field has one direction at any point', 'Charges cannot move', 'Lines are physical objects'], 1, 'Crossing would imply two different field directions at the same point, which is not possible.')],
            { vocabulary: [{ term: 'Electric charge', definition: 'A property that produces electric interactions; charge can be positive or negative.' }, { term: 'Electric field', definition: 'Force per unit positive test charge at a location.' }, { term: 'Test charge', definition: 'A small positive charge used by convention to define field direction.' }], cheatSheet: ['Like charges repel; unlike charges attract', 'Field direction = force on positive test charge', 'Away from +, toward -'] }),
          spec('electric-potential', 'Electric Potential and Energy',
            'Electric potential energy depends on the configuration of charges. Electric potential is potential energy per unit charge, so voltage describes an energy difference per charge.',
            'A height map gives gravitational potential per mass; voltage gives electric potential energy per charge.',
            ['Identify the charge and the potential difference.', 'Use ΔU = qΔV for the change in electric potential energy.', 'Keep the sign of charge and potential change.', 'Interpret a negative result as a decrease in the chosen energy convention.'],
            'A battery supplies energy to charges through chemical processes. Circuit elements transfer that energy to light, heat, motion, or other forms.',
            [example('A 2 C charge moves across a 3 V potential difference.', ['Use ΔU = qΔV.', 'ΔU = 2 C × 3 J/C.', 'The energy change is 6 J.'], '6 J.'),
              example('A -1 C charge moves through ΔV = 4 V.', ['Use ΔU = qΔV.', 'ΔU = (-1 C)(4 J/C).', 'The signed energy change is negative.'], 'ΔU = -4 J.')],
            [q('Voltage is potential energy change per unit:', ['Charge', 'Mass', 'Time', 'Length'], 0, 'Potential difference is energy change divided by charge, measured in joules per coulomb.'),
              q('A 3 C charge moves through 2 V. What is ΔU?', ['1.5 J', '5 J', '6 J', '9 J'], 2, 'ΔU = qΔV = 3 C × 2 J/C = 6 J.'),
              q('What does a battery primarily provide in a circuit model?', ['Charge creation', 'Energy transfer to charges', 'Infinite current', 'Removal of resistance'], 1, 'Charges are not created by the battery; chemical processes transfer energy to them.')],
            { vocabulary: [{ term: 'Electric potential energy', definition: 'Energy associated with the arrangement of electric charges.' }, { term: 'Electric potential', definition: 'Potential energy per unit charge.' }, { term: 'Potential difference', definition: 'The change in electric potential between two locations, measured in volts.' }], cheatSheet: ['ΔU = qΔV', '1 V = 1 J/C', 'Track signs and reference direction'] })
        ]}
      ]
    }),
    createCourse({
      id: 'economics11', grade: '11', area: 'Business & Economics', title: 'Economics 11: Personal Finance & Decisions', code: 'ECON 11',
      textbook: 'StudyBC original notes; examples are educational and not individualized financial advice.',
      summary: 'Understand budgets, compound growth, interest, and risk using transparent numerical examples.',
      bigIdeas: ['Time changes the value of money.', 'Budgets make trade-offs visible.', 'Risk and return must be considered together.'],
      prerequisites: ['Percentages', 'Decimal multiplication', 'Reading a table'],
      leadsTo: ['Economics 12', 'Accounting', 'Personal financial literacy'],
      units: [
        { name: 'Money Over Time', summary: 'Interest, compounding, and inflation-aware choices.', hours: 5, lessons: [
          spec('simple-and-compound-interest', 'Simple and Compound Interest',
            'Interest is the cost of borrowing or the return for saving. Simple interest is calculated on original principal; compound interest is calculated on principal plus previously earned interest.',
            'Simple interest is like earning the same fixed amount each year. Compound interest is like a snowball that grows as earlier growth is added.',
            ['Record principal P, annual rate r as a decimal, and number of periods t.', 'For simple interest, use I = Prt.', 'For annual compounding, use A = P(1 + r)^t.', 'Check that the rate period matches the number of periods.'],
            'Compounding can help long-term savings and make debt grow quickly. Fees, taxes, changing rates, and inflation are not included in the basic formulas.',
            [example('$1,000 earns 5% simple interest for 2 years.', ['Convert 5% to 0.05.', 'I = Prt = 1000 × 0.05 × 2 = 100.', 'Add interest to principal for the final amount.'], 'Interest = $100; total = $1,100.'),
              example('$1,000 compounds annually at 5% for 2 years.', ['A = 1000(1.05)².', '1.05² = 1.1025.', 'A = $1,102.50.'], '$1,102.50 before fees or tax.')],
            [q('What is 10% as a decimal for a formula?', ['10', '1', '0.1', '0.01'], 2, 'Divide a percent by 100: 10% = 0.10.'),
              q('Which interest method earns interest on earlier interest?', ['Simple', 'Compound', 'None', 'Flat fee'], 1, 'Compound interest applies the rate to the accumulated balance, including prior interest.'),
              q('At the same positive rate and time, compounding annually generally produces:', ['Less than simple interest always', 'At least as much as simple interest', 'No interest', 'A negative balance'], 1, 'For a positive rate and multiple periods, compound interest earns interest on prior interest, so it generally grows faster than simple interest.')],
            { vocabulary: [{ term: 'Principal', definition: 'The initial amount borrowed or invested.' }, { term: 'Interest rate', definition: 'The proportion of principal charged or earned per time period.' }, { term: 'Compound interest', definition: 'Interest calculated on principal plus accumulated interest.' }], cheatSheet: ['Simple: I = Prt', 'Compound: A = P(1 + r)^t', 'Convert percent to decimal; match periods'] }),
          spec('budgeting', 'Budgeting, Cash Flow, and Trade-Offs',
            'A budget is a plan for income and spending over a defined period. Cash flow records money entering and leaving; a positive balance means inflows exceed outflows for that period.',
            'A budget is like a map for a limited monthly resource: it shows where money is planned to go before the month ends.',
            ['Choose a time period and record after-tax income.', 'List fixed and variable expenses using realistic estimates.', 'Subtract expenses and planned savings from income.', 'Revise priorities if the balance is negative; track actual spending to improve estimates.'],
            'A budget is a decision tool, not a moral score. Irregular expenses and emergencies should be planned for, and estimates should be reviewed as circumstances change.',
            [example('Monthly take-home income is $2,400; expenses are $1,850.', ['Subtract expenses from income.', '$2,400 - $1,850 = $550.', 'Decide how much goes to savings, goals, and flexible spending.'], '$550 remains before any unlisted costs.'),
              example('A subscription costs $12 monthly.', ['Annual cost = $12 × 12.', '12 × 12 = 144.', 'Compare the $144 yearly cost with actual use and alternatives.'], '$144 per year.')],
            [q('Cash flow for a period is:', ['Income plus net worth', 'Money in minus money out', 'Only cash purchases', 'A loan interest rate'], 1, 'Cash flow tracks inflows and outflows over a period; net cash flow is income minus spending.'),
              q('If income is $2,000 and spending is $2,150, the period balance is:', ['$150 surplus', '$150 deficit', '$4,150 surplus', '$2,000 surplus'], 1, 'Subtract spending from income: 2,000 - 2,150 = -150, a $150 deficit.'),
              q('Why track irregular expenses?', ['They never happen', 'They can make an otherwise realistic budget incomplete', 'They are always fixed', 'They replace income'], 1, 'Annual or occasional costs still affect cash flow and should be planned across the relevant months.')],
            { vocabulary: [{ term: 'Budget', definition: 'A plan for allocating income among spending, saving, and goals.' }, { term: 'Cash flow', definition: 'Money entering and leaving over a defined time period.' }, { term: 'Fixed expense', definition: 'A cost that is relatively stable from period to period.' }], cheatSheet: ['Net cash flow = income - outflows', 'Include irregular and annual costs', 'Compare plan with actual spending'] })
        ]},
        { name: 'Risk & Decisions', summary: 'Expected value, uncertainty, and evaluating claims.', hours: 4, lessons: [
          spec('expected-value', 'Expected Value and Uncertainty',
            'Expected value is a probability-weighted average of possible outcomes. It is useful for comparing repeated decisions but does not predict the result of one specific event.',
            'A fair game’s expected value is like the average result if the same game could be played many times.',
            ['List each possible outcome and its net value.', 'Assign a probability to each outcome; probabilities sum to 1.', 'Multiply each outcome value by its probability.', 'Add the products and discuss uncertainty separately from the average.'],
            'Two choices can have the same expected value but very different risk. Averages do not describe how spread out outcomes are or whether someone can tolerate a loss.',
            [example('A game pays $10 with probability 0.2 and $0 otherwise.', ['Compute 10 × 0.2 = 2.', 'Compute 0 × 0.8 = 0.', 'Add the weighted outcomes.'], 'Expected payout = $2.'),
              example('A ticket costs $3 and has expected payout $2.', ['Net expected value = expected payout - ticket cost.', '$2 - $3 = -$1.', 'On average, the net result is a $1 loss per play.'], 'Expected net value = -$1 per play.')],
            [q('Expected value is calculated by:', ['Adding outcomes without probabilities', 'Multiplying each outcome by its probability and adding', 'Choosing the largest outcome', 'Dividing by the number of choices only'], 1, 'Expected value is the sum of outcome × probability for all possible outcomes.'),
              q('If outcomes are $4 with probability 0.5 and $0 with probability 0.5, expected value is:', ['$0', '$2', '$4', '$8'], 1, 'Expected value = 4 × 0.5 + 0 × 0.5 = $2.'),
              q('Does expected value guarantee one trial’s result?', ['Yes', 'No; it is a long-run weighted average', 'Only for lotteries', 'Only if outcomes are equal'], 1, 'Expected value summarizes the probability-weighted average; an individual outcome may be higher or lower.')],
            { vocabulary: [{ term: 'Outcome', definition: 'A possible result of a decision or uncertain event.' }, { term: 'Probability', definition: 'A number from 0 to 1 representing likelihood in a model.' }, { term: 'Expected value', definition: 'The probability-weighted average of possible values.' }], cheatSheet: ['EV = Σ(outcome × probability)', 'Probabilities sum to 1', 'Expected value is not a guarantee'] }),
          spec('reading-data-claims', 'Reading Economic Data and Claims',
            'A statistic summarizes measured information. Before accepting a claim, check what was measured, who was included, the time period, the comparison group, and whether the evidence supports cause or only association.',
            'A single snapshot of a thermometer cannot explain why the weather changed; trends and context matter.',
            ['Find the original measure, unit, population, and dates.', 'Compare like with like and inspect the scale of any graph.', 'Separate correlation from causation.', 'State uncertainty and limits before drawing a conclusion.'],
            'Averages can hide variation, and a truncated axis can exaggerate small differences. Reliable analysis checks multiple measures and transparent methods.',
            [example('A chart starts its vertical axis at 95 to show values 98 and 100.', ['Notice that the axis omits zero.', 'The visual gap appears large relative to the shown range.', 'Read exact values and consider a full-scale view.'], 'The difference is 2 units; the truncated scale may visually exaggerate it.'),
              example('Two variables rise together over time.', ['Record that they are correlated.', 'Ask whether a third factor could affect both.', 'Look for a credible design or additional evidence to establish causation.'], 'Correlation alone does not establish that one variable caused the other.')],
            [q('Correlation by itself proves:', ['Causation', 'A causal mechanism', 'Association, not necessarily causation', 'That data are false'], 2, 'Two variables moving together does not prove that one causes the other; confounding or coincidence may explain the pattern.'),
              q('Why inspect a graph’s axis?', ['It changes the data', 'Scale choices can affect visual interpretation', 'Axes are decoration', 'It gives the sample size automatically'], 1, 'Truncated or uneven axes can make differences appear larger or smaller than they are.'),
              q('A useful statistic should include:', ['Only a large number', 'Measure, unit, population, and time period', 'No context', 'An opinion'], 1, 'Context tells what a statistic represents and whether comparisons are meaningful.')],
            { vocabulary: [{ term: 'Correlation', definition: 'A statistical association between variables.' }, { term: 'Causation', definition: 'A relationship where changes in one factor produce changes in another.' }, { term: 'Sample', definition: 'A subset of a population used to collect data.' }], cheatSheet: ['Check measure, unit, population, time', 'Correlation ≠ causation', 'Inspect graph scale and uncertainty'] })
        ]}
      ]
    })
  );
})();
