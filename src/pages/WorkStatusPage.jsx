import React, { useState, useEffect } from 'react'; // 🚨 เพิ่ม useEffect
import ProfileHeader from '../components/ProfileHeader';
import ProjectCard from '../components/ProjectCard';
import './StatusPage.css';
// 🚨 Import API functions (ใช้ Relative Path ที่ถูกต้อง)
import { getMyPortfolios } from '../api/portfolio-v2.js';
import { getCurrentUser } from '../api/user.js';

// 🚨 ย้าย Mock Data ออกมาเป็นค่าเริ่มต้น (Default)
const MOCK_PROJECTS = [
    { id: "proj_a_001", title: "Project A ", description: "AI system for KMUTT.", tags: ["AI", "2023"], status: "Pending" },
    { id: "proj_b_002", title: "Project B ", description: "Web dashboard for health data.", tags: ["React", "2024"], status: "Approved" },
    { id: "proj_c_003", title: "Project C ", description: "Hospital record system.", tags: ["Database", "Node.js"], status: "Failed" },
    { id: "proj_d_004", title: "Project D ", description: "Monitoring system for IoT devices.", tags: ["IoT", "Cloud"], status: "Draft" },
    { id: "proj_e_005", title: "Project E ", description: "Project Management Tool.", tags: ["Angular", "Web"], status: "In Process" },
    { id: "proj_f_006", title: "Project F ", description: "Financial tracking app.", tags: ["Node", "Web"], status: "Pending", editMode: false }, 
];

const MOCK_PROFILE_DATA = {
    name: "Rainbow Pinky (Mock)",
    university: "KMUTT (Mock)",
    contact: "rainbowpink@kmutt.ac.th"
};


// 🚨 รับ props 'showControls' เข้ามาจาก App.jsx
function WorkStatusPage({ showControls }) { 
    const [isEditing, setIsEditing] = useState(false);

    // 🚨 ใช้ Mock Data เป็นค่าเริ่มต้นสำหรับ State
    const [projects, setProjects] = useState(MOCK_PROJECTS);
    const [profileData, setProfileData] = useState(MOCK_PROFILE_DATA);

    // 🚨 เพิ่ม Loading State
    const [loading, setLoading] = useState(true);

    // 🚨 พยายามดึงข้อมูลจริงจาก API เมื่อหน้าโหลด
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // พยายามดึงข้อมูลจริง
                const [userData, projectData] = await Promise.all([
                    getCurrentUser(),
                    getMyPortfolios()
                ]);
                
                // 🚨 ถ้าสำเร็จ: ให้ใช้ข้อมูลจริง
                setProfileData(userData);
                setProjects(projectData);

            } catch (err) {
                // 🚨 ถ้าล้มเหลว: ไม่ต้องทำอะไร (ปล่อยให้ State ใช้ Mock Data ต่อไป)
                console.error("Failed to fetch API data, using mock data as fallback:", err);
            } finally {
                // 🚨 ไม่ว่าจะสำเร็จหรือล้มเหลว ให้หยุด Loading
                setLoading(false);
            }
        };

        fetchData();
    }, []); // ทำงานแค่ครั้งเดียว

    const handleInlineSaveAndClose = () => {
        console.log("Saving profile data from inline mode and closing edit mode.");
        // Logic การ Save ข้อมูลจริงจะอยู่ที่นี่
        setIsEditing(false);
    };

    // 🧠 ฟังก์ชันกรองโปรเจ็กต์ (จะทำงานกับข้อมูลใน State ไม่ว่าจะเป็น Mock หรือ Real)
    const filteredProjects = isEditing
        ? projects.filter(p => p.status === "Draft" || p.status === "Failed")
        : projects;

    // 🚨 แสดงสถานะ Loading ขณะพยายามเชื่อมต่อ
    if (loading) {
        return <div className="profile-container loading-page">Connecting to Server...</div>;
    }

    return (
        <div className="profile-container">
            {/* 🚨 ห่อ ProfileHeader ด้วย div เพื่อจัดกึ่งกลาง */}
            <div className="profile-header-wrapper">
                <ProfileHeader
                    // 🚨 ส่วนนี้จะแสดงข้อมูลจริง (ถ้าโหลดสำเร็จ) หรือ Mock Data (ถ้าล้มเหลว)
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
                        key={p.id || i} // 🚨 ใช้ p.id ถ้ามี
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