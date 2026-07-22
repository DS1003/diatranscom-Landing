import { getServices } from "@/actions/service-actions";
import { ServicesClient } from "@/components/admin/services-client";

export default async function ServicesPage() {
  const services = await getServices();

  return <ServicesClient services={services} />;
}
