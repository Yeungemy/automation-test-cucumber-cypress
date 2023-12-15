import { defineConfig } from 'cypress';
import allureWriter from '@shelex/cypress-allure-plugin/writer';
import webpack from '@cypress/webpack-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';

module.exports = defineConfig({
    screenshotOnRunFailure: true,
    videoCompression: false,

    env: {
        // issuePrefix: 'https://your.domain.atlassian.net/browse/',
        // tmsPrefix: 'https://some.testrail.instance/path/suite/caseID-'
    },
    e2e: {
        setupNodeEvents: async function (on, config) {
            await addCucumberPreprocessorPlugin(on, config);
            on(
                'file:preprocessor',
                webpack({
                    webpackOptions: {
                        resolve: { extensions: ['.ts', '.js'] },
                        module: {
                            rules: [
                                {
                                    test: /\.feature$/,
                                    use: [
                                        {
                                            loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                                            options: config
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                })
            );
            allureWriter(on, config);
            return config;
        }
    }
});
