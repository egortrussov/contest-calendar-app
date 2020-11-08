const graphql = require('graphql');

const Organisation = require('../../models/Organisation');

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
        isTeacher: { type: GraphQLBoolean },
        isAdmin: { type: GraphQLBoolean },
        grade: { type: GraphQLInt },
        organisation: {
            type: OrganisationType,
            resolve(parent, args) {
                return Organisation 
                    .findOne({ _id: parent.organisation });
            }
        }
    })
})

module.exports = UserType;

const OrganisationType = require('./OrganisationType');