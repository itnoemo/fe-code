/**
 * 有两种类型的自定义元素：
 *  自定义内置元素（Customized built-in element）继承自标准的 HTML 元素，例如 HTMLImageElement 或 HTMLParagraphElement。它们的实现定义了标准元素的行为。
独立自定义元素（Autonomous custom element）继承自 HTML 元素基类 HTMLElement。你必须从头开始实现它们的行为。
 */
// 为这个元素创建类
class MyCustomElement extends HTMLElement {
    static observedAttributes = ["color", "size"];
  
    constructor() {
      // 必须首先调用 super 方法
      super();
    }
  
    connectedCallback() {
      console.log("自定义元素添加至页面。");
    }
  
    disconnectedCallback() {
      console.log("自定义元素从页面中移除。");
    }
  
    adoptedCallback() {
      console.log("自定义元素移动至新页面。");
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      console.log(`属性 ${name} 已变更。`);
    }
  }
  
  customElements.define("my-custom-element", MyCustomElement);