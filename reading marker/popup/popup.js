// 标记当前位置
document.getElementById('markBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        const messages = document.querySelectorAll('[data-testid="message_text_content"]');
        if (!messages.length) return alert('找不到消息元素');

        const firstVisibleMsg = Array.from(messages).find(el => {
          const rect = el.getBoundingClientRect();
          return rect.top >= 0 && rect.top < window.innerHeight;
        });

        if (!firstVisibleMsg) return alert('找不到可见消息');

        const anchorText = firstVisibleMsg.textContent.trim().substring(0, 100);
        localStorage.setItem('readingAnchor', anchorText); // 统一 key
        alert('已标记位置：\n' + anchorText);
      }
    });
  });
});

// 返回上一标记
document.getElementById('backBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        const anchorText = localStorage.getItem('readingAnchor'); // 统一 key
        if (!anchorText) return alert('没有标记点');

        const messages = document.querySelectorAll('[data-testid="message_text_content"]'); // 统一选择器
        for (const msg of messages) {
          if (msg.textContent.includes(anchorText)) {
            msg.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }

        alert('未找到标记位置的消息');
      }
    });
  });
});