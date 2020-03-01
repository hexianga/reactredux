import React from 'react'
import Loadable from 'react-loadable';

const Loading = (props) => {
  if (props.error) {
    return (
      <div>
        Error!
        <button onClick={props.retry}>Retry</button>
      </div>
    );
  } if (props.timedOut) {
    return (
      <div>
        Taking a long time...
        <button onClick={props.retry}>Retry</button>
      </div>
    );
  } if (props.pastDelay) {
    return <div>Loading...</div>;
  }
  return null;
}

const LoadableComponent: any = (loader) => Loadable({
  loader,
  // delay: 300, // 默认 200
  // timeout: 10000,
  loading() {
    return <div>Loading...</div>
  }
});

export default LoadableComponent

// 组件预加载，当发生鼠标 hover 的时候可以加载 js，优化性能。
// const LoadableBar = Loadable({
//   loader: () => import('./Bar'),
//   loading: Loading,
// });
// onMouseOver = () => {
//   LoadableBar.preload();
// };
