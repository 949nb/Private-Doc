# Hello VuePress!

> 这是我第一个VuePress应用，我准备给我现在做的项目写一些东西。实践是检验真理的唯一标准。



### 基础使用

此组件可**动态**传入表头，也可使用默认的**静态**表头。

静态表头中包含（序号 名称 代码 操作）4行。以下为动态表头以及静态表头的代码示例：

#### 静态表头

```vue
<inputselect
  title="xxx"
  :requestInfo="requestInfo"
  :pramas="pramas"
  :inputInfo="inputInfo"
  @changecode="changeCode"
  :fuzzySearch="fuzzySearch"
>
</inputselect>

<script>
  export default {
    data: {
      requestInfo: {
        requestPromise: getXXX, // 写入你在API中定义的请求函数, 这个函数必须是一个promise
        callback: this.callback // callback 就是对你接口请求回来的数据做处理的函数
      },
      pramas: {
           fuzzySearch: '' // 模糊查询字段
      }, // pramas 是你请求的参数，参数中的pageSize，pageNo不需要传，组件中已经处理好了。
      inputInfo: {name: 'xxx', code: 'xxx'} // 数据回显时 需要绑定需要回显在input中的name和code
    },
    methods: {
      callback(res) { // res就是你写入requestPromise getXXX这个接口返回的数据
        let obj = {
            count: res.data.count, // 因为组件分页需要count这个参数，代表一共有多少条数据
            tableData: []
        }
        // ... 对你接口返回的数据做处理，并且把你需要展示在弹框中的name和code提取出来组成一个对象
        // ... 例如你需要用到res.data.List的每一项中的name和code，范例如下:
        res.data.List.forEach(item => {
          let temp = {
			date: item.code, // 必传 名称必须为date，代表的是你想要展示的代码
            name: item.name  // 必传 名称必须为name，代表展示的名称
            xx: 'xxx'        // 非必传 如果你想给某一行添加一些额外的信息 可以写在这里，数量不限
          }
          obj.tableData.push(temp)
        })
        return obj
      },
      changeCode(code, name, row) { // 当你在选择某一行后触发的函数
          // ...code和name为表格中展示的数据
          console.log(row)
          // ...row代表你在传tableData时 这一行你定义的所有数据
      }
    },
  }
</script>
```

以上是静态表头的用法，需要注意的点在于`requestInfo`中的`callback`函数。这个函数的作用是**处理**请求的数据。
