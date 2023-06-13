# Local development

## Prerequisites

1. Open Terminal.

2. Check whether you have Ruby 2.1.0 or higher installed:

    ```sh
    ruby --version
    ```

3. If you don't have Ruby installed, install Ruby 2.1.0 or higher.

4. Install Bundler:

    ```sh
    gem install bundler
    ```

5. Install dependencies:

```sh
bundle install
```

## Build your local Jekyll site

1. Bundle assets and start the server:

    ```sh
    bundle exec jekyll serve
    ```

2. Preview your local Jekyll site in your web browser at `http://localhost:4000`.

More information on Jekyll and GitHub pages [here](https://help.github.com/en/enterprise/2.14/user/articles/setting-up-your-github-pages-site-locally-with-jekyll).
