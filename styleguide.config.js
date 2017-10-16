// styleguide.config.js
const path = require('path');
module.exports = {
  title: 'VoIPGRID styleguide',
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/Wrapper')
  },

  sections: [
    {
      name: 'Buttons',
      components: () => [
        './src/components/base/FormButton.jsx',
        './src/components/base/LinkButton.jsx'
      ]
    },
    {
      name: 'General components',
      components: () => [
        './src/components/base/Header.jsx',
        './src/components/base/Notification.jsx',
        './src/components/helpers/LoadingComponent.js',
        './src/components/helpers/Table.js'
      ]
    },
    {
      name: 'Navigation',
      components: () => ['./src/components/base/NavigationItem.jsx']
    },
    {
      name: 'Admin',
      components: () => [
        './src/components/clients/admin_modules/AdminModule.js'
      ]
    }
  ]
};
