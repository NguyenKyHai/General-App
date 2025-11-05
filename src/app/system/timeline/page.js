'use client'

import FloatingFlowers from '@/components/FloatingFlowers';
import Timeline from '@/components/Timeline';

const ContactForm = () => {
   return (
    <div className="min-h-screen py-8 px-4 flex justify-center items-start">
      <div className="w-full max-w-3xl p-6">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">🔔 Timeline Chuỗi Sự Kiện</h1>
        <Timeline />
        <FloatingFlowers/>
      </div>
    </div>
  );
};

export default ContactForm;
