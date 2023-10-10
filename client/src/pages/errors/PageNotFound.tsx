import PageError from '../../components/PageError';

const PageNotFound: React.FC = () => {
    return (
       <PageError
            title="404"
            message="Page not found"
       />
    );
};

export default PageNotFound;
