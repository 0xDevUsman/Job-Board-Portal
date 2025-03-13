import zod from "zod";

export const applicationSchema = zod.object({
  jobId: zod.string(),
  userId: zod.string(),
  resume: zod.string(),
  status: zod.enum(["Pending", "Accepted", "Rejected"]),
});
