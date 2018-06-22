<template>
    <div>
        <p>form</p>
        <form id="form1">
            <input name="test1" type="text" autofocus>
        </form>
        <form id="form2">
            <input name="test2" type="text">
        </form>
    </div>
</template>

<script>
import { bus } from '../common/bus';
export default {
    created(){
    },
    components:{
    }
}
</script>

<style lang="less" scoped>

</style>
