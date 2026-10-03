/**
 * AI Service for Study Resource Finder
 * High-performance rule-based Mock AI engine matching SRS Section 6.4.
 * Simulates AI thinking delay without any external paid API or key.
 */

// Delay helper to simulate natural AI inference
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Curated knowledge base for common academic queries
 */
const academicDatabase = {
  "python inheritance": {
    topic: "Python Inheritance",
    difficulty: "Beginner",
    summary: "Inheritance is a core principle of Object-Oriented Programming (OOP) in Python that allows a new class (derived/child class) to inherit attributes and methods from an existing class (base/parent class). It promotes code reusability, structural consistency, and polymorphism.",
    keyConcepts: [
      "Base Class (Parent): The foundational class providing shared attributes and methods.",
      "Derived Class (Child): The specialized subclass that inherits and extends base functionality.",
      "Method Overriding: Redefining parent methods in the child class for specialized behavior.",
      "super() Function: Built-in proxy providing direct access to parent methods and constructor initialization."
    ],
    importantPoints: [
      "Python natively supports Single, Multiple, Multilevel, Hierarchical, and Hybrid inheritance.",
      "Always call super().__init__() within derived class constructors to ensure proper parent attribute initialization.",
      "Method Resolution Order (MRO) dictates the method lookup hierarchy following C3 Linearization.",
      "Inheritance establishes an 'is-a' relationship (e.g., a Car is a Vehicle)."
    ],
    example: `# Parent Class\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return f"{self.name} makes a sound."\n\n# Child Class inheriting from Animal\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)  # Initialize parent attributes\n        self.breed = breed\n\n    def speak(self):\n        return f"{self.name} ({self.breed}) barks: Woof! Woof!"\n\n# Instantiate and run\npet = Dog("Buddy", "Golden Retriever")\nprint(pet.speak())  # Output: Buddy (Golden Retriever) barks: Woof! Woof!`,
    practiceQuestions: [
      "What is the distinct difference between single, multiple, and multilevel inheritance in Python?",
      "How does Python's Method Resolution Order (MRO) resolve naming collisions in diamond inheritance?",
      "Why is composition often preferred over deep inheritance hierarchies in software architecture?",
      "Explain the exact purpose and mechanics of super().__init__() in child class constructors."
    ],
    relatedTopics: [
      "Python Polymorphism",
      "Object-Oriented Programming (OOP)",
      "Method Resolution Order (MRO)",
      "Encapsulation & Abstraction",
      "Python Magic & Dunder Methods"
    ],
    learningPath: [
      "Master Python classes, object instances, and the __init__ constructor.",
      "Implement single inheritance and inspect inherited attributes.",
      "Learn method overriding and utilize super() for clean delegation.",
      "Explore multiple inheritance, mixins, and the __mro__ attribute.",
      "Design a real-world enterprise domain model applying OOP design patterns."
    ]
  },
  "dbms normalization": {
    topic: "DBMS Normalization",
    difficulty: "Intermediate",
    summary: "DBMS Normalization is the systematic technique of organizing relational database tables to minimize data redundancy and eliminate anomalies (insertion, update, and deletion anomalies) while preserving data integrity.",
    keyConcepts: [
      "First Normal Form (1NF): Enforces atomic (indivisible) column values and unique records.",
      "Second Normal Form (2NF): Meets 1NF and removes partial dependencies on composite primary keys.",
      "Third Normal Form (3NF): Meets 2NF and removes transitive dependencies (non-key depending on non-key).",
      "Boyce-Codd Normal Form (BCNF): Stricter variant of 3NF where every determinant must be a candidate key."
    ],
    importantPoints: [
      "Significantly minimizes storage redundancy and ensures ACID compliance across transactions.",
      "Prevents modification anomalies where editing a single entity requires modifying dozens of rows.",
      "Involves decomposing wide tables into narrower related tables linked through Foreign Keys.",
      "Excessive normalization can degrade read query throughput due to complex multi-table SQL JOINs."
    ],
    example: `-- Unnormalized table prone to insertion/deletion anomalies:\n-- StudentsCourses(StudentID, StudentName, CourseID, CourseName, Instructor)\n\n-- Decomposed into 3NF Normalized Schema:\nCREATE TABLE Students (\n    StudentID INT PRIMARY KEY,\n    StudentName VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE Courses (\n    CourseID VARCHAR(10) PRIMARY KEY,\n    CourseName VARCHAR(100) NOT NULL,\n    Instructor VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE Enrollments (\n    StudentID INT,\n    CourseID VARCHAR(10),\n    EnrollDate DATE DEFAULT CURRENT_DATE,\n    PRIMARY KEY (StudentID, CourseID),\n    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),\n    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)\n);`,
    practiceQuestions: [
      "What constitutes a partial dependency, and why does 2NF mandate its elimination?",
      "Under what scenario would a table be in 3NF but fail to satisfy BCNF?",
      "Explain the fundamental trade-offs between full normalization and selective denormalization in OLAP systems.",
      "Given the functional dependencies {A -> B, B -> C}, determine the normal form and demonstrate decomposition."
    ],
    relatedTopics: [
      "Functional Dependencies",
      "Candidate Keys and Superkeys",
      "Relational Algebra & SQL JOINs",
      "ACID Properties & Transactions",
      "Database Indexing Strategies"
    ],
    learningPath: [
      "Grasp relational schema design, primary keys, and foreign key constraints.",
      "Learn to formally identify and compute closures of Functional Dependencies.",
      "Master the progression from unnormalized tables through 1NF, 2NF, and 3NF.",
      "Study Boyce-Codd Normal Form (BCNF) and multi-valued dependencies (4NF).",
      "Practice database refactoring on complex university or e-commerce schemas."
    ]
  },
  "photosynthesis": {
    topic: "Photosynthesis",
    difficulty: "Beginner",
    summary: "Photosynthesis is the biochemical process by which green plants, algae, and cyanobacteria convert light energy from the sun into chemical energy in the form of glucose, utilizing carbon dioxide and water while producing oxygen as a vital byproduct.",
    keyConcepts: [
      "Chloroplasts & Chlorophyll: The plant organelles and green pigments responsible for capturing photons.",
      "Light-Dependent Reactions: Take place in thylakoid membranes to synthesize ATP and NADPH via photolysis.",
      "Calvin Cycle (Light-Independent): Occurs in the stroma to fix carbon dioxide into three-carbon sugars.",
      "Stomata: Microscopic leaf pores facilitating atmospheric gas exchange (CO2 absorption, O2 emission)."
    ],
    importantPoints: [
      "Overall Chemical Equation: 6CO2 + 6H2O + Light Energy -> C6H12O6 + 6O2.",
      "Water molecules are split in Photosystem II, liberating molecular oxygen into Earth's atmosphere.",
      "The rate of photosynthesis is primarily governed by light irradiance, CO2 concentration, and ambient temperature.",
      "Provides the primary biomass and energy basis for virtually all terrestrial and marine ecosystems."
    ],
    example: `Biochemical Reaction Pathway:\n\n1. Reactants Input:\n   - 6 Molecules of Carbon Dioxide (from Atmosphere via Stomata)\n   - 6 Molecules of Water (from Soil via Xylem Vessels)\n   - Photons (Solar Irradiance captured by Chlorophyll A/B)\n\n2. Enzyme Catalysis:\n   - RuBisCO fixes CO2 in the Calvin-Benson Cycle\n   - Photolysis of H2O generates protons and electrons\n\n3. Net Outputs:\n   - 1 Molecule of Glucose [C6H12O6] (Cellular Energy & Cellulose)\n   - 6 Molecules of Oxygen [6O2] (Released into Biosphere)`,
    practiceQuestions: [
      "What is the precise role of Photosystem II and water photolysis in thylakoid membranes?",
      "How does the enzyme RuBisCO facilitate carbon fixation, and what is photorespiration?",
      "Compare the physiological adaptations of C3, C4, and CAM plants in high-temperature environments.",
      "How do environmental limiting factors such as photon flux density alter the rate of carbohydrate production?"
    ],
    relatedTopics: [
      "Cellular Respiration & Krebs Cycle",
      "Chloroplast Ultrastructure",
      "ATP Synthase & Chemiosmosis",
      "Plant Physiology & Transpiration",
      "Global Carbon Cycle"
    ],
    learningPath: [
      "Study plant cellular anatomy and chloroplast internal membrane structure.",
      "Understand photon absorption, pigment excitation, and the Z-scheme electron transport chain.",
      "Examine ATP synthesis via proton gradients across the thylakoid lumen.",
      "Trace the 3 stages of the Calvin Cycle: Carbon Fixation, Reduction, and RuBP Regeneration.",
      "Compare C3, C4, and CAM ecological strategies under drought conditions."
    ]
  }
};

