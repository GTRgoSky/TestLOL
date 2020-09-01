#### 异步加载组件

```javascript
// html
<Suspense>
    <template #default>
        <AsyncFooWithOptions />
    </template>
    <template #fallback>Loading...</template>
</Suspense>

// js
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
    AsyncFooWithOptions: defineAsyncComponent({
        loader: () => import("./FAsyncFooWithOptionsoo.vue"),
        delay: 200,
        timeout: 3000
    })
}
```

#### 关于 ref 和 reactive :

虽然 ref 既可以传入基本属性,也可以传入对象.但是一般用作处理基本属性,并使该基本属性被监听.(方式是将基本属性作为 Object 包裹后返回).
reactive 一般用作创建响应式对象
ref 可以用在 reactive 中

```javascript
// state.count == 0
const state = reactive({
	count: 0,
	double: computed(() => state.count * 2), // computed就是一个ref对象
});

const showNewFolder = ref(false); // showNewFolder.value = false
const newFolderName = ref('');
```
