import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import util from '@/libs/util'
import { cloneDeep } from 'lodash'

const adapter = new LocalStorage(`go2index-${process.env.VUE_APP_VERSION}`)
const db = low(adapter)

db
  .defaults({
    sys: {},
    database: {}
  })
  .write()

export default db

/**
 * @description Check if the path exists, initialize if it does not exist
 * @param {Object} payload dbName {String} Name database
 * @param {Object} payload path {String} path
 * @param {Object} payload user {Boolean} Differentiate users
 * @param {Object} payload validator {Function} The data verification hook returns true to indicate that the verification passed
 * @param {Object} payload defaultValue {*} Initialize the default value
 * @returns {String} Path that can be used directly
 */
export function pathInit ({
  dbName = 'database',
  path = '',
  user = true,
  validator = () => true,
  defaultValue = ''
}) {
  const uuid = util.cookies.get('uuid') || 'ghost-uuid'
  const currentPath = `${dbName}.${user ? `user.${uuid}` : 'public'}${path ? `.${path}` : ''}`
  const value = db.get(currentPath).value()
  if (!(value !== undefined && validator(value))) {
    db
      .set(currentPath, defaultValue)
      .write()
  }
  return currentPath
}

/**
 * @description Store the data in the specified location | If the path does not exist, it will be initialized automatically
 * @description The effect is similar to the value dbName.path = value
 * @param {Object} payload dbName {String} Name database
 * @param {Object} payload path {String} Storage path
 * @param {Object} payload value {*} The value to be stored
 * @param {Object} payload user {Boolean} Whether to distinguish users
 */
export function dbSet ({
  dbName = 'database',
  path = '',
  value = '',
  user = false
}) {
  db.set(pathInit({
    dbName,
    path,
    user
  }), value).write()
}

/**
 * @description retrieve data
 * @description The effect is similar to the value dbName.path || defaultValue
 * @param {Object} payload dbName {String} Name database
 * @param {Object} payload path {String} Storage path
 * @param {Object} payload defaultValue {*} Default value of failed value
 * @param {Object} payload user {Boolean} Whether to distinguish users
 */
export function dbGet ({
  dbName = 'database',
  path = '',
  defaultValue = '',
  user = false
}) {
  return new Promise(resolve => {
    resolve(cloneDeep(db.get(pathInit({
      dbName,
      path,
      user,
      defaultValue
    })).value()))
  })
}

/**
 * @description Get storage database objects
 * @param {Object} payload user {Boolean} Whether to distinguish users
 */
export function database ({
  dbName = 'database',
  path = '',
  user = false,
  validator = () => true,
  defaultValue = ''
} = {}) {
  return new Promise(resolve => {
    resolve(db.get(pathInit({
      dbName, path, user, validator, defaultValue
    })))
  })
}