/**
 * Generate academic study resources mock matching SRS requirements
 */
export const getStudyResources = async (queryTopic) => {
  await delay(800); // 800ms natural simulation per specification

  const clean = queryTopic ? queryTopic.trim() : '';
  if (!clean) {
    throw new Error('Please enter a topic to search.');
  }

  const lower = clean.toLowerCase();

  // Check predefined catalog
  for (const key of Object.keys(academicDatabase)) {
    if (lower.includes(key) || key.includes(lower)) {
      return academicDatabase[key];
    }
  }

  // Dynamic synthesizer for any other academic topic
  let difficulty = 'Beginner';
  if (lower.includes('advanced') || lower.includes('tree') || lower.includes('graph') || lower.includes('compiler') || lower.includes('quantum') || lower.includes('neural')) {
    difficulty = 'Advanced';
  } else if (lower.includes('intermediate') || lower.includes('system') || lower.includes('network') || lower.includes('algorithm') || lower.includes('react')) {
    difficulty = 'Intermediate';
  }

  const isCode = lower.includes('code') || lower.includes('javascript') || lower.includes('react') || lower.includes('node') || lower.includes('c++') || lower.includes('java') || lower.includes('html') || lower.includes('css') || lower.includes('sql') || lower.includes('git');

  const cap = clean.charAt(0).toUpperCase() + clean.slice(1);

  return {
    topic: cap,
    difficulty,
    summary: `${cap} is an important academic topic providing foundational principles and methodology. Mastering ${cap} gives students practical problem-solving capability, theoretical clarity, and readiness for exams and technical interviews.`,
    keyConcepts: [
      `Foundational Principles of ${cap}: The baseline axioms and defining characteristics that govern this topic.`,
      `Core Architecture & Structure: How the components and elements within ${cap} interact systematically.`,
      `Methodologies & Techniques: Standard algorithms, theorems, or procedures used to analyze and solve problems in ${cap}.`,
      `Practical Applications: How ${cap} is leveraged in industry, modern engineering, and real-world scenarios.`
    ],
    importantPoints: [
      `Grasp the core terminology and mathematical/computational foundations of ${cap}.`,
      `Understand boundary conditions, operational assumptions, and edge cases.`,
      `Evaluate trade-offs between computational complexity, speed, and resource efficiency.`,
      `Consistently practice with standard problem sets and illustrative implementations.`
    ],
    example: isCode
      ? `// Practical Demonstration for ${cap}\n// Standard syntax pattern and clean implementation\n\nfunction explore${cap.replace(/[^a-zA-Z0-9]/g, '')}() {\n    console.log("Initializing ${cap} demonstration...");\n    const dataPoints = [10, 20, 30, 40, 50];\n    \n    // Transformation logic\n    const filtered = dataPoints.filter(val => val > 20);\n    console.log("Processed result:", filtered);\n    return filtered;\n}\n\nexplore${cap.replace(/[^a-zA-Z0-9]/g, '')}();`
      : `Real-World Application Example:\nConsider how ${cap} operates in practice:\n1. Initial state and boundary inputs are measured.\n2. The system applies the core mechanics of ${cap}.\n3. A verified equilibrium or desired outcome is achieved.\n\nThis principle ensures system reliability, safety, and reproducible scientific outcomes.`,
    practiceQuestions: [
      `What are the foundational principles governing ${cap}, and why are they significant?`,
      `How does ${cap} address edge cases or anomalous scenarios in practical problem-solving?`,
      `Compare and contrast ${cap} with closely related concepts in this discipline.`,
      `What are the most common misconceptions students encounter when learning ${cap}?`
    ],
    relatedTopics: [
      `Introduction to ${cap}`,
      `Advanced Applications in ${cap}`,
      `Optimization Techniques for ${cap}`,
      `Theoretical Foundations`,
      `Practical Problem Solving`
    ],
    learningPath: [
      `Phase 1: Understand definitions, historical context, and core terminology of ${cap}.`,
      `Phase 2: Study fundamental mechanics, equations, or code architectures.`,
      `Phase 3: Work through guided walkthroughs and standard illustrative examples.`,
      `Phase 4: Solve practice questions, quizzes, and past examination problems.`,
      `Phase 5: Apply ${cap} to an end-to-end practical project or advanced research topic.`
    ]
  };
};

