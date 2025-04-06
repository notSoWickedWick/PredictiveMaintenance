const NavBar = () => {
  return (
    <div className="w-full bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-white shadow-md px-8 py-4 sticky top-0 z-50 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Predictive Maintenance</h1>
        <nav>
          <ul className="flex space-x-8 text-lg">
            <li className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 hover:text-blue-700 cursor-pointer">
              Predictor
            </li>
            <li className="text-gray-600 hover:text-blue-500 cursor-pointer">
              Reports
            </li>
            <li className="text-gray-600 hover:text-blue-500 cursor-pointer">
              Settings
            </li>
            <li className="text-gray-600 hover:text-blue-500 cursor-pointer">
              Help
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
