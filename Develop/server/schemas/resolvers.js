const { User, Book } = require("./models");
const { signToken } = require("./utils/auth");
const resolvers = {
    Query: {
        me:async (parent, args, context) => {
            console.log(context.user);
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            } throw new Error("user not found");
            
        },
    },
    Mutation: {

        // login mutation
        login: async (parent, args) => {
            const user = await User.findOne({ email: args.email });
            if (!user) {
                throw new Error("user not found");
            }
            const correctPw = await user.isCorrectPassword(args.password);
            console.log(!iscorrectPw);
            if (!correctPw) {
                throw new Error("incorrect password");
            }
            const token = signToken(user);
            return { token, user };
        },
        // add user mutation 
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
    },
    // save book mutation returning user type
    saveBook: async (parent, args, context) => {
        if (context.user) {
            const user = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: args.bookId } },
                { new: true }
            );
            return user;
        } throw new Error("user not found");
    },
    removeBook: async (parent, args, context) => {
        if (context.user) {
            const user = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: args.bookId } },
                { new: true }
            );
            return user;
        } throw new Error("user not found");
    },


    },
};
module.exports = resolvers;