import useUser from "../hooks/Useuser";
import AvatarSkeleton from "./AvatarSkeleton"; // Ensure this path is correct

const Avatar = ({ name, size }: any ) => {
  const { loading } = useUser();

  // Function to get initials from the name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  // Return the skeleton loader while loading is true
  if (loading) {
    return <AvatarSkeleton />;
  }

  // Show the avatar with initials after loading is done
  return (
    <div
      className={`w-${size} h-${size} rounded-full bg-black text-white flex items-center justify-center text-[3vh] font-bold`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
