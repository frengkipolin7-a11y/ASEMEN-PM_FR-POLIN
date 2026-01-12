import { GoogleGenAI, Type } from '@google/genai';
import type { FormData, GeneratedAssessment, PilihanGanda, PilihanGandaKompleks, IsianSingkat, UraianSingkat } from '../types';

// Function to generate schema dynamically based on requirements
const getAssessmentSchema = (useOptionE: boolean) => {
    const pilihanProperties: any = {
        A: { type: Type.STRING },
        B: { type: Type.STRING },
        C: { type: Type.STRING },
        D: { type: Type.STRING },
    };
    
    const requiredPilihan = ['A', 'B', 'C', 'D'];

    if (useOptionE) {
        pilihanProperties.E = { type: Type.STRING };
        requiredPilihan.push('E');
    }

    return {
        type: Type.OBJECT,
        properties: {
            kisiKisi: {
                type: Type.ARRAY,
                description: "Kisi-kisi soal yang menjelaskan setiap item asesmen.",
                items: {
                    type: Type.OBJECT,
                    properties: {
                        nomor: { type: Type.NUMBER, description: "Nomor urut kisi-kisi." },
                        tujuanPembelajaran: { type: Type.STRING, description: "Tujuan pembelajaran yang diukur oleh soal." },
                        indikatorPencapaianKompetensi: { type: Type.STRING, description: "Indikator spesifik yang dicapai melalui soal." },
                        levelKognitif: { type: Type.STRING, description: "Level kognitif Taksonomi Bloom (contoh: C2, C3, C4, C5, C6)." },
                        bentukSoal: { type: Type.STRING, description: "Bentuk soal (Pilihan Ganda, Pilihan Ganda Kompleks, Menjodohkan, Isian Singkat, Uraian Singkat)." },
                        nomorSoal: { type: Type.STRING, description: "Nomor soal yang sesuai pada naskah asesmen (cth: 'I.1', 'III', 'IV.1-5')." },
                    },
                    required: ['nomor', 'tujuanPembelajaran', 'indikatorPencapaianKompetensi', 'levelKognitif', 'bentukSoal', 'nomorSoal'],
                }
            },
            pilihanGanda: {
                type: Type.ARRAY,
                description: 'Daftar soal pilihan ganda.',
                items: {
                    type: Type.OBJECT,
                    properties: {
                        soal: { type: Type.STRING, description: 'Teks pertanyaan.' },
                        gambarDeskripsi: { type: Type.STRING, description: "Deskripsi detail untuk gambar yang relevan dengan soal, jika diperlukan. Contoh: 'Diagram sel hewan dengan bagian A, B, dan C ditunjuk.' Jika tidak ada gambar, kosongkan properti ini." },
                        pilihan: {
                            type: Type.OBJECT,
                            properties: pilihanProperties,
                            required: requiredPilihan,
                        },
                        jawaban: { type: Type.STRING, description: 'Kunci jawaban (contoh: "A").' },
                    },
                    required: ['soal', 'pilihan', 'jawaban'],
                },
            },
            pilihanGandaKompleks: {
                type: Type.ARRAY,
                description: 'Daftar soal pilihan ganda kompleks.',
                items: {
                    type: Type.OBJECT,
                    properties: {
                        soal: { type: Type.STRING, description: 'Teks pertanyaan.' },
                        gambarDeskripsi: { type: Type.STRING, description: "Deskripsi detail untuk gambar yang relevan dengan soal, jika diperlukan. Contoh: 'Peta buta Indonesia dengan nomor 1, 2, 3 menunjuk pada tiga pulau besar.' Jika tidak ada gambar, kosongkan properti ini." },
                        pilihan: {
                            type: Type.ARRAY,
                            description: 'Daftar opsi jawaban.',
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.STRING, description: 'Identifier unik untuk pilihan, cth: "A".' },
                                    teks: { type: Type.STRING, description: 'Teks pilihan jawaban.' },
                                },
                                required: ['id', 'teks'],
                            },
                        },
                        kunci: {
                            type: Type.ARRAY,
                            description: 'Daftar ID pilihan yang benar.',
                            items: { type: Type.STRING },
                        },
                    },
                    required: ['soal', 'pilihan', 'kunci'],
                },
            },
            menjodohkan: {
                type: Type.OBJECT,
                description: 'Satu set soal menjodohkan.',
                properties: {
                    kolomA: {
                        type: Type.ARRAY,
                        description: 'Kolom A: Daftar pernyataan/pertanyaan, diberi nomor.',
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                id: { type: Type.STRING, description: 'Nomor urut, cth: "1"' },
                                teks: { type: Type.STRING, description: 'Teks pernyataan.' },
                            },
                            required: ['id', 'teks'],
                        },
                    },
                    kolomB: {
                        type: Type.ARRAY,
                        description: 'Kolom B: Daftar pilihan jawaban, diberi huruf.',
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                id: { type: Type.STRING, description: 'Huruf, cth: "A"' },
                                teks: { type: Type.STRING, description: 'Teks jawaban.' },
                            },
                            required: ['id', 'teks'],
                        },
                    },
                    kunci: {
                        type: Type.ARRAY,
                        description: 'Daftar pasangan kunci jawaban yang benar.',
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                idA: { type: Type.STRING, description: 'ID dari kolom A, cth: "1"' },
                                idB: { type: Type.STRING, description: 'ID dari kolom B, cth: "A"' },
                            },
                            required: ['idA', 'idB'],
                        },
                    },
                },
                required: ['kolomA', 'kolomB', 'kunci'],
            },
            isianSingkat: {
                type: Type.ARRAY,
                description: 'Daftar soal isian singkat.',
                items: {
                    type: Type.OBJECT,
                    properties: {
                        soal: { type: Type.STRING, description: 'Teks pertanyaan.' },
                        gambarDeskripsi: { type: Type.STRING, description: "Deskripsi detail untuk gambar yang relevan dengan soal, jika diperlukan. Contoh: 'Grafik batang yang menunjukkan hasil panen padi dari tahun 2020-2024.' Jika tidak ada gambar, kosongkan properti ini." },
                        jawaban: { type: Type.STRING, description: 'Kunci jawaban yang pasti.' },
                    },
                    required: ['soal', 'jawaban'],
                },
            },
            uraianSingkat: {
                type: Type.ARRAY,
                description: 'Daftar soal uraian singkat.',
                items: {
                    type: Type.OBJECT,
                    properties: {
                        soal: { type: Type.STRING, description: 'Teks pertanyaan yang membutuhkan jawaban berupa penjelasan singkat.' },
                        gambarDeskripsi: { type: Type.STRING, description: "Deskripsi detail untuk gambar yang relevan dengan soal, jika diperlukan. Contoh: 'Skema proses fotosintesis.' Jika tidak ada gambar, kosongkan properti ini." },
                        jawaban: { type: Type.STRING, description: 'Kunci jawaban atau rubrik penilaian singkat yang menjelaskan poin-poin penting jawaban.' },
                    },
                    required: ['soal', 'jawaban'],
                },
            },
        },
        required: ['kisiKisi', 'pilihanGanda', 'pilihanGandaKompleks', 'menjodohkan', 'isianSingkat', 'uraianSingkat'],
    };
};

