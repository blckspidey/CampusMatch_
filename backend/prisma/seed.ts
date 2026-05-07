import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const colleges = [
  // JEE Advanced (IITs)
  {
    name: 'Indian Institute of Technology (IIT) Bombay',
    location: 'Mumbai, Maharashtra',
    fees: 950000,
    rating: 4.9,
    placementPercentage: 98,
    courses: ['B.Tech Computer Science', 'B.Tech Electrical', 'B.Tech Mechanical'],
    summary: 'One of the oldest and most prestigious engineering institutes in India, known for its rigorous academics and exceptional placements.',
    entranceExam: 'JEE Advanced',
    minRankGen: 1, maxRankGen: 61,
    minRankObc: 1, maxRankObc: 35,
    minRankEws: 1, maxRankEws: 18,
    minRankSc: 1, maxRankSc: 20,
    minRankSt: 1, maxRankSt: 10
  },
  {
    name: 'Indian Institute of Technology (IIT) Delhi',
    location: 'New Delhi, Delhi',
    fees: 900000,
    rating: 4.8,
    placementPercentage: 97,
    courses: ['B.Tech Computer Science', 'B.Tech Mathematics and Computing', 'B.Tech Electrical'],
    summary: 'Located in the capital city, IIT Delhi offers a vibrant ecosystem for research, startups, and top-tier placements.',
    entranceExam: 'JEE Advanced',
    minRankGen: 3, maxRankGen: 102,
    minRankObc: 10, maxRankObc: 75,
    minRankEws: 5, maxRankEws: 25,
    minRankSc: 2, maxRankSc: 35,
    minRankSt: 2, maxRankSt: 15
  },
  {
    name: 'Indian Institute of Technology (IIT) Madras',
    location: 'Chennai, Tamil Nadu',
    fees: 850000,
    rating: 4.9,
    placementPercentage: 96,
    courses: ['B.Tech Computer Science', 'B.Tech Aerospace', 'B.Tech Mechanical'],
    summary: 'Consistently ranked #1 in NIRF, IIT Madras features a sprawling green campus and excellent research facilities.',
    entranceExam: 'JEE Advanced',
    minRankGen: 15, maxRankGen: 163,
    minRankObc: 20, maxRankObc: 85,
    minRankEws: 10, maxRankEws: 30,
    minRankSc: 5, maxRankSc: 45,
    minRankSt: 3, maxRankSt: 20
  },

  // JEE Main (NITs)
  {
    name: 'National Institute of Technology (NIT) Trichy',
    location: 'Tiruchirappalli, Tamil Nadu',
    fees: 600000,
    rating: 4.7,
    placementPercentage: 94,
    courses: ['B.Tech Computer Science', 'B.Tech ECE', 'B.Tech Instrumentation'],
    summary: 'The top-ranked NIT in India, offering fantastic return on investment and a highly competitive academic culture.',
    entranceExam: 'JEE Main',
    minRankGen: 100, maxRankGen: 714,
    minRankObc: 50, maxRankObc: 250,
    minRankEws: 30, maxRankEws: 120,
    minRankSc: 10, maxRankSc: 150,
    minRankSt: 5, maxRankSt: 60
  },
  {
    name: 'National Institute of Technology (NIT) Surathkal',
    location: 'Mangalore, Karnataka',
    fees: 600000,
    rating: 4.6,
    placementPercentage: 93,
    courses: ['B.Tech Computer Science', 'B.Tech IT', 'B.Tech Civil'],
    summary: 'Known for its private beach and excellent computer science placements.',
    entranceExam: 'JEE Main',
    minRankGen: 500, maxRankGen: 1114,
    minRankObc: 200, maxRankObc: 350,
    minRankEws: 100, maxRankEws: 180,
    minRankSc: 50, maxRankSc: 200,
    minRankSt: 20, maxRankSt: 90
  },
  {
    name: 'Delhi Technological University (DTU)',
    location: 'New Delhi, Delhi',
    fees: 800000,
    rating: 4.5,
    placementPercentage: 90,
    courses: ['B.Tech Computer Science', 'B.Tech Software Engineering', 'B.Tech Mechanical'],
    summary: 'Formerly DCE, DTU is renowned for its massive tech alumni network and great campus life.',
    entranceExam: 'JEE Main',
    minRankGen: 1000, maxRankGen: 2500,
    minRankObc: 500, maxRankObc: 1200,
    minRankEws: 300, maxRankEws: 600,
    minRankSc: 100, maxRankSc: 400,
    minRankSt: 50, maxRankSt: 200
  },
  
  // BITSAT (BITS)
  {
    name: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    fees: 2500000,
    rating: 4.8,
    placementPercentage: 96,
    courses: ['B.E. Computer Science', 'B.E. EEE', 'B.E. Mechanical'],
    summary: 'India\'s premier private engineering institute with zero attendance policy and a unique dual-degree program.',
    entranceExam: 'BITSAT',
    minRankGen: 1, maxRankGen: 400, // Roughly maps to scores 330+
    minRankObc: 1, maxRankObc: 400, 
    minRankEws: 1, maxRankEws: 400,
    minRankSc: 1, maxRankSc: 400,
    minRankSt: 1, maxRankSt: 400
  },
  {
    name: 'BITS Goa',
    location: 'Zuarinagar, Goa',
    fees: 2500000,
    rating: 4.6,
    placementPercentage: 92,
    courses: ['B.E. Computer Science', 'B.E. ECE', 'B.E. Chemical'],
    summary: 'A picturesque campus offering the identical BITS curriculum and phenomenal tech opportunities.',
    entranceExam: 'BITSAT',
    minRankGen: 400, maxRankGen: 1200,
    minRankObc: 400, maxRankObc: 1200,
    minRankEws: 400, maxRankEws: 1200,
    minRankSc: 400, maxRankSc: 1200,
    minRankSt: 400, maxRankSt: 1200
  },

  // NEET (Medical)
  {
    name: 'All India Institute of Medical Sciences (AIIMS) Delhi',
    location: 'New Delhi, Delhi',
    fees: 6000, // Highly subsidized
    rating: 5.0,
    placementPercentage: 100,
    courses: ['MBBS', 'B.Sc Nursing', 'MD'],
    summary: 'The absolute pinnacle of medical education in India, offering world-class training at nominal fees.',
    entranceExam: 'NEET',
    minRankGen: 1, maxRankGen: 50,
    minRankObc: 1, maxRankObc: 250,
    minRankEws: 1, maxRankEws: 200,
    minRankSc: 1, maxRankSc: 1000,
    minRankSt: 1, maxRankSt: 2500
  },
  {
    name: 'Christian Medical College (CMC) Vellore',
    location: 'Vellore, Tamil Nadu',
    fees: 150000,
    rating: 4.8,
    placementPercentage: 100,
    courses: ['MBBS', 'B.Sc Nursing', 'BPT'],
    summary: 'One of the most prestigious private medical colleges known for its heavy emphasis on clinical exposure.',
    entranceExam: 'NEET',
    minRankGen: 50, maxRankGen: 300,
    minRankObc: 250, maxRankObc: 800,
    minRankEws: 200, maxRankEws: 600,
    minRankSc: 1000, maxRankSc: 3500,
    minRankSt: 2500, maxRankSt: 6000
  },
  {
    name: 'JIPMER',
    location: 'Puducherry',
    fees: 12000,
    rating: 4.7,
    placementPercentage: 99,
    courses: ['MBBS', 'BDS'],
    summary: 'An institute of national importance providing top-tier medical education in Southern India.',
    entranceExam: 'NEET',
    minRankGen: 100, maxRankGen: 400,
    minRankObc: 300, maxRankObc: 1200,
    minRankEws: 300, maxRankEws: 1000,
    minRankSc: 1500, maxRankSc: 5000,
    minRankSt: 3000, maxRankSt: 8000
  },
    // More JEE Advanced (IITs)
  {
    name: 'Indian Institute of Technology (IIT) Kanpur',
    location: 'Kanpur, Uttar Pradesh',
    fees: 870000,
    rating: 4.8,
    placementPercentage: 96,
    courses: ['B.Tech Computer Science', 'B.Tech Electrical', 'B.Tech Civil'],
    summary: 'Known for its strong research culture, coding environment, and excellent core engineering programs.',
    entranceExam: 'JEE Advanced',
    minRankGen: 20, maxRankGen: 250,
    minRankObc: 15, maxRankObc: 120,
    minRankEws: 10, maxRankEws: 60,
    minRankSc: 5, maxRankSc: 80,
    minRankSt: 2, maxRankSt: 35
  },
  {
    name: 'Indian Institute of Technology (IIT) Kharagpur',
    location: 'Kharagpur, West Bengal',
    fees: 850000,
    rating: 4.7,
    placementPercentage: 95,
    courses: ['B.Tech Computer Science', 'B.Tech Mechanical', 'B.Tech Aerospace'],
    summary: 'The first IIT in India with one of the largest campuses and a rich engineering legacy.',
    entranceExam: 'JEE Advanced',
    minRankGen: 50, maxRankGen: 400,
    minRankObc: 30, maxRankObc: 180,
    minRankEws: 20, maxRankEws: 90,
    minRankSc: 10, maxRankSc: 120,
    minRankSt: 5, maxRankSt: 50
  },

  // More NITs
  {
    name: 'National Institute of Technology (NIT) Warangal',
    location: 'Warangal, Telangana',
    fees: 580000,
    rating: 4.5,
    placementPercentage: 91,
    courses: ['B.Tech Computer Science', 'B.Tech ECE', 'B.Tech Mechanical'],
    summary: 'A highly reputed NIT with strong placements and a great coding culture.',
    entranceExam: 'JEE Main',
    minRankGen: 700, maxRankGen: 1800,
    minRankObc: 250, maxRankObc: 600,
    minRankEws: 150, maxRankEws: 300,
    minRankSc: 80, maxRankSc: 500,
    minRankSt: 40, maxRankSt: 220
  },
  {
    name: 'National Institute of Technology (NIT) Calicut',
    location: 'Kozhikode, Kerala',
    fees: 550000,
    rating: 4.4,
    placementPercentage: 89,
    courses: ['B.Tech Computer Science', 'B.Tech Electrical', 'B.Tech Civil'],
    summary: 'Popular for its scenic campus and strong engineering academics.',
    entranceExam: 'JEE Main',
    minRankGen: 1200, maxRankGen: 3500,
    minRankObc: 500, maxRankObc: 1200,
    minRankEws: 300, maxRankEws: 700,
    minRankSc: 120, maxRankSc: 800,
    minRankSt: 60, maxRankSt: 300
  },
  {
    name: 'Motilal Nehru National Institute of Technology (MNNIT)',
    location: 'Prayagraj, Uttar Pradesh',
    fees: 520000,
    rating: 4.3,
    placementPercentage: 88,
    courses: ['B.Tech Computer Science', 'B.Tech IT', 'B.Tech Chemical'],
    summary: 'One of the oldest NITs with excellent alumni and strong coding placements.',
    entranceExam: 'JEE Main',
    minRankGen: 2000, maxRankGen: 5000,
    minRankObc: 800, maxRankObc: 1800,
    minRankEws: 400, maxRankEws: 900,
    minRankSc: 200, maxRankSc: 1200,
    minRankSt: 100, maxRankSt: 450
  },

  // IIITs
  {
    name: 'IIIT Hyderabad',
    location: 'Hyderabad, Telangana',
    fees: 1800000,
    rating: 4.9,
    placementPercentage: 98,
    courses: ['B.Tech CSE', 'B.Tech ECE', 'B.Tech AI'],
    summary: 'India’s leading institute for computer science research and AI innovation.',
    entranceExam: 'JEE Main',
    minRankGen: 100, maxRankGen: 900,
    minRankObc: 50, maxRankObc: 350,
    minRankEws: 30, maxRankEws: 150,
    minRankSc: 10, maxRankSc: 400,
    minRankSt: 5, maxRankSt: 150
  },
  {
    name: 'IIIT Bangalore',
    location: 'Bangalore, Karnataka',
    fees: 2200000,
    rating: 4.7,
    placementPercentage: 96,
    courses: ['B.Tech CSE', 'Integrated M.Tech CSE'],
    summary: 'A premium institute focused on advanced computing and research collaborations.',
    entranceExam: 'JEE Main',
    minRankGen: 1500, maxRankGen: 5000,
    minRankObc: 600, maxRankObc: 1800,
    minRankEws: 300, maxRankEws: 900,
    minRankSc: 100, maxRankSc: 1500,
    minRankSt: 50, maxRankSt: 500
  },

  // Private Engineering Colleges
  {
    name: 'Vellore Institute of Technology (VIT) Vellore',
    location: 'Vellore, Tamil Nadu',
    fees: 1950000,
    rating: 4.4,
    placementPercentage: 90,
    courses: ['B.Tech CSE', 'B.Tech IT', 'B.Tech Biotechnology'],
    summary: 'A top private engineering college with massive placement opportunities.',
    entranceExam: 'VITEEE',
    minRankGen: 1, maxRankGen: 20000,
    minRankObc: 1, maxRankObc: 20000,
    minRankEws: 1, maxRankEws: 20000,
    minRankSc: 1, maxRankSc: 20000,
    minRankSt: 1, maxRankSt: 20000
  },
  {
    name: 'SRM Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu',
    fees: 2200000,
    rating: 4.3,
    placementPercentage: 88,
    courses: ['B.Tech CSE', 'B.Tech AI', 'B.Tech ECE'],
    summary: 'A well-known private university with modern infrastructure and global tie-ups.',
    entranceExam: 'SRMJEEE',
    minRankGen: 1, maxRankGen: 25000,
    minRankObc: 1, maxRankObc: 25000,
    minRankEws: 1, maxRankEws: 25000,
    minRankSc: 1, maxRankSc: 25000,
    minRankSt: 1, maxRankSt: 25000
  },
  {
    name: 'Manipal Institute of Technology',
    location: 'Manipal, Karnataka',
    fees: 2400000,
    rating: 4.5,
    placementPercentage: 89,
    courses: ['B.Tech CSE', 'B.Tech Mechatronics', 'B.Tech Data Science'],
    summary: 'A globally recognized private engineering college with strong industry exposure.',
    entranceExam: 'MET',
    minRankGen: 1, maxRankGen: 18000,
    minRankObc: 1, maxRankObc: 18000,
    minRankEws: 1, maxRankEws: 18000,
    minRankSc: 1, maxRankSc: 18000,
    minRankSt: 1, maxRankSt: 18000
  },

  // More Medical Colleges
  {
    name: 'King George Medical University (KGMU)',
    location: 'Lucknow, Uttar Pradesh',
    fees: 54000,
    rating: 4.6,
    placementPercentage: 98,
    courses: ['MBBS', 'BDS', 'MD'],
    summary: 'One of the oldest and most respected medical colleges in North India.',
    entranceExam: 'NEET',
    minRankGen: 400, maxRankGen: 1800,
    minRankObc: 1200, maxRankObc: 4000,
    minRankEws: 900, maxRankEws: 3000,
    minRankSc: 3000, maxRankSc: 12000,
    minRankSt: 5000, maxRankSt: 18000
  },
  {
    name: 'Maulana Azad Medical College (MAMC)',
    location: 'New Delhi, Delhi',
    fees: 25000,
    rating: 4.8,
    placementPercentage: 100,
    courses: ['MBBS', 'MD', 'MS'],
    summary: 'A highly competitive government medical college with excellent clinical exposure.',
    entranceExam: 'NEET',
    minRankGen: 80, maxRankGen: 600,
    minRankObc: 300, maxRankObc: 1800,
    minRankEws: 250, maxRankEws: 1500,
    minRankSc: 1200, maxRankSc: 6000,
    minRankSt: 2500, maxRankSt: 10000
  },
  {
    name: 'Armed Forces Medical College (AFMC)',
    location: 'Pune, Maharashtra',
    fees: 100000,
    rating: 4.7,
    placementPercentage: 100,
    courses: ['MBBS', 'B.Sc Nursing'],
    summary: 'Premier military medical institute with subsidized education and disciplined training.',
    entranceExam: 'NEET',
    minRankGen: 150, maxRankGen: 1200,
    minRankObc: 500, maxRankObc: 3500,
    minRankEws: 400, maxRankEws: 2800,
    minRankSc: 1800, maxRankSc: 7000,
    minRankSt: 3500, maxRankSt: 12000
  },

  // Commerce / Management
  {
    name: 'Shri Ram College of Commerce (SRCC)',
    location: 'New Delhi, Delhi',
    fees: 90000,
    rating: 4.9,
    placementPercentage: 95,
    courses: ['B.Com Hons', 'Economics Hons'],
    summary: 'India’s top commerce college with elite placements in finance and consulting.',
    entranceExam: 'CUET',
    minRankGen: 1, maxRankGen: 150,
    minRankObc: 1, maxRankObc: 400,
    minRankEws: 1, maxRankEws: 300,
    minRankSc: 1, maxRankSc: 1200,
    minRankSt: 1, maxRankSt: 2500
  },
  {
    name: 'Narsee Monjee Institute of Management Studies (NMIMS)',
    location: 'Mumbai, Maharashtra',
    fees: 1400000,
    rating: 4.5,
    placementPercentage: 92,
    courses: ['BBA', 'B.Com', 'MBA'],
    summary: 'A leading private management institute known for corporate exposure.',
    entranceExam: 'NPAT',
    minRankGen: 1, maxRankGen: 5000,
    minRankObc: 1, maxRankObc: 5000,
    minRankEws: 1, maxRankEws: 5000,
    minRankSc: 1, maxRankSc: 5000,
    minRankSt: 1, maxRankSt: 5000
  },

  // Law Colleges
  {
    name: 'National Law School of India University (NLSIU)',
    location: 'Bangalore, Karnataka',
    fees: 1600000,
    rating: 4.9,
    placementPercentage: 97,
    courses: ['BA LLB', 'LLM'],
    summary: 'India’s top-ranked law school with exceptional corporate law placements.',
    entranceExam: 'CLAT',
    minRankGen: 1, maxRankGen: 100,
    minRankObc: 1, maxRankObc: 350,
    minRankEws: 1, maxRankEws: 250,
    minRankSc: 1, maxRankSc: 1200,
    minRankSt: 1, maxRankSt: 2500
  },
  {
    name: 'NALSAR University of Law',
    location: 'Hyderabad, Telangana',
    fees: 1500000,
    rating: 4.8,
    placementPercentage: 95,
    courses: ['BA LLB', 'LLM'],
    summary: 'A prestigious national law university with strong academic rigor.',
    entranceExam: 'CLAT',
    minRankGen: 50, maxRankGen: 180,
    minRankObc: 150, maxRankObc: 450,
    minRankEws: 100, maxRankEws: 300,
    minRankSc: 600, maxRankSc: 1800,
    minRankSt: 1200, maxRankSt: 3500
  },

  // Design Colleges
  {
    name: 'National Institute of Design (NID) Ahmedabad',
    location: 'Ahmedabad, Gujarat',
    fees: 1200000,
    rating: 4.8,
    placementPercentage: 90,
    courses: ['B.Des', 'M.Des'],
    summary: 'India’s most prestigious design institute known for innovation and creativity.',
    entranceExam: 'NID DAT',
    minRankGen: 1, maxRankGen: 150,
    minRankObc: 1, maxRankObc: 350,
    minRankEws: 1, maxRankEws: 250,
    minRankSc: 1, maxRankSc: 900,
    minRankSt: 1, maxRankSt: 1800
  },

  // Architecture
  {
    name: 'School of Planning and Architecture (SPA) Delhi',
    location: 'New Delhi, Delhi',
    fees: 500000,
    rating: 4.6,
    placementPercentage: 85,
    courses: ['B.Arch', 'B.Plan'],
    summary: 'India’s leading architecture institute with outstanding urban planning programs.',
    entranceExam: 'JEE Main',
    minRankGen: 500, maxRankGen: 3000,
    minRankObc: 200, maxRankObc: 900,
    minRankEws: 120, maxRankEws: 600,
    minRankSc: 80, maxRankSc: 1800,
    minRankSt: 40, maxRankSt: 700
  },

  // Agriculture
  {
    name: 'Punjab Agricultural University',
    location: 'Ludhiana, Punjab',
    fees: 300000,
    rating: 4.3,
    placementPercentage: 80,
    courses: ['B.Sc Agriculture', 'M.Sc Agriculture'],
    summary: 'A top agricultural university contributing significantly to India’s Green Revolution.',
    entranceExam: 'ICAR',
    minRankGen: 500, maxRankGen: 7000,
    minRankObc: 300, maxRankObc: 3000,
    minRankEws: 250, maxRankEws: 2500,
    minRankSc: 1500, maxRankSc: 10000,
    minRankSt: 2500, maxRankSt: 15000
  },

  // Hotel Management
  {
    name: 'Institute of Hotel Management (IHM) Pusa',
    location: 'New Delhi, Delhi',
    fees: 400000,
    rating: 4.5,
    placementPercentage: 88,
    courses: ['B.Sc Hospitality', 'Diploma in Hotel Management'],
    summary: 'India’s best hospitality institute with strong international placement opportunities.',
    entranceExam: 'NCHMCT JEE',
    minRankGen: 1, maxRankGen: 1200,
    minRankObc: 1, maxRankObc: 3500,
    minRankEws: 1, maxRankEws: 2500,
    minRankSc: 1, maxRankSc: 8000,
    minRankSt: 1, maxRankSt: 12000
  },
    // More IITs
  {
    name: 'Indian Institute of Technology (IIT) Roorkee',
    location: 'Roorkee, Uttarakhand',
    fees: 820000,
    rating: 4.7,
    placementPercentage: 94,
    courses: ['B.Tech Computer Science', 'B.Tech Civil', 'B.Tech Electrical'],
    summary: 'One of the oldest engineering institutions in Asia with excellent academic reputation.',
    entranceExam: 'JEE Advanced',
    minRankGen: 120, maxRankGen: 500,
    minRankObc: 60, maxRankObc: 220,
    minRankEws: 40, maxRankEws: 120,
    minRankSc: 15, maxRankSc: 160,
    minRankSt: 8, maxRankSt: 70
  },
  {
    name: 'Indian Institute of Technology (IIT) Guwahati',
    location: 'Guwahati, Assam',
    fees: 800000,
    rating: 4.6,
    placementPercentage: 93,
    courses: ['B.Tech Computer Science', 'B.Tech Electronics', 'B.Tech Chemical'],
    summary: 'Known for its beautiful riverside campus and strong research ecosystem.',
    entranceExam: 'JEE Advanced',
    minRankGen: 250, maxRankGen: 900,
    minRankObc: 120, maxRankObc: 400,
    minRankEws: 70, maxRankEws: 220,
    minRankSc: 35, maxRankSc: 260,
    minRankSt: 15, maxRankSt: 120
  },

  // More NITs
  {
    name: 'National Institute of Technology (NIT) Rourkela',
    location: 'Rourkela, Odisha',
    fees: 560000,
    rating: 4.4,
    placementPercentage: 90,
    courses: ['B.Tech Computer Science', 'B.Tech Mechanical', 'B.Tech Metallurgy'],
    summary: 'A fast-growing NIT with strong industry collaborations and placements.',
    entranceExam: 'JEE Main',
    minRankGen: 1500, maxRankGen: 4500,
    minRankObc: 700, maxRankObc: 1800,
    minRankEws: 400, maxRankEws: 1000,
    minRankSc: 200, maxRankSc: 1200,
    minRankSt: 100, maxRankSt: 500
  },
  {
    name: 'National Institute of Technology (NIT) Durgapur',
    location: 'Durgapur, West Bengal',
    fees: 520000,
    rating: 4.2,
    placementPercentage: 85,
    courses: ['B.Tech Computer Science', 'B.Tech Biotechnology', 'B.Tech Civil'],
    summary: 'A reputed eastern India engineering college with solid placement records.',
    entranceExam: 'JEE Main',
    minRankGen: 2500, maxRankGen: 7000,
    minRankObc: 1000, maxRankObc: 2500,
    minRankEws: 600, maxRankEws: 1400,
    minRankSc: 350, maxRankSc: 1800,
    minRankSt: 180, maxRankSt: 700
  },

  // IIITs
  {
    name: 'IIIT Allahabad',
    location: 'Prayagraj, Uttar Pradesh',
    fees: 1700000,
    rating: 4.6,
    placementPercentage: 97,
    courses: ['B.Tech IT', 'B.Tech ECE'],
    summary: 'Famous for coding culture and excellent software engineering placements.',
    entranceExam: 'JEE Main',
    minRankGen: 1200, maxRankGen: 4200,
    minRankObc: 500, maxRankObc: 1600,
    minRankEws: 250, maxRankEws: 800,
    minRankSc: 120, maxRankSc: 1500,
    minRankSt: 60, maxRankSt: 500
  },
  {
    name: 'IIIT Delhi',
    location: 'New Delhi, Delhi',
    fees: 1900000,
    rating: 4.7,
    placementPercentage: 95,
    courses: ['B.Tech CSE', 'B.Tech CSAM', 'B.Tech ECE'],
    summary: 'A modern research-driven institute focused on AI, data science, and innovation.',
    entranceExam: 'JEE Main',
    minRankGen: 900, maxRankGen: 3500,
    minRankObc: 350, maxRankObc: 1200,
    minRankEws: 180, maxRankEws: 700,
    minRankSc: 80, maxRankSc: 1300,
    minRankSt: 40, maxRankSt: 450
  },

  // State Engineering Colleges
  {
    name: 'College of Engineering Pune (COEP)',
    location: 'Pune, Maharashtra',
    fees: 450000,
    rating: 4.7,
    placementPercentage: 91,
    courses: ['B.Tech Computer Engineering', 'B.Tech Mechanical', 'B.Tech Civil'],
    summary: 'One of Maharashtra’s oldest and most prestigious engineering colleges.',
    entranceExam: 'MHT CET',
    minRankGen: 50, maxRankGen: 1200,
    minRankObc: 30, maxRankObc: 600,
    minRankEws: 20, maxRankEws: 350,
    minRankSc: 10, maxRankSc: 800,
    minRankSt: 5, maxRankSt: 300
  },
  {
    name: 'Veermata Jijabai Technological Institute (VJTI)',
    location: 'Mumbai, Maharashtra',
    fees: 380000,
    rating: 4.6,
    placementPercentage: 90,
    courses: ['B.Tech IT', 'B.Tech Electronics', 'B.Tech Production'],
    summary: 'A highly respected state engineering institute with strong placements.',
    entranceExam: 'MHT CET',
    minRankGen: 100, maxRankGen: 1800,
    minRankObc: 50, maxRankObc: 900,
    minRankEws: 40, maxRankEws: 500,
    minRankSc: 15, maxRankSc: 1000,
    minRankSt: 8, maxRankSt: 450
  },

  // Private Universities
  {
    name: 'Amity University',
    location: 'Noida, Uttar Pradesh',
    fees: 2000000,
    rating: 4.1,
    placementPercentage: 82,
    courses: ['B.Tech CSE', 'BBA', 'MBA'],
    summary: 'A large private university with diverse programs and modern infrastructure.',
    entranceExam: 'Amity JEE',
    minRankGen: 1, maxRankGen: 50000,
    minRankObc: 1, maxRankObc: 50000,
    minRankEws: 1, maxRankEws: 50000,
    minRankSc: 1, maxRankSc: 50000,
    minRankSt: 1, maxRankSt: 50000
  },
  {
    name: 'Lovely Professional University (LPU)',
    location: 'Phagwara, Punjab',
    fees: 1600000,
    rating: 4.0,
    placementPercentage: 80,
    courses: ['B.Tech CSE', 'BBA', 'MBA'],
    summary: 'A rapidly growing private university with strong industry exposure.',
    entranceExam: 'LPUNEST',
    minRankGen: 1, maxRankGen: 60000,
    minRankObc: 1, maxRankObc: 60000,
    minRankEws: 1, maxRankEws: 60000,
    minRankSc: 1, maxRankSc: 60000,
    minRankSt: 1, maxRankSt: 60000
  },

  // Commerce and Economics
  {
    name: 'Lady Shri Ram College (LSR)',
    location: 'New Delhi, Delhi',
    fees: 75000,
    rating: 4.8,
    placementPercentage: 92,
    courses: ['BA Economics', 'B.Com', 'BA Psychology'],
    summary: 'One of India’s top colleges for humanities and commerce education.',
    entranceExam: 'CUET',
    minRankGen: 50, maxRankGen: 500,
    minRankObc: 100, maxRankObc: 1200,
    minRankEws: 80, maxRankEws: 800,
    minRankSc: 400, maxRankSc: 3000,
    minRankSt: 900, maxRankSt: 5000
  },
  {
    name: 'Hindu College',
    location: 'New Delhi, Delhi',
    fees: 65000,
    rating: 4.7,
    placementPercentage: 90,
    courses: ['B.Com', 'BA English', 'B.Sc Physics'],
    summary: 'A prestigious Delhi University college known for academics and campus culture.',
    entranceExam: 'CUET',
    minRankGen: 80, maxRankGen: 700,
    minRankObc: 200, maxRankObc: 1600,
    minRankEws: 150, maxRankEws: 1000,
    minRankSc: 600, maxRankSc: 3500,
    minRankSt: 1200, maxRankSt: 6000
  },

  // Medical
  {
    name: 'Grant Medical College',
    location: 'Mumbai, Maharashtra',
    fees: 100000,
    rating: 4.5,
    placementPercentage: 97,
    courses: ['MBBS', 'MD', 'MS'],
    summary: 'A historic government medical college attached to JJ Hospital.',
    entranceExam: 'NEET',
    minRankGen: 1000, maxRankGen: 4500,
    minRankObc: 3000, maxRankObc: 9000,
    minRankEws: 2200, maxRankEws: 7000,
    minRankSc: 8000, maxRankSc: 22000,
    minRankSt: 15000, maxRankSt: 35000
  },
  {
    name: 'Seth GS Medical College',
    location: 'Mumbai, Maharashtra',
    fees: 110000,
    rating: 4.6,
    placementPercentage: 98,
    courses: ['MBBS', 'MD', 'MS'],
    summary: 'A premier medical institution associated with KEM Hospital Mumbai.',
    entranceExam: 'NEET',
    minRankGen: 700, maxRankGen: 3200,
    minRankObc: 2500, maxRankObc: 7000,
    minRankEws: 1800, maxRankEws: 5500,
    minRankSc: 7000, maxRankSc: 18000,
    minRankSt: 12000, maxRankSt: 30000
  },

  // Law
  {
    name: 'The West Bengal National University of Juridical Sciences (WBNUJS)',
    location: 'Kolkata, West Bengal',
    fees: 1400000,
    rating: 4.7,
    placementPercentage: 94,
    courses: ['BA LLB', 'LLM'],
    summary: 'A top national law university with excellent corporate placements.',
    entranceExam: 'CLAT',
    minRankGen: 100, maxRankGen: 300,
    minRankObc: 250, maxRankObc: 700,
    minRankEws: 180, maxRankEws: 500,
    minRankSc: 800, maxRankSc: 2200,
    minRankSt: 1500, maxRankSt: 4200
  },

  // Design
  {
    name: 'National Institute of Fashion Technology (NIFT) Delhi',
    location: 'New Delhi, Delhi',
    fees: 1300000,
    rating: 4.6,
    placementPercentage: 88,
    courses: ['B.Des Fashion Design', 'B.FTech Apparel Production'],
    summary: 'India’s premier fashion and design institute with global recognition.',
    entranceExam: 'NIFT Entrance Exam',
    minRankGen: 1, maxRankGen: 400,
    minRankObc: 1, maxRankObc: 900,
    minRankEws: 1, maxRankEws: 700,
    minRankSc: 1, maxRankSc: 2500,
    minRankSt: 1, maxRankSt: 4500
  },

  // Pharmacy
  {
    name: 'National Institute of Pharmaceutical Education and Research (NIPER)',
    location: 'Mohali, Punjab',
    fees: 450000,
    rating: 4.5,
    placementPercentage: 91,
    courses: ['B.Pharm', 'M.Pharm', 'PhD Pharmacy'],
    summary: 'India’s leading pharmaceutical education and research institute.',
    entranceExam: 'NIPER JEE',
    minRankGen: 1, maxRankGen: 1200,
    minRankObc: 1, maxRankObc: 2500,
    minRankEws: 1, maxRankEws: 1800,
    minRankSc: 1, maxRankSc: 5000,
    minRankSt: 1, maxRankSt: 8000
  },

  // Hotel Management
  {
    name: 'Welcomgroup Graduate School of Hotel Administration',
    location: 'Manipal, Karnataka',
    fees: 700000,
    rating: 4.4,
    placementPercentage: 87,
    courses: ['BHM', 'MBA Hospitality'],
    summary: 'A reputed hospitality institute with international internship opportunities.',
    entranceExam: 'MET',
    minRankGen: 1, maxRankGen: 10000,
    minRankObc: 1, maxRankObc: 10000,
    minRankEws: 1, maxRankEws: 10000,
    minRankSc: 1, maxRankSc: 10000,
    minRankSt: 1, maxRankSt: 10000
  },

  // Arts and Humanities
  {
    name: 'St. Xavier’s College',
    location: 'Mumbai, Maharashtra',
    fees: 85000,
    rating: 4.7,
    placementPercentage: 86,
    courses: ['BA', 'BMS', 'B.Sc IT'],
    summary: 'One of Mumbai’s most prestigious colleges with strong academics and extracurriculars.',
    entranceExam: 'Merit Based',
    minRankGen: 1, maxRankGen: 5000,
    minRankObc: 1, maxRankObc: 5000,
    minRankEws: 1, maxRankEws: 5000,
    minRankSc: 1, maxRankSc: 5000,
    minRankSt: 1, maxRankSt: 5000
  }
];

async function main() {
  console.log('Clearing existing data...');
  await prisma.savedCollege.deleteMany();
  await prisma.college.deleteMany();

  console.log('Seeding Colleges...');
  for (const college of colleges) {
    await prisma.college.create({
      data: college
    });
  }
  
  console.log(`Seeded ${colleges.length} colleges successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
