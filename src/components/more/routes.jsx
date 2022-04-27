import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import More from '.'
import Faculty from '../Faculty'



const routes = () => {

  return (
    <Container>
      <Routes>
        <Route index element={<More/>}/>
        <Route path='faculty/:title' element={<Faculty/>}></Route>
      </Routes>
    </Container>
  )
}

export default routes
