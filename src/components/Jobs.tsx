import { useEffect, useRef, useState } from "react";
import useJobContext from "../context/useJobContext";
import { IJobs } from "../../@types/data";

function ListOfJobs() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const { jobs, setJobs } = useJobContext();

  // Create a ref to store the original jobs
  const originalJobsRef = useRef<IJobs[]>([]);

  // Set the originalJobsRef.current to the jobs data once it is populated
  useEffect(() => {
    if (jobs.length > 0 && originalJobsRef.current.length === 0) {
      originalJobsRef.current = jobs;
    }
  }, [jobs]);

  useEffect(() => {
    if (selectedSkills.length === 0) {
      setJobs(originalJobsRef.current);
    } else {
      const filtered = originalJobsRef.current.filter((job) => {
        const jobSkills: string[] = [...job.languages, ...job.tools];
        return selectedSkills.every((skill) => jobSkills.includes(skill));
      });
      setJobs(filtered);
    }
  }, [selectedSkills]);

  const handleSkillClick = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSkillRemove = function (skills: string) {
    const updatedSkills = selectedSkills.filter((skill) => skill !== skills);
    setSelectedSkills(updatedSkills);
  };

  const handleClearAllSkills = function () {
    setJobs(originalJobsRef.current);
    setSelectedSkills([]);
  };

  return (
    <div className="p-5">
      {selectedSkills.length > 0 && (
        <div className="flex justify-between items-center bg-white px-6 py-3">
          <div className="flex">
            {selectedSkills.map((skill) => (
              <div key={skill} className="flex flex-row p-3">
                <span
                  className="bg-[#eef6f6] text-[#5ba4a4] font-bold p-2 rounded hover:text-[#eef6f6] hover:bg-[#5ba4a4] cursor-pointer hover:ease-in duration-300"
                  onClick={() => handleSkillRemove(skill)}
                >
                  {skill}
                </span>
                <img
                  src="/images/icon-remove.svg"
                  alt="remove"
                  className="p-2 w-9 h-10 cursor-pointer bg-[#5ba4a4] hover:bg-black hover:ease-in duration-300"
                  onClick={() => handleSkillRemove(skill)}
                />
              </div>
            ))}
          </div>

          <div>
            <span
              className="text-[#5ba4a4] hover:underline hover:decoration-[#5ba4a4] cursor-pointer font-bold"
              onClick={handleClearAllSkills}
            >
              Clear
            </span>
          </div>
        </div>
      )}
      {jobs.map((data) => {
        return (
          <div
            key={data.id}
            className="flex md:flex-row bg-white shadow-lg shadow-lime-[#eef6f6] m-5 p-5 rounded-lg"
          >
            <div className="flex items-center md:items-start">
              <img
                src={data.logo}
                alt={data.company}
                className="h-16 w-16 mr-5"
              />
              <div>
                <div className="flex items-center">
                  <span className="font-bold text-[#5ba4a4]">
                    {data.company}
                  </span>
                  {data.new && (
                    <span className="ml-2 bg-[#5ba4a4] text-white rounded-full px-2 py-1 text-xs">
                      NEW!
                    </span>
                  )}
                  {data.featured && (
                    <span className="ml-2 bg-gray-800 text-white rounded-full px-2 py-1 text-xs">
                      FEATURED
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  <h2 className="font-bold text-[#2c3a3a] text-lg cursor-pointer hover:text-[#5ba4a4] hover:ease-in duration-300">
                    {data.position}
                  </h2>
                </div>
                <div className="mt-2 [&>*]:font-medium [&>*]:text-[#7b8e8e] ">
                  <span className="pr-3">{data.postedAt} · </span>
                  <span className="pr-3">{data.contract} · </span>
                  <span>{data.location}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center mt-4 md:mt-0 md:ml-auto">
              {data.languages.map((lang) => (
                <span
                  key={lang}
                  className="bg-[#eef6f6] text-[#5ba4a4] font-bold mr-4 mb-2 p-2 rounded hover:text-[#eef6f6] hover:bg-[#5ba4a4] cursor-pointer hover:ease-in duration-300"
                  onClick={handleSkillClick.bind(null, lang)}
                >
                  {lang}
                </span>
              ))}
              {data.tools.map((tool) => (
                <span
                  key={tool}
                  className="bg-[#eef6f6] text-[#5ba4a4] font-bold mr-4 mb-2 p-2 rounded hover:text-[#eef6f6] hover:bg-[#5ba4a4] cursor-pointer hover:ease-in duration-300"
                  onClick={handleSkillClick.bind(null, tool)}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListOfJobs;
