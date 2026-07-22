import { getTestimonials } from "@/actions/testimonial-actions";
import { TestimonialsClient } from "@/components/admin/testimonials-client";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return <TestimonialsClient testimonials={testimonials} />;
}
