// 🚨 [FIX] นี่คือโค้ด Frontend สำหรับเรียก API
import { BASE_URL } from './apiUtils.js';

// GET /api/projects/:projectId/comments
export async function getComments(projectId) {
    try {
        const res = await fetch(`${BASE_URL}/api/projects/${projectId}/comments`);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch comments.");
        }
        return await res.json();
    } catch (error) {
        console.error("API Error: getComments", error);
        throw error;
    }
}