import { getContacts, deleteContact, markContactAsRead } from "@/actions/contact-actions";
import { Envelope, EnvelopeOpen } from "reicon-react";
import { Button } from "@/components/ui/button";
import { ContactActionButtons } from "@/components/admin/contact-action-buttons";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const params = await searchParams;
  const searchVal = params.search || "";
  let contacts = await getContacts();

  if (searchVal) {
    contacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchVal.toLowerCase()) ||
      (contact.service && contact.service.toLowerCase().includes(searchVal.toLowerCase())) ||
      contact.message.toLowerCase().includes(searchVal.toLowerCase())
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Messages & Contacts</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-medium">
              <tr>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Nom</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Sujet / Service</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Aucun message reçu.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id} className={`transition-colors ${contact.status === "NEW" ? "bg-accent-50/30" : "hover:bg-gray-50"}`}>
                    <td className="px-6 py-4">
                      {contact.status === "NEW" ? (
                        <Envelope size={20} className="text-accent-500" />
                      ) : (
                        <EnvelopeOpen size={20} className="text-gray-400" />
                      )}
                    </td>
                    <td className={`px-6 py-4 ${contact.status === "NEW" ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{contact.email}</td>
                    <td className="px-6 py-4 text-gray-500">{contact.service || "Général"}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ContactActionButtons 
                        id={contact.id} 
                        status={contact.status} 
                        message={contact.message} 
                        name={contact.name}
                        email={contact.email}
                        service={contact.service}
                        date={new Date(contact.createdAt).toLocaleDateString("fr-FR")}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
