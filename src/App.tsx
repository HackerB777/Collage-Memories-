import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FaPhotoVideo } from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function CollegeMemories() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isRegistering, setIsRegistering] = useState(false);
  const [users, setUsers] = useState([
    { username: "student1", password: "password123" },
    { username: "student2", password: "cyber2025" },
    { username: "admin", password: "adminpass" },
  ]);
  const [images, setImages] = useState([
    "/images/college1.jpg",
    "/images/college2.jpg",
    "/images/college3.jpg",
    "/images/college4.jpg",
    "/images/college5.jpg",
    "/images/college6.jpg",
  ]);
  const [videos, setVideos] = useState([
    "/videos/event1.mp4",
    "/videos/event2.mp4",
    "/videos/event3.mp4",
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const userFound = users.find(
      (user) => user.username === formData.username && user.password === formData.password
    );
    if (userFound) {
      setLoggedIn(true);
    } else {
      alert("Invalid username or password");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const exists = users.some((user) => user.username === formData.username);
    if (exists) {
      alert("Username already exists");
    } else {
      setUsers([...users, { username: formData.username, password: formData.password }]);
      alert("Registration successful! You can now log in.");
      setIsRegistering(false);
      setFormData({ username: "", password: "" });
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (file.type.startsWith("image/")) {
        setImages([url, ...images]);
      } else if (file.type.startsWith("video/")) {
        setVideos([url, ...videos]);
      } else {
        alert("Only image and video files are supported.");
      }
    }
  };

  if (!loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <motion.div
          className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-xl"
          initial="hidden"
          animate="show"
          variants={fadeIn}
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            {isRegistering ? "Register for Paavai Cyber 2K 25" : "Login to Paavai Cyber 2K 25"}
          </h2>
          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isRegistering ? "Register" : "Login"}
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            {isRegistering ? (
              <>
                Already have an account? {" "}
                <button
                  onClick={() => setIsRegistering(false)}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account? {" "}
                <button
                  onClick={() => setIsRegistering(true)}
                  className="text-blue-600 hover:underline"
                >
                  Register
                </button>
              </>
            )}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <motion.h1
        className="text-4xl font-bold text-center"
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        Paavai Cyber 2K 25
      </motion.h1>

      <motion.p
        className="text-center text-gray-600 max-w-2xl mx-auto"
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        Relive the unforgettable moments of college life through this animated album filled with photos and videos of friends, events, and fun times.
      </motion.p>

      <div className="text-center">
        <label className="cursor-pointer bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700">
          Upload Your Memory
          <input type="file" accept="image/*,video/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      <motion.h2
        className="text-3xl font-semibold text-center mt-10"
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        Photo Memories
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="show"
        variants={fadeIn}
      >
        {images.map((src, i) => (
          <Card key={i} className="overflow-hidden rounded-2xl shadow-lg">
            <CardContent className="p-0">
              <motion.img
                src={src}
                alt={`Memory ${i + 1}`}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              />
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.h2
        className="text-3xl font-semibold text-center mt-12"
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        Videos
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="show"
        variants={fadeIn}
      >
        {videos.map((src, i) => (
          <Card key={i} className="overflow-hidden rounded-2xl shadow-lg">
            <CardContent className="p-0">
              <motion.video
                src={src}
                controls
                className="w-full h-64 object-cover"
                whileHover={{ scale: 1.02 }}
              />
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
