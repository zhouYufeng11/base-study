import Index from '../view/index.js';
import Detail from '../view/detail.js';

export function IndexView() {
	const html = Index([
		{id: 1, name: 2}
	]);

	return html;
}	

export function DetailView() {
	const html = Detail();

	return html;
}

export function addTodo() {

}

export function deleteTodo() {

}

export function modifyTodo() {
	
}

