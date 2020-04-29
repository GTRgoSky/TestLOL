<script>
export default {
    data() {
        return {
            testhhh: 123,
            iv: 555
        };
    },
    components: {
        foo: () => import("./foo.vue")
    },
    render(h) {
        return (
            <div>
                <foo></foo>
                用render测试 + {this.testhhh}
                <input v-model={this.iv} />
                <div onClick={this.testF}>点我测试点击</div>
            </div>
        );
    },
    methods: {
        testF() {
            alert("ok");
        }
    }
};
</script>

<style>
</style>