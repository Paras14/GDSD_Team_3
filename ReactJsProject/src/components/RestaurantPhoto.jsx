import photo from "../images/RestaurantUpperImage.jpg";

const RestaurantPhoto = () => {
  return (
    <div>
      <img
        src={photo}
        alt="Restaurant Cover"
        style={{ width: "92%", height:"15em" , objectFit: 'cover'}}
      />
    </div>
  );
};

export default RestaurantPhoto;
