export interface Career {
  slug: string;
  title: string;
  description: string;
  image: string;
  fullDescription: string;
  scope: string;
  qualifications: string[];
  jobOutlook: string;
  averageSalary: string;
  workEnvironment: string;
  skills: string[];
  relatedCareers: string[];
}

export interface College {
  id: string;
  name: string;
  image: string;
  location: string;
  state: string;
  city: string;
  country: string;
  fees: string;
  duration: string;
  scope: string;
  placementStats: {
    rate: string;
    averagePackage: string;
    highestPackage: string;
  };
  topRecruiters: string[];
  courses: string[];
  rating: number;
  establishedYear: string;
  type: string; // Government, Private, Deemed
}

export const careers: Career[] = [
  {
    slug: "software-engineering",
    title: "Software Engineering",
    description: "Design, develop, and maintain software applications and systems using various programming languages and technologies.",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
    fullDescription: "Software engineers are the architects of the digital world, creating everything from mobile apps to enterprise systems. They work with cutting-edge technologies to solve complex problems and build scalable solutions that impact millions of users worldwide.",
    scope: "Software engineering offers vast opportunities across industries including technology, finance, healthcare, gaming, e-commerce, and more. With the digital transformation accelerating globally, demand continues to grow exponentially.",
    qualifications: [
      "Bachelor's degree in Computer Science, Software Engineering, or related field",
      "Proficiency in programming languages (Python, Java, JavaScript, C++, etc.)",
      "Understanding of software development methodologies",
      "Knowledge of databases and system architecture",
      "Problem-solving and analytical thinking skills"
    ],
    jobOutlook: "Excellent - Expected to grow 22% from 2020 to 2030, much faster than average",
    averageSalary: "₹6-25 LPA (Entry to Senior level)",
    workEnvironment: "Office-based, remote, or hybrid work options. Collaborative team environment with opportunities for independent work.",
    skills: ["Programming", "Problem Solving", "System Design", "Testing", "Version Control", "Agile Methodologies"],
    relatedCareers: ["data-science", "cybersecurity", "product-management"]
  },
  {
    slug: "data-science",
    title: "Data Science",
    description: "Extract insights from large datasets using statistical analysis, machine learning, and data visualization techniques.",
    image: "https://images.pexels.com/photos/669996/pexels-photo-669996.jpeg",
    fullDescription: "Data scientists combine statistical expertise, programming skills, and domain knowledge to extract meaningful insights from complex datasets. They help organizations make data-driven decisions and predict future trends.",
    scope: "High demand across all industries including technology, finance, healthcare, retail, and government. Organizations increasingly rely on data-driven insights for competitive advantage.",
    qualifications: [
      "Bachelor's/Master's in Statistics, Mathematics, Computer Science, or related field",
      "Strong programming skills in Python/R",
      "Knowledge of machine learning algorithms",
      "Statistical analysis and data visualization skills",
      "Understanding of databases and big data technologies"
    ],
    jobOutlook: "Outstanding - Expected to grow 35% from 2020 to 2030",
    averageSalary: "₹8-30 LPA (Entry to Senior level)",
    workEnvironment: "Mix of independent analysis and collaborative team projects. Often remote-friendly with flexible hours.",
    skills: ["Python/R", "Machine Learning", "Statistics", "Data Visualization", "SQL", "Big Data Technologies"],
    relatedCareers: ["software-engineering", "research-scientist", "business-analyst"]
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    description: "Protect organizations from digital threats by implementing security measures and monitoring for potential breaches.",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
    fullDescription: "Cybersecurity professionals are the digital guardians who protect organizations from cyber threats. They design security systems, monitor networks, and respond to incidents to keep data and systems safe.",
    scope: "Critical demand across all industries as cyber threats continue to evolve. Government, financial services, healthcare, and technology sectors have the highest demand.",
    qualifications: [
      "Bachelor's degree in Cybersecurity, Computer Science, or related field",
      "Knowledge of security frameworks and protocols",
      "Understanding of networking and system administration",
      "Certification in security (CISSP, CEH, Security+)",
      "Analytical and problem-solving skills"
    ],
    jobOutlook: "Exceptional - Expected to grow 33% from 2020 to 2030",
    averageSalary: "₹7-28 LPA (Entry to Senior level)",
    workEnvironment: "High-pressure environment with on-call responsibilities. Mix of monitoring, analysis, and incident response work.",
    skills: ["Network Security", "Incident Response", "Risk Assessment", "Security Auditing", "Ethical Hacking", "Compliance"],
    relatedCareers: ["software-engineering", "network-administration", "forensic-analysis"]
  },
  {
    slug: "medicine",
    title: "Medicine",
    description: "Diagnose, treat, and prevent illnesses to improve patient health and save lives across various medical specialties.",
    image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg",
    fullDescription: "Medical professionals dedicate their careers to healing and helping others. They work in various specialties from general practice to surgery, combining scientific knowledge with compassionate care.",
    scope: "Essential profession with consistent demand. Opportunities in hospitals, clinics, research, public health, and specialized medical fields.",
    qualifications: [
      "MBBS degree (5.5 years including internship)",
      "Medical license and registration",
      "Specialization through MD/MS for advanced practice",
      "Strong academic performance in sciences",
      "Excellent communication and empathy skills"
    ],
    jobOutlook: "Very Good - Consistent demand with aging population increasing need",
    averageSalary: "₹6-50+ LPA (varies greatly by specialization and experience)",
    workEnvironment: "Hospital, clinic, or private practice settings. Long hours and on-call responsibilities are common.",
    skills: ["Clinical Diagnosis", "Patient Care", "Medical Procedures", "Communication", "Critical Thinking", "Empathy"],
    relatedCareers: ["nursing", "pharmacy", "medical-research"]
  },
  {
    slug: "finance",
    title: "Finance",
    description: "Manage financial resources, investments, and provide strategic advice to individuals and organizations.",
    image: "https://images.pexels.com/photos/164523/pexels-photo-164523.jpeg",
    fullDescription: "Finance professionals help individuals and organizations manage money, make investment decisions, and plan for the future. They work in banking, investment firms, corporations, and consulting.",
    scope: "Wide range of opportunities in banking, investment management, corporate finance, fintech, and financial consulting across global markets.",
    qualifications: [
      "Bachelor's degree in Finance, Economics, Business Administration, or related field",
      "Strong analytical and quantitative skills",
      "Knowledge of financial markets and instruments",
      "Professional certifications (CFA, FRM, etc.) for advancement",
      "Excellent communication and presentation skills"
    ],
    jobOutlook: "Good - Expected to grow 8% from 2020 to 2030",
    averageSalary: "₹5-40+ LPA (varies by role and experience)",
    workEnvironment: "Fast-paced, competitive environment. Mix of analysis, client interaction, and strategic planning.",
    skills: ["Financial Analysis", "Investment Management", "Risk Assessment", "Financial Modeling", "Market Research", "Client Relations"],
    relatedCareers: ["consulting", "business-analyst", "investment-banking"]
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "Promote brands and products through digital channels including social media, search engines, and online advertising.",
    image: "https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg",
    fullDescription: "Digital marketers help businesses reach and engage customers through online channels. They create campaigns, analyze data, and optimize strategies to drive growth and brand awareness.",
    scope: "Rapidly growing field with opportunities across all industries as businesses shift to digital-first strategies. High demand for specialists in SEO, social media, and data analytics.",
    qualifications: [
      "Bachelor's degree in Marketing, Communications, Business, or related field",
      "Understanding of digital marketing channels and tools",
      "Knowledge of analytics platforms (Google Analytics, social media insights)",
      "Creative thinking and content creation skills",
      "Data analysis and interpretation abilities"
    ],
    jobOutlook: "Excellent - Expected to grow 19% from 2020 to 2030",
    averageSalary: "₹4-20 LPA (Entry to Senior level)",
    workEnvironment: "Creative and dynamic environment with mix of strategy, content creation, and data analysis. Often remote-friendly.",
    skills: ["SEO/SEM", "Social Media Marketing", "Content Creation", "Analytics", "Email Marketing", "PPC Advertising"],
    relatedCareers: ["graphic-design", "content-writing", "brand-management"]
  }
];

