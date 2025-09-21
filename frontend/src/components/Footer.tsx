import { FolderOpen, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t-2 border-govt-blue">
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[var(--folder-gradient)] rounded">
                <FolderOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-govt-blue">
                  MediBridge
                </div>
                <div className="text-xs text-muted-foreground">
                  Digital Health Documents
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A Digital India initiative for secure health document storage and
              management. Store, verify, and access your medical records with
              government-grade security.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-3 h-3" />
                <span>support@MediBridge.gov.in</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-3 h-3" />
                <span>1800-123-HEALTH (43258)</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-govt-blue transition-colors"
                >
                  Document Upload
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-govt-blue transition-colors"
                >
                  Document Verification
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-govt-blue transition-colors"
                >
                  Secure Sharing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-govt-blue transition-colors"
                >
                  Mobile Access
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-govt-blue transition-colors"
                >
                  API Integration
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-govt-blue transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-govt-blue transition-colors"
                >
                  User Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-govt-blue transition-colors"
                >
                  Video Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-govt-blue transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Government Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Government
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-govt-blue transition-colors flex items-center"
                >
                  Digital India <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-govt-blue transition-colors flex items-center"
                >
                  Ministry of Health <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-govt-blue transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-govt-blue transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-govt-blue transition-colors"
                >
                  RTI
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-sm text-muted-foreground">
                © 2024 Government of India. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Website designed and developed by National Informatics Centre
                (NIC)
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="text-xs bg-govt-blue/10 text-govt-blue px-2 py-1 rounded border border-govt-blue/20">
                ISO 27001
              </span>
              <span className="text-xs bg-govt-green/10 text-govt-green px-2 py-1 rounded border border-govt-green/20">
                SSL Secured
              </span>
              <span className="text-xs bg-govt-orange/10 text-govt-orange px-2 py-1 rounded border border-govt-orange/20">
                CERT-In Empanelled
              </span>
            </div>
          </div>

          <div className="text-center mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Best viewed in:</span> Chrome 80+,
              Firefox 78+, Safari 13+, Edge 80+ |
              <span className="font-medium"> Screen Resolution:</span> 1024x768
              and above
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
