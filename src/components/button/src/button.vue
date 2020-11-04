<template>
  <button :class="['yzh-button',type? `yzh-button-${type}`:'']">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'yzh-button',
    props: {
      type: {
        type: String,
        default: 'default'
      }
    }
  }
</script>

<style lang="scss">
  $button-type: ('default', 'primary'); // 按钮类型
  $button-background-color:('#FFF', '#6495ED'); // 按钮背景色
  $button-border-color:('#E2E2E2', '#6495ED'); // 按钮边框色
  $button-font-color:('#636363', '#fff'); // 按钮文字颜色

  .yzh-button {
    padding: 8px 14px; // 按钮默认内边距
    border-radius: 3px; // 按钮默认圆角
    cursor: pointer; // 按钮默认鼠标手势

    @each $name in $button-type {
      // 循环遍历按钮类型
      $i: index($button-type, $name); // 获取

      &-#{$name} {
        border: 1px solid #{nth($button-border-color, $i)};
        background-color: #{nth($button-background-color, $i)};
        color: #{nth($button-font-color, $i)};

        @if $name==default {
          &:hover {
            background-color: #6495ed17;
            border: 1px solid #6495ED;
            color: #6495ED;
            opacity: .8;
          }
        }

        @else {
          &:hover {
            opacity: .8;
          }
        }
      }
    }

    &+& {
      // 按钮之间默认右外边距
      margin-left: 5px;
    }
  }
</style>