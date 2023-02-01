import photo from "../images/RestaurantUpperImage.jpg";

const RestaurantPhoto = ({restaurantDetail}) => {
  return (
    <div>
      <img
        src={restaurantDetail.image}
        alt="Restaurant Cover"
        style={{ width: "100%", height:"15em" , objectFit: 'cover'}}
      />
    </div>
  );
};

export default RestaurantPhoto;
