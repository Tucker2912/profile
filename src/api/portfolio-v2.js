import { getAuthHeader, BASE_URL } from './apiUtils.js';

// ดึง Portfolio ของตัวเอง (สำหรับ Status/Profile Page)
export async function getMyPortfolios() {
    try {
        const headers = getAuthHeader();
        // Endpoint: /api/portfolio/mine
        const res = await fetch(`${BASE_URL}/api/portfolio/mine`, { headers });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch user portfolios.");
        }
        return await res.json();
    } catch (error) {
        console.error("API Error: getMyPortfolios", error);
        throw error;
    }
}