import { saveData, getData } from './storage.js';

export class MarkerManager {
  constructor() {
    this.markers = getData('readingMarkers') || [];
    console.log('初始化时的标记数据：', this.markers); // 调试用
    this.colors = ['#FF5733', '#33C1FF', '#33FF57'];
  }

  addMarker(position) {
    const marker = {
      id: Date.now(),
      position,
      color: this.colors[this.markers.length % this.colors.length],
      timestamp: Date.now()
    };
    this.markers.push(marker);
    saveData('readingMarkers', this.markers);
    return marker;
  }

  backToPrevious() {
    console.log('返回上一标记前的标记数据：', this.markers); // 调试用
    if (this.markers.length === 0) return null;
    const marker = this.markers.pop();
    saveData('readingMarkers', this.markers);
    console.log('返回的标记：', marker); // 调试用
    return marker;
  }

  getAllMarkers() {
    return [...this.markers];
  }
}