import { getUserDetails } from "@/lib/actions";

async function Profile({ params }: { params: { profileId: string } }) {
  const userData = await getUserDetails({
    userId: params.profileId,
    isCurrentUser: false,
  });

  if (!userData) return null;
  return <p>{userData?.name}</p>;
}

export default Profile;
