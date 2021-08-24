const mqtt = require('mqtt');

const AWS_ENPOINT = 'YOUR-ENDPOINT-HERE.iot.us-east-1.amazonaws.com';
const AWS_PORT = 8883;
const THING = {
  thingId: 'THING-ID-HERE',
  certificateArn:
    'arn:aws:iot:us-east-1:576901785687:cert/8ba156d7103063ec06db73598746afb935d6e3c6256af56eac33f4438aa42e95',
  pem: `-----BEGIN CERTIFICATE-----
PEM HERE
-----END CERTIFICATE-----`,
  keyPair: {
    PrivateKey: `-----BEGIN RSA PRIVATE KEY-----
PRIVATE KEY HERE
-----END RSA PRIVATE KEY-----`,
  },
  ca: `-----BEGIN CERTIFICATE-----
AMAZON ROOT CA HERE
-----END CERTIFICATE-----`,
};
const GROUP = 'GROUP-YOU-WANT-TO-SUBSCRIBE';

function connect() {
  const options = {
    clientId: THING.thingId,

    protocol: 'mqtt',
    host: AWS_ENPOINT,
    port: AWS_PORT,

    key: THING.keyPair.PrivateKey,
    cert: THING.pem,
    ca: THING.ca,

    keepalive: 10,
    // will: {},
  };

  const client = mqtt.connect(AWS_ENPOINT, options);
  const test = { message: 'Hello Iot' };

  client.on('connect', () => {
    console.log('connected!');
    client.subscribe(GROUP);
    client.publish(GROUP, JSON.stringify(test));
  });
  client.on('message', function(topic, message) {
    console.log('topic', topic);
    console.log('message', message);
  });
  client.on('error', error => {
    console.error('error', error);
  });
}

module.exports = connect;