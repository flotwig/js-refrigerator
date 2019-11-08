import { expect } from 'chai'

import refrigerate from '.'

describe('refrigerator', function () {
  describe('throws on', function () {
    let obj = {
      foo: 'bar',
      baz: {
        quuz: 'nuuz'
      }
    }

    let refrigerated = refrigerate(obj)

    describe('deleteProperty on', function () {
      it('primary object', function () {
        expect(()=>{
          delete refrigerated.foo
        }).to.throw('Cannot delete property "foo" of a refrigerated object.')
      })

      it('child object', function () {
        expect(()=>{
          delete refrigerated.baz.quuz
        }).to.throw('Cannot delete property "quuz" of a refrigerated object.')
      })
    })

    describe('defineProperty on', function () {
      it('primary object', function () {
        expect(()=>{
          Object.defineProperty(refrigerated, "foo", {
            value: 'test',
            writable: false
          })
        }).to.throw('Cannot define property "foo" of a refrigerated object.')

        expect(refrigerated.foo).to.eq('bar')
      })

      it('child object', function () {
        expect(()=>{
          Object.defineProperty(refrigerated.baz, "quuz", {
            value: 'test',
            writable: false
          })
        }).to.throw('Cannot define property "quuz" of a refrigerated object.')

        expect(refrigerated.baz.quuz).to.eq('nuuz')
      })
    })

    describe('preventExtensions on', function () {
      it('primary object', function () {
        expect(()=>{
          Object.preventExtensions(refrigerated)
        }).to.throw('Cannot prevent extensions of a refrigerated object.')

        expect(Object.isExtensible(refrigerated)).to.eq(true)
      })

      it('child object', function () {
        expect(()=>{
          Object.preventExtensions(refrigerated.baz)
        }).to.throw('Cannot prevent extensions of a refrigerated object.')

        expect(Object.isExtensible(refrigerated.baz)).to.eq(true)
      })
    })

    describe('setting properties on', function () {
      it('primary object', function () {
        expect(()=>{
          refrigerated.foo = 'abcde'
        }).to.throw('Cannot set property "foo" of a refrigerated object.')

        expect(refrigerated.foo).to.eq('bar')
      })

      it('child object', function () {
        expect(()=>{
          refrigerated.baz.quuz = 'abcde'
        }).to.throw('Cannot set property "quuz" of a refrigerated object.')

        expect(refrigerated.baz.quuz).to.eq('nuuz')
      })
    })

    describe('setPrototypeOf on', function () {
      it('primary object', function () {
        expect(()=>{
          Object.setPrototypeOf(refrigerated.foo, null)
        }).to.throw('Cannot set prototype of a refrigerated object.')
      })

      it('child object', function () {
        expect(()=>{
          Object.setPrototypeOf(refrigerated.baz, null)
        }).to.throw('Cannot set prototype of a refrigerated object.')
      })
    })
  })
})
