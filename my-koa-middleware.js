/**
 * 模拟一个koa中间件
 */

const middleware = (ctx, next) => {
    console.log('middleware 1')
    next()
    console.log('middleware 2')
}
/**
 * @param {Array} middleware
 * @return {Function}
 */
const composeSlim = (middleware) => async (ctx, next) => {
    const dispatch = (i) => async () => {
      const fn = i === middleware.length
        ? next
        : middleware[i]
      if (!fn) return
      return await fn(ctx, dispatch(i + 1))
    }
    return dispatch(0)()
  }

// 支持promise
const compose = (middlewares) => {
    if (!Array.isArray(middlewares)) throw new Error('middlewares must be an array')
    for (const middleware of middlewares) {
        if (typeof middleware !== 'function') throw new Error('middleware must be a function')
    }

    return (ctx, next) => {
        let index = -1
        const dispatch = (index) => {
            if (index === middlewares.length) return
            const middleware = middlewares[index]
            try {
                return Promise.resolve(middleware(ctx, () => dispatch(index + 1)))
            } catch (error) {
                return Promise.reject(error)
            }
        }
        return dispatch(0)
    }
}

const app = compose([middleware])
app({})

