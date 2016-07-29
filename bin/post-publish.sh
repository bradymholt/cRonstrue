LATEST_TAG_NAME=$(git describe --abbrev=0 --tags)
git commit -a -m "Release ${LATEST_TAG_NAME}"
git push --follow-tags
