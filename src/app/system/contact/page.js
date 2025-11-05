// src/app/contact/page.js

const ContactForm = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
      
      <form className="space-y-6">
        {/* Input Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Input Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Textarea Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your message"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
