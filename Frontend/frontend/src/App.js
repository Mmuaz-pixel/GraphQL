import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home';
import SingleProject from './Pages/SingleProject'
import NotFound from './Pages/NotFound';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//  the provided code configures the cache to replace existing cached data for the clients field with new data fetched from the server whenever a query is executed. instead of merging
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
})

const client = new ApolloClient(
  {
    uri: 'http://localhost:5000/graphql',
    cache: cache
  }
)

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header></Header>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/projects/:id' element={<SingleProject/>}></Route>
              <Route path='*' element={<NotFound/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;