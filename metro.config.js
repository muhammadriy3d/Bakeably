const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config')

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {}

module.exports = mergeConfig(getDefaultConfig(__dirname), config)

const jsoMetroPlugin = require('obfuscator-io-metro-plugin')(
    {
        compact: false,
        sourceMap: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        shuffleStringArray: true,
        splitStrings: true,
        stringArrayThreshold: 1
    },
    {
        runInDev: false /* optional */,
        logObfuscatedFiles: true /* optional generated files will be located at ./.jso */,
        sourceMapLocation:
            './index.android.bundle.map' /* optional  only works if sourceMap: true in obfuscation option */
    }
)
