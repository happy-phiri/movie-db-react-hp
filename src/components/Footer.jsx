import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="footer">
        <p>Copyright &copy; {year}</p>
        <div className="footer-icons">
          <a href="https://wwww.facebook.com/hpy.phiri">
            <FontAwesomeIcon icon={faFacebook} size="xl" className="fav-icon" />
          </a>
          <a href="https://www.twitter.com">
            <FontAwesomeIcon icon={faTwitter} size="xl" className="fav-icon" />
          </a>
          <a href="www.linkedin.com/in/happy-phiri-91b0991b5">
            <FontAwesomeIcon icon={faLinkedin} size="xl" />
          </a>
          <a href="https://github.com/happy-phiri">
            <FontAwesomeIcon icon={faGithub} size="xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
