import { baseApiSlice } from "./baseApiSlice";

const REVIEWS_URL = "/api/review";

export const reviewsSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (body) => ({
        url: REVIEWS_URL,
        method: "POST",
        body,
      }),
    }),
    getAllReviews: builder.query({
      query: (query = {}) => {
        const { page = 1, limit = 5, shopId } = query;
        const finalQuery = { page, limit, shopId };

        let params = new URLSearchParams();
        if (page) {
          for (const [key, value] of Object.entries(finalQuery)) {
            params.append(key, value);
          }
        }

        return `${REVIEWS_URL}/?${params.toString()}`;
      },
    }),
    getReviewById: builder.query({
      query: (id) => `${REVIEWS_URL}/${id}`,
    }),
    updateReviewById: builder.mutation({
      query: ({ id, rating, remark }) => ({
        url: `${REVIEWS_URL}/${id}`,
        method: "PUT",
        body: { rating, remark },
      }),
    }),
    deleteReviewById: builder.mutation({
      query: (id) => ({
        url: `${REVIEWS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks
export const {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
  useGetReviewByIdQuery,
  useUpdateReviewByIdMutation,
  useDeleteReviewByIdMutation,
} = reviewsSlice;