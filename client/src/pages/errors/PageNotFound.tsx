import PageError from "../../components/PageError";
import pageNotFound from "../../assets/pageNotFound.jpg";

const PageNotFound: React.FC = () => {
  return (
    <PageError title="404" message="Page not found">
      <img src={pageNotFound} alt="Not Found" style={{ maxWidth: "60%", height: "auto" }} />
    </PageError>
  );
};

export default PageNotFound;
