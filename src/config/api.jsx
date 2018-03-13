const base = 'https://cnodejs.org/api/v1/'

const api = {
	GET_TOPICS: 'topics'
}

export default function getPath(key){
	return base + api[key];
}