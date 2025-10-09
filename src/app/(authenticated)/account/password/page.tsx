import { Heading } from "@/components/heading";
import { AccountTables } from "../_navigation/tabs";

const PasswordPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Password"
        description="Keep your account secure"
        tabs={<AccountTables />}
      />
    </div>
  );
};

export default PasswordPage;
