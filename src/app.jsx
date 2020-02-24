import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux';
import { call, put, takeLatest } from 'redux-saga/effects'
import Router from './router'
import './assets/styles/common.scss'
import 'react-quill/dist/quill.snow.css'; 

// 1. 初始化状态
const initState = {
  login: false,
  httpStatus: {
    loading: false,
    requestSuccess: true,
    errorInfo: '',
  },
};

// 2. 定义 action 类型
const ACTIONS = {
  // 登录相关 action
  LOGINED: 'LOGINED',
  UNLOGIN: 'UNLOGIN',
  // 请求相关
  REQUESTSTART: 'REQUESTSTART',
  REQUESTSUCCESS: 'REQUESTSUCCESS',
  REQUESTFAILED: 'REQUESTFAILED',
};

// 3. 创建 ruducer
function loginReducer(state = initState.login, action) {
  switch (action.type) {
    case ACTIONS.LOGINED: {
      return true;
    }
    case ACTIONS.UNLOGIN: {
      return false;
    }
    default:
      return state;
  }
}
function requestReducer(state = initState.httpStatus, action) {
  switch (action.type) {
    case ACTIONS.REQUESTSTART: {
      return {
        ...state,
        loading: true,
      };
    }
    case ACTIONS.REQUESTSUCCESS: {
      return {
        ...state,
        loading: false,
        requestSuccess: true,
      };
    }
    case ACTIONS.REQUESTFAILED: {
      return {
        ...state,
        loading: false,
        requestSuccess: false,
        errorInfo: action.errorInfo,
      };
    }
    default:
      return state;
  }
}

// 4. 合并 reducer, 参数对象的键名就是最终全局 state 的键名
const AppReducer = combineReducers({
  login: loginReducer,
  httpStatus: requestReducer,
});

// 5. 创建 store
// 第二参数是初始状态，因为在 reducer 里面使用了默认值，所有可以不传，默认在创建的时候会通过 dispatch 初始化
// 创建 logger 中间件
const logger = createLogger();
// 创建 saga 中间件
const sagaMiddleware = createSagaMiddleware()
// 暂时不应用 thunk
const store = createStore(AppReducer, applyMiddleware(sagaMiddleware, logger));


function async(time) {
  return new Promise(resolve => setTimeout(() => {
    console.log('异步方法被调用了！！！！！！！！')
    resolve()
  }, time));
}
// 异步方法
function* asyncFuntion(action) {
  console.log('监听事件到了 REQUESTSTART action：其中 action 的值：', action)
  // yield 一个 Effect
  // 仅仅是为了方便测试才这么写！！！！！！！！，返回一个 plain javascript 对象，方便比较
  yield call(async, 2000)
  // 根据异步方法拿到的数据去改变全局 state 中的数据
  // 使用 put 也只是为了方便测试
  //
  // function* fetchProducts(dispatch)
  //   const products = yield call(Api.fetch, '/products')
  //   dispatch({ type: 'PRODUCTS_RECEIVED', products })
  // }
  // 如果我们想要测试 fetchProducts 接收到 AJAX 响应之后执行 dispatch， 我们还需要模拟 dispatch 函数。
  // Effect 就是为了解决测试出现的一种 声明式的解决方案
  yield put({ type: 'REQUESTSUCCESS' });
}

function* asyncFuntionTwo(action) {
  console.log('监听事件到了 REQUESTSUCCESS action：其中 action 的值：', action)
  yield new Promise(resolve => setTimeout(() => {
    console.log('异步方法被调用了！！！！！！！！')
    resolve()
  }, 2000));

  // 根据异步方法拿到的数据去改变全局 state 中的数据
  // yield put({ type: 'REQUESTSUCCESS' });
}
// 使用 saga 来解决异步 action 的分发问题
// 这是监听异步 action 的核心方法，没有出现在 safa 中的 action 就会按照一个普通的 action 处理
// 创建 saga，如果异步 action 多次分发，只需执行最后的处理
function* mySaga() {
  // 这里的 action' 对应的是 异步方法名，和 redux-thunk 类似，
  // 在方法中获取到数据后一般还要 dispatch 一个 action 去改变 store 中的数据
  yield takeLatest('REQUESTSTART', asyncFuntion);
  yield takeLatest('REQUESTSUCCESS', asyncFuntionTwo);
}

// 运行 saga
sagaMiddleware.run(mySaga)

// 创建一个 div，然后插入 body 中作为根元素
const rootDom = document.createElement('div');
document.body.appendChild(rootDom);

function AppComponent() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}


ReactDOM.render(<AppComponent />, rootDom);
