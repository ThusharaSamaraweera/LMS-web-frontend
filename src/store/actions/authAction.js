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

    const res = await axios.post(`${BASE_URL}/auth/login`,body, config)
    console.log(res)
    dispatch({
      type: ACTIONS.LOGIN,
      payload: body
    })
  } catch (error) {
    
  }

}