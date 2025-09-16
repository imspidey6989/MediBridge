import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Users, Clock, Shield } from "lucide-react";

const CTA = () => {
  return (
    <section id="help" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-6">
        <Card className="bg-card border-2 border-govt-blue/20 shadow-[var(--shadow-folder)]">
          <CardContent className="p-8 lg:p-12 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center bg-govt-blue/10 text-govt-blue px-4 py-2 rounded-full text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" />
                  Trusted by Millions
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Start Using Your Digital Health Vault Today
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Join millions of Indians who have digitized their health
                  documents. Get secure access to your medical records anytime,
                  anywhere.
                </p>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-6 py-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-govt-blue" />
                    <span className="text-2xl font-bold text-foreground">
                      5M+
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-govt-green" />
                    <span className="text-2xl font-bold text-foreground">
                      50M+
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Documents Secured
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-govt-orange" />
                    <span className="text-2xl font-bold text-foreground">
                      99.9%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Uptime Guarantee
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-4 py-6">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-govt-green" />
                  <span className="text-foreground">Free for Personal Use</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-govt-green" />
                  <span className="text-foreground">Unlimited Storage for Docs</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-govt-green" />
                  <span className="text-foreground">24/7 Access</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="govt" size="lg" className="font-medium">
                  Create Your Health Vault
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Government Badge */}
              <div className="pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  A Digital India Initiative | Government of India |
                  <span className="font-medium">
                    {" "}
                    Secure • Reliable • Accessible
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTA;
