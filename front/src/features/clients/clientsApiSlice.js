import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const clientsAdapter = createEntityAdapter({});

const initialState = clientsAdapter.getInitialState();

export const clientsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getClients: builder.query({
            query: (args) => ({
                url: `/getClients/${args}`,
                params: args,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),

            transformResponse: (responseData) => {
                const loadedClients = responseData.map((client) => {
                    client.id = client._id;
                    return client;
                });
                return clientsAdapter.setAll(initialState, loadedClients);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Client", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Client", id })),
                    ];
                } else return [{ type: "Client", id: "LIST" }];
            },
        }),
        addNewClient: builder.mutation({
            query: (initialClientData) => ({
                url: "/client",
                method: "POST",
                body: {
                    ...initialClientData,
                },
            }),
            invalidatesTags: [
                {
                    type: "Client",
                    id: "LIST",
                },
            ],
        }),
        updateClient: builder.mutation({
            query: (initialClientData) => ({
                url: "/client",
                method: "PATCH",
                body: {
                    ...initialClientData,
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Client", id: arg.id },
            ],
        }),
        deleteClient: builder.mutation({
            query: ({ clientId }) => ({
                url: `/client`,
                method: "DELETE",
                body: { clientId },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Client", id: arg.id },
            ],
        }),
    }),
});

export const {
    useGetClientsQuery,
    useAddNewClientMutation,
    useDeleteClientMutation,
    useUpdateClientMutation,
} = clientsApiSlice;

// returns the query result object
export const selectClientsResult =
    clientsApiSlice.endpoints.getClients.select();

// creates memoized selector
const selectClientsData = createSelector(
    selectClientsResult,
    (clientsResult) => clientsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllClients,
    selectById: selectClientById,
    selectIds: selectClientIds,
    // Pass in a selector that returns the clients slice of state
} = clientsAdapter.getSelectors(
    (state) => selectClientsData(state) ?? initialState
);
