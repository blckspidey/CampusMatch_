import { useState, useEffect } from 'react';
import { Search, MapPin, IndianRupee, SlidersHorizontal } from 'lucide-react';
import { useColleges } from '../hooks/useColleges';
import CollegeCard from '../components/CollegeCard';

export default function Home() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [maxFees, setMaxFees] = useState('');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Use Custom Hook for cleanly fetching data
  const { data, loading, refetch } = useColleges({ search, location, maxFees, page, limit: 12 });

  // Whenever page changes, refetch
  useEffect(() => {
    refetch();
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  const { data: colleges, meta } = data;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Search Section */}
      <div
        className="bg-emerald-900 pt-16 pb-24 px-6 sm:px-6 lg:px-8 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2070&q=80")' }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Discover Your Perfect College
          </h1>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Search from our curated list of India's premier engineering, medical, and commerce institutions.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-32 py-5 border-transparent rounded-2xl text-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 shadow-2xl transition-shadow"
                placeholder="Search colleges by name (e.g., IIT Bombay)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute inset-y-2 right-2">
                <button
                  type="submit"
                  className="h-full flex items-center justify-center px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-md"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Filters Toggle Button */}
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center text-sm font-medium text-emerald-100 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Advanced Filters'}
              </button>
            </div>

            {/* Advanced Filters Panel */}
            <div className={`mt-4 transition-all duration-300 ease-in-out ${showFilters ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 pointer-events-none hidden'}`}>
              <div className="bg-white p-4 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
                    placeholder="City or State..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
                    placeholder="Maximum Fees..."
                    value={maxFees}
                    onChange={(e) => setMaxFees(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Main Listing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">Explore Colleges</h2>
          <div className="w-24 h-1.5 bg-emerald-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : colleges.length === 0 ? (
          <div className="bg-white py-20 text-center rounded-2xl border border-gray-100 shadow-sm">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No colleges found</h3>
            <p className="text-gray-500">We couldn't find any colleges matching your criteria. Try adjusting your filters.</p>
            <button
              onClick={() => { setSearch(''); setLocation(''); setMaxFees(''); refetch(); }}
              className="mt-6 text-emerald-600 font-medium hover:text-emerald-800 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {colleges.map(college => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && meta.totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-6 py-2 bg-white border border-gray-200 shadow-sm text-gray-700 rounded-xl disabled:opacity-50 hover:bg-gray-50 font-medium transition-colors"
            >
              Previous
            </button>
            <div className="flex items-center px-4 py-2 bg-gray-100 rounded-xl text-gray-700 font-bold">
              Page {page} of {meta.totalPages}
            </div>
            <button
              onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
              disabled={page === meta.totalPages}
              className="px-6 py-2 bg-white border border-gray-200 shadow-sm text-gray-700 rounded-xl disabled:opacity-50 hover:bg-gray-50 font-medium transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
