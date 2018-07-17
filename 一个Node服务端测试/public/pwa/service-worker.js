//更新版本号
let version = '1.0.2';
let nowV = '';

// 安装
this.addEventListener('install', function (event) {
    // 缓存 App Shell 等关键静态资源和 html (保证能缓存的内容能在离线状态跑起来)
    console.log('执行安装')
    // event.waitUntil(
    //     // 安装成功后操作 CacheStorage 缓存，使用之前需要先通过 caches.open() 打开对应缓存空间。
    //     caches.open('my-test-cache-v1').then(function (cache) {
    //         // 通过 cache 缓存对象的 addAll 方法添加 precache 缓存
    //         return cache.addAll([
    //             '//localhost:3010/pwa/?name=featch/featch',
    //             '/img/front.png'
    //         ]);
    //     })
    // );静态缓存
    event.waitUntil(self.skipWaiting());
});
/*
/sw.js 控制着页面资源和请求的缓存，那么如果缓存策略需要更新呢？也就是如果 /sw.js 有更新怎么办？/sw.js 自身该如何更新？

如果 /sw.js 内容有更新，当访问网站页面时浏览器获取了新的文件，逐字节比对 /sw.js 文件发现不同时它会认为有更新启动 更新算法，
于是会安装新的文件并触发 install 事件。但是此时已经处于激活状态的旧的 Service Worker 还在运行，新的 Service Worker 完成安装后会进入 waiting 状态。
直到所有已打开的页面都关闭，旧的 Service Worker 自动停止，新的 Service Worker 才会在接下来重新打开的页面里生效。

自动更新所有页面

如果希望在有了新版本时，所有的页面都得到及时自动更新怎么办呢？可以在 install 事件中执行 self.skipWaiting() 方法跳过 waiting 状态，
然后会直接进入 activate 阶段。接着在 activate 事件发生时，通过执行 self.clients.claim() 方法，更新所有客户端上的 Service Worker。
*/
self.addEventListener('activate', function (event) {
    console.log('激活sw,更新缓存')
    event.waitUntil(
        Promise.all([

            // 更新客户端
            self.clients.claim(),

            // 清理旧版本
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        console.log(cacheName, 3);
                        // if (cacheName !== 'my-test-cache-v1') {
                        //     return caches.delete(cacheName);
                        // } 
                        if(version != nowV){
                            nowV = version;
                            //服务端手动更新用户的服务缓存
                            return caches.delete('my-test-cache-v1');
                        }
                    })
                );
            })
        ])
    );
});
this.addEventListener('fetch', function (event) {
    console.log(nowV, '当前版本号');

    if (event.request.method === "POST") {
        console.log('经过了fetch的post')
        return;
    }
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // 来来来，代理可以搞一些代理的事情 ， 每一次install response都会被清空，因为版本号的变更导致删除了caches里面的标识
            console.log(response, '请求回来得到的值，他的方法都是Promise函数')
            // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
            var request = event.request.clone();
            if (response) {
                return response;
            }

            // 如果 service worker 没有返回，那就得直接请求真实远程服务
            // 把原始请求拷过来
            return fetch(request).then(function (httpRes) {

                // http请求的返回已被抓到，可以处置了。

                // 请求失败了，直接返回失败的结果就好了。。
                if (!httpRes || httpRes.status !== 200) {
                    return httpRes;
                }

                // 请求成功的话，将请求缓存起来。
                var responseClone = httpRes.clone();
                caches.open('my-test-cache-v1').then(function (cache) {
                    cache.put(event.request, responseClone);
                });//动态缓存
                return httpRes;
            });
        })
    );
});