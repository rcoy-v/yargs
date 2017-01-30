/* global describe, it */

const argsert = require('../lib/argsert')
const expect = require('chai').expect

require('chai').should()

describe('Argsert', function () {
  it('does not throw exception if optional argument is not provided', function () {
    argsert('[object]', arguments)
  })

  it('throws exception if wrong type is provided for optional argument', function () {
    function foo (opts) {
      argsert('[object|number]', arguments)
    }
    expect(function () {
      foo('hello')
    }).to.throw(/Invalid first argument. Expected object or number but received string./)
  })

  it('does not throw exception if optional argument is valid', function () {
    function foo (opts) {
      argsert('[object]', arguments)
    }
    foo({foo: 'bar'})
  })

  it('throws exception if required argument is not provided', function () {
    expect(function () {
      argsert('<object>', arguments)
    }).to.throw(/Not enough arguments provided. Expected 1 but received 0./)
  })

  it('throws exception if required argument is of wrong type', function () {
    function foo (opts) {
      argsert('<object>', arguments)
    }
    expect(function () {
      foo('bar')
    }).to.throw(/Invalid first argument. Expected object but received string./)
  })

  it('supports a combination of required and optional arguments', function () {
    function foo (opts) {
      argsert('<array> <string|object> [string|object]', arguments)
    }
    foo([], 'foo', {})
  })

  it('throws an exception if too many arguments are provided', function () {
    function foo (expected) {
      argsert('<array>', arguments)
    }
    expect(function () {
      foo([], 33)
    }).to.throw(/Too many arguments provided. Expected 1 but received 2./)
  })

  it('configures function to accept 0 parameters, if only arguments object is provided', function () {
    function foo (expected) {
      argsert(arguments)
    }
    expect(function () {
      foo(99)
    }).to.throw(/Too many arguments provided. Expected 0 but received 1./)
  })
})
