import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, AlertCircle, Search } from 'lucide-react';
import CollegeCard from '../components/CollegeCard';
import { collegeApi } from '../api/endpoints';
import type { College } from '../types';

export default function Saved() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSaved = async () => {
      if (!token) {
        setError('Please login to view saved colleges');
        setLoading(false);
        return;
      }
      try {
        const data = await collegeApi.getSavedColleges();
        setColleges(data);
      } catch (err) {
        setError('Failed to fetch saved colleges. Please login again.');
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-slate-900 pt-20 pb-36">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-500/20 backdrop-blur-md rounded-2xl mb-6 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
            <Bookmark className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Saved</span> Colleges
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Keep track of all the institutions you're interested in. Review, compare, and make the perfect choice for your higher education.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
        ) : error ? (
          <div className="bg-white/90 backdrop-blur-xl border border-orange-200 rounded-3xl p-12 text-center max-w-2xl mx-auto shadow-2xl shadow-orange-900/5">
            <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Authentication Required</h2>
            <p className="text-lg text-slate-600 mb-8">{error}</p>
            <Link 
              to="/auth"
              className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 text-lg"
            >
              Sign In to Continue
            </Link>
          </div>
        ) : colleges.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200 p-16 md:p-24 text-center max-w-3xl mx-auto">
            <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Your List is Empty</h2>
            <p className="text-lg text-slate-500 mb-10 max-w-lg mx-auto">
              You haven't saved any colleges yet. Start exploring our directory to find and save institutions you're interested in.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center bg-emerald-600 text-white font-bold px-10 py-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:scale-95 text-lg"
            >
              Discover Colleges Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {colleges.map(college => (
              <CollegeCard key={college.id} college={college} showSaveIcon />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
