import React from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import UpdatePassword from '../../../components/UpdatePassword'
import { useRouter } from 'next/router';
const Reset = () => {
  const router=useRouter()
  return (
    <div>
      <Navbar/>
      <UpdatePassword id={router.query.id} token={router.query.token} />
      <Footer/>
    </div>
  )
}

export default Reset
