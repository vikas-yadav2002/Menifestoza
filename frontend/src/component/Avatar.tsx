

const Avatar = ({ name, size }: any ) => {


  // Function to get initials from the name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  
  

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
