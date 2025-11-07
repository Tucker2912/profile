// src/components/ProjectCard.jsx

import React from "react";
import "./ProjectCard.css";
import { Link } from 'react-router-dom';

const ProjectCard = ({ 
    id, 
    title, 
    description, 
    tags = [], 
    status = "", 
    editMode,
    isPublic, 
    onToggleVisibility 
}) => { 
    
    const statusClass = status.toLowerCase().replace(' ', '-');
    const statusText = status.toUpperCase().replace('-', ' '); 
    
    const isApproved = status.toLowerCase() === 'approved';

    const linkPath = status === "Draft" 
        ? `/edit/${id}` 
        : status === "Failed" 
        ? `/resubmit/${id}` 
        : null; 
        
    const commentPath = `/project/${id}/comments`; 

    const handleToggle = (e) => {
        // ฟังก์ชันที่ส่งค่ากลับไปยัง Parent Component เพื่ออัปเดตสถานะ Public/Private ในฐานข้อมูล
        if (onToggleVisibility) {
            onToggleVisibility(id, e.target.checked);
        }
    };
    
    // สร้าง Content ทั้งหมดของการ์ด (ใช้เป็น Container หลัก)
    const cardContent = (
        <div className="project-card">
            
            <div className="project-image"> 
                {status && status.trim() !== "" && (
                    <span className={`status-tag ${statusClass}`}>{statusText}</span>
                )}

                {/* 🛠 ปุ่ม Edit & Delete แสดงเมื่อ editMode เป็นจริง */}
                {editMode && (
                    <div className="edit-buttons">
                        
                        {/* ปุ่ม Edit */}
                        {linkPath ? (
                            <Link to={linkPath} className="edit-btn" onClick={(e) => e.stopPropagation()}> 
                                🖊
                            </Link>
                        ) : (
                            <button className="edit-btn" onClick={(e) => e.stopPropagation()}>
                                🖊
                            </button>
                        )}
                        
                        {/* ปุ่ม Delete */}
                        <button className="delete-btn" onClick={(e) => e.stopPropagation()}>❌</button>
                    </div>
                )}
            </div>
            
            <div className="project-info"> 
                <h3>{title}</h3>
                <p>{description}</p>
                
                {/* 🚨 Toggle Switch (แสดงเมื่อ Approved และอยู่ในโหมดแก้ไขเท่านั้น) */}
                {isApproved && editMode && (
                    <div className="visibility-control" onClick={(e) => e.stopPropagation()}> 
                        <label className="switch-label">
                            <span className="private-text">Private</span>
                            <input
                                type="checkbox"
                                checked={isPublic}
                                onChange={handleToggle}
                            />
                            <span className="slider round"></span>
                            <span className="public-text">Public</span>
                        </label>
                    </div>
                )}
                
                <div className="tags">
                    {tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
    
    // 💡 คืนค่า: ถ้าเป็น Approved ให้ครอบด้วย Link ไปหน้า Comment
    if (isApproved) {
        return (
            <Link to={commentPath} className="card-link-wrapper">
                {cardContent}
            </Link>
        );
    }

    // 💡 ถ้าไม่ใช่ Approved ให้คืนค่า Content ธรรมดา
    return cardContent;
};

export default ProjectCard;