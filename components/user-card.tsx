import type { Skill } from "@/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function UserCard({
  userName = "",
  profileImage = "",
  skills = [],
}: {
  userName: string | null;
  profileImage: string | null;
  skills: Skill[];
}) {
  return (
    <Card className="w-full">
      {/* Edit Button */}
      <CardHeader>
        <CardTitle>{userName}</CardTitle>
        <CardDescription>Frontend</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Skills</p>
        <ul className="flex flex-wrap space-x-2 text-gray-600 dark:text-gray-400 justify-center">
          {skills.map((skill) => (
            <li
              key={skill.id}
              className="bg-gray-200 dark:bg-gray-700 rounded-md px-2 py-0.5"
            >
              {skill.name}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button>View profile</Button>
      </CardFooter>
    </Card>
  );
}

export default UserCard;
