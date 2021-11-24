import './App.css';
import { useState } from 'react'

// A function to make requests to our Workers API using a query
const getImages = async query => {
  // The base URL for our API
  const url = "https://serverless-auth.easyauth.workers.dev"

  const resp = await fetch(url, {
    // Send a POST request
    method: "POST",
    // With a JSON-stringified body containing the query from our input
    body: JSON.stringify({ query }),
    // Set the `Content-type` header so our API knows that the request
    // is sending JSON
    headers: { 'Content-type': 'application/json' }
  })
  return resp.json()
}

function App() {
  // Store the query that we'll search for in a simple useState hook
  const [query, setQuery] = useState("")
  // Store the array of images from the API in an array
  const [images, setImages] = useState([])

  // When the search button is clicked, make a request to the API
  // and set the response from it as our images array
  const search = async () => {
    const results = await getImages(query)
    setImages(results)
  }

  // When input#query changes, set query to the value of the input 
  const updateQuery = evt => setQuery(evt.target.value)

  return (
    <div className="App">
      <div class="form">
        <input id="query" type="text" onChange={updateQuery} placeholder="Search query" />
        <button onClick={search}>Search</button>
      </div>

      {/* Map through the array of images and render a set of images */}
      {images.map(image =>
        <a key={image.id} href={image.link} target="_blank">
          <img src={image.image} />
        </a>
      )}
    </div>
  );
}

export default App;