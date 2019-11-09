export class RefrigeratorError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, RefrigeratorError.prototype)
  }
}

function err(msg: string) {
  return new RefrigeratorError(msg)
}

export function refrigerate<T extends object>(obj: T): T {
  if (typeof obj !== 'object') {
    throw new TypeError(`Only objects can be refrigerated, but a ${typeof obj} was passed.`)
  }

  return new Proxy(obj, {
    // setters
    deleteProperty(target, property) {
      throw err(`Cannot delete property "${String(property)}" of a refrigerated object.`)
    },
    defineProperty(target, property, attributes) {
      throw err(`Cannot define property "${String(property)}" of a refrigerated object.`)
    },
    preventExtensions(target) {
      throw err(`Cannot prevent extensions of a refrigerated object.`)
    },
    set(target, property, value, receiver) {
      throw err(`Cannot set property "${String(property)}" of a refrigerated object.`)
    },
    setPrototypeOf(target, value) {
      throw err(`Cannot set prototype of a refrigerated object.`)
    },
    // getters
    // TODO: getPrototypeOf - don't need to intercept?
    // do not need: isExtensible, getOwnPropertyDescriptor, has, construct
    get(target: any, property, receiver) {
      const val = target[property]

      if (
        // it's an object that inherits from `obj`, skip
        obj !== target
        // it's not an object so it can't be passed by reference, skip
        || !val
        || typeof val !== 'object'
      ) {
        return val
      }
      return refrigerate(val)
    }
  })
}
