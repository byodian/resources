const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

let resources = [
  {
    title: 'HTML Reference',
    content: 'MDN HTML 属性参考',
    src: './img/mdn.png',
    linkHref: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
    category: 'HTML',
    id: 1,
  },
  {
    title: 'HTML Attribute Reference',
    content: 'w3schools HTML 属性参考',
    src: './img/w3schools.png',
    linkHref: 'https://www.w3schools.com/tags/ref_attributes.asp',
    category: 'HTML',
    id: 2,
  },
  {
    title: 'glyphs (符号)',
    content: 'HTML 特殊符号名字和数字代码',
    src: './img/mdn.png',
    linkHref: 'https://css-tricks.com/snippets/html/glyphs/',
    category: 'HTML',
    id: 3,
  },
  {
    title: 'HTML&CSS Tutorial',
    content: 'HTML CSS Sass 基础教程',
    src: './img/marksheet.png',
    linkHref: 'https://marksheet.io/',
    category: 'HTML',
    id: 4,
  },
  {
    title: 'CSS Reference',
    content: 'MDN CSS 参考',
    src: './img/mdn.png',
    linkHref: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference',
    category: 'HTML',
    id: 5,
  },
  {
    title: 'CSS Reference',
    content: '受欢迎属性说明, 附有生动的例子',
    src: './img/cssio.png',
    linkHref: 'https://cssreference.io/',
    category: 'HTML',
    id: 6,
  },
  {
    title: 'CSS Reference',
    content: '广泛的 CSS 属性参考文章',
    src: './img/codrops.png',
    linkHref: 'https://cssreference.io/',
    category: 'HTML',
    id: 7,
  },
  {
    title: '你必须要记住的 30 个选择器',
    content: '文章',
    src: './img/tutsplus.png',
    linkHref: 'https://cssreference.io/',
    category: 'HTML',
    id: 8,
  },
  {
    title: 'Absolute Centering',
    content: '使用绝对定位实现居中布局',
    src: './img/codepen.png',
    linkHref: 'https://codepen.io/shshaw/full/gEiDt',
    category: 'HTML',
    id: 9,
  },
  {
    title: 'A Complete Guide to Flexbox',
    content: 'Flexbox 完整指南',
    src: './img/csstricks.png',
    linkHref: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
    category: 'HTML',
    id: 10,
  },
  {
    title: 'A Complete Guide to Grid',
    content: 'Grid 完整指南网格布局',
    src: './img/csstricks.png',
    linkHref: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
    category: 'HTML',
    id: 11,
  },
  {
    title: 'The Shapes of CSS',
    content: 'CSS 形状',
    src: './img/csstricks.png',
    linkHref: 'https://css-tricks.com/the-shapes-of-css/',
    category: 'HTML',
    id: 12,
  },
  {
    title: '为什么人们讨厌 CSS',
    content: '文章',
    src: './img/csshate.png',
    linkHref: 'https://paulcpederson.com/articles/css-for-people-who-hate-css/',
    category: 'HTML',
    id: 13,
  },
  {
    title: 'This is Responsive',
    content: '收集创造响应式网站的模块和资源',
    src: './img/file-app.png',
    linkHref: 'https://bradfrost.github.io/this-is-responsive/',
    category: 'HTML',
    id: 14,
  },
  {
    title: '你需要知道的 CSS 技巧',
    content: 'CSS 技巧',
    src: './img/43-tricks.png',
    linkHref: 'https://lhammer.cn/You-need-to-know-css/#/',
    category: 'HTML',
    id: 15,
  },
  {
    title: 'css 样式规范指南',
    content: '详细的 CSS 规范指南',
    src: './img/cssguidelin.png',
    linkHref: 'https://cssguidelin.es/',
    category: 'HTML',
    id: 16,
  },
  {
    title: 'css 样式规范指南',
    content: '常规的规范指南',
    src: './img/codeguide.png',
    linkHref: 'https://codeguide.co/',
    category: 'HTML',
    id: 17,
  },
  {
    title: 'Web Technology',
    content: '一个前端学习路径',
    src: './img/mdn.png',
    linkHref: 'https://developer.mozilla.org/en-US/docs/Web',
    category: 'javascript',
    id: 18,
  },
  {
    title: '网道',
    content: 'JavaScript 语言入门教程',
    src: './img/wangdao.png',
    linkHref: 'https://wangdoc.com/javascript/',
    category: 'javascript',
    id: 19,
  },
  {
    title: '现代 JavaScript 教程',
    content: '从基础到高阶的 JavaScript 相关知识',
    src: './img/jsinfo.png',
    linkHref: 'https://zh.javascript.info/',
    category: 'javascript',
    id: 20,
  },
  {
    title: '学习 ES2015',
    content: 'ES6 新特性',
    src: './img/babeles6+.png',
    linkHref: 'https://babeljs.io/docs/en/learn#destructuring',
    category: 'javascript',
    id: 21,
  },
  {
    title: 'ECMAScript 6 入门',
    content: '阮一峰老师的开源教程',
    src: './img/javascript.png',
    linkHref: 'http://es6.ruanyifeng.com/',
    category: 'javascript',
    id: 22,
  },
  {
    title: '你不知道的 js 系列丛书',
    content: 'getify 开源项目',
    src: './img/github.png',
    linkHref: 'https://github.com/getify/You-Dont-Know-JS/tree/1ed-zh-CN',
    category: 'javascript',
    id: 23,
  },
  {
    title: '前端开发者手册',
    content: 'By Frontend Masters',
    src: './img/frontmaster.png',
    linkHref: 'https://frontendmasters.com/books/front-end-handbook/2019/',
    category: 'javascript',
    id: 24,
  },
  {
    title: '在线照片编辑器',
    content: '具备滤镜, 覆盖, 模糊, 剪裁等功能，可快速处理照片。',
    src: './img/file-app.png',
    linkHref: 'https://pixlr.com/',
    category: 'tool',
    id: 25,
  },
  {
    title: 'SVGOMG',
    content: 'svg 文件优化在线应用',
    src: './img/file-app.png',
    linkHref: 'https://jakearchibald.github.io/svgomg/',
    category: 'tool',
    id: 26,
  },
  {
    title: 'WebGradients',
    content: '180 个颜色线性渐变样式, 可方便复制 CSS 代码。',
    src: './img/file-app.png',
    linkHref: 'https://webgradients.com/',
    category: 'tool',
    id: 27,
  },
  {
    title: 'uigradients',
    content: '为设计师和开发人员精心挑选的美丽色彩渐变系列',
    src: './img/file-app.png',
    linkHref: 'https://uigradients.com/',
    category: 'tool',
    id: 28,
  },
  {
    title: '贝塞尔曲线',
    content: '可自定义贝塞尔曲线值的图形界面应用',
    src: './img/file-app.png',
    linkHref: 'https://cubic-bezier.com/',
    category: 'tool',
    id: 29,
  },
  {
    title: 'Easing functions',
    content: '贝塞尔曲线库',
    src: './img/file-app.png',
    linkHref: 'https://easings.net/',
    category: 'tool',
    id: 30,
  },
  {
    title: 'Web 工具',
    content: '学习 HTML-CSS- JS 的在线工具集合',
    src: './img/file-app.png',
    linkHref: 'https://html-css-js.com/',
    category: 'tool',
    id: 31,
  },
  {
    title: '正则表达式',
    content: '在线学习正则表达式工具',
    src: './img/file-app.png',
    linkHref: 'https://regex101.com/',
    category: 'tool',
    id: 32,
  },
  {
    title: 'Modular Scale',
    content: '字体比例尺',
    src: './img/file-app.png',
    linkHref: 'https://www.modularscale.com/',
    category: 'tool',
    id: 33,
  },
  {
    title: 'Lorem Picsum',
    content: '各种尺寸图片自动生成器，图片来自于 Unsplash',
    src: './img/file-app.png',
    linkHref: 'https://picsum.photos/',
    category: 'tool',
    id: 34,
  },
  {
    title: '图片生成器',
    content: '可选尺寸的占位符图片生成器',
    src: './img/file-app.png',
    linkHref: 'https://dummyimage.com/',
    category: 'tool',
    id: 35,
  },
  {
    title: 'W3Schools How To',
    content: '学习编写 UI 组件',
    src: './img/file-app.png',
    linkHref: 'https://www.w3schools.com/howto/default.asp',
    category: 'tool',
    id: 36,
  },
  {
    title: 'Pexels',
    content: '免费, 支持多种尺寸下载',
    src: './img/pexels.png',
    linkHref: 'https://coverr.co/',
    category: 'photo',
    id: 37,
  },
  {
    title: 'Unsplash',
    content: '免费, 好用',
    src: './img/unsplash.png',
    linkHref: 'https://unsplash.com/',
    category: 'photo',
    id: 38,
  },
  {
    title: 'New Old Stock',
    content: '黑白历史照片',
    src: './img/newold.jpg',
    linkHref: 'https://nos.twnsnd.co/',
    category: 'photo',
    id: 39,
  },
  {
    title: 'StreetWill',
    content: '街区照片',
    src: './img/streetwill.png',
    linkHref: 'http://streetwill.co/',
    category: 'photo',
    id: 40,
  },
  {
    title: 'IconMoon',
    content: '管理图标应用, 支持多种格式下载',
    src: './img/iconapp.png',
    linkHref: 'https://icomoon.io/',
    category: 'icon',
    id: 41,
  },
  {
    title: 'iconfont',
    content: '2100+ 免费图标, icon font & SVG',
    src: './img/icofont.png',
    linkHref: 'https://icofont.com/',
    category: 'icon',
    id: 42,
  },
  {
    title: 'Font Awesome',
    content: '1553 免费图标, SVG & Social logos',
    src: './img/fontawesomw.png',
    linkHref: 'https://fontawesome.com/',
    category: 'icon',
    id: 43,
  },
  {
    title: 'Awwwards',
    content: '炫酷的网页集合',
    src: './img/awards.png',
    linkHref: 'https://www.awwwards.com/',
    category: 'inspiration',
    id: 44,
  },
  {
    title: 'inspiring online',
    content: '有创作力的在线应用集合',
    src: './img/file-app.png',
    linkHref: 'https://inspiring.online/',
    category: 'inspiration',
    id: 45,
  },
  {
    title: 'HTML5 UP',
    content: '响应式网站模板集合',
    src: './img/h5telemplete.png',
    linkHref: 'https://html5up.net/',
    category: 'inspiration',
    id: 46,
  },
  {
    title: 'Slides',
    content: 'CSS 组件',
    src: './img/file-app.png',
    linkHref: 'https://slides.com/wireframe?debug=2#forms',
    category: 'inspiration',
    id: 47,
  },
  {
    title: 'A Single Div',
    content: 'CSS 图形集合',
    src: './img/file-app.png',
    linkHref: 'https://a.singlediv.com/',
    category: 'inspiration',
    id: 48,
  },
  {
    title: 'TextExpander Blog',
    content: 'Tutorial blog',
    src: './img/file-app.png',
    linkHref: 'https://textexpander.com/blog/',
    category: 'blog',
    id: 49,
  },
  {
    title: 'shopify blog',
    content: 'Tutorial blog，Newsletter',
    src: './img/file-app.png',
    linkHref: 'https://www.shopify.com/blog',
    category: 'blog',
    id: 50,
  },
  {
    title: 'Momentum Blog',
    content: 'Tutorial blog',
    src: './img/file-app.png',
    linkHref: 'https://momentumdash.com/blog/',
    category: 'blog',
    id: 51,
  },
  {
    title: 'Music for markers Blog',
    content: 'Tutorial blog',
    src: './img/file-app.png',
    linkHref: 'https://musicformakers.com/blog/',
    category: 'blog',
    id: 52,
  },
  {
    title: 'Sanebox blog',
    content: 'Tutorial blog，Newsletter',
    src: './img/file-app.png',
    linkHref: 'https://blog.sanebox.com/',
    category: 'blog',
    id: 53,
  },
  {
    title: 'Scott H. Young',
    content: '读书，写作 | Newsletter',
    src: './img/file-app.png',
    linkHref: 'https://www.scotthyoung.com/blog/',
    category: 'blog',
    id: 54,
  },
  {
    title: 'linmi.cc',
    content: 'Notion 教程',
    src: './img/file-app.png',
    linkHref: 'https://linmi.cc/',
    category: 'blog',
    id: 55,
  },
  {
    title: 'EngFluent',
    content: '学习英语系列教程',
    src: './img/file-app.png',
    linkHref: 'https://engfluent.com/blog/',
    category: 'blog',
    id: 56,
  },
  {
    title: '栞的心灵角落',
    content: '读书博客',
    src: './img/file-app.png',
    linkHref: 'https://twinsyang.net/',
    category: 'blog',
    id: 57,
  },
  {
    title: 'V2EX',
    content: 'v2ex',
    src: './img/file-app.png',
    linkHref: 'https://www.v2ex.com/',
    category: 'blog',
    id: 58,
  },
  {
    title: '电鸭社区',
    content: '互联网工作者们的聚集地',
    src: './img/file-app.png',
    linkHref: 'https://eleduck.com/',
    category: 'blog',
    id: 59,
  },
  {
    title: 'surplusvalue',
    content: '剩余价值',
    src: './img/file-app.png',
    linkHref: 'https://www.surplusvalue.club/',
    category: 'podcast',
    id: 60,
  },
  {
    title: '中文独立播客',
    content: '发现与推荐高质量的中文独立播客',
    src: './img/file-app.png',
    linkHref: 'https://typlog.com/podlist/',
    category: 'podcast',
    id: 61,
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>');
})

app.get('/.netlify/functions/api/resources', (req, res) => {
  res.json(resources);
})

app.get('/.netlify/functions/api/resources/:id', (req, res) => {
  const id = Number(req.params.id);
  const resource = resources.find(resource => resource.id === id);

  if (resource) {
    res.json(resource);
  } else {
    res.status(404).end();
  }
})

const generateId = () => {
  const maxId = resources.length > 0
    ? Math.max(...resources.map(n => n.id))
    : 0;

  return maxId + 1;
}


app.post('/api/resources', (req, res) => {
  const body = req.body;

  if (!body.title || !body.content) {
    return res.status(400).json({
      error: 'Content missing'
    });
  }

  const resource = {
    title: body.title,
    content: body.content,
    src: body.src || '',
    linkHerf: body.linkHerf || '',
    category: body.category || '',
    id: generateId()
  }

  resources = resources.concat(resource);
  res.json(resource);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

module.exports.handler = serverless(app);