/**
 * Employability & Career Extension Helpers (Requested in prompt)
 */
export const getCareerRecommendations = async (profile) => {
  await delay(800);
  return [
    { title: "Full Stack Engineer", matchScore: 94, reason: "Strong alignment with modern web frameworks, API design, and database systems." },
    { title: "AI/ML Solutions Developer", matchScore: 88, reason: "Excellent fit for generative AI prompts, data pipelines, and intelligent tools." },
    { title: "Systems & Cloud Architect", matchScore: 82, reason: "Strong grasp of stateless microservices, distributed persistence, and web protocols." }
  ];
};

export const generateRoadmap = async (career) => {
  await delay(800);
  return [
    { step: 1, title: "Core Fundamentals", duration: "Weeks 1-3", topics: ["Data Structures", "Algorithms", "Version Control"] },
    { step: 2, title: "Modern Frameworks", duration: "Weeks 4-7", topics: ["React.js", "Express.js", "State Management"] },
    { step: 3, title: "Production Engineering", duration: "Weeks 8-10", topics: ["Security", "Testing", "Cloud Deployment"] }
  ];
};

export const analyzeReadiness = async (skills = [], jobDescription = "") => {
  await delay(800);
  return {
    score: 87,
    matchedSkills: ["JavaScript", "React", "Node.js", "REST APIs"],
    gapSkills: ["Docker Containerization", "CI/CD Pipelines"],
    recommendation: "Solid technical readiness for entry-level and junior engineering roles."
  };
};

export const answerMentorQuestion = async (question) => {
  await delay(800);
  return {
    question,
    answer: "Focus on building solid end-to-end projects with clear documentation, unit testing, and modular architecture. Real-world codebases with well-designed schemas and error handling stand out to technical interviewers."
  };
};
