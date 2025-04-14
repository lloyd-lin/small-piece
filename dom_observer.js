// 监听内容是否进入视窗
io= new IntersectionObserver(()=> {console.log('good')})
io.observe(document.getElementsByClassName('Button FollowButton Button--primary Button--blue')[0])
// 降级可以用 getBoundingClientRect
// 思路 设置一个阈值，超过则加入观测，调用callback，然后取消观测