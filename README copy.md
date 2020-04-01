# vue-surveyeditor

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

该版本依赖于[element-ui@2.12.0](https://element.eleme.cn/#/zh-CN)

该版本依赖于[survey-creator@1.1.26](https://github.com/surveyjs/survey-creator)

该版本依赖于[surveyjs1.1.26](https://github.com/surveyjs/survey-library)

## 项目为何使用vue：
1. 问卷版本升级，从E调研到现在surveyjs 进行多次大小版本升级，现在E调研还是处于之前版本。

2. 将survey-creator 即问卷编辑 与问卷答题即surveyjs合并为vue版本，目的为以下几个方面：
  - 为以后更好的对问卷进行功能拓展
  - 为使问卷有更好的UI效果
  - 为使E调研之间的耦合性更低
  - 为以后无论谁接受这个项目，更快的上手，现在问卷答题使用的框架为konockout，目前市场上找到一个会konockout并不多，但是找到一个会Vue的就很好找了



## 题型详细描述

> 级联题：级联题添加了之前多个未想到及未实现的一些功能，如【仅显示最后一级】【可清空】【多选】【选择任意一级选项】【搜索功能】【级联面板】

> 星星题：支持半星选择，颜色修改 提示文本大约15个属性

> 日期时间题：日期时间题目前因为涉及属性较多，如用户是做日期呢还是做时间还是做日期时间【可以做出来】后续增加

> 滑块题：【离散值】【带有输入框】【范围选择】【竖向模式】【展示标记  】

## 目前已完成：
  1. 简单的将问卷编辑与问卷合并到一起，用的均为VUE
  2. 将element ui引入来替换之前原始控件
  3. 新加入题型【级联题】【星星题】【日期时间题】【滑块题】；见下方题型详细描述
  4. 问卷预览，及模拟提交
  4. JSON编辑器
  4. 日期题  
  4. 星星题（支持半选）
  4. 分段评分题（可多选）
  6. 级联题 [参考链接：https://element.eleme.cn/#/zh-CN/component/cascader](https://element.eleme.cn/#/zh-CN/component/cascader)
  5. 问卷属性编辑完成一部分，目前实现了部分属性编辑，Boolean属性如
- string属性：如标题，变量名，按钮文本
- Boolean属性：如是否显示题目，是否必答，是否可见
- Number属性：如缩进，宽度，文本最大长度，单选一行几个
- Dropdown属性：如选项排序（升序降序无）输入框大小（大中小）
- color属性：如问卷背景色,版心背景色
- 还未实现的有弹框属性（默认值，触发器，可见条件，验证）

## 目前未完成：
  1. 单选多选每个选项后追加文本框
  2. 问卷编辑，较复杂属性编辑如：触发器，验证，默认值，正确答案，可见条件，必答条件
  3. 问卷进度：如进度按照页显示，进度按照剩余题目数量显示
  4. 手机端展示（响应式布局），目前element ui适配的是PC端，但是有些组件并没有设配移动端，此时应该对element ui不适配移动端组件进行移动端开发，如级联组件在移动端显示不全，模态对话框
  6. 级联题 [参考链接：https://element.eleme.cn/#/zh-CN/component/cascader](https://element.eleme.cn/#/zh-CN/component/cascader)
  5. 多选排序题或者叫排序多选，实现思路是在下拉中添加属性，是否进行排序，对组件进行更改，已选中项目后用【数字】显示，而不是【√】[参考链接：https://element.eleme.cn/#/zh-CN/component/select](https://element.eleme.cn/#/zh-CN/component/select)
   5. 拖拽排序题

## 目前问题难点：
  属性编辑（弹框一些的属性）