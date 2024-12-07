import { baseApiSlice } from "./baseApiSlice";

const ORDERS_URL = "/api/order";

export const ordersSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderById: builder.query({
      query: (id) => `${ORDERS_URL}/${id}`,
    }),
    getCartByUserId: builder.query({
      query: (id) => `${ORDERS_URL}/cart/${id}`,
    }),
    getAllOrders: builder.query({
      query: (query = {}) => {
        const { page = 1, limit = 10, shopId } = query;
        const finalQuery = { page, limit, shopId };

        let params = new URLSearchParams();
        if (page) {
          for (const [key, value] of Object.entries(finalQuery)) {
            params.append(key, value);
          }
        }

        return `${ORDERS_URL}/?${params.toString()}`;
      },
    }),
    getOrderHistory: builder.query({
      query: (query = {}) => {
        const { page = 1, limit = 10, userId } = query;
        const finalQuery = { page, limit, userId };

        let params = new URLSearchParams();
        if (page) {
          for (const [key, value] of Object.entries(finalQuery)) {
            params.append(key, value);
          }
        }

        return `${ORDERS_URL}/history/?${params.toString()}`;
      },
    }),
    getSalesReport:builder.query({
        query: (id) => `${ORDERS_URL}/sale/${id}`,
    }),
    getYearlyReport:builder.query({
        query: (id) => `${ORDERS_URL}/yearly/${id}`,
    }),
    updateOrderStatus: builder.mutation({
      query: (body) => ({
        url: `${ORDERS_URL}/status`,
        method: "PUT",
        body,
      }),
    }),
    addToCart: builder.mutation({
      query: (body) => ({
        url: `${ORDERS_URL}/cart`,
        method: "POST",
        body,
      }),
    }),
    updateQuantity: builder.mutation({
      query: (body) => ({
        url: `${ORDERS_URL}/quantity`,
        method: "PUT",
        body,
      }),
    }),
    updateItems: builder.mutation({
      query: (body) => ({
        url: `${ORDERS_URL}/items`,
        method: "PUT",
        body,
      }),
    }),
    orderCheckout: builder.mutation({
      query: (body) => ({
        url: `${ORDERS_URL}/checkout`,
        method: "PUT",
        body,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks
export const {
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useGetCartByUserIdQuery,
  useGetSalesReportQuery,
  useGetYearlyReportQuery,
  useUpdateOrderStatusMutation,
  useAddToCartMutation,
  useUpdateQuantityMutation,
  useUpdateItemsMutation,
  useDeleteOrderMutation,
  useOrderCheckoutMutation,
  useGetOrderHistoryQuery,
} = ordersSlice;