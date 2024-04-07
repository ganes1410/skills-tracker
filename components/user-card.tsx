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
import { AvatarIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function UserCard({
  userId = "",
  userName = "",
  profileImage = "",
  skills = [],
}: {
  userId: string;
  userName: string | null;
  profileImage: string | null;
  skills: Skill[];
}) {
  return (
    <Card className="w-full flex flex-col bg-white">
      {/* Edit Button */}
      <CardHeader>
        <div className="flex items-start">
          <AvatarIcon className="w-8 h-auto mr-2" />
          <div>
            <CardTitle>{userName}</CardTitle>
            <CardDescription>Frontend</CardDescription>
          </div>
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
          href={`/dashboard/${userId}`}
          className={buttonVariants({ variant: "default" })}
        >
          View profile
        </Link>
      </CardFooter>
    </Card>
  );
}
