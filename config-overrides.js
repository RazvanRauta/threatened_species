/* eslint-disable */
/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 13 2021
 * @ Time: 17:39
 */

const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    '@mui/styled-engine': '@mui/styled-engine-sc',
    '@': path.resolve(__dirname, 'src'),
  })
)
