<template>
    <div>
        <h2>文件分块上传测试</h2>
        <div>
            <input type="file" @change="handleFileChange" />
            <button @click="handleUpload">点击上传</button>
            <button @click="mergeRequest">合并</button>
        </div>
        <div>
            <h4>进度</h4>
            <p v-for="item in data" :key="item.hash">
                <label for>文件大小</label>
                {{Math.ceil(item.chunk.size / 1024)}} KB
                ---
                <label>文件进度</label>
                {{item.percentage}} %
            </p>
        </div>
    </div>
</template>

<script>
const LENGTH = 10; // 切片数量
export default {
    name: "uploadFile",
    data() {
        return {
            container: {
                file: null,
                fileLength: null
            },
            data: []
        };
    },
    created() {},
    methods: {
        handleFileChange(e) {
            const [file] = e.target.files;
            if (!file) return;
            Object.assign(this.$data, this.$options.data());
            this.container.file = file;
        },
        // 生成文件切片
        createFileChunk(file, length = LENGTH) {
            const fileChunkList = [];
            const chunkSize = Math.ceil(file.size / length);
            let cur = 0;
            while (cur < file.size) {
                fileChunkList.push({ file: file.slice(cur, cur + chunkSize) });
                cur += chunkSize;
            }
            return fileChunkList;
        },
        // 上传切片
        async uploadChunks() {
            const requestList = this.data
                .map(({ chunk, hash, index }) => {
                    const formData = new FormData();
                    formData.append("chunk", chunk);
                    formData.append("hash", hash);
                    formData.append("filename", this.container.file.name);
                    return { formData, index };
                })
                .map(async ({ formData, index }) => {
                    return this.request({
                        url: "http://localhost:8855/chunkfile",
                        // url: "http://localhost:8855/merge",
                        data: formData,
                        onProgress: this.createProgressHandler(this.data[index])
                    });
                });
            await Promise.all(requestList).then(res => {
                console.log(res);
                this.mergeRequest();
            }); // 并发切片
        },
        async handleUpload() {
            if (!this.container.file) return;
            const fileChunkList = this.createFileChunk(this.container.file);
            this.container.hash = await this.calculateHash(fileChunkList);
            const { shouldUpload } = await this.verifyUpload(
                this.container.file.name,
                this.container.hash
            );
            if (!shouldUpload) {
                alert("秒传：上传成功");
                return;
            }
            this.data = fileChunkList.map(({ file }, index) => ({
                fileHash: this.container.hash,
                chunk: file,
                index,
                hash:
                    (this.container.hash || this.container.file.name) +
                    "-" +
                    index, // 文件名 + 数组下标
                percentage: 0
            }));
            await this.uploadChunks();
        },
        request({
            url,
            method = "post",
            data,
            headers = {},
            onProgress = e => e,
            requestList
        }) {
            return new Promise((resolve, rejcet) => {
                const xhr = new XMLHttpRequest();
                xhr.upload.onprogress = onProgress;
                xhr.open(method, url);
                Object.keys(headers).forEach(key =>
                    xhr.setRequestHeader(key, headers[key])
                );
                xhr.send(data);
                xhr.onload = e => {
                    resolve({
                        data: e.target.response
                    });
                };
            });
        },
        async mergeRequest() {
            await this.request({
                url: "http://localhost:8855/merge",
                headers: {
                    "content-type": "application/json"
                },
                data: JSON.stringify({
                    filename: this.container.file.name
                })
            });
        },
        createProgressHandler(item) {
            console.log(item);
            return e => {
                item.percentage = parseInt(String((e.loaded / e.total) * 100));
            };
        },
        // 生成文件 hash（web-worker）
        calculateHash(fileChunkList) {
            return new Promise(resolve => {
                // 添加 worker 属性
                this.container.worker = new Worker("./hash.js");
                this.container.worker.postMessage({ fileChunkList });
                this.container.worker.onmessage = e => {
                    const { percentage, hash } = e.data;
                    this.hashPercentage = percentage;
                    if (hash) {
                        resolve(hash);
                    }
                };
            });
        },
        async verifyUpload(filename, fileHash) {
            const { data } = await this.request({
                url: "http://localhost:8855/verify",
                headers: {
                    "content-type": "application/json"
                },
                data: JSON.stringify({
                    filename,
                    fileHash
                })
            });
            return JSON.parse(data);
        }
    }
};
</script>
