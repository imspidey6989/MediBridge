import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Lock, 
  Eye, 
  Server,
  Award,
  CheckCircle
} from "lucide-react";

const Security = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "256-bit Encryption",
      description: "Military-grade encryption protects your documents both in storage and transmission."
    },
    {
      icon: Shield,
      title: "Digital Signatures",
      description: "All documents are digitally signed and verified using government-approved certificates."
    },
    {
      icon: Eye,
      title: "Access Control",
      description: "You control who can view your documents with granular permission settings."
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      description: "Hosted on government-approved cloud infrastructure with 99.9% uptime."
    },
    {
      icon: Award,
      title: "Compliance Certified",
      description: "Compliant with Data Protection Act, HIPAA, and international healthcare standards."
    },
    {
      icon: CheckCircle,
      title: "Audit Trail",
      description: "Complete audit trail of who accessed your documents and when."
    }
  ];

  return (
    <section id="verify" className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Security & Verification
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your health documents are protected with government-grade security measures 
            and verified using advanced authentication technologies.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Security Features */}
          <div className="grid md:grid-cols-2 gap-4">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="bg-card border border-border">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center mb-2">
                    <feature.icon className="w-5 h-5 text-govt-blue" />
                  </div>
                  <CardTitle className="text-base text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Verification Process */}
          <div className="space-y-6">
            <Card className="bg-secondary/50 border-2 border-govt-blue/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-govt-blue text-white flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Document Upload</h3>
                      <p className="text-sm text-muted-foreground">Upload your health document securely</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-govt-blue text-white flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Namaste TM2 Verification</h3>
                      <p className="text-sm text-muted-foreground">Advanced verification checks document authenticity</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-govt-green text-white flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">ICD-11 Classification</h3>
                      <p className="text-sm text-muted-foreground">Document is classified and organized automatically</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-govt-green text-white flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Secure Storage</h3>
                      <p className="text-sm text-muted-foreground">Document stored in your encrypted digital vault</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-govt-blue/5 p-6 rounded border border-govt-blue/20">
              <h3 className="text-lg font-semibold text-foreground mb-2">Why Verification Matters</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Document verification ensures that your health records are genuine, tamper-proof, 
                and legally acceptable for insurance claims, medical consultations, and official procedures.
              </p>
              <Button variant="govt-outline" size="sm">
                Learn More About Verification
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;