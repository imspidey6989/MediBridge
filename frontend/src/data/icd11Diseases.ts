// ICD-11 Disease Database
// This contains common diseases with their ICD-11 codes and descriptions

export interface ICD11Disease {
  code: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
}

export const icd11Diseases: ICD11Disease[] = [
  // Infectious diseases
  {
    code: "1A00",
    title: "Cholera",
    description: "Acute diarrheal infection caused by Vibrio cholerae",
    category: "Infectious Diseases",
    keywords: ["cholera", "vibrio", "diarrhea", "dehydration", "acute"],
  },
  {
    code: "1A01",
    title: "Typhoid fever",
    description: "Systemic infection caused by Salmonella Typhi",
    category: "Infectious Diseases",
    keywords: ["typhoid", "fever", "salmonella", "systemic", "infection"],
  },
  {
    code: "1A02",
    title: "Paratyphoid fever",
    description: "Systemic infection caused by Salmonella Paratyphi",
    category: "Infectious Diseases",
    keywords: ["paratyphoid", "fever", "salmonella", "systemic"],
  },
  {
    code: "1A40",
    title: "Streptococcal sepsis",
    description: "Sepsis due to streptococcal infection",
    category: "Infectious Diseases",
    keywords: ["streptococcal", "sepsis", "strep", "blood", "infection"],
  },
  {
    code: "1A41",
    title: "Staphylococcal sepsis",
    description: "Sepsis due to staphylococcal infection",
    category: "Infectious Diseases",
    keywords: ["staphylococcal", "sepsis", "staph", "blood", "infection"],
  },
  {
    code: "1B10",
    title: "Tuberculosis of respiratory system",
    description: "Tuberculosis affecting the lungs and respiratory tract",
    category: "Infectious Diseases",
    keywords: ["tuberculosis", "tb", "lung", "respiratory", "cough", "chest"],
  },
  {
    code: "1B11",
    title: "Tuberculosis of nervous system",
    description: "Tuberculosis affecting the central nervous system",
    category: "Infectious Diseases",
    keywords: ["tuberculosis", "tb", "nervous", "brain", "meningitis"],
  },
  {
    code: "1B20",
    title: "Plague",
    description: "Infection caused by Yersinia pestis",
    category: "Infectious Diseases",
    keywords: ["plague", "yersinia", "bubonic", "pneumonic"],
  },
  {
    code: "1C62",
    title: "COVID-19",
    description: "Disease caused by SARS-CoV-2 coronavirus",
    category: "Infectious Diseases",
    keywords: ["covid", "coronavirus", "sars-cov-2", "covid-19", "pandemic"],
  },

  // Cardiovascular diseases
  {
    code: "BA00",
    title: "Heart failure",
    description: "Inability of the heart to pump blood effectively",
    category: "Cardiovascular",
    keywords: ["heart failure", "cardiac", "pump", "dyspnea", "edema"],
  },
  {
    code: "BA01",
    title: "Hypertensive heart disease",
    description: "Heart disease caused by high blood pressure",
    category: "Cardiovascular",
    keywords: ["hypertensive", "heart", "high blood pressure", "cardiac"],
  },
  {
    code: "BA02",
    title: "Hypertensive renal disease",
    description: "Kidney disease caused by high blood pressure",
    category: "Cardiovascular",
    keywords: ["hypertensive", "renal", "kidney", "high blood pressure"],
  },
  {
    code: "BA10",
    title: "Acute myocardial infarction",
    description: "Heart attack due to blocked coronary artery",
    category: "Cardiovascular",
    keywords: [
      "heart attack",
      "myocardial infarction",
      "mi",
      "chest pain",
      "coronary",
    ],
  },
  {
    code: "BA11",
    title: "Subsequent myocardial infarction",
    description: "Recurrent heart attack",
    category: "Cardiovascular",
    keywords: [
      "recurrent",
      "heart attack",
      "myocardial infarction",
      "subsequent",
    ],
  },
  {
    code: "BA20",
    title: "Angina pectoris",
    description: "Chest pain due to reduced blood flow to heart",
    category: "Cardiovascular",
    keywords: ["angina", "chest pain", "coronary", "ischemia"],
  },
  {
    code: "BA21",
    title: "Acute coronary syndrome",
    description: "Acute presentation of coronary artery disease",
    category: "Cardiovascular",
    keywords: ["acute coronary syndrome", "acs", "unstable angina", "coronary"],
  },

  // Respiratory diseases
  {
    code: "CA20",
    title: "Acute bronchitis",
    description: "Acute inflammation of the bronchi",
    category: "Respiratory",
    keywords: ["bronchitis", "acute", "cough", "bronchi", "inflammation"],
  },
  {
    code: "CA21",
    title: "Acute bronchiolitis",
    description: "Acute inflammation of the bronchioles",
    category: "Respiratory",
    keywords: ["bronchiolitis", "acute", "small airways", "infants"],
  },
  {
    code: "CA22",
    title: "Acute upper respiratory infection",
    description: "Common cold and upper respiratory tract infections",
    category: "Respiratory",
    keywords: ["upper respiratory", "cold", "uri", "runny nose", "sore throat"],
  },
  {
    code: "CA40",
    title: "Pneumonia",
    description: "Infection of the lungs",
    category: "Respiratory",
    keywords: ["pneumonia", "lung infection", "chest", "fever", "cough"],
  },
  {
    code: "CA41",
    title: "Viral pneumonia",
    description: "Pneumonia caused by viral infection",
    category: "Respiratory",
    keywords: ["viral pneumonia", "virus", "lung", "infection"],
  },
  {
    code: "CA42",
    title: "Bacterial pneumonia",
    description: "Pneumonia caused by bacterial infection",
    category: "Respiratory",
    keywords: ["bacterial pneumonia", "bacteria", "lung", "infection"],
  },
  {
    code: "CA80",
    title: "Asthma",
    description: "Chronic respiratory condition with airway inflammation",
    category: "Respiratory",
    keywords: [
      "asthma",
      "wheeze",
      "shortness of breath",
      "allergic",
      "chronic",
    ],
  },
  {
    code: "CA81",
    title: "Status asthmaticus",
    description: "Severe asthma attack not responding to treatment",
    category: "Respiratory",
    keywords: [
      "status asthmaticus",
      "severe asthma",
      "emergency",
      "bronchospasm",
    ],
  },

  // Digestive diseases
  {
    code: "DA20",
    title: "Gastritis",
    description: "Inflammation of the stomach lining",
    category: "Digestive",
    keywords: ["gastritis", "stomach", "inflammation", "abdominal pain"],
  },
  {
    code: "DA21",
    title: "Duodenitis",
    description: "Inflammation of the duodenum",
    category: "Digestive",
    keywords: ["duodenitis", "duodenum", "inflammation", "peptic"],
  },
  {
    code: "DA40",
    title: "Peptic ulcer",
    description: "Ulcer in stomach or duodenum",
    category: "Digestive",
    keywords: [
      "peptic ulcer",
      "stomach ulcer",
      "duodenal ulcer",
      "abdominal pain",
    ],
  },
  {
    code: "DA41",
    title: "Gastric ulcer",
    description: "Ulcer in the stomach",
    category: "Digestive",
    keywords: ["gastric ulcer", "stomach ulcer", "abdominal pain", "bleeding"],
  },
  {
    code: "DA42",
    title: "Duodenal ulcer",
    description: "Ulcer in the duodenum",
    category: "Digestive",
    keywords: ["duodenal ulcer", "duodenum", "abdominal pain", "peptic"],
  },
  {
    code: "DA60",
    title: "Appendicitis",
    description: "Inflammation of the appendix",
    category: "Digestive",
    keywords: ["appendicitis", "appendix", "right lower quadrant", "mcburney"],
  },
  {
    code: "DA90",
    title: "Irritable bowel syndrome",
    description: "Functional bowel disorder",
    category: "Digestive",
    keywords: ["irritable bowel", "ibs", "functional", "bowel", "cramping"],
  },

  // Diabetes and endocrine
  {
    code: "5A10",
    title: "Type 1 diabetes mellitus",
    description: "Insulin-dependent diabetes mellitus",
    category: "Endocrine",
    keywords: [
      "type 1 diabetes",
      "insulin dependent",
      "diabetes",
      "autoimmune",
    ],
  },
  {
    code: "5A11",
    title: "Type 2 diabetes mellitus",
    description: "Non-insulin-dependent diabetes mellitus",
    category: "Endocrine",
    keywords: [
      "type 2 diabetes",
      "diabetes",
      "insulin resistance",
      "metabolic",
    ],
  },
  {
    code: "5A12",
    title: "Gestational diabetes mellitus",
    description: "Diabetes during pregnancy",
    category: "Endocrine",
    keywords: ["gestational diabetes", "pregnancy", "diabetes", "maternal"],
  },
  {
    code: "5A20",
    title: "Diabetic ketoacidosis",
    description: "Serious complication of diabetes",
    category: "Endocrine",
    keywords: [
      "diabetic ketoacidosis",
      "dka",
      "ketones",
      "acidosis",
      "emergency",
    ],
  },
  {
    code: "5A30",
    title: "Hypoglycemia",
    description: "Low blood sugar",
    category: "Endocrine",
    keywords: ["hypoglycemia", "low blood sugar", "glucose", "insulin"],
  },
  {
    code: "5A40",
    title: "Thyroid disorders",
    description: "Disorders of thyroid function",
    category: "Endocrine",
    keywords: ["thyroid", "hyperthyroid", "hypothyroid", "goiter"],
  },

  // Mental health
  {
    code: "6A20",
    title: "Bipolar disorder",
    description: "Mood disorder with manic and depressive episodes",
    category: "Mental Health",
    keywords: ["bipolar", "manic", "depression", "mood", "psychiatric"],
  },
  {
    code: "6A40",
    title: "Anxiety disorders",
    description: "Disorders characterized by excessive anxiety",
    category: "Mental Health",
    keywords: ["anxiety", "panic", "phobia", "worry", "fear"],
  },
  {
    code: "6A41",
    title: "Panic disorder",
    description: "Recurrent panic attacks",
    category: "Mental Health",
    keywords: ["panic disorder", "panic attacks", "anxiety", "fear"],
  },
  {
    code: "6A60",
    title: "Major depressive disorder",
    description: "Persistent depressive mood disorder",
    category: "Mental Health",
    keywords: ["depression", "major depressive", "sad", "mood", "psychiatric"],
  },
  {
    code: "6A61",
    title: "Recurrent depressive disorder",
    description: "Recurrent episodes of depression",
    category: "Mental Health",
    keywords: ["recurrent depression", "episodes", "mood", "psychiatric"],
  },

  // Musculoskeletal
  {
    code: "FA20",
    title: "Osteoarthritis",
    description: "Degenerative joint disease",
    category: "Musculoskeletal",
    keywords: [
      "osteoarthritis",
      "arthritis",
      "joint",
      "degenerative",
      "cartilage",
    ],
  },
  {
    code: "FA21",
    title: "Rheumatoid arthritis",
    description: "Autoimmune inflammatory arthritis",
    category: "Musculoskeletal",
    keywords: ["rheumatoid arthritis", "autoimmune", "inflammatory", "joint"],
  },
  {
    code: "FA40",
    title: "Osteoporosis",
    description: "Decreased bone density",
    category: "Musculoskeletal",
    keywords: ["osteoporosis", "bone density", "fracture", "calcium"],
  },
  {
    code: "FA50",
    title: "Fibromyalgia",
    description: "Chronic widespread musculoskeletal pain",
    category: "Musculoskeletal",
    keywords: ["fibromyalgia", "chronic pain", "muscle", "fatigue"],
  },

  // Injuries
  {
    code: "NA40",
    title: "Fracture of femur",
    description: "Broken thigh bone",
    category: "Injury",
    keywords: ["fracture", "femur", "thigh", "broken bone", "trauma"],
  },
  {
    code: "NA41",
    title: "Fracture of tibia or fibula",
    description: "Broken shin bone",
    category: "Injury",
    keywords: ["fracture", "tibia", "fibula", "shin", "broken bone"],
  },
  {
    code: "NA50",
    title: "Sprain of ankle",
    description: "Stretched or torn ankle ligaments",
    category: "Injury",
    keywords: ["sprain", "ankle", "ligament", "twist", "injury"],
  },
  {
    code: "NA60",
    title: "Concussion",
    description: "Mild traumatic brain injury",
    category: "Injury",
    keywords: ["concussion", "head injury", "brain", "trauma", "mild"],
  },

  // General health checks
  {
    code: "QA02",
    title: "General medical examination",
    description: "Routine health check-up",
    category: "General",
    keywords: ["checkup", "examination", "routine", "physical", "health check"],
  },
  {
    code: "QA03",
    title: "Laboratory examination",
    description: "Medical laboratory tests",
    category: "General",
    keywords: ["lab", "laboratory", "blood test", "urine", "examination"],
  },
  {
    code: "QA04",
    title: "Radiological examination",
    description: "Medical imaging studies",
    category: "General",
    keywords: ["radiology", "x-ray", "ct", "mri", "imaging", "scan"],
  },
];

// Search function to find diseases by name/keyword
export const searchICD11Diseases = (query: string): ICD11Disease[] => {
  if (!query || query.length < 2) return [];

  const searchTerm = query.toLowerCase().trim();

  return icd11Diseases
    .filter(
      (disease) =>
        disease.title.toLowerCase().includes(searchTerm) ||
        disease.description.toLowerCase().includes(searchTerm) ||
        disease.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm)
        ) ||
        disease.code.toLowerCase().includes(searchTerm)
    )
    .slice(0, 10); // Limit to top 10 results
};

// Get disease by exact code
export const getICD11DiseaseByCode = (
  code: string
): ICD11Disease | undefined => {
  return icd11Diseases.find((disease) => disease.code === code);
};
