import React, { PropsWithChildren, useEffect, useState } from "react";
import JobContext from "./jobContext";
import { IJobs } from "../../@types/data";

const JobProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [jobs, setJobs] = useState<IJobs[]>([]);

  useEffect(() => {
    async function getAllJobs() {
      await import("../../data/data.json").then((data) => {
        setJobs(data.default);
      });
    }

    getAllJobs();
  }, []);

  return (
    <JobContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobContext.Provider>
  );
};

export default JobProvider;
