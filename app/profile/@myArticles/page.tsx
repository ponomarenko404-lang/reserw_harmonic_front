import MyArticles from "@/components/profile/MyArticles/MyArticles";

type SlotPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function MyArticlesSlot({ searchParams }: SlotPageProps) {
  const { tab } = await searchParams;

  if (tab === "saved") {
    return null;
  }

  return <MyArticles />;
}
