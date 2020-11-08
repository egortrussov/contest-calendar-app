const graphql = require('graphql');

const { GraphQLObjectType, 
        GraphQLID, 
        GraphQLInt, 
        GraphQLString,
        GraphQLBoolean,
        GraphQLList } = graphql;


const SubjectType = new GraphQLObjectType({
    name: 'Subject',
    fields: () =>  ({
       name: { type: GraphQLString }
    })
})

module.exports = SubjectType;
