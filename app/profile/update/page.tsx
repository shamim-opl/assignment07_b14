import AuthShell from "@/components/AuthShell";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export const metadata = { title: "তথ্য আপডেট — বাজার দর" };

export default function UpdateProfilePage() {
  return (
    <AuthShell title="তথ্য আপডেট করুন" subtitle="আপনার নাম পরিবর্তন করুন।">
      <UpdateProfileForm />
    </AuthShell>
  );
}
