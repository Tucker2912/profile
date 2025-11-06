// src/components/ProjectCard.jsx

import React from "react";
import "./ProjectCard.css";
import { Link } from 'react-router-dom';

const ProjectCard = ({ id, title, description, tags = [], status = "", editMode }) => { 
    
    // โค้ดจัดการ Status (คงเดิม)
    const statusClass = status.toLowerCase().replace(' ', '-');
    const statusText = status.toUpperCase().replace('-', ' '); 
    
    // 🚨 1. สร้าง Path แบบมีเงื่อนไขตามสถานะ
    const linkPath = status === "Draft" 
                     ? `/edit/${id}`     // สถานะ DRAFT: ไปหน้า EditPage (Portfolio)
                     : status === "Failed" 
                     ? `/resubmit/${id}` // สถานะ FAILED: ไปหน้า StudentResubmit (Resubmit)
                     : null;             // สถานะอื่นไม่มีลิงก์
    
    
    return (
        <div className="project-card">
            
            <div className="project-image"> 
                {status && status.trim() !== "" && (
                    <span className={`status-tag ${statusClass}`}>{statusText}</span>
                )}

                {/* 🛠 ปุ่ม Edit & Delete แสดงเมื่อ editMode เป็นจริง */}
                {editMode && (
                    <div className="edit-buttons">
                        
                        {/* 🚨 2. แสดง Link เมื่อ linkPath ถูกกำหนดแล้วเท่านั้น */}
                        {linkPath ? (
                            <Link to={linkPath} className="edit-btn">
                                🖊
                            </Link>
                        ) : (
                            // ถ้าไม่มี Path แต่ปุ่มควรแสดง ให้แสดงเป็นปุ่มธรรมดาแทน
                            <button className="edit-btn">
                                🖊
                            </button>
                        )}
                        
                        <button className="delete-btn">❌</button>
                    </div>
                )}
            </div>
            
            <div className="project-info"> 
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="tags">
                    {tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;