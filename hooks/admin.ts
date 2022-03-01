import { UserRoleType, User } from ".prisma/client";

interface Session {
  data: {
    id: string;
    name: string;
    role: UserRoleType;
  };
}

// Validate the current user is an Admin
export const isAdmin = ({ session }: { session?: Session }) =>
  session?.data.role === UserRoleType.admin;

// Validate the current user is an Moderator
export const isModerator = ({ session }: { session?: Session }) =>
  session?.data.role === UserRoleType.moderator;

// Validate the current user is updating themselves
export const isUser = ({ session, item }: { session: Session; item: User }) =>
  session?.data.id === item.id;

// Validate the current user is an Admin, or updating themselves
export const isAdminOrModerator = ({ session }: { session?: Session }) =>
  isAdmin({ session }) || isModerator({ session });

// Validate the current user is an Admin, or updating themselves
export const isAdminOrPerson = ({
  session,
  item,
}: {
  session: Session;
  item: User;
}) =>
  isAdmin({ session }) ||
  (isModerator({ session }) && isUser({ session, item }));
