ROOT_DIR=$(pwd | sed 's/infra.*/infra/')
cd $ROOT_DIR
for package in packages/*; do
  if [[ $(git diff master..HEAD --name-only | grep $package) != "" ]]; then
    cd $package
    yarn test
  fi
done
