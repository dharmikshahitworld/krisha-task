import { Giphy } from './components/giffy/Giphy'
import './App.scss'

function App() {
  // async function getGiphyImages() {
  //   return await axios
  //     .get(
  //       `https://api.giphy.com/v1/gifs/search?api_key=Lw2BlSOVmFK779wjpyJn03gciTLQ2E4g&q=cheeseburgers`
  //     )
  //     .then((response) => console.log(response.data.data[0]))
  //     .catch((error) => {
  //       throw error
  //     })
  // }

  return (
    <div className='App'>
      <Giphy />
    </div>
  )
}

export default App
