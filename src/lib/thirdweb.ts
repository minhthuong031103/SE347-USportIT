import { ThirdwebSDK } from '@thirdweb-dev/sdk';

export const web3Sdk = ThirdwebSDK.fromPrivateKey(
  '2501935f54b5912a3c680a56d950aa1e86ebc9e50edc60d8a0a4789613525f32', // Your wallet's private key (only required for write operations)
  'fantom-testnet',
  {
    secretKey:
      'wXym25v9zdNcb123yi63deNi0IK8y3yoloaXJMD_3uUZ0MAhaGeE-Y0HCqMugIxJdYskaIY4qa3J0e1mNLQfiA', // Use secret key if using on the server, get it from dashboard settings
  }
);

export const sdk = new ThirdwebSDK('fantom-testnet');
