import { baseApiSlice } from "./baseApiSlice";
const USERS_URL = "/api/users"

export const usersSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        register: builder.mutation({
            query: (data) => {
                return {
                    url: `${USERS_URL}`,
                    method: 'POST',
                    body: data
                }
            }
        }),
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation} = usersSlice