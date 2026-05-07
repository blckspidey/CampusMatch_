import { useState } from 'react';
import { Target, Trophy } from 'lucide-react';
import { collegeApi } from '../api/endpoints';
import type { College } from '../types';
import CollegeCard from '../components/CollegeCard';

export default function Predictor() {
  const [exam, setExam] = useState('JEE Main');
  const [category, setCategory] = useState('General');
  const [rank, setRank] = useState('');
  const [results, setResults] = useState<College[]>([]);
  const [hasPredicted, setHasPredicted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return;
    
    setLoading(true);
    try {
      const data = await collegeApi.predictColleges(exam, parseInt(rank), category);
      setResults(data);
      setHasPredicted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-slate-900 pt-20 pb-40">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-500/20 backdrop-blur-md rounded-2xl mb-6 border border-emerald-500/30">
            <Target className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">College Predictor</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Stop guessing. Enter your competitive exam rank and category to instantly discover the top institutions you have a strong chance of getting into.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 p-8 md:p-10 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          
          <form onSubmit={handlePredict} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Examination</label>
                <select 
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-semibold text-slate-900 cursor-pointer shadow-sm hover:border-slate-300"
                >
                  <option value="JEE Main">JEE Main (NITs/IIITs/DTU)</option>
                  <option value="JEE Advanced">JEE Advanced (IITs)</option>
                  <option value="NEET">NEET (Medical)</option>
                  <option value="BITSAT">BITSAT</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-semibold text-slate-900 cursor-pointer shadow-sm hover:border-slate-300"
                >
                  <option value="General">General (Open)</option>
                  <option value="OBC">OBC-NCL</option>
                  <option value="EWS">GEN-EWS</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Your Rank</label>
                <input 
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 1500"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-mono text-xl text-slate-900 font-bold shadow-sm placeholder:text-slate-400 hover:border-slate-300"
                />
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/30 disabled:opacity-70 text-lg group active:scale-95"
            >
              {loading ? (
                <span className="flex items-center"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div> Analyzing historic cutoffs...</span>
              ) : (
                <>
                  <Trophy className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  Predict My Safe Colleges
                </>
              )}
            </button>
          </form>
        </div>
        
        {hasPredicted && (
          <div className="mt-20 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 border-b border-slate-200 pb-6 gap-4">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                {results.length > 0 ? `We found ${results.length} Safe Matches` : 'No safe matches found for this rank'}
              </h2>
              <span className="px-5 py-2 bg-slate-900 text-emerald-400 rounded-xl text-sm font-bold shadow-sm border border-slate-800">
                Based on {exam} • {category}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {results.map(college => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
