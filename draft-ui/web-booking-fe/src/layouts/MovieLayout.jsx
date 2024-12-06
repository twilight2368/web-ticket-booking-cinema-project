import { Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
export default function MovieLayout() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Get search params object
  const [searchParams] = useSearchParams();
  // Retrieve the 'query' parameter from the URL
  const queryValue = searchParams.get("query");
  return (
    <div className=" padding-for-header">
      MovieLayout {id} {queryValue ? queryValue : "undefine"}
      <Button
        onClick={() => {
          navigate("?query=sdfasfasf");
        }}
      >
        Click
      </Button>
    </div>
  );
}
