const typeDefs = `
  input BookInput {
    authors: [String]
    description: String
    title: String!
    bookId: String!
    image: String
    link: String
  }
    type Book {
        authors: [String]
        description: String
        title: String!
        bookId: String!
        image: String
        link: String
    }
type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
}
    type Auth {
    token: ID!
    user: User
}
    type Query {
        me: User
    }
        type Mutation {
            login(email: String!, password: String!): Auth
            addUser(username: String!, email: String!, pasword: String!): Auth
            saveBook(input BookInput!): User
            removeBook(bookId: String!): User
        }

    `;
    module.exports = typeDefs;