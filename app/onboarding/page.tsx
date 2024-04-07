import CreateUserForm from "@/components/form/CreateUserForm";
import { Suspense } from "react";

export default function Onboarding() {
  return (
    <div>
      <h1 className="font-black text-3xl">Let&apos;s get you set up!</h1>
      <p className="mt-3">
        Please update these details before we can take you to the world&apos;s
        most beautiful dashboard.
      </p>
      {/* <Suspense>
        <CreateUserForm />
      </Suspense> */}
    </div>
  );
}
