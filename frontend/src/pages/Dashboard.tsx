import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Shield,
  Activity,
  Users,
  Download,
  LogOut,
} from "lucide-react";

interface DashboardStats {
  totalRecords: number;
  recentRecords: number;
  verifiedRecords: number;
  activeConditions: number;
  activeMedications: number;
}

interface HealthRecord {
  id: number;
  title: string;
  record_type: string;
  created_at: string;
  verification_status: string;
  severity: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentRecords, setRecentRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [userEmail, setUserEmail] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();

    // Get user email from localStorage if available
    const userData = localStorage.getItem("user_data");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserEmail(user.email || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch("/api/dashboard/overview", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.data.overview);
        setRecentRecords(data.data.recentRecords);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getVerificationRate = () => {
    if (!stats || stats.totalRecords === 0) return 0;
    return Math.round((stats.verifiedRecords / stats.totalRecords) * 100);
  };

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

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("auth_token");
    sessionStorage.removeItem("oauth_state");

    // Clear any other user data if stored
    localStorage.removeItem("user_data");

    // Redirect to home page
    navigate("/");
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive view of your health records and data
          </p>
          {userEmail && (
            <p className="text-sm text-gray-500 mt-1">
              Welcome back, {userEmail}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalRecords || 0}</div>
            <p className="text-xs text-muted-foreground">
              +{stats?.recentRecords || 0} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Verified Records
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.verifiedRecords || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {getVerificationRate()}% verification rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Conditions
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.activeConditions || 0}
            </div>
            <p className="text-xs text-muted-foreground">Being monitored</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Medications
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.activeMedications || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Current prescriptions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="records">Recent Records</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Records */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Health Records</CardTitle>
                <CardDescription>
                  Your latest health record entries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRecords.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{record.title}</h4>
                        <p className="text-sm text-gray-600 capitalize">
                          {record.record_type}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(record.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge className={getSeverityColor(record.severity)}>
                          {record.severity}
                        </Badge>
                        <Badge
                          className={getStatusColor(record.verification_status)}
                        >
                          {record.verification_status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                {recentRecords.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-gray-500 mb-3">No health records yet</p>
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        onClick={() => navigate("/health-records")}
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Add Your First Record
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={async () => {
                          // Quick create a sample record
                          const sampleRecord = {
                            recordType: "consultation",
                            title: "Sample Health Check-up",
                            description:
                              "Sample routine health examination for testing purposes.",
                            diagnosis: "Sample diagnosis - Normal examination",
                            symptoms: ["None"],
                            doctorName: "Dr. Sample Provider",
                            hospitalName: "MediBridge Sample Clinic",
                            visitDate: new Date().toISOString().split("T")[0],
                            severity: "mild",
                          };

                          try {
                            const token = localStorage.getItem("auth_token");
                            const response = await fetch(
                              "/api/health-records",
                              {
                                method: "POST",
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(sampleRecord),
                              }
                            );

                            if (response.ok) {
                              fetchDashboardData(); // Refresh dashboard data
                            }
                          } catch (error) {
                            console.error(
                              "Failed to create sample record:",
                              error
                            );
                          }
                        }}
                        className="flex items-center gap-2"
                      >
                        <Activity className="h-4 w-4" />
                        Quick Sample
                      </Button>
                    </div>
                  </div>
                )}
                {recentRecords.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      className="w-full flex items-center gap-2"
                      onClick={() => navigate("/health-records")}
                    >
                      <FileText className="h-4 w-4" />
                      View All Records & Add New
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Verification Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Progress</CardTitle>
                <CardDescription>
                  Track your health record verification status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Verification</span>
                      <span>{getVerificationRate()}%</span>
                    </div>
                    <Progress value={getVerificationRate()} className="h-2" />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {stats?.verifiedRecords || 0}
                      </div>
                      <div className="text-xs text-gray-600">Verified</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {(stats?.totalRecords || 0) -
                          (stats?.verifiedRecords || 0)}
                      </div>
                      <div className="text-xs text-gray-600">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">
                        {stats?.totalRecords || 0}
                      </div>
                      <div className="text-xs text-gray-600">Total</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>All Health Records</CardTitle>
              <CardDescription>
                Manage and view all your health records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Health records management interface coming soon...
                </p>
                <Button
                  className="mt-4"
                  onClick={() => navigate("/health-records")}
                >
                  Add New Record
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Health Analytics</CardTitle>
              <CardDescription>
                Insights and trends from your health data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Advanced analytics and charting coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification">
          <Card>
            <CardHeader>
              <CardTitle>Verification Center</CardTitle>
              <CardDescription>
                Manage verification status of your health records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Verification management interface coming soon...
                </p>
                <Button
                  className="mt-4"
                  onClick={() => navigate("/health-records")}
                >
                  Start Verification
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
