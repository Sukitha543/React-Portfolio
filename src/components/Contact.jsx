import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Firebase logic will be added here in the next step
    console.log('Form submitted (UI only for now):', formData);
  };

  return (
    <div className="flex-1 bg-[#0A0A0A] border border-[#B89C62] rounded-xl p-8 lg:p-10 shadow-lg shadow-black/50">
      <h2 className="text-white text-3xl font-bold mb-8">Contact Me</h2>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-white text-sm font-semibold">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-black border border-[#B89C62] rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#B89C62] transition-colors"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="subject" className="text-white text-sm font-semibold">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="bg-black border border-[#B89C62] rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#B89C62] transition-colors"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="message" className="text-white text-sm font-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="bg-black border border-[#B89C62] rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#B89C62] transition-colors resize-none"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-[#B89C62] text-black font-bold py-2 px-8 rounded-md hover:bg-[#d4b97a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B89C62] focus:ring-offset-2 focus:ring-offset-black"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
