import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Check } from "lucide-react";
// Comprehensive disease data from ICD-11 with AYUSH translations
const customDiseases = [
  {
    id: 1,
    name: "Chicken pox",
    icdCode: "1E90",
    namaste: "chaechak",
    symptoms: ["fever", "rash", "itching", "fatigue"],
  },
  {
    id: 2,
    name: "Goiter",
    icdCode: "5A01.Z",
    namaste: "Ghengh",
    symptoms: ["neck swelling", "difficulty swallowing", "cough", "hoarseness"],
  },
  {
    id: 3,
    name: "Hypertension",
    icdCode: "BA00.0",
    namaste: "Rakta Gata Vata",
    symptoms: ["Headache", "Breathlessness", "Nosebleed", "Dizziness"],
  },
  {
    id: 4,
    name: "Psoriasis",
    icdCode: "EB05.1",
    namaste: "Eka Kushtha",
    symptoms: ["Itching", "Scaling", "Cracks", "Swelling"],
  },
  {
    id: 5,
    name: "Arthritis",
    icdCode: "FA01.0",
    namaste: "Sandhivata",
    symptoms: ["Pain", "Swelling", "Stiffness", "Immobility"],
  },
  {
    id: 6,
    name: "Chronic Sinusitis",
    icdCode: "CA0C.1",
    namaste: "Dushta Pratishyaya",
    symptoms: ["Congestion", "Discharge", "Facialpain", "Fatigue"],
  },
  {
    id: 7,
    name: "Migraine",
    icdCode: "8A80",
    namaste: "Ardhavabhedaka",
    symptoms: ["Headache", "Nausea", "Light", "Vision"],
  },
  {
    id: 8,
    name: "Allergic Rhinitis",
    icdCode: "CA08",
    namaste: "Pratishyaya",
    symptoms: ["Sneezing", "Runny", "Itchy", "Watery"],
  },
  {
    id: 9,
    name: "Diabetes Type 2",
    icdCode: "5A11",
    namaste: "Madhumeha",
    symptoms: ["Thirst", "Urination", "Hunger", "Fatigue"],
  },
  {
    id: 10,
    name: "Asthma",
    icdCode: "CA23",
    namaste: "Tamaka Shwasa",
    symptoms: ["Breathless", "Wheeze", "Cough", "Tightness"],
  },
  {
    id: 12,
    name: "Tuberculosis",
    icdCode: "1B11",
    namaste: "Rajayakshma",
    symptoms: ["Cough", "Blood", "Fever", "Weightloss"],
  },
  {
    id: 13,
    name: "Anemia",
    icdCode: "3A00",
    namaste: "Pandu Roga",
    symptoms: ["Fatigue", "Pallor", "Dizziness", "Coldness"],
  },
  {
    id: 14,
    name: "Jaundice",
    icdCode: "DB90",
    namaste: "Kamala",
    symptoms: ["Yellow", "Urine", "Nausea", "Pain"],
  },
  {
    id: 15,
    name: "Tumour",
    icdCode: "2C23.10",
    namaste: "Arbuda",
    symptoms: ["Sorethroat", "Lump", "Dysphagia", "Hoarseness"],
  },
  {
    id: 16,
    name: "Abscess",
    icdCode: "CA0K0",
    namaste: "Vidradhi",
    symptoms: ["Fever", "Stiffness", "Drooling", "Dyspnea"],
  },
  {
    id: 17,
    name: "Hoarseness",
    icdCode: "MA82.10",
    namaste: "Svarabheda",
    symptoms: ["Raspy", "Pitch", "Fatigue", "Irritation"],
  },
  {
    id: 18,
    name: "Voice Disorder",
    icdCode: "MA82.1Z",
    namaste: "Vak Vikara",
    symptoms: ["Slurred", "Unclear", "Tone", "Clarity"],
  },
  {
    id: 19,
    name: "Inflammation",
    icdCode: "CA05.1",
    namaste: "Shotha",
    symptoms: ["Pain", "Fever", "Swelling", "Redness"],
  },
  {
    id: 20,
    name: "Pharyngitis",
    icdCode: "CA02.Z",
    namaste: "Galashundi",
    symptoms: ["Sorethroat", "Fever", "Nodes", "Cough"],
  },
  {
    id: 21,
    name: "Tonsillitis",
    icdCode: "CA03.Z",
    namaste: "Galagraha",
    symptoms: ["Swelling", "Pus", "Pain", "Fever"],
  },
  {
    id: 22,
    name: "Speech Disorder",
    icdCode: "6A01.Z",
    namaste: "Vak Dosha",
    symptoms: ["Speaking", "Slurred", "Quality", "Articulation"],
  },
  {
    id: 23,
    name: "Lymphadenitis",
    icdCode: "MG22.Z",
    namaste: "Granthi",
    symptoms: ["Swelling", "Lumps", "Pain", "Fever"],
  },
  {
    id: 24,
    name: "Laryngitis",
    icdCode: "CA05.0",
    namaste: "Kantha Shotha",
    symptoms: ["Hoarseness", "Cough", "Dryness", "Fever"],
  },
  {
    id: 25,
    name: "Chronic Kidney Disease",
    icdCode: "GB61",
    namaste: "Vrikka Roga",
    symptoms: ["Swelling", "Nausea", "Reduced-urine", "Fatigue"],
  },
  {
    id: 26,
    name: "Ischemic Heart Disease",
    icdCode: "BA40-BA6Z",
    namaste: "Hridaya Roga",
    symptoms: ["Chest-pain", "Fatigue", "Breathlessness", "Sweating"],
  },
  {
    id: 27,
    name: "Stroke (CVA)",
    icdCode: "8B11",
    namaste: "Pakshaghata",
    symptoms: ["Weakness", "Speech-problems", "Vision-changes", "Paralysis"],
  },
  {
    id: 28,
    name: "COPD",
    icdCode: "CA22",
    namaste: "Swasa Roga",
    symptoms: ["Cough", "Wheezing", "Breathing-difficulty", "Phlegm"],
  },
  {
    id: 29,
    name: "Rheumatoid Arthritis",
    icdCode: "FA20",
    namaste: "Amavata",
    symptoms: ["Joint-pain", "Swelling", "Stiffness", "Inflammation"],
  },
  {
    id: 30,
    name: "Epilepsy",
    icdCode: "8A60-8A6Z",
    namaste: "Apasmara",
    symptoms: ["Seizures", "Confusion", "Unconsciousness", "Convulsions"],
  },
  {
    id: 31,
    name: "Pneumonia",
    icdCode: "J18*",
    namaste: "Kaphaja Jwara",
    symptoms: ["Fever", "Cough-phlegm", "Chest-pain", "Breathlessness"],
  },
  {
    id: 32,
    name: "Malaria",
    icdCode: "B50-B54*",
    namaste: "Vishama Jwara",
    symptoms: ["Fever", "Chills", "Sweating", "Headache"],
  },
  {
    id: 33,
    name: "Dengue Fever",
    icdCode: "A90*",
    namaste: "Dandaka Jwara",
    symptoms: ["Fever", "Body-pain", "Rash", "Bleeding"],
  },
  {
    id: 34,
    name: "COVID-19 (Viral Pneumonia)",
    icdCode: "U07.1*",
    namaste: "Sankramaka Jwara",
    symptoms: ["Fever", "Cough", "Breathlessness", "Fatigue"],
  },
  {
    id: 35,
    name: "Hepatitis B",
    icdCode: "B16*",
    namaste: "Yakrit Shotha",
    symptoms: ["Jaundice", "Dark-urine", "Fatigue", "Abdominal-pain"],
  },
  {
    id: 36,
    name: "Cervical Cancer",
    icdCode: "C53*",
    namaste: "Garbhashaya Arbuda",
    symptoms: ["Bleeding", "Pelvic-pain", "Vaginal-discharge", "Cramping"],
  },
  {
    id: 37,
    name: "Breast Cancer",
    icdCode: "C50*",
    namaste: "Stana Arbuda",
    symptoms: ["Breast-lump", "Nipple-discharge", "Breast-pain", "Swelling"],
  },
  {
    id: 38,
    name: "Gastric Ulcer (Peptic Ulcer)",
    icdCode: "K25*",
    namaste: "Parinaamashula",
    symptoms: ["Stomach-pain", "Bloating", "Nausea", "Vomiting"],
  },
  {
    id: 39,
    name: "Cataract",
    icdCode: "H25*",
    namaste: "Timira",
    symptoms: [
      "Blurry-vision",
      "Glare-sensitivity",
      "Faded-colors",
      "Cloudiness",
    ],
  },
  {
    id: 39,
    name: "Appendicitis",
    icdCode: "K35*",
    namaste: "Antra Vriddhi",
    symptoms: ["Abdominal-pain", "Fever", "Nausea", "Vomiting"],
  },
  {
    id: 40,
    name: "Osteoarthritis (Hip)",
    icdCode: "FA01.1",
    namaste: "Kati Sandhigata Vata",
    symptoms: ["Pain", "Stiffness", "Swelling", "Flexibility-loss"],
  },
  {
    id: 41,
    name: "Osteoarthritis (Knee)",
    icdCode: "FA01.2",
    namaste: "Janu Sandhigata Vata",
    symptoms: ["Pain", "Stiffness", "Swelling", "Flexibility-loss"],
  },
];