export const generateTujuanPembelajaran = async (ai: GoogleGenAI, capaianPembelajaran: string): Promise<string> => {
    const systemInstruction = `Anda adalah seorang ahli perancangan kurikulum dan pakar pedagogi di Indonesia. Tugas Anda adalah menganalisis Capaian Pembelajaran (CP) untuk suatu mata pelajaran, mengidentifikasi Elemen-elemennya, dan merumuskan Tujuan Pembelajaran (TP) yang komprehensif dan terstruktur.`;

    const prompt = `
Berdasarkan Capaian Pembelajaran (CP) berikut:
---
${capaianPembelajaran}
---

Lakukan analisis dan rumuskan Tujuan Pembelajaran (TP) dengan mengikuti langkah-langkah berikut:
1.  **Identifikasi Elemen:** Pertama, identifikasi elemen-elemen utama yang terkandung dalam CP tersebut (contoh: Bilangan, Aljabar, Pengukuran; Membaca dan Memirsa, Menulis; Sejarah, Geografi, dll.).
2.  **Analisis Kompetensi dan Konten:** Untuk setiap elemen, analisis semua kompetensi (kata kerja operasional) dan lingkup materi (konten) yang relevan.
3.  **Rumuskan TP Komprehensif:** Rumuskan Tujuan Pembelajaran (TP) untuk setiap elemen. **SANGAT PENTING:** Setiap TP harus dirumuskan dengan menggabungkan BEBERAPA kompetensi terkait ke dalam SATU kalimat yang utuh dan mencakup satu lingkup materi utama. Hindari membuat TP yang terlalu sempit (hanya satu kompetensi untuk satu konten). Buatlah TP yang padat dan kaya makna.
4.  **Format Output:** Sajikan hasilnya dengan format yang jelas. Setiap elemen ditulis dalam format tebal (bold), diikuti oleh daftar TP bernomor untuk elemen tersebut.

**Contoh output yang diharapkan (untuk mata pelajaran Matematika):**

**Bilangan:**
1. Menjelaskan, melakukan, dan membandingkan operasi penjumlahan, pengurangan, perkalian, dan pembagian bilangan cacah sampai 1.000, serta menggunakannya untuk menyelesaikan masalah kontekstual.
2. Mengidentifikasi, meniru, dan melanjutkan berbagai pola bilangan serta menggunakannya untuk membuat prediksi sederhana.

**Pengukuran:**
3. Mengenali, membandingkan, dan mengurutkan panjang, berat, dan waktu menggunakan satuan baku serta menyelesaikan masalah terkait dalam kehidupan sehari-hari.

Pastikan output HANYA berisi daftar Elemen dan Tujuan Pembelajaran sesuai format di atas. Jangan sertakan judul, pendahuluan, atau teks penutup.
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction,
        },
    });

    return response.text.trim();
};

export const generateMateriPelajaran = async (ai: GoogleGenAI, tujuanPembelajaran: string, mataPelajaran: string): Promise<string> => {
    const systemInstruction = `Anda adalah seorang guru ahli dan penulis materi pelajaran yang sangat berpengalaman. Tugas Anda adalah membuat ringkasan materi pelajaran yang padat, jelas, dan relevan berdasarkan daftar Tujuan Pembelajaran (TP) yang diberikan.`;

    const prompt = `
Berdasarkan daftar Tujuan Pembelajaran (TP) untuk mata pelajaran "${mataPelajaran}" berikut:
---
${tujuanPembelajaran}
---

Buatlah ringkasan materi pelajaran esensial yang mencakup semua konten yang diperlukan untuk mencapai TP tersebut.

Instruksi:
1.  **Fokus pada Esensi:** Rangkum hanya konsep-konsep, fakta, dan prinsip-prinsip kunci. Hindari penjelasan yang terlalu panjang atau contoh yang berlebihan.
2.  **Struktur yang Jelas:** Susun materi dalam poin-poin atau paragraf singkat yang terstruktur dengan baik. Gunakan sub-judul jika diperlukan untuk mengelompokkan materi yang serumpun.
3.  **Bahasa yang Sesuai:** Gunakan bahasa yang jelas, lugas, dan mudah dipahami sesuai dengan jenjang pendidikan target.

**Contoh output yang diharapkan (untuk mata pelajaran IPS):**

**A. Interaksi Sosial dan Lembaga Sosial**
-   **Pengertian Interaksi Sosial:** Proses hubungan timbal balik antar individu, individu dengan kelompok, atau antar kelompok. Syaratnya adalah kontak sosial dan komunikasi.
-   **Bentuk Interaksi:** Asosiatif (kerja sama, akomodasi, asimilasi) dan Disosiatif (persaingan, kontravensi, konflik).
-   **Lembaga Sosial:** Sistem norma untuk mencapai tujuan tertentu. Contoh: lembaga keluarga, pendidikan, ekonomi, agama, politik.

Pastikan output HANYA berisi ringkasan materi pelajaran. Jangan sertakan judul, pendahuluan, atau kalimat penutup.
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction,
        },
    });

    return response.text.trim();
};

