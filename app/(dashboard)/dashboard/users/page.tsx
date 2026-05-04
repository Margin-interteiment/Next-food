import { prisma } from "@/prisma/prisma-client";
import { UserRoleSelect } from "@/components/ui/shared/admin/user-role-select";
import { DeleteRow } from "@/components/ui/shared/admin/delete-row";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminUsersPage() {
  const me = await getCurrentUser();
  const users = await prisma.user.findMany({ orderBy: { id: "asc" } });

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6">Користувачі</h1>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Імʼя</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Роль</th>
              <th className="text-left p-3">Зареєстровано</th>
              <th className="text-right p-3">Дії</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3 font-bold">{u.id}</td>
                <td className="p-3">{u.fullName}</td>
                <td className="p-3 text-gray-500">{u.email}</td>
                <td className="p-3">
                  <UserRoleSelect
                    id={u.id}
                    role={u.role}
                    disabled={u.id === me?.id}
                  />
                </td>
                <td className="p-3 text-gray-500 text-xs">
                  {new Date(u.createdAt).toLocaleDateString("uk-UA")}
                </td>
                <td className="p-3 text-right">
                  {u.id === me?.id ? (
                    <span className="text-gray-300">це ви</span>
                  ) : (
                    <DeleteRow id={u.id} resource="users" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
