import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FolderOpen, Shield, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const handleGoogleLogin = () => {
    // Google OAuth integration with your actual client ID
    const clientId =
      import.meta.env.VITE_GOOGLE_CLIENT_ID ||
      "353620055340-i4nv19h4o58j8jhvvkquhejcb6a5kjgd.apps.googleusercontent.com";

    // Use the correct redirect URI based on environment
    // For development, we'll use the same domain pattern as production
    const isProduction =
      window.location.hostname === "medi-bridge-ebon.vercel.app";
    const redirectUri = isProduction
      ? "https://medi-bridge-ebon.vercel.app/auth/callback"
      : `${window.location.origin}/auth/callback`; // Dynamic port detection

    // Debug: Log the redirect URI to console
    console.log("🔍 Debug - Redirect URI:", redirectUri);
    console.log("🔍 Debug - Current location:", window.location.href);

    const scope = "email profile";
    const responseType = "code";
    const state = Math.random().toString(36).substring(2, 15);

    // Store state for security validation
    sessionStorage.setItem("oauth_state", state);

    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=${responseType}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `state=${state}&` +
      `access_type=offline&` +
      `prompt=select_account`;

    window.location.href = authUrl;
  };

  const handleGoogleSignup = () => {
    // Same OAuth flow for signup - you can differentiate on the backend
    const clientId =
      import.meta.env.VITE_GOOGLE_CLIENT_ID ||
      "353620055340-i4nv19h4o58j8jhvvkquhejcb6a5kjgd.apps.googleusercontent.com";

    // Use the correct redirect URI based on environment
    const isProduction =
      window.location.hostname === "medi-bridge-ebon.vercel.app";
    const redirectUri = isProduction
      ? "https://medi-bridge-ebon.vercel.app/auth/callback"
      : "http://localhost:8080/auth/callback"; // Use port 8080 where Vite is running

    const scope = "email profile";
    const responseType = "code";
    const state = Math.random().toString(36).substring(2, 15) + "_signup";

    // Store state for security validation
    sessionStorage.setItem("oauth_state", state);

    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=${responseType}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `state=${state}&` +
      `access_type=offline&` +
      `prompt=select_account`;

    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-secondary/20 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-1000">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg space-y-6 sm:space-y-8 animate-in slide-in-from-bottom-8 duration-700 delay-200">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 animate-in slide-in-from-top-4 duration-600 delay-300">
          <Link to="/" className="inline-block group">
            <div className="animate-in slide-in-from-right-4 duration-600 delay-500">
              <div className="text-xl sm:text-2xl font-bold text-govt-blue group-hover:text-govt-blue/90 transition-colors duration-200">
                MediBridge
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-200">
                Dual coding for Digital India
              </div>
            </div>
          </Link>
        </div>

        {/* Main Card */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl animate-in slide-in-from-bottom-6 duration-800 delay-600 hover:shadow-2xl transition-shadow duration-300 mx-auto">
          <CardHeader className="text-center space-y-2 pb-3 sm:pb-4 px-4 sm:px-6 animate-in fade-in duration-600 delay-800">
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground animate-in slide-in-from-top-2 duration-500 delay-900">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-muted-foreground animate-in slide-in-from-top-2 duration-500 delay-1000">
              Access your secure health vault with Google
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 sm:space-y-4 pb-4 sm:pb-6 px-4 sm:px-6 animate-in fade-in duration-600 delay-1100">
            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              size="lg"
              className="w-full h-10 sm:h-12 bg-white hover:bg-gray-50 border-2 hover:text-black border-gray-200 text-gray-700 font-medium shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 animate-in slide-in-from-left-4 delay-1200 text-sm sm:text-base"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative py-2 sm:py-3 animate-in fade-in duration-500 delay-1300">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full animate-in slide-in-from-left duration-600 delay-1400" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 sm:px-3 py-1 text-muted-foreground font-medium rounded-md border border-border/20 animate-in zoom-in duration-400 delay-1500 hover:scale-105 transition-transform text-xs sm:text-xs">
                  New to MediBridge?
                </span>
              </div>
            </div>

            {/* Google Signup Button */}
            <Button
              onClick={handleGoogleSignup}
              variant="outline"
              size="lg"
              className="w-full h-10 sm:h-12 bg-white hover:bg-gray-50 border-2 hover:text-black border-gray-200 text-gray-700 font-medium shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 animate-in slide-in-from-left-4 delay-1200 text-sm sm:text-base"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Create your account with Google
            </Button>

            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 pt-2 sm:pt-3 border-t border-border/50 animate-in slide-in-from-bottom-2 duration-500 delay-1700">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-govt-green animate-pulse" />
              <span className="text-xs sm:text-xs text-muted-foreground text-center">
                Protected by Government-grade Security
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-2 sm:space-y-2 animate-in fade-in duration-600 delay-1800 px-2">
          <p className="text-xs sm:text-xs text-muted-foreground animate-in slide-in-from-bottom-1 duration-400 delay-1900 leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs text-muted-foreground animate-in slide-in-from-bottom-1 duration-400 delay-2000">
            <Link
              to="/"
              className="hover:text-govt-blue hover:scale-105 transition-all duration-200 px-2 py-1"
            >
              Back to Home
            </Link>
            <span className="hidden sm:inline">•</span>
            <a
              href="#"
              className="hover:text-govt-blue hover:scale-105 transition-all duration-200 px-2 py-1"
            >
              Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
