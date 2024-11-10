export interface Employee {
    id: number;
    name: string;
    companyName: string;
    email: string;
    contactNo: number | null;
    designation: 'Software Developer' | 'Senior Software Developer' | 'Quality Assurance' | 'Technical Lead' | 'Manager';
    avatar: string;
  }