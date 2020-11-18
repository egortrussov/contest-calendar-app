const graphql = require('graphql');
const Contest = require('../../models/Contest');

const { GraphQLObjectType, 
        GraphQLID, 
        GraphQLInt, 
        GraphQLString,
        GraphQLBoolean,
        GraphQLList } = graphql;


const SubjectType = new GraphQLObjectType({
    name: 'Subject',
    fields: () =>  ({
       _id: { type: GraphQLID },
       name: { type: GraphQLString },
       contests: {
           type: new GraphQLList(ContestType),
           resolve(parent, args) {
               return Contest 
                        .find({ subject: parent._id })
           }
       }
    })
})

module.exports = SubjectType;

const ContestType = require('./ContestType')
