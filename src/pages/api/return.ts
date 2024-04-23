import { NextApiRequest, NextApiResponse } from 'next';
import ECPayPayment from 'ecpay_aio_nodejs';

const { ECPAY_MERCHANT_ID, ECPAY_HASH_KEY, ECPAY_HASH_IV } = process.env;

const options = {
  OperationMode: "Test",
  MercProfile: {
    MerchantID: ECPAY_MERCHANT_ID,
    HashKey: ECPAY_HASH_KEY,
    HashIV: ECPAY_HASH_IV,
  },
  IgnorePayment: [],
  IsProjectContractor: false,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { CheckMacValue } = req.body;
    const data = { ...req.body };
    delete data.CheckMacValue;

    const create = new ECPayPayment(options);
    const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

    console.log(
      '確認交易正確性：',
      CheckMacValue === checkValue,
      CheckMacValue,
      checkValue
    );

    res.send('1|OK');
  } else {
    res.status(405).end();
  }
}
