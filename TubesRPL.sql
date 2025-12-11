
DROP TABLE IF EXISTS nilai CASCADE;
DROP TABLE IF EXISTS komponen CASCADE;
DROP TABLE IF EXISTS anggota_kelompok CASCADE;
DROP TABLE IF EXISTS kelompok CASCADE;
DROP TABLE IF EXISTS tugas_besar CASCADE;
DROP TABLE IF EXISTS mengambil CASCADE;
DROP TABLE IF EXISTS mengajar CASCADE;
DROP TABLE IF EXISTS mata_kuliah_dibuka CASCADE;
DROP TABLE IF EXISTS mata_kuliah CASCADE;
DROP TABLE IF EXISTS mahasiswa CASCADE;
DROP TABLE IF EXISTS dosen CASCADE;
DROP TABLE IF EXISTS users CASCADE;


-- CREATE TABLE SECTION


-- USERS
CREATE TABLE users (
    email VARCHAR(100) PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('mahasiswa', 'dosen', 'admin'))
);

-- DOSEN
CREATE TABLE dosen (
    nik CHAR(10) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE REFERENCES users(email)
);

-- MAHASISWA
CREATE TABLE mahasiswa (
    npm CHAR(10) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE REFERENCES users(email),
    kelas CHAR(1) NOT NULL CHECK (kelas IN ('A','B'))
);

-- MATA KULIAH
CREATE TABLE mata_kuliah (
    id_mata_kuliah CHAR(9) PRIMARY KEY,
    nama_mata_kuliah VARCHAR(100) NOT NULL
);

-- MATA KULIAH DIBUKA
CREATE TABLE mata_kuliah_dibuka (
    id_mk_dibuka SERIAL PRIMARY KEY,
    id_mata_kuliah CHAR(9) REFERENCES mata_kuliah(id_mata_kuliah),
    semester INT NOT NULL,
    tahun INT NOT NULL,
    kelas CHAR(1) NOT NULL CHECK (kelas IN ('A','B'))
);

-- MENGAJAR
CREATE TABLE mengajar (
    nik CHAR(10) REFERENCES dosen(nik),
    id_mk_dibuka INT REFERENCES mata_kuliah_dibuka(id_mk_dibuka),
    PRIMARY KEY (nik, id_mk_dibuka)
);

-- MENGAMBIL
CREATE TABLE mengambil (
    npm CHAR(10) REFERENCES mahasiswa(npm),
    id_mk_dibuka INT REFERENCES mata_kuliah_dibuka(id_mk_dibuka),
    PRIMARY KEY (npm, id_mk_dibuka)
);

-- TUGAS BESAR
CREATE TABLE tugas_besar (
    id_tubes SERIAL PRIMARY KEY,
    id_mk_dibuka INT REFERENCES mata_kuliah_dibuka(id_mk_dibuka),
    topik_tubes VARCHAR(100)
);
ALTER TABLE tugas_besar ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT FALSE;
-- KELOMPOK
CREATE TABLE kelompok (
    id_kelompok SERIAL PRIMARY KEY,
    id_tubes INT REFERENCES tugas_besar(id_tubes),
    nama_kelompok VARCHAR(20)
);
ALTER TABLE kelompok
ADD COLUMN max_anggota INTEGER;

-- ANGGOTA KELOMPOK
CREATE TABLE anggota_kelompok (
    npm CHAR(10) REFERENCES mahasiswa(npm),
    id_kelompok INT REFERENCES kelompok(id_kelompok),
    PRIMARY KEY (npm, id_kelompok)
);

-- KOMPONEN NILAI
CREATE TABLE komponen (
    id_komponen SERIAL PRIMARY KEY,
    id_tubes INT REFERENCES tugas_besar(id_tubes),
    nama_komponen VARCHAR(50),
    bobot_komponen INT CHECK (bobot_komponen > 0 AND bobot_komponen <= 100)
);
ALTER TABLE komponen 
ADD COLUMN catatan TEXT;

-- NILAI
CREATE TABLE nilai (
    npm CHAR(10) REFERENCES mahasiswa(npm),
    id_komponen INT REFERENCES komponen(id_komponen),
    nilai INT CHECK (nilai >= 0 AND nilai <= 100),
    jadwal DATE,
    catatan TEXT,
    PRIMARY KEY (npm, id_komponen)
);



