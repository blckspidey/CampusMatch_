import client from './client';

export const collegeApi = {
  getColleges: async (params: any) => {
    const res = await client.get('/colleges', { params });
    return res.data;
  },
  
  getCollegeById: async (id: string) => {
    const res = await client.get(`/colleges/${id}`);
    return res.data;
  },
  
  predictColleges: async (exam: string, rank: number, category: string) => {
    const res = await client.post('/predict', { exam, rank, category });
    return res.data;
  },
  
  saveCollege: async (collegeId: string) => {
    const res = await client.post('/save-college', { collegeId });
    return res.data;
  },
  
  getSavedColleges: async () => {
    const res = await client.get('/saved-colleges');
    return res.data;
  }
};

export const authApi = {
  login: async (data: any) => {
    const res = await client.post('/auth/login', data);
    return res.data;
  },
  register: async (data: any) => {
    const res = await client.post('/auth/register', data);
    return res.data;
  }
};
