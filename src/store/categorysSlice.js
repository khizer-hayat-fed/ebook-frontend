import { baseApiSlice } from "./baseApiSlice";
const CATEGORIES_URL = "/api/category";

export const categorysSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryById: builder.query({
      query: (id) => `${CATEGORIES_URL}/${id}`
    }),
    getAllCategoriesOption: builder.query({
      query: (id) => `${CATEGORIES_URL}/option/${id}`
    }),
    getAllCategories: builder.query({
        query: (query = {}) => {
            const { page = 1, limit = 5, shopId } = query;
            const finalQuery = { page, limit, shopId };
    
            let params = new URLSearchParams();
            if (page) {
              for (const [key, value] of Object.entries(finalQuery)) {
                params.append(key, value);
              }
            }
    
            return `${CATEGORIES_URL}/?${params.toString()}`;
          },
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: CATEGORIES_URL,
        method: "POST",
        body
      })
    }),
    updateCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "PUT",
        body
      })
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "DELETE"
      })
    })
  })
});

export const {
  useGetCategoryByIdQuery,
  useGetAllCategoriesOptionQuery,
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categorysSlice;
