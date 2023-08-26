import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Homepage } from './pages/Homepage'
import { Single } from './pages/Single'
import { Error404 } from './pages/Error404'
// import { Mylist } from './pages/Mylist'

function App() {

  const client = new QueryClient();

  return (


    <QueryClientProvider client={client}>

      <Router basename='/video-app'>

        {/* <Header /> */}

        <main>

          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/watch/:title' element={<Single />} />
            {/* <Route path='/my-list' element={<Mylist />} /> */}
            <Route path="/*" element={<Error404 />} />
          </Routes>

        </main>

      </Router>

    </QueryClientProvider>
  )
}

export default App
