import { IconButton } from "@material-tailwind/react";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
export default function ReloadButton() {
  const reloadPage = () => {
    // Reload the page without causing routing issues
    window.location.reload();
  };

  return (
    <div>
      <IconButton onClick={reloadPage}>
        <ArrowPathRoundedSquareIcon className="h-6 w-6" />
      </IconButton>
    </div>
  );
}
