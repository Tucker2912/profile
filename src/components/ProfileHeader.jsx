import React from 'react';
import './ProfileHeader.css';

const EditIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M12 20h9M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z"/>
    </svg>
);

// 🚨 ProfileHeader ถูกแก้ไขให้รับ Props onClickSave 🚨
const ProfileHeader = ({ name, university, contact, showEdit, onClickEdit, onClickSave }) => { 
    const isEditing = showEdit; 

    // 🌟 handleSave ถูกแก้ไขให้เรียก onClickSave จากหน้าแม่ 🌟
    const handleSave = () => {
        // ใน WorkStatusPage.jsx คุณต้องมีฟังก์ชัน onClickSave ที่จัดการการปิด Edit Mode
        alert('Saving changes...'); 
        
        if (onClickSave) {
            onClickSave(); 
        }
    };

    return (
        <div className="profile-header">
            
            {/* 1. ส่วน Avatar และ ปุ่ม Edit/Save */}
            <div className="avatar-wrapper">
                <div className="profile-image-container">
                    <span className="profile-initial">R</span>
                </div>

                <div className="control-buttons">
                    {isEditing ? (
                        <button className="header-button save" onClick={handleSave}>
                            Save
                        </button>
                    ) : (
                        <button className="header-button edit" onClick={onClickEdit}>
                            Edit
                        </button>
                    )}
                </div>
            </div>
        
            {/* 2. ส่วนข้อมูล Info */}
            <div className="profile-info">
                <h1 className="profile-name">{name}</h1>

                {/* University Field */}
                <div className="profile-field-container">
                    <span className="field-label">University :</span>
                    <input className="profile-field-input" value={university} readOnly={!isEditing} />
                    {isEditing && <EditIcon />}
                </div>

                {/* Contact Field */}
                <div className="profile-field-container">
                    <span className="field-label">Contact :</span>
                    <input className="profile-field-input" value={contact} readOnly={!isEditing} />
                    {isEditing && <EditIcon />}
                </div>
                
                {/* Google Drive Field (เพิ่มตามดีไซน์ Inline Edit) */}
                <div className="profile-field-container">
                    <span className="field-label">Google Drive :</span>
                    <input className="profile-field-input" value="" placeholder="Add Link" readOnly={!isEditing} />
                    {isEditing && <EditIcon />}
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;