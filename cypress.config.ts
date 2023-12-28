import { defineConfig } from 'cypress';
import allureWriter from '@shelex/cypress-allure-plugin/writer';
import webpack from '@cypress/webpack-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';


async function setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
  // This is required for the preprocessor to generate JSON reports after each run and more
  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    webpack({
      webpackOptions: {
        resolve: { extensions: ['.ts', '.js'] },
        module: {
          rules: [
            {
              test: /\.ts$/, // for e2e tests
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
            {
              test: /\.feature$/, // for BDD tests
              use: [
                {
                  loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );

  allureWriter(on, config);
  return config;
}

export default defineConfig({
  env: {
    url: 'https://practicesoftwaretesting.com/#/',
    userName: 'test@demoqa.com',
    password: 'test1234',
  },

  e2e: {
    setupNodeEvents,
  },
});
