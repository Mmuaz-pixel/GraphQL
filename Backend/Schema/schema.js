const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql');

// importing mongoose models

const Projects = require('../Models/Projects');
const Clients = require('../Models/Clients');

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

const ProjectsType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Clients.findById(parent.clientId);
            }
        },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
            type: new GraphQLEnumType({
                name: 'ProjectStatus', // Name follows the naming pattern
                values: {
                    NotStarted: {
                        value: 'Not started'
                    },
                    InProgress: {
                        value: 'In Progress'
                    },
                    Completed: {
                        value: 'Completed'
                    }
                }
            }),
            defaultValue: 'Not started'
        }
    })
});

// Queries

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Clients.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Clients.findById(args.id);
            }
        },
        projects: {
            type: new GraphQLList(ProjectsType),
            resolve(parent, args) {
                return Projects.find();
            }
        },

        project: {
            type: ProjectsType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Projects.findById(args.id);
            }
        }
    }
});

// Muttations 

const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient:
        {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                const client = await Clients.create({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })
                return client;
            }
        },
        deleteClient:
        {
            type: ClientType,
            args:
            {
                id: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            async resolve(parent, args) {
                const client = Clients.findByIdAndDelete(args.id)
                return client;
            }
        },

        // Adding a project 

        addProject:
        {
            type: ProjectsType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjStatus",
                        values:
                        {
                            'Notstarted': {
                                value: 'Not started'
                            },
                            'InProgress': {
                                value: 'In Progress'
                            },
                            'Completed': {
                                value: 'Completed'
                            }
                        }
                    }),
                    defaultValue: 'Not started'
                },
                clientId: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },

            resolve(parent, args) {
                const project = Projects.create({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                })

                return project;
            }
        },

        deleteProject:
        {
            type: ProjectsType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                const proj = await Projects.findByIdAndDelete(args.id);
                return proj;
            }
        },

        updateProject: {
            type: ProjectsType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: "UpdateStatus",
                        values:
                        {
                            'Notstarted': {
                                value: 'Not started'
                            },
                            'InProgress': {
                                value: 'In Progress'
                            },
                            'Completed': {
                                value: 'Completed'
                            }
                        }
                    })
                },
                clientId: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            async resolve(parent, args) {
                const updatedProj = await Projects.findByIdAndUpdate(
                    args.id,
                    {
                        $set:
                        {
                            name: args.name,
                            description: args.description,
                            status: args.status, 
                            clientId: args.clientId
                        }

                    }, { new: true }
                )
                return updatedProj;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});
