// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom/extend-expect'
import 'mutationobserver-shim'
import 'jest-localstorage-mock'

import { mockServer } from './utils/testHelpers'

process.env.REACT_APP_API_URL = 'http://mock-api'
process.env.REACT_APP_API_TOKEN = 'mocked-token'
process.env.DEBUG_PRINT_LIMIT = '20000'

beforeAll(() => {
  mockServer.listen()
})

afterEach(() => {
  mockServer.resetHandlers()
  jest.clearAllMocks()
})

afterAll(() => mockServer.close())
