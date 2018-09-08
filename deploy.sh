#!/usr/bin/env bash
deploy () {
# https://medium.com/@coorasse/deploy-angular2-on-amazons3-5bbc040ab64a
# https://benjamincongdon.me/blog/2017/06/13/How-to-Deploy-a-Secure-Static-Site-to-AWS-with-S3-and-CloudFront/
 git add . ;
 git commit -m "$1" ;
 git push ;
 ng build --prod;

 aws s3 sync dist/ s3://demo.atila.ca;
 aws cloudfront create-invalidation --distribution-id E3BPZYNBZT54L5 --paths "/*";
}

just_deploy() {
 ng build --prod;

 aws s3 sync dist/ s3://demo.atila.ca;
 aws cloudfront create-invalidation --distribution-id E3BPZYNBZT54L5 --paths "/*";
}
