import React from "react";
import Footer from "../components/ui/Footer";

const Contact = () => {
  return (
    <div>
      <section
        className="flex flex-col p-4 m-8 justify-center items-center text-4xl bodoni
				md:text-6xl  my-12"
        id="intro"
      >
        Contact
      </section>

      <div className="flex flex-col w-full gap-4 justify-center items-center">
        <div className="text-4xl garbata text-center">
          Call us (Monday - Friday)(9am - 6pm) +91 7666018928
        </div>
        <div className="text-4xl garbata text-center">
          Reach us out on our Whatsapp : <br></br>
          +91 766018928 <br></br>
          Instagram : luxuriant_luxe or
          <br></br>
          Mail : luxeluxuriant@gmail.com
        </div>
      </div>
      {/* Your contact page content goes here */}
      <Footer />
    </div>
  );
};

export default Contact;
