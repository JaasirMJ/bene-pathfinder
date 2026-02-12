// Mock data for Benefits GPS platform

export type UserRole = 'citizen' | 'admin' | 'ngo' | 'officer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  profileComplete: number;
  createdAt: string;
}

export interface Scheme {
  id: string;
  title: string;
  category: string;
  ministry: string;
  description: string;
  type: 'central' | 'state';
  state?: string;
  minAge?: number;
  maxAge?: number;
  incomeLimit?: number;
  gender?: 'male' | 'female' | 'all';
  benefits: string;
  documents: string[];
  aiScore?: number;
  ruleMatches?: {
    age: boolean;
    income: boolean;
    location: boolean;
    gender: boolean;
    category: boolean;
  };
}

export interface Application {
  id: string;
  schemeId: string;
  schemeName: string;
  userId: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  submittedAt: string;
  updatedAt: string;
  timeline: {
    status: string;
    date: string;
    note?: string;
  }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-001',
    email: 'john.doe@email.com',
    name: 'John Doe',
    role: 'citizen',
    profileComplete: 75,
    createdAt: '2024-01-15',
  },
  {
    id: 'admin-001',
    email: 'admin@benefitsgps.gov',
    name: 'Admin User',
    role: 'admin',
    profileComplete: 100,
    createdAt: '2023-06-01',
  },
];

// Mock Schemes
export const mockSchemes: Scheme[] = [
  {
    id: 'SCH-001',
    title: 'Senior Citizens Pension Scheme',
    category: 'Pension',
    ministry: 'Ministry of Social Justice',
    description: 'Monthly pension support for senior citizens above 60 years with limited income to ensure dignified living.',
    type: 'central',
    minAge: 60,
    incomeLimit: 200000,
    benefits: '₹3,000/month',
    documents: ['Aadhaar Card', 'Age Proof', 'Income Certificate', 'Bank Details'],
    aiScore: 0.87,
    ruleMatches: { age: true, income: true, location: false, gender: true, category: true },
  },
  {
    id: 'SCH-002',
    title: 'Women Entrepreneurship Fund',
    category: 'Business',
    ministry: 'Ministry of Women & Child Development',
    description: 'Financial assistance and mentorship for women starting or expanding small businesses.',
    type: 'central',
    gender: 'female',
    incomeLimit: 500000,
    benefits: 'Up to ₹10,00,000 loan at 4% interest',
    documents: ['Aadhaar Card', 'Business Plan', 'Income Proof', 'Bank Statement'],
    aiScore: 0.72,
    ruleMatches: { age: true, income: true, location: true, gender: false, category: true },
  },
  {
    id: 'SCH-003',
    title: 'Student Merit Scholarship',
    category: 'Education',
    ministry: 'Ministry of Education',
    description: 'Scholarship for meritorious students from economically weaker sections pursuing higher education.',
    type: 'central',
    maxAge: 30,
    incomeLimit: 300000,
    benefits: '₹50,000/year tuition + ₹20,000 stipend',
    documents: ['Marksheet', 'Income Certificate', 'Admission Letter', 'Bank Details'],
    aiScore: 0.95,
    ruleMatches: { age: true, income: true, location: true, gender: true, category: true },
  },
  {
    id: 'SCH-004',
    title: 'Maharashtra Farmer Support Scheme',
    category: 'Agriculture',
    ministry: 'State Agriculture Department',
    description: 'Crop insurance and input subsidy for small and marginal farmers in Maharashtra.',
    type: 'state',
    state: 'Maharashtra',
    incomeLimit: 250000,
    benefits: 'Crop insurance + ₹6,000/year input subsidy',
    documents: ['Land Records', 'Aadhaar Card', 'Bank Details', 'Farmer ID'],
    aiScore: 0.45,
    ruleMatches: { age: true, income: true, location: false, gender: true, category: false },
  },
  {
    id: 'SCH-005',
    title: 'Disability Support Allowance',
    category: 'Disability',
    ministry: 'Ministry of Social Justice',
    description: 'Monthly allowance for persons with disabilities to support daily living and medical expenses.',
    type: 'central',
    incomeLimit: 150000,
    benefits: '₹2,500/month + Medical support',
    documents: ['Disability Certificate', 'Aadhaar Card', 'Medical Records', 'Bank Details'],
    aiScore: 0.68,
    ruleMatches: { age: true, income: true, location: true, gender: true, category: false },
  },
  {
    id: 'SCH-006',
    title: 'Youth Skill Development Program',
    category: 'Skills',
    ministry: 'Ministry of Skill Development',
    description: 'Free vocational training and certification for unemployed youth aged 18-35.',
    type: 'central',
    minAge: 18,
    maxAge: 35,
    incomeLimit: 400000,
    benefits: 'Free training + Certification + ₹5,000 stipend',
    documents: ['Aadhaar Card', 'Education Certificate', 'Age Proof'],
    aiScore: 0.82,
    ruleMatches: { age: true, income: true, location: true, gender: true, category: true },
  },
];

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: 'APP-001',
    schemeId: 'SCH-003',
    schemeName: 'Student Merit Scholarship',
    userId: 'user-001',
    status: 'under_review',
    submittedAt: '2024-01-20',
    updatedAt: '2024-01-25',
    timeline: [
      { status: 'Submitted', date: '2024-01-20', note: 'Application received' },
      { status: 'Under Review', date: '2024-01-25', note: 'Documents being verified' },
    ],
  },
  {
    id: 'APP-002',
    schemeId: 'SCH-001',
    schemeName: 'Senior Citizens Pension Scheme',
    userId: 'user-001',
    status: 'approved',
    submittedAt: '2023-12-01',
    updatedAt: '2024-01-10',
    timeline: [
      { status: 'Submitted', date: '2023-12-01', note: 'Application received' },
      { status: 'Under Review', date: '2023-12-15', note: 'Documents being verified' },
      { status: 'Approved', date: '2024-01-10', note: 'Congratulations! Your application has been approved.' },
    ],
  },
  {
    id: 'APP-003',
    schemeId: 'SCH-006',
    schemeName: 'Youth Skill Development Program',
    userId: 'user-001',
    status: 'submitted',
    submittedAt: '2024-02-01',
    updatedAt: '2024-02-01',
    timeline: [
      { status: 'Submitted', date: '2024-02-01', note: 'Application received' },
    ],
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'Application Approved!',
    message: 'Your application for Senior Citizens Pension Scheme has been approved.',
    type: 'success',
    read: false,
    createdAt: '2024-01-10',
  },
  {
    id: 'notif-002',
    title: 'New Scheme Available',
    message: 'A new scholarship scheme matching your profile is now available.',
    type: 'info',
    read: false,
    createdAt: '2024-01-28',
  },
  {
    id: 'notif-003',
    title: 'Complete Your Profile',
    message: 'Complete your profile to unlock more scheme recommendations.',
    type: 'warning',
    read: true,
    createdAt: '2024-01-05',
  },
];

// Categories for filtering
export const schemeCategories = [
  'All',
  'Pension',
  'Education',
  'Business',
  'Agriculture',
  'Disability',
  'Skills',
  'Healthcare',
  'Housing',
  'Employment',
  'Women & Child',
  'Food Security',
];

// States for filtering
export const indianStates = [
  'All States',
  'Andhra Pradesh',
  'Delhi',
  'Gujarat',
  'Karnataka',
  'Kerala',
  'Maharashtra',
  'Rajasthan',
  'Tamil Nadu',
  'Uttar Pradesh',
  'West Bengal',
];
