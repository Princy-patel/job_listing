import { useContext } from "react";
import JobContext from "./jobContext";

const useJobContext = function () {
  const context = useContext(JobContext);

  if (!context) {
    throw new Error("useJobContext must be used within a JobProvider");
  }

  return context;
};

export default useJobContext;
