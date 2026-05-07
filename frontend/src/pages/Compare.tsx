import { useState, useEffect } from 'react';
import axios from 'axios';
import { IndianRupee, Star, MapPin, GraduationCap, ArrowRight, CheckCircle2, TrendingUp, Award, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placementPercentage: number;
}

export default function Compare() {
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(['', '', '']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get('http://localhost:5000/colleges?limit=100');
        setAllColleges(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleSelect = (index: number, id: string) => {
    const newIds = [...selectedIds];
    newIds[index] = id;
    setSelectedIds(newIds);
  };

  const selectedColleges = selectedIds.map(id => allColleges.find(c => c.id === id) || null);
  
  const bestPlacement = Math.max(...selectedColleges.map(c => c?.placementPercentage || 0));
  const bestRating = Math.max(...selectedColleges.map(c => c?.rating || 0));
  const lowestFee = Math.min(...selectedColleges.filter(c => c !== null).map(c => c!.fees));

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-slate-900 pt-20 pb-36">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-sm mb-4 border border-emerald-500/30 backdrop-blur-sm">
            <Zap className="w-4 h-4 inline-block mr-1 mb-0.5" /> Pro Comparison Tool
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Compare & Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Perfect Match</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Analyze up to 3 colleges side-by-side. Evaluate fees, ratings, and placement records to make the best decision for your future.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden backdrop-blur-xl">
          
          {/* Top Selection Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 border-b border-slate-200 bg-slate-50/50">
            <div className="p-8 flex flex-col justify-center bg-white lg:bg-transparent">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Select Institutions</h3>
              <p className="text-sm text-slate-500">Choose colleges from the dropdowns to begin your detailed comparison.</p>
            </div>
            {[0, 1, 2].map(index => (
              <div key={index} className="p-6 relative group">
                <div className="absolute inset-0 bg-emerald-50/0 group-hover:bg-emerald-50/50 transition-colors pointer-events-none"></div>
                <div className="relative z-10">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">College {index + 1}</label>
                  <select 
                    value={selectedIds[index]}
                    onChange={(e) => handleSelect(index, e.target.value)}
                    className="w-full bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 p-3.5 outline-none transition-all text-slate-800 font-medium hover:border-slate-300 cursor-pointer shadow-sm"
                  >
                    <option value="">+ Select a college...</option>
                    {allColleges.map(c => (
                      <option key={c.id} value={c.id} disabled={selectedIds.includes(c.id) && selectedIds[index] !== c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-slate-100 bg-white">
            
            {/* Name & Location */}
            <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 transition-colors hover:bg-slate-50/50 group">
              <div className="p-6 lg:p-8 font-semibold text-slate-700 flex items-center bg-slate-50/30 group-hover:bg-transparent">
                <MapPin className="w-5 h-5 mr-3 text-slate-400" /> Location & Campus
              </div>
              {selectedColleges.map((c, i) => (
                <div key={i} className="p-6 lg:p-8 text-center flex flex-col justify-center relative">
                  {c ? (
                    <>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">{c.name}</h3>
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                        {c.location}
                      </span>
                    </>
                  ) : <span className="text-slate-300">-</span>}
                </div>
              ))}
            </div>

            {/* Fees */}
            <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 transition-colors hover:bg-slate-50/50 group">
              <div className="p-6 lg:p-8 font-semibold text-slate-700 flex items-center bg-slate-50/30 group-hover:bg-transparent">
                <IndianRupee className="w-5 h-5 mr-3 text-slate-400" /> Total Course Fees
              </div>
              {selectedColleges.map((c, i) => {
                const isBest = c && c.fees === lowestFee && lowestFee !== Infinity;
                return (
                  <div key={i} className={`p-6 lg:p-8 text-center flex flex-col justify-center items-center relative ${isBest ? 'bg-emerald-50/30' : ''}`}>
                    {c ? (
                      <>
                        <span className={`font-bold text-2xl flex items-center ${isBest ? 'text-emerald-600' : 'text-slate-700'}`}>
                          <IndianRupee className="w-6 h-6 mr-1"/> {(c.fees / 100000).toFixed(1)} <span className="text-base ml-1 text-slate-500">Lakhs</span>
                        </span>
                        {isBest && (
                          <div className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Most Affordable
                          </div>
                        )}
                      </>
                    ) : <span className="text-slate-300">-</span>}
                  </div>
                );
              })}
            </div>

            {/* Rating */}
            <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 transition-colors hover:bg-slate-50/50 group">
              <div className="p-6 lg:p-8 font-semibold text-slate-700 flex items-center bg-slate-50/30 group-hover:bg-transparent">
                <Star className="w-5 h-5 mr-3 text-slate-400" /> Student Rating
              </div>
              {selectedColleges.map((c, i) => {
                const isBest = c && c.rating === bestRating && bestRating > 0;
                return (
                  <div key={i} className={`p-6 lg:p-8 text-center flex flex-col justify-center items-center relative ${isBest ? 'bg-amber-50/30' : ''}`}>
                    {c ? (
                      <>
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className={`w-7 h-7 ${isBest ? 'text-amber-500 fill-amber-500' : 'text-slate-300 fill-slate-300'}`}/>
                          <span className={`font-bold text-3xl ${isBest ? 'text-slate-900' : 'text-slate-700'}`}>{c.rating}</span>
                          <span className="text-slate-400 font-medium text-lg">/5</span>
                        </div>
                        {isBest && (
                          <div className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded flex items-center">
                            <Award className="w-3 h-3 mr-1" /> Highest Rated
                          </div>
                        )}
                      </>
                    ) : <span className="text-slate-300">-</span>}
                  </div>
                );
              })}
            </div>

            {/* Placements */}
            <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 transition-colors hover:bg-slate-50/50 group">
              <div className="p-6 lg:p-8 font-semibold text-slate-700 flex items-center bg-slate-50/30 group-hover:bg-transparent">
                <GraduationCap className="w-5 h-5 mr-3 text-slate-400" /> Placement Rate
              </div>
              {selectedColleges.map((c, i) => {
                const isBest = c && c.placementPercentage === bestPlacement && bestPlacement > 0;
                return (
                  <div key={i} className={`p-6 lg:p-8 text-center flex flex-col justify-center items-center w-full ${isBest ? 'bg-blue-50/30' : ''}`}>
                    {c ? (
                      <div className="w-full max-w-[200px]">
                        <div className="flex justify-between items-end mb-2">
                          <span className={`font-bold text-3xl ${isBest ? 'text-blue-600' : 'text-slate-700'}`}>
                            {c.placementPercentage}%
                          </span>
                          {isBest && <TrendingUp className="w-5 h-5 text-blue-500 mb-1" />}
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className={`h-2.5 rounded-full ${isBest ? 'bg-blue-500' : 'bg-slate-400'}`} 
                            style={{ width: `${c.placementPercentage}%` }}
                          ></div>
                        </div>
                        {isBest && (
                          <div className="mt-3 text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded inline-flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Best Placements
                          </div>
                        )}
                      </div>
                    ) : <span className="text-slate-300">-</span>}
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 bg-slate-50/80">
              <div className="p-6 lg:p-8"></div>
              {selectedColleges.map((c, i) => (
                <div key={i} className="p-6 lg:p-8 flex justify-center items-center">
                  {c ? (
                    <Link 
                      to={`/college/${c.id}`} 
                      className="w-full flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 group"
                    >
                      View Full Details <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
