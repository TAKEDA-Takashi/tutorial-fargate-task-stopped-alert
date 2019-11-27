import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as targets from '@aws-cdk/aws-events-targets';

import { ScheduledFargateTask } from '@aws-cdk/aws-ecs-patterns';
import { Schedule } from '@aws-cdk/aws-applicationautoscaling';
import { Topic } from '@aws-cdk/aws-sns';
import { EmailSubscription } from '@aws-cdk/aws-sns-subscriptions';
import { Rule } from '@aws-cdk/aws-events';

export class TutorialFargateTaskStoppedAlertStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc', {
      cidr: '10.0.0.0/16',
      maxAzs: 1,
    });

    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc,
    });

    const task = new ScheduledFargateTask(this, 'ScheduledFargateTask', {
      cluster,
      schedule: Schedule.expression('cron(0/5 * * * ? *)'),
      scheduledFargateTaskImageOptions: {
        memoryLimitMiB: 512,
        cpu: 256,
        command: [
          'sh',
          '-c',
          'sleep 5',
        ],
        image: ecs.ContainerImage.fromRegistry('amazonlinux:2'),
      },
    });

    const taskStoppedAlert = new Topic(this, 'TaskStoppedAlert', {
      topicName: 'TaskStoppedAlert',
    });

    taskStoppedAlert.addSubscription(new EmailSubscription('alert@example.com'));

    new Rule(this, 'Rule', {
      eventPattern: {
        source: ['aws.ecs'],
        detailType: ['ECS Task State Change'],
        detail: {
          lastStatus: ['STOPPED'],
          stoppedReason: ['Essential container in task exited'],
        },
      },
      targets: [new targets.SnsTopic(taskStoppedAlert)],
    });
  }
}
