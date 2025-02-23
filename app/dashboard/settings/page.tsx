import ChangePasswordForm from "@/components/molecules/forms/ChangePasswordForm";
import PageHeader from "@/components/atoms/layout/PageHeader";
import PageContent from "@/components/atoms/layout/PageContent";
import Tabs, { Tab, TabContent } from "@/components/atoms/layout/Tabs";

export default function SettingsPage() {
  return (
    <PageContent>
      <PageHeader title="Ustawienia" />
      <Tabs>
        <Tab>
          <span>Zmiana hasła</span>
        </Tab>
        <TabContent>
          <ChangePasswordForm />
        </TabContent>
      </Tabs>
    </PageContent>
  );
}
