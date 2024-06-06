import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [mapUrl, setMapUrl] = useState("#");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://www.google.com/maps/search/iPhone+shop/@${latitude},${longitude},15z`;
        setMapUrl(url);
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const now = new Date();
  let hours = now.getHours() % 12 || 12;
  const time = `${hours}:${now.getMinutes()}:${now.getSeconds()}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const uniqueKey = `${formData.name + "_message"}-${time}`;
    localStorage.setItem(uniqueKey, JSON.stringify(formData));
    setFormStatus("success");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    if (formStatus === "success") {
      toast.success("Message sent successfully!");
    }
  }, [formStatus]);

  return (
    <div>
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="w-full max-w-md bg-gray-300 hover:bg-gray-400 shadow-md rounded-lg p-6">
          <div className="font-bold text-center text-2xl mb-3">Contact Me</div>
          {formStatus === "success" && (
            <div className="py-2 text-center text-green-600 font-bold">
              Form submitted successfully!
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                placeholder="Your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                required
              />
            </div>
            <div className="mb-3 text-center">
              <button
                className="active:bg-blue-600 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none"
                type="submit"
              >
                Send a message
              </button>
            </div>
          </form>
          <div className="text-center">
            The location to get near the shop is given below:
            <a href={mapUrl} target="_blank" rel="noopener noreferrer">
              <img src="map.png" alt="map" className="mt-2 border border-gray-400 ml-24 h-36 w-52" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
