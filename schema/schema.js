const graphql = require('graphql');

const UserType = require('./types/UserType')
const OrganisationType = require('./types/OrganisationType')
const SubjectType = require('./types/SubjectType');
const ContestType = require('./types/ContestType');

const User = require('../models/User');
const Organisation = require('../models/Organisation');
const Subject = require('../models/Subject');
const Contest = require('../models/Contest');

const { GraphQLObjectType,
        GraphQLID } = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            type: UserType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return User 
                        .findOne({ _id: args._id });
            } 
        },
        organisation: {
            type: OrganisationType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Organisation
                        .findOne({ _id: args._id })
            }
        },
        subject: {
            type: SubjectType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Subject 
                        .findOne({ _id: args._id })
            }
        },
        contest: {
            type: ContestType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Contest 
                        .findOne({ _id: args._id })
            }
        },
        organisations: {
            type: new graphql.GraphQLList(OrganisationType),
            resolve(parent, args) {
                return Organisation 
                        .find()
            }
        },
        subjects: {
            type: new graphql.GraphQLList(SubjectType),
            resolve(parent, args) {
                return Subject 
                        .find()
            }
        }
    })
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})