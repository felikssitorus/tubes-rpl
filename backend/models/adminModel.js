const pool = require("../config/db");

const adminModel = {
    // dashboard
    getDashboardStats: async () => {
        try {
            const statsQuery = `
        SELECT 
          (SELECT COUNT(*) FROM users WHERE role = 'mahasiswa') as total_mahasiswa,
          (SELECT COUNT(*) FROM users WHERE role = 'dosen') as total_dosen,
          (SELECT COUNT(*) FROM tugas_besar) as total_tubes,
          (SELECT COUNT(*) FROM kelompok) as total_kelompok,
          (SELECT COUNT(*) FROM mata_kuliah) as total_matkul
      `;

            const tubesStatsQuery = `
        SELECT 
          COUNT(*) as total_tubes,
          COUNT(CASE WHEN is_locked = true THEN 1 END) as tubes_locked,
          COUNT(CASE WHEN is_locked = false THEN 1 END) as tubes_unlocked
        FROM tugas_besar
      `;

            const [statsResult] = await pool.query(statsQuery);
            const [tubesStatsResult] = await pool.query(tubesStatsQuery);

            return {
                ...statsResult.rows[0],
                ...tubesStatsResult.rows[0]
            };
        } catch (error) {
            console.error('Error in getDashboardStats:', error);
            throw error;
        }
    },

    // manage user 
    getAllUsers: async () => {
        try {
            const mahasiswaQuery = `
        SELECT 
          m.npm as id,
          m.nama,
          m.email,
          m.kelas,
          'mahasiswa' as role,
          COUNT(DISTINCT a.id_kelompok) as jumlah_kelompok
        FROM mahasiswa m
        LEFT JOIN anggota_kelompok a ON m.npm = a.npm
        GROUP BY m.npm, m.nama, m.email, m.kelas
        ORDER BY m.nama
      `;

            const dosenQuery = `
        SELECT 
          d.nik as id,
          d.nama,
          d.email,
          'dosen' as role,
          COUNT(DISTINCT mg.id_mk_dibuka) as jumlah_matkul
        FROM dosen d
        LEFT JOIN mengajar mg ON d.nik = mg.nik
        GROUP BY d.nik, d.nama, d.email
        ORDER BY d.nama
      `;

            const [mahasiswa] = await pool.query(mahasiswaQuery);
            const [dosen] = await pool.query(dosenQuery);

            return [...mahasiswa.rows, ...dosen.rows];
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            throw error;
        }
    },

    getUserById: async (id, role) => {
        try {
            let query;
            if (role === 'mahasiswa') {
                query = `
          SELECT 
            m.*,
            (SELECT COUNT(*) FROM anggota_kelompok a WHERE a.npm = m.npm) as jumlah_kelompok
          FROM mahasiswa m
          WHERE m.npm = $1
        `;
            } else if (role === 'dosen') {
                query = `
          SELECT 
            d.*,
            (SELECT COUNT(*) FROM mengajar m WHERE m.nik = d.nik) as jumlah_matkul
          FROM dosen d
          WHERE d.nik = $1
        `;
            } else {
                throw new Error('Role tidak valid');
            }

            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error in getUserById:', error);
            throw error;
        }
    },

    updateUser: async (id, role, userData) => {
        try {
            if (role === 'mahasiswa') {
                const query = `
          UPDATE mahasiswa 
          SET nama = $1, email = $2, kelas = $3
          WHERE npm = $4
          RETURNING *
        `;
                const values = [userData.nama, userData.email, userData.kelas, id];
                const result = await pool.query(query, values);

                // Update email di tabel users juga
                if (userData.email) {
                    await pool.query(
                        'UPDATE users SET email = $1 WHERE email = (SELECT email FROM mahasiswa WHERE npm = $2)',
                        [userData.email, id]
                    );
                }

                return result.rows[0];
            } else if (role === 'dosen') {
                const query = `
          UPDATE dosen 
          SET nama = $1, email = $2
          WHERE nik = $3
          RETURNING *
        `;
                const values = [userData.nama, userData.email, id];
                const result = await pool.query(query, values);

                // Update email di tabel users juga
                if (userData.email) {
                    await pool.query(
                        'UPDATE users SET email = $1 WHERE email = (SELECT email FROM dosen WHERE nik = $2)',
                        [userData.email, id]
                    );
                }

                return result.rows[0];
            }
        } catch (error) {
            console.error('Error in updateUser:', error);
            throw error;
        }
    },

    deleteUser: async (id, role) => {
        try {
            // Dapatkan email user terlebih dahulu
            let emailQuery;
            if (role === 'mahasiswa') {
                emailQuery = 'SELECT email FROM mahasiswa WHERE npm = $1';
            } else if (role === 'dosen') {
                emailQuery = 'SELECT email FROM dosen WHERE nik = $1';
            }

            const emailResult = await pool.query(emailQuery, [id]);
            const email = emailResult.rows[0]?.email;

            // Hapus dari tabel utama
            let deleteQuery;
            if (role === 'mahasiswa') {
                // Hapus dependencies dulu
                await pool.query('DELETE FROM anggota_kelompok WHERE npm = $1', [id]);
                await pool.query('DELETE FROM nilai WHERE npm = $1', [id]);
                await pool.query('DELETE FROM mengambil WHERE npm = $1', [id]);
                deleteQuery = 'DELETE FROM mahasiswa WHERE npm = $1';
            } else if (role === 'dosen') {
                // Hapus dependencies dulu
                await pool.query('DELETE FROM mengajar WHERE nik = $1', [id]);
                deleteQuery = 'DELETE FROM dosen WHERE nik = $1';
            }

            await pool.query(deleteQuery, [id]);

            // Hapus dari tabel users jika ada email
            if (email) {
                await pool.query('DELETE FROM users WHERE email = $1', [email]);
            }

            return { message: 'User deleted successfully' };
        } catch (error) {
            console.error('Error in deleteUser:', error);
            throw error;
        }
    },

    createUser: async (userData) => {
        try {
            const { role, email, password, ...userDetails } = userData;

            // 1. Buat user di tabel users
            const userQuery = `
        INSERT INTO users (email, password, role)
        VALUES ($1, $2, $3)
        RETURNING email
      `;

            await pool.query(userQuery, [email, password || 'password123', role]);

            // 2. Buat di tabel specific berdasarkan role
            if (role === 'mahasiswa') {
                const mahasiswaQuery = `
          INSERT INTO mahasiswa (npm, nama, email, kelas)
          VALUES ($1, $2, $3, $4)
          RETURNING *
        `;
                const result = await pool.query(mahasiswaQuery, [
                    userDetails.npm,
                    userDetails.nama,
                    email,
                    userDetails.kelas || 'A'
                ]);
                return result.rows[0];
            } else if (role === 'dosen') {
                const dosenQuery = `
          INSERT INTO dosen (nik, nama, email)
          VALUES ($1, $2, $3)
          RETURNING *
        `;
                const result = await pool.query(dosenQuery, [
                    userDetails.nik,
                    userDetails.nama,
                    email
                ]);
                return result.rows[0];
            }
        } catch (error) {
            console.error('Error in createUser:', error);
            throw error;
        }
    },

    // manage mata kuliah 
    getMataKuliahAktif: async () => {
        try {
            const query = `
        SELECT 
          mkd.id_mk_dibuka,
          mk.nama_mata_kuliah,
          mk.id_mata_kuliah as kode_mata_kuliah,
          mkd.semester,
          mkd.tahun,
          mkd.kelas,
          COUNT(DISTINCT mg.nik) as jumlah_dosen,
          COUNT(DISTINCT mb.npm) as jumlah_mahasiswa
        FROM mata_kuliah_dibuka mkd
        JOIN mata_kuliah mk ON mkd.id_mata_kuliah = mk.id_mata_kuliah
        LEFT JOIN mengajar mg ON mkd.id_mk_dibuka = mg.id_mk_dibuka
        LEFT JOIN mengambil mb ON mkd.id_mk_dibuka = mb.id_mk_dibuka
        WHERE mkd.semester = 1 AND mkd.tahun = 2024
        GROUP BY mkd.id_mk_dibuka, mk.nama_mata_kuliah, mk.id_mata_kuliah, mkd.semester, mkd.tahun, mkd.kelas
        ORDER BY mk.nama_mata_kuliah, mkd.kelas
      `;

            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error in getMataKuliahAktif:', error);
            throw error;
        }
    },

    createMataKuliahDibuka: async (data) => {
        try {
            // Cek apakah mata kuliah sudah ada
            const checkQuery = `
        SELECT * FROM mata_kuliah 
        WHERE id_mata_kuliah = $1 OR nama_mata_kuliah = $2
      `;
            const checkResult = await pool.query(checkQuery, [data.kode_mata_kuliah, data.nama_mata_kuliah]);

            let id_mata_kuliah;

            if (checkResult.rows.length === 0) {
                // Buat mata kuliah baru
                const mkQuery = `
          INSERT INTO mata_kuliah (id_mata_kuliah, nama_mata_kuliah)
          VALUES ($1, $2)
          RETURNING id_mata_kuliah
        `;
                const mkResult = await pool.query(mkQuery, [data.kode_mata_kuliah, data.nama_mata_kuliah]);
                id_mata_kuliah = mkResult.rows[0].id_mata_kuliah;
            } else {
                id_mata_kuliah = checkResult.rows[0].id_mata_kuliah;
            }

            // Buat mata kuliah dibuka
            const mkdQuery = `
        INSERT INTO mata_kuliah_dibuka (id_mata_kuliah, semester, tahun, kelas)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;

            const result = await pool.query(mkdQuery, [
                id_mata_kuliah,
                data.semester,
                data.tahun_ajaran,
                data.kelas || 'A'
            ]);

            return result.rows[0];
        } catch (error) {
            console.error('Error in createMataKuliahDibuka:', error);
            throw error;
        }
    },

    getDetailMataKuliah: async (id_mk_dibuka) => {
        try {
            const query = `
        SELECT 
          mkd.*,
          mk.nama_mata_kuliah,
          mk.id_mata_kuliah as kode_mata_kuliah
        FROM mata_kuliah_dibuka mkd
        JOIN mata_kuliah mk ON mkd.id_mata_kuliah = mk.id_mata_kuliah
        WHERE mkd.id_mk_dibuka = $1
      `;

            const result = await pool.query(query, [id_mk_dibuka]);
            return result.rows[0];
        } catch (error) {
            console.error('Error in getDetailMataKuliah:', error);
            throw error;
        }
    },

    deleteMataKuliahDibuka: async (id_mk_dibuka) => {
        try {
            // Hapus dependencies terlebih dahulu
            await pool.query('DELETE FROM mengajar WHERE id_mk_dibuka = $1', [id_mk_dibuka]);
            await pool.query('DELETE FROM mengambil WHERE id_mk_dibuka = $1', [id_mk_dibuka]);

            // Hapus tugas_besar yang terkait
            const tubesQuery = 'SELECT id_tubes FROM tugas_besar WHERE id_mk_dibuka = $1';
            const tubesResult = await pool.query(tubesQuery, [id_mk_dibuka]);

            for (const tube of tubesResult.rows) {
                // Hapus nilai, komponen, kelompok, dan anggota_kelompok
                await pool.query('DELETE FROM nilai WHERE id_komponen IN (SELECT id_komponen FROM komponen WHERE id_tubes = $1)', [tube.id_tubes]);
                await pool.query('DELETE FROM komponen WHERE id_tubes = $1', [tube.id_tubes]);
                await pool.query('DELETE FROM anggota_kelompok WHERE id_kelompok IN (SELECT id_kelompok FROM kelompok WHERE id_tubes = $1)', [tube.id_tubes]);
                await pool.query('DELETE FROM kelompok WHERE id_tubes = $1', [tube.id_tubes]);
                await pool.query('DELETE FROM tugas_besar WHERE id_tubes = $1', [tube.id_tubes]);
            }

            // Hapus mata kuliah dibuka
            const query = 'DELETE FROM mata_kuliah_dibuka WHERE id_mk_dibuka = $1 RETURNING *';
            const result = await pool.query(query, [id_mk_dibuka]);

            return result.rows[0];
        } catch (error) {
            console.error('Error in deleteMataKuliahDibuka:', error);
            throw error;
        }
    },

    // manage dosen
    getAllDosenAktif: async () => {
        try {
            const query = `
        SELECT 
          d.nik,
          d.nama,
          d.email,
          COUNT(DISTINCT mg.id_mk_dibuka) as jumlah_matkul_diajar
        FROM dosen d
        LEFT JOIN mengajar mg ON d.nik = mg.nik
        GROUP BY d.nik, d.nama, d.email
        ORDER BY d.nama
      `;

            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error in getAllDosenAktif:', error);
            throw error;
        }
    },

    addDosenToMataKuliah: async (id_mk_dibuka, nik_dosen) => {
        try {
            const query = `
        INSERT INTO mengajar (nik, id_mk_dibuka)
        VALUES ($1, $2)
        ON CONFLICT (nik, id_mk_dibuka) DO NOTHING
        RETURNING *
      `;

            const result = await pool.query(query, [nik_dosen, id_mk_dibuka]);
            return result.rows[0];
        } catch (error) {
            console.error('Error in addDosenToMataKuliah:', error);
            throw error;
        }
    },

    // manage mahasiswa
    getAllMahasiswaAktif: async () => {
        try {
            const query = `
        SELECT 
          m.npm,
          m.nama,
          m.email,
          m.kelas,
          COUNT(DISTINCT mb.id_mk_dibuka) as jumlah_matkul_diambil
        FROM mahasiswa m
        LEFT JOIN mengambil mb ON m.npm = mb.npm
        GROUP BY m.npm, m.nama, m.email, m.kelas
        ORDER BY m.nama
      `;

            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error in getAllMahasiswaAktif:', error);
            throw error;
        }
    },

    addMahasiswaToMataKuliah: async (id_mk_dibuka, npm_mahasiswa) => {
        try {
            const query = `
        INSERT INTO mengambil (npm, id_mk_dibuka)
        VALUES ($1, $2)
        ON CONFLICT (npm, id_mk_dibuka) DO NOTHING
        RETURNING *
      `;

            const result = await pool.query(query, [npm_mahasiswa, id_mk_dibuka]);
            return result.rows[0];
        } catch (error) {
            console.error('Error in addMahasiswaToMataKuliah:', error);
            throw error;
        }
    },

    // anggota kelas
    getAnggotaKelas: async (id_mk_dibuka) => {
        try {
            // Get dosen
            const dosenQuery = `
        SELECT 
          d.nik as id,
          d.nama,
          d.email,
          'dosen' as role
        FROM mengajar mg
        JOIN dosen d ON mg.nik = d.nik
        WHERE mg.id_mk_dibuka = $1
        ORDER BY d.nama
      `;

            // Get mahasiswa
            const mahasiswaQuery = `
        SELECT 
          m.npm as id,
          m.nama,
          m.email,
          m.kelas,
          'mahasiswa' as role
        FROM mengambil mb
        JOIN mahasiswa m ON mb.npm = m.npm
        WHERE mb.id_mk_dibuka = $1
        ORDER BY m.nama
      `;

            const [dosenResult, mahasiswaResult] = await Promise.all([
                pool.query(dosenQuery, [id_mk_dibuka]),
                pool.query(mahasiswaQuery, [id_mk_dibuka])
            ]);

            return {
                dosen: dosenResult.rows,
                mahasiswa: mahasiswaResult.rows
            };
        } catch (error) {
            console.error('Error in getAnggotaKelas:', error);
            throw error;
        }
    },

    // manage tubes
    getAllTubes: async () => {
        try {
            const query = `
        SELECT 
          tb.id_tubes,
          tb.topik_tubes,
          tb.is_locked,
          mk.nama_mata_kuliah,
          mkd.kelas,
          mkd.semester,
          mkd.tahun
        FROM tugas_besar tb
        JOIN mata_kuliah_dibuka mkd ON tb.id_mk_dibuka = mkd.id_mk_dibuka
        JOIN mata_kuliah mk ON mkd.id_mata_kuliah = mk.id_mata_kuliah
        ORDER BY mkd.tahun DESC, mkd.semester DESC, mk.nama_mata_kuliah
      `;

            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error in getAllTubes:', error);
            throw error;
        }
    },

    toggleTubeLock: async (id_tubes, is_locked) => {
        try {
            const query = `
        UPDATE tugas_besar 
        SET is_locked = $1
        WHERE id_tubes = $2
        RETURNING *
      `;

            const result = await pool.query(query, [is_locked, id_tubes]);
            return result.rows[0];
        } catch (error) {
            console.error('Error in toggleTubeLock:', error);
            throw error;
        }
    },

    // manage kelompok
    getAllKelompok: async () => {
        try {
            const query = `
        SELECT 
          k.id_kelompok,
          k.nama_kelompok,
          k.max_anggota,
          tb.topik_tubes,
          mk.nama_mata_kuliah,
          mkd.kelas,
          COUNT(DISTINCT a.npm) as jumlah_anggota
        FROM kelompok k
        JOIN tugas_besar tb ON k.id_tubes = tb.id_tubes
        JOIN mata_kuliah_dibuka mkd ON tb.id_mk_dibuka = mkd.id_mk_dibuka
        JOIN mata_kuliah mk ON mkd.id_mata_kuliah = mk.id_mata_kuliah
        LEFT JOIN anggota_kelompok a ON k.id_kelompok = a.id_kelompok
        GROUP BY k.id_kelompok, k.nama_kelompok, k.max_anggota, tb.topik_tubes, 
                 mk.nama_mata_kuliah, mkd.kelas
        ORDER BY mk.nama_mata_kuliah, k.nama_kelompok
      `;

            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error in getAllKelompok:', error);
            throw error;
        }
    }
};

module.exports = adminModel;