const graphql = require('graphql');

const UserType = require('./types/UserType')
const OrganisationType = require('./types/OrganisationType')

const User = require('../models/User');
const Organisation = require('../models/Organisation');

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
        }
    })
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})