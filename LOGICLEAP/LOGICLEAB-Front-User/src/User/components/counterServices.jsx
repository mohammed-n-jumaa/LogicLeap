import React, { useState, useEffect } from 'react';

const StatsSection = () => {
  const [clientsCount, setClientsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [hoursCount, setHoursCount] = useState(0);
  const [workersCount, setWorkersCount] = useState(0);

  useEffect(() => {
    const updateCounters = () => {
      // تعيين القيم النهائية لكل عداد
      setClientsCount(232);
      setProjectsCount(521);
      setHoursCount(1453);
      setWorkersCount(32);
    };

    // تحديث العدادات بعد فترة زمنية محددة (مثلاً بعد 1 ثانية)
    const timer = setTimeout(updateCounters, 1000);

    // إلغاء تسجيل المؤقت عندما يتم تفريغ المكون
    return () => clearTimeout(timer);
  }, []); // يتم تمرير مصفوفة فارغة كتابع لـ useEffect لضمان أن الأمر يتم تنفيذه مرة واحدة فقط

  return (
    <section id="stats" className="stats section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span className="purecounter">{clientsCount}</span>
              <p>Clients</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span className="purecounter">{projectsCount}</span>
              <p>Projects</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span className="purecounter">{hoursCount}</span>
              <p>Hours Of Support</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span className="purecounter">{workersCount}</span>
              <p>Workers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
