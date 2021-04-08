# newproject

## 项目初始化
```
npm install
```

### 启动项目
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# 
# common.js getDictionaryArr(code)数据字典方法方法
引入组件，直接调用，传递对应code值，返回对应的数据字典
# common.js getDictionaryText (code, value)
根据数据字典以及value的值，返回对应的text

# 请求参数格式是form-data的话就要在api文件引入qs，自行转义