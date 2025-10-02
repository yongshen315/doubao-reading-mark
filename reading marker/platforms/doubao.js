// platforms/doubao.js

class DoubaoPlatform {
  /**
   * 判断当前页面是不是豆包
   */
  static isCurrentPlatform() {
    const isDoubao = window.location.host.includes('doubao.com');
    console.log('当前页面是否为豆包：', isDoubao);
    return isDoubao;
  }

  /**
   * 获取当前阅读位置（滚动容器的 scrollTop）
   */
  static getCurrentPosition() {
    const chatContainer = document.querySelector('.scrollable-LNO7hx');

    if (chatContainer) {
      console.log('找到聊天容器，scrollTop =', chatContainer.scrollTop);
      return chatContainer.scrollTop;
    } else {
      console.log('未找到聊天容器，使用 window.scrollY =', window.scrollY);
      return window.scrollY;
    }
  }

  /**
   * 滚动到指定位置
   * @param {number} position - 要滚动到的 scrollTop 值
   */
  static scrollToPosition(position) {
    console.log('准备滚动到位置：', position);

    const chatContainer = document.querySelector('.scrollable-LNO7hx');

    if (chatContainer) {
      console.log('使用聊天容器滚动到', position);
      chatContainer.scrollTo({ top: position, behavior: 'smooth' });
    } else {
      console.log('未找到聊天容器，使用 window 滚动到', position);
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
  }

  /**
   * 在页面右侧显示一个标记提示点
   * @param {object} marker - 包含 position 和 color 的标记对象
   */
  static showMarkerTip(marker) {
    const tip = document.createElement('div');
    tip.style.position = 'fixed';
    tip.style.top = `${marker.position + 10}px`;
    tip.style.right = '20px';
    tip.style.width = '12px';
    tip.style.height = '12px';
    tip.style.borderRadius = '50%';
    tip.style.backgroundColor = marker.color;
    tip.style.zIndex = '9999';
    tip.title = '已标记的位置';
    document.body.appendChild(tip);
    console.log('已添加标记提示点:', marker);
  }
}