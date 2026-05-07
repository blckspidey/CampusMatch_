import { Request, Response } from 'express';
import { prisma } from '../db';

export const getColleges = async (req: Request, res: Response) => {
  try {
    const { search, location, maxFees, course, page = '1', limit = '10' } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const whereClause: any = {};

    if (search) {
      whereClause.name = { contains: search as string, mode: 'insensitive' };
    }
    if (location) {
      whereClause.location = { contains: location as string, mode: 'insensitive' };
    }
    if (maxFees) {
      whereClause.fees = { lte: parseFloat(maxFees as string) };
    }
    if (course) {
      whereClause.courses = { array_contains: course };
    }

    const colleges = await prisma.college.findMany({
      where: whereClause,
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
    });

    const total = await prisma.college.count({ where: whereClause });

    res.json({
      data: colleges,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
};

export const getCollegeById = async (req: Request, res: Response) => {
  try {
    const college = await prisma.college.findUnique({
      where: { id: req.params.id as string }
    });
    if (!college) {
      res.status(404).json({ error: 'College not found' });
      return;
    }
    res.json(college);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch college details' });
  }
};

export const predictColleges = async (req: Request, res: Response) => {
  try {
    const { exam, rank, category } = req.body;
    
    // Determine which min/max rank fields to check based on category
    let minRankField = 'minRankGen';
    let maxRankField = 'maxRankGen';

    if (category === 'OBC') { minRankField = 'minRankObc'; maxRankField = 'maxRankObc'; }
    if (category === 'EWS') { minRankField = 'minRankEws'; maxRankField = 'maxRankEws'; }
    if (category === 'SC')  { minRankField = 'minRankSc'; maxRankField = 'maxRankSc'; }
    if (category === 'ST')  { minRankField = 'minRankSt'; maxRankField = 'maxRankSt'; }

    const colleges = await prisma.college.findMany({
      where: {
        entranceExam: exam,
        [minRankField]: { lte: parseInt(rank) },
        [maxRankField]: { gte: parseInt(rank) }
      },
      orderBy: {
        rating: 'desc'
      }
    });

    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: 'Prediction failed' });
  }
};

export const saveCollege = async (req: Request, res: Response) => {
  try {
    const { collegeId } = req.body;
    const userId = req.userId!;

    const saved = await prisma.savedCollege.create({
      data: { userId, collegeId }
    });
    res.json({ message: 'College saved successfully', saved });
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'College already saved' });
      return;
    }
    res.status(500).json({ error: 'Failed to save college' });
  }
};

export const getSavedColleges = async (req: Request, res: Response) => {
  try {
    const savedColleges = await prisma.savedCollege.findMany({
      where: { userId: req.userId },
      include: { college: true }
    });
    res.json(savedColleges.map(sc => sc.college));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch saved colleges' });
  }
};
