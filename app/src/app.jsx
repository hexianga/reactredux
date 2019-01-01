import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader'
import Router from './router'

const logger = createLogger();
console.log(module, hot)

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
const store = createStore(AppReducer, applyMiddleware(thunk, logger));

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
