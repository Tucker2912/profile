import React from 'react';
// ต้องมีการนำเข้าไฟล์ CSS สำหรับหน้านี้ (สำหรับ Grid, Status Card)
import './StatusPage.css'; 

// 🚨 ต้องแน่ใจว่าได้สร้าง/นำเข้า Icon เหล่านี้แล้วในไฟล์จริงของคุณ
// Placeholder สำหรับ Icon รูปภาพ (สำหรับการ์ดสีส้ม)
const PhotoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-7 12l2.67-3.67 1.33 1.34 3-4 5 6H4z"/>
    </svg>
);
// Placeholder สำหรับ Home Icon
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 10v10h18V10l-9-8zm0 16a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
    </svg>
);

// ----------------------------------------------------
// 🌟 1. ข้อมูลโปรเจกต์ (Data Array) 🌟
// ตำแหน่ง: ควรวางไว้ก่อน Component หลัก (StatusPage)
// ----------------------------------------------------
const statusProjectData = [
    { title: "AI Project", description: "AI system for KMUTT.", tags: ["AI", "2023"], status: "pending" },
    { title: "Chatbot System", description: "Web dashboard for health data.", tags: ["React", "2024"], status: "success" },
    { title: "E-Commerce Site", description: "Mobile app using Flutter.", tags: ["Mobile", "Flutter"], status: "success" },
    { title: "Data Analysis Tool", description: "Database design and implementation.", tags: ["Database", "SQL"], status: "fail" },
];


// ----------------------------------------------------
// 🌟 2. Component: StatusProjectCard 🌟
// ----------------------------------------------------
const StatusProjectCard = ({ title, description, tags, status }) => {
    // กำหนดคลาสสำหรับสีตามสถานะ
    let statusClass = '';
    if (status === 'pending') statusClass = 'pending';
    else if (status === 'success') statusClass = 'success';
    else if (status === 'fail') statusClass = 'fail';

    return (
        <div className="status-project-card">
            
            {/* กล่องสถานะ (Status Box) */}
            <div className={`status-box ${statusClass}`}>
                {status ? status.toUpperCase() : 'N/A'}
            </div>
            
            {/* ส่วนรูปภาพสีส้ม */}
            <div className="project-image">
                <PhotoIcon /> 
            </div>
            
            {/* ส่วนรายละเอียด */}
            <div className="project-info">
                <h3>Title: {title}</h3>
                <p>Description: {description}</p>
                
                <div className="tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};


// ----------------------------------------------------
// 🌟 3. Component หลัก: StatusPage 🌟
// ----------------------------------------------------
const StatusPage = () => {
    return (
        // ใช้คลาส profile-container (สมมติว่าเป็น Container หลักที่ใช้ร่วมกับ Profile Page)
        <div className="profile-container">
            
            {/* 1. ส่วนหัวโปรไฟล์ (นำโครงสร้างจาก ProfilePage มาใช้) */}
            {/* 🚨 ถ้าใช้คอมโพเนนต์ ProfileHeader แยก ให้เปลี่ยนเป็น <ProfileHeader /> แทน */}
            <div className="profile-header">
                {/* วงกลมตัวอักษร R */}
                <div className="avatar">R</div>
                
                <div className="info">
                    <h2>Rainbow Pinky</h2>
                    
                    {/* University Field */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="field-label">University:</span>
                        <input type="text" value="KMUTT" readOnly />
                    </div>
                    
                    {/* Contact Field */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="field-label">Contact:</span>
                        <input type="email" value="rainbowpink@kmutt.ac.th" readOnly />
                    </div>
                </div>
            </div>

            <h3 style={{ marginTop: '30px', color: '#ff5c8d' }}>My Project Status</h3>
            
            {/* 🌟 Container สำหรับ Grid Layout 2x2 🌟 */}
            <div className="status-projects-grid">
                {statusProjectData.map((project, index) => (
                    <StatusProjectCard 
                        key={index}
                        title={project.title}
                        description={project.description}
                        tags={project.tags}
                        status={project.status}
                    />
                ))}
            </div>

            {/* ปุ่ม Home Icon */}
            <div className="home-icon-placeholder">
                <HomeIcon />
            </div>
            
        </div>
    );
};

export default StatusPage;