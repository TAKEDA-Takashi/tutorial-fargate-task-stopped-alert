#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { TutorialFargateTaskStoppedAlertStack } from '../lib/tutorial-fargate-task-stopped-alert-stack';

const app = new cdk.App();
new TutorialFargateTaskStoppedAlertStack(app, 'TutorialFargateTaskStoppedAlertStack');
