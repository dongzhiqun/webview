import axios from 'axios'
const nowUrl = axios.get('/address').then(res => {
  console.log(res.data.substring(0, res.data.length - 1))
  return res.data.substring(0, res.data.length - 1)
}).catch(res => {
  console.log(558)
})
export default nowUrl
