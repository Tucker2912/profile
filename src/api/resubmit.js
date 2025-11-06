// src/api/resubmit.js

// 🚨 ต้อง import getAuthHeader และ BASE_URL จาก utils
import { getAuthHeader, BASE_URL } from './apiUtils.js';

/**
 * Resubmit portfolio (V2 Submit)
 * เปลี่ยนสถานะงาน Draft/Rejected เป็น Pending
 * @param {string|number} id - Portfolio ID
 * @returns {Promise<Object>} - { message, data }
 */
export async function resubmitPortfolio(id) {
    try {
        // 🚨 1. ดึง Header ที่มี Token มาใช้
        const headers = getAuthHeader(); 
        
        // 🚨 2. Endpoint V2 จริง: POST /api/portfolio/:id/v2/submit
        const res = await fetch(`${BASE_URL}/api/portfolio/${id}/v2/submit`, {
            method: 'POST',
            headers, // ส่ง Token ใน Header
            // ไม่มี body ตามที่ Backend กำหนด [cite: 705]
        });

        const data = await res.json();
        
        if (!res.ok) {
            // โยน Error ถ้าสถานะไม่ใช่ 2xx (เช่น 400 ถ้าไม่ใช้ Draft/Rejected)
            throw new Error(data.message || "Resubmit failed.");
        }
        
        // ผลลัพธ์: { message: "Submitted for review", data: p } [cite: 723]
        return data; 
    } catch (error) {
        console.error("API Error: resubmitPortfolio", error);
        throw error;
    }
}