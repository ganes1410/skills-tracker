import AppInput from "@/components/form/AppInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Onboarding() {
  return (
    <div>
      <h1 className="font-black text-3xl">Let&apos;s get you set up!</h1>
      <p className="mt-3">
        Please update these details before we can take you to the world&apos;s
        most beautiful dashboard.
      </p>
      <form className="my-8">
        <AppInput label="Name" name="name">
          <Input type="text" id="name" placeholder="Enter your full name" />
        </AppInput>
        <AppInput label="Email" name="email">
          <Input
            type="email"
            id="email"
            placeholder="Enter your primary email"
          />
        </AppInput>
      </form>
    </div>
  );
}
