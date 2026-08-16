import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">Get in Touch</h1>
      <p className="mb-10 text-gray-600">
        Have a question, opportunity, or just want to say hi? Drop me a message
        and I'll get back to you as soon as I can.
      </p>
      <ContactForm />
    </div>
  );
}
