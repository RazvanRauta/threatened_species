/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 14 2021
 * @ Time: 10:30
 */

const plugins = [
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'core',
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/icons-material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'icons',
  ],
]

module.exports = { plugins }
