/* eslint-disable import/no-cycle */

import { api } from "../api";
import paths from "./paths";
import { UpdateProfileRequest, UpdateProfileResponse } from "./types";

export const fastamoniApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateProfile: build.mutation<UpdateProfileResponse, UpdateProfileRequest>({
      query: (credentials) => {
        const { id, job, username } = credentials;
        return {
          body: {
            job,
            name: username,
          },
          method: "POST",
          url: paths.updateProfile(id),
        };
      },
    }),
  }),
});

export const { useUpdateProfileMutation } = fastamoniApi;
