import router from '@/router'
import { cloneDeep } from 'lodash'
import { database as getDatabase, dbGet, dbSet } from '@/libs/util.db'

export default {
  namespaced: true,
  actions: {
    /**
     * @description Store the data in the specified location | If the path does not exist, it will be initialized automatically
     * @description The effect is similar to the value dbName.path = value
     * @param {Object} context
     * @param {Object} payload dbName {String} Name database
     * @param {Object} payload path {String} Storage path
     * @param {Object} payload value {*} The value to be stored
     * @param {Object} payload user {Boolean} Whether to distinguish users
     */
    set (context, {
      dbName = 'database',
      path = '',
      value = '',
      user = false
    }) {
      dbSet({ dbName, path, value, user })
    },
    /**
     * @description retrieve data
     * @description The effect is similar to the value dbName.path || defaultValue
     * @param {Object} context
     * @param {Object} payload dbName {String} Name database
     * @param {Object} payload path {String} Storage path
     * @param {Object} payload defaultValue {*} Default value of failed value
     * @param {Object} payload user {Boolean} Whether to distinguish users
     */
    get (context, {
      dbName = 'database',
      path = '',
      defaultValue = '',
      user = false
    }) {
      return dbGet({ dbName, path, defaultValue, user })
    },
    /**
     * @description Get storage database objects
     * @param {Object} context
     * @param {Object} payload user {Boolean} Whether to distinguish users
     */
    database (context, {
      user = false
    } = {}) {
      return getDatabase({
        user,
        defaultValue: {}
      })
    },
    /**
     * @description Empty storage database objects
     * @param {Object} context
     * @param {Object} payload user {Boolean} Whether to distinguish users
     */
    databaseClear (context, {
      user = false
    } = {}) {
      return getDatabase({
        user,
        validator: () => false,
        defaultValue: {}
      })
    },
    /**
     * @description Get storage database object [different page]
     * @param {Object} context
     * @param {Object} payload basis {String} Page differentiation basis [ name | path | fullPath ]
     * @param {Object} payload user {Boolean} Whether to distinguish users
     */
    databasePage (context, {
      basis = 'fullPath',
      user = false
    } = {}) {
      return getDatabase({
        path: `$page.${router.app.$route[basis]}`,
        user,
        defaultValue: {}
      })
    },
    /**
     * @description Clear storage database objects [Different pages]
     * @param {Object} context
     * @param {Object} payload basis {String} Page differentiation basis [ name | path | fullPath ]
     * @param {Object} payload user {Boolean} Whether to distinguish users
     */
    databasePageClear (context, {
      basis = 'fullPath',
      user = false
    } = {}) {
      return getDatabase({
        path: `$page.${router.app.$route[basis]}`,
        user,
        validator: () => false,
        defaultValue: {}
      })
    },
    /**
     * @description Quickly persist the current data ($data) of the page
     * @param {Object} context
     * @param {Object} payload instance {Object} vue Instance
     * @param {Object} payload basis {String} Page differentiation basis [ name | path | fullPath ]
     * @param {Object} payload user {Boolean} Whether to distinguish users
     */
    pageSet (context, {
      instance,
      basis = 'fullPath',
      user = false
    }) {
      return getDatabase({
        path: `$page.${router.app.$route[basis]}.$data`,
        user,
        validator: () => false,
        defaultValue: cloneDeep(instance.$data)
      })
    },
    /**
     * @description Get fast and persistent data on the page quickly
     * @param {Object} context
     * @param {Object} payload instance {Object} vue Instance
     * @param {Object} payload basis {String} Page differentiation basis [ name | path | fullPath ]
     * @param {Object} payload user {Boolean} Whether to distinguish users
     */
    pageGet (context, {
      instance,
      basis = 'fullPath',
      user = false
    }) {
      return dbGet({
        path: `$page.${router.app.$route[basis]}.$data`,
        user,
        defaultValue: cloneDeep(instance.$data)
      })
    },
    /**
     * @description Clear page snapshot
     * @param {Object} context
     * @param {Object} payload basis {String} Page differentiation basis [ name | path | fullPath ]
     * @param {Object} payload user {Boolean} Whether to distinguish users
     */
    pageClear (context, {
      basis = 'fullPath',
      user = false
    }) {
      return getDatabase({
        path: `$page.${router.app.$route[basis]}.$data`,
        user,
        validator: () => false,
        defaultValue: {}
      })
    }
  }
}
