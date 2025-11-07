// src/pages/WorkStatusPage.jsx

import React, { useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProjectCard from '../components/ProjectCard';
import './StatusPage.css';

// 🚨 รับ props 'showControls' เข้ามาจาก App.jsx
function WorkStatusPage({ showControls }) { 
    const [isEditing, setIsEditing] = useState(false);

    // ข้อมูลทั้งหมดของโปรเจ็กต์
    const projects = [
    { id: "proj_a_001", title: "Project A ", description: "AI system for KMUTT.", tags: ["AI", "2023"], status: "Pending" },
    { id: "proj_b_002", title: "Project B ", description: "Web dashboard for health data.", tags: ["React", "2024"], status: "Approved" },
    { id: "proj_c_003", title: "Project C ", description: "Hospital record system.", tags: ["Database", "Node.js"], status: "Failed" },
    { id: "proj_d_004", title: "Project D ", description: "Monitoring system for IoT devices.", tags: ["IoT", "Cloud"], status: "Draft" },
    { id: "proj_e_005", title: "Project E ", description: "Project Management Tool.", tags: ["Angular", "Web"], status: "In Process" },
    { id: "proj_f_006", title: "Project F ", description: "Financial tracking app.", tags: ["Node", "Web"], status: "Pending", editMode: false }, 
    ];

    const [profileData, setProfileData] = useState({
        name: "Rainbow Pinky",
        university: "KMUTT",
        contact: "rainbowpink@kmutt.ac.th"
    });

    const handleInlineSaveAndClose = () => {
        console.log("Saving profile data from inline mode and closing edit mode.");
        // Logic การ Save ข้อมูลจริงจะอยู่ที่นี่
        setIsEditing(false);
    };

    // 🧠 ฟังก์ชันกรองโปรเจ็กต์
    const filteredProjects = isEditing
        ? projects.filter(p => p.status === "Draft" || p.status === "Failed")
        : projects;

    return (
        <div className="profile-container">
            {/* 🚨 ห่อ ProfileHeader ด้วย div เพื่อจัดกึ่งกลาง */}
            <div className="profile-header-wrapper">
                <ProfileHeader
                    name={profileData.name}
                    university={profileData.university}
                    contact={profileData.contact}
                    showEdit={isEditing}
                    onClickEdit={() => setIsEditing(true)}
                    onClickSave={handleInlineSaveAndClose}
                    // 🚨 ส่ง props showControls ไปยัง ProfileHeader
                    showControls={showControls} 
                />
            </div>

            <main className="status-projects-grid">
                {filteredProjects.map((p, i) => (
                    <ProjectCard
                        key={i}
                        id={p.id}
                        title={p.title}
                        description={p.description}
                        tags={p.tags}
                        status={p.status}
                        // 🚨 เงื่อนไขการแสดงปุ่มปากกา: ต้องเป็น (Draft หรือ Failed) AND (isEditing เป็น true)
                        editMode={(p.status === "Draft" || p.status === "Failed") && isEditing}
                    />
                ))}
            </main>

            <div className="home-icon-placeholder">
                <svg viewBox="0 0 24 24" fill="#ff9999ff" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
            </div>
        </div>
    );
}

export default WorkStatusPage;