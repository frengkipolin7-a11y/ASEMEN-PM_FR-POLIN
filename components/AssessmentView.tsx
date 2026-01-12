import React, { useState, useEffect } from 'react';
import type { FormData, GeneratedAssessment } from '../types';

// Deklarasi global untuk html2pdf agar TypeScript tidak error
declare global {
    interface Window {
        html2pdf: any;
    }
}

type ActiveTab = 'kisiKisi' | 'naskahSoal';

const ImagePlaceholder: React.FC<{ description: string }> = ({ description }) => (
    <div 
        className="image-placeholder my-3 p-3 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 text-center text-gray-500"
        style={{ width: '100%', maxWidth: '10cm', height: 'auto', minHeight: '4cm', margin: '10px auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        <p className="text-xs italic">
            <strong className="font-bold">[Gagal memuat]</strong> {description}
        </p>
    </div>
);

const GeneratedImage: React.FC<{ dataUrl: string; description: string; aspectRatio: string }> = ({ dataUrl, description, aspectRatio }) => {
    // Determine style based on aspect ratio
    let width = '6cm';
    let height = '6cm';

    switch (aspectRatio) {
        case '16:9':
            width = '10cm';
            height = '5.625cm';
            break;
        case '9:16':
            width = '5cm';
            height = '8.88cm';
            break;
        case '4:3':
            width = '8cm';
            height = '6cm';
            break;
        case '3:4':
            width = '6cm';
            height = '8cm';
            break;
        case '1:1':
        default:
            width = '6cm';
            height = '6cm';
            break;
    }

    return (
        <div className="my-3" style={{ margin: '12px 0', textAlign: 'center' }}>
            <img 
                src={dataUrl} 
                alt={description} 
                style={{ 
                    width: width, 
                    height: height, 
                    display: 'inline-block', 
                    border: '1px solid #ccc', 
                    objectFit: 'contain' 
                }}
                className="rounded-md shadow-sm mb-1"
            />
        </div>
    );
};

interface AssessmentViewProps {
    formData: FormData;
    assessment: GeneratedAssessment;
    fase: string;
}

const WordIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6C4.897 2 4 2.897 4 4v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V8l-6-6zm-2 16h-2v-5h2v5zm4 0h-2v-5a2 2 0 00-2-2h-2a2 2 0 00-2 2v5H6v-5c0-2.206 1.794-4 4-4s4 1.794 4 4v5zm-4-8H8v-2h4v2zM14 3.414L18.586 8H14V3.414z"/></svg>
);

const PdfIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.47 18H8.5v-5h.97a1.53 1.53 0 0 1 1.53 1.53v1.94A1.53 1.53 0 0 1 9.47 18zm3.03-5h-1.5v5h1.5a2.5 2.5 0 0 0 0-5zm3.5 0h-1.5v5h1.5a2.5 2.5 0 0 0 0-5zm-3.03 1.5h-.75v2h.75a.75.75 0 0 0 0-1.5zm3.5 1.5h-.75v2h.75a.75.75 0 0 0 0-1.5zM14 9h4l-4-4v4z"/></svg>
);

