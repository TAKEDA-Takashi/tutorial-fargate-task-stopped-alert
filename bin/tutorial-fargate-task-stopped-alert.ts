#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { TutorialFargateTaskStoppedAlertStack } from '../lib/tutorial-fargate-task-stopped-alert-stack';

const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'ap-northeast-1',
};

const app = new cdk.App();
new TutorialFargateTaskStoppedAlertStack(app, 'TutorialFargateTaskStoppedAlertStack', {
    env,
});
