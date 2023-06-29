import { fetchLanguages } from './api/api.js'
import SearchInput from './js/searchInput.js'
import Suggestion from './js/suggestion.js'
import SelectedLanguage from './js/selectedLanguage.js'

export default function App({ $target }) {
	this.state = {
		fetchedLanguages: [],
		selectedLanguages: [],
		keyword: '',
	}

	this.setState = (nextState) => {
		this.state = {
			...this.state,
			...nextState
		}
		suggestion.setState({
			selectedIndex:0,
			items: this.state.fetchedLanguages,
			keyword: this.state.keyword
		})
		selectedLanguages.setState(this.state.selectedLanguages)
	}

	const selectedLanguages = new SelectedLanguage({
		$target,
		initialState : []
	})

	new SearchInput({
		$target,
		initialState: '',
		onChange : async (keyword) => {
			if(keyword.length === 0){
				this.setState({
					keyword : '',
					fetchedLanguages : [],
				})
			}else{
				const languages = await fetchLanguages(keyword)
				this.setState({
					fetchedLanguages: languages,
					keyword : keyword
				})
			}
		}
	})

	const suggestion = new Suggestion({
		$target,
		initialState: {
			cursor: 0,
			items : [],
			keyword : '',
		},
		onSelect:(lang) => {
			alert(lang)

			const nextSelectedLanguages = [...this.state.selectedLanguages]
			const index = nextSelectedLanguages.findIndex((selectedLanguage) => selectedLanguage === lang)
			if(index > -1){
				nextSelectedLanguages.splice(index,1)
			}
			nextSelectedLanguages.push(lang)

			this.setState({
				...this.state,
				selectedLanguages: nextSelectedLanguages
			})
		}
	})
}