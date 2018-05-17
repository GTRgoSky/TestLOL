webpackJsonp([3],{

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(45)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(28),
  /* template */
  __webpack_require__(38),
  /* scopeId */
  "data-v-17ca0ef1",
  /* cssModules */
  null
)
Component.options.__file = "F:\\自己测试完\\手动Vue项目实践\\vue-cli\\comp\\home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] home.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-17ca0ef1", Component.options)
  } else {
    hotAPI.reload("data-v-17ca0ef1", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import foo from "./foo.vue";
// import bar from "./bar.vue"
exports.default = {
    data: function data() {
        return {
            currentTab: 'foo',
            tabs: ['foo', 'bar'],
            todoT: [1, 2]
        };
    },

    computed: {
        currentTabComponent: function currentTabComponent() {
            return this.currentTab.toLowerCase();
        }
    },
    components: {
        // ues {"plugins": ["syntax-dynamic-import"]}
        bar: function bar() {
            return __webpack_require__.e/* import() */(1/* duplicate */).then(__webpack_require__.bind(null, 17));
        },
        foo: function foo() {
            return __webpack_require__.e/* import() */(0/* duplicate */).then(__webpack_require__.bind(null, 18));
        },
        dom: function dom() {
            return __webpack_require__.e/* import() */(6).then(__webpack_require__.bind(null, 37));
        }
    },
    methods: {
        changeTodo: function changeTodo() {
            this.todoT = [2, 1];
            this.$refs.refT.test();
            console.log(this.$refs.refD);
        }
    },
    mounted: function mounted() {
        console.log(this.$router.currentRoute);
    }
};

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(true);
// imports


// module
exports.push([module.i, "\n.tab-button[data-v-17ca0ef1] {\n  padding: 6px 10px;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  border: 1px solid #ccc;\n  cursor: pointer;\n  background: #f0f0f0;\n  margin-bottom: -1px;\n  margin-right: -1px;\n}\n.tab-button[data-v-17ca0ef1]:hover {\n  background: #e0e0e0;\n}\n.tab-button.active[data-v-17ca0ef1] {\n  background: #e0e0e0;\n}\n.tab[data-v-17ca0ef1] {\n  border: 1px solid #ccc;\n  padding: 10px;\n}\n", "", {"version":3,"sources":["F:/自己测试完/手动Vue项目实践/vue-cli/comp/home.vue"],"names":[],"mappings":";AAAA;EACE,kBAAkB;EAClB,4BAA4B;EAC5B,6BAA6B;EAC7B,uBAAuB;EACvB,gBAAgB;EAChB,oBAAoB;EACpB,oBAAoB;EACpB,mBAAmB;CACpB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,uBAAuB;EACvB,cAAc;CACf","file":"home.vue","sourcesContent":[".tab-button {\n  padding: 6px 10px;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  border: 1px solid #ccc;\n  cursor: pointer;\n  background: #f0f0f0;\n  margin-bottom: -1px;\n  margin-right: -1px;\n}\n.tab-button:hover {\n  background: #e0e0e0;\n}\n.tab-button.active {\n  background: #e0e0e0;\n}\n.tab {\n  border: 1px solid #ccc;\n  padding: 10px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('p', {
    ref: "refD"
  }, [_vm._v("home and params: " + _vm._s(_vm.$route.params.userId))]), _vm._v(" "), _vm._l((_vm.tabs), function(tab) {
    return _c('button', {
      key: tab,
      class: ['tab-button', {
        active: _vm.currentTab === tab
      }],
      on: {
        "click": function($event) {
          _vm.currentTab = tab
        }
      }
    }, [_vm._v(_vm._s(tab))])
  }), _vm._v(" "), _c('keep-alive', [_c(_vm.currentTabComponent, {
    tag: "component",
    staticClass: "tab"
  })], 1), _vm._v(" "), _c("dom", {
    ref: "refT",
    tag: "p",
    attrs: {
      "todo": _vm.todoT
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(slotProps) {
        return [_c('a', {
          attrs: {
            "href": 'http://www.baidu.com?id=' + slotProps.todo
          }
        }, [_c('p', [_vm._v("3123 and " + _vm._s(slotProps.todo))])])]
      }
    }])
  }), _vm._v(" "), _c('button', {
    on: {
      "click": _vm.changeTodo
    }
  }, [_vm._v("点我试试")])], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-17ca0ef1", module.exports)
  }
}

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("0e7db5ad", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-17ca0ef1\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-17ca0ef1\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92dWUtY2xpL2NvbXAvaG9tZS52dWUiLCJ3ZWJwYWNrOi8vL2hvbWUudnVlIiwid2VicGFjazovLy8uL3Z1ZS1jbGkvY29tcC9ob21lLnZ1ZT8yNDM1Iiwid2VicGFjazovLy8uL3Z1ZS1jbGkvY29tcC9ob21lLnZ1ZT83YjBkIiwid2VicGFjazovLy8uL3Z1ZS1jbGkvY29tcC9ob21lLnZ1ZT80NGViIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBO0FBQ0Esc0JBQXNNOztBQUV0TTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFtRztBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0UsaURBQWlELElBQUk7QUFDcEksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUVBOzswQkFFQTs7d0JBRUE7MEJBQ0E7dUJBRUE7QUFKQTtBQUtBOzs7NERBRUE7bUNBQ0E7QUFFQTtBQUpBOztBQU1BOztpSEFDQTs7O2lIQUNBOzs7a0dBRUE7O0FBTEE7OzBDQU9BOzZCQUNBOzRCQUNBO21DQUNBO0FBRUE7QUFOQTtnQ0FPQTtpQ0FDQTtBQUNBO0FBNUJBLEU7Ozs7Ozs7QUM5QkE7QUFDQTs7O0FBR0E7QUFDQSx5REFBMEQsc0JBQXNCLGdDQUFnQyxpQ0FBaUMsMkJBQTJCLG9CQUFvQix3QkFBd0Isd0JBQXdCLHVCQUF1QixHQUFHLHNDQUFzQyx3QkFBd0IsR0FBRyx1Q0FBdUMsd0JBQXdCLEdBQUcseUJBQXlCLDJCQUEyQixrQkFBa0IsR0FBRyxVQUFVLDJGQUEyRixLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxXQUFXLHdEQUF3RCxzQkFBc0IsZ0NBQWdDLGlDQUFpQywyQkFBMkIsb0JBQW9CLHdCQUF3Qix3QkFBd0IsdUJBQXVCLEdBQUcscUJBQXFCLHdCQUF3QixHQUFHLHNCQUFzQix3QkFBd0IsR0FBRyxRQUFRLDJCQUEyQixrQkFBa0IsR0FBRyxxQkFBcUI7O0FBRTdxQzs7Ozs7Ozs7QUNQQSxnQkFBZ0IsbUJBQW1CLGFBQWEsMEJBQTBCO0FBQzFFO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7O0FDOUNBOztBQUVBO0FBQ0Esb0NBQTBNO0FBQzFNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvSUFBb0kscUVBQXFFO0FBQ3pNLDZJQUE2SSxxRUFBcUU7QUFDbE47QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDIiwiZmlsZSI6IjMuYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qIHN0eWxlcyAqL1xucmVxdWlyZShcIiEhdnVlLWxvYWRlci9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0xN2NhMGVmMVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hbGVzcy1sb2FkZXIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9ob21lLnZ1ZVwiKVxuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIikoXG4gIC8qIHNjcmlwdCAqL1xuICByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9ob21lLnZ1ZVwiKSxcbiAgLyogdGVtcGxhdGUgKi9cbiAgcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMTdjYTBlZjFcXFwifSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vaG9tZS52dWVcIiksXG4gIC8qIHNjb3BlSWQgKi9cbiAgXCJkYXRhLXYtMTdjYTBlZjFcIixcbiAgLyogY3NzTW9kdWxlcyAqL1xuICBudWxsXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIkY6XFxcXOiHquW3sea1i+ivleWujFxcXFzmiYvliqhWdWXpobnnm67lrp7ot7VcXFxcdnVlLWNsaVxcXFxjb21wXFxcXGhvbWUudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkgIT09IFwiX19lc01vZHVsZVwifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gaG9tZS52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMTdjYTBlZjFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0xN2NhMGVmMVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi92dWUtY2xpL2NvbXAvaG9tZS52dWVcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIjx0ZW1wbGF0ZT5cclxuICAgIDxkaXY+XHJcbiAgICAgICAgPHAgcmVmPVwicmVmRFwiPmhvbWUgYW5kIHBhcmFtczoge3sgJHJvdXRlLnBhcmFtcy51c2VySWQgfX08L3A+XHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICB2LWZvcj1cInRhYiBpbiB0YWJzXCJcclxuICAgICAgICAgICAgdi1iaW5kOmtleT1cInRhYlwiXHJcbiAgICAgICAgICAgIHYtYmluZDpjbGFzcz1cIlsndGFiLWJ1dHRvbicsIHsgYWN0aXZlOiBjdXJyZW50VGFiID09PSB0YWIgfV1cIlxyXG4gICAgICAgICAgICB2LW9uOmNsaWNrPVwiY3VycmVudFRhYiA9IHRhYlwiXHJcbiAgICAgICAgPnt7IHRhYiB9fTwvYnV0dG9uPlxyXG4gICAgICAgIDxrZWVwLWFsaXZlPlxyXG4gICAgICAgICAgICA8Y29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICB2LWJpbmQ6aXM9XCJjdXJyZW50VGFiQ29tcG9uZW50XCJcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwidGFiXCJcclxuICAgICAgICAgICAgPjwvY29tcG9uZW50PlxyXG4gICAgICAgIDwva2VlcC1hbGl2ZT5cclxuICAgICAgICAgPHAgcmVmPVwicmVmVFwiIGlzPVwiZG9tXCIgOnRvZG89XCJ0b2RvVFwiPlxyXG4gICAgICAgICAgICA8dGVtcGxhdGUgc2xvdC1zY29wZT1cInNsb3RQcm9wc1wiPlxyXG4gICAgICAgICAgICAgICAgPGEgOmhyZWY9XCInaHR0cDovL3d3dy5iYWlkdS5jb20/aWQ9JytzbG90UHJvcHMudG9kb1wiID5cclxuICAgICAgICAgICAgICAgICAgICA8cD4zMTIzIGFuZCB7e3Nsb3RQcm9wcy50b2RvfX08L3A+XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxidXR0b24gQGNsaWNrPVwiY2hhbmdlVG9kb1wiPueCueaIkeivleivlTwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4vLyBpbXBvcnQgZm9vIGZyb20gXCIuL2Zvby52dWVcIjtcclxuLy8gaW1wb3J0IGJhciBmcm9tIFwiLi9iYXIudnVlXCJcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZGF0YSgpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRUYWI6ICdmb28nLFxyXG4gICAgICAgICAgICB0YWJzOiBbJ2ZvbycsICdiYXInXSxcclxuICAgICAgICAgICAgdG9kb1Q6WzEsMl1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29tcHV0ZWQ6IHtcclxuICAgICAgICBjdXJyZW50VGFiQ29tcG9uZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRUYWIudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRzOntcclxuICAgICAgICAvLyB1ZXMge1wicGx1Z2luc1wiOiBbXCJzeW50YXgtZHluYW1pYy1pbXBvcnRcIl19XHJcbiAgICAgICAgYmFyIDogKCkgPT4gaW1wb3J0KCcuL2Jhci52dWUnKSxcclxuICAgICAgICBmb28gOiAoKSA9PiBpbXBvcnQoJy4vZm9vLnZ1ZScpLFxyXG4gICAgICAgIGRvbSA6ICgpID0+IGltcG9ydCgnLi9kb20udnVlJylcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOntcclxuICAgICAgICBjaGFuZ2VUb2RvKCl7XHJcbiAgICAgICAgICAgIHRoaXMudG9kb1QgPSBbMiwxXTtcclxuICAgICAgICAgICAgdGhpcy4kcmVmcy5yZWZULnRlc3QoKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiRyZWZzLnJlZkQpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vdW50ZWQoKXtcclxuICAgICAgY29uc29sZS5sb2codGhpcy4kcm91dGVyLmN1cnJlbnRSb3V0ZSk7XHJcbiAgICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgbGFuZz1cImxlc3NcIiBzY29wZWQ+XHJcbiAgICAudGFiLWJ1dHRvbiB7XHJcbiAgICBwYWRkaW5nOiA2cHggMTBweDtcclxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDNweDtcclxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgYmFja2dyb3VuZDogI2YwZjBmMDtcclxuICAgIG1hcmdpbi1ib3R0b206IC0xcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IC0xcHg7XHJcbiAgICB9XHJcbiAgICAudGFiLWJ1dHRvbjpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZTBlMGUwO1xyXG4gICAgfVxyXG4gICAgLnRhYi1idXR0b24uYWN0aXZlIHtcclxuICAgIGJhY2tncm91bmQ6ICNlMGUwZTA7XHJcbiAgICB9XHJcbiAgICAudGFiIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgfVxyXG48L3N0eWxlPlxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gaG9tZS52dWU/ZmRiMmE5MTAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLnRhYi1idXR0b25bZGF0YS12LTE3Y2EwZWYxXSB7XFxuICBwYWRkaW5nOiA2cHggMTBweDtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDNweDtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZDogI2YwZjBmMDtcXG4gIG1hcmdpbi1ib3R0b206IC0xcHg7XFxuICBtYXJnaW4tcmlnaHQ6IC0xcHg7XFxufVxcbi50YWItYnV0dG9uW2RhdGEtdi0xN2NhMGVmMV06aG92ZXIge1xcbiAgYmFja2dyb3VuZDogI2UwZTBlMDtcXG59XFxuLnRhYi1idXR0b24uYWN0aXZlW2RhdGEtdi0xN2NhMGVmMV0ge1xcbiAgYmFja2dyb3VuZDogI2UwZTBlMDtcXG59XFxuLnRhYltkYXRhLXYtMTdjYTBlZjFdIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XFxuICBwYWRkaW5nOiAxMHB4O1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRjov6Ieq5bex5rWL6K+V5a6ML+aJi+WKqFZ1ZemhueebruWunui3tS92dWUtY2xpL2NvbXAvaG9tZS52dWVcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLDRCQUE0QjtFQUM1Qiw2QkFBNkI7RUFDN0IsdUJBQXVCO0VBQ3ZCLGdCQUFnQjtFQUNoQixvQkFBb0I7RUFDcEIsb0JBQW9CO0VBQ3BCLG1CQUFtQjtDQUNwQjtBQUNEO0VBQ0Usb0JBQW9CO0NBQ3JCO0FBQ0Q7RUFDRSxvQkFBb0I7Q0FDckI7QUFDRDtFQUNFLHVCQUF1QjtFQUN2QixjQUFjO0NBQ2ZcIixcImZpbGVcIjpcImhvbWUudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi50YWItYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDZweCAxMHB4O1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogM3B4O1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDNweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kOiAjZjBmMGYwO1xcbiAgbWFyZ2luLWJvdHRvbTogLTFweDtcXG4gIG1hcmdpbi1yaWdodDogLTFweDtcXG59XFxuLnRhYi1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZDogI2UwZTBlMDtcXG59XFxuLnRhYi1idXR0b24uYWN0aXZlIHtcXG4gIGJhY2tncm91bmQ6ICNlMGUwZTA7XFxufVxcbi50YWIge1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9+L3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMTdjYTBlZjFcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjpmYWxzZX0hLi9+L2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdnVlLWNsaS9jb21wL2hvbWUudnVlXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ2RpdicsIFtfYygncCcsIHtcbiAgICByZWY6IFwicmVmRFwiXG4gIH0sIFtfdm0uX3YoXCJob21lIGFuZCBwYXJhbXM6IFwiICsgX3ZtLl9zKF92bS4kcm91dGUucGFyYW1zLnVzZXJJZCkpXSksIF92bS5fdihcIiBcIiksIF92bS5fbCgoX3ZtLnRhYnMpLCBmdW5jdGlvbih0YWIpIHtcbiAgICByZXR1cm4gX2MoJ2J1dHRvbicsIHtcbiAgICAgIGtleTogdGFiLFxuICAgICAgY2xhc3M6IFsndGFiLWJ1dHRvbicsIHtcbiAgICAgICAgYWN0aXZlOiBfdm0uY3VycmVudFRhYiA9PT0gdGFiXG4gICAgICB9XSxcbiAgICAgIG9uOiB7XG4gICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgX3ZtLmN1cnJlbnRUYWIgPSB0YWJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIFtfdm0uX3YoX3ZtLl9zKHRhYikpXSlcbiAgfSksIF92bS5fdihcIiBcIiksIF9jKCdrZWVwLWFsaXZlJywgW19jKF92bS5jdXJyZW50VGFiQ29tcG9uZW50LCB7XG4gICAgdGFnOiBcImNvbXBvbmVudFwiLFxuICAgIHN0YXRpY0NsYXNzOiBcInRhYlwiXG4gIH0pXSwgMSksIF92bS5fdihcIiBcIiksIF9jKFwiZG9tXCIsIHtcbiAgICByZWY6IFwicmVmVFwiLFxuICAgIHRhZzogXCJwXCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9kb1wiOiBfdm0udG9kb1RcbiAgICB9LFxuICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW3tcbiAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICBmbjogZnVuY3Rpb24oc2xvdFByb3BzKSB7XG4gICAgICAgIHJldHVybiBbX2MoJ2EnLCB7XG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIFwiaHJlZlwiOiAnaHR0cDovL3d3dy5iYWlkdS5jb20/aWQ9JyArIHNsb3RQcm9wcy50b2RvXG4gICAgICAgICAgfVxuICAgICAgICB9LCBbX2MoJ3AnLCBbX3ZtLl92KFwiMzEyMyBhbmQgXCIgKyBfdm0uX3Moc2xvdFByb3BzLnRvZG8pKV0pXSldXG4gICAgICB9XG4gICAgfV0pXG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnYnV0dG9uJywge1xuICAgIG9uOiB7XG4gICAgICBcImNsaWNrXCI6IF92bS5jaGFuZ2VUb2RvXG4gICAgfVxuICB9LCBbX3ZtLl92KFwi54K55oiR6K+V6K+VXCIpXSldLCAyKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0xN2NhMGVmMVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTE3Y2EwZWYxXCJ9IS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi92dWUtY2xpL2NvbXAvaG9tZS52dWVcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMTdjYTBlZjFcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2hvbWUudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIwZTdkYjVhZFwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMTdjYTBlZjFcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2hvbWUudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0xN2NhMGVmMVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vaG9tZS52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL34vdnVlLXN0eWxlLWxvYWRlciEuL34vY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9+L3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMTdjYTBlZjFcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjpmYWxzZX0hLi9+L2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdnVlLWNsaS9jb21wL2hvbWUudnVlXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDMiXSwic291cmNlUm9vdCI6IiJ9