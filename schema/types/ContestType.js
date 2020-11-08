const graphql = require('graphql');

const { GraphQLObjectType, 
        GraphQLID, 
        GraphQLInt, 
        GraphQLString,
        GraphQLBoolean,
        GraphQLList } = graphql;

const DateType = new GraphQLObjectType({
    name: 'Date',
    fields: () => ({
        day: { type: GraphQLInt },
        month: { type: GraphQLInt },
        year: { type: GraphQLInt }
    })
})

const ContestType = new GraphQLObjectType({
    name: 'Contest',
    fields: () =>  ({
       name: { type: GraphQLString },
       description: { type: GraphQLString },
       date: { type: DateType }
    })
})

module.exports = ContestType;
