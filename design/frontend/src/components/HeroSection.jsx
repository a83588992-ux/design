import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-br from-[#f8fdf6] via-[#f0f9ec] to-[#fef9e7]">
      {/* Desktop: original hero image */}
      <div className="hidden md:block">
        <img
          src="https://customer-assets.emergentagent.com/job_dlims-punjab-clone/artifacts/40rq5lye_Untitled%20design%20%282%29.jpg"
          alt="DLIMS Punjab - Dastak One Window for all Government Services"
          className="w-full h-auto object-contain"
        />
      </div>
      {/* Mobile: dedicated mobile hero image */}
      <div className="md:hidden">
        <img
          src="https://customer-assets.emergentagent.com/job_dlims-punjab-clone/artifacts/vudm5ur3_Screenshot%20%281562%29.png"
          alt="DLIMS Punjab - Dastak One Window for all Government Services"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default HeroSection;
