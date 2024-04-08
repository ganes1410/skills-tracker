import type { Skill } from "@/db/schema";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AvatarIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function UserCard({
  userId = "",
  userName = "",
  skills = [],
  isCurrentUser,
}: {
  userId: string;
  userName: string | null;
  skills: Skill[];
  isCurrentUser: boolean;
}) {
  return (
    <Card className="w-full flex flex-col bg-white">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex">
            <AvatarIcon className="w-8 h-auto mr-2" />
            <div>
              <CardTitle>{userName}</CardTitle>
              <CardDescription>Frontend</CardDescription>
            </div>
          </div>
          {isCurrentUser ? (
            <Link
              href="/my-profile"
              className={cn(
                buttonVariants({ variant: "default", size: "icon" })
              )}
            >
              <Pencil1Icon className="w-5 h-auto" />
            </Link>
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="font-black underline underline-offset-4 mb-2">Skills</h4>
        <ul className="flex flex-wrap gap-2 text-gray-600 dark:text-gray-400">
          {skills.map((skill) => (
            <li key={skill.id}>
              <Badge
                variant="default"
                className="bg-gray-200 text-black hover:text-white cursor-pointer"
              >
                {skill.name}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto ml-auto">
        <Link
          href={isCurrentUser ? "my-profile" : `/profile/${userId}`}
          className={buttonVariants({ variant: "default" })}
        >
          View profile
        </Link>
      </CardFooter>
    </Card>
  );
}
