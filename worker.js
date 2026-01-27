
// NextGear Worker - Handles CPU intensive tasks
self.onmessage = function (e) {
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
            case 'upr':
                result = data.txt.toUpperCase();
                break;
            case 'lwr':
                result = data.txt.toLowerCase();
                break;
            case 'cap':
                result = data.txt.replace(/\b\w/g, c => c.toUpperCase());
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
                result = (data.txt.match(/https?:\/\/[^\s]+/g) || []).join('\n');
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
            case 'sort':
                result = data.txt.split('\n').sort().join('\n');
                break;
            case 'sortr':
                result = data.txt.split('\n').sort().reverse().join('\n');
                break;
            case 'remdup':
                result = [...new Set(data.txt.split('\n'))].join('\n');
                break;

            // --- Image ---
            case 'imgbw':
            case 'flip':
            case 'blur':
                // Data must contain 'bitmap' (ImageBitmap)
                if (data.bitmap) {
                    const bmp = data.bitmap;
                    const cvs = new OffscreenCanvas(bmp.width, bmp.height);
                    const ctx = cvs.getContext('2d');

                    // Optimization: Use native Filters where possible (GPU accelerated)
                    if (id === 'imgbw') {
                        ctx.filter = 'grayscale(100%)';
                        ctx.drawImage(bmp, 0, 0);
                    } else if (id === 'blur') {
                        ctx.filter = 'blur(10px)'; // Increased blur for better effect
                        ctx.drawImage(bmp, 0, 0);
                    } else if (id === 'flip') {
                        ctx.translate(cvs.width, 0);
                        ctx.scale(-1, 1);
                        ctx.drawImage(bmp, 0, 0);
                    } else {
                        // Default Fallback (should not be reached for these specific IDs)
                        ctx.drawImage(bmp, 0, 0);
                    }

                    // Convert back to ImageBitmap efficiently
                    const newBmp = cvs.transferToImageBitmap();
                    self.postMessage({ id, result: newBmp }, [newBmp]);
                    return; // Special return for images
                }
                break;

            // --- Math ---
            case 'bmi':
                const h = data.h / 100;
                const b = (data.w / (h * h)).toFixed(2);
                result = `BMI: ${b} (${b < 25 ? 'طبيعي' : 'زائد'})`;
                break;
            case 'avg':
                const n = data.nums.split(' ').map(Number);
                result = n.reduce((a, b) => a + b, 0) / n.length;
                break;

            // --- Dev ---
            case 'jsn':
                result = JSON.stringify(JSON.parse(data.txt), null, 2);
                break;
            case 'gen':
                result = Math.random().toString(36).slice(-data.len);
                break;

            default:
                result = 'NOT_HANDLED';
        }
    } catch (err) {
        result = `ERROR: ${err.message}`;
    }

    self.postMessage({ result });
};
