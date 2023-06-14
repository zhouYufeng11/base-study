import {
	reactive,
	watch,
	watchEffect,
	computed
} from './mine/index.js';

const state1 = reactive({
	a: 1,
	b: {
		c: 2
	}
});

//	访问state1.a
watchEffect(() => console.log('watchEffect -> state1.a', state1.a));

watchEffect(() => console.log('watchEffect -> state1.b.c', state1.b.c));

const res1 = computed(() => state1.a + state1.b.c);

state1.a = 10;
console.log(res1.value);