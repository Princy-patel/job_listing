export interface IJobs {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}

export default interface jobContextType {
  jobs: IJobs[];
  setJobs: React.Dispatch<React.SetStateAction<IJobs[]>>;
}
