const Profile = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">Vishakha More</h2>
            <p className="text-gray-500">Frontend Developer</p>
          </div>
        </div>
        <div className="text-sm text-gray-700 space-y-2">
          <p><strong>Email:</strong> vishakham2506@gmail.com</p>
          <p><strong>Phone:</strong> +91-8459885369</p>
          <p><strong>Location:</strong> Mumbai, India</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;