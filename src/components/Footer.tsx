import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <MapPin className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="font-bold text-xl">
                Benefits<span className="text-accent">GPS</span>
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm">
              AI-powered welfare scheme discovery platform helping citizens find and apply for government benefits they deserve.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
            {[
              { label: 'Browse Schemes', to: '/schemes' },
              { label: 'How It Works', to: '/how-it-works' },
              { label: 'About Us', to: '/about' },
              { label: 'FAQs', to: '/faq' },
              { label: 'Contact', to: '/contact' },
            ].map((link) => (
              <li key={link.label}>
                <Link 
                  to={link.to} 
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            </ul>
          </div>

          {/* For Citizens */}
          <div>
            <h4 className="font-semibold mb-4">For Citizens</h4>
            <ul className="space-y-2">
            {[
              { label: 'Check Eligibility', to: '/eligibility-check' },
              { label: 'Track Application', to: '/track-application' },
              { label: 'Find Offices', to: '/office-finder' },
              { label: 'Help Center', to: '/faq' },
              { label: 'Feedback', to: '/feedback' },
            ].map((link) => (
              <li key={link.label}>
                <Link 
                  to={link.to} 
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4" />
                codeablaze@benefitsgps.gov.in
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4" />
                1800-342-334 (Toll Free)
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5" />
                Ministry of SDG Affairs,<br />
                Tamil Nadu, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2024 Benefits GPS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
