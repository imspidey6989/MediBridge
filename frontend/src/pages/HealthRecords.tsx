import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DiseaseAutocomplete } from "@/components/DiseaseAutocomplete";
import {
  Plus,
  FileText,
  Calendar,
  User,
  Building,
  Shield,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";

interface HealthRecord {
  id: number;
  title: string;
  record_type: string;
  description: string;
  icd11_code?: string;
  icd11_title?: string;
  diagnosis?: string;
  symptoms?: string[];
  namaste_name?: string;
  doctor_name?: string;
  hospital_name?: string;
  visit_date?: string;
  severity: string;
  verification_status: string;
  created_at: string;
  updated_at: string;
}

interface NewRecordForm {
  recordType: string;
  title: string;
  description: string;
  icd11Code: string;
  icd11Title: string;
  diagnosis: string;
  symptoms: string;
  doctorName: string;
  hospitalName: string;
  visitDate: string;
  severity: string;
  namasteName: string;
}

const HealthRecords = () => {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<NewRecordForm>({
    recordType: "",
    title: "",
    description: "",
    icd11Code: "",
    icd11Title: "",
    diagnosis: "",
    namasteName: "",
    symptoms: "",
    doctorName: "",
    hospitalName: "",
    visitDate: "",
    severity: "mild",
  });

  useEffect(() => {
    fetchHealthRecords();
  }, []);

  const fetchHealthRecords = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch("/api/health-records", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRecords(data.data);
      } else {
        toast.error("Failed to fetch health records");
      }
    } catch (error) {
      console.error("Failed to fetch health records:", error);
      toast.error("Failed to fetch health records");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSampleRecord = async () => {
    // Create a sample record with predefined data
    const sampleRecord = {
      id: Date.now(),
      title: "John Doe",
      record_type: "consultation",
      description: "This is a sample health record for demonstration purposes.",
      icd11_code: "8A00",
      icd11_title: "Primary headache disorders",
      diagnosis: "Tension-type headache",
      symptoms: ["headache", "stress"],
      namaste_name: "स्वास्थ्य रिकॉर्ड (Health Record)",
      doctor_name: "Dr. Sample Physician",
      hospital_name: "Sample Medical Center",
      visit_date: new Date().toISOString().split("T")[0],
      severity: "mild",
      verification_status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setRecords([...records, sampleRecord]);
    toast.success("Sample health record added successfully");
  };

  const handleCreateRecord = async (e: React.FormEvent) => {
    e.preventDefault();

    // For demo purposes, skip API call and just update local state
    try {
      // Add record to local state immediately
      const newRecord = {
        id: Date.now(),
        title: formData.title,
        record_type: formData.recordType,
        description: formData.description,
        icd11_code: formData.icd11Code,
        icd11_title: formData.icd11Title,
        diagnosis: formData.diagnosis,
        symptoms: formData.symptoms
          ? formData.symptoms.split(",").map((s) => s.trim())
          : [],
        namaste_name: formData.namasteName,
        doctor_name: formData.doctorName,
        hospital_name: formData.hospitalName,
        visit_date: formData.visitDate,
        severity: formData.severity,
        verification_status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setRecords([...records, newRecord]);
      toast.success("Health record created successfully");

      setIsDialogOpen(false);
      setFormData({
        recordType: "",
        title: "",
        description: "",
        icd11Code: "",
        icd11Title: "",
        diagnosis: "",
        symptoms: "",
        namasteName: "",
        doctorName: "",
        hospitalName: "",
        visitDate: "",
        severity: "mild",
      });
    } catch (error) {
      console.error("Failed to create health record:", error);
      toast.error("Failed to create health record");
    }
  };

  const handleVerifyRecord = async (recordId: number) => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`/api/verification/verify/${recordId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationType: "full" }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        fetchHealthRecords();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Verification failed");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error("Verification failed");
    }
  };

  // Removed duplicate handleCreateRecord. Add local record creation logic to main handleCreateRecord.

  // To support local table update, add this inside the main handleCreateRecord after successful API response:
  // setRecords([
  //   ...records,
  //   {
  //     id: Date.now(),
  //     title: formData.title,
  //     record_type: formData.recordType,
  //     description: formData.description,
  //     icd11_code: formData.icd11Code,
  //     icd11_title: formData.icd11Title,
  //     diagnosis: formData.diagnosis,
  //     symptoms: formData.symptoms ? formData.symptoms.split(",").map((s) => s.trim()) : [],
  //     doctor_name: formData.doctorName,
  //     hospital_name: formData.hospitalName,
  //     visit_date: formData.visitDate,
  //     severity: formData.severity,
  //     verification_status: "pending",
  //     created_at: new Date().toISOString(),
  //     updated_at: new Date().toISOString(),
  //   },
  // ]);

  // Removed unreachable/stray code after local setRecords/setFormData logic

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.record_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (record.namaste_name &&
        record.namaste_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      filterType === "all" || record.record_type === filterType;

    return matchesSearch && matchesFilter;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-green-100 text-green-800";
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      case "severe":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const recordTypes = [
    "consultation",
    "lab_result",
    "prescription",
    "imaging",
    "surgery",
    "vaccination",
    "emergency",
    "follow_up",
    "other",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Records</h1>
          <p className="text-gray-600 mt-2">
            Manage and organize your medical history
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleCreateSampleRecord}
          >
            <FileText className="h-4 w-4" />
            Add Sample Record
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Record
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Health Record</DialogTitle>
                <DialogDescription>
                  Add a new health record to your medical history
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateRecord} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="recordType">Record Type</Label>
                    <Select
                      value={formData.recordType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, recordType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select record type" />
                      </SelectTrigger>
                      <SelectContent>
                        {recordTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type
                              .replace("_", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="severity">Severity</Label>
                    <Select
                      value={formData.severity}
                      onValueChange={(value) =>
                        setFormData({ ...formData, severity: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Mild</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="severe">Severe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Patient's Name</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter patient's name"
                    required
                  />
                </div>

                {/* Description field removed as requested */}

                {/* Disease Section */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <DiseaseAutocomplete
                      onDiseaseSelect={(disease) => {
                        setFormData({
                          ...formData,
                          icd11Code: disease.code,
                          icd11Title: disease.title,
                          diagnosis: disease.title,
                          namasteName: disease.namaste || "",
                          symptoms: disease.symptoms || formData.symptoms,
                        });
                      }}
                      label="Disease/Condition"
                      placeholder="Type disease name or symptoms..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="namasteName">Namaste Name</Label>
                    <Input
                      id="namasteName"
                      value={formData.namasteName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          namasteName: e.target.value,
                        })
                      }
                      placeholder="Namaste name (e.g., chaechak, Madhumeha)"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="icd11Code">ICD-11 Code</Label>
                      <Input
                        id="icd11Code"
                        value={formData.icd11Code}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            icd11Code: e.target.value,
                          })
                        }
                        placeholder="e.g., BA00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="icd11Title">ICD-11 Title</Label>
                      <Input
                        id="icd11Title"
                        value={formData.icd11Title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            icd11Title: e.target.value,
                          })
                        }
                        placeholder="ICD-11 condition title"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Textarea
                    id="diagnosis"
                    value={formData.diagnosis}
                    onChange={(e) =>
                      setFormData({ ...formData, diagnosis: e.target.value })
                    }
                    placeholder="Medical diagnosis"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="symptoms">Symptoms</Label>
                  <Input
                    id="symptoms"
                    value={formData.symptoms}
                    onChange={(e) =>
                      setFormData({ ...formData, symptoms: e.target.value })
                    }
                    placeholder="Comma-separated symptoms"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="doctorName">Doctor Name</Label>
                    <Input
                      id="doctorName"
                      value={formData.doctorName}
                      onChange={(e) =>
                        setFormData({ ...formData, doctorName: e.target.value })
                      }
                      placeholder="Dr. John Smith"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hospitalName">Hospital/Clinic</Label>
                    <Input
                      id="hospitalName"
                      value={formData.hospitalName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hospitalName: e.target.value,
                        })
                      }
                      placeholder="General Hospital"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="visitDate">Visit Date</Label>
                  <Input
                    id="visitDate"
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) =>
                      setFormData({ ...formData, visitDate: e.target.value })
                    }
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Record</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search health records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {recordTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type
                  .replace("_", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{record.title}</CardTitle>
                  <CardDescription className="capitalize">
                    {record.record_type.replace("_", " ")}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {record.description}
                </p>

                {record.icd11_code && (
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{record.icd11_code}</span>
                    <span className="text-gray-600">{record.icd11_title}</span>
                  </div>
                )}

                {record.namaste_name && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="h-4 w-4 text-gray-400">🏥</span>
                    <span className="font-medium text-blue-600">
                      {record.namaste_name}
                    </span>
                  </div>
                )}

                {record.doctor_name && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-400" />
                    <span>{record.doctor_name}</span>
                  </div>
                )}

                {record.hospital_name && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-gray-400" />
                    <span>{record.hospital_name}</span>
                  </div>
                )}

                {record.visit_date && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      {new Date(record.visit_date).toLocaleDateString()}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge className={getSeverityColor(record.severity)}>
                      {record.severity}
                    </Badge>
                    <Badge
                      className={getStatusColor(record.verification_status)}
                    >
                      {record.verification_status}
                    </Badge>
                  </div>

                  {record.verification_status !== "verified" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleVerifyRecord(record.id)}
                      className="flex items-center gap-1"
                    >
                      <Shield className="h-3 w-3" />
                      Verify
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filterType !== "all"
              ? "No matching records"
              : "No health records yet"}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterType !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Start by adding your first health record"}
          </p>
          {!searchTerm && filterType === "all" && (
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Record
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default HealthRecords;
