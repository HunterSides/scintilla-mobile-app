const { getDefaultConfig } = require('@expo/metro-config')
const extraNodeModules = require('node-libs-browser')

module.exports = (() => {
  const config = getDefaultConfig(__dirname)

  const { transformer, resolver } = config

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer'
    ),
  }

  config.resolver.sourceExts.push('cjs')

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
    extraNodeModules: {
      ...extraNodeModules,
      'tiny-secp256k1': require('tiny-secp256k1'),
      // 'rn-secp256k1': require('rn-secp256k1')
    },
  }

  return config
})()
