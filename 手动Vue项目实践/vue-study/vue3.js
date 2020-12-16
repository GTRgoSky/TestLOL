import { ref } from "@vue/composition-api";

export function useName() {
    let name = ref('my name is vue3');

    function changeName(val) {
        name.value += val
    }
    return [name, changeName];
}