import './App.css';
import { Outlet } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import{ ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const authLink = setContext((_, {header}) =>{
  return {
    headers: {
     ...header,
      authorization: token? `Bearer ${token}` : "",
    }
  };
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
      <Navbar />
      {/* may need this..... <Outlet /> */}
      <Switch>
    <Route exact path="/" component={SearchBooks} />
    <Route exact path="/saved" component={SavedBooks} />
    <Route render={() => <h1>Wrong page!</h1>} />
      </Switch>
    </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
