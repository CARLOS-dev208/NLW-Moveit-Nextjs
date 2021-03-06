import {NowRequest,NowResponse} from '@vercel/node'
import axios from 'axios'



export default async (request:NowRequest,response:NowResponse) =>{
    
    const req = await axios.post(`https://github.com/login/oauth/access_token`,{
      client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code: request.query.code,
      scope: 'estado'
    },{
      headers: {
        'Accept': 'application/json'
      }
    })
   
    console.log(req.data)
      
    return response.redirect(`/auth-callback/?access_token=${req.data.access_token}`)
}
