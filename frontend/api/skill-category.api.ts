import { CreateSkillCategoryRequest } from "@/schema/skill-category.schema";
import api from "./api";

export async function createSkillCategory(request: CreateSkillCategoryRequest) {
  return api.post("/skill-categories", request, {
    data: request,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
