// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import WorkStatusPage from './pages/WorkStatusPage';
import CommentPage from './pages/CommentPage';

import EditPage from './pages/EditPage.jsx'; 
import StudentResubmit from './pages/StudentResubmit.jsx'; 

function App() {
    return (
        <Router>
            <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
                <Link to="/" style={{ margin: '0 15px', textDecoration: 'none', color: 'black' }}>Profile page</Link>
                <Link to="/status" style={{ margin: '0 15px', textDecoration: 'none', color: 'black' }}>Status page</Link>
            </nav>
            <Routes>
                {/* 🚨 หน้าโปรหลัก (Path "/") - ซ่อนปุ่ม Edit/Save */}
                <Route 
                    path="/" 
                    element={<ProfilePage showControls={false} />} 
                />
                
                {/* 🚨 หน้าสเตตัสงาน (Path "/status") - แสดงปุ่ม Edit/Save */}
                <Route 
                    path="/status" 
                    element={<WorkStatusPage showControls={true} />} 
                />
                <Route path="/project/:projectId/comments" element={<CommentPage />} />

                {/* Routes ของเพื่อน (Edit/Resubmit) */}
                <Route path="/edit/:projectId" element={<EditPage />} />
                <Route path="/resubmit/:projectId" element={<StudentResubmit />} />
                
                {/* 🗑️ ลบ Routes ของ PlaceholderPage ออกแล้ว */}
            </Routes>
        </Router>
    );
}

export default App;