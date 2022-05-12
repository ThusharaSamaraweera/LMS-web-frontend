import { Container } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import More from '.'
import Faculty from '../Faculty'
import Degree from '../Faculty/Degree'


const routes = () => {

  return (
    <Container>
      <Routes>
        <Route index element={<More/>}/>
        <Route path='faculty/:title' element={<Faculty/>}/>
        <Route path='faculty/:title/:year' element={<Degree/>}/>
      </Routes>
    </Container>
  )
}

export default routes
