import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gray-900 text-gray-300 px-3 min-h-[40rem] flex items-center justify-center">
      <div className="w-full max-w-7xl text-center py-14">
        <h1 className="text-white text-6xl lg:text-7xl font-extrabold mb-4">
          Get a RoomMate or Rent house at best price.
        </h1>
        <p className="leading-loose mb-10 max-w-2xl mx-auto">
        Are you in search of the perfect living arrangement that suits both your budget and lifestyle? Look no further! At Your Housing Solution, we understand the importance of finding the ideal roommate or rental house at the best price.
        </p>
        <div className="flex items-center justify-center flex-wrap gap-4">
          <Link
            to="/login"
            className="btn bg-white text-gray-900 hover:bg-gray-200 flex-shrink-0 w-[160px]">
            Login
          </Link>
          <Link to="/login" className="btn btn-primary flex-shrink-0 w-[160px]">
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