-- INSERT DATA DUMMY



-- 10 DOSEN USERS

INSERT INTO users (email, password, role) VALUES
('dosen1@unpar.ac.id','pass','dosen'),
('dosen2@unpar.ac.id','pass','dosen'),
('dosen3@unpar.ac.id','pass','dosen'),
('dosen4@unpar.ac.id','pass','dosen'),
('dosen5@unpar.ac.id','pass','dosen'),
('dosen6@unpar.ac.id','pass','dosen'),
('dosen7@unpar.ac.id','pass','dosen'),
('dosen8@unpar.ac.id','pass','dosen'),
('dosen9@unpar.ac.id','pass','dosen'),
('dosen10@unpar.ac.id','pass','dosen');

INSERT INTO dosen (nik, nama, email) VALUES
('1988123401','Maria Natalia','dosen1@unpar.ac.id'),
('1977091102','Budi Santosa','dosen2@unpar.ac.id'),
('1985012233','Cynthia Lim','dosen3@unpar.ac.id'),
('1976121104','Gerry Pratama','dosen4@unpar.ac.id'),
('1989101505','Samuel Nugraha','dosen5@unpar.ac.id'),
('1988051106','Ratna Wijaya','dosen6@unpar.ac.id'),
('1987062507','Dedi Kurniawan','dosen7@unpar.ac.id'),
('1983030408','Fransiskus Leo','dosen8@unpar.ac.id'),
('1979120909','Stefanus Gito','dosen9@unpar.ac.id'),
('1984022210','Rina Marlina','dosen10@unpar.ac.id');



-- USERS MAHASISWA 40 ORANG


INSERT INTO users (email, password, role) VALUES
-- kelas A
('mhs001@unpar.ac.id','pass','mahasiswa'),
('mhs002@unpar.ac.id','pass','mahasiswa'),
('mhs003@unpar.ac.id','pass','mahasiswa'),
('mhs004@unpar.ac.id','pass','mahasiswa'),
('mhs005@unpar.ac.id','pass','mahasiswa'),
('mhs006@unpar.ac.id','pass','mahasiswa'),
('mhs007@unpar.ac.id','pass','mahasiswa'),
('mhs008@unpar.ac.id','pass','mahasiswa'),
('mhs009@unpar.ac.id','pass','mahasiswa'),
('mhs010@unpar.ac.id','pass','mahasiswa'),
('mhs011@unpar.ac.id','pass','mahasiswa'),
('mhs012@unpar.ac.id','pass','mahasiswa'),
('mhs013@unpar.ac.id','pass','mahasiswa'),
('mhs014@unpar.ac.id','pass','mahasiswa'),
('mhs015@unpar.ac.id','pass','mahasiswa'),
('mhs016@unpar.ac.id','pass','mahasiswa'),
('mhs017@unpar.ac.id','pass','mahasiswa'),
('mhs018@unpar.ac.id','pass','mahasiswa'),
('mhs019@unpar.ac.id','pass','mahasiswa'),
('mhs020@unpar.ac.id','pass','mahasiswa'),

-- kelas B
('mhs021@unpar.ac.id','pass','mahasiswa'),
('mhs022@unpar.ac.id','pass','mahasiswa'),
('mhs023@unpar.ac.id','pass','mahasiswa'),
('mhs024@unpar.ac.id','pass','mahasiswa'),
('mhs025@unpar.ac.id','pass','mahasiswa'),
('mhs026@unpar.ac.id','pass','mahasiswa'),
('mhs027@unpar.ac.id','pass','mahasiswa'),
('mhs028@unpar.ac.id','pass','mahasiswa'),
('mhs029@unpar.ac.id','pass','mahasiswa'),
('mhs030@unpar.ac.id','pass','mahasiswa'),
('mhs031@unpar.ac.id','pass','mahasiswa'),
('mhs032@unpar.ac.id','pass','mahasiswa'),
('mhs033@unpar.ac.id','pass','mahasiswa'),
('mhs034@unpar.ac.id','pass','mahasiswa'),
('mhs035@unpar.ac.id','pass','mahasiswa'),
('mhs036@unpar.ac.id','pass','mahasiswa'),
('mhs037@unpar.ac.id','pass','mahasiswa'),
('mhs038@unpar.ac.id','pass','mahasiswa'),
('mhs039@unpar.ac.id','pass','mahasiswa'),
('mhs040@unpar.ac.id','pass','mahasiswa');



