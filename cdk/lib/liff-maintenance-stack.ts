import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class LiffMaintenanceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteBucket = new cdk.aws_s3.Bucket(this, "websiteBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      bucketName: `liff-switch-maintenance`,
      autoDeleteObjects: true,
    });

    const distribution = new cdk.aws_cloudfront.Distribution(
      this,
      "MaintenanceWebSiteDistribution",
      {
        defaultRootObject: "index.html",
        defaultBehavior: {
          origin:
            cdk.aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
              websiteBucket
            ),
        },
      }
    );

    new cdk.CfnOutput(this, "DistributionUrl", {
      value: `https://${distribution.distributionDomainName}`,
    });
  }
}
