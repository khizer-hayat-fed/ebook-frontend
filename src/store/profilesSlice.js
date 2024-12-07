import { baseApiSlice } from "./baseApiSlice";
const PROFILE_URL = "/api/profiles"

export const profilesSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: (id) => `${PROFILE_URL}/${id}`
        }),
        deleteProfile: builder.mutation({
            query: (id) => ({
              url: `${PROFILE_URL}/${id}`,
              method: "DELETE",
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => {

                const body = new FormData();
                // Loop through the keys in the data object
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        // Append key-value pairs to the body object
                        body.append(key, data[key]);
                    }
                }

                return {
                    url: `${PROFILE_URL}`,
                    method: 'PUT',
                    body: body,
                };
            },
        }),
        createProfile: builder.mutation({
            query: (data) => {

                const body = new FormData();
                // Loop through the keys in the data object
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        // Append key-value pairs to the body object
                        body.append(key, data[key]);
                    }
                }

                return {
                    url: `${PROFILE_URL}`,
                    method: 'POST',
                    body: body,
                };
            },
        }),
    })
})

export const { useGetUserProfileQuery , useUpdateUserMutation, useCreateProfileMutation, useDeleteProfileMutation } = profilesSlice