-- INSERT MAHASISWA


INSERT INTO mahasiswa (npm, nama, email, kelas) VALUES
-- 20 kelas A
('618224001','Andi Wijaya','mhs001@unpar.ac.id','A'),
('618224002','Budi Hartono','mhs002@unpar.ac.id','A'),
('618224003','Citra Lestari','mhs003@unpar.ac.id','A'),
('618224004','Dewi Putri','mhs004@unpar.ac.id','A'),
('618224005','Eko Pranata','mhs005@unpar.ac.id','A'),
('618224006','Fajar Ardi','mhs006@unpar.ac.id','A'),
('618224007','Gita Maharani','mhs007@unpar.ac.id','A'),
('618224008','Hendra Gunawan','mhs008@unpar.ac.id','A'),
('618224009','Imelda Sari','mhs009@unpar.ac.id','A'),
('618224010','Johan Kris','mhs010@unpar.ac.id','A'),
('618224011','Kevin Lim','mhs011@unpar.ac.id','A'),
('618224012','Livia Tan','mhs012@unpar.ac.id','A'),
('618224013','Michael Setiawan','mhs013@unpar.ac.id','A'),
('618224014','Nadia Fitria','mhs014@unpar.ac.id','A'),
('618224015','Oscar Fernando','mhs015@unpar.ac.id','A'),
('618224016','Putri Ayu','mhs016@unpar.ac.id','A'),
('618224017','Rendy Halim','mhs017@unpar.ac.id','A'),
('618224018','Sinta Ramadhani','mhs018@unpar.ac.id','A'),
('618224019','Thomas Aditya','mhs019@unpar.ac.id','A'),
('618224020','Vera Melani','mhs020@unpar.ac.id','A'),

-- 20 kelas B
('618224021','William Halim','mhs021@unpar.ac.id','B'),
('618224022','Xavier Hartanto','mhs022@unpar.ac.id','B'),
('618224023','Yulia Maria','mhs023@unpar.ac.id','B'),
('618224024','Zefanya Putra','mhs024@unpar.ac.id','B'),
('618224025','Amanda Pratiwi','mhs025@unpar.ac.id','B'),
('618224026','Berlian Cahyani','mhs026@unpar.ac.id','B'),
('618224027','Celine Wijaya','mhs027@unpar.ac.id','B'),
('618224028','Dennis Ang','mhs028@unpar.ac.id','B'),
('618224029','Evelyn Kiara','mhs029@unpar.ac.id','B'),
('618224030','Felix Hadinata','mhs030@unpar.ac.id','B'),
('618224031','Gwen Sutanto','mhs031@unpar.ac.id','B'),
('618224032','Harold Kevin','mhs032@unpar.ac.id','B'),
('618224033','Irene Theresia','mhs033@unpar.ac.id','B'),
('618224034','Jason Yohan','mhs034@unpar.ac.id','B'),
('618224035','Kelly Rosalinda','mhs035@unpar.ac.id','B'),
('618224036','Leonardo Tan','mhs036@unpar.ac.id','B'),
('618224037','Monica Tania','mhs037@unpar.ac.id','B'),
('618224038','Nathan Gabriel','mhs038@unpar.ac.id','B'),
('618224039','Olivia Dewi','mhs039@unpar.ac.id','B'),
('618224040','Patrick Krista','mhs040@unpar.ac.id','B');

INSERT INTO mata_kuliah (id_mata_kuliah, nama_mata_kuliah) VALUES
('AIF233201','Manajemen Proyek'),
('AIF233202','Pemrograman Berbasis Web'),
('AIF233203','Rekayasa Perangkat Lunak'),
('AIF233204','Manajemen Informasi Berbasis Data');


INSERT INTO mata_kuliah_dibuka (id_mata_kuliah, semester, tahun, kelas) VALUES
('AIF233201',1,2024,'A'),
('AIF233201',1,2024,'B'),
('AIF233202',1,2024,'A'),
('AIF233202',1,2024,'B'),
('AIF233203',1,2024,'A'),
('AIF233203',1,2024,'B'),
('AIF233204',1,2024,'A'),
('AIF233204',1,2024,'B');


