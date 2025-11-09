// 🚨 [FIX] เพิ่ม import ภายใน (./) ที่ขาดหายไป
import { getAuthHeader, BASE_URL } from './apiUtils.js';

// GET /api/user - ดึงข้อมูลผู้ใช้ปัจจุบัน
export async function getCurrentUser() {
    try {
        // 🚨 ตอนนี้โค้ดรู้จัก 2 ตัวแปรนี้แล้ว
        const headers = getAuthHeader();
        const res = await fetch(`${BASE_URL}/api/user`, {
            headers,
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch user data.");
        }
        return await res.json();
    } catch (error) {
        console.error("API Error: getCurrentUser", error);
        throw error;
    }
}