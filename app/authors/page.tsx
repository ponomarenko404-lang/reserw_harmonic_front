import { Suspense } from "react";
import AuthorsPageContent from "./AuthorsPageContent";

export default function AuthorsPage() {
  return (
    <Suspense fallback={null}>
      <AuthorsPageContent />
    </Suspense>
  );
}