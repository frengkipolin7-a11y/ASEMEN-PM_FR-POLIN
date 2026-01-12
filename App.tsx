import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { generateAssessment, generateTujuanPembelajaran, generateMateriPelajaran } from './services/geminiService';
import type { FormData, GeneratedAssessment } from './types';
import { JENJANG_OPTIONS, KELAS_OPTIONS, SEMESTER_OPTIONS, JUMLAH_SOAL_OPTIONS, FASE_MAP, MATA_PELAJARAN_OPTIONS, CAPAIAN_PEMBELAJARAN_MAP, TINGKAT_KESULITAN_OPTIONS, TANGGAL_OPTIONS, BULAN_OPTIONS, IMAGE_STYLE_OPTIONS, IMAGE_ASPECT_RATIO_OPTIONS } from './constants';
import Input from './components/Input';
import Select from './components/Select';
import Textarea from './components/Textarea';
import Button from './components/Button';
import AssessmentView from './components/AssessmentView';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
    const cpPlaceholder = 'Capaian Pembelajaran (CP) untuk pilihan ini belum tersedia dalam sistem. Silakan isi Tujuan dan Materi Pembelajaran secara manual.';
    
    const today = new Date();
    const [formData, setFormData] = useState<FormData>({
        namaSatuanPendidikan: '',
        namaGuru: '',
        nipGuru: '',
        namaKepalaSekolah: '',
        nipKepalaSekolah: '',
        tempat: '',
        tgl: String(today.getDate()),
        bln: today.toLocaleDateString('id-ID', { month: 'long' }),
        thn: String(today.getFullYear()),
        jenjang: 'SMP',
        kelas: '7',
        semester: 'Ganjil',
        mataPelajaran: MATA_PELAJARAN_OPTIONS['SMP']['7'][0],
        tingkatKesulitan: 'Sedang',
        capaianPembelajaran: '',
        tujuanPembelajaran: '',
        materiPelajaran: '',
        jumlahPG: 10,
        jumlahPGKompleks: 5,
        jumlahMenjodohkan: 5,
        jumlahIsian: 5,
        jumlahUraian: 5,
        imageStyle: IMAGE_STYLE_OPTIONS[0].value,
        imageAspectRatio: '1:1',
        imageAdditionalPrompt: '',
        imageGeneration: {
            pg: false,
            pgKompleks: false,
            isian: false,
            uraian: false,
        },
    });
    const [generatedAssessment, setGeneratedAssessment] = useState<GeneratedAssessment | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [isGeneratingTP, setIsGeneratingTP] = useState<boolean>(false);
    const [isGeneratingMateri, setIsGeneratingMateri] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const numericFields = ['jumlahPG', 'jumlahPGKompleks', 'jumlahMenjodohkan', 'jumlahIsian', 'jumlahUraian'];
        setFormData(prev => ({ 
            ...prev, 
            [name]: numericFields.includes(name) ? Number(value) : value 
        }));
    }, []);

    const handleImageGenChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            imageGeneration: {
                ...prev.imageGeneration,
                [name]: checked,
            },
        }));
    }, []);

    const handleJenjangChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newJenjang = e.target.value as 'SD' | 'SMP' | 'SMA';
        const newKelas = KELAS_OPTIONS[newJenjang][0].value;
        const newMataPelajaran = MATA_PELAJARAN_OPTIONS[newJenjang]?.[newKelas]?.[0] ?? '';
        setFormData(prev => ({
            ...prev,
            jenjang: newJenjang,
            kelas: newKelas,
            mataPelajaran: newMataPelajaran,
            tujuanPembelajaran: '', // Reset TP when jenjang changes
            materiPelajaran: '', // Reset Materi when jenjang changes
        }));
    }, []);

    const handleKelasChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newKelas = e.target.value;
        const newMataPelajaran = MATA_PELAJARAN_OPTIONS[formData.jenjang]?.[newKelas]?.[0] ?? '';
        setFormData(prev => ({
            ...prev,
            kelas: newKelas,
            mataPelajaran: newMataPelajaran,
            tujuanPembelajaran: '', // Reset TP when kelas changes
            materiPelajaran: '', // Reset Materi when kelas changes
        }));
    }, [formData.jenjang]);

    useEffect(() => {
        const cp = CAPAIAN_PEMBELAJARAN_MAP[formData.jenjang]?.[formData.kelas]?.[formData.mataPelajaran] ?? cpPlaceholder;
        setFormData(prev => ({ ...prev, capaianPembelajaran: cp, tujuanPembelajaran: '', materiPelajaran: '' }));
    }, [formData.jenjang, formData.kelas, formData.mataPelajaran]);


    const handleGenerateTP = async () => {
        if (!formData.capaianPembelajaran || formData.capaianPembelajaran === cpPlaceholder) {
            setError("Capaian Pembelajaran tidak tersedia untuk membuat Tujuan Pembelajaran.");
            return;
        }
        setIsGeneratingTP(true);
        setError(null);
        try {
            if (!process.env.API_KEY) {
                throw new Error("API key not configured.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const generatedTPs = await generateTujuanPembelajaran(ai, formData.capaianPembelajaran);
            setFormData(prev => ({ ...prev, tujuanPembelajaran: generatedTPs, materiPelajaran: '' })); // Reset materi
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Gagal membuat Tujuan Pembelajaran.');
        } finally {
            setIsGeneratingTP(false);
        }
    };

    const handleGenerateMateri = async () => {
        if (!formData.tujuanPembelajaran) {
            setError("Tujuan Pembelajaran harus diisi terlebih dahulu untuk membuat materi.");
            return;
        }
        setIsGeneratingMateri(true);
        setError(null);
        try {
            if (!process.env.API_KEY) {
                throw new Error("API key not configured.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const generatedMateri = await generateMateriPelajaran(ai, formData.tujuanPembelajaran, formData.mataPelajaran);
            setFormData(prev => ({ ...prev, materiPelajaran: generatedMateri }));
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Gagal membuat Materi Pelajaran.');
        } finally {
            setIsGeneratingMateri(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setGeneratedAssessment(null);

        try {
            if (!process.env.API_KEY) {
                throw new Error("API key is missing. Please set it in your environment variables.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const result = await generateAssessment(ai, formData, setLoadingMessage);
            setGeneratedAssessment(result);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    };

    const kelasOptions = useMemo(() => KELAS_OPTIONS[formData.jenjang], [formData.jenjang]);
    const fase = useMemo(() => FASE_MAP[formData.jenjang]?.[formData.kelas] ?? '', [formData.jenjang, formData.kelas]);
    const mataPelajaranOptions = useMemo(() => {
        const subjects = MATA_PELAJARAN_OPTIONS[formData.jenjang]?.[formData.kelas] ?? [];
        return subjects.map(subject => ({ value: subject, label: subject }));
    }, [formData.jenjang, formData.kelas]);

    const tpGenerationButton = (
        <button
            type="button"
            onClick={handleGenerateTP}
            disabled={isGeneratingTP || formData.capaianPembelajaran === cpPlaceholder}
            className="flex items-center px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        >
            {isGeneratingTP ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Menganalisis...</span>
                </>
            ) : (
                'Buat Otomatis dari CP'
            )}
        </button>
    );

    const materiGenerationButton = (
        <button
            type="button"
            onClick={handleGenerateMateri}
            disabled={isGeneratingMateri || !formData.tujuanPembelajaran}
            className="flex items-center px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        >
            {isGeneratingMateri ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Menganalisis...</span>
                </>
            ) : (
                'Buat Otomatis dari TP'
            )}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 tracking-tight">Asesmen Sumatif T/A Generator</h1>
                    <p className="mt-2 text-lg text-gray-600 max-w-2xl">Buat draf asesmen sumatif dengan cepat dan mudah menggunakan AI.</p>
                </div>
            </header>
            
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-6">
                            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Informasi Umum</h2>
                            <Input label="Nama Satuan Pendidikan" name="namaSatuanPendidikan" value={formData.namaSatuanPendidikan} onChange={handleInputChange} required />
                            <Input label="Nama Guru" name="namaGuru" value={formData.namaGuru} onChange={handleInputChange} required />
                            <Input label="NIP Guru" name="nipGuru" value={formData.nipGuru} onChange={handleInputChange} />
                            <Input label="Nama Kepala Sekolah" name="namaKepalaSekolah" value={formData.namaKepalaSekolah} onChange={handleInputChange} required />
                            <Input label="NIP Kepala Sekolah" name="nipKepalaSekolah" value={formData.nipKepalaSekolah} onChange={handleInputChange} />
                            <Input label="Tempat Dibuat" name="tempat" value={formData.tempat} onChange={handleInputChange} placeholder="cth: Jakarta" required />
                            <div className="grid grid-cols-3 gap-x-2">
                                <Select label="Tanggal" name="tgl" value={formData.tgl} onChange={handleInputChange} options={TANGGAL_OPTIONS} />
                                <Select label="Bulan" name="bln" value={formData.bln} onChange={handleInputChange} options={BULAN_OPTIONS} />
                                <Input label="Tahun" name="thn" type="number" value={formData.thn} onChange={handleInputChange} required />
                            </div>
                            
                            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 pt-4">Detail Asesmen</h2>
                            <Select label="Jenjang Pendidikan" name="jenjang" value={formData.jenjang} onChange={handleJenjangChange} options={JENJANG_OPTIONS} />
                            <div className="grid grid-cols-2 gap-4">
                                <Select label="Kelas" name="kelas" value={formData.kelas} onChange={handleKelasChange} options={kelasOptions} />
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fase</label>
                                    <div className="w-full px-3 py-2 border border-gray-200 bg-gray-100 rounded-md shadow-sm">
                                        <span className="font-medium text-gray-800">{fase}</span>
                                    </div>
                                </div>
                            </div>
                            <Select label="Semester" name="semester" value={formData.semester} onChange={handleInputChange} options={SEMESTER_OPTIONS} />
                            <Select label="Mata Pelajaran" name="mataPelajaran" value={formData.mataPelajaran} onChange={handleInputChange} options={mataPelajaranOptions} required />
                            <Select label="Tingkat Kesulitan" name="tingkatKesulitan" value={formData.tingkatKesulitan} onChange={handleInputChange} options={TINGKAT_KESULITAN_OPTIONS} />
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Capaian Pembelajaran (CP)</label>
                                <div className="w-full p-3 border border-gray-200 bg-gray-100 rounded-md shadow-sm min-h-[120px] text-sm text-gray-700 whitespace-pre-wrap">
                                    {formData.capaianPembelajaran}
                                </div>
                            </div>

                            <Textarea 
                                label="Tujuan Pembelajaran" 
                                name="tujuanPembelajaran" 
                                value={formData.tujuanPembelajaran} 
                                onChange={handleInputChange} 
                                required
                                placeholder="Klik 'Buat Otomatis dari CP' di atas atau isi manual tujuan pembelajaran yang akan diasesmen."
                                labelAddon={tpGenerationButton}
                            />
                            <Textarea 
                                label="Materi Pelajaran" 
                                name="materiPelajaran" 
                                value={formData.materiPelajaran} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="Klik 'Buat Otomatis dari TP' di atas atau isi manual ringkasan materi yang akan diasesmen."
                                labelAddon={materiGenerationButton}
                            />

                            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 pt-4">Jumlah Soal</h2>
                             <div className="grid grid-cols-2 gap-4">
                                <Select label="Pilihan Ganda" name="jumlahPG" value={String(formData.jumlahPG)} onChange={handleInputChange} options={JUMLAH_SOAL_OPTIONS} />
                                <Select label="PG Kompleks" name="jumlahPGKompleks" value={String(formData.jumlahPGKompleks)} onChange={handleInputChange} options={JUMLAH_SOAL_OPTIONS} />
                                <Select label="Menjodohkan" name="jumlahMenjodohkan" value={String(formData.jumlahMenjodohkan)} onChange={handleInputChange} options={JUMLAH_SOAL_OPTIONS} />
                                <Select label="Isian Singkat" name="jumlahIsian" value={String(formData.jumlahIsian)} onChange={handleInputChange} options={JUMLAH_SOAL_OPTIONS} />
                                <Select label="Uraian Singkat" name="jumlahUraian" value={String(formData.jumlahUraian)} onChange={handleInputChange} options={JUMLAH_SOAL_OPTIONS} />
                            </div>

                            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 pt-4">Opsi Gambar (Opsional)</h2>
                            <div className="space-y-4 rounded-md border border-gray-200 bg-gray-50 p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Select label="Gaya Gambar" name="imageStyle" value={formData.imageStyle} onChange={handleInputChange} options={IMAGE_STYLE_OPTIONS} />
                                    <Select label="Rasio Aspek" name="imageAspectRatio" value={formData.imageAspectRatio} onChange={handleInputChange} options={IMAGE_ASPECT_RATIO_OPTIONS} />
                                </div>
                                <Input 
                                    label="Instruksi Tambahan Gambar (Opsional)" 
                                    name="imageAdditionalPrompt" 
                                    value={formData.imageAdditionalPrompt} 
                                    onChange={handleInputChange} 
                                    placeholder="Cth: Gunakan warna cerah, gaya kartun, tanpa teks latar." 
                                />
                                
                                <div className="space-y-3 pt-2">
                                    <p className="text-xs text-gray-600 -mt-1 mb-3 font-medium">Aktifkan gambar untuk jenis soal:</p>
                                    
                                    <div className="relative flex items-start">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="pg"
                                                name="pg"
                                                type="checkbox"
                                                checked={formData.imageGeneration.pg}
                                                onChange={handleImageGenChange}
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm leading-6">
                                            <label htmlFor="pg" className="font-medium text-gray-900">Pilihan Ganda</label>
                                        </div>
                                    </div>

                                    <div className="relative flex items-start">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="pgKompleks"
                                                name="pgKompleks"
                                                type="checkbox"
                                                checked={formData.imageGeneration.pgKompleks}
                                                onChange={handleImageGenChange}
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm leading-6">
                                            <label htmlFor="pgKompleks" className="font-medium text-gray-900">Pilihan Ganda Kompleks</label>
                                        </div>
                                    </div>

                                    <div className="relative flex items-start">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="isian"
                                                name="isian"
                                                type="checkbox"
                                                checked={formData.imageGeneration.isian}
                                                onChange={handleImageGenChange}
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm leading-6">
                                            <label htmlFor="isian" className="font-medium text-gray-900">Isian Singkat</label>
                                        </div>
                                    </div>

                                    <div className="relative flex items-start">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="uraian"
                                                name="uraian"
                                                type="checkbox"
                                                checked={formData.imageGeneration.uraian}
                                                onChange={handleImageGenChange}
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm leading-6">
                                            <label htmlFor="uraian" className="font-medium text-gray-900">Uraian Singkat</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Memproses...' : 'Buat Asesmen'}
                            </Button>
                        </form>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-xl shadow-lg min-h-full">
                            {isLoading && <LoadingSpinner message={loadingMessage} />}
                            {error && <div className="text-red-500 bg-red-100 p-4 rounded-md">Error: {error}</div>}
                            {generatedAssessment ? (
                                <AssessmentView formData={formData} assessment={generatedAssessment} fase={fase} />
                            ) : (
                                !isLoading && (
                                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        <h3 className="text-lg font-semibold">Hasil Asesmen Akan Muncul di Sini</h3>
                                        <p className="max-w-md mt-1">Lengkapi formulir di sebelah kiri dan klik "Buat Asesmen" untuk memulai.</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;