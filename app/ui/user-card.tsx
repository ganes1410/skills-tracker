import type { Skill } from "@/db/schema";

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
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        <button
          id="editButton"
          data-dropdown-toggle="edit"
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={profileImage ?? ""}
          alt="user profile image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {userName}
        </h5>

        {/* map the user skills here from user.skills */}
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
      </div>
    </div>
  );
}

export default UserCard;