export const colleges: College[] = [
  {
    id: "iit-bombay",
    name: "Indian Institute of Technology Bombay",
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    city: "Mumbai",
    country: "India",
    fees: "₹2.5 LPA",
    duration: "4 years",
    scope: "Premier engineering institute with excellent placement record",
    placementStats: {
      rate: "95%",
      averagePackage: "₹18 LPA",
      highestPackage: "₹1.4 CPA"
    },
    topRecruiters: ["Google", "Microsoft", "Amazon", "Goldman Sachs", "McKinsey"],
    courses: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Chemical Engineering"],
    rating: 4.8,
    establishedYear: "1958",
    type: "Government"
  },
  {
    id: "aiims-delhi",
    name: "All India Institute of Medical Sciences Delhi",
    image: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    country: "India",
    fees: "₹1.4 LPA",
    duration: "5.5 years",
    scope: "Top medical college with excellent clinical exposure",
    placementStats: {
      rate: "100%",
      averagePackage: "₹12 LPA",
      highestPackage: "₹25 LPA"
    },
    topRecruiters: ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Medanta"],
    courses: ["MBBS", "MD", "MS", "MCh", "DM"],
    rating: 4.9,
    establishedYear: "1956",
    type: "Government"
  },
  {
    id: "iim-ahmedabad",
    name: "Indian Institute of Management Ahmedabad",
    image: "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg",
    location: "Ahmedabad, Gujarat",
    state: "Gujarat",
    city: "Ahmedabad",
    country: "India",
    fees: "₹23 LPA",
    duration: "2 years",
    scope: "Premier business school with global recognition",
    placementStats: {
      rate: "100%",
      averagePackage: "₹33 LPA",
      highestPackage: "₹70 LPA"
    },
    topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "JP Morgan"],
    courses: ["MBA", "Executive MBA", "Fellow Programme"],
    rating: 4.7,
    establishedYear: "1961",
    type: "Government"
  },
  {
    id: "nid-ahmedabad",
    name: "National Institute of Design",
    image: "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg",
    location: "Ahmedabad, Gujarat",
    state: "Gujarat",
    city: "Ahmedabad",
    country: "India",
    fees: "₹3.5 LPA",
    duration: "4 years",
    scope: "Premier design institute fostering creativity and innovation",
    placementStats: {
      rate: "85%",
      averagePackage: "₹8 LPA",
      highestPackage: "₹18 LPA"
    },
    topRecruiters: ["Tata Motors", "Godrej", "Samsung", "Adobe", "IDEO"],
    courses: ["Product Design", "Communication Design", "Textile Design", "New Media Design"],
    rating: 4.5,
    establishedYear: "1961",
    type: "Government"
  },
  {
    id: "iisc-bangalore",
    name: "Indian Institute of Science",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    city: "Bangalore",
    country: "India",
    fees: "₹2 LPA",
    duration: "4 years",
    scope: "Leading research institute with focus on science and technology",
    placementStats: {
      rate: "90%",
      averagePackage: "₹15 LPA",
      highestPackage: "₹45 LPA"
    },
    topRecruiters: ["ISRO", "DRDO", "Google", "Microsoft", "Intel"],
    courses: ["Physics", "Chemistry", "Mathematics", "Computer Science", "Biological Sciences"],
    rating: 4.6,
    establishedYear: "1909",
    type: "Government"
  },
  {
    id: "srcc-delhi",
    name: "Shri Ram College of Commerce",
    image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    country: "India",
    fees: "₹0.5 LPA",
    duration: "3 years",
    scope: "Premier commerce college with excellent industry connections",
    placementStats: {
      rate: "92%",
      averagePackage: "₹12 LPA",
      highestPackage: "₹30 LPA"
    },
    topRecruiters: ["EY", "Deloitte", "KPMG", "Goldman Sachs", "JP Morgan"],
    courses: ["B.Com (Hons)", "B.A. Economics (Hons)"],
    rating: 4.4,
    establishedYear: "1926",
    type: "Government"
  },
  // Additional colleges for better coverage
  {
    id: "mit-pune",
    name: "Maharashtra Institute of Technology",
    image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg",
    location: "Pune, Maharashtra",
    state: "Maharashtra",
    city: "Pune",
    country: "India",
    fees: "₹4.5 LPA",
    duration: "4 years",
    scope: "Leading private engineering college with strong industry partnerships",
    placementStats: {
      rate: "88%",
      averagePackage: "₹7.5 LPA",
      highestPackage: "₹25 LPA"
    },
    topRecruiters: ["TCS", "Infosys", "Wipro", "Cognizant", "Accenture"],
    courses: ["Computer Engineering", "Information Technology", "Electronics", "Mechanical Engineering"],
    rating: 4.2,
    establishedYear: "1983",
    type: "Private"
  },
  {
    id: "manipal-bangalore",
    name: "Manipal Institute of Technology",
    image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    city: "Bangalore",
    country: "India",
    fees: "₹6.8 LPA",
    duration: "4 years",
    scope: "Renowned private university with excellent infrastructure",
    placementStats: {
      rate: "85%",
      averagePackage: "₹6.2 LPA",
      highestPackage: "₹22 LPA"
    },
    topRecruiters: ["Amazon", "Microsoft", "Oracle", "IBM", "Flipkart"],
    courses: ["Computer Science", "Information Technology", "Electronics", "Biotechnology"],
    rating: 4.1,
    establishedYear: "1957",
    type: "Private"
  },
  {
    id: "vit-chennai",
    name: "Vellore Institute of Technology Chennai",
    image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Chennai",
    country: "India",
    fees: "₹5.2 LPA",
    duration: "4 years",
    scope: "Top private university with strong placement record",
    placementStats: {
      rate: "90%",
      averagePackage: "₹8.5 LPA",
      highestPackage: "₹35 LPA"
    },
    topRecruiters: ["Google", "Amazon", "Microsoft", "Samsung", "Qualcomm"],
    courses: ["Computer Science", "Electronics", "Mechanical", "Chemical Engineering"],
    rating: 4.3,
    establishedYear: "2010",
    type: "Private"
  },
  {
    id: "jamia-delhi",
    name: "Jamia Millia Islamia",
    image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    country: "India",
    fees: "₹1.2 LPA",
    duration: "4 years",
    scope: "Central university with diverse academic programs",
    placementStats: {
      rate: "75%",
      averagePackage: "₹5.5 LPA",
      highestPackage: "₹15 LPA"
    },
    topRecruiters: ["TCS", "Infosys", "HCL", "Tech Mahindra", "Capgemini"],
    courses: ["Computer Science", "Electronics", "Civil Engineering", "Architecture"],
    rating: 4.0,
    establishedYear: "1920",
    type: "Government"
  },
  {
    id: "christ-bangalore",
    name: "Christ University",
    image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    city: "Bangalore",
    country: "India",
    fees: "₹3.8 LPA",
    duration: "3 years",
    scope: "Premier private university with holistic education approach",
    placementStats: {
      rate: "82%",
      averagePackage: "₹6.8 LPA",
      highestPackage: "₹18 LPA"
    },
    topRecruiters: ["Deloitte", "EY", "KPMG", "Accenture", "IBM"],
    courses: ["BBA", "BCA", "B.Com", "Economics", "Psychology"],
    rating: 4.2,
    establishedYear: "1969",
    type: "Private"
  }
];

