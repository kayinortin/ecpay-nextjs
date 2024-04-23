import { useState, useEffect } from "react";

const CreateECPay = () => {
  const [responseHtml, setResponseHtml] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (responseHtml && !formSubmitted) {
      const form = document.querySelector("#_form_aiochk") as HTMLFormElement;
      form?.submit();
      setFormSubmitted(true);
    }
  }, [responseHtml, formSubmitted]);

  const handlePayment = async (totalAmount: string, tradeDesc: string, itemName: string) => {

    const MerchantTradeNo = "TEST" + new Date().getTime();

    const MerchantTradeDate = new Date().toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Taipei",
    });

    const paymentData = {
      MerchantTradeNo,
      MerchantTradeDate,
      TotalAmount: totalAmount,
      TradeDesc: tradeDesc,
      ItemName: itemName
    };

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const htmlResponse = await response.text();
      setResponseHtml(htmlResponse);
    } catch (error) {
      console.error("Payment API error:", error);
      setResponseHtml("Payment failed");
    }
  };

  return (
    <div>
      <h1>綠界金流測試介面</h1>
      <div className="m-2">
        <button
          onClick={() => handlePayment("10000", "基本方案", "基本方案一個月")}
        >
          基本方案
        </button>
      </div>
      <div className="m-2">
        <button
          onClick={() => handlePayment("25000", "進階方案", "進階方案一個月")}
        >
          進階方案
        </button>
      </div>
      <div className="m-2">
        <button
          onClick={() => handlePayment("36000", "豪華方案", "豪華方案一個月")}
        >
          豪華方案
        </button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: responseHtml }} />
    </div>
  );
};

export default CreateECPay;