const TabButton: React.FC<{ tabName: ActiveTab; label: string; activeTab: ActiveTab; setActiveTab: (tab: ActiveTab) => void }> = ({ tabName, label, activeTab, setActiveTab }) => (
    <button
        onClick={() => setActiveTab(tabName)}
        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-150 ease-in-out ${
            activeTab === tabName
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
    >
        {label}
    </button>
);

const AssessmentView: React.FC<AssessmentViewProps> = ({ formData, assessment, fase }) => {
    const [showAnswers, setShowAnswers] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [activeTab, setActiveTab] = useState<ActiveTab>('naskahSoal');

    // Sembunyikan kunci jawaban secara otomatis saat beralih ke tab kisi-kisi
    useEffect(() => {
        if (activeTab === 'kisiKisi') {
            setShowAnswers(false);
        }
    }, [activeTab]);

    const handleDownload = (format: 'pdf' | 'word') => {
        setIsDownloading(true);
        const contentId = activeTab === 'kisiKisi' ? 'kisi-kisi-content' : 'naskah-soal-content';
        const fileNamePrefix = activeTab === 'kisiKisi' ? 'Kisi-Kisi' : 'Naskah_Soal';
        const fileName = `${fileNamePrefix}_${formData.mataPelajaran.replace(/\s/g, '_')}_Kelas_${formData.kelas}`;
        
        const element = document.getElementById(contentId);
        if (!element) {
            setIsDownloading(false);
            console.error("Download element not found.");
            return;
        };

        if (format === 'pdf') {
            const opt = {
              margin:       [15, 15, 15, 15], // margin in mm
              filename:     `${fileName}.pdf`,
              image:        { type: 'jpeg', quality: 0.98 },
              html2canvas:  { scale: 2, useCORS: true, logging: false },
              // Set to F4 size: 215mm x 330mm
              jsPDF:        { unit: 'mm', format: [215, 330], orientation: 'portrait' }
            };
            if (window.html2pdf) {
                window.html2pdf().set(opt).from(element).save().finally(() => setIsDownloading(false));
            } else {
                alert("Library html2pdf belum dimuat.");
                setIsDownloading(false);
            }
        } else { // word
            const clonedElement = element.cloneNode(true) as HTMLElement;
            const formattedDate = `${formData.tgl} ${formData.bln} ${formData.thn}`;

            // Replace flexbox signature with a table for Word compatibility
            const signatureBlock = clonedElement.querySelector('.signature-block');
            if (signatureBlock) {
                const signatureTableHTML = `
                    <table style="width: 100%; border: none; margin-top: 50px; font-family: 'Book Antiqua', Palatino, serif; font-size: 12pt; page-break-inside: avoid;">
                        <tbody>
                            <tr>
                                <td style="border: none; text-align: center; width: 50%; vertical-align: top;">
                                    <p style="margin:0;">Mengetahui,</p>
                                    <p style="margin:0;">Kepala Sekolah</p>
                                    <br/><br/><br/><br/>
                                    <p style="margin:0; font-weight: bold; text-decoration: underline;">${formData.namaKepalaSekolah}</p>
                                    <p style="margin:0;">NIP. ${formData.nipKepalaSekolah || '-'}</p>
                                </td>
                                <td style="border: none; text-align: center; width: 50%; vertical-align: top;">
                                    <p style="margin:0;">${formData.tempat}, ${formattedDate}</p>
                                    <p style="margin:0;">Guru Mata Pelajaran</p>
                                    <br/><br/><br/><br/>
                                    <p style="margin:0; font-weight: bold; text-decoration: underline;">${formData.namaGuru}</p>
                                    <p style="margin:0;">NIP. ${formData.nipGuru || '-'}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                `;
                signatureBlock.outerHTML = signatureTableHTML;
            }

            const staticCss = `
                <style>
                    @page {
                        size: 215mm 330mm; /* Ukuran F4 */
                        margin: 20mm;
                    }
                    body { 
                        font-family: 'Book Antiqua', Palatino, serif; 
                        font-size: 12pt; 
                        line-height: 1.4; 
                        color: #000;
                    }
                    h3, h4, h5, h6 { font-weight: bold; color: #000; font-family: 'Book Antiqua', Palatino, serif; }
                    h3 { font-size: 14pt; text-align: center; text-transform: uppercase; margin: 5px 0; }
                    h4 { font-size: 12pt; text-transform: uppercase; margin-top: 15px; margin-bottom: 10px; }
                    h5 { font-size: 12pt; margin-top: 10px; margin-bottom: 5px; }
                    p { margin: 0 0 5px 0; }
                    ol { padding-left: 25px; margin: 0; }
                    li { margin-bottom: 10px; text-align: justify; }
                    
                    /* Image styling for Word */
                    img { 
                        object-fit: contain;
                        display: block; 
                        margin-left: auto; 
                        margin-right: auto; 
                        margin-top: 10px; 
                        margin-bottom: 10px; 
                        border: 1px solid #000; 
                    }
                    
                    /* Autofit Table */
                    table { border-collapse: collapse; width: 100%; table-layout: auto; font-size: 12pt; font-family: 'Book Antiqua', Palatino, serif; }
                    th, td { border: 1px solid black; padding: 4px; text-align: left; vertical-align: top; word-wrap: break-word; }
                    th { background-color: #F3F4F6; text-align: center; font-weight: bold;}
                    
                    .text-center { text-align: center; }
                    .text-justify { text-align: justify; }
                    .font-bold { font-weight: bold; }
                    .uppercase { text-transform: uppercase; }
                    .italic { font-style: italic; }
                    .underline { text-decoration: underline; }
                    
                    /* Kelas khusus untuk Word agar layout vertikal terjaga */
                    .question-text { margin-bottom: 8px; display: block; }
                    
                    /* Tabel Identitas tanpa border */
                    table.no-border { border: none; width: 100%; }
                    table.no-border td { border: none; padding: 2px; }
                </style>
            `;
            const htmlContent = clonedElement.innerHTML;
            const sourceHTML = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset="UTF-8">${staticCss}</head><body>${htmlContent}</body></html>
            `;
            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
            const fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = `${fileName}.doc`;
            fileDownload.click();
            document.body.removeChild(fileDownload);
            setIsDownloading(false);
        }
    };
    
    const formattedDate = `${formData.tgl} ${formData.bln} ${formData.thn}`;

    const renderNaskahSoal = () => {
        let sectionCounter = 0;
        const roman = ['I', 'II', 'III', 'IV', 'V'];

        const hasPG = assessment.pilihanGanda && assessment.pilihanGanda.length > 0;
        const hasPGK = assessment.pilihanGandaKompleks && assessment.pilihanGandaKompleks.length > 0;
        const hasMenjodohkan = assessment.menjodohkan && assessment.menjodohkan.kolomA.length > 0;
        const hasIsian = assessment.isianSingkat && assessment.isianSingkat.length > 0;
        const hasUraian = assessment.uraianSingkat && assessment.uraianSingkat.length > 0;

        // Hitung Start Number untuk setiap bagian agar continue (urutan global)
        const countPG = assessment.pilihanGanda.length;
        const countPGK = assessment.pilihanGandaKompleks.length;
        const countMatch = assessment.menjodohkan.kolomA.length;
        const countIsian = assessment.isianSingkat.length;

        const startPG = 1;
        const startPGK = startPG + countPG;
        const startMatch = startPGK + countPGK;
        const startIsian = startMatch + countMatch;
        const startUraian = startIsian + countIsian;

        // Style font utama untuk preview agar mirip hasil print
        const mainStyle = {
            fontFamily: '"Book Antiqua", Palatino, serif',
            fontSize: '12pt',
            lineHeight: '1.4',
            color: '#000'
        };

        return (
            <div id="naskah-soal-content" className="space-y-6 max-w-none bg-white p-4" style={mainStyle}>
                <header className="text-center mb-6" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '14pt', fontWeight: 'bold', textTransform: 'uppercase', margin: '5px 0', fontFamily: '"Book Antiqua", Palatino, serif' }}>Asesmen Sumatif {formData.semester}</h3>
                    <h3 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', margin: '5px 0', fontFamily: '"Book Antiqua", Palatino, serif' }}>{formData.namaSatuanPendidikan}</h3>
                    <h3 style={{ fontSize: '12pt', textTransform: 'uppercase', margin: '5px 0', fontFamily: '"Book Antiqua", Palatino, serif' }}>Mata Pelajaran: {formData.mataPelajaran}</h3>
                </header>
                
                <section>
                    <h4 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', fontFamily: '"Book Antiqua", Palatino, serif' }}>A. Identitas</h4>
                    <table className="no-border" style={{ width: '100%', borderCollapse: 'collapse', border: 'none', fontSize: '12pt', fontFamily: '"Book Antiqua", Palatino, serif' }}>
                        <tbody>
                            <tr style={{ verticalAlign: 'top' }}>
                                <td style={{ border: 'none', width: '25%', padding: '2px' }}><strong>Nama Satuan Pendidikan</strong></td>
                                <td style={{ border: 'none', width: '2%', padding: '2px' }}>:</td>
                                <td style={{ border: 'none', padding: '2px' }}>{formData.namaSatuanPendidikan}</td>
                            </tr>
                            <tr style={{ verticalAlign: 'top' }}>
                                <td style={{ border: 'none', padding: '2px' }}><strong>Nama Guru</strong></td>
                                <td style={{ border: 'none', padding: '2px' }}>:</td>
                                <td style={{ border: 'none', padding: '2px' }}>{formData.namaGuru}</td>
                            </tr>
                             <tr style={{ verticalAlign: 'top' }}>
                                <td style={{ border: 'none', padding: '2px' }}><strong>NIP</strong></td>
                                <td style={{ border: 'none', padding: '2px' }}>:</td>
                                <td style={{ border: 'none', padding: '2px' }}>{formData.nipGuru || '-'}</td>
                            </tr>
                            <tr style={{ verticalAlign: 'top' }}>
                                <td style={{ border: 'none', padding: '2px' }}><strong>Kelas/Fase/Semester</strong></td>
                                <td style={{ border: 'none', padding: '2px' }}>:</td>
                                <td style={{ border: 'none', padding: '2px' }}>{formData.kelas} / {fase} / {formData.semester}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                
                <section style={{ marginTop: '20px' }}>
                    <h4 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '15px', fontFamily: '"Book Antiqua", Palatino, serif' }}>B. Naskah Soal</h4>
                    
                    {hasPG && (
                        <div>
                            <h5 style={{ fontSize: '12pt', fontWeight: 'bold', marginTop: '15px', fontFamily: '"Book Antiqua", Palatino, serif' }}>{roman[sectionCounter++]}. Pilihan Ganda</h5>
                            <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>Pilihlah satu jawaban yang paling tepat!</p>
                            <ol start={startPG} style={{ paddingLeft: '25px', margin: '0' }}>
                                {assessment.pilihanGanda.map((item, index) => {
                                    return (
                                        <li key={index} style={{ marginBottom: '15px', textAlign: 'justify' }}>
                                            {item.gambarDataUrl ? <GeneratedImage dataUrl={item.gambarDataUrl} description={item.gambarDeskripsi || 'Gambar Soal'} aspectRatio={formData.imageAspectRatio} /> : item.gambarDeskripsi ? <ImagePlaceholder description={item.gambarDeskripsi} /> : null}
                                            <div className="question-text" dangerouslySetInnerHTML={{ __html: item.soal }} style={{ marginBottom: '8px', display: 'block' }}></div>
                                            {/* Gunakan div untuk memastikan setiap opsi turun ke bawah (block level) */}
                                            <div style={{ display: 'block', marginLeft: '10px' }}>
                                                <div style={{ marginBottom: '4px' }}>A. {item.pilihan.A}</div>
                                                <div style={{ marginBottom: '4px' }}>B. {item.pilihan.B}</div>
                                                <div style={{ marginBottom: '4px' }}>C. {item.pilihan.C}</div>
                                                <div style={{ marginBottom: '4px' }}>D. {item.pilihan.D}</div>
                                                {item.pilihan.E && <div style={{ marginBottom: '4px' }}>E. {item.pilihan.E}</div>}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    )}

                    {hasPGK && (
                        <div style={{ marginTop: '20px' }}>
                            <h5 style={{ fontSize: '12pt', fontWeight: 'bold', fontFamily: '"Book Antiqua", Palatino, serif' }}>{roman[sectionCounter++]}. Pilihan Ganda Kompleks</h5>
                            <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>Pilihlah lebih dari satu jawaban yang benar!</p>
                            <ol start={startPGK} style={{ paddingLeft: '25px', margin: '0' }}>
                                {assessment.pilihanGandaKompleks.map((item, index) => {
                                    return (
                                        <li key={index} style={{ marginBottom: '15px', textAlign: 'justify' }}>
                                            {item.gambarDataUrl ? <GeneratedImage dataUrl={item.gambarDataUrl} description={item.gambarDeskripsi || 'Gambar Soal'} aspectRatio={formData.imageAspectRatio} /> : item.gambarDeskripsi ? <ImagePlaceholder description={item.gambarDeskripsi} /> : null}
                                            <div className="question-text" dangerouslySetInnerHTML={{ __html: item.soal }} style={{ marginBottom: '8px', display: 'block' }}></div>
                                            
                                            {/* Menggunakan Tabel untuk Layout Opsi agar kompatibel dengan Word */}
                                            <table style={{ width: '100%', border: 'none', borderCollapse: 'collapse', fontFamily: '"Book Antiqua", Palatino, serif', fontSize: '12pt' }}>
                                                <tbody>
                                                    {item.pilihan.map(p => (
                                                        <tr key={p.id}>
                                                            <td style={{ width: '25px', verticalAlign: 'top', paddingBottom: '4px', border: 'none' }}>
                                                                <span style={{
                                                                    display: 'inline-block',
                                                                    width: '14px',
                                                                    height: '14px',
                                                                    border: '1px solid #000',
                                                                    marginRight: '5px',
                                                                    backgroundColor: '#fff'
                                                                }}>&nbsp;</span>
                                                            </td>
                                                            <td style={{ verticalAlign: 'top', paddingBottom: '4px', border: 'none' }}>
                                                                {p.teks}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    )}
                    
                    {hasMenjodohkan && (
                        <div style={{ marginTop: '20px', pageBreakInside: 'avoid' }}>
                            <h5 style={{ fontSize: '12pt', fontWeight: 'bold', fontFamily: '"Book Antiqua", Palatino, serif' }}>{roman[sectionCounter++]}. Menjodohkan</h5>
                            <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>Jodohkan pernyataan di kolom A dengan jawaban yang sesuai di kolom B!</p>
                            
                            <table style={{ width: '100%', border: 'none', borderCollapse: 'collapse', marginTop: '10px', fontFamily: '"Book Antiqua", Palatino, serif' }}>
                                <tbody>
                                    <tr>
                                        {/* KOLOM A */}
                                        <td style={{ width: '48%', verticalAlign: 'top', paddingRight: '5px', border: 'none' }}>
                                            <h6 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '5px', fontFamily: '"Book Antiqua", Palatino, serif', fontSize: '12pt' }}>Kolom A</h6>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black', fontFamily: '"Book Antiqua", Palatino, serif', fontSize: '12pt' }}>
                                                <tbody>
                                                    {assessment.menjodohkan.kolomA.map((item, index) => {
                                                        return (
                                                            <tr key={item.id}>
                                                                <td style={{ border: '1px solid black', padding: '5px', width: '35px', textAlign: 'center', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{startMatch + index}.</td>
                                                                <td style={{ border: '1px solid black', padding: '5px', textAlign: 'justify', verticalAlign: 'top' }}>{item.teks}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </td>

                                        {/* SPACER */}
                                        <td style={{ width: '4%', border: 'none' }}></td>

                                        {/* KOLOM B */}
                                        <td style={{ width: '48%', verticalAlign: 'top', paddingLeft: '5px', border: 'none' }}>
                                            <h6 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '5px', fontFamily: '"Book Antiqua", Palatino, serif', fontSize: '12pt' }}>Kolom B</h6>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black', fontFamily: '"Book Antiqua", Palatino, serif', fontSize: '12pt' }}>
                                                <tbody>
                                                    {assessment.menjodohkan.kolomB.map(item => (
                                                        <tr key={item.id}>
                                                            <td style={{ border: '1px solid black', padding: '5px', width: '35px', textAlign: 'center', verticalAlign: 'top' }}>{item.id}.</td>
                                                            <td style={{ border: '1px solid black', padding: '5px', textAlign: 'justify', verticalAlign: 'top' }}>{item.teks}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {hasIsian && (
                        <div style={{ marginTop: '20px' }}>
                            <h5 style={{ fontSize: '12pt', fontWeight: 'bold', fontFamily: '"Book Antiqua", Palatino, serif' }}>{roman[sectionCounter++]}. Isian Singkat</h5>
                            <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>Isilah titik-titik di bawah ini dengan jawaban yang tepat!</p>
                            <ol start={startIsian} style={{ paddingLeft: '25px', margin: '0' }}>
                                {assessment.isianSingkat.map((item, index) => {
                                    return (
                                        <li key={index} style={{ marginBottom: '15px', textAlign: 'justify' }}>
                                            {item.gambarDataUrl ? <GeneratedImage dataUrl={item.gambarDataUrl} description={item.gambarDeskripsi || 'Gambar Soal'} aspectRatio={formData.imageAspectRatio} /> : item.gambarDeskripsi ? <ImagePlaceholder description={item.gambarDeskripsi} /> : null}
                                            <span dangerouslySetInnerHTML={{ __html: item.soal }}></span>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    )}

                    {hasUraian && (
                        <div style={{ marginTop: '20px' }}>
                            <h5 style={{ fontSize: '12pt', fontWeight: 'bold', fontFamily: '"Book Antiqua", Palatino, serif' }}>{roman[sectionCounter++]}. Uraian Singkat</h5>
                            <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>Jawablah pertanyaan-pertanyaan di bawah ini dengan jelas dan singkat!</p>
                            <ol start={startUraian} style={{ paddingLeft: '25px', margin: '0' }}>
                                {assessment.uraianSingkat.map((item, index) => {
                                    return (
                                        <li key={index} style={{ marginBottom: '15px', textAlign: 'justify' }}>
                                            {item.gambarDataUrl ? <GeneratedImage dataUrl={item.gambarDataUrl} description={item.gambarDeskripsi || 'Gambar Soal'} aspectRatio={formData.imageAspectRatio} /> : item.gambarDeskripsi ? <ImagePlaceholder description={item.gambarDeskripsi} /> : null}
                                            <span dangerouslySetInnerHTML={{ __html: item.soal }}></span>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    )}
                </section>
                
                {showAnswers && (
                    <section style={{ marginTop: '30px', padding: '20px', border: '1px solid #bbf7d0', backgroundColor: '#f0fdf4', borderRadius: '8px', pageBreakInside: 'avoid', fontFamily: '"Book Antiqua", Palatino, serif' }}>
                        <h4 style={{ fontSize: '14pt', fontWeight: 'bold', color: '#166534', marginBottom: '15px', fontFamily: '"Book Antiqua", Palatino, serif' }}>Kunci Jawaban</h4>
                        {(() => {
                            let sectionIdx = 0;
                            return (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {hasPG && (
                                        <div>
                                            <h5 style={{ fontWeight: 'bold', color: '#15803d', fontFamily: '"Book Antiqua", Palatino, serif' }}>{roman[sectionIdx++]}. Pilihan Ganda</h5>
                                            <ol start={startPG} style={{ listStyleType: 'decimal', paddingLeft: '20px', columns: '2' }}>
                                                {assessment.pilihanGanda.map((q, i) => <li key={i} style={{ marginBottom: '2px' }}>{q.jawaban}</li>)}
                                            </ol>
                                        </div>
                                    )}
                                    {hasPGK && (
                                        <div>
                                            <h5 style={{ fontWeight: 'bold', color: '#15803d', fontFamily: '"Book Antiqua", Palatino, serif' }}>{roman[sectionIdx++]}. Pilihan Ganda Kompleks</h5>
                                            <ol start={startPGK} style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
                                                {assessment.pilihanGandaKompleks.map((q, i) => <li key={i} style={{ marginBottom: '2px' }}>{q.kunci.join(', ')}</li>)}
                                            </ol>
                                        </div>
                                    )}
                                    {hasMenjodohkan && (
                                        <div>
                                            <h5 style={{ fontWeight: 'bold', color: '#15803d', fontFamily: '"Book Antiqua", Palatino, serif' }}>{roman[sectionIdx++]}. Menjodohkan</h5>
                                            <ol start={startMatch} style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
                                                {assessment.menjodohkan.kunci.map((k, i) => (
                                                    <li key={i} style={{ marginBottom: '2px' }}>
                                                        {k.idA} - {k.idB}
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    )}
                                    {hasIsian && (
                                        <div>
                                            <h5 style={{ fontWeight: 'bold', color: '#15803d', fontFamily: '"Book Antiqua", Palatino, serif' }}>{roman[sectionIdx++]}. Isian Singkat</h5>
                                            <ol start={startIsian} style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
                                                {assessment.isianSingkat.map((q, i) => <li key={i} style={{ marginBottom: '2px' }}>{q.jawaban}</li>)}
                                            </ol>
                                        </div>
                                    )}
                                    {hasUraian && (
                                        <div>
                                            <h5 style={{ fontWeight: 'bold', color: '#15803d', fontFamily: '"Book Antiqua", Palatino, serif' }}>{roman[sectionIdx++]}. Uraian Singkat</h5>
                                            <ol start={startUraian} style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
                                                {assessment.uraianSingkat.map((q, i) => <li key={i} style={{ marginBottom: '2px' }}>{q.jawaban}</li>)}
                                            </ol>
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                    </section>
                )}

                <div className="signature-block" style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between', fontFamily: '"Book Antiqua", Palatino, serif', pageBreakInside: 'avoid' }}>
                    <div style={{ textAlign: 'center', width: '40%' }}>
                        <p>Mengetahui,</p>
                        <p>Kepala Sekolah</p>
                        <br /><br /><br /><br />
                        <p style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{formData.namaKepalaSekolah}</p>
                        <p>NIP. {formData.nipKepalaSekolah || '-'}</p>
                    </div>
                    <div style={{ textAlign: 'center', width: '40%' }}>
                        <p>{formData.tempat}, {formattedDate}</p>
                        <p>Guru Mata Pelajaran</p>
                        <br /><br /><br /><br />
                        <p style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{formData.namaGuru}</p>
                        <p>NIP. {formData.nipGuru || '-'}</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderKisiKisi = () => {
        return (
            <div id="kisi-kisi-content" className="bg-white p-6 rounded-lg shadow-sm" style={{ fontFamily: '"Book Antiqua", Palatino, serif', fontSize: '11pt', color: '#000' }}>
                 <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '14pt', fontWeight: 'bold', textTransform: 'uppercase', margin: '5px 0' }}>KISI-KISI ASESMEN SUMATIF</h3>
                    <h4 style={{ fontSize: '12pt', textTransform: 'uppercase', margin: '5px 0' }}>{formData.namaSatuanPendidikan}</h4>
                    <p>Mata Pelajaran: {formData.mataPelajaran} | Kelas: {formData.kelas} | Semester: {formData.semester}</p>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f3f4f6' }}>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>No</th>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Tujuan Pembelajaran</th>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Indikator Soal</th>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Level Kognitif</th>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Bentuk Soal</th>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>No. Soal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assessment.kisiKisi.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.nomor}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.tujuanPembelajaran}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.indikatorPencapaianKompetensi}</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.levelKognitif}</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.bentukSoal}</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.nomorSoal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="signature-block" style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between', fontFamily: '"Book Antiqua", Palatino, serif', pageBreakInside: 'avoid' }}>
                    <div style={{ textAlign: 'center', width: '40%' }}>
                        <p>Mengetahui,</p>
                        <p>Kepala Sekolah</p>
                        <br /><br /><br /><br />
                        <p style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{formData.namaKepalaSekolah}</p>
                        <p>NIP. {formData.nipKepalaSekolah || '-'}</p>
                    </div>
                    <div style={{ textAlign: 'center', width: '40%' }}>
                        <p>{formData.tempat}, {formattedDate}</p>
                        <p>Guru Mata Pelajaran</p>
                        <br /><br /><br /><br />
                        <p style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{formData.namaGuru}</p>
                        <p>NIP. {formData.nipGuru || '-'}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <div className="flex space-x-4">
                    <TabButton tabName="naskahSoal" label="Naskah Soal" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton tabName="kisiKisi" label="Kisi-Kisi" activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                <div className="flex space-x-2">
                    {activeTab === 'naskahSoal' && (
                        <button
                            onClick={() => setShowAnswers(!showAnswers)}
                            className="flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition text-sm font-medium border border-green-200"
                        >
                            {showAnswers ? 'Sembunyikan Kunci' : 'Tampilkan Kunci'}
                        </button>
                    )}
                    
                    <button
                        onClick={() => handleDownload('word')}
                        disabled={isDownloading}
                        className="flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition text-sm font-medium border border-blue-200"
                    >
                        <WordIcon />
                        Word
                    </button>
                    <button
                        onClick={() => handleDownload('pdf')}
                        disabled={isDownloading}
                        className="flex items-center px-3 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition text-sm font-medium border border-red-200"
                    >
                        <PdfIcon />
                        PDF
                    </button>
                </div>
            </div>

            <div className="flex-grow overflow-auto bg-gray-50 border border-gray-200 rounded-md p-6 shadow-inner">
                {activeTab === 'naskahSoal' ? renderNaskahSoal() : renderKisiKisi()}
            </div>
        </div>
    );
};

export default AssessmentView;