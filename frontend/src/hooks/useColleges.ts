import { useState, useEffect } from 'react';
import { collegeApi } from '../api/endpoints';
import type { College, PaginatedResponse } from '../types';

export const useColleges = (initialParams: any) => {
  const [data, setData] = useState<PaginatedResponse<College>>({ 
    data: [], 
    meta: { total: 0, page: 1, limit: 10, totalPages: 1 } 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // A toggle to re-trigger the fetch when search button is clicked
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await collegeApi.getColleges(initialParams);
        setData(res);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [trigger, initialParams.page]); // Depend on page specifically, and trigger for manual fetch

  const refetch = () => setTrigger(t => t + 1);

  return { data, loading, error, refetch };
};
