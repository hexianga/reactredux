declare module 'lodash';
declare module 'react-quill'
declare module 'antd'

declare module '*.less'
declare module '*.css'
declare module '*.json'

declare module '*.scss' {
  const content: {[className: string]: string};
  export default content;
}
