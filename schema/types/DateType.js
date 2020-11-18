const graphql = require('graphql');

const { GraphQLObjectType, 
        GraphQLInt} = graphql;

const DateType = new GraphQLObjectType({
    name: 'Date',
    fields: () => ({
        day: { type: GraphQLInt },
        month: { type: GraphQLInt },
        year: { type: GraphQLInt }
    })
})

module.exports = DateType