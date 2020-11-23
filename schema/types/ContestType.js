const graphql = require('graphql');

const Subject = require('../../models/Subject');
const User = require('../../models/User');

const DateType = require('./DateType')

const { GraphQLObjectType, 
        GraphQLID, 
        GraphQLInt, 
        GraphQLString,
        GraphQLBoolean,
        GraphQLList } = graphql;

const ContestType = new GraphQLObjectType({
    name: 'Contest',
    fields: () =>  ({
       _id: { type: GraphQLID },
       name: { type: GraphQLString },
       description: { type: GraphQLString },
       date: { type: DateType },
       website: { type: GraphQLString },
       subject: {
           type: SubjectType,
           resolve(parent, args) {
               return Subject 
                        .findOne({ _id: parent.subject })
           }
       },
       createdBy: {
           type: UserType,
           resolve(parent, args) {
               return User 
                        .findOne({ _id: parent.createdBy })
           }
       }
    })
})

module.exports = ContestType;

const SubjectType = require('./SubjectType')
const UserType = require('./UserType')
