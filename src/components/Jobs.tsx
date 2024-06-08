import { useEffect, useRef, useState } from 'react';
import useJobContext from '../context/useJobContext';
import { IJobs } from '../../@types/data';

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
        <div className="flex items-center justify-between bg-white px-6 py-3">
          <div className="flex">
            {selectedSkills.map((skill) => (
              <div key={skill} className="flex flex-row p-3">
                <span
                  className="cursor-pointer rounded bg-[#eef6f6] p-2 font-bold text-[#5ba4a4] duration-300 hover:bg-[#5ba4a4] hover:text-[#eef6f6] hover:ease-in"
                  onClick={() => handleSkillRemove(skill)}
                >
                  {skill}
                </span>
                <img
                  src="/images/icon-remove.svg"
                  alt="remove"
                  className="h-10 w-9 cursor-pointer bg-[#5ba4a4] p-2 duration-300 hover:bg-black hover:ease-in"
                  onClick={() => handleSkillRemove(skill)}
                />
              </div>
            ))}
          </div>

          <div>
            <span
              className="cursor-pointer font-bold text-[#5ba4a4] hover:underline hover:decoration-[#5ba4a4]"
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
            className="shadow-lime-[#eef6f6] m-5 flex rounded-lg bg-white p-5 shadow-lg md:flex-row"
          >
            <div className="flex items-center md:items-start">
              <img
                src={data.logo}
                alt={data.company}
                className="mr-5 h-16 w-16"
              />
              <div>
                <div className="flex items-center">
                  <span className="font-bold text-[#5ba4a4]">
                    {data.company}
                  </span>
                  {data.new && (
                    <span className="ml-2 rounded-full bg-[#5ba4a4] px-2 py-1 text-xs text-white">
                      NEW!
                    </span>
                  )}
                  {data.featured && (
                    <span className="ml-2 rounded-full bg-gray-800 px-2 py-1 text-xs text-white">
                      FEATURED
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  <h2 className="cursor-pointer text-lg font-bold text-[#2c3a3a] duration-300 hover:text-[#5ba4a4] hover:ease-in">
                    {data.position}
                  </h2>
                </div>
                <div className="mt-2 [&>*]:font-medium [&>*]:text-[#7b8e8e]">
                  <span className="pr-3">{data.postedAt} · </span>
                  <span className="pr-3">{data.contract} · </span>
                  <span>{data.location}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center md:ml-auto md:mt-0">
              {data.languages.map((lang) => (
                <span
                  key={lang}
                  className="mb-2 mr-4 cursor-pointer rounded bg-[#eef6f6] p-2 font-bold text-[#5ba4a4] duration-300 hover:bg-[#5ba4a4] hover:text-[#eef6f6] hover:ease-in"
                  onClick={handleSkillClick.bind(null, lang)}
                >
                  {lang}
                </span>
              ))}
              {data.tools.map((tool) => (
                <span
                  key={tool}
                  className="mb-2 mr-4 cursor-pointer rounded bg-[#eef6f6] p-2 font-bold text-[#5ba4a4] duration-300 hover:bg-[#5ba4a4] hover:text-[#eef6f6] hover:ease-in"
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
