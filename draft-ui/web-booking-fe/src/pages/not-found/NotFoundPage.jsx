import { Helmet } from "react-helmet";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404:This page could not be found</title>
      </Helmet>
      <div className=" h-screen padding-for-header flex justify-center items-center">
        <div className=" text-3xl ">
          <span className=" border-r-2 p-6">404</span>
          <span className="p-6"> This page could not be found.</span>
        </div>
      </div>
    </>
  );
}
