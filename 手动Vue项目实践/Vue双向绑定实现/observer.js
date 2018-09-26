function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        var me = this;
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
        this.defineReactive(this.data, key, val);
    },

    defineReactive: function(data, key, val) {
        var dep = new Dep();
        var childObj = observe(val);

        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;//此时，data上的值已经进行了更新，剩下的就是找到对应DOM进行更新
                // 新的值是object的话，进行监听（即递归监听到最底层属性，如果不是对象，则return空，可忽视）
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;//data对象里每一个子对象都会创建对应id，防止重复添加watcher
    this.subs = [];//里面存储的都是实例化的watch
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);//将watch实例放入数组
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();//订阅者执行watch上的方法
        });
    }
};

Dep.target = null;

module.exports = {
    Dep : Dep,

    observe : observe
}
