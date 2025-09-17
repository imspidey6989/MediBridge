import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { Building, Mail, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const HospitalLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    hospitalId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle hospital login logic here
    console.log("Hospital login:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-secondary/20 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex justify-center">
            <Logo size="lg" showText={true} to="/" />
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl">
          <CardHeader className="text-center space-y-2 pb-3 sm:pb-4 px-4 sm:px-6">
            <div className="flex justify-center mb-2">
              <Building className="h-8 w-8 sm:h-10 sm:w-10 text-govt-blue" />
            </div>
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
              Hospital Portal
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-muted-foreground">
              Access your hospital dashboard and patient records
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 pb-4 sm:pb-6 px-4 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Hospital ID */}
              <div className="space-y-2">
                <Label htmlFor="hospitalId" className="text-sm font-medium">
                  Hospital ID
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="hospitalId"
                    type="text"
                    placeholder="Enter hospital ID"
                    value={formData.hospitalId}
                    onChange={(e) =>
                      setFormData({ ...formData, hospitalId: e.target.value })
                    }
                    className="pl-10 h-10 sm:h-12"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10 h-10 sm:h-12"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pl-10 h-10 sm:h-12"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
              >
                Sign In to Hospital Portal
              </Button>
            </form>

            {/* Links */}
            <div className="text-center space-y-2 pt-4 border-t border-border/50">
              <a
                href="#"
                className="text-xs sm:text-sm text-govt-blue hover:underline block"
              >
                Forgot your password?
              </a>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Need access?{" "}
                <a href="#" className="text-govt-blue hover:underline">
                  Contact IT Support
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-2 px-2">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs text-muted-foreground">
            <Link
              to="/login"
              className="flex items-center gap-2 hover:text-govt-blue hover:scale-105 transition-all duration-200 px-2 py-1"
            >
              <ArrowLeft className="h-3 w-3" />
              Patient Login
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link
              to="/"
              className="hover:text-govt-blue hover:scale-105 transition-all duration-200 px-2 py-1"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalLogin;