type CustomDisease = (typeof customDiseases)[number];

function searchCustomDiseases(query: string): CustomDisease[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return customDiseases.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.icdCode.toLowerCase().includes(q) ||
      (d.namaste && d.namaste.toLowerCase().includes(q)) ||
      (d.symptoms && d.symptoms.some((s) => s.toLowerCase().includes(q)))
  );
}

interface DiseaseAutocompleteProps {
  onDiseaseSelect: (disease: {
    code: string;
    title: string;
    description: string;
    category: string;
    keywords: string[];
    namaste?: string;
    symptoms?: string;
  }) => void;
  placeholder?: string;
  label?: string;
  initialValue?: string;
}

export const DiseaseAutocomplete = ({
  onDiseaseSelect,
  placeholder = "Search for a disease or condition...",
  label = "Disease/Condition",
  initialValue = "",
}: DiseaseAutocompleteProps) => {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<CustomDisease[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedDisease, setSelectedDisease] = useState<CustomDisease | null>(
    null
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      const results = searchCustomDiseases(query);
      setSuggestions(results);
      setIsOpen(results.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedDisease(null);
  };

  const handleSuggestionClick = (disease: CustomDisease) => {
    setQuery(disease.name);
    setSelectedDisease(disease);
    setIsOpen(false);
    onDiseaseSelect({
      code: disease.icdCode,
      title: disease.name,
      description: disease.namaste,
      category: "Custom",
      keywords: [disease.name, disease.namaste, disease.icdCode],
      namaste: disease.namaste,
      symptoms: disease.symptoms ? disease.symptoms.join(", ") : "",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div className="relative">
      <Label htmlFor="disease-search">{label}</Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          ref={inputRef}
          id="disease-search"
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() =>
            query.length >= 2 && setSuggestions(searchCustomDiseases(query))
          }
          placeholder={placeholder}
          className="pl-10 pr-10"
        />
        {selectedDisease && (
          <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
        )}
      </div>

      {selectedDisease && (
        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {selectedDisease.icdCode}
            </Badge>
            <span className="text-sm font-medium text-green-800">
              {selectedDisease.name}
            </span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            Namaste: {selectedDisease.namaste}
          </p>
        </div>
      )}

      {isOpen && suggestions.length > 0 && (
        <Card className="absolute z-50 w-full mt-1 max-h-80 overflow-y-auto shadow-lg border">
          <CardContent className="p-0">
            {suggestions.map((disease, index) => (
              <div
                key={disease.icdCode}
                className={`p-3 cursor-pointer border-b last:border-b-0 hover:bg-gray-50 ${
                  index === selectedIndex ? "bg-blue-50 border-blue-200" : ""
                }`}
                onClick={() => handleSuggestionClick(disease)}
              >
                <div className="flex items-start gap-2">
                  <Badge
                    variant="outline"
                    className="text-xs bg-blue-50 border-blue-200 text-blue-800"
                  >
                    {disease.icdCode}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">
                      {disease.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Namaste: {disease.namaste}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
