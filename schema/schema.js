const graphql = require('graphql');

const UserType = require('./types/UserType')
const OrganisationType = require('./types/OrganisationType')
const SubjectType = require('./types/SubjectType');
const ContestType = require('./types/ContestType');
const DateType = require('./types/DateType');

const User = require('../models/User');
const Organisation = require('../models/Organisation');
const Subject = require('../models/Subject');
const Contest = require('../models/Contest');

const { GraphQLObjectType,
        GraphQLID,
        GraphQLList,
        GraphQLString,
        GraphQLInt } = graphql;

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
        contests: {
            type: new GraphQLList(ContestType),
            args: {
                searchType: {
                    type: graphql.GraphQLString,
                    defaultValue: null
                },
                contestId: {
                    type: GraphQLID,
                    defaultValue: null
                },
                contestsIDs: {
                    type: new GraphQLList(GraphQLID),
                    defaultValue: null
                },
                subject: {
                    type: graphql.GraphQLID,
                    defaultValue: null
                },
                grade: {
                    type: graphql.GraphQLInt,
                    defaultValue: null
                },
                day: {
                    type: GraphQLInt,
                    defaultValue: null
                },
                month: {
                    type: GraphQLInt,
                    defaultValue: null
                },
                year: {
                    type: GraphQLInt,
                    defaultValue: null
                }
            },
            resolve(parent, args) {
                const { searchType } = args;

                let query = {};


                if (args.contestId) 
                    query._id = args.contestId;
                else if (args.contestsIDs) 
                    query._id = { $in: args.contestsIDs };
                
                if (args.subject)
                    query.subject = args.subject;
                if (args.grade)
                    query.grade = args.grade;
                
                if (args.day)
                    query['date.day'] = args.day;
                if (args.month)
                    query['date.month'] = args.month;
                if (args.year)
                    query['date.year'] = args.year;
                
                return Contest.find(query)
            }
        },
        organisations: {
            type: new GraphQLList(OrganisationType),
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