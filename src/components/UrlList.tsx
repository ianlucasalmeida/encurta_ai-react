import { Link } from "@prisma/client";

const UrlList = ({ urls }:{urls:Link[]}) => {
  return (
    <ul className="url-list">
      {urls.map((url, index) => (
        <li key={url.id}>
          <a className="link-encurtado" href={"http://localhost:3000/"+url.id} target="_blank" rel="noopener noreferrer">
            {"http://localhost:3000/"+url.id}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default UrlList;