<!-- json在线编辑组件测试 -->
<template>
  <div>
    <div id="editor_holder">
      <editor
        v-model="content"
        @init="editorInit"
        lang="html"
        theme="chrome"
        width="500"
        height="300"
      ></editor>
      <!-- <textarea v-model="content" width="500" height="500"></textarea> -->
      <json-viewer :value="jsonData"></json-viewer>
      <p v-show="error">{{error}}</p>
    </div>
    <!-- <div @click="dad">dsadsasd</div> -->
  </div>
</template>

<script>
import editor from "vue2-ace-editor"; // https://github.com/chairuosen/vue2-ace-editor
import JsonViewer from "vue-json-viewer"; // https://www.npmjs.com/package/vue-json-viewer
export default {
  data() {
    return {
      error: "",
      content: "",
      jsonData: {},
      getJSON: {
        items: [
          {
            type: 2,
            labels: [1, 2, 3, 4, 5],
            values: ["非常不满意", "不满意", "一般", "满意", "非常满意"],
            subject: "您对科达的客户服务响应速度是否满意",
            required: 1,
            sequence: 0
          },
          {
            type: 2,
            labels: [1, 2, 3, 4, 5],
            values: ["非常不满意", "不满意", "一般", "满意", "非常满意"],
            subject: "对整体安排、协调、沟通方面是否满意",
            required: 1,
            sequence: 1
          },
          {
            type: 2,
            labels: [1, 2, 3, 4, 5],
            values: ["非常不满意", "不满意", "一般", "满意", "非常满意"],
            subject: "对处理结果质量是否满意",
            required: 1,
            sequence: 2
          },
          {
            type: 3,
            subject: "您还有其他问题和建议吗",
            required: 0,
            sequence: 3,
            wordLimit: 1000,
            placeholder: "请输入..."
          }
        ],
        title: "客户服务评价",
        tempName: "2019723核心客户问卷调查",
        templateId: 7
      }
    };
  },
  created() {
    this.jsonData =  this.getJSON;
    this.content = JSON.stringify(this.jsonData, null, 4);
    return;
    this.httpRequest(
      paramObj,
      function(respondDada) {
        //这里编写成功的回调函数
        console.log(respondDada);
      },
      function() {
        alert("网络错误");
      }
    );
  },
  watch: {
    content(v) {
      console.log(v);
      try {
        this.jsonData = JSON.parse(v);
        this.error = "";
      } catch (e) {
        this.jsonData = {};
        this.error = "JSON格式错误";
      }
    }
  },
  methods: {
    editorInit: function() {
      require("brace/mode/html");
      require("brace/theme/chrome");
    },
    dad() {
      // console.log(JSON.parse(this.content));
    },
    httpRequest(paramObj, fun, errFun) {
      var xmlhttp = null;
      /*创建XMLHttpRequest对象，
       *老版本的 Internet Explorer（IE5 和 IE6）使用 ActiveX 对象：new ActiveXObject("Microsoft.XMLHTTP")
       * */
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      /*判断是否支持请求*/
      if (xmlhttp == null) {
        alert("你的浏览器不支持XMLHttp");
        return;
      }
      /*请求方式，并且转换为大写*/
      var httpType = (paramObj.type || "GET").toUpperCase();
      /*数据类型*/
      var dataType = paramObj.dataType || "json";
      /*请求接口*/
      var httpUrl = paramObj.httpUrl || "";
      /*是否异步请求*/
      var async = paramObj.async || true;
      /*请求参数--post请求参数格式为：foo=bar&lorem=ipsum*/
      var paramData = paramObj.data || [];
      var requestData = "";
      for (var name in paramData) {
        requestData += name + "=" + paramData[name] + "&";
      }
      requestData =
        requestData == ""
          ? ""
          : requestData.substring(0, requestData.length - 1);
      console.log(requestData);

      /*请求接收*/
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          /*成功回调函数*/
          fun(xmlhttp.responseText);
        } else {
          /*失败回调函数*/
          errFun;
        }
      };

      /*接口连接，先判断连接类型是post还是get*/
      if (httpType == "GET") {
        xmlhttp.open("GET", httpUrl, async);
        xmlhttp.send(null);
      } else if (httpType == "POST") {
        xmlhttp.open("POST", httpUrl, async);
        //发送合适的请求头信息
        xmlhttp.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xmlhttp.send(requestData);
      }
    }
  },
  components: {
    editor,
    JsonViewer
  }
};
</script>


<style lang="less" scoped>
</style>
