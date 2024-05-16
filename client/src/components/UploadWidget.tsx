import { useEffect , useRef } from "react";

function UploadWidget({ productForm, setProductForm, onUploadSuccess }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dbq8kigrk",
        uploadPreset: "f35qfyph"
      },
      function(error, result) {
        if (!error && result && result.event === "success") {
          const {secure_url ,public_id} = result.info;
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
    <button onClick={handleUploadClick}>
      Upload
    </button>
  );
}

export default UploadWidget;





// import { useEffect, useRef } from "react";
// import cloudinary from "cloudinary-core";

// function UploadWidget() {
//   const cloudinaryRef = useRef<any>(null);

//   useEffect(() => {
//     cloudinaryRef.current = cloudinary.Cloudinary.new({
//       cloud_name: "YOUR_CLOUD_NAME", 
//       secure: true 
//     });
//   }, []);

//   return (
//     <div>
//       {/* Your upload widget component */}
//     </div>
//   );
// }

// export default UploadWidget;
