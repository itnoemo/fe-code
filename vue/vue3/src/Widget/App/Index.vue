<template>
    <div ref="toTopRef" class="box">
      <div class="anchorsWrap">
        <h3 @click="toTop">回到顶部</h3>
        <br />
        <h3 @click="anchorJump('xiyouji')">跳转到西游记</h3>
        <br />
        <h3 @click="anchorJump('shuihuzhuan')">跳转到水浒传</h3>
        <br />
        <h3 @click="anchorJump('hongloumeng')">跳转到红楼梦</h3>
        <br />
      </div>
      <div class="contentWrap">
        <div>
          <p>锚点跳转</p>
          <p>很不错哦</p>
          <p>推荐使用</p>
          <p>某些场景</p>
          <p>比scrollTop</p>
          <p>更加方便</p>
        </div>
        <div>
          <!-- 来一个锚点id -->
          <h3 id="xiyouji">西游记</h3>
          <p>孙悟空</p>
          <p>猪八戒</p>
          <p>沙和尚</p>
          <p>唐僧</p>
          <p>孙悟空</p>
          <p>猪八戒</p>
          <p>沙和尚</p>
          <p>唐僧</p>
          <p>孙悟空</p>
          <p>猪八戒</p>
          <p>沙和尚</p>
          <p>唐僧</p>
          <p>唐僧</p>
          <p>孙悟空</p>
          <p>猪八戒</p>
          <p>沙和尚</p>
          <p>唐僧</p>
        </div>
        <div>
          <!-- 来一个锚点id -->
          <h3 id="shuihuzhuan">水浒传</h3>
          <p>李逵</p>
          <p>吴用</p>
          <p>林冲</p>
          <p>武松</p>
          <p>李逵</p>
          <p>吴用</p>
          <p>林冲</p>
          <p>武松</p>
          <p>李逵</p>
          <p>吴用</p>
          <p>林冲</p>
          <p>武松</p>
          <p>李逵</p>
          <p>吴用</p>
          <p>林冲</p>
          <p>武松</p>
        </div>
        <div>
          <!-- 来一个锚点id -->
          <h3 id="hongloumeng">红楼梦</h3>
          <p>贾宝玉</p>
          <p>林黛玉</p>
          <p>王熙凤</p>
          <p>贾宝玉</p>
          <p>林黛玉</p>
          <p>王熙凤</p>
          <p>贾宝玉</p>
          <p>林黛玉</p>
          <p>王熙凤</p>
          <p>贾宝玉</p>
          <p>林黛玉</p>
          <p>王熙凤</p>
          <p>贾宝玉</p>
          <p>林黛玉</p>
          <p>王熙凤</p>
          <p>贾宝玉</p>
          <p>林黛玉</p>
          <p>王熙凤</p>
          <p>贾宝玉</p>
          <p>林黛玉</p>
          <p>王熙凤</p>
          <p>贾宝玉</p>
          <p>林黛玉</p>
          <p>王熙凤</p>
          <p>贾宝玉</p>
          <p>林黛玉</p>
          <p>王熙凤</p>
          <p>贾宝玉</p>
          <p>林黛玉</p>
          <p>王熙凤</p>
          <p>贾宝玉</p>
          <p>林黛玉</p>
          <p>王熙凤</p>
          <p>贾宝玉</p>
          <p>林黛玉</p>
          <p>王熙凤</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      anchorJump(which) {
        let id = "#" + which; // 给id加上井号
        // 给对应dom滚动到对应锚点，使之出现在视图中
        document.querySelector(id).scrollIntoView({
          behavior: "smooth", // 定义过渡动画 instant立刻跳过去 smooth平滑过渡过去
          block: "start", // 定义垂直滚动方向的对齐 start顶部（尽可能）  center中间（尽可能）  end（底部）
          inline: "center", // 定义水平滚动方向的对齐
        });
      },
      toTop() {
        if (this.$refs.toTopRef.scrollTop == 0) {
          return;
        }
        /**
         * 使用循环定时器，定时更新其高度，直至高度为0，才去清除定时器
         * 同时再更正一下高度位置为0
         * */
        let timer = setInterval(() => {
          this.$refs.toTopRef.scrollTop = this.$refs.toTopRef.scrollTop - 30;
          console.log("实时高度scrollTop", this.$refs.toTopRef.scrollTop);
          if (this.$refs.toTopRef.scrollTop <= 0) {
            clearInterval(timer);
            this.$refs.toTopRef.scrollTop = 0;
          }
        }, 16); // 30和16这两个参数感觉比较平滑一些
      },
    },
  };
  </script>
  
  <style lang="less" scoped>
  .box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 24px;
    // 作为容器，要开启滚动条
    overflow-y: auto;
    .anchorsWrap {
      position: fixed;
      left: 480px;
      h3 {
        cursor: pointer;
      }
      h3:hover {
        box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
      }
    }
  }
  </style>