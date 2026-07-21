import React from 'react'

const About = () => {
  return (
    <>
      <div className="p-5 bg-white shadow m-5 rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">About Us</h2>
        <p className="text-gray-500 text-center">
          At Poorvika Stores, we are committed to providing our customers with
          the best shopping experience. We offer a wide range of products, from
          electronics to fashion, all at competitive prices. Our mission is to
          make shopping easy and enjoyable for everyone.
        </p>
        <div className="flex  justify-center items-center">
          <img
            className="h-100 m-5 rounded-xl shadow-lg object-cover"
            src="https://media.istockphoto.com/id/2223523565/photo/excited-female-entrepreneur-shares-an-insightful-talk-on-technology-and-leadership-at-a.jpg?s=2048x2048&w=is&k=20&c=gLn8PjKvl7aeZlLoBSliHMwlVWMEboPtCmnGsoQmJvo="
            alt="founder"
          />
        </div>
        <p className="text-gray-500 text-center mt-4">
          Founded in 1990, Poorvika Stores has grown to become one of the
          leading retailers in the industry. We pride ourselves on our excellent
          customer service and our dedication to quality.
        </p>
        <p className="text-gray-500 text-center mt-4">
          Thank you for choosing Poorvika Stores. We look forward to serving
          you!
        </p>
      </div>
    </>
  );
}
   
  
 

export default About