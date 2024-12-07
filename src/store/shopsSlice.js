import { baseApiSlice } from "./baseApiSlice";

const SHOPS_URL = "/api/shop";

export const shopsSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShopById: builder.query({
      query: (id) => `${SHOPS_URL}/${id}`,
    }),
    getAllShop: builder.query({
      query: () => `${SHOPS_URL}/all`,
    }),
    createShop: builder.mutation({
      query: (body) => ({
        url: SHOPS_URL,
        method: "POST",
        body,
      }),
    }),
    updateShop: builder.mutation({
      query: ({ id, body }) => ({
        url: `${SHOPS_URL}/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteShop: builder.mutation({
      query: (id) => ({
        url: `${SHOPS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks
export const {
  useGetShopByIdQuery,
  useGetAllShopQuery,
  useCreateShopMutation,
  useUpdateShopMutation,
  useDeleteShopMutation,
} = shopsSlice;
