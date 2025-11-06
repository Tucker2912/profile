// 🚨 สร้าง/บันทึก Draft V2
// POST /api/portfolio/v2 (สร้าง/บันทึก Draft V2)
//[cite_start]// ใช้สำหรับการบันทึกงานใหม่/แก้ไข V2 ในโหมด Draft [cite: 73, 114]

export async function savePortfolioDraft(formData) {
    try {
        const headers = getAuthHeader();
        [cite_start]// Endpoint: POST /api/portfolio/v2 [cite: 73]
        const res = await fetch(`${BASE_URL}/api/portfolio/v2`, {
            method: 'POST',
            headers: { 'Authorization': headers.Authorization },
            body: formData, // FormData Object
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || "Failed to save portfolio draft.");
        }
        return data; [cite_start]// { message: "Draft saved", data: <portfolio> } [cite: 78]
    } catch (error) {
        console.error("API Error: savePortfolioDraft", error);
        throw error;
    }
}