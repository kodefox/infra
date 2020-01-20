ROOT_DIR=$(pwd | sed 's/infra.*/infra/')
cd $ROOT_DIR
for package in packages/*; do
  if [[ $(git diff master..HEAD --name-only | grep $package) != "" && $package != "packages/eslint-config-kodefox" ]]; then
    cd $package
    yarn test
    if [[ $? != 0 ]]; then
      exit 1
    fi
  fi
done
