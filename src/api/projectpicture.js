// 🚨 [FIX] นี่คือโค้ด Frontendสำหรับเรียก API
import { BASE_URL } from './apiUtils.js';

// GET /api/projects/:projectId/details
export async function getProjectDetails(projectId) {
    try {
        const res = await fetch(`${BASE_URL}/api/projects/${projectId}/details`);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch project details.");
        }
        return await res.json();
    } catch (error) {
        console.error("API Error: getProjectDetails", error);
        throw error;
    }
}