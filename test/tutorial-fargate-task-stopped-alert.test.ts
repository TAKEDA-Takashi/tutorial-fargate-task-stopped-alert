import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import TutorialFargateTaskStoppedAlert = require('../lib/tutorial-fargate-task-stopped-alert-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new TutorialFargateTaskStoppedAlert.TutorialFargateTaskStoppedAlertStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});