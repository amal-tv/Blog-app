import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-6">
      <div className="container mx-auto px-4 flex justify-around   items-center md:items-center  md:space-y-0">
        <div className="flex flex-col space-y-2">
          <div className="font-semibold text-lg">Featured Blogs</div>
          <div>Most Viewed</div>
          <div>Readers Choice</div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="font-semibold text-lg">Forum</div>
          <div>Support</div>
          <div>Recent Posts</div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="font-semibold text-lg">Privacy Policy</div>
          <div>About Us</div>
          <div>Terms & Conditions</div>
        </div>
      </div>
      <div className="text-center mt-4 text-sm">
        All rights reserved @amal.dev
      </div>
    </footer>
  );
}
