export default {
    namespaced:true,
    state: {
        userID: '995' // 
    },
    mutations: {
        changeuserID: (state, data) => {
            state.userID = data;
        }
    }
}