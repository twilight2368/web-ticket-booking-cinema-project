import { Button } from "@material-tailwind/react";
import React from "react";

export default function ReloadButton() {
  const reloadPage = () => {
    // Reload the page without causing routing issues
    window.location.reload();
  };

  return (
    <div>
      <Button
        onClick={reloadPage}
      >
        Reload Page
      </Button>
    </div>
  );
}
