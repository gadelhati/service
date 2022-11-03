import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Service } from './components/service'
import { MilitaryList } from './components/military.list'

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="App">
			<MilitaryList></MilitaryList>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src="/vite.svg" className="logo" alt="Vite logo" />
				</a>
				<a href="https://reactjs.org" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Creuza</h1>
			<p className="read-the-docs">
				Nossa detalhista virtual
			</p>
		</div>
	)
}

export default App
