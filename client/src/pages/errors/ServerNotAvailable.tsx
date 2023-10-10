import PageError from '../../components/PageError';

const ServerNotAvailable: React.FC = () => {
    return (
       <PageError
            title="502"
            message="Server is currently unavailable"
       />
    );
};

export default ServerNotAvailable;
