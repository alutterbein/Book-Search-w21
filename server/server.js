const express = require('express');
const path = require('path');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;
const app = express();
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');

const authMiddleware = require('./utils/auth');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
}
app.use('/graphql', expressMiddleware(server));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  console.log('USe GraphQL at http://localhost:3001/graphql');
});
});
};

startApolloServer();
