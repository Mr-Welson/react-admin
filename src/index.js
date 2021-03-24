import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';
import './index.css';
import { Provider } from 'mobx-react'
import store from './store'
import App from './App';


dayjs.locale('zh-cn')

ReactDOM.render(
  // <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider {...store}>
        <App />
      </Provider>
    </ConfigProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
