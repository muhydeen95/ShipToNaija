export const INDUSTRIES: string[] = [
  'Agriculture',
  'Aerospace',
  'Construction',
  'Education',
  'Energy',
  'Entertainment',
  'Fashion',
  'Food Processing',
  'Finance',
  'Healthcare',
  'Hospitality',
  'Manufacturing',
  'Media',
  'Mining',
  'Oil & Gas',
  'Supply Chain',
  'Inventory Management',
  'Technology',
  'Telecommunication',
  'Transport',
  'Others',
];

export const REFERRER_SOURCES: { source: string; enum: number }[] = [
  { source: 'Search Engines', enum: 1 },
  { source: 'Social Media', enum: 2 },
  { source: 'Recommendations', enum: 3 },
  { source: 'Blogs And Articles', enum: 4 },
  { source: 'Others', enum: 5 },
];

export const JOB_TITLES: any[] = [
  'Accountant',
  'Artist',
  'Consultant',
  'Dentist',
  'Economist',
  'Electrician',
  'Engineer',
  'Fashion Designer',
  'Finance Analyst',
  'HR Professional',
  'Lawyer',
  'Legal Counsel',
  'Marketer',
  'Medical Doctor',
  'Nurse',
  'Nutritionist',
  'Pharmacist',
  'Product Designer',
  'Sales Professional',
  'Software Developer / Engineer',
  'Teacher',
  'Others',
];

export const PRODUCT_INTEREST: any[] = [
  {
    name: 'E-Signing',
    value: 1,
  },
  {
    name: 'Document Manager',
    value: 2,
  },
  {
    name: 'Process Builder',
    value: 3,
  },
  {
    name: 'Invoicing',
    value: 4,
  },
  {
    name: 'Contract Management',
    value: 5,
  },
  {
    name: 'Vendor Management (Self-Service Portal)',
    value: 6,
  },
  {
    name: 'Expense Management',
    value: 7,
  },
  {
    name: 'Accounting',
    value: 8,
  },
  {
    name: 'Asset Register',
    value: 9,
  },
  {
    name: 'Inventory Management',
    value: 10,
  },
  {
    name: 'Fleet Management',
    value: 11,
  },
  {
    name: 'Project Management',
    value: 12,
  },
  {
    name: 'HR Management (Recruitment, Onboarding, Leave Management & Appraisal)',
    value: 13,
  },
  {
    name: 'Payroll Management',
    value: 14,
  },
  {
    name: 'Customer Support',
    value: 15,
  },
  {
    name: 'Systems Integration',
    value: 16,
  },
  {
    name: 'Customization',
    value: 17,
  },
  {
    name: 'Others',
    value: 18,
  },
];

export const ContactUsTypeOfAccount = [
  {
    name: 'Individual',
    value: 1,
  },
  {
    name: 'Corporate',
    value: 2,
  },
];

export const ContactUsBusinessSize = [
  {
    name: '1',
    value: 1,
  },
  {
    name: '2-10',
    value: 2,
  },
  {
    name: '11-50',
    value: 3,
  },
  {
    name: '51-100',
    value: 4,
  },
  {
    name: '101-500',
    value: 5,
  },
  {
    name: '501-1000',
    value: 6,
  },
  {
    name: '1000+',
    value: 7,
  },
];

export const States = [
  { name: 'Abia', geoPoliticalZone: 'South East (SE)' },
  { name: 'Adamawa', geoPoliticalZone: 'North East (NE)' },
  { name: 'Akwa Ibom', geoPoliticalZone: 'South South (SS)' },
  { name: 'Anambra', geoPoliticalZone: 'South East (SE)' },
  { name: 'Bauchi', geoPoliticalZone: 'North East (NE)' },
  { name: 'Bayelsa', geoPoliticalZone: 'South South (SS)' },
  { name: 'Benue', geoPoliticalZone: 'North Central (NC)' },
  { name: 'Borno', geoPoliticalZone: 'North East (NE)' },
  { name: 'Cross River', geoPoliticalZone: 'South South (SS)' },
  { name: 'Delta', geoPoliticalZone: 'South South (SS)' },
  { name: 'Ebonyi', geoPoliticalZone: 'South East (SE)' },
  { name: 'Edo', geoPoliticalZone: 'South South (SS)' },
  { name: 'Ekiti', geoPoliticalZone: 'South West (SW)' },
  { name: 'Enugu', geoPoliticalZone: 'South East (SE)' },
  { name: 'FCT - Abuja', geoPoliticalZone: 'North Central (NC)' },
  { name: 'Gombe', geoPoliticalZone: 'North East (NE)' },
  { name: 'Imo', geoPoliticalZone: 'South East (SE)' },
  { name: 'Jigawa', geoPoliticalZone: 'North West (NW)' },
  { name: 'Kaduna', geoPoliticalZone: 'North West (NW)' },
  { name: 'Kano', geoPoliticalZone: 'North West (NW)' },
  { name: 'Katsina', geoPoliticalZone: 'North West (NW)' },
  { name: 'Kebbi', geoPoliticalZone: 'North West (NW)' },
  { name: 'Kogi', geoPoliticalZone: 'North Central (NC)' },
  { name: 'Kwara', geoPoliticalZone: 'North Central (NC)' },
  { name: 'Lagos', geoPoliticalZone: 'South West (SW)' },
  { name: 'Nasarawa', geoPoliticalZone: 'North Central (NC)' },
  { name: 'Niger', geoPoliticalZone: 'North Central (NC)' },
  { name: 'Ogun', geoPoliticalZone: 'South West (SW)' },
  { name: 'Ondo', geoPoliticalZone: 'South West (SW)' },
  { name: 'Osun', geoPoliticalZone: 'South West (SW)' },
  { name: 'Oyo', geoPoliticalZone: 'South West (SW)' },
  { name: 'Plateau', geoPoliticalZone: 'North Central (NC)' },
  { name: 'Rivers', geoPoliticalZone: 'South South (SS)' },
  { name: 'Sokoto', geoPoliticalZone: 'North West (NW)' },
  { name: 'Taraba', geoPoliticalZone: 'North East (NE)' },
  { name: 'Yobe', geoPoliticalZone: 'North East (NE)' },
  { name: 'Zamfara', geoPoliticalZone: 'North West (NW)' },
];

export const GeopoliticalZones = [
  'North Central (NC)',
  'North East (NE)',
  'North West (NW)',
  'South West (SW)',
  'South East (SE)',
  'South (SS)',
];
