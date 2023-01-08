import "../styles/about.css";
import parasIMG from "../static/Paras_img.png";
import vichitarIMG from "../static/Photo_Vichitar.jpg";

const About = () => {
  return (
    <div>
      <h1>About Our Team</h1>
      <div class="header">Landing Page Milestone_0</div>
      <div class="content">
        <h1>Meet our Team</h1>
        <div class="container">
          <div class="flex-items">
            <a href="http://team3gdsdweb.s3-website-us-east-1.amazonaws.com/personal_webpages/Luis-site.html">
              <img
                src="https://avatars.githubusercontent.com/u/74145538?v=4"
                alt="Luis_image"
              />
            </a>
            <div class="info">Luis</div>
          </div>
          <div class="flex-items">
            <a href="http://team3gdsdweb.s3-website-us-east-1.amazonaws.com/personal_webpages/ABOUT_Jesus.html">
              <img
                src="https://avatars.githubusercontent.com/u/74461667?v=4"
                alt="Jesus_image"
              />
            </a>
            <div class="info">Jesús</div>
          </div>
          <div class="flex-items">
            <a href="http://team3gdsdweb.s3-website-us-east-1.amazonaws.com/personal_webpages/Noman.html">
              <img
                src="https://avatars.githubusercontent.com/u/87797326?v=4"
                alt="Noman_image"
              />
            </a>
            <div class="info">Noman</div>
          </div>
          <div class="flex-items">
            <a href="http://team3gdsdweb.s3-website-us-east-1.amazonaws.com/personal_webpages/Paras-CV.html">
              <img src={parasIMG} alt="Paras_image" />
            </a>
            <div class="info">Paras</div>
          </div>
          <div class="flex-items">
            <a href="http://team3gdsdweb.s3-website-us-east-1.amazonaws.com/personal_webpages/Vichitar_About_Page.html">
              <img src={vichitarIMG} alt="Vichitar_image" />
            </a>
            <div class="info">Vichitar</div>
          </div>
          <div class="flex-items">
            <a href="http://team3gdsdweb.s3-website-us-east-1.amazonaws.com/personal_webpages/aboutHassan.html">
              <img
                src="https://avatars.githubusercontent.com/u/95298592?v=4"
                alt="Hassan_image"
              />
            </a>
            <div class="info">Hassan</div>
          </div>
        </div>
      </div>
      <div class="links">
        Github : - &gt;
        <a href="https://github.com/Paras14/GDSD_Team_3">GDSD_Team_3</a>
      </div>
      <div class="footer">Made with teamwork</div>
    </div>
  );
};

export default About;
