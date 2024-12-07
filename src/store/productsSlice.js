import { baseApiSlice } from "./baseApiSlice";
const PRODUCTS_URL = "/api/products";

export const productsSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductById: builder.query({
        query: (id) => `${PRODUCTS_URL}/${id}`
    }),
    getProductByUserId: builder.query({
        // query: (userId) => `${PRODUCTS_URL}/userproduct/${userId}`
    }),
    getProductByShopId: builder.query({
      query: (query = {}) => {
        const { page = 1, limit = 5, shopId } = query;
        const finalQuery = { page, limit, shopId };

        let params = new URLSearchParams();
        if (page) {
          for (const [key, value] of Object.entries(finalQuery)) {
            params.append(key, value);
          }
        }

        return `${PRODUCTS_URL}/manager/?${params.toString()}`;
      },
  }),
  getAllProductByShopId: builder.query({
    query: (shopId) => `${PRODUCTS_URL}/all/${shopId}`
}),
    createProduct: builder.mutation({
      
      query: (newProduct) => {
        const body = new FormData();
        // Loop through the keys in the data object
        for (const key in newProduct) {
            if (newProduct.hasOwnProperty(key)) {
                // Append key-value pairs to the body object
                body.append(key, newProduct[key]);
            }
        }

        return {
        url: PRODUCTS_URL,
        method: "POST",
        body
        }
      },
    }),
    updateProduct: builder.mutation({
      query: (body) => {
        const bodyObject = new FormData();
        // Loop through the keys in the data object
        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                // Append key-value pairs to the body object
                bodyObject.append(key, body[key]);
            }
        }
        return {
        url: `${PRODUCTS_URL}`,
        method: "PUT",
        body: bodyObject,
        }
      },
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetProductByUserIdQuery,
  useGetProductByShopIdQuery,
  useGetAllProductByShopIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsSlice;
