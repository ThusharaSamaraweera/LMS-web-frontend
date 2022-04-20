import axios from "axios"
import { BASE_URL } from "../../utils/restClient"
import * as ACTIONS from '../actionTypes/authActionTypes'

export const login = ({username, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({username, password})
  
  try {
    // const res = await axios.post(`${BASE_URL}/public`, body, config)
    const res = await axios.get(`${BASE_URL}/public`, config)
    console.log(res)

    dispatch({
      type: ACTIONS.LOGIN,
      payload: body
    })
  } catch (error) {
    
  }

}