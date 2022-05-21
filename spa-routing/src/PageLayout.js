import { Link } from "react-router-dom";
const PageLayout = ({ heading, links, children }) => {
  return (
    <div>
      <h2>{heading}</h2>

      <nav>
        {links.map(({ to, text }) => (
          <li>
            <Link to={to}>{text}</Link>
          </li>
        ))}
      </nav>
    </div>
  );
};

export default PageLayout;
