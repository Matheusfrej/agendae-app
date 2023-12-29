const {
  createRunOncePlugin,
  withAndroidManifest,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('@expo/config-plugins')

const withAndroidManifestHavingHttpAttribute = (config) => {
  return withAndroidManifest(config, (config) => {
    const androidManifest = config.modResults.manifest
    const mainApplication = androidManifest.application[0]
    mainApplication.$['tools:replace'] = 'android:usesCleartextTraffic'
    mainApplication.$['android:usesCleartextTraffic'] = 'true'

    return config
  })
}

module.exports = createRunOncePlugin(
  withAndroidManifestHavingHttpAttribute,
  'withAndroidManifestHavingHttpAttribute',
  '1.0.0',
)
