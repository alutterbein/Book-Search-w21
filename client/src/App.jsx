import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import{ ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "/graphql",
});


const authLink = setContext((_, {header}) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
     ...header,
      authorization: token? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
      <Navbar />
      <Routes>
    <Route exact path="/" component={SearchBooks} />
    <Route exact path="/saved" component={SavedBooks} />
    <Route render={() => <h1>Wrong page!</h1>} />
      </Routes>
    </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
