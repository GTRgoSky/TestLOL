<template>
    <div id="test">666</div>
    <teleport to="#teleportTemplate">我是一个插入的底部</teleport>
    <div>复用API：ref: {{newFolderName}}</div>
    <div>newFolderObj: {{newFolderObj}}</div>
    <div>newFolderArray: {{newFolderArray}}</div>
    <div>newFolderObj2: {{newFolderObj2}}</div>
    <div>newFolderObj3: {{newFolderObj3}}</div>
    <div>reactive_obj: {{state._obj}}</div>
    <div>reactive_obj2: {{state._obj2}}</div>
    <div>reactive_array {{state._array}}</div>
    <div>_array2: {{_array2}}</div>
    <button
        @click="increment"
    >Count is: {{ state.count }}, double is: {{ state.double }}, function is {{ket}}</button>
    <Suspense>
        <template #default>
            <HelloWorld />
        </template>
        <template #fallback>Loading...</template>
    </Suspense>
</template>

<script>
import {
    reactive,
    computed,
    watchEffect,
    onMounted,
    ref,
    defineAsyncComponent,
} from "vue";
// import HelloWorld from "./HelloWorld.vue";
// onRenderTracked // 渲染跟踪
// onRenderTriggered - // 检查哪个依赖性导致组件重新渲染
export default {
    components: {
        HelloWorld: defineAsyncComponent({
            loader: () => {
                return new Promise((r, j) => {
                    try {
                        setTimeout(() => {
                            r(import("./HelloWorld.vue"));
                        }, 2000);
                    } catch (e) {
                        j(e);
                    }
                });
            },
            delay: 0,
            timeout: 3000,
        }),
    },
    setup(props, vm) {
        console.log(vm);
        // setup(props, vm) props/实例
        // state 现在是一个响应式的状态
        // reactive 几乎等价于 2.x 中现有的 Vue.observable()
        // 这里返回的 state 是一个所有 Vue 用户都应该熟悉的响应式对象。
        let _obj = {
            a: 1,
            b: {
                c: 2,
            },
        };
        const state = reactive({
            count: 0,
            double: computed(() => state.count * 2),
            _obj: _obj,
            _obj2: _obj,
            _array: [1, { a: 2 }],
        });

        const _array2 = ref([1, { a: 2 }]);

        // watch(
        //     [() => state._array, _array2],
        //     [
        //         (n, o) => {
        //             console.log("_array", n, o);
        //         },
        //         (n, o) => {
        //             console.log("_array2", n, o);
        //         },
        //     ]
        // );

        // watch(_array2, (n, o) => {
        //     console.log("_array2", n, o);
        // });

        const useFolder = useCreateFolder();
        const userParam = userParams(state);

        onMounted(() => {
            console.log("component is mounted!");
        });

        // watchEffect 应该接收一个应用预期副作用 (这里即设置 innerHTML) 的函数
        // 副作用：在 DOM 当中渲染内容会被视为一种“副作用
        // state.count 会在首次执行后作为依赖被追踪。当 state.count 未来发生变更时，里面这个函数又会被重新执行。
        // watchEffect 在组件更新后执行副作用。
        /*第二个参数：
            flush： post-更新后执行，sync同步执行，pre-更新前执行
            // 下面的 仅在开发模式下生效
            onTrack () => void - 当一个 reactive 对象属性或一个 ref 作为依赖被追踪时
            onTrigger () => void 依赖项变更导致副作用被触发时
        */
        watchEffect(() => {
            let str = `count is ${state.count}`;
            if (document.getElementById("test"))
                document.getElementById("test").innerHTML = str;
        });

        function increment() {
            state.count++;
            useFolder.createFolder(8);
            useFolder.clickBtnAndHandle();
            //如果这样操作会改变_obj的值 影响 _obj2
            state._obj.b.c = { c: 111 };
            // 如果如下操作不影响_obj  不影响 _obj2
            // state._obj = { c: 111 };
            // push, [0] = xxx, [1].a = xxx, splice, pop等array方法都无效
            state._array = [1, 2, 4];
            // _array2.value.push(123);
            _array2.value = [1, 2, 3];
            userParam.add();
            // userParam.ket.value++;
        }

        // 调用api暴露的函数
        useFolder.createFolder(9);

        // return 语句作为单一出口确认暴露给模板的内容。
        return {
            state,
            increment,
            _array2,
            ...useFolder,
            ...userParam,
        };
    },
};

function useCreateFolder() {
    // 原来的数据 property 创建一个响应对象 obj.value
    const showNewFolder = ref(false);
    const newFolderName = ref("");
    const newFolderObj = ref({ a: 123, b: { c: 555 } });
    // Array 可见听方法测试 push：true；直接用array[0] = x替换：true
    const newFolderArray = ref([{ a: 123, b: 456 }, 2, null]);
    let _obj = { a: 123, b: { c: 456 } };
    const newFolderObj2 = ref(_obj);
    const newFolderObj3 = ref(_obj);

    // 原来的计算属性
    const newFolderValid = computed(() => (newFolderName.value ? 4 : 6));

    // 原来的一个方法
    async function createFolder(openFolder) {
        // console.log(newFolderValid, newFolderValid.value);
        // 给ref赋值
        newFolderName.value = openFolder + newFolderValid.value;
        showNewFolder.value = false;
    }

    // click处理
    function clickBtnAndHandle() {
        newFolderObj.value.b.c = 777;
        newFolderArray.value[1] = 888;
        // 如果如下操作不影响_obj,不影响 newFolderObj3
        // newFolderObj2.value = { c: 111 };
        //如果这样操作会改变_obj的值 影响 newFolderObj3
        // newFolderObj2.value.b.c = 888;
    }

    return {
        showNewFolder,
        newFolderName,
        newFolderValid,
        createFolder,
        clickBtnAndHandle,
        newFolderObj,
        newFolderArray,
        newFolderObj2,
        newFolderObj3,
    };
}

function userParams(params) {
    // 这个params将不会与ket关联,而是创建了一个新的对象
    let ket = ref(params.count);
    function add() {
        ket.value++;
        // 而这个则会双向绑定state
        // params.count++;
    }
    return {
        add,
        ket, // 在setUp中直接操作ket也会改变,所以导出的是一个引用类型
        // params,
    };
}
</script>
