// 🚨 [FIX] นี่คือโค้ด Frontend สำหรับเรียก API
import { getAuthHeader, BASE_URL } from './apiUtils.js';

// POST /api/projects/:projectId/comments
export async function postComment(projectId, commentData) {
    try {
        const headers = getAuthHeader();
        
        const res = await fetch(`${BASE_URL}/api/projects/${projectId}/comments`, {
            method: 'POST',
            headers: {
                ...headers, // ใส่ Authorization Header
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData), // { text: "..." }
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to post comment.");
        }
        return await res.json(); // คืนข้อมูล { message: "...", data: <newComment> }
    } catch (error) {
        console.error("API Error: postComment", error);
        throw error;
    }
}