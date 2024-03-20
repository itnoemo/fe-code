# web component
## 有两种类型的自定义元素：
- 自定义内置元素（Customized built-in element）继承自标准的 HTML 元素，例如 HTMLImageElement 或 HTMLParagraphElement。它们的实现定义了标准元素的行为。
- 独立自定义元素（Autonomous custom element）继承自 HTML 元素基类 HTMLElement。你必须从头开始实现它们的行为。
### 自定义元素生命周期回调
- connectedCallback()：每当元素添加到文档中时调用。规范建议开发人员尽可能在此回调中实现自定义元素的设定，而不是在构造函数中实现。
- disconnectedCallback()：每当元素从文档中移除时调用。
- adoptedCallback()：每当元素被移动到新文档中时调用。
- attributeChangedCallback()：在属性更改、添加、移除或替换时调用。有关此回调的更多详细信息，请参见响应属性变化。
```js
// 为这个元素创建类
class MyCustomElement extends HTMLElement {
  static observedAttributes = ["color", "size"];
  constructor() {
    // 必须首先调用 super 方法
    super();
  }
  // 自定义元素添加到页面
  connectedCallback() {
    console.log("自定义元素添加至页面。");
  }
  // 自定义元素从页面中移除
  disconnectedCallback() {
    console.log("自定义元素从页面中移除。");
  }
  // 自定义元素移动至新页面
  adoptedCallback() {
    console.log("自定义元素移动至新页面。");
  }
  // 属性更改
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`属性 ${name} 已变更。`);
  }
}
```
### 注册自定义元素
- 请调用 Window.customElements 的 define() 方法。
    - define() 方法接受以下参数：
        - name：元素的名称。必须以小写字母开头，包含一个连字符，并符合规范中有效名称的定义中列出的一些其他规则。
        - constructor：自定义元素的构造函数。
        - options：仅对于自定义内置元素，这是一个包含单个属性 extends 的对象，该属性是一个字符串，命名了要扩展的内置元素。
    ```js
    // 以下代码注册了名为 WordCount 的自定义内置元素
    customElements.define("word-count", WordCount, { extends: "p" });

    // 以下代码注册了名为 PopupInfo 的独立自定义元素
    customElements.define("popup-info", PopupInfo);
    ```
### 使用自定义元素
```html
// 要使用自定义内置元素，请使用内置元素，但将自定义名称作为 is 属性的值：
<p is="word-count"></p>

// 要使用独立自定义元素，就像使用内置的 HTML 元素一样，使用自定义名称即可
<popup-info>
  <!-- 元素的内容 -->
</popup-info>
```
### 响应属性变化
- 与内置元素一样，自定义元素可以使用 HTML 属性来配置元素的行为。
- 为了有效地使用属性，元素必须能够响应属性值的变化
- 自定义元素需要将以下成员添加到实现自定义元素的类中
- attributeChangedCallback() 回调在列在元素的 observedAttributes 属性中的属性被添加、修改、移除或替换时调用
  - 回调接受三个参数
    - 发生变化的属性的名称
    - 属性的旧值
    - 属性的新值
```js
// 为这个元素创建类
class MyCustomElement extends HTMLElement {
    // 需要监听的属性
    static observedAttributes = ["size"];
    constructor() {
        super();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`属性 ${name} 已由 ${oldValue} 变更为 ${newValue}。`);
    }
}
customElements.define("my-custom-element", MyCustomElement);
```
******************************************************
## Shadow DOM（影子 DOM）
- 作用：
    - 允许你将一个 DOM 树附加到一个元素上，并且使该树的内部对于在页面中运行的 JavaScript 和 CSS 是隐藏的
    - 防止运行在页面中的代码通过修改自定义元素的内部实现而意外地破坏它
    - 若影子 DOM有一个span标签，
        - 外部通过  Document.querySelectorAll('span') 是获取不到影子DOM中的span节点的
        - 页面的 CSS 不会影响影子 DOM 内的节点
- 有一些影子 DOM 术语需要注意：
    - 影子宿主（Shadow host）: 影子 DOM 附加到的常规 DOM 节点。
    - 影子树（Shadow tree）: 影子 DOM 内部的 DOM 树。
    - 影子边界（Shadow boundary）: 影子 DOM 终止，常规 DOM 开始的地方。
    - 影子根（Shadow root）: 影子树的根节点。
