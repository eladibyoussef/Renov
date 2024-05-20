import { useEffect, useRef } from "react";

function UploadWidget({ onUploadSuccess, customElement }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dbq8kigrk",
        uploadPreset: "f35qfyph",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          const { secure_url, public_id } = result.info;
          console.log(result);
          onUploadSuccess(secure_url, public_id);
        }
      }
    );
  }, []);

  const handleUploadClick = (e) => {
    e.preventDefault();
    widgetRef.current.open();
  };

  return (
    <div onClick={handleUploadClick} style={{ zIndex: 10000 }} className=" z-50">
      {customElement}
    </div>
  );
}

export default UploadWidget;
