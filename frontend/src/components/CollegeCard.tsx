import { Link } from 'react-router-dom';
import { MapPin, IndianRupee, Star, GraduationCap, Bookmark, ArrowRight } from 'lucide-react';
import type { College } from '../types';

interface Props {
  college: College;
  showSaveIcon?: boolean;
}

export default function CollegeCard({ college, showSaveIcon }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group flex flex-col relative">
      
      {showSaveIcon && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md z-10 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer border border-white">
          <Bookmark className="w-5 h-5 fill-current" />
        </div>
      )}

      <div className="h-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-700 opacity-90 group-hover:scale-105 transition-transform duration-500"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center mix-blend-overlay opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>
        
        {!showSaveIcon && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center text-sm font-bold text-slate-800 shadow-lg shadow-black/10 border border-white/20">
            <Star className="w-4 h-4 text-amber-500 mr-1.5 fill-amber-500" />
            {college.rating}
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow bg-white">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold tracking-wider uppercase mb-3">Institution</span>
          <h3 className="font-bold text-xl text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">
            {college.name}
          </h3>
        </div>

        <div className="text-slate-500 text-sm flex items-center mb-6 font-medium">
          <MapPin className="w-4 h-4 mr-1.5 text-slate-400" />
          <span className="truncate">{college.location}</span>
        </div>
        
        <div className="mt-auto space-y-3 p-4 bg-slate-50 rounded-2xl mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 flex items-center font-medium"><IndianRupee className="w-4 h-4 mr-2 text-slate-400" /> Course Fees</span>
            <span className="font-bold text-slate-900">₹{(college.fees / 100000).toFixed(1)}L</span>
          </div>
          <div className="w-full h-px bg-slate-200"></div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 flex items-center font-medium"><GraduationCap className="w-4 h-4 mr-2 text-slate-400" /> Placement</span>
            <span className="font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md">{college.placementPercentage}%</span>
          </div>
        </div>
        
        <Link 
          to={`/college/${college.id}`}
          className="mt-auto flex items-center justify-center w-full text-center bg-slate-900 text-white font-semibold py-3.5 rounded-xl hover:bg-emerald-600 transition-colors group/btn shadow-sm hover:shadow-md"
        >
          View Full Profile <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
