# 样式指南

参考 [ArcoDesign](https://arco.design/docs/spec/style-guideline)

## 色彩

按照颜色类型和功能的不同，arco 将色彩分为主色、中性色、功能色和遮罩色。

### 主色

主色 (primary) 是一个产品的代表颜色，一般与品牌色相关联，常用于主要按钮和文字、重点操作状态、高亮提醒、空状态

```
  --primary-1  浅色/白底悬浮
  --primary-2  文字禁用
  --primary-3  一般禁用
  --primary-4  特殊场景
  --primary-5  悬浮
  --primary-6  常规
  --primary-7  点击
```

### 中性色

中性色 (neutral) 又称为无彩色系，常用于文字、背景、图标、边框和分割线等元素

```
  --color-text-1: var(--color-neutral-10); // 强调/正文标题
  --color-text-2: var(--color-neutral-8); // 次强调/正文、菜单、图标
  --color-text-3: var(--color-neutral-6); // 次要信息(label、提示信息等)
  --color-text-4: var(--color-neutral-4); // 禁用状态文字

  --color-fill-1: var(--color-neutral-1); // 浅/禁用
  --color-fill-2: var(--color-neutral-2); // 一般/常规/白底悬浮
  --color-fill-3: var(--color-neutral-3); // 深/灰底悬浮
  --color-fill-4: var(--color-neutral-4); // 重/特殊场景

  --color-border-1: var(--color-neutral-2);
  --color-border-2: var(--color-neutral-3); // 常规/白底
  --color-border-3: var(--color-neutral-4); // 深/灰底
  --color-border-4: var(--color-neutral-6);
```

### 功能色

功能色的主要作用是向用户明确的传达成功、警告、错误、链接等信息和状态

#### 成功 Success

```
  --success-1: var(--green-1); // 浅色背景
  --success-2: var(--green-2); // 特殊场景
  --success-3: var(--green-3); // 禁用
  --success-4: var(--green-4); // 特殊场景
  --success-5: var(--green-5); // 悬浮
  --success-6: var(--green-6); // 常规
  --success-7: var(--green-7); // 点击
```

#### 警告/提醒 Warning/Notice

```
  --warning-1: var(--orange-1); // 浅色背景
  --warning-2: var(--orange-2); // 特殊场景
  --warning-3: var(--orange-3); // 禁用
  --warning-4: var(--orange-4); // 特殊场景
  --warning-5: var(--orange-5); // 悬浮
  --warning-6: var(--orange-6); // 常规
  --warning-7: var(--orange-7); // 点击
```

#### 错误 Error

```
  --danger-1: var(--orange-1); // 浅色背景
  --danger-2: var(--orange-2); // 特殊场景
  --danger-3: var(--orange-3); // 禁用
  --danger-4: var(--orange-4); // 特殊场景
  --danger-5: var(--orange-5); // 悬浮
  --danger-6: var(--orange-6); // 常规
  --danger-7: var(--orange-7); // 点击
```

#### 链接 Link

通常跟主色保持色调一致

```
  --link-1: var(--primary-1); // 浅色背景
  --link-2: var(--primary-2); // 特殊场景
  --link-3: var(--primary-3); // 禁用
  --link-4: var(--primary-4); // 特殊场景
  --link-5: var(--primary-5); // 悬浮
  --link-6: var(--primary-6); // 常规
  --link-7: var(--primary-7); // 点击
```

### 遮罩色

遮罩色常用于作为底色突出模态窗口，一般以黑色、白色为基色，配合透明度百分比使用。arco 默认的遮罩色为#1D2129，透明度为 60%。

## 文字

### 字号

- 最小可识别文字尺寸：12px
- 字体层级：区分文本主副层级，字号差距需保持 2-4px
- 不要有过多的字体层级，建议选择在 3-5 种之间，需要关注的文本信息可通过增加字重的方式突出

```
  --font-size-1: 12px; // 辅助文案
  --font-size-2: 13px; // 正文-常规-小
  --font-size-3: 14px; // 正文-常规-大
  --font-size-4: 16px; // 标题-小
  --font-size-5: 20px; // 标题-中
  --font-size-6: 24px; // 标题-大
  --font-size-7: 36px; // 运营标题-小
  --font-size-8: 48px; // 运营标题-小
  --font-size-9: 56px; // 运营标题-小

  --font-size: var(----font-size-3); // 主字号 14px
```

### 行高

目前通用的建议中，西文的基本行高是字号的 1.2 倍左右。中文根据阅读人群划分（儿童、年轻人、老年人），可达到 1.5 至 2 倍甚至更大。
arco 默认的行高为 1.4 倍。

### 段落间距

根据 WCAG 中的 AAA 标准，段落间距至少为字体大小的 1.5 倍。正文 14px 字号对应段间距为 21px。

## 阴影

在界面中，我们常用阴影来模拟元素之间的物理层级关系。

- 物体紧贴地面，投影与物体完全重叠，在界面中不对此层定义阴影值(无阴影)。如：输入框等；
- 物体位于低层级，此时物体被操作(悬停、点击等)触发为悬浮状态，当操作完成或取消时，悬停状态反馈也跟随消失，物体回归到原有的层级中，如：卡片 hover 等
- 物体位于中层级，此时物体与基准面的关系是展开并跟随，物体由地面上的元素展开产生，会跟随元素所在层级的移动而移动，如：下拉面板等
- 物体位于高层级，该物体的运动和其他层级没有关联，如：对话框等
