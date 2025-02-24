import ChangePasswordForm from "@/components/molecules/forms/ChangePasswordForm";
import PageHeader from "@/components/atoms/layout/PageHeader";
import PageContent from "@/components/atoms/layout/PageContent";
import Tabs from "@/components/atoms/layout/Tabs";

export default function SettingsPage() {
  return (
    <PageContent>
      <PageHeader title="Ustawienia" />
      <Tabs
        tabs={[
          { label: "Zmiana hasła", content: <ChangePasswordForm /> },
          { label: "Zmiana danych", content: <ChangePasswordForm /> },
        ]}
      />
    </PageContent>
  );
}
