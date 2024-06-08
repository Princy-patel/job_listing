import { createContext } from 'react';
import jobContextType from '../../@types/data';

const JobContext = createContext<jobContextType | undefined>(undefined);

export default JobContext;
