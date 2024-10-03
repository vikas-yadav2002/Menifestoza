
const Avatar = ({ name  , size } : {
    name : string,
    size : number
}) => {
  // Function to get initials from the name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="w-[2.5vw] h-[4.5vh] rounded-full bg-black text-white flex items-center justify-center text-[3vh] font-bold">
      {getInitials(name)}
    </div>
  );
};

export default Avatar;