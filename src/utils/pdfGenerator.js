import { jsPDF } from 'jspdf';

/**
 * Sanitizes unicode characters for standard jsPDF helvetica font rendering.
 */
function sanitizeText(str) {
  if (!str) return '';
  if (typeof str === 'object') {
    str = str.id || str.en || '';
  }
  if (typeof str !== 'string') return '';
  return str
    .replace(/±/g, '+/- ')
    .replace(/°/g, ' ')
    .replace(/²/g, '2')
    .replace(/³/g, '3')
    .replace(/≤/g, '<= ')
    .replace(/≥/g, '>= ')
    .replace(/–/g, '-')
    .replace(/—/g, ' - ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'");
}

/**
 * Generates an official, high-quality PDF document for TDS (Technical Data Sheet) or MSDS (Material Safety Data Sheet).
 * @param {Object} product - Product data object
 * @param {'TDS' | 'MSDS'} type - Document type
 */
export function generateProductPDF(product, type = 'TDS') {
  if (!product) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const isTDS = type.toUpperCase() === 'TDS';
  const docTitle = isTDS ? 'TECHNICAL DATA SHEET (TDS)' : 'MATERIAL SAFETY DATA SHEET (MSDS)';
  const docCode = `DOC-CPM-${type.toUpperCase()}-${sanitizeText(product.code).replace(/\s+/g, '')}`;
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Page dimensions
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const primaryNavy = [15, 23, 42]; // #0f172a
  const accentTeal = [13, 148, 136]; // #0d9488
  const textDark = [30, 41, 59]; // #1e293b
  const textMuted = [100, 116, 139]; // #64748b
  const bgLight = [248, 250, 252]; // #f8fafc
  const borderColor = [226, 232, 240]; // #e2e8f0

  let y = 16;

  // ==================== HEADER ====================
  // Company Logo / Brand Name (Clean header, NO badge button on top right)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...primaryNavy);
  doc.text('CV. CITRA PUTRA MANDIRI', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textMuted);
  doc.text('Industrial Chemical & Water Treatment Formulation', margin, y + 4.5);
  doc.text('Kawasan Industri Manufaktur · Telp/WA: 08129483381 (Bustiar) · Email: citraputramandiri@yahoo.co.id', margin, y + 8.5);

  y += 13;

  // Decorative Horizontal Divider Line
  doc.setDrawColor(...accentTeal);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  // ==================== DOCUMENT BANNER ====================
  doc.setFillColor(...bgLight);
  doc.setDrawColor(...borderColor);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 16, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.setTextColor(...primaryNavy);
  doc.text(docTitle, margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...textMuted);
  doc.text(`No. Dokumen: ${docCode}  |  Revisi: 2.1  |  Tanggal Terbit: ${currentDate}`, margin + 4, y + 11.5);

  y += 21;

  // Helper to draw section header
  const drawSectionHeader = (title) => {
    doc.setFillColor(...primaryNavy);
    doc.rect(margin, y, contentWidth, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(title, margin + 3, y + 4.2);
    y += 8.5;
  };

  // ==================== SECTION 1: IDENTIFIKASI PRODUK ====================
  drawSectionHeader('1. IDENTIFIKASI PRODUK & PERUSAHAAN');

  const infoRows = [
    ['Kode Produk', sanitizeText(product.code), 'Kategori', sanitizeText(product.categoryName || 'Industrial Chemical')],
    ['Nama Produk', sanitizeText(product.name), 'Kemasan Resmi', sanitizeText(product.packaging || 'Pail 20L / Drum 200L')],
    ['Produsen', 'CV. Citra Putra Mandiri', 'Standar Mutu', 'QC Passed - High Grade Formula'],
  ];

  doc.setFontSize(8);
  infoRows.forEach((row) => {
    // Left pair
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...textMuted);
    doc.text(`${row[0]}:`, margin + 2, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryNavy);
    doc.text(row[1], margin + 26, y);

    // Right pair
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...textMuted);
    doc.text(`${row[2]}:`, margin + 88, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textDark);
    doc.text(row[3], margin + 114, y);

    y += 5;
  });

  y += 2;

  // ==================== SECTION 2: DESKRIPSI & KEUNGGULAN ====================
  drawSectionHeader('2. DESKRIPSI PRODUK & MANFAAT TEKNIS');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...textDark);
  const descLines = doc.splitTextToSize(sanitizeText(product.description || '-'), contentWidth - 4);
  doc.text(descLines, margin + 2, y);
  y += descLines.length * 4 + 3;

  // ==================== SECTION 3: SIFAT FISIK & KIMIA ====================
  drawSectionHeader('3. SPESIFIKASI & KARAKTERISTIK FISIK');

  const physicalText = sanitizeText(
    product.physicalProperties ||
      'Bentuk: Cairan Konsentrat · Kelarutan: Sempurna dalam air · Stabilitas: Stabil pada suhu ruang · Korosivitas: Terinhibisi non-korosif'
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...textDark);
  const physLines = doc.splitTextToSize(physicalText, contentWidth - 4);
  doc.text(physLines, margin + 2, y);
  y += physLines.length * 4 + 3;

  // ==================== SECTION 4: APLIKASI & REKOMENDASI DOSIS ====================
  drawSectionHeader(isTDS ? '4. AREA APLIKASI & PETUNJUK DOSIS' : '4. APLIKASI & INSTRUKSI KERJA');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...primaryNavy);
  doc.text('Area Aplikasi Target:', margin + 2, y);
  y += 4;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textDark);
  const appLines = doc.splitTextToSize(
    sanitizeText(product.applications || 'Peralatan pabrik dan sistem sirkulasi industri.'),
    contentWidth - 4
  );
  doc.text(appLines, margin + 2, y);
  y += appLines.length * 4 + 2;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryNavy);
  doc.text('Petunjuk Penggunaan & Dosis:', margin + 2, y);
  y += 4;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textDark);
  const doseLines = doc.splitTextToSize(
    sanitizeText(product.dosage || 'Dosis disesuaikan dengan analisis teknis dan rekomendasi tim CV. Citra Putra Mandiri.'),
    contentWidth - 4
  );
  doc.text(doseLines, margin + 2, y);
  y += doseLines.length * 4 + 3;

  // ==================== SECTION 5: KESELAMATAN & PENANGANAN (K3) ====================
  drawSectionHeader('5. KESELAMATAN KERJA, PENYIMPANAN & K3');

  const safetyItems = [
    ['Alat Pelindung Diri (APD):', 'Gunakan sarung tangan karet (nitrile/latex), masker debu/uap, dan kacamata safety (goggles).'],
    ['Kontak Mata & Kulit:', 'Jika terkena mata, bilas dengan air bersih mengalir minimal 15 menit. Jika terkena kulit, cuci bersih dengan sabun.'],
    ['Penyimpanan:', 'Simpan dalam wadah tertutup rapat di area sejuk dan berventilasi baik (suhu 15-35 C), terlindung dari sinar matahari langsung.'],
    ['Penanganan Tumpahan:', 'Serap tumpahan dengan pasir atau serbuk inert, lalu bilas area kerja dengan air bersih sesuai regulasi lingkungan.'],
  ];

  safetyItems.forEach(([label, text]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(...accentTeal);
    doc.text(`• ${label}`, margin + 2, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textDark);
    const textLines = doc.splitTextToSize(text, contentWidth - 46);
    doc.text(textLines, margin + 44, y);
    y += Math.max(textLines.length * 3.8, 4.5);
  });

  // ==================== FOOTER / SIGNATURE BLOCK ====================
  const footerY = pageHeight - 20;

  doc.setDrawColor(...borderColor);
  doc.setLineWidth(0.4);
  doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);

  // Footer Line 1: Company Division (Left) & Page count (Right)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...primaryNavy);
  doc.text('CV. CITRA PUTRA MANDIRI — TECHNICAL & QUALITY ASSURANCE', margin, footerY + 3);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...textMuted);
  doc.text('Dokumen Resmi Terverifikasi · Halaman 1 dari 1', pageWidth - margin, footerY + 3, { align: 'right' });

  // Footer Line 2: Disclaimer (Left) & Contact/Web (Right)
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.5);
  doc.setTextColor(...textMuted);
  doc.text('Data teknis disusun berdasar pengujian laboratorium internal untuk pemeliharaan fasilitas industri.', margin, footerY + 7.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...accentTeal);
  doc.text('www.citraputramandiri.com · Telp/WA: 08129483381 (Bustiar)', pageWidth - margin, footerY + 7.5, { align: 'right' });

  // Save the PDF file
  const cleanCode = sanitizeText(product.code).replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `CV_CPM_${cleanCode}_${type.toUpperCase()}.pdf`;
  doc.save(fileName);
}
