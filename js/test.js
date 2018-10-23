var css1 = `/*面试官你好!
 * 只用文字介绍太单调了
 * 我将以动画的方式介绍自己
 * 就用代码来介绍吧
 * 首先准备一些样式
 */
 
*{
  transition: all .8s;
}
/*设置背景颜色*/
body{
    background: rgba(222,222,222);
    font-size: 16px;
    width: 100%;
    height: 100vh;
  }

/*文字距离边框太近了
*添加边框
*/
#code{
  border: 1px solid red;
  width:100%;
  height: 100%;
  padding: 16px;
}
/*代码高亮*/
.token.selector{
  color: #690;
}
.token.property{
  color: #905;
}
.token.function{
  color: #DD4A68;
}
/*我需要一张白纸*/
#code{
  width:50%;
  height: 100%;
}

#paper > .content {
 display: block;
 background: white;
 padding: 16px;
 
}

/*那么我就可以在白纸上写字了,请看右边*/
`
var md = `# 自我介绍
我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位
# 技能介绍
熟悉 JavaScript CSS
# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

`
var  css2=`/*
下面用一个优秀的库 marked
把 Markdown 变成 HTML
*/`
var css3=`
/*这就是我的会动的简历
谢谢观看*/
`
function writeCss(prefix,code,fn){
  let domcss = document.querySelector('#code')
  var n=0
  var id = setInterval(()=>{
    n += 1
    domcss.innerHTML = Prism.highlight(prefix + code.substring(0,n), Prism.languages.css, 'css');
    styleTag.innerHTML = prefix + code.substring(0,n)
    domcss.scrollTop = domcss.scrollHeight
    if(n>code.length){
      window.clearInterval(id)
      fn.call()
    }
  },0)
}

writeCss('',css1,()=>{
  createPaper(()=>{
    writeMarkdown(md,()=>{
      writeCss(css1,css2,()=>{
        markdownToHtml(()=>{
          writeCss(css1+css2,css3)
        })
      })
    })
  })
})

function createPaper(fn){
  var paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn.call()
}
function writeMarkdown(md,fn){
  var content = document.querySelector('.content')
  var n = 0
  var id = setInterval(()=>{
    n += 1
    content.innerHTML = md.substring(0,n)
    if(n>md.length){
      window.clearInterval(id)
      fn.call()
    }
  })
}
function markdownToHtml(fn){
  var div = document.createElement('div')
  div.id = 'html markdown content'
  div.innerHTML = marked(md)
  var content = document.querySelector('.content')
  content.replaceWith(div)
  fn.call()
}