INSERT INTO mengajar (nik, id_mk_dibuka) VALUES
('1988123401', 1),
('1977091102', 2),
('1985012233', 3),
('1976121104', 4),
('1989101505', 5),
('1988051106', 6),
('1987062507', 7),
('1983030408', 8);


INSERT INTO mengambil (npm, id_mk_dibuka) VALUES
('618224001',1), ('618224001',3), ('618224001',5), ('618224001',7),
('618224002',1), ('618224002',3), ('618224002',5), ('618224002',7),
('618224003',1), ('618224003',3), ('618224003',5), ('618224003',7),
('618224004',1), ('618224004',3), ('618224004',5), ('618224004',7),
('618224005',1), ('618224005',3), ('618224005',5), ('618224005',7),
('618224006',1), ('618224006',3), ('618224006',5), ('618224006',7),
('618224007',1), ('618224007',3), ('618224007',5), ('618224007',7),
('618224008',1), ('618224008',3), ('618224008',5), ('618224008',7),
('618224009',1), ('618224009',3), ('618224009',5), ('618224009',7),
('618224010',1), ('618224010',3), ('618224010',5), ('618224010',7),
('618224011',1), ('618224011',3), ('618224011',5), ('618224011',7),
('618224012',1), ('618224012',3), ('618224012',5), ('618224012',7),
('618224013',1), ('618224013',3), ('618224013',5), ('618224013',7),
('618224014',1), ('618224014',3), ('618224014',5), ('618224014',7),
('618224015',1), ('618224015',3), ('618224015',5), ('618224015',7),
('618224016',1), ('618224016',3), ('618224016',5), ('618224016',7),
('618224017',1), ('618224017',3), ('618224017',5), ('618224017',7),
('618224018',1), ('618224018',3), ('618224018',5), ('618224018',7),
('618224019',1), ('618224019',3), ('618224019',5), ('618224019',7),
('618224020',1), ('618224020',3), ('618224020',5), ('618224020',7);


INSERT INTO mengambil (npm, id_mk_dibuka) VALUES
('618224021',2), ('618224021',4), ('618224021',6), ('618224021',8),
('618224022',2), ('618224022',4), ('618224022',6), ('618224022',8),
('618224023',2), ('618224023',4), ('618224023',6), ('618224023',8),
('618224024',2), ('618224024',4), ('618224024',6), ('618224024',8),
('618224025',2), ('618224025',4), ('618224025',6), ('618224025',8),
('618224026',2), ('618224026',4), ('618224026',6), ('618224026',8),
('618224027',2), ('618224027',4), ('618224027',6), ('618224027',8),
('618224028',2), ('618224028',4), ('618224028',6), ('618224028',8),
('618224029',2), ('618224029',4), ('618224029',6), ('618224029',8),
('618224030',2), ('618224030',4), ('618224030',6), ('618224030',8),
('618224031',2), ('618224031',4), ('618224031',6), ('618224031',8),
('618224032',2), ('618224032',4), ('618224032',6), ('618224032',8),
('618224033',2), ('618224033',4), ('618224033',6), ('618224033',8),
('618224034',2), ('618224034',4), ('618224034',6), ('618224034',8),
('618224035',2), ('618224035',4), ('618224035',6), ('618224035',8),
('618224036',2), ('618224036',4), ('618224036',6), ('618224036',8),
('618224037',2), ('618224037',4), ('618224037',6), ('618224037',8),
('618224038',2), ('618224038',4), ('618224038',6), ('618224038',8),
('618224039',2), ('618224039',4), ('618224039',6), ('618224039',8),
('618224040',2), ('618224040',4), ('618224040',6), ('618224040',8);


INSERT INTO tugas_besar (id_mk_dibuka, topik_tubes) VALUES
(1,'Analisis Kasus Proyek'),
(2,'Simulasi Manajemen Proyek'),
(3,'Portal Berita Interaktif'),
(4,'Web Manajemen Tugas'),
(5,'Sistem Otomasi Rumah Pintar'),
(6,'Aplikasi Manajemen Acara'),
(7,'Analisis Data Penjualan'),
(8,'Sistem Manajemen Data Kesehatan');




