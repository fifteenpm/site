#!/bin/sh

set -x
set -e

aws --profile $1 s3 sync public/assets/ s3://assets.globally.ltd/
aws --profile $1 cloudfront create-invalidation --distribution-id E2CO6ZKFCFUALS --paths '/*' > /dev/null
