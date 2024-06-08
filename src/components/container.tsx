import ListOfJobs from './Jobs';

function Container() {
  return (
    <div className="min-h-screen bg-[#effafa]">
      <img
        src="/images/bg-header-desktop.svg"
        alt="header-image"
        className="w-full bg-[#5ba4a4] overflow-y-hidden"
      />
      <ListOfJobs />
    </div>
  );
}

export default Container;
