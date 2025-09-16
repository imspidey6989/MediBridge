import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AuthCallback = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");
        const error = urlParams.get("error");

        // Check for OAuth errors
        if (error) {
          setStatus("error");
          setMessage(`Authentication failed: ${error}`);
          return;
        }

        // Validate state parameter
        const storedState = sessionStorage.getItem("oauth_state");
        if (
          !state ||
          !storedState ||
          !state.startsWith(storedState.split("_")[0])
        ) {
          setStatus("error");
          setMessage("Invalid state parameter. Possible CSRF attack.");
          return;
        }

        // Clear stored state
        sessionStorage.removeItem("oauth_state");

        if (code) {
          // Here you would typically send the code to your backend
          // For now, we'll simulate a successful authentication
          setStatus("loading");
          setMessage("Exchanging authorization code...");

          // Simulate API call delay
          setTimeout(() => {
            // Determine if this was a signup or login based on state
            const isSignup = state.includes("_signup");

            // Store dummy user data for now (replace with actual user data from backend)
            const userData = {
              email: "user@example.com", // This would come from the backend
              name: "John Doe",
              loginTime: new Date().toISOString(),
            };
            localStorage.setItem("user_data", JSON.stringify(userData));
            localStorage.setItem("auth_token", "dummy_token_" + Date.now());

            setStatus("success");
            setMessage(
              isSignup ? "Account created successfully!" : "Login successful!"
            );

            // Redirect to dashboard after a short delay
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
          }, 1500);

          // TODO: Replace this simulation with actual backend integration:
          /*
          const response = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              code, 
              isSignup: state.includes('_signup') 
            }),
          });

          if (response.ok) {
            const data = await response.json();
            // Store user token/session
            localStorage.setItem('auth_token', data.token);
            setStatus('success');
            setMessage('Authentication successful!');
            setTimeout(() => navigate('/dashboard'), 2000);
          } else {
            throw new Error('Authentication failed');
          }
          */
        } else {
          setStatus("error");
          setMessage("No authorization code received.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("An error occurred during authentication.");
        console.error("Auth callback error:", err);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center space-x-3 group">
            <div className="p-3 bg-[var(--folder-gradient)] rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
              <FolderOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-govt-blue">
                MediBridge
              </div>
              <div className="text-sm text-muted-foreground">
                Dual coding for Digital India
              </div>
            </div>
          </Link>
        </div>

        {/* Status Card */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              {status === "loading" && (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-govt-blue" />
                  <span>Authenticating...</span>
                </>
              )}
              {status === "success" && (
                <>
                  <CheckCircle className="w-6 h-6 text-govt-green" />
                  <span className="text-govt-green">Success!</span>
                </>
              )}
              {status === "error" && (
                <>
                  <XCircle className="w-6 h-6 text-destructive" />
                  <span className="text-destructive">Error</span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">{message}</p>

            {status === "success" && (
              <p className="text-sm text-muted-foreground">
                Redirecting you to your dashboard...
              </p>
            )}

            {status === "error" && (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="inline-block bg-govt-blue text-white px-6 py-2 rounded hover:bg-govt-blue/90 transition-colors"
                >
                  Try Again
                </Link>
                <br />
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-govt-blue transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthCallback;
