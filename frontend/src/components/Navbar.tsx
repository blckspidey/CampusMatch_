import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { School, Search, Compass, Bookmark, GitCompare, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('userEmail') || '';
  
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setShowProfileMenu(false);
    navigate('/auth');
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ to, icon: Icon, text }: { to: string, icon: any, text: string }) => {
    const active = isActive(to);
    return (
      <Link 
        to={to} 
        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
          active 
            ? 'bg-emerald-50 text-emerald-700 font-bold shadow-sm border border-emerald-100/50' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600 font-semibold border border-transparent'
        }`}
      >
        <Icon className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-gray-400'}`} /> 
        <span className="hidden sm:inline">{text}</span>
      </Link>
    );
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/60 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-emerald-600 p-2.5 rounded-xl group-hover:bg-emerald-700 group-hover:scale-105 transition-all shadow-sm text-white">
                <School className="w-6 h-6" />
              </div>
              <span className="hidden sm:inline font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-800 tracking-tight">
                CampusMatch
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <NavItem to="/" icon={Search} text="Discover" />
            <NavItem to="/compare" icon={GitCompare} text="Compare" />
            <NavItem to="/predictor" icon={Compass} text="Predictor" />
            
            {token ? (
              <>
                <NavItem to="/saved" icon={Bookmark} text="Saved" />
                
                <div className="h-8 border-l border-gray-200 mx-3"></div>
                
                {/* Profile Circle Button & Dropdown */}
                <div className="relative" ref={menuRef}>
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg hover:shadow-md transition-all border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 hover:scale-105 active:scale-95"
                  >
                    {email ? email.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                  </button>

                  {/* Dropdown Modal */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform opacity-100 scale-100 transition-all origin-top-right">
                      <div className="px-5 py-4 bg-gradient-to-r from-emerald-50 to-white border-b border-gray-100">
                        <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1">Signed in as</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{email}</p>
                      </div>
                      <div className="p-2">
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> 
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="h-8 border-l border-gray-200 mx-3"></div>
                <Link 
                  to="/auth" 
                  className="bg-gray-900 hover:bg-gray-800 text-white font-semibold flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all shadow-sm hover:shadow active:scale-95"
                >
                  <User className="w-4 h-4" /> Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
