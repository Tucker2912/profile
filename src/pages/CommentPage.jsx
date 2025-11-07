import React, { useState, useEffect } from 'react';
// 🚨 ต้อง import useNavigate ด้วยสำหรับปุ่ม Back
import { useParams, useNavigate } from 'react-router-dom'; 
import './CommentPage.css';

// =======================================================
// 🚨 MOCK DATA: ต้องวางอยู่นอก Component เพื่อให้เข้าถึงได้
// =======================================================

const mockComments = [
    { id: 1, author: 'Lovely Boy', role: 'recruiter', text: 'so good', initial: 'L' },
    { id: 2, author: 'Sunny Kissed', role: 'student', text: 'OMG', initial: 'S' },
    { id: 3, author: 'Professor P', role: 'lecturer', text: 'Excellent potential.', initial: 'P' },
];

const mockProject = {
    title: 'Project Alpha',
    name: 'Rainbow Pinky',
    university: 'KMUTT',
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

    const [project, setProject] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); 
    
    // 🚨 NEW STATES สำหรับการโพสต์คอมเมนต์
    const [newCommentText, setNewCommentText] = useState(''); 
    const [isPosting, setIsPosting] = useState(false);

    // 🚨 API CALLS (แก้ไขกลับมาใช้ Mock Data เพื่อให้รันได้)
    useEffect(() => {
        // ใช้ข้อมูลจำลองชั่วคราวและ setTimeout เพื่อจำลองการโหลด
        setTimeout(() => {
            setProject(mockProject);
            setComments(mockComments);
            setLoading(false);
        }, 1000); 
    }, [projectId]);

    // 🚨 NEW FUNCTION: จัดการการส่งคอมเมนต์ (ใช้ Mock Logic)
    const handlePostComment = (e) => {
        e.preventDefault();
        if (newCommentText.trim() === '' || isPosting) return;

        setIsPosting(true);

        // 💡 Mock Logic: จำลองการโพสต์สำเร็จใน 500ms
        setTimeout(() => {
            const newComment = {
                id: Date.now(), // ใช้ timestamp เป็น ID ชั่วคราว
                author: 'Current User',
                role: 'Student', 
                text: newCommentText.trim(),
                initial: 'C'
            };
            
            // เพิ่มคอมเมนต์ใหม่
            setComments(prev => [...prev, newComment]); 
            setNewCommentText('');
            setIsPosting(false);
        }, 500);
    };


    // FUNCTION: เลื่อนไปรูปถัดไป
    const handleNext = () => {
        if (project && currentImageIndex < project.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    // FUNCTION: เลื่อนไปรูปก่อนหน้า
    const handlePrev = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    // FUNCTION: ย้อนกลับไปหน้าก่อนหน้า (สำหรับปุ่ม Back)
    const handleGoBack = () => {
        navigate(-1); 
    };

    if (loading) {
        return <div className="loading-page">Loading Comments...</div>;
    }
    
    if (!project) {
        return <div className="error-page">Project not found.</div>;
    }
    
    // ดึง URL รูปภาพปัจจุบัน
    const currentImageUrl = project.images[currentImageIndex];
    const totalImages = project.images.length;


    return (
        <div className="comment-page-container">
            {/* 🚨 ปุ่ม Back: ใช้ onClick เรียก handleGoBack */}
            <div className="back-button" onClick={handleGoBack}> 
                ⬅️ Back
            </div>

            <div className="comment-page-grid">
                
                <div className="project-display-section">
                    
                    {/* 🚨 IMAGE VIEWER พร้อมปุ่มเลื่อน */}
                    <div className="image-viewer">
                        <img 
                            src={currentImageUrl} 
                            alt={`Project Image ${currentImageIndex + 1}`}
                            className="project-main-image"
                        />
                        
                        {/* ปุ่ม Previous */}
                        {currentImageIndex > 0 && (
                            <button 
                                className="nav-button prev-button" 
                                onClick={handlePrev}
                                disabled={currentImageIndex === 0} 
                            >
                                &lt;
                            </button>
                        )}
                        
                        {/* ปุ่ม Next */}
                        {currentImageIndex < totalImages - 1 && (
                            <button 
                                className="nav-button next-button" 
                                onClick={handleNext}
                                disabled={currentImageIndex === totalImages - 1} 
                            >
                                &gt;
                            </button>
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
                    </div>
                    
                    <div className="project-details">
                        <p><strong>Title:</strong> {project.title}</p>
                        <p><strong>Name:</strong> {project.name}</p>
                        <p><strong>University:</strong> {project.university}</p>
                        <p><strong>Description:</strong> {project.description}</p>
                    </div>
                </div>

                {/* RIGHT SECTION: COMMENTS */}
                <div className="comments-section">
                    
                    {/* 🚨 แสดงคอมเมนต์ที่มีอยู่แล้ว (ย้ายขึ้นด้านบน) */}
                    {comments.map(comment => (
                        <CommentBlock 
                            key={comment.id}
                            author={comment.author}
                            role={comment.role}
                            text={comment.text}
                            initial={comment.initial}
                        />
                    ))}
                    
                    {/* 🚨 NEW: Comment Input Form (ย้ายลงมาด้านล่าง) */}
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