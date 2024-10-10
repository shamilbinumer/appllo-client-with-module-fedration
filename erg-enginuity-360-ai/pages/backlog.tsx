import React from 'react'
import dynamic from 'next/dynamic'

const BacklogData = dynamic(() => import('erg_product_backlog_management/BacklogData'), { ssr: false });

const BacklogPage = () => {
  return (
    <div>
      <BacklogData/>
    </div>
  )
}

export default BacklogPage
