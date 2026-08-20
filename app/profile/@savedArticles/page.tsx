import SavedArticles from "@/components/profile/SavedArticles/SavedArticles";

type SlotPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function SavedArticlesSlot({
  searchParams,
}: SlotPageProps) {
  const { tab } = await searchParams;

  if (tab !== "saved") {
    return null;
  }

  return <SavedArticles />;
}
