#!/usr/bin/env bash
deploy () {
 git add . ;
 git commit -m "$1" ;
 git push ;
 ng build --prod;

 aws s3 sync dist/ s3://demo.atila.ca;
# aws cloudfront create-invalidation --distribution-id E3BPZYNBZT54L5 --paths "/*";
}

just_deploy() {
 ng build --prod;

 aws s3 sync dist/ s3://demo.atila.ca;
# aws cloudfront create-invalidation --distribution-id E3BPZYNBZT54L5 --paths "/*";
}
