const fs = require('fs');
const files = [
    'index.html', 'video.html', 'audio.html', 'pdf.html', 'converters.html',
    'decoration.html', 'math.html', 'games.html', 'css.html', 'image.html', 'misc.html'
];

const newNav = `        <div class="nav-menu">
            <a href="index.html" class="nav-item"><i>🏠</i> <span>الرئيسية</span></a>
            <a href="video.html" class="nav-item"><i>🎞️</i> <span>فيديو</span></a>
            <a href="audio.html" class="nav-item"><i>🎵</i> <span>صوتيات</span></a>
            <a href="image.html" class="nav-item"><i>🖼️</i> <span>صور</span></a>
            <a href="pdf.html" class="nav-item"><i>📄</i> <span>ملفات PDF</span></a>
            <a href="converters.html" class="nav-item"><i>🔄</i> <span>محولات</span></a>
            <a href="css.html" class="nav-item"><i>🎨</i> <span>CSS</span></a>
            <a href="decoration.html" class="nav-item"><i>✨</i> <span>زخرفة</span></a>
            <a href="math.html" class="nav-item"><i>🔢</i> <span>حساب</span></a>
            <a href="games.html" class="nav-item"><i>🎮</i> <span>ألعاب</span></a>
            <a href="misc.html" class="nav-item"><i>🛠️</i> <span>منوعات</span></a>
        </div>`;

files.forEach(file => {
    try {
        if (fs.existsSync(file)) {
            let content = fs.readFileSync(file, 'utf8');
            // Regex to match existing nav content
            const navRegex = /<div class="nav-menu">[\s\S]*?<\/div>/;

            if (navRegex.test(content)) {
                let updatedContent = content.replace(navRegex, newNav);

                // Set active class based on filename
                let activeClass = '';
                if (file === 'index.html') activeClass = 'href="index.html" class="nav-item active"';
                else if (file === 'converters.html') activeClass = 'href="converters.html" class="nav-item active"';
                else activeClass = `href="${file}" class="nav-item active"`;

                // Replace generic class with active class for current page
                const targetLink = `href="${file}" class="nav-item"`;
                updatedContent = updatedContent.replace(targetLink, activeClass);

                fs.writeFileSync(file, updatedContent);
                console.log(`Updated nav in ${file}`);
            } else {
                console.log(`Nav not found in ${file}`);
            }
        }
    } catch (e) {
        console.error(`Error processing ${file}:`, e.message);
    }
});
