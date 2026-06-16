import { revalidatePath } from "next/cache";

export function revalidatePublicContent() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/employers");
  revalidatePath("/contact");
  revalidatePath("/practice-areas");
}

export function revalidatePracticeAreaSlug(slug: string) {
  revalidatePublicContent();
  revalidatePath(`/practice-areas/${slug}`);
}
