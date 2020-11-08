const graphql = require('graphql');

const { GraphQLObjectType, 
        GraphQLID, 
        GraphQLInt, 
        GraphQLList,
        GraphQLString,
        GraphQLBoolean } = graphql;



const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () =>  ({
        _id: { type: GraphQLID },
        fullName: { type: GraphQLString },
        organisation: { type: GraphQLString },
        isTeacher: { type: GraphQLBoolean },
        isAdmin: { type: GraphQLBoolean },
        grade: { type: GraphQLInt }
        // featuredContests: {  }
    })
})

module.exports = UserType;