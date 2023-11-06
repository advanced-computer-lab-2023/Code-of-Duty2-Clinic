import { useLocation } from "react-router-dom";

/**
 * Returns the first path of the current location.
 * e.g. if the current location is "/foo/bar", this will return "foo".
 */
function useFirstPath() {
    const location = useLocation();
    const parts = location.pathname.split("/");
    return parts[1];
}

export default useFirstPath;