async function generateImage(ai: GoogleGenAI, prompt: string, style: string, aspectRatio: string, additionalPrompt: string): Promise<string> {
    try {
        const fullPrompt = `Gaya: ${style}. ${additionalPrompt ? `Instruksi tambahan: ${additionalPrompt}. ` : ''}Buat gambar atau diagram yang jelas, akurat, dan sederhana untuk soal sekolah, berdasarkan deskripsi: "${prompt}". Pastikan gambar mudah dipahami, diberi label jika relevan, dan sangat sesuai untuk konteks pendidikan formal. Hindari detail yang tidak perlu atau latar belakang yang membingungkan.`;
        
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: fullPrompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: aspectRatio,
            },
        });
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;
    } catch (e) {
        console.error(`Gagal membuat gambar untuk prompt "${prompt}":`, e);
        return ''; 
    }
}

export const generateAssessment = async (ai: GoogleGenAI, data: FormData, setLoadingMessage: (msg: string) => void): Promise<GeneratedAssessment> => {
    // Determine option range based on user requirements:
    // 1. Kelas 1, 2, 3 SD: A-D
    // 2. Kelas 4-6 SD, SMP, SMA: A-E
    const isLowGradeSD = data.jenjang === 'SD' && ['1', '2', '3'].includes(data.kelas);
    const useOptionE = !isLowGradeSD;
    const optionCount = useOptionE ? 5 : 4;
    const optionLetters = useOptionE ? "(A, B, C, D, E)" : "(A, B, C, D)";
    const assessmentSchema = getAssessmentSchema(useOptionE);

    const systemInstruction = `Anda adalah seorang ahli dalam pembuatan kurikulum dan asesmen pendidikan di Indonesia yang berpedoman pada Taksonomi Bloom. Tugas Anda adalah membuat draf Asesmen Sumatif LENGKAP dengan KISI-KISI SOAL berdasarkan informasi yang diberikan. Anda harus menyesuaikan tingkat kesulitan soal (Level Kognitif) berdasarkan permintaan pengguna. Hasilkan output dalam format JSON yang valid sesuai dengan skema yang ditentukan. Pastikan semua teks dalam Bahasa Indonesia yang baik dan benar, dengan ejaan yang disempurnakan (EYD).`;
    
    const imageInstructionParts: string[] = [];
    if (data.imageGeneration.pg) {
        imageInstructionParts.push("Pilihan Ganda");
    }
    if (data.imageGeneration.pgKompleks) {
        imageInstructionParts.push("Pilihan Ganda Kompleks");
    }
    if (data.imageGeneration.isian) {
        imageInstructionParts.push("Isian Singkat");
    }
    if (data.imageGeneration.uraian) {
        imageInstructionParts.push("Uraian Singkat");
    }

    let imageInstruction = "Untuk SEMUA soal, JANGAN sertakan properti 'gambarDeskripsi'. Properti ini harus selalu DIHILANGKAN.";
    if (imageInstructionParts.length > 0) {
        const typesText = imageInstructionParts.join(', ');
        imageInstruction = `
- HANYA untuk beberapa soal dari jenis berikut: ${typesText}, JIKA relevan dan dapat meningkatkan kualitas soal (contoh: soal IPA butuh diagram, IPS butuh peta), tambahkan deskripsi untuk gambar.
- JANGAN membuat gambar, tetapi berikan deskripsi yang jelas dan detail dalam properti 'gambarDeskripsi' pada objek soal yang bersangkutan.
- Contoh deskripsi gambar yang baik: 'Diagram siklus air dengan panah yang menunjukkan proses evaporasi, kondensasi, dan presipitasi.', atau 'Peta buta benua Asia dengan nomor 1 menunjuk ke negara Jepang.'
- Untuk semua jenis soal LAINNYA yang tidak disebutkan di atas, JANGAN sertakan properti 'gambarDeskripsi' atau biarkan kosong.
        `;
    }

    const prompt = `
Berdasarkan data berikut:
- Jenjang: ${data.jenjang}
- Kelas: ${data.kelas}
- Semester: ${data.semester}
- Mata Pelajaran: ${data.mataPelajaran}
- Tingkat Kesulitan yang Diinginkan: ${data.tingkatKesulitan}
- Capaian Pembelajaran (CP): ${data.capaianPembelajaran}
- Tujuan Pembelajaran: ${data.tujuanPembelajaran}
- Materi Pelajaran: ${data.materiPelajaran}

Buatkan draf asesmen sumatif yang terdiri dari DUA bagian utama dalam format JSON: "kisiKisi" dan soal-soal ujian.

BAGIAN 1: KISI-KISI SOAL
- Buatlah kisi-kisi dalam bentuk array objek.
- Setiap objek dalam kisi-kisi harus mewakili satu atau sekelompok soal dan memuat: nomor urut kisi-kisi, Tujuan Pembelajaran yang relevan (pilih dan sesuaikan dari input yang diberikan), Indikator Pencapaian Kompetensi (IPK) yang spesifik yang Anda buat, Level Kognitif (sesuaikan dengan Tingkat Kesulitan), Bentuk Soal, dan Nomor Soal yang bersangkutan.
- Pastikan setiap soal yang Anda buat di Bagian 2 nanti terwakili dalam kisi-kisi ini.

BAGIAN 2: NASKAH SOAL
Buatlah soal-soal ujian dengan rincian berikut, sesuai dengan kisi-kisi yang telah Anda rancang:
1. ${data.jumlahPG} soal Pilihan Ganda. Setiap soal harus memiliki ${optionCount} opsi jawaban ${optionLetters} dan satu kunci jawaban yang benar.
2. ${data.jumlahPGKompleks} soal Pilihan Ganda Kompleks. Setiap soal harus memiliki 4-5 opsi dan bisa memiliki lebih dari satu jawaban yang benar. Cantumkan semua kunci jawaban yang benar.
3. Satu set soal Menjodohkan yang terdiri dari ${data.jumlahMenjodohkan} pasang. Buatlah kolom A (pernyataan) dan kolom B (jawaban). Cantumkan pasangan kunci jawabannya.
4. ${data.jumlahIsian} soal Isian Singkat. Buatlah soal dengan jawaban yang singkat, padat, dan pasti. Cantumkan kunci jawabannya.
5. ${data.jumlahUraian} soal Uraian Singkat. Buatlah soal yang membutuhkan jawaban berupa penjelasan singkat dan sertakan kunci jawaban atau rubrik penilaiannya.

PENTING - PENAMBAHAN GAMBAR:
${imageInstruction}

PERHATIAN PENTING:
- Sesuaikan tingkat kesulitan soal dengan permintaan **Tingkat Kesulitan yang Diinginkan**. 
  - Untuk 'Mudah', fokus pada level kognitif C2 (Memahami) dan C3 (Mengaplikasikan).
  - Untuk 'Sedang', buat campuran seimbang dari C3 (Mengaplikasikan) dan C4 (Menganalisis).
  - Untuk 'Sulit', dominasikan soal pada level C4 (Menganalisis), C5 (Mengevaluasi), dan C6 (Mencipta).
- Pastikan level kognitif yang Anda tulis di kisi-kisi sesuai dengan tingkat kesulitan soal yang dibuat.
- Semua soal harus relevan dan selaras dengan Tujuan Pembelajaran, Materi Pelajaran, dan Kisi-Kisi Soal.
`;
    setLoadingMessage('AI sedang membuat draf naskah & kisi-kisi...');
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: assessmentSchema,
        },
    });

    let assessment: GeneratedAssessment;
    try {
        const jsonText = response.text.trim();
        assessment = JSON.parse(jsonText) as GeneratedAssessment;
    } catch (e) {
        console.error("Failed to parse Gemini response:", response.text);
        throw new Error("Gagal mem-parsing respons dari AI. Coba lagi.");
    }
    
    setLoadingMessage('AI sedang membuat gambar & diagram relevan...');

    const imagePromises: Promise<void>[] = [];
    const itemsWithImageDescription: (PilihanGanda | PilihanGandaKompleks | IsianSingkat | UraianSingkat)[] = [];

    assessment.pilihanGanda.forEach(item => item.gambarDeskripsi && itemsWithImageDescription.push(item));
    assessment.pilihanGandaKompleks.forEach(item => item.gambarDeskripsi && itemsWithImageDescription.push(item));
    assessment.isianSingkat.forEach(item => item.gambarDeskripsi && itemsWithImageDescription.push(item));
    assessment.uraianSingkat.forEach(item => item.gambarDeskripsi && itemsWithImageDescription.push(item));

    if (itemsWithImageDescription.length > 0) {
       for (let i = 0; i < itemsWithImageDescription.length; i++) {
            const item = itemsWithImageDescription[i];
            setLoadingMessage(`AI membuat gambar (${i + 1}/${itemsWithImageDescription.length}): ${item.gambarDeskripsi!.substring(0, 30)}...`);
            const promise = generateImage(ai, item.gambarDeskripsi!, data.imageStyle, data.imageAspectRatio, data.imageAdditionalPrompt).then(dataUrl => {
                if (dataUrl) {
                    item.gambarDataUrl = dataUrl;
                }
            });
            imagePromises.push(promise);
        }
        await Promise.all(imagePromises);
    }

    return assessment;
};