import CategoryBlock from '../../components/CategoryBlock';

import ForRentCategoryBg from '../../assets/images/for-rent-category-bg.jpg';
import ForSaleCategoryBg from '../../assets/images/for-sale-category-bg.jpg';

function BrowseByCateogry() {
  return (
    <>
      <h2 className="text-4xl font-bold text-gray-900 mb-2 text-center">Browse by category</h2>
      <p className="text-gray-600 leading-loose text-center mb-8">
        Discover a world of possibilities by exploring our diverse range of categories
      </p>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 md:gap-8">
        <CategoryBlock bgImage={ForSaleCategoryBg} categoryName="For RoomMate" to="/category/sale" />
        <CategoryBlock bgImage={ForRentCategoryBg} categoryName="For Rent" to="/category/rent" />
      </div>
    </>
  );
}

export default BrowseByCateogry;
