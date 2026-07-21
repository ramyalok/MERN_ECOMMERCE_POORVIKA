 import React from "react";

 const Footer = () => {
   return (
     <footer className="bg-gray-100 text-center">
       <div className="py-6">
         <div className="flex justify-center gap-4 flex-wrap">
           <a
             href="#"
             className="bg-[#3b5998] text-white p-3 rounded-full hover:opacity-80"
           >
             <i className="fab fa-facebook-f"></i>
           </a>

           <a
             href="#"
             className="bg-[#55acee] text-white p-3 rounded-full hover:opacity-80"
           >
             <i className="fab fa-twitter"></i>
           </a>

           <a
             href="#"
             className="bg-[#dd4b39] text-white p-3 rounded-full hover:opacity-80"
           >
             <i className="fab fa-google"></i>
           </a>

           <a
             href="#"
             className="bg-[#ac2bac] text-white p-3 rounded-full hover:opacity-80"
           >
             <i className="fab fa-instagram"></i>
           </a>

           <a
             href="#"
             className="bg-[#0082ca] text-white p-3 rounded-full hover:opacity-80"
           >
             <i className="fab fa-linkedin-in"></i>
           </a>

           <a
             href="#"
             className="bg-[#333333] text-white p-3 rounded-full hover:opacity-80"
           >
             <i className="fab fa-github"></i>
           </a>
         </div>
       </div>

       <div className="bg-gray-200 py-3">
         <p className="text-gray-700 text-sm">
           © 2026 Copyright:
           <a href="#" className="ml-2 font-semibold hover:underline">
             PoorvikaStore.com
           </a>
         </p>
       </div>
     </footer>
   );
 };

 export default Footer;
