import IndexBooks from "./books/IndexBooks"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<h2>Bookmark v0.75</h2>
			<IndexBooks />
		</>
	)
}

export default Home
