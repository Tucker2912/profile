// src/pages/ProfilePage.jsx

import React from 'react';
import ProjectCard from '../components/ProjectCard';
import ProfileHeader from '../components/ProfileHeader';
// 🚨 Import useNavigate จาก React Router (ถ้าต้องการให้ปุ่ม Home ทำงาน)
// import { useNavigate } from 'react-router-dom';

// 🚨 รับ props 'showControls' เข้ามาจาก App.jsx
function ProfilePage({ showControls }) { 
    
    // 💡 สร้างข้อมูลจำลองของโปรเจกต์
    const projectsData = [
    { id: "proj_a_001", title: "Project A ", description: "AI system for KMUTT.", tags: ["AI", "2023"], status: "Pending", editMode: false },
    { id: "proj_b_002", title: "Project B ", description: "Web dashboard for health data.", tags: ["React", "2024"], status: "Approved", editMode: false },
    { id: "proj_c_003", title: "Project C ", description: "Hospital record system.", tags: ["Database", "Node.js"], status: "Failed", editMode: false },
    { id: "proj_d_004", title: "Project D ", description: "Monitoring system for IoT devices.", tags: ["IoT", "Cloud"], status: "Draft", editMode: false },
    { id: "proj_e_005", title: "Project E ", description: "Project Management Tool.", tags: ["Angular", "Web"], status: "In Process", editMode: false },
    { id: "proj_f_006", title: "Project F ", description: "Financial tracking app.", tags: ["Node", "Web"], status: "Pending", editMode: false }, 
    ];
    
    // const navigate = useNavigate(); // ถ้าใช้

    return (
        <div className="profile-container">
            
            {/* 🚨 ห่อ ProfileHeader ด้วย Wrapper เพื่อจัดกึ่งกลาง */}
            <div className="profile-header-wrapper">
                <ProfileHeader 
                    name="Rainbow Pinky"
                    university="KMUTT"
                    contact={"rainbowpink@kmutt.ac.th"}
                    // 🚨 ส่ง props ที่จำเป็น (แต่ไม่ใช้งานจริง)
                    showEdit={false} 
                    onClickEdit={() => {}}
                    onClickSave={() => {}}
                    // 🚨 ส่ง props showControls=false ที่ได้รับมาจาก App.jsx
                    showControls={showControls} 
                />
            </div>

            {/* ส่วนที่ 2: Projects Section */}
            <h3 className="projects-title">My Projects</h3> {/* 🚨 เพิ่ม class สำหรับจัด style */}
            <div className="status-projects-grid"> {/* 🚨 ใช้ class status-projects-grid ที่เราจัด style ไว้ */}
                
                {projectsData.map(project => (
                    <ProjectCard 
                        key={project.id}
                        id={project.id} // ส่ง id ให้ ProjectCard
                        title={project.title} // เปลี่ยนจาก projectTitle เป็น title
                        description={project.description} // เพิ่ม description
                        tags={project.tags}
                        status={''}
                        editMode={false} // ในหน้าโปรไฟล์หลัก ไม่เปิดโหมดแก้ไข
                    />
                ))}
            </div>

            {/* ส่วนที่ 3: ปุ่ม Home (อยู่ล่างสุด) */}
            <div className="home-icon-placeholder">
                <svg viewBox="0 0 24 24" fill="#ff99cc" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
            </div>
        </div>
    );
}

export default ProfilePage;