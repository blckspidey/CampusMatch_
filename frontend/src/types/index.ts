export interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placementPercentage: number;
  courses: string[];
  summary: string;
  entranceExam: string;
  minRankGen: number; maxRankGen: number;
  minRankObc: number; maxRankObc: number;
  minRankEws: number; maxRankEws: number;
  minRankSc: number; maxRankSc: number;
  minRankSt: number; maxRankSt: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
