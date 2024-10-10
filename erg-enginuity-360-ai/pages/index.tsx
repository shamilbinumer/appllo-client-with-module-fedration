"use client"; // Ensure to enable client-side rendering
import React from 'react';
import dynamic from 'next/dynamic';
import { gql, useQuery } from '@apollo/client';
import { initializeApollo } from '../apolloClient'; // Apollo client initialization
import Link from 'next/link'; // Import Link for navigation

// Define the GraphQL query to fetch backlog data
const GET_BACKLOG_ITEMS = gql`
  query GetBacklog {
    backlog {
      backlog_item_id
      title
      description
      assignee
      created_date
      status
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_BACKLOG_ITEMS);

  if (loading) return <p>Loading backlog data...</p>;
  if (error) {
    console.error('Error loading backlog items:', error);
    return <p>Error loading backlog data: {error.message}</p>;
  }

  return (
    <div>
      {/* <Navbar /> */}
      <h1>This Is Master Zone</h1>

      <h2>Backlog Items:</h2>
      <ul>
        {data.backlog.map((item) => (
          <li key={item.backlog_item_id}>
            <strong>{item.title}</strong> - {item.description} (Assigned to: {item.assignee})
          </li>
        ))}
      </ul>

      <Link href="/backlog">
        Go to Backlog
      </Link>
    </div>
  );
};

// Initialize Apollo Client for SSR
export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: GET_BACKLOG_ITEMS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Home;
