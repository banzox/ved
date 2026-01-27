const fs = require('fs');
const files = ['student.html', 'math.html', 'conv.html', 'dev.html', 'social.html', 'files.html', 'game.html'];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        if (!content.includes('الرئيسية</span></a>')) {
            content = content.replace(
                '<div class="nav-menu">\n            <a href="student.html"',
                '<div class="nav-menu">\n            <a href="index.html" class="nav-item"><i>🏠</i> <span>الرئيسية</span></a>\n            <a href="student.html"'
            );
            // Also try with different whitespace if above fails
            content = content.replace(
                '<div class="nav-menu">\r\n            <a href="student.html"',
                '<div class="nav-menu">\r\n            <a href="index.html" class="nav-item"><i>🏠</i> <span>الرئيسية</span></a>\r\n            <a href="student.html"'
            );
            fs.writeFileSync(file, content);
            console.log(`Updated ${file}`);
        } else {
            console.log(`Skipped ${file} (already has Home)`);
        }
    } catch (e) {
        console.error(`Error updating ${file}:`, e.message);
    }
});
