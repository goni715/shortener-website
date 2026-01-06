import { BASE_URL } from "@/constant/global.constant";
import { redirect } from "next/navigation";

async function redirectUrl(id: string) {
  const res = await fetch(`${BASE_URL}/url/redirect/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  const originalUrl = data?.data;
  redirect(originalUrl);
}

interface TProps {
  params: Promise<{
    code: string;
  }>;
}

const RedirectPage = async ({ params }: TProps) => {
  const { code } = await params;
  await redirectUrl(code);
};

export default RedirectPage;
