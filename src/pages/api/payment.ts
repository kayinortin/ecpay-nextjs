import { NextApiRequest, NextApiResponse } from "next";
import ECPayPayment from "ecpay_aio_nodejs";

const { ECPAY_MERCHANT_ID, ECPAY_HASH_KEY, ECPAY_HASH_IV, NEXT_PUBLIC_RETURN_URL, NEXT_PUBLIC_CLIENTBACK_URL } = process.env;

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

export default async function handler(req: NextApiRequest,res: NextApiResponse) {

  if (req.method === "POST") {

    const { MerchantTradeNo, MerchantTradeDate, TotalAmount, TradeDesc, ItemName } = req.body;

    const base_param = {
      MerchantTradeNo,
      MerchantTradeDate,
      TotalAmount,
      TradeDesc,
      ItemName,
      ReturnURL: `${NEXT_PUBLIC_RETURN_URL}`,
      OrderResultURL : `${NEXT_PUBLIC_CLIENTBACK_URL}`,
    };

    try {
      const create = new ECPayPayment(options);
      const html = create.payment_client.aio_check_out_all(base_param);

      res.status(200).send(html);
    } catch (error) {
      console.error("Error creating payment:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
