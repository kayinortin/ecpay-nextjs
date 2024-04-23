import { useRouter } from 'next/router';
import React from 'react';

const ReturnPage = () => {
  const router = useRouter();
  const data = router.query;

  return (
    <div>
      <h1>付款結果</h1>
      <p>付款狀態: 付款完成</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default ReturnPage;
