importScripts('https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js');

// NextGear Worker - Handles CPU intensive tasks
self.onmessage = async function (e) {
    const { id, data } = e.data;
    let result = '';

    try {
        switch (id) {
            // --- Text / Student ---
            case 'cnt':
                result = `الكلمات: ${data.txt.trim().split(/\s+/).length} | الأحرف: ${data.txt.length}`;
                break;
            case 'rev':
                result = data.txt.split('').reverse().join('');
                break;
            case 'cln':
                result = data.txt.replace(/\s+/g, ' ').trim();
                break;
            case 'bin':
                result = data.txt.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
                break;
            case 'bde':
                result = data.txt.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
                break;
            case 'rep':
                result = Array(Number(data.cnt) || 5).fill(data.txt).join(' ');
                break;
            case 'eml':
                result = (data.txt.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) || []).join('\n');
                break;
            case 'url':
                result = (data.txt.match(/(https?:\/\/[^\s]+|www\.[^\s]+)/g) || []).join('\n');
                break;
            case 'num':
                result = (data.txt.match(/\d+/g) || []).join(' ');
                break;
            case 'slug':
                result = data.txt.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                break;
            case 'wpm':
                result = `Estimated Time: ${(data.txt.trim().split(/\s+/).length / 200).toFixed(1)} mins`;
                break;
            case 'remdup':
                result = [...new Set(data.txt.split('\n'))].join('\n');
                break;
            case 'txt_sort':
                result = data.txt.split('\n').sort().join('\n');
                break;
            case 'txt_shuf':
                result = data.txt.split('\n').sort(() => Math.random() - 0.5).join('\n');
                break;

            // --- PDF (Async) ---
            case 'txt2pdf':
                if (typeof PDFLib === 'undefined') {
                    result = "Error: PDFLib library not loaded in worker.";
                } else {
                    const pdfDoc = await PDFLib.PDFDocument.create();
                    const page = pdfDoc.addPage();
                    const { width, height } = page.getSize();
                    page.drawText(data.txt || 'Empty', { x: 50, y: height - 200, size: 12 });
                    const pdfBytes = await pdfDoc.save();
                    self.postMessage({ result: pdfBytes, type: 'pdf' });
                    return;
                }
                break;

            case 'pdf_mrg': // Merge 2 PDFs
                if (typeof PDFLib === 'undefined') {
                    result = "Error: PDFLib not loaded.";
                } else {
                    try {
                        const pdfDoc = await PDFLib.PDFDocument.create();
                        const f1 = await data.f1.arrayBuffer();
                        const f2 = await data.f2.arrayBuffer();

                        const pdf1 = await PDFLib.PDFDocument.load(f1);
                        const pdf2 = await PDFLib.PDFDocument.load(f2);

                        const p1 = await pdfDoc.copyPages(pdf1, pdf1.getPageIndices());
                        p1.forEach(p => pdfDoc.addPage(p));

                        const p2 = await pdfDoc.copyPages(pdf2, pdf2.getPageIndices());
                        p2.forEach(p => pdfDoc.addPage(p));

                        const pdfBytes = await pdfDoc.save();
                        self.postMessage({ result: pdfBytes, type: 'pdf' });
                        return;
                    } catch (e) {
                        result = "Merge Error: " + e.message;
                    }
                }
                break;


            case 'pdf_spl':
                if (typeof PDFLib === 'undefined') {
                    result = "Error: PDFLib library not loaded.";
                } else {
                    try {
                        const existingPdfBytes = await data.f.arrayBuffer();
                        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
                        const newPdf = await PDFLib.PDFDocument.create();
                        const [page] = await newPdf.copyPages(pdfDoc, [Number(data.p) - 1]);
                        newPdf.addPage(page);
                        const pdfBytes = await newPdf.save();
                        self.postMessage({ result: pdfBytes, type: 'pdf' });
                        return;
                    } catch (e) {
                        result = "Error extracting page: " + e.message;
                    }
                }
                break;
            case 'pdf_rot':
                if (typeof PDFLib === 'undefined') {
                    result = "Error: PDFLib not loaded.";
                } else {
                    try {
                        const existingPdfBytes = await data.f.arrayBuffer();
                        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
                        const pages = pdfDoc.getPages();
                        pages.forEach(p => p.setRotation(PDFLib.degrees(90)));
                        const pdfBytes = await pdfDoc.save();
                        self.postMessage({ result: pdfBytes, type: 'pdf' });
                        return;
                    } catch (e) {
                        result = "Rotation Error: " + e.message;
                    }
                }
                break;
            case 'pdf_wat':
                if (typeof PDFLib === 'undefined') {
                    result = "Error: PDFLib not loaded.";
                } else {
                    try {
                        const existingPdfBytes = await data.f.arrayBuffer();
                        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
                        const pages = pdfDoc.getPages();
                        pages.forEach(p => {
                            p.drawText(data.txt || 'NextGear', {
                                x: 50, y: 50, size: 30,
                                opacity: 0.3,
                                color: PDFLib.rgb(0.5, 0.5, 0.5)
                            });
                        });
                        const pdfBytes = await pdfDoc.save();
                        self.postMessage({ result: pdfBytes, type: 'pdf' });
                        return;
                    } catch (e) {
                        result = "Watermark Error: " + e.message;
                    }
                }
                break;
            case 'pdf_clr':
                if (typeof PDFLib === 'undefined') {
                    result = "Error: PDFLib library not loaded.";
                } else {
                    try {
                        const existingPdfBytes = await data.f.arrayBuffer();
                        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
                        pdfDoc.removePage(Number(data.p) - 1);
                        const pdfBytes = await pdfDoc.save();
                        self.postMessage({ result: pdfBytes, type: 'pdf' });
                        return;
                    } catch (e) {
                        result = "Error processing PDF: " + e.message;
                    }
                }
                break;

            // --- Image ---
            case 'imgbw':
            case 'flip':
            case 'blur':
            case 'img_filt':
            case 'img_res':
            case 'img_crop':
            case 'img_comp':
            case 'img_conv':
            case 'img_rot':
                if (data.bitmap) {
                    const bmp = data.bitmap;
                    let targetW = bmp.width;
                    let targetH = bmp.height;

                    if (id === 'img_res' && data.w) {
                        targetW = Number(data.w);
                        targetH = bmp.height * (targetW / bmp.width);
                    }

                    const cvs = new OffscreenCanvas(targetW, targetH);
                    const ctx = cvs.getContext('2d');

                    if (id === 'imgbw') {
                        ctx.filter = 'grayscale(100%)';
                        ctx.drawImage(bmp, 0, 0);
                    } else if (id === 'blur') {
                        ctx.filter = 'blur(10px)';
                        ctx.drawImage(bmp, 0, 0);
                    } else if (id === 'flip') {
                        ctx.translate(cvs.width, 0);
                        ctx.scale(-1, 1);
                        ctx.drawImage(bmp, 0, 0);
                    } else if (id === 'img_filt') {
                        if (data.filter === 'sepia') ctx.filter = 'sepia(100%)';
                        else if (data.filter === 'inv') ctx.filter = 'invert(100%)';
                        else ctx.filter = 'none';
                        ctx.drawImage(bmp, 0, 0);
                    } else if (id === 'img_crop') {
                        const size = Math.min(bmp.width, bmp.height);
                        const canvas = new OffscreenCanvas(size, size);
                        const context = canvas.getContext('2d');
                        context.drawImage(bmp, (bmp.width - size) / 2, (bmp.height - size) / 2, size, size, 0, 0, size, size);
                        const croppedBmp = canvas.transferToImageBitmap();
                        self.postMessage({ id, result: croppedBmp }, [croppedBmp]);
                        return;
                    } else if (id === 'img_rot') {
                        const canvas = new OffscreenCanvas(bmp.height, bmp.width);
                        const context = canvas.getContext('2d');
                        context.translate(canvas.width / 2, canvas.height / 2);
                        context.rotate(90 * Math.PI / 180);
                        context.drawImage(bmp, -bmp.width / 2, -bmp.height / 2);
                        const rotBmp = canvas.transferToImageBitmap();
                        self.postMessage({ id, result: rotBmp }, [rotBmp]);
                        return;
                    } else {
                        // Resize (handled by OffscreenCanvas constructor above) or Comp/Conv (defaults)
                        ctx.drawImage(bmp, 0, 0, targetW, targetH);
                    }

                    const newBmp = cvs.transferToImageBitmap();
                    self.postMessage({ id, result: newBmp }, [newBmp]);
                    return;
                }
                break;

            // --- Math ---
            case 'bmi':
                const h = data.h / 100;
                const b = (data.w / (h * h)).toFixed(2);
                result = `BMI: ${b} (${b < 18.5 ? 'نحيف' : b < 25 ? 'طبيعي' : 'سمنة'})`;
                break;
            case 'avg':
                const nArr = data.nums ? data.nums.split(' ').map(Number) : [];
                result = nArr.length > 0 ? (nArr.reduce((a, b) => a + b, 0) / nArr.length).toFixed(2) : '0';
                break;

            // --- Converters ---
            case 'c_len':
                result = `${data.v} m = ${(data.v / 1000).toFixed(3)} km | ${(data.v * 100).toFixed(0)} cm | ${(data.v * 39.37).toFixed(2)} inch`;
                break;
            case 'c_wgt':
                result = `${data.v} kg = ${(data.v * 1000).toFixed(0)} g | ${(data.v * 2.2046).toFixed(2)} lbs`;
                break;
            case 'c_tmp':
                result = `${data.v}°C = ${(data.v * 9 / 5 + 32).toFixed(1)}°F | ${(Number(data.v) + 273.15).toFixed(2)}K`;
                break;

            // --- Dev ---
            case 'jsn':
            case 'json':
                try {
                    result = JSON.stringify(JSON.parse(data.txt || data.p || '{}'), null, 2);
                } catch (e) { result = "Invalid JSON"; }
                break;
            case 'gen':
                result = Math.random().toString(36).slice(-(data.len || 10)) + Math.random().toString(36).slice(-(data.len || 10));
                break;

            default:
                // Fallback: If not handled in worker, return special flag or error
                result = 'Web Worker: Command not found';
        }
    } catch (err) {
        result = `خطأ في المعالجة: ${err.message}`;
    }

    self.postMessage({ result });
};
