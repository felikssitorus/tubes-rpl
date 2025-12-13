// src/services/adminService.js
const BACKEND_BASE = "http://localhost:5000";

// Auto-detect endpoint
export async function detectAdminBase() {
    const possibleBases = ["/api/admin", "/admin"];

    for (const basePath of possibleBases) {
        try {
            const url = `${BACKEND_BASE}${basePath}/test`;
            const res = await fetch(url);
            if (res.ok) {
                console.log(`✅ Backend di: ${basePath}`);
                return basePath;
            }
        } catch (err) {
            console.log(`❌ ${basePath}: ${err.message}`);
        }
    }
    throw new Error('Endpoint admin tidak ditemukan');
}

let API_BASE_PATH = null;

export async function getAllCourses() {
    try {
        if (!API_BASE_PATH) {
            API_BASE_PATH = await detectAdminBase();
        }

        const API_BASE = `${BACKEND_BASE}${API_BASE_PATH}`;
        const res = await fetch(`${API_BASE}/mata-kuliah/aktif`);

        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

        const data = await res.json();
        const courses = Array.isArray(data) ? data : (data.courses || data.data || []);

        return {
            courses: courses.map(item => ({
                id: item.id || item.id_mata_kuliah || Math.random(),
                nama_mata_kuliah: item.nama_mata_kuliah || item.nama || "Mata Kuliah",
                kode_mata_kuliah: item.kode_mata_kuliah || item.kode || "MK001",
                semester: item.semester?.toString() || "1",
                tahun_ajaran: item.tahun_ajaran?.toString() || "2024",
                kelas: item.kelas || "A",
                sks: item.sks || 3
            })),
            _backendPath: API_BASE_PATH
        };

    } catch (error) {
        console.error("❌ Error getAllCourses:", error);
        return {
            courses: [],
            _fallback: true,
            _error: error.message
        };
    }
}

export async function createCourse(courseData) {
    try {
        if (!API_BASE_PATH) {
            API_BASE_PATH = await detectAdminBase();
        }

        const API_BASE = `${BACKEND_BASE}${API_BASE_PATH}`;

        // KONVERSI TAHUN KE INTEGER
        let tahunAjaranValue;
        if (courseData.tahun_ajaran.includes('/')) {
            tahunAjaranValue = parseInt(courseData.tahun_ajaran.split('/')[0]);
            console.log(`🔄 Konversi: "${courseData.tahun_ajaran}" → ${tahunAjaranValue}`);
        } else {
            tahunAjaranValue = parseInt(courseData.tahun_ajaran);
        }

        if (isNaN(tahunAjaranValue)) {
            tahunAjaranValue = new Date().getFullYear();
        }

        const payload = {
            nama_mata_kuliah: courseData.nama_mata_kuliah,
            kode_mata_kuliah: courseData.kode_mata_kuliah,
            semester: parseInt(courseData.semester) || 1,
            tahun_ajaran: tahunAjaranValue, // INTEGER!
            kelas: courseData.kelas || "A",
            sks: 3
        };

        console.log("📤 Payload:", payload);

        const res = await fetch(`${API_BASE}/mata-kuliah`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errorText}`);
        }

        const data = await res.json();
        console.log("✅ Success:", data);

        // Save to localStorage
        const existing = JSON.parse(localStorage.getItem("admin_courses") || "[]");
        existing.push({
            id: Date.now(),
            ...courseData,
            tahun_ajaran_backend: tahunAjaranValue,
            created_at: new Date().toISOString(),
            _backend_id: data.data?.id
        });
        localStorage.setItem("admin_courses", JSON.stringify(existing));

        return {
            success: true,
            data: data.data || data,
            message: "✅ Mata kuliah berhasil ditambahkan!"
        };

    } catch (error) {
        console.error("❌ Error createCourse:", error);

        const existing = JSON.parse(localStorage.getItem("admin_courses") || "[]");
        existing.push({
            id: Date.now(),
            ...courseData,
            created_at: new Date().toISOString(),
            _local: true,
            _error: error.message
        });
        localStorage.setItem("admin_courses", JSON.stringify(existing));

        return {
            success: true,
            data: courseData,
            message: `⚠️ Disimpan sementara: ${error.message}`
        };
    }
}

export async function testBackendConnection() {
    try {
        const res = await fetch(`${BACKEND_BASE}/api/admin/test`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}