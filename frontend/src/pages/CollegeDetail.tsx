import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, IndianRupee, Star, GraduationCap, 
  BookOpen, Bookmark, FileText, CheckCircle, Target, 
  TrendingUp, Users, Award 
} from 'lucide-react';
import { collegeApi } from '../api/endpoints';
import type { College } from '../types';

export default function CollegeDetail() {
  const { id } = useParams<{ id: string }>();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        if (id) {
          const data = await collegeApi.getCollegeById(id);
          setCollege(data);
        }
      } catch (error) {
        console.error('Failed to fetch college details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please create an account from the Login page first!');
    try {
      if (college) {
        await collegeApi.saveCollege(college.id);
        alert('College saved successfully!');
      }
    } catch (e: any) {
      alert(e.response?.data?.error || 'Failed to save');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-600"></div>
    </div>
  );

  if (!college) return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">College not found</h2>
      <Link to="/" className="text-emerald-600 bg-emerald-50 px-6 py-3 rounded-xl font-bold hover:bg-emerald-100 transition-colors">Return to Dashboard</Link>
    </div>
  );

  // Safe checks
  const safeCourses = Array.isArray(college?.courses) ? college.courses : [];
  const safeFees = college?.fees ? (college.fees / 100000).toFixed(1) : 'N/A';

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Premium Hero Banner */}
      <div className="bg-slate-900 pt-10 pb-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-teal-900/50"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 mt-8">
          <Link to="/" className="inline-flex items-center text-sm font-semibold text-slate-300 hover:text-white mb-8 transition-colors bg-slate-800/50 border border-slate-700/50 px-4 py-2 rounded-xl backdrop-blur-md hover:bg-slate-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-3 mb-5">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-sm font-bold backdrop-blur-md">
                  <CheckCircle className="w-4 h-4 mr-2" /> Accepts {college.entranceExam}
                </span>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-sm font-bold backdrop-blur-md">
                  <Award className="w-4 h-4 mr-2" /> Premium Institution
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">{college.name}</h1>
              <div className="flex flex-wrap items-center text-slate-300 gap-6 text-lg font-medium">
                <span className="flex items-center bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                  <MapPin className="w-5 h-5 mr-2 text-emerald-400" /> {college.location}
                </span>
                <span className="flex items-center bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                  <Star className="w-5 h-5 text-amber-400 mr-2 fill-amber-400" /> 
                  <span className="font-bold text-white mr-1">{college.rating}</span> / 5.0
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleSave}
              className="flex items-center justify-center bg-emerald-600 text-white font-bold py-4 px-8 rounded-2xl hover:bg-emerald-500 transition-all shadow-lg hover:shadow-emerald-500/25 whitespace-nowrap active:scale-95 text-lg group border border-emerald-500"
            >
              <Bookmark className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Save to Shortlist
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        
        {/* Quick Stats Row */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 p-8 mb-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          
          <div className="text-center px-4">
            <div className="mx-auto w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
              <IndianRupee className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Total Fees</p>
            <p className="text-3xl font-bold text-slate-900">{safeFees}L</p>
          </div>
          
          <div className="text-center px-4">
            <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Placement Rate</p>
            <p className="text-3xl font-bold text-blue-600">{college.placementPercentage}%</p>
          </div>
          
          <div className="text-center px-4">
            <div className="mx-auto w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Entrance Exam</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{college.entranceExam}</p>
          </div>
          
          <div className="text-center px-4">
            <div className="mx-auto w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Programs</p>
            <p className="text-3xl font-bold text-slate-900">{safeCourses.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Overview Section */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <div className="bg-emerald-100 p-2.5 rounded-xl mr-4 text-emerald-600">
                  <FileText className="w-6 h-6" /> 
                </div>
                Institution Overview
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">
                {college.summary || `${college.name} is a premier educational institution located in ${college.location}. It is highly recognized for its rigorous academic curriculum and vibrant campus life. With a stellar placement record of ${college.placementPercentage}%, it remains a top choice for students clearing the ${college.entranceExam}.`}
              </p>
            </section>

            {/* Courses Section */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                <div className="bg-emerald-100 p-2.5 rounded-xl mr-4 text-emerald-600">
                  <BookOpen className="w-6 h-6" /> 
                </div>
                Academic Programs
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {safeCourses.length > 0 ? safeCourses.map((course, idx) => (
                  <div key={idx} className="flex items-center p-5 rounded-2xl border-2 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all group bg-slate-50/50 cursor-default">
                    <div className="bg-white shadow-sm border border-slate-100 p-3 rounded-xl text-emerald-600 mr-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1">{course}</h4>
                      <span className="inline-block px-2 py-1 bg-slate-200/50 text-slate-600 text-xs font-bold rounded-md uppercase tracking-wider">Full Time</span>
                    </div>
                  </div>
                )) : (
                  <p className="text-slate-500 italic font-medium">No course data available.</p>
                )}
              </div>
            </section>

            {/* Placements Section */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                <div className="bg-emerald-100 p-2.5 rounded-xl mr-4 text-emerald-600">
                  <TrendingUp className="w-6 h-6" /> 
                </div>
                Placements & Outcomes
              </h2>
              <div className="flex flex-col md:flex-row gap-10 items-center bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <div className="w-48 h-48 relative flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <path
                      className="text-slate-200"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-emerald-500"
                      strokeDasharray={`${college.placementPercentage}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-slate-900">{college.placementPercentage}%</span>
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">Placed</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Excellent Track Record</h3>
                  <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                    The placement cell actively coordinates with top-tier product and service-based companies. Major recruiters include tech giants, top consulting firms, and core engineering corporations.
                  </p>
                  <ul className="space-y-3 text-base font-bold text-slate-700">
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-emerald-500 mr-3" /> Dedicated Placement Cell</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-emerald-500 mr-3" /> 6-Month Internship Opportunities</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-emerald-500 mr-3" /> Global Alumni Network</li>
                  </ul>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            
            {/* Cutoffs Widget */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-28">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center tracking-tight">
                  <div className="bg-emerald-100 p-2 rounded-lg mr-3 text-emerald-600">
                    <Target className="w-6 h-6" /> 
                  </div>
                  Rank Cutoffs
                </h3>
                <span className="bg-slate-900 text-emerald-400 text-sm font-bold px-3 py-1.5 rounded-lg border border-slate-800">
                  {college.entranceExam}
                </span>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'General (Open)', min: college.minRankGen, max: college.maxRankGen },
                  { label: 'OBC-NCL', min: college.minRankObc, max: college.maxRankObc },
                  { label: 'GEN-EWS', min: college.minRankEws, max: college.maxRankEws },
                  { label: 'SC', min: college.minRankSc, max: college.maxRankSc },
                  { label: 'ST', min: college.minRankSt, max: college.maxRankSt },
                ].map((cutoff, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl flex justify-between items-center border-2 border-slate-100 hover:border-emerald-200 transition-all group">
                    <span className="font-bold text-slate-700 group-hover:text-slate-900">{cutoff.label}</span>
                    <span className="text-emerald-600 font-bold bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                      {cutoff.min} - {cutoff.max}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t-2 border-slate-100">
                <div className="flex items-start text-sm text-slate-500 font-medium">
                  <Users className="w-5 h-5 mr-3 flex-shrink-0 text-slate-400" />
                  <p>Category-wise opening and closing ranks based on previous year admission data. Keep in mind these are indicative.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
