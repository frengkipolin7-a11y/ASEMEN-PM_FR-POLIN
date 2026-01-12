export const JENJANG_OPTIONS = [
    { value: 'SD', label: 'SD / Sederajat' },
    { value: 'SMP', label: 'SMP / Sederajat' },
    { value: 'SMA', label: 'SMA / Sederajat' },
];

export const KELAS_OPTIONS = {
    SD: [
        { value: '1', label: 'Kelas 1' },
        { value: '2', label: 'Kelas 2' },
        { value: '3', label: 'Kelas 3' },
        { value: '4', label: 'Kelas 4' },
        { value: '5', label: 'Kelas 5' },
        { value: '6', label: 'Kelas 6' },
    ],
    SMP: [
        { value: '7', label: 'Kelas 7' },
        { value: '8', label: 'Kelas 8' },
        { value: '9', label: 'Kelas 9' },
    ],
    SMA: [
        { value: '10', label: 'Kelas 10' },
        { value: '11', label: 'Kelas 11' },
        { value: '12', label: 'Kelas 12' },
    ],
};

export const SEMESTER_OPTIONS = [
    { value: 'Ganjil', label: 'Ganjil' },
    { value: 'Genap', label: 'Genap' },
];

export const JUMLAH_SOAL_OPTIONS = [
    { value: '0', label: '0 Soal' },
    { value: '5', label: '5 Soal' },
    { value: '10', label: '10 Soal' },
    { value: '15', label: '15 Soal' },
    { value: '20', label: '20 Soal' },
];

export const TINGKAT_KESULITAN_OPTIONS = [
    { value: 'Mudah', label: 'Mudah (Dominan C2 & C3)' },
    { value: 'Sedang', label: 'Sedang (Campuran C3 & C4)' },
    { value: 'Sulit', label: 'Sulit (Dominan C4, C5, C6)' },
];

export const IMAGE_STYLE_OPTIONS = [
    { value: 'Diagram Garis (Hitam Putih)', label: 'Diagram Garis (Hitam Putih)' },
    { value: 'Ilustrasi Buku Teks', label: 'Ilustrasi Buku Teks' },
    { value: 'Skema Ilmiah Berwarna', label: 'Skema Ilmiah Berwarna' },
    { value: 'Peta / Grafik Data', label: 'Peta / Grafik Data' },
    { value: 'Minimalis Bersih', label: 'Minimalis Bersih' },
];

export const IMAGE_ASPECT_RATIO_OPTIONS = [
    { value: '1:1', label: '1:1 (Persegi)' },
    { value: '4:3', label: '4:3 (Lansekap Standar)' },
    { value: '3:4', label: '3:4 (Potret Standar)' },
    { value: '16:9', label: '16:9 (Lansekap Lebar)' },
    { value: '9:16', label: '9:16 (Potret Lebar)' },
];

export const TANGGAL_OPTIONS = Array.from({ length: 31 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }));

export const BULAN_OPTIONS = [
    { value: 'Januari', label: 'Januari' },
    { value: 'Februari', label: 'Februari' },
    { value: 'Maret', label: 'Maret' },
    { value: 'April', label: 'April' },
    { value: 'Mei', label: 'Mei' },
    { value: 'Juni', label: 'Juni' },
    { value: 'Juli', label: 'Juli' },
    { value: 'Agustus', label: 'Agustus' },
    { value: 'September', label: 'September' },
    { value: 'Oktober', label: 'Oktober' },
    { value: 'November', label: 'November' },
    { value: 'Desember', label: 'Desember' },
];

export const FASE_MAP: { [key: string]: { [key: string]: string } } = {
  SD: { '1': 'A', '2': 'A', '3': 'B', '4': 'B', '5': 'C', '6': 'C' },
  SMP: { '7': 'D', '8': 'D', '9': 'D' },
  SMA: { '10': 'E', '11': 'F', '12': 'F' },
};

const AGAMA_OPTIONS = [
    'Pendidikan Agama Islam dan Budi Pekerti',
    'Pendidikan Agama Kristen dan Budi Pekerti',
    'Pendidikan Agama Katolik dan Budi Pekerti',
    'Pendidikan Agama Hindu dan Budi Pekerti',
    'Pendidikan Agama Buddha dan Budi Pekerti',
    'Pendidikan Agama Khonghucu dan Budi Pekerti',
    'Pendidikan Kepercayaan Terhadap Tuhan YME dan Budi Pekerti',
];

const SENI_OPTIONS = [
    'Seni Musik',
    'Seni Rupa',
    'Seni Tari',
    'Seni Teater'
];

const PRAKARYA_OPTIONS = [
    'Prakarya (Kerajinan)',
    'Prakarya (Rekayasa)',
    'Prakarya (Budidaya)',
    'Prakarya (Pengolahan)'
];

