import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Check } from "lucide-react";
// Custom disease data for instant lookup
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
    name: "Diabetes",
    icdCode: "5A40",
    namaste: "Madhumeha",
    symptoms: [
      "increased thirst",
      "frequent urination",
      "fatigue",
      "blurred vision",
    ],
  },
  {
    id: 3,
    name: "Goiter",
    icdCode: "5A01.Z",
    namaste: "Ghengh",
    symptoms: ["neck swelling", "difficulty swallowing", "cough", "hoarseness"],
  },{
    id: 4,
    name: "",
    icdCode: "5A01.Z",
    namaste: "Ghengh",
    symptoms: ["neck swelling", "difficulty swallowing", "cough", "hoarseness"],
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
