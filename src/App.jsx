// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import WorkStatusPage from './pages/WorkStatusPage';

function App() {
    return (
        <Router>
            <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
                <Link to="/" style={{ margin: '0 15px', textDecoration: 'none', color: 'black' }}>หน้าโปรหลัก</Link>
                <Link to="/status" style={{ margin: '0 15px', textDecoration: 'none', color: 'black' }}>หน้าสเตตัสงาน</Link>
            </nav>
            <Routes>
                {/* กำหนดเส้นทางสำหรับหน้า ProfilePage.jsx */}
                <Route path="/" element={<ProfilePage />} />
                
                {/* กำหนดเส้นทางสำหรับหน้า WorkStatusPage.jsx */}
                <Route path="/status" element={<WorkStatusPage />} />
            </Routes>
        </Router>
    );
}

export default App;