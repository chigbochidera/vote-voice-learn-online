
import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-myvomyvo-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MyVote MyVoice</h3>
            <p className="text-gray-300 text-sm mb-4">
              Empowering voices through education and civic engagement.
              Learn, participate, and make a difference.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-myvomyvo-400 transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-myvomyvo-400 transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-myvomyvo-400 transition-colors"
              >
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-myvomyvo-400 transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Courses</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/courses" className="hover:text-myvomyvo-400 transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/courses/category/civics" className="hover:text-myvomyvo-400 transition-colors">
                  Civics
                </Link>
              </li>
              <li>
                <Link to="/courses/category/advocacy" className="hover:text-myvomyvo-400 transition-colors">
                  Advocacy
                </Link>
              </li>
              <li>
                <Link to="/courses/category/leadership" className="hover:text-myvomyvo-400 transition-colors">
                  Leadership
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Information</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/about" className="hover:text-myvomyvo-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-myvomyvo-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-myvomyvo-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/terms" className="hover:text-myvomyvo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-myvomyvo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-myvomyvo-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} MyVote MyVoice. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 text-gray-400 text-sm">
              <span>Made with ❤️ for civic education</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
