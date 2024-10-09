import React from 'react'
import dynamic from 'next/dynamic';

// Dynamically import the Backlog component from the third app (erg_product_backlog_management)
const Resorec = dynamic(() => import('erg_resource_management/Resorec'), { ssr: false });

const Home = () => {
  return (
    <div className='text-red-400'>
      this is home page
      <Resorec/>
    </div>
  )
}

export default Home
