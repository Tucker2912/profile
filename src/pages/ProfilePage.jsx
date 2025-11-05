<div className="profile-container">
  
  {/* ส่วนที่ 1: Header */}
  <div className="profile-header">
      <div className="avatar">R</div>
      <div className="info">
          <h2>Rainbow Pinky</h2>
          {/* ฟิลด์แสดงข้อมูล */}
          <div>University: KMUTT</div>
          <div>Contact: rainbowpink@kmutt.ac.th</div>
      </div>
  </div>

  {/* ส่วนที่ 2: Projects Section */}
  <h3>My Projects</h3>
  <div className="projects-section-horizontal">
      {/* การ์ดโปรเจกต์เรียงแนวนอน */}
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      ...
  </div>

  {/* ส่วนที่ 3: ปุ่ม Home (อยู่ล่างสุด) */}
  <div className="home-icon-placeholder">
      <HomeIcon />
  </div>

</div>