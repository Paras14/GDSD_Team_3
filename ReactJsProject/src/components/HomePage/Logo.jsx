import logo from "../../images/logo1.png";

const Logo = () => {
  return (
    <div>
      <img
        src={logo}
        alt="logo"
        style={{ width: "45px" }}
        className="p-2 logo__color"
      />
    </div>
  );
};

export default Logo;
