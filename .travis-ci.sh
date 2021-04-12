#!/bin/bash
set -e # halt script on error

HTMLPROOFER_OPTIONS="./_site --internal-domains=cips.cosmos.network --check-html --check-opengraph --report-missing-names --log-level=:debug --assume-extension --empty-alt-ignore --timeframe=6w --url-ignore=/CIPS/cip-1,CIPS/cip-1,/CIPS/cip-107,/CIPS/cip-858"

if [[ $TASK = 'htmlproofer' ]]; then
    bundle exec jekyll doctor
    bundle exec jekyll build
    bundle exec htmlproofer $HTMLPROOFER_OPTIONS --disable-external

    # Validate GH Pages DNS setup
    bundle exec github-pages health-check
elif [[ $TASK = 'htmlproofer-external' ]]; then
    bundle exec jekyll doctor
    bundle exec jekyll build
    bundle exec htmlproofer $HTMLPROOFER_OPTIONS --external_only
elif [[ $TASK = 'cip-validator' ]]; then
    if [[ $(find . -maxdepth 1 -name 'cip-*' | wc -l) -ne 1 ]]; then
        echo "only 'cip-template.md' should be in the root"
        exit 1
    fi
    cipv CIPS/ --ignore=title_max_length,missing_discussions_to --skip=cip-20-token-standard.md
elif [[ $TASK = 'codespell' ]]; then
    codespell -q4 -I .codespell-whitelist -S ".git,Gemfile.lock,**/*.png,**/*.gif,**/*.jpg,**/*.svg,.codespell-whitelist,vendor,_site,_config.yml,style.css"
fi
