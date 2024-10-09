#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { LiffMaintenanceStack } from "../lib/liff-maintenance-stack";

const app = new cdk.App();
new LiffMaintenanceStack(app, "LiffMaintenanceStack", {});
