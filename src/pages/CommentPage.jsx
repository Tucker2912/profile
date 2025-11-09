import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import './CommentPage.css';
// 🚨 [FIX] Import API Functions ที่จำเป็น
import { getProjectDetails } from '../api/projectpicture.js'; 
import { getComments } from '../api/comment.js';
import { postComment } from '../api/post.js'; 

// =======================================================
// 🚨 MOCK DATA (สำหรับ Fallback)
// =======================================================
const MOCK_COMMENTS = [
    { id: 1, author: 'Lovely Boy', role: 'recruiter', text: 'so good', initial: 'L' },
    { id: 2, author: 'Sunny Kissed', role: 'student', text: 'OMG', initial: 'S' },
    { id: 3, author: 'Professor P', role: 'lecturer', text: 'Excellent potential.', initial: 'P' },
];

const MOCK_PROJECT = {
    title: 'Project Alpha (Mock)',
    name: 'Rainbow Pinky (Mock)',
    university: 'KMUTT (Mock)',
    year: 2023,
    description: 'AI research paper on neural networks.',
    images: [
        'https://via.placeholder.com/600x400?text=Image+1',
        'https://via.placeholder.com/600x400?text=Image+2',
        'https://via.placeholder.com/600x400?text=Image+3',
        'https://via.placeholder.com/600x400?text=Image+4',
        'https://via.placeholder.com/600x400?text=Image+5',
    ]
};

// =======================================================
// 🚨 COMMENT BLOCK COMPONENT
// =======================================================

const CommentBlock = ({ author, role, text, initial }) => (
    <div className="comment-block">
        <div className="comment-header">
            <div className="author-initial">{initial}</div>
            <div className="author-info">
                <span className="author-name">{author}</span>
                <span className="author-role">&lt;{role}&gt;</span>
            </div>
        </div>
        <p className="comment-text">"{text}"</p>
    </div>
);

// =======================================================
// 🚨 MAIN COMPONENT
// =======================================================
const CommentPage = () => {
    const { projectId } = useParams(); 
    const navigate = useNavigate();

    const [project, setProject] = useState(MOCK_PROJECT); // 🚨 ใช้ Mock เป็นค่าเริ่มต้น
    const [comments, setComments] = useState(MOCK_COMMENTS); // 🚨 ใช้ Mock เป็นค่าเริ่มต้น
    
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); 
    const [newCommentText, setNewCommentText] = useState(''); 
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            if (!projectId) { setLoading(false); return; }
            setLoading(true);
            try {
                const [projectData, commentsData] = await Promise.all([
                    getProjectDetails(projectId),
                    getComments(projectId)
                ]);
                setProject(projectData);
                setComments(commentsData);
            } catch (err) {
                console.error("Failed to fetch API data, using mock data as fallback:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [projectId]);

    const handlePostComment = async (e) => {
        e.preventDefault();
        if (newCommentText.trim() === '' || isPosting) return;
        setIsPosting(true);
        try {
            const response = await postComment(projectId, { text: newCommentText.trim() });
            setComments(prev => [...prev, response.data]); 
            setNewCommentText('');
        } catch (err) {
            console.error("Failed to post comment:", err);
            alert("Failed to post comment. Please check login or network.");
        } finally {
            setIsPosting(false);
        }
    };

    // ... (handleNext, handlePrev, handleGoBack) ...
    const handleNext = () => {
        if (project && project.images && currentImageIndex < project.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };
    const handlePrev = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };
    const handleGoBack = () => { navigate(-1); };

    if (loading) {
        return <div className="loading-page">Connecting to Server...</div>;
    }
    
    if (!project) {
        return <div className="error-page">Project not found.</div>;
    }
    
    // 🚨 [FIX] เพิ่มการตรวจสอบว่า project.images มีข้อมูลหรือไม่
    const hasImages = project.images && project.images.length > 0;
    const currentImageUrl = hasImages ? project.images[currentImageIndex] : null;
    const totalImages = hasImages ? project.images.length : 0;

    return (
        <div className="comment-page-container">
            {/* ... (Back Button) ... */}
            <div className="back-button" onClick={handleGoBack}> 
                ⬅️ Back
            </div>

            <div className="comment-page-grid">
                
                <div className="project-display-section">
                    
                    {/* 🚨 [FIX] ตรวจสอบก่อนว่ามีรูปภาพหรือไม่ */}
                    <div className="image-viewer">
                        {hasImages ? (
                            <>
                                <img 
                                    src={currentImageUrl} 
                                    alt={`Project Image ${currentImageIndex + 1}`}
                                    className="project-main-image"
                                />
                                
                                {/* ปุ่ม Previous */}
                                {currentImageIndex > 0 && (
                                    <button className="nav-button prev-button" onClick={handlePrev}>&lt;</button>
                                )}
                                
                                {/* ปุ่ม Next */}
                                {currentImageIndex < totalImages - 1 && (
                                    <button className="nav-button next-button" onClick={handleNext}>&gt;</button>
                                )}
                                
                                {/* Pagination Dots */}
                                <div className="image-pagination">
                                    {[...Array(totalImages)].map((_, i) => (
                                        <span 
                                            key={i} 
                                            className={`dot ${i === currentImageIndex ? 'active' : ''}`}
                                            onClick={() => setCurrentImageIndex(i)} 
                                        ></span>
                                    ))}
                                </div>
                            </>
                        ) : (
                            // 🚨 ถ้าไม่มีรูปภาพ ให้แสดง Placeholder
                            <div className="project-main-image placeholder-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee' }}>
                                No Image Available
                            </div>
                        )}
                    </div>
                    
                    <div className="project-details">
                        <p><strong>Title:</strong> {project.title}</p>
                        <p><strong>Name:</strong> {project.name}</p>
                        <p><strong>University:</strong> {project.university}</p>
                        <p><strong>Year:</strong> {project.year}</p>
                        <p><strong>Description:</strong> {project.description}</p>
                    </div>
                </div>

                {/* RIGHT SECTION: COMMENTS */}
                <div className="comments-section">
                    
                    {comments.map(comment => (
                        <CommentBlock 
                            key={comment.id}
                            author={comment.author}
                            role={comment.role}
                            text={comment.text}
                            initial={comment.initial}
                        />
                    ))}
                    
                    <form onSubmit={handlePostComment} className="comment-form">
                        <textarea
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            placeholder="Add your comment here..."
                            rows="3"
                            disabled={isPosting}
                        />
                        <button type="submit" disabled={newCommentText.trim() === '' || isPosting}>
                            {isPosting ? 'Posting...' : 'Post Comment'}
                        </button>
                    </form>
                    
                    <div className="comments-placeholder">
                        &lt;comments&gt;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentPage;