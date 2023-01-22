import logo from "../../images/logo1-white.png";

const Logo = () => {
  return (
    <div>
      <img
        src={logo}
        alt="Logo"
        style={{ width: "45px", color: "white" }}
        className="p-2 logo_color"
      />
    </div>
  );
};

export default Logo;
