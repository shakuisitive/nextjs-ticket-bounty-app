import { Heading } from "@/components/heading";
import { AccountTables } from "../_navigation/tabs";

const ProfilePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Profile"
        description="All your profile information"
        tabs={<AccountTables />}
      />
    </div>
  );
};

export default ProfilePage;
