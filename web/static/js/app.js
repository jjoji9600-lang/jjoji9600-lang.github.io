// Markdown 工具栏功能
function insertMarkdown(before, after) {
    const textarea = document.getElementById('content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    textarea.value = text.substring(0, start) + before + selectedText + after + text.substring(end);
    textarea.focus();
    textarea.selectionStart = start + before.length;
    textarea.selectionEnd = end + before.length;
}

function insertLink() {
    const url = prompt('请输入链接地址:', 'https://');
    if (url) {
        const text = prompt('请输入链接文本:', '链接文字');
        insertMarkdown('[' + text + '](', ')');
    }
}

// 预览切换
function togglePreview() {
    const panel = document.getElementById('preview-panel');
    const content = document.getElementById('content');
    const previewContent = document.getElementById('preview-content');
    
    if (panel.style.display === 'none') {
        panel.style.display = 'flex';
        // 简单的 Markdown 渲染
        previewContent.innerHTML = renderMarkdown(content.value);
    } else {
        panel.style.display = 'none';
    }
}

// 简单的 Markdown 渲染
function renderMarkdown(text) {
    let html = text;
    
    // 代码块
    html = html.replace(/```[\s\S]*?```g, (match) => {
        const code = match.slice(3, -3);
        return '<pre><code>' + escapeHtml(code) + '</code></pre>';
    });
    
    // 行内代码
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // 标题
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    
    // 粗体和斜体
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // 列表
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
    
    // 链接和图片
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
    // 段落
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    
    // 清理
    html = html.replace(/<p><(h[1-3]|ul|ol|pre|blockquote)/g, '<$1');
    html = html.replace(/<\/(h[1-3]|ul|ol|pre|blockquote)><\/p>/g, '</$1>');
    html = html.replace(/<p><\/p>/g, '');
    
    return html;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 实时预览（可选）
document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    if (content) {
        let timeout;
        content.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const previewContent = document.getElementById('preview-content');
                if (previewContent && document.getElementById('preview-panel').style.display !== 'none') {
                    previewContent.innerHTML = renderMarkdown(content.value);
                }
            }, 300);
        });
    }
});
