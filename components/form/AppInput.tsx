import { Label } from "@/components/ui/label";

export default function AppInput({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <Label htmlFor={name}>{label}</Label>
      {children}
    </div>
  );
}
