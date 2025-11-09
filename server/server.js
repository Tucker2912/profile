import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // อนุญาตให้ Frontend (localhost:PORT) เรียกใช้ได้
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// =======================================================
// 🚨 MOCK DATABASE: ข้อมูลจำลองสำหรับทดสอบ
// =======================================================

const mockDbData = {
    "proj_b_002": {
        title: "Web Dashboard for Health Data",
        description: "A secure and responsive web application built with React.",
        
        // 🚨 [FIX] เพิ่มรูปภาพเป็น 4 รูป เพื่อทดสอบการเลื่อน
        images: [
            'https://placehold.co/600x400/36A2EB/ffffff?text=Web+View+1', 
            'https://placehold.co/600x400/FF6384/ffffff?text=Data+Chart+2',
            'https://placehold.co/600x400/FFCE56/000000?text=Mobile+View+3',
            'https://placehold.co/600x400/4BC0C0/ffffff?text=Report+Page+4'
        ],

        name: "Rainbow Pinky",
        university: "KMUTT",
        year: 2024,
        comments: [
            { id: 1, author: 'Lovely Boy', role: 'recruiter', text: 'so good', initial: 'L' },
            { id: 2, author: 'Sunny Kissed', role: 'student', text: 'OMG', initial: 'S' },
            { id: 3, author: 'Professor P', role: 'lecturer', text: 'Excellent potential.', initial: 'P' },
        ],
    },
    "proj_d_004": {
        title: "IoT Monitoring System",
        description: "Cloud-based monitoring system for smart sensors.",

        // 🚨 [FIX] เพิ่มรูปภาพเป็น 2 รูป
        images: [
            'https://placehold.co/600x400/FFCD56/000000?text=Sensor+Data+1',
            'https://placehold.co/600x400/9966FF/ffffff?text=Sensor+Alert+2'
        ],

        name: "Rainbow Pinky",
        university: "KMUTT",
        year: 2023,
        comments: [],
        status: "Draft",
    }
};

const mockUserProfile = {
    name: "Rainbow Pinky",
    university: "KMUTT",
    contact: "rainbowpink@kmutt.ac.th"
};

// =======================================================
// 🚨 MOCK MIDDLEWARE: จำลอง Authentication (auth)
// =======================================================

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Authentication required: No token provided." });
    }
    req.user = { id: 'user_123', displayName: mockUserProfile.name, role: 'Student' };
    next();
};

// =======================================================
// 🚨 ENDPOINTS (ที่ต้องทดสอบ)
// =======================================================

// 1. GET /api/user (getCurrentUser)
app.get('/api/user', auth, (req, res) => {
    res.json(mockUserProfile);
});

// 2. GET /api/portfolio/mine (getMyPortfolios)
app.get('/api/portfolio/mine', auth, (req, res) => {
    const portfolios = Object.keys(mockDbData).map(id => ({
        id,
        title: mockDbData[id].title,
        status: mockDbData[id].status || "Approved",
        tags: ["Mock", "Data"],
        description: mockDbData[id].description,
    }));
    res.json(portfolios);
});

// 3. GET /api/projects/:projectId/details (getProjectDetails)
app.get('/api/projects/:projectId/details', (req, res) => {
    const projectId = req.params.projectId;
    const project = mockDbData[projectId];

    if (!project) {
        return res.status(404).json({ error: 'Project details not found' });
    }
    res.json({
        id: projectId,
        title: project.title,
        description: project.description,
        name: project.name,
        university: project.university,
        year: project.year,
        images: project.images
    });
});

// 4. GET /api/projects/:projectId/comments (getComments)
app.get('/api/projects/:projectId/comments', (req, res) => {
    const projectId = req.params.projectId;
    const project = mockDbData[projectId];
    
    if (!project || !project.comments) {
        return res.json([]);
    }
    res.json(project.comments);
});

// 5. POST /api/projects/:projectId/comments (postComment)
app.post('/api/projects/:projectId/comments', auth, (req, res) => {
    const projectId = req.params.projectId;
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: "Comment text is required." });
    }

    const newCommentObject = {
        id: Date.now(), 
        author: req.user.displayName, 
        role: req.user.role, 
        text: text,
        initial: req.user.displayName[0].toUpperCase(),
    };

    res.status(201).json({ 
        message: "Comment added successfully.", 
        data: newCommentObject 
    });
});

// =======================================================
// START SERVER
// =======================================================
app.listen(PORT, () => {
    console.log(`Mock Backend Server running at http://127.0.0.1:${PORT}`);
});