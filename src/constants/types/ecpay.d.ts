declare module 'ecpay_aio_nodejs' {
    class ECPayPayment {
      constructor(config: any);
      payment_client: {
        aio_check_out_all(params: any): string;
        helper: {
          gen_chk_mac_value(params: any): string;
        };
      };
    }

    export default ECPayPayment;
  }
