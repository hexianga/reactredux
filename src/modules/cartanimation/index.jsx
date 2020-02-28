import React from 'react'
import './index.css'

class CartAnimation extends React.Component {
  componentDidMount() {
    // 计算落点的位置
    const dropArea = document.querySelector('#ttt')
    const { left: endLeft, top: endTop } = dropArea.getBoundingClientRect()
    document.addEventListener('click', (event) => {
      const left = event.clientX;
      const top = event.clientY;
      const outer = this.getElementMyShowHide();
      outer.style.left = `${left}px`;
      outer.style.top = `${top}px`;
      outer.classList.remove('point-pre');
      const leftOffset = endLeft - left;
      const topOffset = endTop - top;

      // 这里使用定时器是为了让元素从隐藏到显示有动画出现
      setTimeout(() => {
        // 这两行代码加上时间曲线实现了抛物线的动画效果
        const inner = outer.querySelector('.inner')
        inner.style.transform = `translateY(${topOffset}px)`;
        outer.style.transform = `translateX(${leftOffset}px)`;

        // 过度时间结束后元素需要消失
        setTimeout(() => {
          outer.classList.add('point-pre')
          outer.style.transform = ''
          inner.style.transform = ''
        }, 380)
      }, 0);
    })
  }

  getElementMyShowHide = () => {
    const ballWrapper = document.querySelector('.ball-wrapper')
    const childElement = ballWrapper.querySelector('.point-pre');
    return childElement;
  }

  render() {
    return (
      <div>
        <p>在页面的任何位置点击,将有一个小球飞入类为d-targer圆形容器中,可以连续点击</p>
        <div id="ttt" className="d-target" />

        <div className="ball-wrapper">
          <div className="outer point-pre">
            <div className="inner" />
          </div>
          <div className="outer point-pre">
            <div className="inner" />
          </div>
          <div className="outer point-pre">
            <div className="inner" />
          </div>
        </div>
      </div>
    )
  }
}

export default CartAnimation
