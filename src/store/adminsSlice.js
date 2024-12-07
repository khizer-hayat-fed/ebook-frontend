import { baseApiSlice } from "./baseApiSlice";
const ADMIN_API_URL = "/api/admin";

export const adminsSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Shops Endpoints
    getAllShopAdmin: builder.query({
      query: (query = {}) => {
        const { page = 1, limit = 10 } = query;
        const finalQuery = { page, limit };

        let params = new URLSearchParams();
        if (page) {
          for (const [key, value] of Object.entries(finalQuery)) {
            params.append(key, value);
          }
        }

        return `${ADMIN_API_URL}/shop/all/?${params.toString()}`;
      },
    }),
    getAllShopDropdown: builder.query({
      query: () => `${ADMIN_API_URL}/shop/dropdown`,
    }),
    getReviewByShopId: builder.query({
      query: (id) => `${ADMIN_API_URL}/shop/review/${id}`,
    }),
    getAverageRating: builder.query({
      query: (id) => `${ADMIN_API_URL}/shop/rating/${id}`,
    }),
    createShopAdmin: builder.mutation({
      query: (body) => ({
        url: `${ADMIN_API_URL}/shop`,
        method: "POST",
        body,
      }),
    }),
    updateShopAdmin: builder.mutation({
      query: ({ id, body }) => ({
        url: `${ADMIN_API_URL}/shop/${id}`,
        method: "PUT",
        body,
      }),
    }),
    updateShopStatusAdmin: builder.mutation({
      query: (body) => ({
        url: `${ADMIN_API_URL}/shop/status`,
        method: "PUT",
        body,
      }),
    }),
    deleteShopAdmin: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_API_URL}/shop/${id}`,
        method: "DELETE",
      }),
    }),

    // Managers Endpoints
    getAllManagers: builder.query({
      query: () => `${ADMIN_API_URL}/manager`,
    }),
    addManager: builder.mutation({
      query: (newManager) => ({
        url: `${ADMIN_API_URL}/manager`,
        method: "POST",
        body: newManager,
      }),
    }),
    updateManager: builder.mutation({
      query: (updatedManager) => ({
        url: `${ADMIN_API_URL}/manager`,
        method: "PUT",
        body: updatedManager,
      }),
    }),
    deleteManager: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_API_URL}/manager/${userId}`,
        method: "DELETE",
      }),
    }),

    // Customers Endpoints
    getAllCustomers: builder.query({
      query: (query = {}) => {
        const { page = 1, limit = 10 } = query;
        const finalQuery = { page, limit };

        let params = new URLSearchParams();
        if (page) {
          for (const [key, value] of Object.entries(finalQuery)) {
            params.append(key, value);
          }
        }

        return `${ADMIN_API_URL}/customer/?${params.toString()}`;
      },
    }),
    addCustomer: builder.mutation({
      query: (newCustomer) => ({
        url: `${ADMIN_API_URL}/customer`,
        method: "POST",
        body: newCustomer,
      }),
    }),
    updateCustomer: builder.mutation({
      query: (updatedCustomer) => ({
        url: `${ADMIN_API_URL}/customer`,
        method: "PUT",
        body: updatedCustomer,
      }),
    }),
    deleteCustomer: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_API_URL}/customer/${userId}`,
        method: "DELETE",
      }),
    }),

    // Catgory Endpoints
    getAllCategory: builder.query({
      query: (query = {}) => {
        const { page = 1, limit = 10 } = query;
        const finalQuery = { page, limit };

        let params = new URLSearchParams();
        if (page) {
          for (const [key, value] of Object.entries(finalQuery)) {
            params.append(key, value);
          }
        }

        return `${ADMIN_API_URL}/category/all/?${params.toString()}`;
      },
    }),

    // Items Endpoints
    getAllItems: builder.query({
      query: (query = {}) => {
        const { page = 1, limit = 10 } = query;
        const finalQuery = { page, limit };

        let params = new URLSearchParams();
        if (page) {
          for (const [key, value] of Object.entries(finalQuery)) {
            params.append(key, value);
          }
        }

        return `${ADMIN_API_URL}/items/all/?${params.toString()}`;
      },
    }),

        // Orders Endpoints
        getAllOrders: builder.query({
          query: (query = {}) => {
            const { page = 1, limit = 10 } = query;
            const finalQuery = { page, limit };
    
            let params = new URLSearchParams();
            if (page) {
              for (const [key, value] of Object.entries(finalQuery)) {
                params.append(key, value);
              }
            }
    
            return `${ADMIN_API_URL}/order/all/?${params.toString()}`;
          },
        }),
  }),
});

export const {
  useGetAllShopAdminQuery,
  useGetAllShopDropdownQuery,
  useGetReviewByShopIdQuery,
  useGetAverageRatingQuery,
  useCreateShopAdminMutation,
  useUpdateShopAdminMutation,
  useUpdateShopStatusAdminMutation,
  useDeleteShopAdminMutation,
  useGetAllManagersQuery,
  useAddManagerMutation,
  useUpdateManagerMutation,
  useDeleteManagerMutation,
  useGetAllCustomersQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useGetAllCategoryQuery,
  useGetAllItemsQuery,
  useGetAllOrdersQuery
} = adminsSlice;
