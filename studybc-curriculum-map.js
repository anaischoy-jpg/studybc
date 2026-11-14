(function () {
  const maps = [
    ['fm10', '10', 'Mathematics', 'Foundations of Math and Pre-Calculus 10', [
      ['Number & Operations', 'Real-number system; radicals; exponent laws'],
      ['Polynomials & Rational Expressions', 'Polynomial operations; factoring; rational expressions'],
      ['Linear Relationships', 'Linear relations; functions; systems of linear equations'],
      ['Quadratics', 'Quadratic relations; factoring and solving quadratic equations'],
      ['Patterns & Finance', 'Arithmetic sequences; financial literacy'],
      ['Trigonometry', 'Right-triangle trigonometry; sine cosine and tangent']
    ]],
    ['chem11', '11', 'Sciences', 'Chemistry 11', [
      ['Atoms & Periodic Table', 'Matter and the mole; atomic theory; periodic trends; atomic structure'],
      ['Bonding', 'Chemical bonding; nomenclature; ionic compounds; covalent compounds'],
      ['Stoichiometry', 'Chemical reactions; balancing equations; reaction stoichiometry'],
      ['Solutions & Acids', 'Solutions; concentration; acids and bases'],
      ['Organic Chemistry & Energy', 'Introduction to organic chemistry; energy changes in reactions']
    ]],
    ['physics11', '11', 'Sciences', 'Physics 11: Motion & Energy', [
      ['Describing Motion', 'Kinematics in one dimension; kinematics in two dimensions; motion graphs'],
      ['Forces & Energy', 'Dynamics; Newton’s laws; energy; work; power'],
      ['Momentum', 'Momentum; impulse; conservation of momentum'],
      ['Waves & Optics', 'Waves; sound; light; optics'],
      ['Modern Physics', 'Introduction to special relativity']
    ]],
    ['physics12', '12', 'Sciences', 'Physics 12: Fields & Electricity', [
      ['Motion & Forces', 'Two-dimensional motion; forces; circular motion; gravitation'],
      ['Energy & Rotation', 'Momentum; energy; rotational motion'],
      ['Electricity & Magnetism', 'Electrostatics; electric circuits; magnetism; electromagnetic induction'],
      ['Modern Physics', 'Introduction to modern physics']
    ]],
    ['social10', '10', 'Social Studies', 'Social Studies 10', [
      ['Identity & Governance', 'Canadian identity; political institutions; First Peoples governance; government structures; political ideologies'],
      ['Canada Since 1914', 'Canadian history from 1914 onward; international conflict and cooperation'],
      ['Rights & Reconciliation', 'Discriminatory policies and injustices; Head Tax; Komagata Maru; residential schools; internments; truth and reconciliation'],
      ['Citizenship & Public Policy', 'Citizenship; media; public policy']
    ]],
    ['apcalc', 'AP', 'Mathematics', 'AP Calculus AB', [
      ['Limits & Continuity', 'Limits; continuity; graphical and numerical limits'],
      ['Differentiation', 'Derivative definition; differentiation rules; derivatives of common functions'],
      ['Applications of Derivatives', 'Optimization; related rates; motion; curve analysis'],
      ['Integration & Accumulation', 'Integration; definite integrals; accumulation; fundamental theorem of calculus'],
      ['Differential Equations', 'Differential equations; slope fields; applications']
    ]],
    ['english10', '10', 'English Language Arts', 'English Language Arts 10', [
      ['Composition', 'Narrative writing; explanatory writing; persuasive writing; informative writing; thesis and argument; evidence and citation; revision and editing; grammar and style; audience and tone; research and media literacy'],
      ['Literary Studies', 'Short stories; novels; poetry; drama; literary devices; theme and characterization; point of view; symbolism; close reading; comparative analysis'],
      ['Creative Writing', 'Fiction; poetry; scripts; voice and imagery; drafting and revision'],
      ['New Media', 'Digital storytelling; multimodal texts; audience and design; digital citizenship'],
      ['Spoken Language', 'Speeches; discussion; oral storytelling; presentation skills']
    ]],
    ['workplace10', '10', 'Mathematics', 'Workplace Mathematics 10', [
      ['Proportional Reasoning', 'Ratios and rates; proportional relationships; percent applications'],
      ['Measurement & Geometry', 'Unit conversions; measurement; geometric reasoning; perimeter and area; volume'],
      ['Trigonometry', 'Right triangles; sine cosine and tangent; practical measurement'],
      ['Financial Literacy', 'Income and expenses; budgets; taxes; consumer decisions'],
      ['Data & Probability', 'Reading statistics; data displays; probability; risk']
    ]],
    ['science10', '10', 'Sciences', 'Science 10: Integrated Science', [
      ['Genetics', 'DNA and genes; chromosomes; mitosis and meiosis; inheritance; Punnett squares; mutations; biotechnology'],
      ['Chemistry', 'Atomic structure; periodic table; chemical bonding; ionic and covalent compounds; reactions; balancing equations; acids and bases; mole concept'],
      ['Physics', 'Motion in one and two dimensions; forces; Newton’s laws; energy; work and power; momentum'],
      ['Earth & Space Science', 'Plate tectonics; earthquakes and volcanoes; rock cycle; weathering; climate; astronomy; energy transfer']
    ]],
    ['phe10', '10', 'Career & Health', 'Physical and Health Education 10', [
      ['Physical Literacy & Fitness', 'Movement skills; fitness components; personal activity planning'],
      ['Relationships & Consent', 'Healthy relationships; consent; boundaries; communication'],
      ['Mental Health & Safety', 'Mental health; stress and anxiety; substance use; sexual health; abuse prevention; emergency response'],
      ['Healthy Living', 'Nutrition; sleep; lifelong health decisions']
    ]],
    ['career10', '10', 'Career & Health', 'Career Education 10', [
      ['Identity & Goals', 'Personal identity and strengths; goal-setting; reflection'],
      ['Career Exploration', 'Career pathways; labour-market awareness; employability skills'],
      ['Planning & Safety', 'Post-secondary pathways; financial planning; workplace safety; digital footprint']
    ]],
    ['entrepreneurship10', '10', 'Business & Economics', 'Entrepreneurship and Marketing 10', [
      ['Opportunity & Research', 'Recognizing opportunities; customer needs; market research'],
      ['Brand & Market', 'Product and service design; branding; target markets; pricing; promotion'],
      ['Business Planning', 'Basic financial planning; business ethics; communicating a value proposition']
    ]],
    ['mediaarts10', '10', 'Arts & Media', 'Media Arts 10', [
      ['Visual Storytelling', 'Photography; composition; visual storytelling'],
      ['Production & Editing', 'Video; audio; editing; production workflows'],
      ['Media Literacy', 'Digital ethics; representation; audience and purpose']
    ]],
    ['foodstudies10', '10', 'Career & Health', 'Food Studies 10', [
      ['Food Safety & Skills', 'Food safety; kitchen practices; cooking techniques'],
      ['Nutrition & Planning', 'Nutrition; meal planning; food preparation'],
      ['Food Systems', 'Food systems; sustainability; food choices']
    ]],
    ['textiles10', '10', 'Arts & Technology', 'Textiles 10', [
      ['Materials & Design', 'Fabric properties; design process; sustainability'],
      ['Patterns & Construction', 'Pattern use; construction; sewing skills; finishing']
    ]],
    ['webdev10', '10', 'Computer Science & Tech', 'Web Development 10', [
      ['Web Foundations', 'HTML structure; CSS styling; JavaScript fundamentals'],
      ['User Experience', 'Responsive design; accessibility; user experience'],
      ['Tools & Publishing', 'Version control; testing; publishing a website']
    ]],
    ['computerstudies10', '10', 'Computer Science & Tech', 'Computer Studies 10', [
      ['Programming Foundations', 'Variables; data types; input and output; expressions'],
      ['Algorithms & Control', 'Algorithms; conditionals; loops; functions'],
      ['Data & Debugging', 'Data; testing; debugging; computational thinking'],
      ['Digital Systems & Ethics', 'Digital systems; privacy; security; computing ethics']
    ]],
    ['technology10', '10', 'Arts & Technology', 'Technology Education 10', [
      ['Design Process', 'Identifying needs; design briefs; prototyping; iteration'],
      ['Tools & Materials', 'Materials; tools; safe work practices; construction'],
      ['Systems & Evaluation', 'Technical systems; testing; documentation; sustainability']
    ]],
    ['culinary10', '10', 'Career & Health', 'Culinary Arts 10', [
      ['Kitchen Foundations', 'Kitchen safety; sanitation; equipment; knife skills'],
      ['Cooking Methods', 'Cooking techniques; recipe reading; ingredient preparation'],
      ['Food & Service', 'Menu planning; presentation; teamwork; food sustainability']
    ]],
    ['familysociety10', '10', 'Career & Health', 'Family and Society 10', [
      ['Families & Development', 'Family structures; human development; relationships'],
      ['Well-Being & Care', 'Communication; caregiving; health and safety'],
      ['Society & Change', 'Social influences; changing family roles; inclusive communities']
    ]],
    ['musicdrama10', '10', 'Arts & Media', 'Music, Drama, and Musical Theatre 10', [
      ['Performance Foundations', 'Performance skills; rehearsal; ensemble practice'],
      ['Music & Theatre', 'Choral and instrumental music; contemporary music; dramatic forms'],
      ['Creation & Presentation', 'Musical theatre; stagecraft; interpretation; reflection']
    ]],
    ['visualarts10', '10', 'Arts & Media', 'Visual Arts and Media Design 10', [
      ['Visual Language', 'Elements and principles of design; visual composition'],
      ['Materials & Making', 'Drawing; painting; mixed media; digital design'],
      ['Interpretation & Ethics', 'Visual storytelling; audience; representation; digital citizenship']
    ]],
    ['english11', '11', 'English Language Arts', 'English Language Arts 11', [
      ['Literary & Media Analysis', 'Fiction and poetry; drama and nonfiction; visual and digital texts; rhetorical strategies; comparative texts'],
      ['Composition & Research', 'Argument and persuasion; research; synthesis; creative writing; expository writing; revision'],
      ['Communication', 'Oral communication; media literacy; audience and purpose']
    ]],
    ['precalc11', '11', 'Mathematics', 'Pre-Calculus 11', [
      ['Expressions & Equations', 'Sequences and series; radicals; absolute value; rational expressions and equations; inequalities; systems of equations'],
      ['Quadratic Functions', 'Quadratic functions; quadratic equations; factoring and roots'],
      ['Trigonometry', 'Sine law; cosine law; trigonometric functions; solving trigonometric problems'],
      ['Functions', 'Function notation; transformations; interpreting graphs']
    ]],
    ['foundations11', '11', 'Mathematics', 'Foundations of Mathematics 11', [
      ['Reasoning & Geometry', 'Logical reasoning; angles and triangles; sine law; cosine law'],
      ['Statistics', 'Data collection; standard deviation; normal distribution; interpreting data'],
      ['Relations & Modeling', 'Systems of linear inequalities; quadratic functions; proportional reasoning'],
      ['Financial Mathematics', 'Compound interest; investments; financial decision-making']
    ]],
    ['workplace11', '11', 'Mathematics', 'Workplace Mathematics 11', [
      ['Measurement & Geometry', 'Measurement; geometry; practical trigonometry'],
      ['Statistics & Probability', 'Statistics; probability; interpreting information'],
      ['Personal Finance', 'Budgets; loans; interest; income; taxes; financial choices'],
      ['Problem Solving', 'Estimation; choosing operations; communicating a solution']
    ]],
    ['historymath11', '11', 'Mathematics', 'History of Mathematics 11', [
      ['Number & Measurement', 'Historical number systems; measurement; calculation methods'],
      ['Geometry & Algebra', 'Development of geometry; algebraic ideas; mathematical proof'],
      ['Mathematics & Society', 'Mathematics across cultures; historical applications; changing ideas']
    ]],
    ['biology11', '11', 'Sciences', 'Biology 11', [
      ['Evolution & Diversity', 'Evolution; adaptation; biodiversity; classification and taxonomy'],
      ['Microbiology', 'Microorganisms; bacteria; viruses; microbial roles'],
      ['Plants & Animals', 'Plant structure and function; animal diversity; animal systems'],
      ['Ecology', 'Ecosystems; relationships; human impacts on ecosystems']
    ]],
    ['earthscience11', '11', 'Sciences', 'Earth Science 11', [
      ['Geology', 'Minerals and rocks; plate tectonics; geologic time; fossils'],
      ['Surface Processes', 'Earthquakes; volcanoes; weathering and erosion; groundwater'],
      ['Atmosphere & Oceans', 'Atmosphere; weather; climate; oceans'],
      ['Space Science', 'Astronomy; Earth in space']
    ]],
    ['social11', '11', 'Social Studies', 'Social Studies 11', [
      ['Canada & Government', 'Canadian identity; government; political ideologies'],
      ['History & Human Rights', 'Canadian and global history; human rights; genocide and historical injustice'],
      ['Global Issues', 'Environmental issues; economic systems; global interdependence'],
      ['Civic Action', 'Media literacy; evaluating claims; civic participation and action']
    ]],
    ['economics11', '11', 'Business & Economics', 'Economics 11: Personal Finance & Decisions', [
      ['Choices & Markets', 'Scarcity; opportunity cost; incentives; supply and demand'],
      ['Personal Finance', 'Budgeting; saving; borrowing; interest'],
      ['Economic Systems', 'Markets; economic systems; distribution; public choices']
    ]],
    ['accounting11', '11', 'Business & Economics', 'Accounting 11', [
      ['Accounting Foundations', 'Business transactions; assets; liabilities; owner’s equity'],
      ['Recording & Reporting', 'Journal entries; ledgers; trial balances; financial statements'],
      ['Analysis & Ethics', 'Internal controls; interpreting results; professional ethics']
    ]],
    ['accounting12', '12', 'Business & Economics', 'Accounting 12', [
      ['Financial Reporting', 'Adjusting entries; accruals; financial statement preparation'],
      ['Merchandising & Assets', 'Inventory; cost of goods sold; depreciation; asset disposal'],
      ['Analysis & Controls', 'Financial statement analysis; internal controls; ethical reporting']
    ]],
    ['law11', '11', 'Social Studies', 'Law Studies 11', [
      ['Legal Foundations', 'Sources of law; legal institutions; rights and responsibilities'],
      ['Criminal & Civil Law', 'Criminal process; civil disputes; evidence; legal reasoning'],
      ['Law & Society', 'Charter principles; landmark cases; access to justice']
    ]],
    ['law12', '12', 'Social Studies', 'Law Studies 12', [
      ['Legal Foundations', 'Legal principles; institutions; rights and responsibilities'],
      ['Criminal & Civil Law', 'Criminal responsibility; civil liability; evidence and procedure'],
      ['Charter & Contemporary Issues', 'Charter analysis; landmark cases; contemporary legal issues']
    ]],
    ['phe11', '11', 'Career & Health', 'Physical and Health Education 11', [
      ['Active Living', 'Active living; fitness planning; movement skills; leadership'],
      ['Well-Being & Relationships', 'Mental well-being; healthy relationships; substance-use prevention'],
      ['Safety & Lifelong Health', 'Personal safety; health decisions; lifelong activity']
    ]],
    ['english12', '12', 'English Language Arts', 'English Studies 12', [
      ['Critical Reading', 'Complex literary texts; informational texts; critical literacy; authorial choices; theme and voice; perspective and context'],
      ['Academic Composition', 'Research and synthesis; formal academic writing; argumentation; revision'],
      ['Communication & Media', 'Oral presentations; digital literacy; multimodal texts']
    ]],
    ['precalc12', '12', 'Mathematics', 'Pre-Calculus 12', [
      ['Function Families', 'Functions and transformations; polynomial functions; rational functions'],
      ['Exponential & Logarithmic Functions', 'Exponential functions; logarithms; logarithmic equations'],
      ['Trigonometry', 'Trigonometric functions; identities; equations; applications'],
      ['Conics & Counting', 'Conic sections; combinatorics; probability; sequences and series']
    ]],
    ['calculus12', '12', 'Mathematics', 'Calculus 12', [
      ['Limits & Derivatives', 'Limits; continuity; derivative definition; differentiation rules'],
      ['Derivative Applications', 'Curve sketching; optimization; related rates; motion'],
      ['Integrals', 'Antiderivatives; definite integrals; area and accumulation'],
      ['Further Applications', 'Volumes; differential equations; applications of calculus']
    ]],
    ['biology12', '12', 'Sciences', 'Biology 12', [
      ['Cell Biology & Biochemistry', 'Cell structure; biochemistry; enzymes; cellular processes'],
      ['Energy & Gene Expression', 'Cellular respiration; photosynthesis; DNA replication; protein synthesis; gene expression'],
      ['Genetics & Cell Division', 'Cell division; inheritance; genetics; biotechnology'],
      ['Human Systems', 'Homeostasis; body systems; immunity']
    ]],
    ['chem12', '12', 'Sciences', 'Chemistry 12', [
      ['Reaction Rates & Equilibrium', 'Reaction kinetics; chemical equilibrium; Le Châtelier’s principle'],
      ['Acids, Bases & Solubility', 'Acids and bases; pH; buffers; solubility equilibria'],
      ['Redox & Electrochemistry', 'Oxidation-reduction; electrochemical cells; applications'],
      ['Energy & Organic Chemistry', 'Thermochemistry; organic chemistry; molecular structure']
    ]],
    ['socialjustice12', '12', 'Social Studies', 'Social Justice 12', [
      ['Understanding Justice', 'Interpretations of social justice; connecting social-justice issues'],
      ['Injustice & Power', 'Historical and present injustices; systems of power; identity and equity'],
      ['Advocacy & Action', 'Advocacy; evaluating change strategies; responsible action']
    ]],
    ['indigenous12', '12', 'Social Studies', 'Contemporary Indigenous Studies 12', [
      ['Worldviews & Cultures', 'Indigenous cultures; worldviews; diversity among Indigenous peoples'],
      ['Colonialism & Relationships', 'Colonialism; relationships and inequities between Indigenous peoples and governments'],
      ['Resilience & Self-Determination', 'Resilience and survival; self-determination; economic development and partnerships']
    ]],
    ['humangeo12', '12', 'Social Studies', 'Human Geography 12', [
      ['Population & Culture', 'Population and demographics; migration; culture'],
      ['Political & Economic Geography', 'Political organization; development; globalization'],
      ['Land Use & Cities', 'Urbanization; agriculture; industry'],
      ['Environment & Connections', 'Environmental relationships; global connections']
    ]],
    ['physicalgeo12', '12', 'Social Studies', 'Physical Geography 12', [
      ['Earth Systems', 'Weather and climate; tectonic processes; landforms'],
      ['Water & Ice', 'Rivers; coasts; glaciers; groundwater'],
      ['Living Systems & Hazards', 'Soils; ecosystems; natural hazards'],
      ['Geographic Methods', 'Mapping; spatial data; human-environment interactions']
    ]],
    ['cultures12', '12', 'Social Studies', 'Comparative Cultures 12', [
      ['Culture & Identity', 'Belief and value systems; cultural interaction and exchange'],
      ['Power & Governance', 'Power; authority; governance; cultural conflict and resolution'],
      ['Culture & Environment', 'Culture-environment relationships; comparative inquiry']
    ]],
    ['philosophy12', '12', 'Social Studies', 'Philosophy 12', [
      ['Reality & Knowledge', 'Nature of reality; theories of being; knowledge and truth'],
      ['Justice & Ethics', 'Justice; freedom; morality; ethical reasoning'],
      ['Logic & Argument', 'Logic; argument structure; evaluating reasons and evidence']
    ]],
    ['cs12', '12', 'Computer Science & Tech', 'Computer Science 12', [
      ['Programming & Design', 'Advanced programming; object-oriented programming; software design'],
      ['Algorithms & Data', 'Data structures; algorithms; recursion; computational thinking'],
      ['Information Systems', 'Databases; data modeling; problem solving'],
      ['Ethics & Impact', 'Computing ethics; privacy; social impact']
    ]],
    ['statistics12', '12', 'Mathematics', 'Statistics 12', [
      ['Data & Study Design', 'Data collection; sampling; experimental design; descriptive statistics'],
      ['Probability & Distributions', 'Probability; random variables; distributions; sampling distributions'],
      ['Inference', 'Confidence intervals; hypothesis testing; inference'],
      ['Relationships & Communication', 'Regression; association; statistical literacy']
    ]],
    ['apprenticeship12', '12', 'Mathematics', 'Apprenticeship Mathematics 12', [
      ['Workplace Measurement', 'Measurement; scale; precision; unit conversions'],
      ['Geometry & Trigonometry', 'Geometry; right-triangle trigonometry; practical applications'],
      ['Finance & Data', 'Financial literacy; estimation; interpreting workplace data']
    ]],
    ['geometry12', '12', 'Mathematics', 'Geometry 12', [
      ['Geometric Reasoning', 'Definitions; constructions; deductive reasoning; proof'],
      ['Transformations & Similarity', 'Transformations; congruence; similarity; proportional reasoning'],
      ['Circles & Measurement', 'Circle geometry; coordinate geometry; area and volume']
    ]],
    ['entrepreneurship12', '12', 'Business & Economics', 'Entrepreneurship 12', [
      ['Opportunity & Validation', 'Customer problems; market research; value propositions'],
      ['Business Model & Finance', 'Business models; costs and revenue; financial planning'],
      ['Launch & Growth', 'Marketing; operations; ethics; evaluating performance']
    ]],
    ['marketing12', '12', 'Business & Economics', 'Marketing 12', [
      ['Markets & Customers', 'Market research; segmentation; target audience; consumer behavior'],
      ['Marketing Mix', 'Product; pricing; promotion; distribution'],
      ['Brand & Evaluation', 'Brand strategy; digital marketing; ethics; campaign evaluation']
    ]],
    ['psychology12', '12', 'Social Studies', 'Psychology 12', [
      ['Research & Behavior', 'Research methods; behavior; cognition; learning'],
      ['Development & Identity', 'Human development; personality; motivation; emotion'],
      ['Social & Mental Health', 'Social psychology; mental health; well-being; ethical practice']
    ]],
    ['urbanstudies12', '12', 'Social Studies', 'Urban Studies 12', [
      ['Urbanization & Form', 'Urbanization; settlement patterns; urban form'],
      ['Cities & Systems', 'Housing; transportation; infrastructure; economic activity'],
      ['Equity & Sustainability', 'Urban inequality; planning; environment; sustainable communities']
    ]],
    ['asianstudies12', '12', 'Social Studies', 'Asian Studies 12', [
      ['Place & History', 'Geographic diversity; historical foundations; regional connections'],
      ['Societies & Change', 'Cultural traditions; social change; governance; economies'],
      ['Contemporary Asia', 'Regional issues; globalization; comparative perspectives']
    ]],
    ['europeanhistory12', '12', 'Social Studies', 'European History 12', [
      ['Ideas & Institutions', 'Renaissance; Reformation; Enlightenment; political institutions'],
      ['Revolution & Industry', 'Political revolutions; industrialization; nationalism'],
      ['Conflict & Cooperation', 'World wars; Cold War; European integration; contemporary Europe']
    ]],
    ['apcalcbc', 'AP', 'Mathematics', 'AP Calculus BC', [
      ['Limits & Derivatives', 'Limits; continuity; derivative definition; differentiation rules; derivative applications'],
      ['Integration & Differential Equations', 'Antiderivatives; definite integrals; accumulation; differential equations; integral applications'],
      ['Advanced Integration', 'Integration techniques; improper integrals; applications'],
      ['Sequences & Series', 'Sequences; convergence; convergence tests; Taylor and Maclaurin series'],
      ['Parametric, Polar & Vector Functions', 'Parametric equations; polar coordinates; vector-valued functions']
    ]],
    ['apstatistics', 'AP', 'Mathematics', 'AP Statistics', [
      ['Exploring Data', 'One-variable data; two-variable data; graphical displays; numerical summaries'],
      ['Collecting Data', 'Sampling methods; surveys; observational studies; experiments'],
      ['Probability', 'Probability; random variables; probability distributions; sampling distributions'],
      ['Statistical Inference', 'Confidence intervals; significance tests; inference for proportions and means; chi-square; regression inference']
    ]],
    ['apbiology', 'AP', 'Sciences', 'AP Biology', [
      ['Chemistry of Life & Cells', 'Chemistry of life; cell structure and function; membranes'],
      ['Cellular Energetics', 'Enzymes; cellular energetics; photosynthesis; cellular respiration'],
      ['Heredity & Gene Expression', 'Heredity; gene expression; regulation; biotechnology'],
      ['Evolution & Ecology', 'Natural selection; evolution; biodiversity; ecology; systems biology and data analysis']
    ]],
    ['apchemistry', 'AP', 'Sciences', 'AP Chemistry', [
      ['Atomic Structure & Bonding', 'Atomic structure; periodicity; bonding; intermolecular forces'],
      ['Reactions & Matter', 'Stoichiometry; gases; solutions; chemical reactions'],
      ['Energy & Kinetics', 'Thermochemistry; reaction kinetics; energy diagrams'],
      ['Equilibrium & Acids', 'Equilibrium; Le Châtelier’s principle; acids and bases; buffers; solubility'],
      ['Thermodynamics & Electrochemistry', 'Thermodynamics; redox; electrochemistry; spectroscopy; laboratory design']
    ]],
    ['apphysics1', 'AP', 'Sciences', 'AP Physics 1', [
      ['Mechanics', 'Kinematics; dynamics; work; energy; power; momentum'],
      ['Rotation & Oscillation', 'Torque; rotational motion; oscillations'],
      ['Waves & Fluids', 'Mechanical waves; sound; fluids'],
      ['Circuits', 'Basic electrical circuits']
    ]],
    ['apphysics2', 'AP', 'Sciences', 'AP Physics 2', [
      ['Thermodynamics', 'Thermodynamics; thermal processes'],
      ['Electricity & Magnetism', 'Electric force; electric field; potential; capacitance; circuits; magnetism; electromagnetic induction'],
      ['Optics', 'Geometric optics; physical optics'],
      ['Modern Physics', 'Quantum physics; atomic physics; nuclear physics']
    ]],
    ['apphysicscm', 'AP', 'Sciences', 'AP Physics C: Mechanics', [
      ['Kinematics & Dynamics', 'Kinematics; Newton’s laws; calculus-based motion'],
      ['Energy & Momentum', 'Work; energy; power; systems of particles; linear momentum'],
      ['Rotation & Oscillations', 'Rotation; oscillations; rotational dynamics'],
      ['Gravitation', 'Gravitational fields; orbits; calculus-based problem solving']
    ]],
    ['apphysicsem', 'AP', 'Sciences', 'AP Physics C: Electricity and Magnetism', [
      ['Electrostatics', 'Electrostatics; electric fields; electric potential'],
      ['Conductors & Circuits', 'Conductors; capacitors; electric circuits'],
      ['Magnetism & Induction', 'Magnetic fields; electromagnetism; inductance'],
      ['Field Models', 'Maxwell’s equations; calculus-based field analysis']
    ]],
    ['apcsa', 'AP', 'Computer Science & Tech', 'AP Computer Science A', [
      ['Programming Foundations', 'Java programming; primitive types; objects; Boolean logic'],
      ['Iteration & Collections', 'Iteration; arrays; ArrayList; two-dimensional arrays'],
      ['Algorithms', 'Searching; sorting; algorithm analysis'],
      ['Object-Oriented Design', 'Classes; inheritance; recursion; software development; ethical computing']
    ]],
    ['apcsp', 'AP', 'Computer Science & Tech', 'AP Computer Science Principles', [
      ['Creative Development', 'Creative development; iterative design; collaboration'],
      ['Data & Algorithms', 'Data; algorithms; abstraction; programming'],
      ['Systems & Networks', 'Computer systems; networks; cybersecurity'],
      ['Impact of Computing', 'Computing innovations; social impact; performance task']
    ]],
    ['apenvsci', 'AP', 'Sciences', 'AP Environmental Science', [
      ['Living World', 'Ecosystems; biodiversity; populations'],
      ['Land, Water & Energy', 'Land use; water resources; energy resources'],
      ['Pollution', 'Atmospheric pollution; aquatic pollution; terrestrial pollution'],
      ['Global Change & Solutions', 'Global change; sustainability; environmental policy']
    ]],
    ['appsych', 'AP', 'Social Studies', 'AP Psychology', [
      ['Research & Foundations', 'Research methods; ethics; biological bases of behavior'],
      ['Mind & Learning', 'Sensation and perception; learning; memory; cognition; consciousness'],
      ['Development & Individual Differences', 'Motivation and emotion; development; personality'],
      ['Social Behavior & Health', 'Social psychology; psychological disorders; treatment']
    ]],
    ['apenglishlang', 'AP', 'English Language Arts', 'AP English Language and Composition', [
      ['Rhetorical Analysis', 'Rhetorical situation; rhetorical analysis; style; diction; syntax; tone; audience'],
      ['Argument', 'Claim; reasoning; evidence; line of reasoning; argument writing'],
      ['Synthesis & Research', 'Research; source evaluation; synthesis; nonfiction and multimodal texts']
    ]],
    ['apenglishlit', 'AP', 'English Language Arts', 'AP English Literature and Composition', [
      ['Poetry', 'Close reading; poetic form; literary devices; interpretation'],
      ['Prose Fiction', 'Structure; narration; setting; characterization; symbolism; theme'],
      ['Drama & Literary Argument', 'Drama; comparative analysis; evidence-based analytical writing']
    ]],
    ['apworld', 'AP', 'Social Studies', 'AP World History: Modern', [
      ['Global Tapestry & Empires', 'Global tapestry c. 1200–1450; land-based empires'],
      ['Connections & Revolutions', 'Transoceanic connections; revolutions; industrialization'],
      ['Imperialism & Conflict', 'Imperialism; global conflict; historical causation'],
      ['Cold War & Globalization', 'Cold War; decolonization; globalization; primary-source analysis']
    ]],
    ['apush', 'AP', 'Social Studies', 'AP United States History', [
      ['Colonies & Republic', 'Colonial America; Revolution; early republic'],
      ['Expansion & Division', 'Expansion; reform; Civil War; Reconstruction'],
      ['Industrialization & Global Conflict', 'Industrialization; Progressivism; world wars; Great Depression; New Deal'],
      ['Modern United States', 'Civil rights; modern America; historical argumentation']
    ]],
    ['apeuro', 'AP', 'Social Studies', 'AP European History', [
      ['Renaissance to Enlightenment', 'Renaissance; Reformation; absolutism; scientific revolution; Enlightenment'],
      ['Revolutions & Industry', 'French Revolution; industrialization; nationalism'],
      ['Imperialism & World Wars', 'Imperialism; World Wars; historical interpretation'],
      ['Cold War & Modern Europe', 'Cold War; European integration; modern Europe']
    ]],
    ['aphumangeo', 'AP', 'Social Studies', 'AP Human Geography', [
      ['Population & Culture', 'Population; migration; culture; cultural patterns'],
      ['Political & Economic Geography', 'Political geography; development; globalization'],
      ['Agriculture, Industry & Cities', 'Agriculture; rural land use; industrialization; cities; urban land use'],
      ['Environment & Sustainability', 'Environmental sustainability; human-environment interaction']
    ]],
    ['apcomparativegov', 'AP', 'Social Studies', 'AP Comparative Government and Politics', [
      ['Political Systems', 'Institutions; regimes; political culture'],
      ['Participation & Parties', 'Political participation; party systems; interest groups'],
      ['Rights & Policy', 'Public policy; civil rights; civil liberties'],
      ['Comparative Analysis', 'Comparing political systems; evidence-based analysis of core countries']
    ]],
    ['apusgov', 'AP', 'Social Studies', 'AP United States Government and Politics', [
      ['Foundations', 'Foundations of American democracy; constitutional principles'],
      ['Institutions & Policy', 'Interactions among branches; public policy'],
      ['Rights & Participation', 'Civil liberties; civil rights; political participation'],
      ['Beliefs & Analysis', 'Political ideologies; political beliefs; policy analysis']
    ]],
    ['apmacro', 'AP', 'Business & Economics', 'AP Macroeconomics', [
      ['Economic Foundations', 'Basic economic concepts; scarcity; opportunity cost'],
      ['Indicators & National Income', 'Economic indicators; national income; price determination'],
      ['Financial Sector & Policy', 'Financial sector; stabilization policies; monetary and fiscal policy'],
      ['Growth & Global Trade', 'Economic growth; international trade; international finance']
    ]],
    ['apmicro', 'AP', 'Business & Economics', 'AP Microeconomics', [
      ['Markets & Choice', 'Scarcity; markets; supply and demand; elasticity; consumer behavior'],
      ['Firms & Production', 'Producer behavior; production; costs'],
      ['Market Structures & Factors', 'Market structures; factor markets'],
      ['Market Failure & Policy', 'Market failure; externalities; government intervention']
    ]],
    ['apresearch', 'AP', 'Research & Capstone', 'AP Research', [
      ['Research Question & Literature', 'Independent research question; literature review; gap identification'],
      ['Method & Ethics', 'Methodology; research ethics; data collection'],
      ['Analysis & Argument', 'Data analysis; evidence-based argument; academic writing'],
      ['Presentation & Defense', 'Oral presentation; academic defense; final research paper']
    ]],
    ['apseminar', 'AP', 'Research & Capstone', 'AP Seminar', [
      ['Research & Evidence', 'Cross-curricular texts; argument analysis; evidence evaluation; research skills'],
      ['Team Project', 'Team research project; collaboration; presentation'],
      ['Individual Inquiry', 'Individual research-based essay; argument; individual presentation']
    ]],
    ['apfrench', 'AP', 'Languages', 'AP French Language and Culture', [
      ['Communication', 'Interpersonal communication; interpretive communication; presentational communication'],
      ['Themes & Culture', 'Families and communities; science and technology; beauty and aesthetics; contemporary life; identity; global challenges'],
      ['Cultural Comparison', 'Cultural comparison; listening; reading; speaking; writing']
    ]],
    ['apspanish', 'AP', 'Languages', 'AP Spanish Language and Culture', [
      ['Communication', 'Interpersonal communication; interpretive communication; presentational communication'],
      ['Themes & Culture', 'Families and communities; science and technology; beauty and aesthetics; contemporary life; identity; global challenges'],
      ['Exam Communication Tasks', 'Email reply; conversation; argumentative essay; oral presentation; cultural comparison']
    ]],
    ['apspanishlit', 'AP', 'Languages', 'AP Spanish Literature and Culture', [
      ['Literary Forms', 'Poetry; prose; drama; essays; literary terminology'],
      ['Context & Interpretation', 'Historical contexts; cultural contexts; close reading'],
      ['Comparative Analysis', 'Comparative textual analysis; evidence-based analytical essays']
    ]],
    ['apartdesign', 'AP', 'Arts & Media', 'AP Art and Design: 2-D, 3-D, and Drawing', [
      ['Sustained Investigation', 'Inquiry; experimentation; revision; sustained investigation'],
      ['Materials & Design', 'Materials and processes; design principles; composition'],
      ['Portfolio & Reflection', 'Documentation; portfolio development; written evidence of inquiry']
    ]],
    ['apmusictheory', 'AP', 'Arts & Media', 'AP Music Theory', [
      ['Sound & Notation', 'Pitch; rhythm; meter; scales; keys; intervals'],
      ['Harmony & Form', 'Chords; harmony; voice leading; part writing; musical form; analysis'],
      ['Aural Skills', 'Sight-singing; melodic dictation; harmonic dictation']
    ]],
    ['apcapstone', 'AP', 'Research & Capstone', 'AP Capstone: Seminar and Research', [
      ['AP Seminar', 'Cross-disciplinary research; argument; collaboration; presentation; individual research essay'],
      ['AP Research', 'Independent academic research; methodology; final paper; oral defense']
    ]]
  ];

  const authored = (id, title, unit, foundation, method, examplePrompt, steps, answer, questionPrompt, options, correct, explanation) => ({
    id, title, unit, published: true, time: '30 min',
    goals: ['Describe the concept using accurate vocabulary', 'Apply a repeatable method to a new example', 'Explain what the result means and what it does not mean'],
    vocabulary: [
      { term: 'Population', definition: 'The complete group of people or items a study aims to describe.' },
      { term: 'Sample', definition: 'A subset of the population from which observations are collected.' },
      { term: 'Variability', definition: 'The degree to which values differ from one another.' }
    ],
    sections: [
      { heading: 'Start with the idea', content: foundation },
      { heading: 'A step-by-step method', content: method },
      { heading: 'Interpret the result', content: 'State the population, parameter, and assumptions in context. A statistical conclusion describes uncertainty under a model; it does not guarantee what will happen in one particular sample.' }
    ],
    examples: [{ prompt: examplePrompt, steps, answer }],
    mistakes: ['Confusing a sample statistic with a population parameter.', 'Ignoring how the data were collected.', 'Treating a confidence procedure as a guarantee about one interval.'],
    interactive: { type: 'slider', label: 'Explore how a sample proportion changes.', min: 0, max: 100, value: 50 },
    practice: [
      { id: `${id}-practice-1`, type: 'multiple-choice', question: questionPrompt, options, answer: options[correct], explanation },
      { id: `${id}-practice-2`, type: 'multiple-choice', question: 'Which statement is the most careful interpretation?', options: ['The sample proves the result for every individual.', 'The method quantifies uncertainty about a population claim under its assumptions.', 'Random sampling removes all possible bias.', 'A statistic is identical to a parameter.'], answer: 'The method quantifies uncertainty about a population claim under its assumptions.', explanation: 'Statistical inference uses sample data to reason about a population while acknowledging sampling variability and assumptions.' }
    ],
    summary: ['Identify the population and the quantity of interest.', 'Check the data collection process and assumptions.', 'Report the result in context with appropriate uncertainty.'],
    cheatSheet: ['Population → parameter', 'Sample → statistic', 'Describe assumptions and uncertainty']
  });

  function makeCourse(map) {
    const [id, grade, area, title, unitDefinitions] = map;
    const units = unitDefinitions.map(([name, topics], index) => {
      const lessonEntries = topics.split(';').map((topic, topicIndex) => {
        const label = topic.trim();
        return {
          id: `${id}-${index + 1}-${topicIndex + 1}`,
          title: label.charAt(0).toUpperCase() + label.slice(1),
          unit: name,
          subunit: '',
          published: false
        };
      });
      const subunits = [];
      for (let start = 0; start < lessonEntries.length; start += 2) {
        const group = lessonEntries.slice(start, start + 2);
        const subunitName = `${group[0].title}${group.length > 1 ? ` & ${group[1].title}` : ''}`;
        group.forEach(lesson => { lesson.subunit = subunitName; });
        subunits.push({ name: subunitName, lessonIds: group.map(lesson => lesson.id) });
      }
      return {
        name,
        summary: lessonEntries.map(entry => entry.title).join('; ') + '.',
        lessons: lessonEntries.length,
        hours: Math.max(3, lessonEntries.length * 2),
        subunits,
        entries: lessonEntries
      };
    });
    const lessons = units.flatMap(unit => unit.entries);
    return {
      id, grade, area, title,
      code: id.toUpperCase(),
      textbook: 'Curriculum map based on the topic outline shared for this workspace. Course sequencing and local expectations may vary.',
      status: 'Curriculum map',
      summary: `Explore the mapped ${grade === 'AP' ? 'AP' : `Grade ${grade}`} topics in ${title}. Fully authored topics include beginner explanations, worked examples, and interactive practice; mapped topics without lesson content are clearly marked.`,
      bigIdeas: [{ title: 'Build connected understanding across the course.', detail: 'Move from core concepts to evidence, applications, and reflection.' }],
      competencies: [
        { label: 'Reason and analyze', detail: 'Use evidence, models, and disciplinary methods to examine questions.' },
        { label: 'Communicate and apply', detail: 'Explain conclusions clearly and connect ideas to new contexts.' }
      ],
      learningStandards: units.map(unit => ({ name: unit.name, elaboration: unit.summary })),
      units: units.map(({ entries, ...unit }) => unit),
      prerequisites: ['Begin with the lesson foundations; no advanced course knowledge is assumed in published StudyBC lessons.'],
      leadsTo: ['Further study in this subject area', 'Related courses and interdisciplinary learning'],
      lessons
    };
  }

  const mappedCourses = maps.map(makeCourse);
  const apStats = mappedCourses.find(course => course.id === 'apstatistics');
  const apStatsAuthored = [
    authored(
      'apstats-sampling-distributions', 'Sampling Distributions and the Central Limit Idea', 'Probability',
      'A statistic such as a sample mean changes from sample to sample. The probability distribution of that statistic across repeated samples is its sampling distribution. It describes the behavior of a method, not the distribution of individual observations.',
      'Name the population and statistic; describe how repeated random samples would be drawn; identify the center and spread of the statistic; check conditions such as randomization and an adequate sample size; interpret the sampling distribution in context.',
      'A population has mean 50 and standard deviation 12. For random samples of size 36, describe the sampling distribution of the sample mean.',
      ['The center of the sample-mean distribution is the population mean, 50.', 'The standard error is σ/√n = 12/√36 = 12/6 = 2.', 'If the population is normal, or the sample size is sufficiently large under appropriate conditions, the distribution of sample means is approximately normal.'],
      'Approximately normal with mean 50 and standard error 2, under the stated sampling conditions.',
      'A population has σ = 20 and random samples of size 100 are taken. What is the standard error of the sample mean?',
      ['0.2', '2', '20', '200'], 1,
      'The standard error is σ/√n = 20/√100 = 20/10 = 2. This describes sample-to-sample variability of the mean, not the spread of individual observations.'
    ),
    authored(
      'apstats-confidence-intervals', 'Confidence Intervals for a Population Proportion', 'Statistical Inference',
      'A sample proportion estimates an unknown population proportion. A confidence interval combines that estimate with a margin of error to give a range of plausible population values using a procedure with a stated long-run success rate.',
      'Identify the population proportion p and sample statistic p-hat; verify random sampling or assignment as appropriate and success-failure conditions; compute p-hat ± critical value × standard error; interpret the interval and confidence level in context.',
      'In a random sample of 200 students, 120 report using public transit to get to school. Construct an approximate 95% confidence interval for the population proportion.',
      ['Compute p-hat = 120/200 = 0.60.', 'Standard error ≈ √[0.60(0.40)/200] ≈ 0.0346.', 'For a 95% interval, use z* ≈ 1.96; margin of error ≈ 1.96(0.0346) ≈ 0.0678.', 'The interval is 0.60 ± 0.0678, or about (0.532, 0.668).'],
      'Approximately (0.532, 0.668), subject to the random-sampling and large-count conditions.',
      'A 95% confidence interval for a population proportion is (0.41, 0.53). Which interpretation is appropriate?',
      ['There is a 95% chance that the fixed population proportion changes inside this interval.', 'About 95% of individual observations lie in this interval.', 'The method used to build intervals captures the fixed population proportion in about 95% of repeated samples.', '95% of the sample has values between 0.41 and 0.53.'], 2,
      'The confidence level describes the long-run success rate of the interval-producing method. The population proportion is fixed; the interval varies from sample to sample.'
    )
  ];
  const authoredUnits = new Set();
  apStats.lessons = apStats.lessons.map(entry => {
    const authoredLesson = apStatsAuthored.find(item => item.unit === entry.unit && !authoredUnits.has(item.unit));
    if (authoredLesson) authoredUnits.add(authoredLesson.unit);
    return authoredLesson || entry;
  });
  apStats.status = 'In progress';
  apStats.units = apStats.units.map(unit => {
    const count = apStats.lessons.filter(lesson => lesson.unit === unit.name).length;
    return { ...unit, lessons: count };
  });

  const existingCourses = window.STUDYBC_DATA.courses;
  const additions = [];
  for (const mapped of mappedCourses) {
    const existing = existingCourses.find(course => course.id === mapped.id);
    if (!existing) {
      additions.push(mapped);
      continue;
    }

    const mappedLessons = mapped.lessons.map(entry => {
      const authoredLesson = existing.lessons.find(lesson =>
        lesson.unit === entry.unit && lesson.title.toLowerCase() === entry.title.toLowerCase()
      );
      return authoredLesson || entry;
    });
    const authoredUnits = existing.units.filter(unit => !mapped.units.some(mappedUnit => mappedUnit.name === unit.name));
    existing.units = [...mapped.units, ...authoredUnits].map(unit => {
      const count = [...existing.lessons, ...mappedLessons].filter(lesson => lesson.unit === unit.name).length;
      return { ...unit, lessons: count };
    });
    existing.lessons = [...existing.lessons, ...mappedLessons.filter(entry => !existing.lessons.includes(entry))];
    existing.learningStandards = [...mapped.learningStandards, ...existing.learningStandards.filter(item => !mapped.units.some(unit => unit.name === item.name))];
    existing.status = 'In progress';
    existing.summary += ' Curriculum map topics are included; unwritten topics are clearly labeled.';
  }
  window.STUDYBC_DATA.courses.push(...additions);
  window.STUDYBC_DATA.areas = [...new Set(window.STUDYBC_DATA.courses.map(course => course.area))]
    .map(title => ({ id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), title }));
})();
