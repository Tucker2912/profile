// src/components/ProjectCard.jsx
import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ title, description, tags, status, editMode }) => {
  return (
    <div className="project-card">
      <div className="project-image-placeholder">
        <span className={`status-tag ${status}`}>{status}</span>

        {/* 🛠 ปุ่ม Edit & Delete แสดงเฉพาะตอน Edit Mode */}
        {editMode && (
          <div className="edit-buttons">
            <button className="edit-btn">🖊</button>
            <button className="delete-btn">❌</button>
          </div>
        )}
      </div>

      <div className="project-details">
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