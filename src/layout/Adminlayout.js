import React from 'react';
import Header from '../Admin/component/Header'
import Footer from '../Admin/component/Footer'
 
function Adminlayout({children}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>     
     
  )
}

export default Adminlayout