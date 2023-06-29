export default function SearchInput({
	                                    $target,
	                                    initialState,
	                                    onChange
                                    }) {
	this.$element = document.createElement('form')
	this.$element.className = "SearchInput"
	this.$element.addEventListener('submit', (e) => {
		e.preventDefault()
	})// 엔터키 눌러도 submit 처리 되지 않게

	this.state = initialState

	$target.appendChild(this.$element)

	this.render = () => {
		this.$element.innerHTML = `
      <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value="${this.state}" autofocus>
      `
	}

	this.render()

	this.$element.addEventListener('keyup',(e) => {

	})

	this.$element.addEventListener('keyup',handleDebounce((e) => {
		const actionIgnoreKeys = ['Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
		if(!actionIgnoreKeys.includes(e.key)){
			onChange(e.target.value);
		}
	},500))

}

const handleDebounce = (callback, limit) => {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			callback.apply(this, args);
		}, limit)
	}
}