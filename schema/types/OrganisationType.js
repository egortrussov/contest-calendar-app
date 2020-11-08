const graphql = require('graphql');

const User = require('../../models/User');

const { GraphQLObjectType, 
        GraphQLID, 
        GraphQLInt, 
        GraphQLString,
        GraphQLBoolean,
        GraphQLList } = graphql;


const OrganisationType = new GraphQLObjectType({
    name: 'Organisation',
    fields: () =>  ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        members: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User 
                        .find({ _id: { $in: parent.members } })
            }
        }
    })
})

module.exports = OrganisationType;

const UserType = require('./UserType');