<pre className="bg-white p-6 overflow-x-auto">
  <code>
    {`public async evaluateOrderApproval(
  orderId: string,
  amount: number
) {
  const order = await this.repo.findById(orderId);

  if (order.totalAmount >= 10000) {
    return {
      status: "PENDING_SENIOR_REVIEW"
    };
  }
}`}
  </code>
</pre>