export interface FormData {
    namaSatuanPendidikan: string;
    namaGuru: string;
    nipGuru: string;
    namaKepalaSekolah: string;
    nipKepalaSekolah: string;
    tempat: string;
    tgl: string;
    bln: string;
    thn: string;
    jenjang: 'SD' | 'SMP' | 'SMA';
    kelas: string;
    semester: 'Ganjil' | 'Genap';
    mataPelajaran: string;
    tingkatKesulitan: 'Mudah' | 'Sedang' | 'Sulit';
    capaianPembelajaran: string;
    tujuanPembelajaran: string;
    materiPelajaran: string;
    jumlahPG: number;
    jumlahPGKompleks: number;
    jumlahMenjodohkan: number;
    jumlahIsian: number;
    jumlahUraian: number;
    imageStyle: string;
    imageAspectRatio: string;
    imageAdditionalPrompt: string;
    imageGeneration: {
        pg: boolean;
        pgKompleks: boolean;
        isian: boolean;
        uraian: boolean;
    };
}

export interface PilihanGanda {
    soal: string;
    gambarDeskripsi?: string;
    gambarDataUrl?: string;
    pilihan: {
        A: string;
        B: string;
        C: string;
        D: string;
        E?: string;
    };
    jawaban: string;
}

export interface PilihanGandaKompleks {
    soal: string;
    gambarDeskripsi?: string;
    gambarDataUrl?: string;
    pilihan: { id: string; teks: string }[];
    kunci: string[];
}

export interface MenjodohkanItem {
    id: string;
    teks: string;
}

export interface KunciMenjodohkan {
    idA: string;
    idB: string;
}

export interface Menjodohkan {
    kolomA: MenjodohkanItem[];
    kolomB: MenjodohkanItem[];
    kunci: KunciMenjodohkan[];
}

export interface IsianSingkat {
    soal: string;
    gambarDeskripsi?: string;
    gambarDataUrl?: string;
    jawaban: string;
}

export interface UraianSingkat {
    soal: string;
    gambarDeskripsi?: string;
    gambarDataUrl?: string;
    jawaban: string; // Kunci jawaban atau rubrik singkat
}

export interface KisiKisiItem {
    nomor: number;
    tujuanPembelajaran: string;
    indikatorPencapaianKompetensi: string;
    levelKognitif: string;
    bentukSoal: string;
    nomorSoal: string;
}

export interface GeneratedAssessment {
    kisiKisi: KisiKisiItem[];
    pilihanGanda: PilihanGanda[];
    pilihanGandaKompleks: PilihanGandaKompleks[];
    menjodohkan: Menjodohkan;
    isianSingkat: IsianSingkat[];
    uraianSingkat: UraianSingkat[];
}