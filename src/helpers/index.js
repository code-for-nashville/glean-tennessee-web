import * as Api from './api'
import toast from '../components/toast/toast'

export const classnames = (...args: Array<?string>) =>
  args.reduce((acc, curr) => {
    if (curr) return `${curr} ${acc}`
    return acc
  }, '')

export {toast}

export default Api
