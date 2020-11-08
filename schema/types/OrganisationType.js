const graphql = require('graphql');

const { GraphQLObjectType, 
        GraphQLID, 
        GraphQLInt, 
        GraphQLList,
        GraphQLString,
        GraphQLBoolean } = graphql;

const OrganisationType = new GraphQLObjectType({
    name: 'Organisation',
    fields: () =>  ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString }
        // featuredContests: {  }
    })
})

module.exports = OrganisationType;