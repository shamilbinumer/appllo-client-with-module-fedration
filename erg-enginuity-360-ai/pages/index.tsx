"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { gql, useQuery } from '@apollo/client';
import { initializeApollo } from '../apolloClient'; // Apollo client initialization

// Dynamically import your components (without server-side rendering)
const Backlog = dynamic(() => import('erg_product_backlog_management/Backlog'), { ssr: false });
const Resorec = dynamic(() => import('erg_resource_management/Resorec'), { ssr: false });
const Navbar = dynamic(() => import('shared_ui/Navbar'), { ssr: false });

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
  // Use useQuery directly without passing client
  const { loading, error, data } = useQuery(GET_BACKLOG_ITEMS);

  if (loading) return <p>Loading backlog data...</p>;
  if (error) {
    console.error('Error loading backlog items:', error);
    return <p>Error loading backlog data: {error.message}</p>;
  }

  return (
    <div>
      <Navbar />
      <h1>This Is Master Zone</h1>

      <h2>Backlog Items:</h2>
      <ul>
        {data.backlog.map((item) => (
          <li key={item.backlog_item_id}>
            <strong>{item.title}</strong> - {item.description} (Assigned to: {item.assignee})
          </li>
        ))}
      </ul>

      <Backlog />
      <Resorec />

      <a href="/backlog">Go to backlog</a>
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
