import React from 'react';

const DownloadSection = () => {
  return (
    <section className="w-full bg-white">
      {/* Desktop */}
      <div className="hidden md:block">
        <img
          src="https://customer-assets.emergentagent.com/job_dlims-punjab-clone/artifacts/4dxi3t6e_Untitled%20design%20%283%29.jpg"
          alt="Download the app Dastak - Doorstep Services"
          className="w-full h-auto object-contain"
        />
      </div>
      {/* Mobile: scale up center portion for readability */}
      <div className="md:hidden overflow-hidden">
        <img
          src="https://customer-assets.emergentagent.com/job_dlims-punjab-clone/artifacts/4dxi3t6e_Untitled%20design%20%283%29.jpg"
          alt="Download the app Dastak - Doorstep Services"
          className="w-[170%] max-w-none h-auto -ml-[20%]"
        />
      </div>
    </section>
  );
};

export default DownloadSection;
