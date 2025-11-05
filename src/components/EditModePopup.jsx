import React, { useState } from "react";
// 🌟 แก้ไข: ใช้ CSS เฉพาะสำหรับ Pop-up 🌟
import "./EditModePopup.css"; 

const EditModePopup = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    contact: "",
    projectTitle: "",
    projectDescription: "",
    projectTags: "",
  });

  // ใช้ state เพื่อบอกสถานะการประมวลผล (idle, pending, success, fail)
  const [status, setStatus] = useState(null); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setStatus("pending"); // แสดง Pending ก่อน

    // 🌟 ป้องกันการกดซ้ำซ้อน
    if (status === "pending") return;

    // simulate async save
    setTimeout(() => {
      // สมมติ Save สำเร็จ 80% ล้มเหลว 20%
      const isSuccess = Math.random() < 0.8;
      if (isSuccess) {
        setStatus("success");
        if (onSave) onSave(formData); // เรียก callback จริง
      } else {
        setStatus("fail");
        // 🌟 ให้ผู้ใช้สามารถลองใหม่ได้
        setTimeout(() => setStatus(null), 3000); 
      }
    }, 2000); // 2 วินาที
  };

  const isPending = status === "pending";

  return (
    <div className="popup-container">
      <div className="popup-box">
        <h2 className="popup-title">Edit Profile</h2>

        {/* ... (ส่วน Input Fields ทั้งหมดเหมือนเดิม) ... */}
        
        {/* Profile Info */}
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="popup-input" />
        {/* ... (Input University และ Contact) ... */}
        <label>University:</label>
        <input type="text" name="university" value={formData.university} onChange={handleChange} className="popup-input" />
        <label>Contact:</label>
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="popup-input" />

        <h3 className="popup-subtitle">Project Info</h3>
        
        {/* Project Info */}
        <label>Title:</label>
        <input type="text" name="projectTitle" value={formData.projectTitle} onChange={handleChange} className="popup-input" />
        <label>Description:</label>
        <textarea name="projectDescription" rows="3" value={formData.projectDescription} onChange={handleChange} className="popup-input" />
        <label>Tags:</label>
        <input type="text" name="projectTags" placeholder="e.g. AI, React, 2024" value={formData.projectTags} onChange={handleChange} className="popup-input" />
        

        {/* Status Box */}
        {status && (
          <div className={`status-box ${status}`}>
            {status === "pending" && "Pending..."}
            {status === "success" && "Saved Successfully! (Closing in 3s)"}
            {status === "fail" && "Failed to Save! Please try again."}
          </div>
        )}

        <div className="card-actions">
          <button 
            className="action-button save" 
            onClick={handleSave}
            // 🌟 ปิดการใช้งานเมื่อกำลังประมวลผล 🌟
            disabled={isPending} 
          >
            {isPending ? "Saving..." : "Save"}
          </button>
          <button 
            className="action-button cancel" 
            onClick={onClose}
            // 🌟 ปิดการใช้งานเมื่อกำลังประมวลผล 🌟
            disabled={isPending}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModePopup;