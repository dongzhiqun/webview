import store from '@/store/index'
import { getDictionaryList } from '@/api/backStage'
export const usernameRule = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){5,20}$/
export const passwordRule = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/
export const phoneRule = /^1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/
export const emailRule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
export function timeReset (val) {
  const params = new Date(val)
  const year = params.getFullYear()
  const month = params.getMonth() + 1 < 10 ? '0' + (params.getMonth() + 1) : params.getMonth() + 1
  const day = params.getDate() < 10 ? '0' + params.getDate() : params.getDate()
  const hh = params.getHours() < 10 ? '0' + params.getHours() : params.getHours()
  const mm = params.getMinutes() < 10 ? '0' + params.getMinutes() : params.getMinutes()
  const ss = params.getSeconds() < 10 ? '0' + params.getSeconds() : params.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss
}
// 返回数据字典对应的数组
export function getDictionaryArr (code) {
  const params = {
    access_token: localStorage.getItem('token')
  }
  const $store = store
  if (JSON.parse(localStorage.getItem('dictionaryArr')).length === 0) {
    getDictionaryList(params).then((res) => {
      if (res.code === 0) {
        const tableData = []
        res.data.forEach(item => {
          if (item.parentCode === '-1') {
            tableData.push(item)
          }
        })
        tableData.forEach(item => {
          item.children = []
          res.data.forEach(i => {
            if (item.id === i.parentCode) {
              item.children.push(i)
            }
          })
        })
        $store.commit('ADD_DICTIONAYRYARR', tableData)
        localStorage.setItem('dictionaryArr', JSON.stringify(tableData))
        return []
      }
    })
  } else {
    const arr = JSON.parse(localStorage.getItem('dictionaryArr'))
    const returnArr = arr.filter(item => {
      return item.code === code
    })
    return returnArr[0].children
  }
}

/* 根据字典code返回对应文字
   code类型字符串
   value类型字符串
*/
export function getDictionaryText (code, value) {
  if (value === null || value === '' || String(value) === 'NaN') {
    return '--'
  }
  const arr = getDictionaryArr(code)
  if (Object.prototype.toString.call(code) === '[object String]') {
    if (Object.prototype.toString.call(value) === '[object String]') {
      const text = arr.filter(item => {
        return item.value === value.toString()
      })
      if (text.length === 0) {
        return value
      }
      return text[0].name
    } else if (Object.prototype.toString.call(value) === '[object Number]') {
      const text = arr.filter(item => {
        return item.value === value.toString()
      })
      if (text.length === 0) {
        return value
      }
      return text[0].name
    } else {
      throw new Error('数据类型写错了！！！')
    }
  } else {
    throw new Error('数据类型写错了！！！')
  }
}
