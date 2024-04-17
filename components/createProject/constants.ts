import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name is required",
  }),
  description: z.string().optional(),
});
