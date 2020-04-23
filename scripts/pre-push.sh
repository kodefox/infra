ROOT_DIR=$(pwd | sed 's/infra.*/infra/')
echo ">> Running pre-push hook for testing related package to the commits"
cd $ROOT_DIR
for package in packages/*; do
  if [[ $(git diff master..HEAD --name-only | grep $package) != "" && $package != "packages/eslint-config-kodefox" ]]; then
    echo ">> Will start testing $package"
    cd $package
    yarn test
    if [[ $? != 0 ]]; then
      exit 1
    fi
    cd $ROOT_DIR
  fi
done
