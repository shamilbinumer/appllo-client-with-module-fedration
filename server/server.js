const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');

// Read the backlog data from the JSON file
const backlog = JSON.parse(fs.readFileSync('./mockData.json', 'utf-8')).backlog;

// Define the schema
const schema = buildSchema(`
  type BacklogItem {
    backlog_item_id: Int
    feature_id: Int
    title: String
    description: String
    assignee: String
    created_date: String
    status: String
  }

  type Query {
    backlog: [BacklogItem]
    backlogItem(backlog_item_id: Int!): BacklogItem
    backlogByAssignee(assignee: String!): [BacklogItem]
  }

  type Mutation {
    addBacklogItem(title: String!, description: String!, assignee: String!, status: String!): BacklogItem
  }
`);

// Define the resolvers
const root = {
  backlog: () => {
    return backlog;
  },
  backlogItem: ({ backlog_item_id }) => {
    return backlog.find(item => item.backlog_item_id === backlog_item_id);
  },
  backlogByAssignee: ({ assignee }) => {
    return backlog.filter(item => item.assignee === assignee);
  },
  addBacklogItem: ({ title, description, assignee, status }) => {
    const lastBacklogItem = backlog[backlog.length - 1];
    const newBacklogItem = {
      backlog_item_id: lastBacklogItem ? lastBacklogItem.backlog_item_id + 1 : 1, // Auto-increment logic
      feature_id: lastBacklogItem ? lastBacklogItem.feature_id + 1 : 1,            // Auto-increment logic
      title: title,
      description: description,
      assignee: assignee,
      created_date: new Date().toISOString().slice(0, 10), // Set current date
      status: status,
    };

    backlog.push(newBacklogItem);  // Add the new item to the backlog array

    // Optionally write the updated backlog to a file (if you want to persist data)
    fs.writeFileSync('./mockData.json', JSON.stringify({ backlog }), 'utf-8');

    return newBacklogItem;
  }
};

// Set up the Express app and middleware
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});
