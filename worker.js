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
                result = `الوقت المقدر: ${(data.txt.trim().split(/\s+/).length / 200).toFixed(1)} دقيقة`;
                break;
            case 'remdup':
                result = [...new Set(data.txt.split('\n'))].join('\n');
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

            case 'pdf_delete':
                if (typeof PDFLib === 'undefined') {
                    result = "Error: PDFLib library not loaded.";
                } else {
                    try {
                        const existingPdfBytes = await data.file.arrayBuffer();
                        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

                        // data.pages is array of 0-based indices to DELETE
                        // We must delete from last to first to keep indices valid
                        const pagesToDelete = data.pages.sort((a, b) => b - a);

                        for (const pIndex of pagesToDelete) {
                            pdfDoc.removePage(pIndex);
                        }

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
            case 'img_filt': // Added for new Image Tools
                if (data.bitmap) {
                    const bmp = data.bitmap;
                    const cvs = new OffscreenCanvas(bmp.width, bmp.height);
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
                    } else {
                        ctx.drawImage(bmp, 0, 0);
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
                const n = data.nums.split(' ').map(Number);
                result = (n.reduce((a, b) => a + b, 0) / n.length).toFixed(2);
                break;

            // --- Dev ---
            case 'jsn':
                result = JSON.stringify(JSON.parse(data.txt), null, 2);
                break;
            case 'gen':
                result = Math.random().toString(36).slice(-data.len);
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
