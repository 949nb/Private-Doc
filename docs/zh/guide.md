## inputSelect 使用文档

### 引入

在项目下**引入路径**`@/components/formInput/inputselect`

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



#### 动态表头

````vue
<inputselect
  title="xxx"
  :requestInfo="requestInfo"
  :pramas="pramas"
  @changecode="changeCode"
  :inputInfo="inputInfo"
  :tableHeaderData="tableHeaderData"
  :fuzzySearch="fuzzySearch"
>
</inputselect>

<script>
export default {
  data() {
    return {
      tableHeaderData: [ // 其中每一项为:一行的表头(lable),以及绑定的prop,相应的你在callback里定义的tableData中每一项obj的key，都要和这个prop进行一一对应。注意，tableHeaderData中你想要回显到input中的字段，prop一定要为name，如果在动态表头中监测不到有name这一字段，则会出现回显为空的bug。
        {
          label: '方案代码',
          prop: 'planCode'
        },
        {
          label: '方案名称',
          prop: 'name'
        }
      ],
      requestInfo: {
        requestPromise: getXXX, // 写入你在API中定义的请求函数, 这个函数必须是一个promise
        callback: this.callback // callback 就是对你接口请求回来的数据做处理的函数
      },
      pramas: {
          fuzzySearch: '' // 模糊查询字段
      }, // pramas 是你请求的参数，参数中的pageSize，pageNo不需要传，组件中已经处理好了。
      inputInfo: { name: 'xxx', code: 'xxx' } // 数据回显时 需要绑定需要回显在input中的name和code
    }
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
    changeCode(row) { // 当你在选择某一行后触发的函数
      // ...code和name为表格中展示的数据
      console.log(row)
      // ...row代表你在传tableData时 这一行你定义的所有数据
    },
  }    
}
</script>
````

动态与静态的主要区别在于`tableHeaderData`属性，tableHeaderData定义了动态表头的label和prop。

`changecode`事件也有不同，在动态表头中`changecode`事件抛出这一行完整的数据。

> ***注意***：在动态表头`tableHeaderData`属性中，必须有一项`prop`为`name`，这一项则是你需要回显到input中的数据。因为如果所有的`prop`都是动态的，组件内则无法知道你需要回显的是哪一个字段。

### InputSelect Attributes

|       参数       |                             说明                             |  类型   |
| :--------------: | :----------------------------------------------------------: | :-----: |
|      title       |                        定义弹框的标题                        | String  |
|     disable      |                   定义组件是否为不可选中的                   | Boolean |
|   requestInfo    | 其中有两个字段`requestPromise`和`callback`，详细说明看上方示例<br />`requestPromise`：值为某一个在API中定义的请求函数<br />`callback`：值为一个函数，这个函数用来处理请求返回的数据，<br />~~必须return一个数组，这个数组就是表格所绑定的数据，示例看上方代码~~<br />必须return一个对象！其中有两个key，一个是count，一个是tableData，具体示例看上方代码 | Object  |
|      pramas      |                       此项为请求的参数                       | Object  |
| tableHeaderData  | 定义动态表头的每一列的数组，用来循环渲染表格，代码看上方示例 |  Array  |
|    inputInfo     | 用于数据回显时绑定回显的数据，默认绑定一个对象，对象的参数为`{name: 'xxx', code: 'xxx'}`<br />***注意：inputInfo绑定的初始值一定为空，数据回显时再给其赋值*** | Object  |
|   fuzzySearch    |                      填写模糊查询字段名                      | String  |
| changeInputValue |                   根据这个来触发input方法                    |         |

### InputSelect Events

|  事件名称  |             说明             |                 回调函数                 |
| :--------: | :--------------------------: | :--------------------------------------: |
| changecode | 在你选择表格中的某一行时触发 | 静态：(code, name, row)<br />动态：(row) |