export function getCareerBySlug(slug: string): Career | undefined {
  return careers.find(career => career.slug === slug);
}

export function getRelatedCareers(career: Career): Career[] {
  return career.relatedCareers
    .map(slug => getCareerBySlug(slug))
    .filter((c): c is Career => c !== undefined);
}

export function getCollegesByLocation(country: string, state: string, city: string, careerField?: string): College[] {
  return colleges.filter(college => {
    const locationMatch = college.country.toLowerCase() === country.toLowerCase() &&
                         college.state.toLowerCase() === state.toLowerCase() &&
                         college.city.toLowerCase() === city.toLowerCase();
    
    if (!careerField) return locationMatch;
    
    // Basic career field matching - in a real app, this would be more sophisticated
    const fieldMatch = college.courses.some(course => 
      course.toLowerCase().includes(careerField.toLowerCase()) ||
      careerField.toLowerCase().includes(course.toLowerCase())
    );
    
    return locationMatch && fieldMatch;
  });
}

export function getAllCountries(): string[] {
  return [...new Set(colleges.map(college => college.country))].sort();
}

export function getAllStates(): string[] {
  return [...new Set(colleges.map(college => college.state))].sort();
}

export function getStatesByCountry(country: string): string[] {
  return [...new Set(
    colleges
      .filter(college => college.country === country)
      .map(college => college.state)
  )].sort();
}

export function getCitiesByState(country: string, state: string): string[] {
  return [...new Set(
    colleges
      .filter(college => college.country === country && college.state === state)
      .map(college => college.city)
  )].sort();
}