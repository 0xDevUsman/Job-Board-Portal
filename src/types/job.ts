import zod from "zod";

export const jobSchema = zod.object({
  title: zod.string(),
  company: zod.string(),
  location: zod.string(),
  description: zod.string(),
  requirements: zod.string(),
  salary: zod.number().optional(),
  jobType: zod.enum(["Full-time", "Part-time", "Contract", "Internship"]),
  postedBy: zod.string(),
});
