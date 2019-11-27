import * as cdk from '@aws-cdk/core';
import { SynthUtils } from '@aws-cdk/assert';
import { TutorialFargateTaskStoppedAlertStack } from '../lib/tutorial-fargate-task-stopped-alert-stack';

test('Stack Snapshot test', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new TutorialFargateTaskStoppedAlertStack(app, 'MyTestStack', {
    env: {
      account: '123456789012',
      region: 'ap-northeast-1',
    },
  });
  // THEN
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});