export const MATA_PELAJARAN_OPTIONS: { [key: string]: { [key: string]: string[] } } = {
    SD: {
        '1': [...AGAMA_OPTIONS, 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', ...SENI_OPTIONS],
        '2': [...AGAMA_OPTIONS, 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', ...SENI_OPTIONS],
        '3': [...AGAMA_OPTIONS, 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'Ilmu Pengetahuan Alam dan Sosial (IPAS)', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Bahasa Inggris', ...SENI_OPTIONS],
        '4': [...AGAMA_OPTIONS, 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'Ilmu Pengetahuan Alam dan Sosial (IPAS)', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Bahasa Inggris', 'Informatika', ...SENI_OPTIONS],
        '5': [...AGAMA_OPTIONS, 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'Ilmu Pengetahuan Alam dan Sosial (IPAS)', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Bahasa Inggris', 'Informatika', 'Koding dan Kecerdasan Artificial', ...SENI_OPTIONS],
        '6': [...AGAMA_OPTIONS, 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'Ilmu Pengetahuan Alam dan Sosial (IPAS)', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Bahasa Inggris', 'Informatika', 'Koding dan Kecerdasan Artificial', ...SENI_OPTIONS],
    },
    SMP: {
        '7': [...AGAMA_OPTIONS, 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'Ilmu Pengetahuan Alam (IPA)', 'Ilmu Pengetahuan Sosial (IPS)', 'Bahasa Inggris', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Informatika', 'Koding dan Kecerdasan Artificial', ...SENI_OPTIONS, ...PRAKARYA_OPTIONS],
        '8': [...AGAMA_OPTIONS, 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'Ilmu Pengetahuan Alam (IPA)', 'Ilmu Pengetahuan Sosial (IPS)', 'Bahasa Inggris', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Informatika', 'Koding dan Kecerdasan Artificial', ...SENI_OPTIONS, ...PRAKARYA_OPTIONS],
        '9': [...AGAMA_OPTIONS, 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'Ilmu Pengetahuan Alam (IPA)', 'Ilmu Pengetahuan Sosial (IPS)', 'Bahasa Inggris', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Informatika', 'Koding dan Kecerdasan Artificial', ...SENI_OPTIONS, ...PRAKARYA_OPTIONS],
    },
    SMA: {
        '10': [...AGAMA_OPTIONS, 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'Bahasa Inggris', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Sejarah', 'Informatika', 'Fisika', 'Kimia', 'Biologi', 'Sosiologi', 'Ekonomi', 'Geografi', 'Koding dan Kecerdasan Artificial', ...SENI_OPTIONS],
        '11': [...AGAMA_OPTIONS, 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'Bahasa Inggris', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Sejarah', 'Biologi', 'Kimia', 'Fisika', 'Informatika', 'Matematika Tingkat Lanjut', 'Sosiologi', 'Ekonomi', 'Geografi', 'Koding dan Kecerdasan Artificial', ...SENI_OPTIONS],
        '12': [...AGAMA_OPTIONS, 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'Bahasa Inggris', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Sejarah', 'Biologi', 'Kimia', 'Fisika', 'Informatika', 'Matematika Tingkat Lanjut', 'Sosiologi', 'Ekonomi', 'Geografi', 'Koding dan Kecerdasan Artificial', ...SENI_OPTIONS],
    },
};


// Capaian Pembelajaran (CP) berdasarkan Fase
// Sumber: Disalin dan diadaptasi dari BSKAP 046/H/KR/2025

const CP_AGAMA_A = 'Peserta didik mengenal ajaran pokok agamanya, cerita-cerita tokoh suci/nabi secara sederhana. Mereka mampu mempraktikkan tata cara ibadah dasar, serta membaca kitab suci tingkat dasar. Peserta didik juga meneladani akhlak mulia dalam kehidupan sehari-hari.';
const CP_AGAMA_B = 'Peserta didik memahami kisah-kisah tokoh suci/nabi dan rasul untuk meneladani sifat-sifat mulianya. Mereka mampu menjelaskan makna nama-nama suci Tuhan, mempraktikkan ibadah sunah, serta memahami hikmah dari hari-hari besar keagamaan. Peserta didik membiasakan perilaku jujur, amanah, dan hormat kepada orang tua dan guru.';
const CP_AGAMA_C = 'Peserta didik mampu menganalisis kisah keteladanan para tokoh suci/nabi dan rasul utama. Mereka memahami ketentuan ibadah sosial (seperti zakat, persembahan, kurban). Peserta didik juga dapat menjelaskan sejarah perjuangan tokoh suci/nabi utamanya, serta membiasakan sikap toleransi dalam kehidupan bermasyarakat.';
const CP_AGAMA_D = 'Peserta didik mampu menganalisis isi pokok kitab suci tentang toleransi, kerja keras, dan demokrasi. Mereka memahami ketentuan ibadah-ibadah spesifik dalam agamanya. Peserta didik dapat meneladani sejarah and perjuangan tokoh-tokoh agamanya, serta menerapkan perilaku jujur, adil, dan bertanggung jawab.';
const CP_AGAMA_E = 'Peserta didik mampu menganalisis ajaran kitab suci tentang berpikir kritis, ilmu pengetahuan dan teknologi, serta toleransi. Mereka memahami esensi dan urgensi syariat/ajaran agamanya dalam kehidupan. Peserta didik dapat menganalisis sejarah peradaban agamanya pada masa modern dan mengidentifikasi kontribusinya bagi dunia.';
const CP_AGAMA_F = 'Peserta didik mampu mengevaluasi implementasi ajaran agamanya dalam konteks kehidupan modern dan global. Mereka menganalisis ajaran kitab suci tentang demokrasi, kepemimpinan, dan etos kerja. Peserta didik dapat mengambil ibrah dari sejarah perkembangan agamanya di Indonesia dan dunia, serta berkontribusi aktif dalam membangun masyarakat yang damai dan inklusif.';

const buildAgamaCp = (cpText: string) => AGAMA_OPTIONS.reduce((acc, subject) => {
    acc[subject] = cpText;
    return acc;
}, {} as {[key: string]: string});

const buildSeniCp = (cpText: string) => SENI_OPTIONS.reduce((acc, subject) => {
    acc[subject] = cpText;
    return acc;
}, {} as {[key: string]: string});


const CP_FASE_A = { // Kelas 1-2
    ...buildAgamaCp(CP_AGAMA_A),
    'Pendidikan Pancasila': 'Peserta didik mampu mengenali simbol-simbol Pancasila dan menceritakan makna sila-sila Pancasila. Mereka juga dapat menerapkan nilai-nilai Pancasila dalam kehidupan sehari-hari di lingkungan keluarga dan sekolah, seperti berdoa sebelum dan sesudah kegiatan, menghormati teman yang berbeda agama, serta mau menolong teman.',
    'Bahasa Indonesia': 'Peserta didik mampu bersikap menjadi pembaca dan pemirsa yang menunjukkan minat terhadap teks yang dibaca atau dilihat. Peserta didik mampu membaca kata-kata yang dikenalinya sehari-hari dengan fasih. Peserta didik mampu memahami informasi dari bacaan dan tayangan yang dipirsa tentang diri dan lingkungan, serta mampu menyampaikan gagasan secara lisan dan menulis beberapa kalimat sederhana.',
    'Matematika': 'Peserta didik menunjukkan pemahaman dan memiliki intuisi bilangan (number sense) pada bilangan cacah sampai 100. Mereka dapat membaca, menulis, menentukan nilai tempat, membandingkan, mengurutkan, serta melakukan komposisi dan dekomposisi bilangan. Peserta didik juga dapat menyelesaikan masalah berkaitan dengan penjumlahan dan pengurangan bilangan cacah sampai 100.',
    'Pendidikan Jasmani, Olahraga, dan Kesehatan': 'Peserta didik menunjukkan kemampuan dalam mempraktikkan variasi dan kombinasi pola gerak dasar (lokomotor, non-lokomotor, dan manipulatif) dalam berbagai aktivitas jasmani dan permainan. Peserta didik juga memahami pentingnya menjaga kebersihan diri dan lingkungan serta memilih makanan bergizi.',
    ...buildSeniCp('Peserta didik mampu mengamati, mengenal, merekam, dan menuangkan pengalaman kesehariannya secara visual, bunyi, atau gerak. Peserta didik mampu mengeksplorasi alat, bahan, dan prosedur dasar dalam menggambar, mewarnai, membentuk, memotong, menempel, serta mengenal unsur musik dan dasar-dasar gerak tari.'),
};

const CP_FASE_B = { // Kelas 3-4
    ...buildAgamaCp(CP_AGAMA_B),
    'Pendidikan Pancasila': 'Peserta didik mampu memahami makna dan nilai-nilai dari sila-sila Pancasila serta menceritakan contoh penerapan sila Pancasila dalam kehidupan sehari-hari. Mereka juga mampu mengidentifikasi dan menyajikan contoh-contoh sikap gotong royong dan keragaman di lingkungan sekitar.',
    'Bahasa Indonesia': 'Peserta didik memiliki kemampuan berbahasa untuk berkomunikasi dan bernalar, sesuai dengan tujuan dan konteks sosial. Peserta didik mampu memahami, mengolah, dan menginterpretasi informasi dan pesan dari paparan lisan dan tulis tentang topik yang dikenali. Peserta didik mampu menanggapi dan mempresentasikan informasi yang dipaparkan; berpartisipasi aktif dalam diskusi; menuliskan pengalamannya menggunakan ragam bahasa yang sesuai.',
    'Matematika': 'Peserta didik menunjukkan pemahaman dan intuisi bilangan (number sense) pada bilangan cacah sampai 1.000. Mereka dapat melakukan operasi penjumlahan, pengurangan, perkalian, dan pembagian bilangan cacah, serta memahami konsep pecahan sederhana. Peserta didik dapat menyelesaikan masalah berkaitan dengan unsur-unsur bangun datar dan mengukur panjang menggunakan satuan baku.',
    'Ilmu Pengetahuan Alam dan Sosial (IPAS)': 'Pada akhir fase B, peserta didik dapat mendeskripsikan ciri-ciri makhluk hidup dan tak hidup, serta mengidentifikasi perubahan wujud zat. Mereka mampu menjelaskan fungsi bagian-bagian tubuh manusia, hewan, dan tumbuhan. Peserta didik dapat mengenali berbagai bentuk energi dan sumbernya, serta memahami konsep gaya dan gerak. Mereka juga dapat mendeskripsikan siklus air dan pentingnya menjaga kelestarian sumber daya alam. Peserta didik mampu melakukan pengamatan sederhana, mencatat data, and mengkomunikasikan hasilnya.',
    'Pendidikan Jasmani, Olahraga, dan Kesehatan': 'Peserta didik menunjukkan kemampuan dalam mempraktikkan variasi dan kombinasi pola gerak dasar dalam permainan bola kecil dan bola besar, serta aktivitas senam dan gerak berirama. Peserta didik memahami konsep pemanasan dan pendinginan, serta cara menjaga kesehatan organ tubuh.',
    ...buildSeniCp('Peserta didik mampu menciptakan karya seni dengan mengeksplorasi berbagai media dan teknik. Mereka dapat bernyanyi sesuai dengan melodi dan irama, serta memperagakan gerak tari tradisional sederhana. Peserta didik juga mampu mengapresiasi keunikan ragam seni di lingkungan sekitarnya.'),
    'Bahasa Inggris': 'Peserta didik memahami dan merespon instruksi-instruksi sederhana dalam bahasa Inggris baik secara verbal maupun non-verbal. Mereka dapat memperkenalkan diri, menggunakan ungkapan-ungkapan dasar, and memahami kata-kata yang sering digunakan terkait dengan diri sendiri, keluarga, and lingkungan sekolah.',
    'Informatika': 'Peserta didik mampu mengidentifikasi dan menggunakan perangkat TIK yang ada di sekitarnya secara aman dan bertanggung jawab. Mereka dapat membuat karya sederhana menggunakan aplikasi pengolah gambar atau kata, serta mengikuti instruksi dalam aktivitas berpikir komputasional sederhana (unplugged).',
};

const CP_FASE_C = { // Kelas 5-6
    ...buildAgamaCp(CP_AGAMA_C),
    'Pendidikan Pancasila': 'Peserta didik mampu menganalisis penerapan nilai-nilai Pancasila di lingkungan sekitarnya. Mereka dapat menyajikan hasil analisis studi kasus sederhana terkait penerapan sila-sila Pancasila. Peserta didik juga memahami hak dan kewajiban sebagai warga negara dan siswa, serta pentingnya persatuan dalam keragaman.',
    'Bahasa Indonesia': 'Peserta didik mampu membaca teks sastra dan nonfiksi dengan lancar dan pemahaman yang baik, serta dapat membuat ringkasan dan inferensi sederhana. Peserta didik mampu menganalisis informasi dari berbagai sumber (lisan, tulisan, visual), and menyampaikan pendapatnya secara logis and santun dalam diskusi. Mereka mampu menulis teks narasi, deskripsi, and argumentasi sederhana dengan struktur yang jelas.',
    'Matematika': 'Peserta didik dapat mengoperasikan bilangan cacah sampai 1.000.000, bilangan bulat, and pecahan. Mereka dapat menyelesaikan masalah yang melibatkan FPB and KPK, serta memahami konsep skala and perbandingan. Peserta didik mampu menghitung luas bangun datar and volume bangun ruang (kubus and balok), serta menganalisis data yang disajikan dalam bentuk tabel, diagram batang, and diagram lingkaran.',
    'Ilmu Pengetahuan Alam dan Sosial (IPAS)': 'Peserta didik dapat mendeskripsikan sistem organ tubuh manusia (pernapasan, pencernaasan, peredaran darah) and fungsinya. Mereka memahami konsep rantai makanan and jaring-jaring makanan, serta adaptasi makhluk hidup. Peserta didik mampu menjelaskan sifat-sifat cahaya, bunyi, and panas, serta konsep kelistrikan and magnet sederhana. Mereka juga dapat memahami sistem tata surya and peristiwa alam yang terjadi di Indonesia.',
    'Pendidikan Jasmani, Olahraga, dan Kesehatan': 'Peserta didik mampu menerapkan kombinasi pola gerak dominan dalam aktivitas atletik, bela diri, and kebugaran jasmani. Mereka memahami manfaat aktivitas fisik secara teratur, cara menanggulangi cedera ringan, serta bahaya merokok, minuman keras, and NAPZA.',
    ...buildSeniCp('Peserta didik mampu berkarya seni dua atau tiga dimensi dengan memperhatikan unsur and prinsip seni. Mereka dapat memainkan alat musik melodis sederhana and bernyanyi secara berkelompok. Peserta didik juga mampu merancang and mementaskan pertunjukan tari atau teater sederhana berdasarkan cerita daerah.'),
    'Bahasa Inggris': 'Peserta didik dapat berinteraksi dalam percakapan sederhana sehari-hari. Mereka mampu memahami teks tulis sederhana (misalnya, deskripsi orang atau benda) and menulis kalimat-kalimat sederhana untuk mengungkapkan ide. Peserta didik memiliki perbendaharaan kata yang lebih luas terkait topik-topik yang relevan.',
    'Informatika': 'Peserta didik mampu memahami dasar-dasar penggunaan perangkat TIK, mengelola file sederhana, and menggunakan aplikasi dasar untuk membuat dokumen atau presentasi. Mereka mulai mengenal konsep berpikir komputasional melalui aktivitas unplugged and pemrograman visual sederhana, serta memahami etika dasar and keamanan di dunia digital.',
    'Koding dan Kecerdasan Artificial': 'Peserta didik mampu menerapkan berpikir komputasional secara mendasar untuk menyelesaikan persoalan sehari-hari. Mereka dapat menggunakan antarmuka visual (block-based coding) untuk membuat program sederhana, serta mengenal pemanfaatan teknologi kecerdasan buatan (AI) secara etis dalam kehidupan manusia.',
};

const CP_FASE_D = { // Kelas 7-9 (SMP)
    ...buildAgamaCp(CP_AGAMA_D),
    'Pendidikan Pancasila': 'Peserta didik mampu menganalisis dinamika perumusan and penerapan Pancasila dari masa ke masa. Mereka dapat memahami norma and UUD NRI Tahun 1945 sebagai landasan hukum. Peserta didik aktif mengkampanyekan praktik baik dalam menjaga Bhinneka Tunggal Ika and keutuhan NKRI.',
    'Bahasa Indonesia': 'Pada akhir Fase D, peserta didik memiliki kemampuan berbahasa untuk berkomunikasi and bernalar sesuai dengan tujuan, konteks sosial, and akademis. Peserta didik mampu memahami, mengolah, and menginterpretasi informasi paparan tentang topik yang beragam and karya sastra. Peserta didik mampu berpartisipasi aktif dalam diskusi, mempresentasikan, and menanggapi informasi nonfiksi and fiksi yang dipaparkan; Peserta didik mampu menulis berbagai teks untuk menyampaikan pengamatan and pengalamannya dengan lebih terstruktur, and menuliskan tanggapannya terhadap paparan and bacaan menggunakan pengalaman and pengetahuannya. Peserta didik mampu mengembangkan kompetensi kebahasaan untuk memperkaya kosakatanya and memahami struktur kalimat yang lebih kompleks.',
    'Matematika': 'Pada akhir fase D, peserta didik dapat menyelesaikan masalah kontekstual menggunakan konsep-konsep and keterampilan matematika yang dipelajari pada fase ini. Mereka mampu mengoperasikan secara efisien bilangan bulat, pecahan, desimal, and bilangan berpangkat, serta memahami relasi antar bilangan. Peserta didik dapat menyelesaikan persamaan and pertidaksamaan linear satu variabel, serta memahami konsep perbandingan senilai and berbalik nilai. Mereka dapat mengenali, menamai, and menganalisis sifat-sifat berbagai bangun datar and bangun ruang, serta menggunakan teorema Pythagoras. Peserta didik juga dapat mengumpulkan, menyajikan, and menganalisis data statistik sederhana serta memahami konsep peluang.',
    'Ilmu Pengetahuan Alam (IPA)': 'Pada akhir fase D, peserta didik dapat melakukan klasifikasi makhluk hidup and benda berdasarkan karakteristik yang diamati, mengidentifikasi sifat and karakteristik zat, membedakan perubahan fisika and kimia serta memisahkan campuran sederhana. Peserta didik dapat mendeskripsikan atom and senyawa sebagai unit terkecil materi serta sel sebagai unit terkecil makhluk hidup, mengidentifikasi sistem organ pada tubuh manusia and mengaitkan fungsinya. Peserta didik dapat mengidentifikasi interaksi antar makhluk hidup and lingkungannya, serta dapat merancang upaya-upaya mencegah and mengatasi pencemaran and perubahan iklim. Peserta didik dapat memahami gerak, gaya and tekanan, serta energi and perubahannya.',
    'Ilmu Pengetahuan Sosial (IPS)': 'Peserta didik mampu memahami konsep interaksi and sosialisasi dalam pembentukan lembaga sosial, ekonomi, pendidikan, and politik. Mereka dapat menganalisis pengaruh kondisi geografis terhadap keragaman sosial budaya and kegiatan ekonomi. Peserta didik juga dapat memahami perkembangan masyarakat Indonesia pada masa pra-aksara, Hindu-Buddha, Islam, hingga masa kolonialisme, serta merefleksikan perannya sebagai bagian dari masyarakat Indonesia and dunia.',
    'Bahasa Inggris': 'Peserta didik mampu berkomunikasi lisan and tulisan untuk menyampaikan kebutuhan dasar and pendapat tentang topik yang familiar. Mereka dapat memahami gagasan utama dari teks lisan and tulis yang beragam (misalnya, teks deskriptif, prosedur, recount). Peserta didik mampu menulis teks sederhana dengan struktur yang runtut and menggunakan kosakata serta tata bahasa yang sesuai.',
    'Pendidikan Jasmani, Olahraga, dan Kesehatan': 'Peserta didik mampu merancang and mempraktikkan strategi and taktik dalam permainan bola besar and bola kecil. Mereka dapat menerapkan variasi gerak spesifik dalam aktivitas senam lantai, renang, and bela diri. Peserta didik juga mampu menganalisis konsep kebugaran jasmani and menyusun program latihan untuk meningkatkannya, serta memahami isu-isu kesehatan reproduksi.',
    'Informatika': 'Peserta didik mampu memahami peran sistem operasi and aplikasi, memanfaatkan fitur-fitur aplikasi perkantoran, serta memahami konsep dasar jaringan komputer and internet. Mereka dapat membuat and mengelola folder and file secara terstruktur, serta menerapkan praktik baik dalam keamanan digital. Peserta didik juga mampu merancang and membuat program sederhana menggunakan pemrograman visual (blok).',
    ...buildSeniCp('Peserta didik mampu berkarya and mengapresiasi berdasarkan pemahaman terhadap unsur-unsur, prinsip, bahan, and teknik dalam seni rupa, musik, tari, atau teater. Mereka dapat mengekspresikan ide and perasaan melalui karya seni and berpartisipasi dalam pertunjukan sederhana, baik secara individu maupun kelompok.'),
    'Koding dan Kecerdasan Artificial': 'Peserta didik mampu menerapkan berpikir komputasional untuk menyelesaikan masalah-masalah yang lebih kompleks. Mereka dapat merancang and membuat program interaktif menggunakan bahasa pemrograman visual atau tekstual. Peserta didik juga diperkenalkan pada konsep dasar Kecerdasan Artifisial (AI), pengumpulan data, and bagaimana AI digunakan dalam kehidupan sehari-hari.',
    'Prakarya (Kerajinan)': 'Peserta didik mampu merancang, membuat, dan memodifikasi produk kerajinan berbahan alam, buatan, limbah organik, dan limbah anorganik. Mereka mampu memilih bahan, alat, dan teknik yang sesuai dengan potensi daerah/lokal, serta memperhatikan keselamatan kerja (K3). Peserta didik juga mampu mengevaluasi dan mempresentasikan hasil karyanya secara lisan maupun tulisan.',
    'Prakarya (Rekayasa)': 'Peserta didik mampu merancang, membuat, dan menguji produk rekayasa teknologi tepat guna sederhana (seperti alat penjernih air, konstruksi miniatur, atau rangkaian listrik sederhana). Mereka memahami prinsip kerja, bahan, dan alat yang digunakan. Peserta didik mampu mengkomunikasikan hasil karya dan melakukan evaluasi untuk perbaikan.',
    'Prakarya (Budidaya)': 'Peserta didik mampu merencanakan dan melaksanakan kegiatan budidaya (tanaman sayur, obat, atau ikan konsumsi) sesuai dengan potensi lingkungan. Mereka memahami tahapan persiapan, pemeliharaan, hingga pemanenan. Peserta didik menerapkan prinsip K3 dan mampu menghitung analisa usaha sederhana.',
    'Prakarya (Pengolahan)': 'Peserta didik mampu merancang dan mengolah bahan pangan nabati (buah, sayur, umbi, serealia) dan hewani (daging, ikan, telur, susu) menjadi produk makanan atau minuman jadi maupun setengah jadi. Mereka menerapkan prinsip higienitas dan sanitasi, penggunaan bahan tambahan pangan yang aman, serta penyajian dan pengemasan yang menarik.',
};

const CP_FASE_E = { // Kelas 10 (SMA)
    ...buildAgamaCp(CP_AGAMA_E),
    'Pendidikan Pancasila': 'Peserta didik dapat menganalisis secara kritis nilai-nilai Pancasila dalam praktik berbangsa and bernegara. Mereka mampu mengkaji kasus-kasus pelanggaran hak and pengingkaran kewajiban warga negara. Peserta didik juga dapat mengevaluasi sistem and dinamika demokrasi Pancasila serta peran Indonesia dalam perdamaian dunia.',
    'Bahasa Indonesia': 'Peserta didik memiliki kemampuan berbahasa untuk berkomunikasi and bernalar sesuai dengan tujuan, konteks sosial, akademis, and dunia kerja. Ia mampu memahami, mengolah, menginterpretasi, and mengevaluasi informasi dari berbagai tipe teks tentang topik yang beragam. Ia mampu menyintesis gagasan and pendapat dari berbagai sumber. Ia mampu berpartisipasi aktif dalam diskusi and debat. Ia mampu menulis berbagai teks untuk menyampaikan pendapat and mempresentasikan serta menanggapi informasi nonfiksi and fiksi secara kritis and etis.',
    'Matematika': 'Peserta didik dapat menggeneralisasi sifat-sifat operasi bilangan berpangkat (eksponen), serta menggunakan barisan and deret (aritmetika and geometri) dalam masalah kontekstual. Mereka mampu menyelesaikan masalah yang berkaitan dengan sistem persamaan linear tiga variabel, serta memahami konsep fungsi (linear, kuadrat, eksponensial) and grafiknya.',
    'Bahasa Inggris': 'Peserta didik menggunakan teks lisan, tulisan and visual dalam bahasa Inggris untuk berkomunikasi sesuai dengan situasi, tujuan, and pemirsa/pembacanya. Berbagai jenis teks seperti narasi, deskripsi, prosedur, eksposisi, recount, report, and teks asli menjadi rujukan utama dalam mempelajari bahasa Inggris di fase ini. Peserta didik menggunakan bahasa Inggris untuk berdiskusi and menyampaikan keinginan/perasaan.',
    'Pendidikan Jasmani, Olahraga, dan Kesehatan': 'Peserta didik mampu mengevaluasi and mempraktikkan keterampilan gerak spesifik permainan bola besar and bola kecil, serta olahraga tradisional. Mereka dapat merancang koreografi aktivitas gerak berirama and senam. Peserta didik juga mampu menganalisis and merancang program peningkatan kebugaran jasmani serta memahami prinsip-prinsip gizi seimbang and manajemen stres.',
    'Sejarah': 'Peserta didik mampu memahami konsep dasar ilmu sejarah, seperti berpikir kronologis, diakronis, sinkronis, ruang, and waktu. Mereka dapat menganalisis perkembangan kehidupan masyarakat pada masa kerajaan Hindu-Buddha and Islam di Indonesia, serta mengidentifikasi berbagai teori tentang proses masuknya agama and kebudayaan tersebut.',
    'Informatika': 'Peserta didik mampu menjelaskan cara kerja komputer and komponen-komponennya, menganalisis data menggunakan aplikasi perkantoran, serta memahami konsep and implementasi keamanan siber. Mereka dapat merancang algoritma kompleks untuk menyelesaikan masalah and mengimplementasikannya dalam bahasa pemrograman tekstual.',
    ...buildSeniCp('Peserta didik mampu mengapresiasi and menciptakan karya seni rupa, musik, tari, atau teater berdasarkan konsep, prosedur, and fungsi. Mereka dapat menganalisis nilai estetis and historis karya seni dari berbagai budaya di Indonesia and dunia. Peserta didik juga mampu berkolaborasi dalam merencanakan and melaksanakan pameran atau pertunjukan seni.'),
    'Fisika': 'Peserta didik mampu menerapkan konsep pengukuran and ketidakpastian, serta besaran and satuan dalam pengamatan fisis. Mereka dapat menganalisis gerak lurus, gerak melingkar, and gerak parabola dengan menggunakan vektor. Peserta didik juga mampu menerapkan hukum Newton and konsep usaha-energi dalam menyelesaikan masalah dinamika partikel.',
    'Kimia': 'Peserta didik mampu mendeskripsikan struktur atom and konfigurasi elektron untuk menentukan letak unsur dalam tabel periodik. Mereka dapat menganalisis proses pembentukan ikatan kimia (ion, kovalen) and hubungannya dengan sifat fisis senyawa. Peserta didik juga mampu menerapkan hukum-hukum dasar kimia dalam perhitungan stoikiometri.',
    'Biologi': 'Peserta didik memiliki kemampuan untuk dapat mengidentifikasi ruang lingkup Biologi, keanekaragaman hayati and klasifikasi makhluk hidup. Peserta didik juga memiliki kemampuan untuk memahami tentang virus and peranannya, struktur sel serta fungsi organel-organel di dalamnya, and transpor membran.',
    'Sosiologi': 'Peserta didik mampu memahami Sosiologi sebagai ilmu yang mengkaji masyarakat. Mereka dapat mengidentifikasi berbagai gejala sosial, realitas sosial, and masalah sosial dalam masyarakat. Peserta didik juga mampu menjelaskan fungsi sosiologi untuk mengkaji identitas diri, interaksi sosial, and pembentukan kelompok sosial.',
    'Ekonomi': 'Peserta didik memahami kelangkaan sebagai inti masalah ilmu ekonomi and mampu mengidentifikasi faktor-faktor penyebabnya. Mereka dapat menganalisis peran pelaku ekonomi dalam kegiatan ekonomi and menjelaskan model diagram interaksi antar pelaku ekonomi (circular flow diagram). Peserta didik juga mampu memahami konsep permintaan, penawaran, harga keseimbangan, and elastisitas.',
    'Geografi': 'Peserta didik mampu menjelaskan hakikat ilmu geografi, prinsip, konsep, and aspek geografi. Mereka dapat menganalisis dinamika planet Bumi sebagai ruang kehidupan, termasuk teori pembentukan Tata Surya and Jagat Raya. Peserta didik juga dapat menganalisis dinamika litosfer, pedosfer, atmosfer, hidrosfer, and biosfer serta dampaknya terhadap kehidupan.',
    'Koding dan Kecerdasan Artificial': 'Peserta didik mampu memahami konsep inti pemrograman terstruktur and berorientasi objek. Mereka dapat merancang and mengimplementasikan algoritma untuk menyelesaikan masalah komputasi menggunakan bahasa pemrograman tekstual. Peserta didik juga dapat menjelaskan konsep dasar Kecerdasan Artifisial (AI), machine learning, and dampaknya bagi masyarakat.',
};

const CP_FASE_F = { // Kelas 11-12 (SMA)
    ...buildAgamaCp(CP_AGAMA_F),
    'Pendidikan Pancasila': 'Peserta didik mampu menganalisis secara kritis dampak kemajuan ilmu pengetahuan and teknologi terhadap NKRI. Mereka dapat mengevaluasi praktik-praktik demokrasi, menganalisis potensi ancaman terhadap negara, and merumuskan strategi untuk mengatasinya dalam bingkai Bhinneka Tunggal Ika. Peserta didik aktif berpartisipasi dalam upaya-upaya pembangunan nasional.',
    'Bahasa Indonesia': 'Peserta didik mampu mengevaluasi and mengkreasi informasi berupa gagasan, pikiran, perasaan, pandangan, arahan atau pesan yang akurat dari menyimak berbagai tipe teks (nonfiksi and fiksi) dalam bentuk monolog, dialog, and gelar wicara. Peserta didik mampu menulis gagasan, pikiran, pandangan, arahan atau pesan tertulis untuk berbagai tujuan secara logis, kritis, and kreatif. Peserta didik mampu mengolah and menyajikan gagasan, pikiran, pandangan, arahan atau pesan dari berbagai tipe teks untuk berbagai tujuan secara logis, kritis, and kreatif dalam bentuk monolog, dialog, and gelar wicara.',
    'Matematika': 'Peserta didik dapat memodelkan masalah kontekstual menggunakan program linear. Mereka mampu menerapkan konsep matriks, transformasi geometri, serta menggunakan konsep limit fungsi aljabar and turunan untuk menyelesaikan masalah. Peserta didik juga dapat memahami konsep integral tak tentu and tentu fungsi aljabar.',
    'Matematika Tingkat Lanjut': 'Peserta didik mampu menganalisis sifat-sifat polinomial and melakukan operasi aljabar pada polinomial. Mereka dapat menggunakan konsep limit fungsi trigonometri and turunan fungsi trigonometri untuk menyelesaikan masalah. Peserta didik juga mampu memahami and menerapkan konsep statistik inferensial (distribusi normal, uji hipotesis).',
    'Bahasa Inggris': 'Peserta didik menggunakan bahasa Inggris untuk berkomunikasi dengan guru, teman sebaya and orang lain dalam berbagai macam situasi and tujuan. Mereka menggunakan and merespon pertanyaan and menggunakan strategi untuk memulai and mempertahankan percakapan and diskusi. Mereka memahami and mengidentifikasi gagasan utama and detail relevan dari diskusi atau presentasi mengenai topik yang dekat dengan kehidupan pemuda. Mereka menggunakan bahasa Inggris untuk menyampaikan opini terhadap isu yang dekat dengan kehidupan pemuda and untuk membahas minat.',
    'Pendidikan Jasmani, Olahraga, dan Kesehatan': 'Peserta didik mampu merancang, mengevaluasi, and memodifikasi strategi and taktik dalam berbagai aktivitas olahraga and permainan. Mereka dapat mengelola kegiatan olahraga sebagai sarana pengembangan diri and promosi gaya hidup sehat. Peserta didik juga mampu menganalisis and mengadvokasi isu-isu kesehatan global, serta memahami pentingnya kesehatan mental.',
    'Sejarah': 'Peserta didik mampu menganalisis and mengevaluasi peristiwa sejarah nasional and dunia secara kritis, dari masa kolonialisme, pergerakan nasional, kemerdekaan, hingga reformasi. Mereka dapat menghubungkan peristiwa sejarah dengan kehidupan masa kini and memproyeksikan tantangan masa depan. Peserta didik mampu melakukan penelitian sejarah sederhana and menyajikannya dalam bentuk tulisan atau media lain.',
    'Informatika': 'Peserta didik mampu mengembangkan solusi digital yang terintegrasi, mencakup analisis data, perancangan antarmuka pengguna, and pengembangan aplikasi. Mereka dapat berkolaborasi dalam proyek pengembangan perangkat lunak menggunakan metodologi yang relevan. Peserta didik juga memahami aspek hukum, etika, and sosial dari teknologi informasi and komunikasi, serta dampaknya terhadap masyarakat.',
    ...buildSeniCp('Peserta didik mampu melakukan kritik and kajian terhadap karya seni rupa, musik, tari, atau teater secara konseptual. Mereka dapat menciptakan karya seni yang inovatif and merefleksikan isu-isu sosial-budaya. Peserta didik mampu mengelola secara mandiri atau kolaboratif proyek pameran atau pertunjukan seni yang berdampak bagi komunitas.'),
    'Fisika': 'Peserta didik mampu menganalisis dinamika rotasi and kesetimbangan benda tegar. Mereka dapat menerapkan hukum-hukum termodinamika, konsep gelombang mekanik and elektromagnetik, serta teori relativitas khusus dalam penyelesaian masalah. Peserta didik juga mampu memahami konsep fisika kuantum and inti atom.',
    'Kimia': 'Peserta didik mampu menganalisis faktor-faktor yang mempengaruhi laju reaksi and kesetimbangan kimia. Mereka dapat memahami konsep larutan asam-basa, hidrolisis garam, and larutan penyangga. Peserta didik juga mampu menerapkan konsep termokimia, elektrokimia (sel Volta and elektrolisis), and memahami kimia unsur and senyawa organik.',
    'Biologi': 'Peserta didik mampu menganalisis keterkaitan antara struktur, fungsi, and proses yang terjadi pada sistem organ manusia (misalnya, sistem gerak, sirkulasi, respirasi, ekskresi, koordinasi, reproduksi). Mereka memahami konsep hereditas, evolusi, bioteknologi, and implikasinya. Peserta didik juga dapat menganalisis komponen ekosistem and interaksi yang terjadi di dalamnya.',
    'Sosiologi': 'Peserta didik mampu menganalisis diferensiasi sosial, stratifikasi sosial, konflik sosial, and mobilitas sosial dalam masyarakat. Mereka dapat melakukan penelitian sosial sederhana, mengolah data, and menyajikan hasilnya untuk memahami berbagai fenomena sosial serta memberikan rekomendasi solusi.',
    'Ekonomi': 'Peserta didik mampu menganalisis konsep pendapatan nasional, pertumbuhan and pembangunan ekonomi, serta permasalahan ketenagakerjaan. Mereka dapat memahami kebijakan moneter and fiskal, APBN/APBD, serta pasar modal and industri jasa keuangan. Peserta didik juga mampu menyusun siklus akuntansi perusahaan jasa and dagang.',
    'Geografi': 'Peserta didik mampu menganalisis ketahanan pangan, industri, and energi nasional. Mereka dapat mengevaluasi potensi and persebaran sumber daya alam Indonesia. Peserta didik mampu memahami konsep wilayah and perwilayahan, interaksi desa-kota, serta menganalisis pola keruangan negara maju and berkembang. Mereka juga dapat memanfaatkan peta and Sistem Informasi Geografis (SIG) for kajian pembangunan wilayah.',
    'Koding dan Kecerdasan Artificial': 'Peserta didik mampu mengembangkan proyek perangkat lunak skala kecil secara kolaboratif, menerapkan struktur data and algoritma yang efisien. Mereka dapat merancang, melatih, and mengevaluasi model machine learning sederhana for tugas-tugas seperti klasifikasi atau regresi. Peserta didik juga mampu menganalisis isu-isu etis and sosial terkait pengembangan and penerapan AI.',
};


// Mapping CP to Jenjang, Kelas, and Mata Pelajaran
export const CAPAIAN_PEMBELAJARAN_MAP: { [key: string]: { [key: string]: { [key: string]: string } } } = {
    SD: {
        '1': CP_FASE_A,
        '2': CP_FASE_A,
        '3': CP_FASE_B,
        '4': CP_FASE_B,
        '5': CP_FASE_C,
        '6': CP_FASE_C,
    },
    SMP: {
        '7': CP_FASE_D,
        '8': CP_FASE_D,
        '9': CP_FASE_D,
    },
    SMA: {
        '10': CP_FASE_E,
        '11': CP_FASE_F,
        '12': CP_FASE_F,
    }
};