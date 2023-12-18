on:
  push:
    branches:
      - main

jobs:
  generate-report:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Install Dependencies
        run: npm install

      - name: Check Cypress cache
        run: |
          npx cypress cache path
          npx cypress cache list

      - name: Cache Cypress Binary
        uses: actions/cache@v2
        with:
          path: |
            ~/.cache/Cypress
          key: |
            cypress-cache-v2-${{ runner.os }}-${{ hashFiles('**/package.json') }}

      - name: Install Cypress
        run: npx cypress install

      - name: Install Allure
        run: |
          npm install -g allure-commandline
          echo "$HOME/.npm-global/bin" >> $GITHUB_PATH

      - name: Run Cypress Tests
        run: |
          npm run pretest
          npm run cy:run
          npm run cy:cucumber:run
          npm run posttest

      - name: Deploy Report to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_branch: allure
          publish_dir: allure-history
